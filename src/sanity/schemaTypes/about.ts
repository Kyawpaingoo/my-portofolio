import { defineArrayMember, defineField, defineType } from "sanity";
import { Smile } from "lucide-react";

export const about = defineType({
  name: "about",
  title: "About",
  type: "document",
  icon: Smile,
  fields: [
    defineField({
      name: "story",
      description:
        "Who you are and how you got into development. Separate paragraphs with a blank line.",
      type: "text",
      rows: 8,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "storyKeywords",
      title: "Story keywords",
      description: "Phrases in the story to highlight.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "workStyle",
      title: "How I work",
      description: "Short statements, one per item.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "facts",
      title: "Quick facts",
      description: "Shown as key–value pairs, e.g. “timezone” → “Bangkok (UTC+7)”.",
      type: "array",
      of: [
        defineArrayMember({
          name: "fact",
          type: "object",
          fields: [
            defineField({
              name: "label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "value",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
    }),
    defineField({
      name: "education",
      description: "In display order, most recent first.",
      type: "array",
      of: [
        defineArrayMember({
          name: "educationItem",
          title: "Education",
          type: "object",
          fields: [
            defineField({
              name: "credential",
              description: "e.g. “BSc (Hons) Computer Science”.",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "school",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "location", type: "string" }),
            defineField({
              name: "period",
              description: "e.g. “2020 – 2023” or “In progress”.",
              type: "string",
            }),
            defineField({ name: "note", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "credential", subtitle: "school" } },
        }),
      ],
    }),
    defineField({
      name: "interests",
      title: "Outside of work",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "photos",
      title: "Gallery",
      type: "array",
      of: [
        defineArrayMember({
          name: "galleryPhoto",
          title: "Photo",
          type: "object",
          fields: [
            defineField({
              name: "image",
              type: "r2Image",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "caption", type: "string" }),
          ],
          preview: {
            select: { title: "caption", alt: "image.alt" },
            prepare: ({ title, alt }) => ({ title: title || alt || "Photo" }),
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "About" }),
  },
});
