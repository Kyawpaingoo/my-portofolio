import { getCloudflareContext } from "@opennextjs/cloudflare";

import { FILE_TYPES, IMAGE_TYPES, MAX_UPLOAD_BYTES } from "@/lib/media";

/**
 * Studio upload endpoint: stores an image or PDF in R2 (MEDIA_BUCKET) and
 * returns its key. Protected by the /studio Cloudflare Access check in src/proxy.ts.
 * Keys are content hashes, so re-uploading the same file is a no-op.
 */

export const dynamic = "force-dynamic";

export type UploadResult = {
  key: string;
  contentType: string;
  size: number;
  filename: string;
  width?: number;
  height?: number;
};

export async function POST(request: Request) {
  // Browsers attach the Access cookie to cross-site requests too, so only
  // accept uploads from the Studio's own origin (CSRF).
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return new Response("Cross-origin upload rejected", { status: 403 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return new Response("Missing file", { status: 400 });
  }
  if (file.size === 0 || file.size > MAX_UPLOAD_BYTES) {
    return new Response(
      `Files must be between 1 byte and ${MAX_UPLOAD_BYTES / 1024 / 1024} MB`,
      { status: 413 }
    );
  }

  const imageExtension = IMAGE_TYPES[file.type];
  const fileExtension = FILE_TYPES[file.type];
  if (!imageExtension && !fileExtension) {
    return new Response(`Unsupported file type: ${file.type || "unknown"}`, {
      status: 415,
    });
  }

  const bytes = await file.arrayBuffer();
  const hash = await contentHash(bytes);
  const filename = safeFilename(file.name, imageExtension ?? fileExtension);
  const key = imageExtension
    ? `images/${hash}.${imageExtension}`
    : `files/${hash}/${filename}`;

  const { env } = await getCloudflareContext({ async: true });

  let dimensions: { width: number; height: number } | undefined;
  if (imageExtension) {
    dimensions =
      (await imageInfo(env.IMAGES, bytes)) ?? clientDimensions(form);
  }

  await env.MEDIA_BUCKET.put(key, bytes, {
    httpMetadata: {
      contentType: file.type,
      cacheControl: "public, max-age=31536000, immutable",
      ...(fileExtension && {
        contentDisposition: `inline; filename="${filename}"`,
      }),
    },
    customMetadata: { originalFilename: file.name },
  });

  const result: UploadResult = {
    key,
    contentType: file.type,
    size: file.size,
    filename,
    ...dimensions,
  };
  return Response.json(result);
}

async function contentHash(bytes: ArrayBuffer) {
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest).slice(0, 16))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function safeFilename(name: string, extension: string) {
  const base = name
    .replace(/\.[^.]*$/, "")
    .replace(/[^A-Za-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return `${base || "file"}.${extension}`;
}

async function imageInfo(
  images: ImagesBinding | undefined,
  bytes: ArrayBuffer
) {
  if (!images) return null;
  try {
    const info = await images.info(
      new Response(bytes).body as ReadableStream<Uint8Array>
    );
    return "width" in info ? { width: info.width, height: info.height } : null;
  } catch {
    return null; // e.g. local dev without the Images API
  }
}

/** Fallback: dimensions measured by the Studio before upload. */
function clientDimensions(form: FormData) {
  const width = Number(form.get("width"));
  const height = Number(form.get("height"));
  return width > 0 && height > 0 ? { width, height } : undefined;
}
