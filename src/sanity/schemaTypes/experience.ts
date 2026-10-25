import { defineArrayMember, defineField, defineType } from "sanity";
import { Briefcase } from "lucide-react";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  icon: Briefcase,
  groups: [
    { name: "card", title: "Card", default: true },
    { name: "detail", title: "Detail page" },
  ],
  fields: [
    defineField({
      name: "title",
      description: "Role, e.g. “Full-Stack Developer”.",
      type: "string",
      group: "card",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "org",
      title: "Organization",
      type: "string",
      group: "card",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "card",
      options: { source: "org", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "period",
      description: "e.g. “Sep 2023 — Present”.",
      type: "string",
      group: "card",
    }),
    defineField({
      name: "order",
      description: "Lower numbers appear first.",
      type: "number",
      group: "card",
      initialValue: 0,
      validation: (rule) => rule.required().integer(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 4,
      group: "card",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "stack",
      type: "array",
      group: "card",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "highlights",
      type: "array",
      group: "card",
      of: [defineArrayMember({ type: "text", rows: 2 })],
    }),
    defineField({
      name: "keywords",
      description: "Phrases in the description and highlights to highlight.",
      type: "array",
      group: "card",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "overview",
      type: "text",
      rows: 5,
      group: "detail",
    }),
    defineField({
      name: "projects",
      description:
        "Products built in this role. They appear in Projects labelled with this organization.",
      type: "array",
      group: "detail",
      of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })],
    }),
    defineField({
      name: "challenge",
      type: "text",
      rows: 5,
      group: "detail",
    }),
    defineField({
      name: "beforeAfter",
      title: "Before / after",
      type: "beforeAfter",
      group: "detail",
    }),
    defineField({
      name: "whyItMatters",
      title: "Why it matters",
      type: "text",
      rows: 4,
      group: "detail",
    }),
    defineField({
      name: "mockups",
      type: "array",
      group: "detail",
      of: [defineArrayMember({ type: "r2Image" })],
      options: { layout: "grid" },
    }),
    defineField({
      name: "linkLabel",
      description: "e.g. “visit colive.info”.",
      type: "string",
      group: "detail",
    }),
    defineField({
      name: "linkUrl",
      title: "Link URL",
      type: "url",
      group: "detail",
      validation: (rule) =>
        rule.custom((url, context) =>
          !url && context.document?.linkLabel
            ? "Add a URL for the link label"
            : true
        ),
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", org: "org", period: "period" },
    prepare({ title, org, period }) {
      return {
        title: `${title} · ${org}`,
        subtitle: period,
      };
    },
  },
});
