import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Pages are prerendered at build time with content from Sanity and served
// from Workers Static Assets. This cache is read-only and nothing is stored in
// R2/KV: publishing in Sanity goes live on the next `bun run deploy`.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
