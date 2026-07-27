# Portfolio Migration Plan — Vite/three.js → Next.js + Motion

## Context

This repo (`my-portofolio`) is currently a Vite + React 19 + TypeScript site built
around a three.js/react-three-fiber 3D scene (orbit view, click-the-laptop
navigation, route-based content panels layered on top of the 3D canvas).

The goal is to **replace it entirely** with a minimal, dark, terminal-inspired
static site — no 3D, no router-based panel navigation. Single scrolling page,
four sections, animated with Motion (motion.dev, the successor to
framer-motion).

Design direction was agreed on already: dark background, teal accent,
monospace labels, inspired by akkila.dev's minimalism — explicitly rejecting
generic "creative-agency" templates and three.js/particle-heavy designs.

---

## 1. Remove

Delete these dependencies from `package.json` and remove all code that
references them:

- `three`
- `@react-three/fiber`
- `@react-three/drei`
- `@react-three/postprocessing`
- `leva`
- `gsap`
- `react-router-dom`
- `react-helmet-async` (replaced by Next's built-in metadata API)

Delete these directories/files entirely:
- `src/three/` (the whole 3D scene)
- `src/Pages/` (route-based pages — content gets folded into single-page sections)
- `src/Context/ThemeContext.tsx` and `src/Hook/useTheme.tsx` (site is dark-only now, no theme toggle)
- `src/App.tsx`, `src/main.tsx`, `index.html`, `vite.config.ts` (Vite entry points — replaced by Next App Router)

Keep and migrate:
- `public/files/Kyaw_Paing_Oo_Resume.pdf`
- `public/robots.txt`
- `public/sitemap.xml`
- Content/copy from `src/Data.ts` — **but replace the projects/experience arrays** with the new content specified below (the old NomadFocus/DevCanvas projects and old experience descriptions are being replaced, not kept)

---

## 2. Add

```
npm install motion @emailjs/browser lucide-react next
npm install -D tailwindcss postcss autoprefixer typescript @types/react @types/react-dom @types/node eslint eslint-config-next
```

Framework moves from Vite → **Next.js 14, App Router**. React stays around
v18 (Next 14 is most stable on React 18, not React 19).

`framer-motion` should be replaced by the `motion` package — same team, same
API, just import from `motion/react` instead of `framer-motion`.

---

## 3. Target file structure

```
src/
├── app/
│   ├── layout.tsx        # root layout, SEO metadata (replaces react-helmet-async)
│   ├── page.tsx           # assembles all sections, single scrolling page
│   └── globals.css        # tailwind directives + dotted-bg utility + reduced-motion handling
├── components/
│   ├── Navigation.tsx      # sticky nav, 4 anchor links (home/projects/experience/contact)
│   ├── Hero.tsx            # staggered Motion entrance on load
│   ├── Projects.tsx        # scroll-triggered reveal, maps over projects array
│   ├── Experience.tsx      # scroll-triggered reveal, maps over experiences array
│   └── Contact.tsx         # two-column layout + EmailJS-wired form
└── lib/
    └── data.ts              # ALL copy lives here — single source of truth
```

Config files needed at root: `package.json`, `tsconfig.json`, `next.config.mjs`,
`tailwind.config.ts`, `postcss.config.mjs`, `.env.example`, `.gitignore`.

---

## 4. Design tokens

Add these as Tailwind theme extensions (`tailwind.config.ts`):

| Token | Value | Use |
|---|---|---|
| `bg` | `#0d1117` | page background |
| `surface` | `#161b22` | card background |
| `border` | `#30363d` | default hairline border |
| `borderStrong` | `#3a3f47` | hover border state |
| `muted` | `#8b949e` | secondary text |
| `text` | `#e6edf3` | primary text |
| `accent.DEFAULT` | `#2dd4bf` | teal accent — links, labels, badges |
| `accent.dim` | `#0f766e` | CTA button background |
| `success` | `#3fb950` | "available" status badge |

Fonts: a monospace face (JetBrains Mono or similar) for labels/section
markers/nav, a regular sans-serif (Inter or similar) for body copy.

Global behavior: respect `prefers-reduced-motion`, visible focus rings on
all interactive elements (`outline: 2px solid` accent color), smooth anchor
scrolling.

---

## 5. Content specification

All content lives in `src/lib/data.ts`. Exact values:

### Profile
```
name: "Kevin"
fullName: "Kyaw Paing Oo"
role: "Full-stack developer"
location: "Bangkok, Thailand"
tagline: "I build production software end to end — enterprise backend
  systems by day, independent products on my own time."
email: "paingookyaw624@gmail.com"
github: "https://github.com/Kyawpaingoo"
linkedin: "https://www.linkedin.com/in/kyaw-paing-oo-dev"
resumeUrl: "/files/Kyaw_Paing_Oo_Resume.pdf"
stackShort: "C# / React / TypeScript"
```

### Projects (section 01) — MediBook only for now
```
title: "MediBook — Clinic Booking API"
category: "Personal Project · ASP.NET Core 8"
description: "Production-style booking API — Redis cache-aside for slot
  availability, optimistic concurrency to prevent double-booking, deployed
  via keyless CI/CD to GCP Cloud Run."
stack: ["C# .NET", "PostgreSQL", "Redis", "Docker", "GCP Cloud Run"]
githubUrl: "https://github.com/Kyawpaingoo/medibook"
```
Structured as an array so more projects can be added later without
touching the component.

### Experience (section 02) — two entries, Yammobots then CoLive
```
1. title: "Full-stack developer"
   org: "Yammobots"
   period: "2023 — present"
   description: "Contributed to enterprise backend systems including
     SureBenefits, a public-facing benefits platform. Led the migration
     to a React + C# Web API architecture and implemented concurrency
     control for high-volume transactions."
   linkLabel: "view SureBenefits"
   linkUrl: [SureBenefits public URL — fill in]

2. title: "Lead developer"
   org: "CoLive"
   period: "2025 — present"
   description: "Roommate-finder app, built solo from scratch — user
     workflow, database architecture, real-time chat, and full cloud
     deployment, all owned independently."
   linkLabel: "view repo"
   linkUrl: "https://github.com/Kyawpaingoo/colive"
```

---

## 6. Component behavior specs

**Navigation** — sticky top bar, backdrop blur, `kevin.dev` logo (teal,
monospace) on the left, four anchor links (home/projects/experience/contact)
on the right. No mobile hamburger needed — four links fit fine at any width.

**Hero** — availability badge (green dot + "available for remote work",
pulsing animation), `$ hi, I'm` terminal-style line above the name, name at
large size, role + location, tagline, two CTAs ("get in touch" filled teal,
"view projects" outlined). All elements stagger in on page load via Motion
(`staggerChildren`), not on scroll.

**Projects / Experience** — section label as `01 · PROJECTS` / `02 ·
EXPERIENCE` in monospace, teal-ish muted color. Cards fade+slide in on
scroll (`whileInView`, `viewport={{ once: true }}`), staggered slightly if
multiple cards. Each card: title + external link (opens in new tab), meta
line, description, stack tag pills (monospace, bordered, rounded-full).

**Contact** — section sits on a subtle dotted background pattern
(`radial-gradient` dot grid). Two-column grid on desktop, stacks on mobile.
Left column: large clickable email (mailto:), a definition-list style
meta block (location / status / stack / github / linkedin), each row
`label` in muted monospace + `value`. Right column: bordered card containing
the actual form — Name / Email / Message fields (monospace uppercase
labels with a teal asterisk for required), Send button with an arrow icon,
plus a small "protected · rate-limited" caption. Submitting sends via
EmailJS (`@emailjs/browser`), reading `NEXT_PUBLIC_EMAILJS_SERVICE_ID` /
`_TEMPLATE_ID` / `_PUBLIC_KEY` from env — if any are missing, fall back to
opening a `mailto:` link so the form never silently fails. Show inline
success/error messages after submit.

---

## 7. SEO / metadata

Replace `react-helmet-async` usage with Next's `Metadata` export in
`app/layout.tsx` — title, description, keywords, Open Graph, and Twitter
card fields, carried over from the old site's meta tags (see old
`index.html` / `SEO.tsx` for exact original copy to preserve).

---

## 8. Acceptance criteria

- [ ] `npm run build` completes with no type errors and generates a static page
- [ ] No references to `three`, `react-three-fiber`, `gsap`, or `react-router-dom` remain anywhere in `src/`
- [ ] First Load JS is well under the old three.js bundle size (should land under ~150KB)
- [ ] All four sections render in order: Hero → Projects → Experience → Contact
- [ ] Contact form either sends via EmailJS or falls back to `mailto:` — never fails silently
- [ ] `prefers-reduced-motion` is respected (check `globals.css`)
- [ ] Keyboard focus is visible on every link, button, and form field
- [ ] Site is responsive down to mobile width (two-column contact grid collapses to one column)
- [ ] Resume PDF link, GitHub link, and LinkedIn link all point to the correct real URLs

---

## 9. Open items to fill in before/during implementation

- SureBenefits public URL (currently a placeholder `#` — needs the real link)
- CoLive GitHub repo URL — confirm it's public before linking
- ~~Final decision on deployed domain~~ — resolved: using
  `kyawpaingoo-dev.vercel.app` (`metadataBase` in `layout.tsx`, sitemap.xml,
  robots.txt updated)
- EmailJS service/template/public key — needed in `.env.local` for the
  contact form to actually send mail instead of falling back to `mailto:`
