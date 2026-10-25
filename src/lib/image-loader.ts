import type { ImageLoaderProps } from "next/image";

import { MEDIA_PREFIX } from "./media";

/**
 * next/image loader for media in R2: /media/[...key] resizes with the
 * Cloudflare Images binding. (OpenNext's /_next/image can only read static
 * assets, not Worker routes.)
 */
export default function mediaImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  if (!src.startsWith(MEDIA_PREFIX)) return src;
  return `${src}?w=${width}&q=${quality ?? 75}`;
}
