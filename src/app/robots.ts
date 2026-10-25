import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/content";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { siteUrl } = await getSiteSettings();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/studio",
      crawlDelay: 1,
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
