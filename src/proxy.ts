import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse, type NextRequest } from "next/server";

import {
  ACCESS_JWT_HEADER,
  getStudioAccessConfig,
  verifyAccessToken,
} from "@/lib/studio-access";

/**
 * Restricts /studio to the allowlisted emails signed in through Cloudflare
 * Access (see src/lib/studio-access.ts). Access can't sit in front of
 * localhost, so `next dev` on localhost skips the check.
 *
 * Next 16's `proxy` always runs on the Node.js runtime. OpenNext on Cloudflare
 * bundles it for workerd, but flags that support as experimental, so check
 * /studio still rejects requests without an Access token after OpenNext or
 * Next upgrades.
 */

export const config = {
  matcher: ["/studio", "/studio/:path*"],
};

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);

export async function proxy(request: NextRequest) {
  if (
    process.env.NODE_ENV === "development" &&
    LOCAL_HOSTS.has(request.nextUrl.hostname)
  ) {
    return NextResponse.next();
  }

  const { env } = await getCloudflareContext({ async: true });
  const access = getStudioAccessConfig(env);
  if (!access) {
    return deny("Studio access is not configured", 503);
  }

  const email = await verifyAccessToken(
    access,
    request.headers.get(ACCESS_JWT_HEADER)
  );
  if (!email) {
    return deny("Forbidden", 403);
  }

  return NextResponse.next();
}

function deny(message: string, status: number) {
  return new NextResponse(message, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}
