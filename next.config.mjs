import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Media is served from R2 by /media/[...key], which also resizes images.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
};

export default nextConfig;

// Exposes Cloudflare bindings to `next dev` via getCloudflareContext().
initOpenNextCloudflareForDev();
