/**
 * Lets you run `bunx sanity <command>` (schema extract, typegen, cors, ...)
 * from the project root. https://www.sanity.io/docs/cli
 */
import { defineCliConfig } from "sanity/cli";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export default defineCliConfig({
  api: { projectId, dataset },
  typegen: {
    path: "./src/**/*.{ts,tsx}",
    schema: "./src/sanity/extract.json",
    generates: "./src/sanity/types.ts",
  },
});
