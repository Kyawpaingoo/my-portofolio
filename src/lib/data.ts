export const profile = {
  name: "Kevin",
  fullName: "Kyaw Paing Oo",
  role: "Full-stack developer",
  location: "Bangkok, Thailand",
  tagline:
    "Full-stack developer with 3+ years of hands-on experience across CRM, healthcare, and social apps. Comfortable owning features end to end — from backend APIs and database design through to frontend flows, integrations, and production support.",
  taglineKeywords: [
    "3+ years",
    "CRM",
    "healthcare",
    "social apps",
    "backend APIs",
    "database design",
    "frontend flows",
    "integrations",
    "production support",
  ],
  email: "paingookyaw624@gmail.com",
  github: "https://github.com/Kyawpaingoo",
  linkedin: "https://www.linkedin.com/in/kyaw-paing-oo-dev",
  resumeUrl: "/files/KyawPaingOo_CV.pdf",
  stackShort: "C# / React / TypeScript",
  imageUrl:
    "https://ik.imagekit.io/6unkq5rnk/Kyaw%20Paing%20Oo%20(Kevin)(1).jpg",
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  highlights: string[];
  keywords: string[];
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "medibook",
    title: "MediBook — Clinic Appointment Booking API",
    category: "Personal Project · C# .NET Core 10",
    description:
      "Production-style clinic appointment booking API — Redis-backed real-time slot availability, optimistic concurrency to prevent double-booking, deployed via GitHub Actions CI/CD to GCP Cloud Run.",
    stack: [
      "C# .NET Core 10",
      "Neon PostgreSQL",
      "Redis",
      "Docker",
      "GitHub Actions",
      "GCP Cloud Run",
    ],
    highlights: [
      "Developed optimistic concurrency control with EF Core row-versioning to prevent double-booking during high-volume booking periods.",
      "Designed a slot state machine (Available, Reserved, Confirmed, Cancelled) to manage the appointment lifecycle with clear transactions and audit trail.",
      "Implemented Redis caching for real-time slot availability on every booking and cancellation to maintain data consistency.",
      "Deployed to GCP Cloud Run from GitHub Actions CI/CD with a multi-stage Dockerfile.",
    ],
    keywords: [
      "C# .NET Core 10",
      "Neon PostgreSQL",
      "Redis",
      "Docker",
      "GitHub Actions",
      "GCP Cloud Run",
      "EF Core row-versioning",
      "optimistic concurrency",
      "double-booking",
      "slot state machine",
      "multi-stage Dockerfile",
      "CI/CD",
    ],
    githubUrl: "https://github.com/Kyawpaingoo/medibook",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export type MockupImage = {
  src: string;
  alt: string;
};

export type Experience = {
  slug: string;
  title: string;
  org: string;
  period: string;
  description: string;
  stack: string[];
  highlights: string[];
  keywords: string[];
  overview?: string;
  products?: { name: string; description: string }[];
  challenge?: string;
  beforeAfter?: { before: string; after: string };
  whyItMatters?: string;
  mockups?: MockupImage[];
  linkLabel?: string;
  linkUrl?: string;
};

export const experiences: Experience[] = [
  {
    slug: "yammobots",
    title: "Full-Stack Developer",
    org: "Yammobots",
    period: "Sep 2023 — Present",
    description:
      "Contributed to enterprise backend systems across SureBenefits (rewards & loyalty platform), Cinema, and CareMe — led the ASP.NET MVC → React + C# Web API migration and implemented concurrency control for high-volume transactions.",
    stack: [
      "C# .NET",
      "ASP.NET Core Web API",
      "Entity Framework Core",
      "Azure App Service",
      "Azure Blob Storage",
      "React",
      "CI/CD pipelines",
    ],
    highlights: [
      "Developed and delivered enterprise-level backend systems for SureBenefits, CareMe, and Cinema using C# .NET API integrated with Azure App Service and Azure Blob Storage.",
      "Played a key role in upgrading the legacy ASP.NET MVC codebases into a modern React frontend and C# Web API architecture — improving system scalability, maintainability, and reducing tight coupling.",
      "Implemented optimistic concurrency control with row-versioning to prevent data conflicts during payment transactions for a high-volume pre-order system.",
      "Participated in requirement reviews, unit testing, code review, and architecture decisions.",
      "Introduced CI/CD pipelines for staging and production deployments, replacing manual processes and improving deployment consistency, speed, and reliability.",
      "Collaborated closely with cross-functional teams — designers, mobile developers, and product managers — to deliver scalable and maintainable solutions.",
    ],
    keywords: [
      "SureBenefits",
      "rewards & loyalty platform",
      "Cinema",
      "CareMe",
      "C# .NET API",
      "Azure App Service",
      "Azure Blob Storage",
      "ASP.NET MVC",
      "React",
      "C# Web API",
      "optimistic concurrency control",
      "row-versioning",
      "CI/CD",
      "unit testing",
      "code review",
      "pre-order system",
    ],
    overview:
      "At Yammobots, I work as a full-stack developer across three production platforms — each serving a different industry, each with its own real users and real operational stakes. My work spans backend architecture, legacy modernization, and the production concerns that don't show up in a demo: concurrency, deployment reliability, and cross-team delivery.",
    products: [
      {
        name: "SureBenefits",
        description:
          "A rewards, promotions, and customer loyalty platform. This is the product I've done the most architectural work on — including the ASP.NET MVC → React + C# Web API migration and the concurrency work that keeps transactions consistent under load.",
      },
      {
        name: "Cinema",
        description:
          "A cinema management system — handling scheduling, seating, and transaction flows for cinema operations.",
      },
      {
        name: "CareMe",
        description:
          "A clinic management platform — patient and appointment-adjacent workflows for healthcare operations.",
      },
    ],
  },
  {
    slug: "colive",
    title: "Lead Developer",
    org: "CoLive — Roommate Finder App",
    period: "Aug 2025 — Present",
    description:
      "CoLive started as a Lovable-generated prototype to quickly validate the roommate-matching concept. I took it from there and rebuilt it into a real production application — redesigning the database schema for graph-based compatibility matching, replacing prototype auth with proper OAuth 2.0, building real-time chat infrastructure, and deploying it independently across web, mobile, and API layers.",
    stack: [
      "React Native",
      "Expo",
      "Node.js",
      "Hono",
      "Drizzle",
      "Supabase (PostgreSQL)",
      "pgGraph",
      "OAuth 2.0",
      "Cloudflare Workers",
    ],
    highlights: [
      "Redesigned the database schema to support graph-based roommate compatibility matching using Supabase (PostgreSQL) and pgGraph for real-time relationship queries — a fundamentally different data model than a typical prototype generates.",
      "Replaced prototype-level auth with proper OAuth 2.0, closing the gap between looking like it works and being secure enough for real users to trust with their data.",
      "Built real-time chat messaging infrastructure with Node.js, Hono, and Drizzle, enabling live conversation between matched roommates.",
      "Deployed and configured cloud infrastructure on Cloudflare Workers independently across the React Native (Expo) mobile app, web app, and API layer.",
      "Designed the user onboarding and matching workflow from first principles, mapping out the full experience before writing implementation code.",
    ],
    keywords: [
      "Lovable-generated prototype",
      "graph-based roommate compatibility matching",
      "Supabase (PostgreSQL)",
      "pgGraph",
      "OAuth 2.0",
      "Node.js",
      "Hono",
      "Drizzle",
      "real-time chat messaging",
      "Cloudflare Workers",
      "React Native",
      "Expo",
      "user onboarding",
    ],
    overview:
      "CoLive is a roommate-matching platform, and its origin story is the most honest thing about it: it didn't start as a from-scratch engineering project. It started as a Lovable-generated prototype — a fast way to validate whether the roommate-matching concept actually held up before investing real engineering time into it. Once the idea proved out, the real work began: taking a vibe-coded prototype and rebuilding it into something production-grade.",
    challenge:
      "Anyone can generate a working prototype in an afternoon now. The harder — and more valuable — skill is knowing what to keep and what to rebuild once that prototype proves the idea works. A vibe-coded app is good at exactly one thing: showing you a working UI fast enough to react to. It is not good at security, data integrity, or scaling past a handful of test users. The judgment call — and the actual engineering work — was in identifying precisely which parts of the prototype could stay and which needed to be torn out and rebuilt before real users could depend on it.",
    beforeAfter: {
      before:
        "Lovable-generated prototype — functional enough to validate the concept, but built on prototype-grade auth, a simple relational structure with no compatibility-matching logic, and no real-time infrastructure.",
      after:
        "Production application with graph-based matching, OAuth 2.0 authentication, real-time chat, and independently managed cloud infrastructure across web, mobile, and API.",
    },
    whyItMatters:
      "This isn't a “look what AI can build” story — it's the opposite. It's proof that the valuable skill going forward isn't refusing to use fast prototyping tools, it's knowing exactly where their output ends and real engineering has to begin. That judgment — not the initial prototype — is what makes CoLive a real product rather than a demo.",
    mockups: [
      {
        src: "/mockups/colive/colive-map.png",
        alt: "CoLive map screen showing nearby active users and listed rooms",
      },
      {
        src: "/mockups/colive/colive-profile.png",
        alt: "CoLive profile screen showing room status, budget, and roommate preferences",
      },
      {
        src: "/mockups/colive/colive-chat.png",
        alt: "CoLive messages screen showing roommate chat conversations",
      },
    ],
    linkLabel: "visit colive.info",
    linkUrl: "https://www.colive.info/",
  },
];

export function getExperienceBySlug(slug: string) {
  return experiences.find((experience) => experience.slug === slug);
}
