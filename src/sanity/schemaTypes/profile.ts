import { defineArrayMember, defineField, defineType } from "sanity";
import { User } from "lucide-react";

export const profile = defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  icon: User,
  fields: [
    defineField({
      name: "name",
      description: "Short display name used in the hero, e.g. “Kevin”.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fullName",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "location", type: "string" }),
    defineField({
      name: "stackShort",
      title: "Stack (short)",
      type: "string",
    }),
    defineField({
      name: "tagline",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "taglineKeywords",
      title: "Tagline keywords",
      description: "Phrases in the tagline to highlight.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({ name: "github", title: "GitHub URL", type: "url" }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "image", title: "Photo", type: "r2Image" }),
    defineField({ name: "resume", title: "Resume (PDF)", type: "r2File" }),
  ],
  preview: {
    select: { title: "fullName", subtitle: "role" },
  },
});
