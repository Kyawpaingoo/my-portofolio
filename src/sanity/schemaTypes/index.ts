import type { SchemaTypeDefinition } from "sanity";

import { beforeAfter } from "./objects/beforeAfter";
import { r2File } from "./objects/r2File";
import { r2Image } from "./objects/r2Image";
import { about } from "./about";
import { experience } from "./experience";
import { profile } from "./profile";
import { project } from "./project";
import { siteSettings } from "./siteSettings";
import { techStack } from "./techStack";

/** Document types that have exactly one document, stored under a fixed `_id`. */
export const singletonTypes = new Set([
  "profile",
  "about",
  "siteSettings",
  "techStack",
]);

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    profile,
    about,
    siteSettings,
    techStack,
    experience,
    project,
    beforeAfter,
    r2Image,
    r2File,
  ],
};
