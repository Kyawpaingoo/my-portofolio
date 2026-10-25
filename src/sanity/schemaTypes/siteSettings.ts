import { defineArrayMember, defineField, defineType } from "sanity";
import { Settings } from "lucide-react";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: Settings,
  groups: [
    { name: "seo", title: "SEO", default: true },
    { name: "structuredData", title: "Structured data" },
  ],
  fields: [
    defineField({
      name: "title",
      description: "Default page title and social share title.",
      type: "string",
      group: "seo",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "siteUrl",
      title: "Site URL",
      description:
        "Production URL without a trailing slash. Used for canonical URLs, the sitemap and social cards.",
      type: "url",
      group: "seo",
      validation: (rule) => rule.required().uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "siteName",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "keywords",
      type: "array",
      group: "seo",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "ogImage",
      title: "Social share image",
      description: "1200×630 recommended.",
      type: "r2Image",
      group: "seo",
    }),
    defineField({
      name: "jobTitle",
      type: "string",
      group: "structuredData",
    }),
    defineField({
      name: "worksFor",
      title: "Works for",
      type: "string",
      group: "structuredData",
    }),
    defineField({
      name: "knowsAbout",
      title: "Knows about",
      type: "array",
      group: "structuredData",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
