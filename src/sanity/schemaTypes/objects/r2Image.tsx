import { defineField, defineType } from "sanity";

import { R2ImageInput } from "../../components/R2UploadInput";
import { mediaUrl } from "../../../lib/media";

/** An image stored in R2 (MEDIA_BUCKET); Sanity keeps only the key. */
export const r2Image = defineType({
  name: "r2Image",
  title: "Image",
  type: "object",
  components: { input: R2ImageInput },
  fields: [
    defineField({ name: "key", type: "string", hidden: true }),
    defineField({ name: "contentType", type: "string", hidden: true }),
    defineField({ name: "size", type: "number", hidden: true }),
    defineField({ name: "width", type: "number", hidden: true }),
    defineField({ name: "height", type: "number", hidden: true }),
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  validation: (rule) =>
    rule.custom((value?: { key?: string }) =>
      !value || value.key ? true : "Upload an image"
    ),
  preview: {
    select: { key: "key", alt: "alt" },
    prepare({ key, alt }: { key?: string; alt?: string }) {
      return {
        title: alt || "Image",
        media: key ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`${mediaUrl(key)}?w=96&q=75`}
            alt=""
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        ) : undefined,
      };
    },
  },
});
