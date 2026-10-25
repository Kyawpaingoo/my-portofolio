import { defineQuery } from "next-sanity";

// Queries project straight into the shapes the components expect, so the
// mapping in src/lib/content.ts stays thin. Media fields return R2 object keys
// (see src/lib/media.ts). Types are generated from these
// strings by `bun run typegen` (src/sanity/types.ts).

export const PROFILE_QUERY = defineQuery(`*[_type == "profile" && _id == "profile"][0]{
  name,
  fullName,
  role,
  location,
  stackShort,
  tagline,
  "taglineKeywords": coalesce(taglineKeywords, []),
  email,
  github,
  linkedin,
  "imageKey": image.key,
  "imageAlt": image.alt,
  "resumeKey": resume.key
}`);

export const SITE_SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings" && _id == "siteSettings"][0]{
  title,
  description,
  siteUrl,
  siteName,
  "keywords": coalesce(keywords, []),
  "ogImageKey": ogImage.key,
  jobTitle,
  worksFor,
  "knowsAbout": coalesce(knowsAbout, [])
}`);

export const TECH_STACK_QUERY = defineQuery(`*[_type == "techStack" && _id == "techStack"][0]{
  "groups": coalesce(groups[]{
    name,
    kicker,
    icon,
    "items": coalesce(items, [])
  }, [])
}`);

export const PROJECTS_QUERY = defineQuery(`*[_type == "project" && defined(slug.current)] | order(order asc){
  "slug": slug.current,
  title,
  "kind": coalesce(kind, "personal"),
  category,
  description,
  "stack": coalesce(stack, []),
  "highlights": coalesce(highlights, []),
  "keywords": coalesce(keywords, []),
  githubUrl,
  liveUrl,
  "experience": *[_type == "experience" && references(^._id)][0]{ "slug": slug.current, org }
}`);

export const PROJECT_BY_SLUG_QUERY = defineQuery(`*[_type == "project" && slug.current == $slug][0]{
  "slug": slug.current,
  title,
  "kind": coalesce(kind, "personal"),
  category,
  description,
  "stack": coalesce(stack, []),
  "highlights": coalesce(highlights, []),
  "keywords": coalesce(keywords, []),
  githubUrl,
  liveUrl,
  "mockups": mockups[defined(key)]{ key, alt, width, height },
  "experience": *[_type == "experience" && references(^._id)][0]{ "slug": slug.current, org }
}`);

export const EXPERIENCES_QUERY = defineQuery(`*[_type == "experience" && defined(slug.current)] | order(order asc){
  "slug": slug.current,
  title,
  org,
  period,
  description,
  "stack": coalesce(stack, []),
  "highlights": coalesce(highlights, []),
  "keywords": coalesce(keywords, []),
  linkLabel,
  linkUrl
}`);

export const EXPERIENCE_BY_SLUG_QUERY = defineQuery(`*[_type == "experience" && slug.current == $slug][0]{
  "slug": slug.current,
  title,
  org,
  period,
  description,
  "stack": coalesce(stack, []),
  "highlights": coalesce(highlights, []),
  "keywords": coalesce(keywords, []),
  overview,
  "projects": coalesce(projects[]->{ "slug": slug.current, title, category }, []),
  challenge,
  "beforeAfter": beforeAfter{ before, after },
  whyItMatters,
  "mockups": mockups[defined(key)]{ key, alt, width, height },
  linkLabel,
  linkUrl
}`);

export const SITEMAP_QUERY = defineQuery(`{
  "projects": *[_type == "project" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
  "experiences": *[_type == "experience" && defined(slug.current)]{ "slug": slug.current, _updatedAt }
}`);
