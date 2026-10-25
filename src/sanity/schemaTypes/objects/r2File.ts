import { defineField, defineType } from "sanity";

import { R2FileInput } from "../../components/R2UploadInput";

/** A file (PDF) stored in R2 (MEDIA_BUCKET); Sanity keeps only the key. */
export const r2File = defineType({
  name: "r2File",
  title: "File",
  type: "object",
  components: { input: R2FileInput },
  fields: [
    defineField({ name: "key", type: "string", hidden: true }),
    defineField({ name: "filename", type: "string", hidden: true }),
    defineField({ name: "contentType", type: "string", hidden: true }),
    defineField({ name: "size", type: "number", hidden: true }),
  ],
  validation: (rule) =>
    rule.custom((value?: { key?: string }) =>
      !value || value.key ? true : "Upload a file"
    ),
  preview: {
    select: { filename: "filename" },
    prepare: ({ filename }: { filename?: string }) => ({
      title: filename || "File",
    }),
  },
});
