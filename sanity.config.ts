"use client";

/**
 * Sanity Studio configuration, mounted at /studio
 * (src/app/studio/[[...tool]]/page.tsx).
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema, singletonTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

// Singletons can only be edited and published, never created, duplicated or deleted.
const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "portfolio",
  title: "Portfolio",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schema.types,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? actions.filter(
            ({ action }) => action && singletonActions.has(action)
          )
        : actions,
  },
  plugins: [
    structureTool({ structure }),
    // GROQ playground: https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
