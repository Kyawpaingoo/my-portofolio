/**
 * /studio is protected by Cloudflare Access, which signs in visitors and adds
 * a signed JWT to each request (Cf-Access-Jwt-Assertion). src/proxy.ts checks
 * that token here, so requests that bypass Access (or come from another
 * Access app) are rejected. Sanity's own login still applies in the Studio.
 *
 * Config comes from the Cloudflare env: Worker secrets in production. If
 * anything is missing, the Studio stays locked.
 */

export const ACCESS_JWT_HEADER = "cf-access-jwt-assertion";

export type StudioAccessConfig = {
  /** e.g. https://<team>.cloudflareaccess.com */
  teamDomain: string;
  /** The Access application's Audience (AUD) tag. */
  audience: string;
  allowedEmails: string[];
};

/** `undefined` when any setting is missing, which keeps the Studio locked. */
export function getStudioAccessConfig(
  env: CloudflareEnv
): StudioAccessConfig | undefined {
  const teamDomain = env.CF_ACCESS_TEAM_DOMAIN?.trim().replace(/\/+$/, "");
  const audience = env.CF_ACCESS_AUD?.trim();
  const allowedEmails = (env.STUDIO_ALLOWED_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (!teamDomain || !audience || allowedEmails.length === 0) return undefined;
  return {
    teamDomain: teamDomain.startsWith("https://")
      ? teamDomain
      : `https://${teamDomain}`,
    audience,
    allowedEmails,
  };
}

type Claims = {
  iss?: string;
  aud?: string | string[];
  exp?: number;
  nbf?: number;
  email?: string;
};

type Jwk = JsonWebKey & { kid?: string };

/**
 * Returns the signed-in email if the token is valid for this Access app and
 * the email is allowlisted; otherwise `undefined`.
 */
export async function verifyAccessToken(
  config: StudioAccessConfig,
  token: string | null
) {
  const [headerPart, payloadPart, signaturePart] = token?.split(".") ?? [];
  if (!headerPart || !payloadPart || !signaturePart) return undefined;

  try {
    const header = decodeJson<{ alg?: string; kid?: string }>(headerPart);
    if (header.alg !== "RS256" || !header.kid) return undefined;

    const jwk = await findKey(config.teamDomain, header.kid);
    if (!jwk) return undefined;

    const key = await crypto.subtle.importKey(
      "jwk",
      jwk,
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["verify"]
    );
    const signed = await crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      key,
      base64UrlDecode(signaturePart),
      new TextEncoder().encode(`${headerPart}.${payloadPart}`)
    );
    if (!signed) return undefined;

    const claims = decodeJson<Claims>(payloadPart);
    const now = Date.now() / 1000;
    const audiences = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
    const email = claims.email?.toLowerCase();

    if (
      claims.iss !== config.teamDomain ||
      !audiences.includes(config.audience) ||
      !claims.exp ||
      claims.exp < now ||
      (claims.nbf !== undefined && claims.nbf > now + 60) ||
      !email ||
      !config.allowedEmails.includes(email)
    ) {
      return undefined;
    }
    return email;
  } catch {
    return undefined;
  }
}

// Access rotates its signing keys every few weeks, so cached keys expire, and
// an unknown key ID triggers a refetch (at most every 30 seconds, so forged
// tokens can't make every request fetch).
const KEY_CACHE_MS = 5 * 60 * 1000;
const KEY_REFETCH_MS = 30 * 1000;
let keyCache: { teamDomain: string; keys: Jwk[]; fetchedAt: number } | undefined;

async function findKey(teamDomain: string, kid: string) {
  const age =
    keyCache?.teamDomain === teamDomain
      ? Date.now() - keyCache.fetchedAt
      : Infinity;
  let key = age < KEY_CACHE_MS ? keyCache?.keys.find((k) => k.kid === kid) : undefined;
  if (key || age < KEY_REFETCH_MS) return key;

  const response = await fetch(`${teamDomain}/cdn-cgi/access/certs`);
  if (!response.ok) return undefined;
  const { keys } = (await response.json()) as { keys: Jwk[] };
  keyCache = { teamDomain, keys, fetchedAt: Date.now() };
  key = keys.find((k) => k.kid === kid);
  return key;
}

function decodeJson<T>(part: string) {
  return JSON.parse(new TextDecoder().decode(base64UrlDecode(part))) as T;
}

function base64UrlDecode(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}
