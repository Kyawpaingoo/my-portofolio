import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Restricts /studio to the site owner with HTTP Basic Auth. Sanity's own
 * login still applies inside the Studio.
 *
 * Credentials: STUDIO_BASIC_AUTH_USER / STUDIO_BASIC_AUTH_PASSWORD, read from
 * the Cloudflare env: .dev.vars locally (`bun run dev` and `bun run preview`),
 * Worker secrets in production. They must not go in Next's .env files, which
 * OpenNext bundles into the Worker. If either is missing, the Studio is locked.
 *
 * Uses `middleware` (edge runtime) rather than Next 16's `proxy`, because
 * OpenNext on Cloudflare doesn't support the Node.js proxy runtime yet.
 */

export const config = {
  matcher: ["/studio", "/studio/:path*"],
};

export async function middleware(request: NextRequest) {
  const { env } = await getCloudflareContext({ async: true });
  const user = env.STUDIO_BASIC_AUTH_USER;
  const password = env.STUDIO_BASIC_AUTH_PASSWORD;

  if (
    user &&
    password &&
    (await isAuthorized(request.headers.get("authorization"), user, password))
  ) {
    return NextResponse.next();
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Studio", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}

async function isAuthorized(
  header: string | null,
  user: string,
  password: string
) {
  if (!header?.startsWith("Basic ")) return false;

  let supplied: string;
  try {
    supplied = atob(header.slice("Basic ".length).trim());
  } catch {
    return false;
  }

  return timingSafeEqual(supplied, `${user}:${password}`);
}

/** Compares SHA-256 digests so timing doesn't leak the expected value. */
async function timingSafeEqual(a: string, b: string) {
  const encoder = new TextEncoder();
  const [hashA, hashB] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(a)),
    crypto.subtle.digest("SHA-256", encoder.encode(b)),
  ]);
  const bytesA = new Uint8Array(hashA);
  const bytesB = new Uint8Array(hashB);

  let diff = 0;
  for (let i = 0; i < bytesA.length; i++) diff |= bytesA[i] ^ bytesB[i];
  return diff === 0;
}
