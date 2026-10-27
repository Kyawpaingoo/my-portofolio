# Kevin Dev Portfolio

Personal portfolio for Kyaw Paing Oo (Kevin), live at
https://kyawpaingoo.dev. The content is managed in
[Sanity](https://www.sanity.io), rendered with Next.js, and deployed to
Cloudflare Workers.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**, Tailwind CSS, Motion
- **Sanity** headless CMS, with the Studio embedded at `/studio`
- **Cloudflare Workers** via [OpenNext](https://opennext.js.org/cloudflare)
  (`@opennextjs/cloudflare` + Wrangler)
- **Bun** as package manager and local runtime

## Getting started

```bash
bun install
cp .env.example .env.local        # Sanity project ID/dataset are prefilled
cp .dev.vars.example .dev.vars    # local Cloudflare vars
bun run dev
```

The site runs on http://localhost:3000 and the Studio on
http://localhost:3000/studio.

### Studio access

`/studio` is protected by Cloudflare Access, limited to an email allowlist,
in addition to Sanity's own login. Access signs you in; `src/proxy.ts`
(`src/lib/studio-access.ts`) then checks the token Access adds to each request
(`Cf-Access-Jwt-Assertion`), so requests that bypass Access are rejected.

Access can protect a single path only on a domain that is an active zone in
your Cloudflare account: add a self-hosted Access application for
`<domain>/studio*` (Zero Trust → Access → Applications) with an Allow policy
for your email. On `workers.dev`, Access can only protect the whole URL.

Worker secrets (`bunx wrangler secret put <NAME>`):

| Variable | Value |
| --- | --- |
| `CF_ACCESS_TEAM_DOMAIN` | `https://<team>.cloudflareaccess.com` (Zero Trust → Settings → Team name) |
| `CF_ACCESS_AUD` | The Access application's Application Audience (AUD) tag |
| `STUDIO_ALLOWED_EMAILS` | Comma-separated emails allowed in (also enforced by the Access policy) |

`bun run dev` skips the check on localhost; `bun run preview` doesn't, so
the Studio is locked there unless requests carry a real Access token. If any
secret is missing in production, the Studio stays locked.

To log in to the Studio locally, the origin must be allowed in Sanity
(sanity.io/manage → API → CORS origins, with credentials), or from the CLI:

```bash
bunx sanity login
bunx sanity cors add http://localhost:3000 --credentials
```

(`http://localhost:3000` and the production URL are already allowed.)

## Editing content

Everything on the site comes from Sanity (project `y4z0ptkw`, dataset
`production`):

| Studio entry  | Used for                                                  |
| ------------- | --------------------------------------------------------- |
| Profile       | Hero, contact details, footer, photo, resume PDF          |
| Site settings | Page title/description, SEO keywords, social image, JSON-LD, site URL (sitemap, canonical URLs) |
| Experience    | Experience cards and `/experience/[slug]` pages           |
| Projects      | Project cards and `/projects/[slug]` pages                |

Cards are sorted by the `order` field (lower first). Words listed under
**keywords** are highlighted wherever they appear in that entry's text.

Pages are prerendered at build time, so **published changes go live on the
next deploy** (`bun run deploy`). The `build` script clears
`.next/cache/fetch-cache` first so every build reads fresh content.

## Scripts

| Script               | What it does                                                        |
| -------------------- | ------------------------------------------------------------------- |
| `bun run dev`        | Next.js dev server (Bun runtime)                                     |
| `bun run build`      | Production build                                                     |
| `bun run lint`       | ESLint                                                               |
| `bun run typegen`    | Extracts the Sanity schema and regenerates `src/sanity/types.ts`     |
| `bun run preview`    | Builds the Worker and runs it locally in `workerd` (port 8787)       |
| `bun run deploy`     | Builds and deploys the Worker to Cloudflare                          |
| `bun run upload`     | Builds and uploads a new Worker version without deploying it         |
| `bun run cf-typegen` | Regenerates `cloudflare-env.d.ts` after changing `wrangler.jsonc`    |

Run `bun run typegen` after changing a schema in `src/sanity/schemaTypes/` or
a query in `src/sanity/queries.ts`.

## Deploying

```bash
bunx wrangler login   # once
bun run deploy
```

`NEXT_PUBLIC_*` variables (Sanity, EmailJS) are inlined at build time, so they
must be set in `.env.local` (or CI) wherever `bun run deploy` runs.

OpenNext uses the read-only static-assets cache (`open-next.config.ts`): every
page is prerendered at build time and served from Workers Static Assets.
Nothing is cached in R2, KV or Durable Objects, so content published in Sanity
goes live on the next deploy.

> OpenNext supports Windows "at your own risk". If a build misbehaves, use WSL
> or deploy from CI. Stop `bun run dev` before `bun run preview`/`deploy`:
> the dev server's local Cloudflare runtime locks `.open-next/`.

## Project structure

```
sanity.config.ts               Studio config (mounted at /studio)
sanity.cli.ts                  Sanity CLI + typegen config
open-next.config.ts            OpenNext cache config (static assets)
wrangler.jsonc                 Cloudflare Worker config
src/
  app/
    layout.tsx                 <html>, fonts, metadata from Site settings
    (site)/                    the portfolio (nav, footer, JSON-LD)
    studio/[[...tool]]/        embedded Sanity Studio (client-only)
    sitemap.ts  robots.ts      generated from Sanity
  components/                  UI sections, cards and detail views
  lib/content.ts               content getters used by pages
  sanity/
    schemaTypes/               content model
    queries.ts                 GROQ queries
    types.ts                   generated by `bun run typegen`
    lib/                       client, fetch, image URL helpers
```
