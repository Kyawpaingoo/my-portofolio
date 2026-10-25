import type { MetadataRoute } from "next";
import { getSiteSettings, getSitemapEntries } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ siteUrl }, { projects, experiences }] = await Promise.all([
    getSiteSettings(),
    getSitemapEntries(),
  ]);

  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    ...experiences.map((entry) => ({
      url: `${siteUrl}/experience/${entry.slug}`,
      lastModified: entry._updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projects.map((entry) => ({
      url: `${siteUrl}/projects/${entry.slug}`,
      lastModified: entry._updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
