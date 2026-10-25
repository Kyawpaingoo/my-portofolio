import { getCloudflareContext } from "@opennextjs/cloudflare";

import { allowedWidth, FILE_TYPES, IMAGE_TYPES } from "@/lib/media";

/**
 * Serves uploaded media from R2 (MEDIA_BUCKET).
 *
 *   /media/<key>              original bytes
 *   /media/<key>?w=640&q=75   resized image (next/image loader)
 *   /media/<key>?preset=og    1200×630 JPEG for social cards
 *
 * Widths are rounded up to the next/image size list and quality is fixed, so
 * the number of (billable) Cloudflare Images transformations stays bounded.
 * Keys are content hashes, so every response is immutable.
 */

export const dynamic = "force-dynamic";

const IMMUTABLE = "public, max-age=31536000, immutable";
const KEY_SEGMENT = /^[A-Za-z0-9._-]+$/;

export async function GET(
  request: Request,
  { params }: RouteContext<"/media/[...key]">
) {
  const { key: segments } = await params;
  if (!segments.every((segment) => KEY_SEGMENT.test(segment))) {
    return new Response("Not found", { status: 404 });
  }

  const { env, ctx } = await getCloudflareContext({ async: true });

  // Worker responses never reach the CDN cache on their own, so without this
  // every request re-reads R2 and re-encodes the image.
  // `caches.default` is Workers-only; the DOM lib's CacheStorage type lacks it.
  const cache =
    typeof caches === "undefined"
      ? null
      : (caches as unknown as { default: Cache }).default;
  const cacheKey = new Request(cacheKeyFor(request), { method: "GET" });
  const cached = await cache?.match(cacheKey);
  if (cached) {
    const etag = cached.headers.get("etag");
    if (etag && request.headers.get("if-none-match") === etag) {
      return new Response(null, { status: 304, headers: { ETag: etag } });
    }
    return cached;
  }

  const object = await env.MEDIA_BUCKET.get(segments.join("/"));
  if (!object) return new Response("Not found", { status: 404 });

  const contentType =
    object.httpMetadata?.contentType ?? "application/octet-stream";
  const url = new URL(request.url);
  const transform = imageTransform(url.searchParams, contentType, request);

  if (request.headers.get("if-none-match") === etagFor(object, transform)) {
    return new Response(null, { status: 304 });
  }

  if (transform && env.IMAGES) {
    const bytes = await object.arrayBuffer();
    try {
      const result = await env.IMAGES.input(streamOf(bytes))
        .transform(transform.resize)
        .output({ format: transform.format, quality: transform.quality });

      const response = new Response(result.image(), {
        headers: {
          "Content-Type": result.contentType(),
          "Cache-Control": IMMUTABLE,
          ETag: etagFor(object, transform),
          Vary: "Accept",
          "X-Content-Type-Options": "nosniff",
        },
      });
      if (cache) ctx.waitUntil(cache.put(cacheKey, response.clone()));
      return response;
    } catch (error) {
      // e.g. local dev without image transformations: serve the original.
      console.warn(`Image transform failed for ${object.key}`, error);
      return new Response(bytes, { headers: baseHeaders(object, contentType) });
    }
  }

  const response = new Response(object.body, {
    headers: baseHeaders(object, contentType),
  });
  if (cache) ctx.waitUntil(cache.put(cacheKey, response.clone()));
  return response;
}

/**
 * One cache entry per key + variant. The output format depends on Accept, so
 * it is part of the key instead of relying on Vary.
 */
function cacheKeyFor(request: Request) {
  const url = new URL(request.url);
  const key = new URL(url.pathname, url.origin);
  if (url.searchParams.get("preset") === "og") {
    key.searchParams.set("preset", "og");
    return key.toString();
  }
  const width = Number(url.searchParams.get("w"));
  if (Number.isFinite(width) && width > 0) {
    const accept = request.headers.get("accept") ?? "";
    key.searchParams.set("w", String(allowedWidth(width)));
    key.searchParams.set(
      "f",
      accept.includes("image/avif")
        ? "avif"
        : accept.includes("image/webp")
          ? "webp"
          : "auto"
    );
  }
  return key.toString();
}

type Transform = {
  resize: { width: number; height?: number; fit: "scale-down" | "cover" };
  format: "image/avif" | "image/webp" | "image/jpeg" | "image/png";
  quality: number;
  id: string;
};

function imageTransform(
  searchParams: URLSearchParams,
  contentType: string,
  request: Request
): Transform | null {
  // GIFs may be animated; serve them as uploaded.
  if (!(contentType in IMAGE_TYPES) || contentType === "image/gif") {
    return null;
  }

  if (searchParams.get("preset") === "og") {
    return {
      resize: { width: 1200, height: 630, fit: "cover" },
      format: "image/jpeg",
      quality: 80,
      id: "og",
    };
  }

  const width = Number(searchParams.get("w"));
  if (!Number.isFinite(width) || width <= 0) return null;

  const accept = request.headers.get("accept") ?? "";
  const format = accept.includes("image/avif")
    ? "image/avif"
    : accept.includes("image/webp")
      ? "image/webp"
      : contentType === "image/png"
        ? "image/png"
        : "image/jpeg";
  const resizedWidth = allowedWidth(width);

  return {
    resize: { width: resizedWidth, fit: "scale-down" },
    format,
    quality: 75,
    id: `w${resizedWidth}-${format.slice("image/".length)}`,
  };
}

function baseHeaders(object: R2Object, contentType: string) {
  const headers: Record<string, string> = {
    "Content-Type": contentType,
    "Cache-Control": IMMUTABLE,
    ETag: object.httpEtag,
    "X-Content-Type-Options": "nosniff",
  };
  if (contentType in FILE_TYPES && object.httpMetadata?.contentDisposition) {
    headers["Content-Disposition"] = object.httpMetadata.contentDisposition;
  }
  return headers;
}

function etagFor(object: R2Object, transform: Transform | null) {
  return transform
    ? `"${object.etag}-${transform.id}"`
    : object.httpEtag;
}

function streamOf(bytes: ArrayBuffer) {
  return new Response(bytes).body as ReadableStream<Uint8Array>;
}
