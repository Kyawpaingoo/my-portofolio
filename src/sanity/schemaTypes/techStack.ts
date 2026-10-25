import { defineArrayMember, defineField, defineType } from "sanity";
import { Layers } from "lucide-react";

import { TECH_STACK_ICONS } from "@/lib/tech-stack";

export const techStack = defineType({
  name: "techStack",
  title: "Tech stack",
  type: "document",
  icon: Layers,
  fields: [
    defineField({
      name: "groups",
      description:
        "Cards in the home page's Tech Stack section, in this order. While empty, the site groups the stack tags of your projects and experience automatically.",
      type: "array",
      of: [
        defineArrayMember({
          name: "techGroup",
          title: "Group",
          type: "object",
          fields: [
            defineField({
              name: "name",
              description: "Card title, e.g. “Backend”.",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "kicker",
              description: "Small mono label above the title, e.g. “api”.",
              type: "string",
            }),
            defineField({
              name: "icon",
              type: "string",
              options: { list: [...TECH_STACK_ICONS] },
              initialValue: "code",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "items",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
              options: { layout: "tags" },
              validation: (rule) => rule.required().min(1).unique(),
            }),
          ],
          preview: {
            select: { title: "name", items: "items" },
            prepare: ({ title, items }) => ({
              title,
              subtitle: (items as string[] | undefined)?.join(", "),
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Tech stack" }),
  },
});
