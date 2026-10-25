import { defineField, defineType } from "sanity";

export const beforeAfter = defineType({
  name: "beforeAfter",
  title: "Before / after",
  type: "object",
  fields: [
    defineField({
      name: "before",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "after",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
});
