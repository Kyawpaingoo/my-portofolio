# Sanity Headless CMS Integration Plan

## Context

The portfolio is a Next.js 16.3 (App Router, Turbopack) + React 19.3 + Tailwind +
Motion site. It was upgraded from Next 14 / React 18 before starting this plan.
Bun is the package manager and local runtime. The site deploys to Cloudflare
Workers via OpenNext (`@opennextjs/cloudflare`, `wrangler.jsonc`,
`open-next.config.ts`). All content is hardcoded in `src/lib/data.ts`:

| Export | Shape | Consumers |
| --- | --- | --- |
| `profile` | single object (name, role, tagline, `taglineKeywords`, links, `resumeUrl`, `imageUrl`) | `Hero`, `Contact`, `Footer` |
| `projects: Project[]` | slug, title, category, description, stack, highlights, keywords, githubUrl | `Projects`, `ProjectCard`, `ProjectDetail`, `app/projects/[slug]` |
| `experiences: Experience[]` | slug, title, org, period, description, stack, highlights, keywords + optional overview, products, challenge, beforeAfter, whyItMatters, mockups, link | `Experience`, `ExperienceCard`, `ExperienceDetail`, `app/experience/[slug]` |

Other content lives outside `data.ts`:
- SEO metadata and JSON-LD are hardcoded in `src/app/layout.tsx`.
- Images: profile photo on ImageKit (`ik.imagekit.io`), CoLive mockups in `public/mockups/colive/`.
- Resume PDF at `public/files/KyawPaingOo_CV.pdf`.
- `public/sitemap.xml` is static and lists only `/` (detail pages are missing).
- `contents/*.md` are authoring notes, not read at runtime.

**Main constraint:** every section component (`Hero`, `Experience`,
`Projects`, `Contact`, the cards and detail views) is a `"use client"`
component that imports data directly. Sanity data has to be fetched in server
components (`page.tsx`, `layout.tsx`) and passed down as props.

**Goal:** move all portfolio content into Sanity so it can be edited without a
code change or redeploy. The visual design and behaviour stay the same.

---

## Key decisions

1. **Studio hosting: embedded at `/studio` in the Next app.**
   Now that the app is on Next 16 / React 19, the current `sanity` and
   `next-sanity` releases can run inside it. The Studio mounts at
   `src/app/studio/[[...tool]]/page.tsx` via `NextStudio`, so there's one repo,
   one deploy and one domain. It sits in its own route segment, so the Studio
   bundle never loads on portfolio pages. Keep `/studio` out of the sitemap and
   mark it `noindex`.
2. **Text stays as plain strings, not Portable Text (phase 1).**
   `HighlightText` works by regex-matching `keywords[]` against plain strings.
   Keeping `text` fields plus `keywords` arrays means the components don't
   change. Moving to Portable Text with a `highlight` decorator (which would
   replace the keyword arrays) is listed as an optional follow-up.
3. **Rendering: static generation, content refreshed on deploy.** *(Revised
   2026-09-26: no Durable Objects and no caches in R2.)* OpenNext uses the
   read-only `staticAssetsIncrementalCache`. Every page is prerendered at build
   time with the latest published Sanity content and served from Workers Static
   Assets. Publishing in Sanity goes live on the next `bun run deploy`. Fetches
   use Next's default caching, and the `build` script clears
   `.next/cache/fetch-cache` so each build reads fresh content. With
   `dynamicParams = true`, a slug published after a deploy still renders on
   request (uncached until the next deploy). Webhook-driven revalidation would
   need a writable cache + tag cache: follow-up O4.
4. **Ordering:** add an `order` number field to `project` and `experience`
   because the page currently relies on array order. (Alternative:
   `@sanity/orderable-document-list` for drag-and-drop.)
5. **Types:** use `sanity typegen` to generate TS types from the schema and
   GROQ queries. Keep the `Project` / `Experience` names as re-exported aliases
   so component imports barely change.
6. **Assets:** upload the profile photo, mockups and resume PDF to Sanity. Add
   `cdn.sanity.io` to `next.config.mjs` `images.remotePatterns`, and keep
   ImageKit until cutover is finished.

---

## Content model (schemas)

**`profile`** (singleton, fixed `_id: "profile"`)
- `name`, `fullName`, `role`, `location`, `stackShort`: string
- `tagline`: text; `taglineKeywords`: string[]
- `email`: string (email validation); `github`, `linkedin`: url
- `image`: image (hotspot, required `alt`)
- `resume`: file (accept `.pdf`)

**`siteSettings`** (singleton, `_id: "siteSettings"`, phase 5)
- `title`, `description`, `siteUrl`, `keywords[]`, `ogImage`, `siteName`
- `jsonLd`: `jobTitle`, `worksFor`, `knowsAbout[]`

**`project`** (document)
- `title` (req), `slug` (req, source: title), `order` (number)
- `category`, `description` (text, req)
- `stack[]`, `highlights[]` (text), `keywords[]`
- `githubUrl` (url, optional)

**`experience`** (document)
- `title` (req), `org` (req), `slug` (req), `period`, `order`
- `description` (text, req), `stack[]`, `highlights[]`, `keywords[]`
- optional: `overview`, `challenge`, `whyItMatters` (text)
- `products[]` → object `product { name, description }`
- `beforeAfter` → object `{ before, after }`
- `mockups[]` → image with required `alt` field
- `linkLabel` (string), `linkUrl` (url)

Structure: a custom desk structure that pins the Profile / Site Settings
singletons, then lists Projects and Experience sorted by `order`.

---

## Target file layout

```
sanity.config.ts                 # Studio config (basePath: "/studio")
sanity.cli.ts                    # CLI config (typegen, schema extract)
src/app/(site)/layout.tsx        # site chrome (nav, footer, cursor glow, JSON-LD)
src/app/studio/[[...tool]]/page.tsx  # <NextStudio config={config} />, noindex metadata
src/sanity/
  lib/client.ts  lib/image.ts
  structure.ts                   # desk structure (singletons + ordered lists)
  schemaTypes/
    index.ts
    profile.ts  siteSettings.ts  project.ts  experience.ts
    objects/product.ts  objects/beforeAfter.ts  objects/mockup.ts
  env.ts                         # projectId, dataset, apiVersion (validated)
  client.ts                      # createClient (useCdn per env)
  fetch.ts                       # sanityFetch({ query, params, tags })
  image.ts                       # urlFor() via @sanity/image-url
  queries.ts                     # GROQ queries (defineQuery)
  types.ts                       # generated by sanity typegen
src/lib/content.ts               # getProfile/getProjects/getProjectBySlug/... (replaces data.ts)
src/app/sitemap.ts               # dynamic sitemap incl. detail pages
```

---

## Environment variables

Add to `.env.example` and `.env.local`. For Cloudflare:
- `NEXT_PUBLIC_*` values are inlined by `next build`, so they must be set
  wherever `bun run deploy` runs (local shell or CI). They are **not** Worker vars.
- The dataset is public, so no server-side Sanity token is needed. If it
  becomes private, add `SANITY_API_READ_TOKEN` with `wrangler secret put` (and
  to `.dev.vars` for local preview).


```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_API_READ_TOKEN=          # only if the dataset is private
```

In sanity.io/manage, add CORS origins for `http://localhost:3000`,
`http://localhost:8787` (for `bun run preview`) and the production Workers
domain (`portfolio-web.<subdomain>.workers.dev` or your custom domain) with
**Allow credentials** turned on,
which the embedded Studio needs to log in.

---

## Tasks

### Phase 0 — Setup
- [x] **T0.1** Create a Sanity project + `production` dataset (sanity.io/manage). Decide public vs private dataset. *Done: project `y4z0ptkw`, public `production` dataset.*
- [x] **T0.2** Install `sanity`, `next-sanity`, `@sanity/image-url` (and `@sanity/vision` for the GROQ playground). Check the peer deps against Next 16.3 / React 19.3 and record the versions here. *Done: `sanity@6.16.0`, `next-sanity@13.3.4`, `@sanity/vision@6.16.0`, `@sanity/image-url@2.1.1`, `styled-components@6.5.3`.*
- [x] **T0.3** Add the env vars above to `.env.example` and `.env.local`; add CORS origins; make sure `.gitignore` covers `.env*.local`. *Env vars done. `http://localhost:3000` is now allowed; **still to do** for other origins: run `bunx sanity cors add http://localhost:3000 --credentials` (and the same for `:8787` and the production domain).* *CORS done: `http://localhost:3000` and `https://portfolio-web.paingookyaw624.workers.dev` (with credentials).*

### Phase 1 — Studio and schemas
- [x] **T1.1** Add `sanity.config.ts` (`basePath: "/studio"`, `structureTool`, `visionTool`) and `sanity.cli.ts` at the repo root. Mount the Studio at `src/app/studio/[[...tool]]/page.tsx` using `NextStudio`, and re-export `metadata`/`viewport` from `next-sanity/studio` with `robots: noindex`.
- [x] **T1.2** Write the object schemas: `product`, `beforeAfter`, `mockup` (image + required `alt`).
- [x] **T1.3** Write the `profile` singleton schema (image with hotspot, resume file).
- [x] **T1.4** Write the `project` schema with validation (required fields, unique slug, url validation) and a preview (title + category).
- [x] **T1.5** Write the `experience` schema with validation, fieldsets/groups for the optional detail-page fields, and a preview (title + org + period).
- [x] **T1.6** Custom structure: singleton entries for Profile (and later Site Settings), lists ordered by `order`; hide singleton types from "Create new".
- [x] **T1.7** Run `bun run dev`, open `http://localhost:3000/studio`, and check that every form renders. Also check that the Studio's global styles don't leak into portfolio pages. *Studio renders at `/studio` (login screen). Checking the forms needs a login and CORS (T0.3). The site chrome now lives in `src/app/(site)/layout.tsx`, so `/studio` gets no nav/footer/cursor glow.*
- [x] **T1.8** Add a short "Studio" section to `README.md`. The Studio deploys with the site on Cloudflare (`bun run deploy`), so no separate `sanity deploy` is needed. Check that the Studio bundle still fits the Worker size limit (`wrangler deploy --dry-run`). *Done: README rewritten (setup, Studio, content, scripts, deploy).*

### Phase 2 — Content migration
- [x] **T2.1** Write `scripts/seed-sanity.ts`: import `profile`, `projects`, `experiences` from `src/lib/data.ts`, map them to Sanity docs with deterministic IDs (`profile`, `project-<slug>`, `experience-<slug>`), set `order` from array index, and use `createOrReplace` so re-runs are safe.
- [x] **T2.2** In the seed script, upload assets: the profile photo (fetched from ImageKit), `public/mockups/colive/*.png` (keep the alt text), and `public/files/KyawPaingOo_CV.pdf`, then reference them from the docs.
- [x] **T2.3** Run the seed against `production` with `bun run scripts/seed-sanity.ts` (Bun runs TypeScript directly and reads `.env.local` itself) and check in Studio that all fields and images came through. Delete the write token afterwards. *Done: 5 documents + 5 assets in `production` (via `sanity exec --with-user-token`, no write token). The script was then removed with `data.ts` (see git history).*

### Phase 3 — Next.js data layer
- [x] **T3.1** Install client deps in the root app; create `src/sanity/env.ts` (throws a clear error if vars are missing), `client.ts`, `image.ts`. *Done: `src/sanity/env.ts`, `src/sanity/lib/client.ts`, `src/sanity/lib/image.ts`.*
- [x] **T3.2** Write GROQ queries in `src/sanity/queries.ts`: `PROFILE_QUERY`, `PROJECTS_QUERY` (ordered by `order`), `PROJECT_BY_SLUG_QUERY`, `PROJECT_SLUGS_QUERY`, and the matching experience queries. Project image and file URLs (`image.asset->url`, `resume.asset->url`) and dimensions in the queries so components receive plain strings.
- [x] **T3.3** Set up `sanity typegen` (`sanity schema extract` + `sanity typegen generate` → `src/sanity/types.ts`) and add a `typegen` script (`bunx sanity schema extract && bunx sanity typegen generate`).
- [x] **T3.4** Create `src/sanity/fetch.ts`, a `sanityFetch` wrapper that sets cache `tags` (`profile`, `project`, `experience`) and passes the read token when the dataset is private. *Revised: no cache tags (see decision 3).*
- [x] **T3.5** Create `src/lib/content.ts` with `getProfile`, `getProjects`, `getProjectBySlug`, `getExperiences`, `getExperienceBySlug`. Re-export the `Project` / `Experience` / `Profile` types with the shapes components already expect.
- [x] **T3.6** Add `cdn.sanity.io` to `images.remotePatterns` in `next.config.mjs`. *`ik.imagekit.io` removed at the same time.*

### Phase 4 — Component refactor (server fetch → props)
- [x] **T4.1** `src/app/(site)/page.tsx` → `async`: fetch profile, projects, experiences in parallel (`Promise.all`) and pass them as props to `Hero`, `Experience`, `Projects`, `Contact`.
- [x] **T4.2** `Hero`, `Contact`: accept `profile` as a prop instead of importing from `data.ts`. Use the Sanity image URL (with hotspot-aware `urlFor`) and the Sanity resume URL.
- [x] **T4.3** `Experience`, `Projects`: accept `experiences` / `projects` props; `ExperienceCard`, `ProjectCard`: switch type imports to `@/lib/content`.
- [x] **T4.4** `src/app/(site)/layout.tsx` → `async`: fetch the profile for `Footer`, and pass `profile` into `Footer` as a prop (also in `src/app/not-found.tsx`).
- [x] **T4.5** `app/(site)/projects/[slug]/page.tsx` and `app/(site)/experience/[slug]/page.tsx`: make `generateStaticParams` `async` and switch to the content getters (params are already awaited via `PageProps<...>` since the upgrade); `export const dynamicParams = true`.
- [x] **T4.6** `ExperienceDetail`: render mockups from Sanity image URLs with width/height from asset metadata; keep `alt`.
- [x] **T4.7** Handle an empty or missing CMS doc: the section hides itself, `notFound()` on detail pages, and missing required env vars fail the build.
- [x] **T4.8** Run `bun run build` and `bun run lint`; compare the pages visually against the current site (home, both experience pages, the project page). *Lint and build pass; pages checked in the browser against Sanity content.*

### Phase 5 — SEO and publishing flow
- [x] **T5.1** Add the `siteSettings` singleton schema and seed it from the current `layout.tsx` metadata and JSON-LD.
- [x] **T5.2** `layout.tsx`: replace the static `metadata` with `generateMetadata()` reading `siteSettings`, and build the JSON-LD from it plus the profile. *JSON-LD lives in `(site)/layout.tsx`; the missing `/og-image.png` now falls back to the profile photo.*
- [x] **T5.3** Per-page OG: project and experience `generateMetadata` include `openGraph` title/description (and optionally an image). *Also added per-page canonical URLs (they all inherited `/` before).*
- [x] **T5.4** Replace `public/sitemap.xml` with `src/app/sitemap.ts` that lists `/` plus every project and experience slug from Sanity; check `robots.txt` still points to it. *Also replaced `public/robots.txt` with `src/app/robots.ts`.*
- [~] **T5.0** *Dropped (decision 3): static-assets cache only; no R2, D1 or Durable Objects.*
- [~] **T5.5** *Dropped for now: `/api/revalidate` removed; a route that can't revalidate would be misleading.*
- [~] **T5.6** *Dropped for now (no webhook needed; publish → `bun run deploy`).*
- [x] **T5.7** Deploy with `bun run deploy`, set **Site settings → Site URL**, add the origin to Sanity CORS, and redeploy. *Done: live at https://portfolio-web.paingookyaw624.workers.dev (static-assets cache; the R2 bucket `portfolio-web-cache` from an earlier deploy is no longer used). The `build` script now clears `.next/cache/fetch-cache`, because Next had reused stale Sanity responses across builds.*

### Phase 6 — Cleanup
- [x] **T6.1** Delete `src/lib/data.ts` (keep `HighlightText`, which stays generic). *Removed with the one-off seed script.*
- [x] **T6.2** Remove the migrated assets from `public/` (`mockups/colive/*`, the resume PDF). Remove `ik.imagekit.io` from `remotePatterns` once nothing references it.
- [ ] **T6.3** Decide whether to archive `contents/*.md` (the content now lives in Sanity). *Left in place: your call.*
- [x] **T6.4** Update `README.md`: architecture, env vars, `typegen` / seed scripts, how to add content.

### Optional follow-ups
- [ ] **O1** Draft Mode + Presentation tool (visual editing / live preview) via `defineLive` / `<SanityLive>` from `next-sanity`. Needs `/api/draft-mode/enable`, `stega`, and a viewer token. It fits naturally now that the Studio is embedded.
- [ ] **O2** Portable Text for long-form fields (`overview`, `challenge`, `whyItMatters`) with a `highlight` decorator that replaces the `keywords` arrays.
- [ ] **O3** Drag-and-drop ordering via `@sanity/orderable-document-list`.
- [x] **S1** Restrict `/studio` to the owner. *Done: Cloudflare Access with an email allowlist, its token checked in `src/proxy.ts` (replaced the original HTTP Basic Auth) (Node runtime; OpenNext's Cloudflare support for it is experimental), with credentials from the Cloudflare env (`.dev.vars` / Worker secrets) and fail-closed. Cloudflare Access can't target a path on `workers.dev` (it needs an active zone), so see O5.*
- [ ] **O5** With a custom domain on Cloudflare: put a Cloudflare Access self-hosted app on `<domain>/studio*` with an Allow policy for your email (one-time PIN or Google), then optionally drop the Basic Auth.
- [ ] **O4** Publish without redeploying: switch OpenNext to a writable incremental cache (R2) + a tag cache (D1 or Durable Objects), restore `revalidateTag` fetch tags, add `/api/revalidate` (`parseBody` + `revalidateTag(type, { expire: 0 })`) and a Sanity GROQ webhook. Alternative: trigger a rebuild/deploy from a Sanity webhook via CI.

---

## Risks and notes

- **Version coupling:** check `next-sanity` / `sanity` peer deps against Next 16.3.6 / React 19.3.0 before installing (T0.2).
- **Studio in the app:** keep Studio imports (`sanity`, `sanity.config.ts`) out of anything the portfolio pages import, so the site bundle stays lean.
- **Client/server boundary:** don't import `src/sanity/client.ts` or tokens into `"use client"` files. Only serializable props should cross the boundary.
- **Build-time dependency:** static generation now needs Sanity at build time, so a Sanity outage or a missing env var fails the build (intended, per T4.7).
- **Image layout:** Sanity images need explicit width/height (or `fill`) for `next/image`; pull `asset->metadata.dimensions` in the queries.
- **Contact form:** EmailJS is unaffected; only the `profile.email` display moves to Sanity.
