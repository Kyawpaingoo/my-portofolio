/**
 * Media (uploaded images and files) lives in the R2 bucket bound as
 * MEDIA_BUCKET and is served by src/app/media/[...key]/route.ts.
 * Sanity stores only the object key.
 */

export const MEDIA_PREFIX = "/media/";

export function mediaUrl(key: string) {
  return `${MEDIA_PREFIX}${key}`;
}

/** Widths next/image may request (Next's default deviceSizes + imageSizes). */
export const IMAGE_WIDTHS = [
  32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840,
];

/** Rounds up to the nearest allowed width, bounding the number of variants. */
export function allowedWidth(width: number) {
  return (
    IMAGE_WIDTHS.find((allowed) => allowed >= width) ??
    IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1]
  );
}

/** 1200×630 crop for social cards (Open Graph / Twitter). */
export function socialImageUrl(src: string) {
  return `${src}?preset=og`;
}

export const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

export const FILE_TYPES: Record<string, string> = {
  "application/pdf": "pdf",
};

export const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;
