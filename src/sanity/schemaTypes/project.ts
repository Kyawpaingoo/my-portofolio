import { defineArrayMember, defineField, defineType } from "sanity";
import { FolderGit2 } from "lucide-react";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: FolderGit2,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      description: "Lower numbers appear first.",
      type: "number",
      initialValue: 0,
      validation: (rule) => rule.required().integer(),
    }),
    defineField({
      name: "kind",
      title: "Project type",
      type: "string",
      options: {
        list: [
          { title: "Work", value: "work" },
          { title: "Personal", value: "personal" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "personal",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      description:
        "e.g. “Personal Project · C# .NET Core 10”, or your part for work products: “Mobile API + Admin CRM · C# .NET + Blazor”.",
      type: "string",
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "stack",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "highlights",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 2 })],
    }),
    defineField({
      name: "keywords",
      description: "Phrases in the description and highlights to highlight.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({ name: "githubUrl", title: "GitHub URL", type: "url" }),
    defineField({ name: "liveUrl", title: "Live URL", type: "url" }),
    defineField({
      name: "mockups",
      type: "array",
      of: [defineArrayMember({ type: "r2Image" })],
      options: { layout: "grid" },
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
    select: { title: "title", kind: "kind", category: "category" },
    prepare({ title, kind, category }) {
      return {
        title,
        subtitle: [kind === "work" ? "Work" : "Personal", category]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});
