export const profile = {
  name: "Kevin",
  fullName: "Kyaw Paing Oo",
  role: "Full-stack developer",
  location: "Bangkok, Thailand",
  tagline:
    "I build production software end to end — enterprise backend systems by day, independent products on my own time.",
  email: "paingookyaw624@gmail.com",
  github: "https://github.com/Kyawpaingoo",
  linkedin: "https://www.linkedin.com/in/kyaw-paing-oo-dev",
  resumeUrl: "/files/Kyaw_Paing_Oo_Resume.pdf",
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
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "medibook",
    title: "MediBook — Clinic Booking API",
    category: "Personal Project · ASP.NET Core 8",
    description:
      "Production-style booking API — Redis cache-aside for slot availability, optimistic concurrency to prevent double-booking, deployed via keyless CI/CD to GCP Cloud Run.",
    stack: ["C# .NET", "PostgreSQL", "Redis", "Docker", "GCP Cloud Run"],
    githubUrl: "https://github.com/Kyawpaingoo/medibook",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export type Experience = {
  slug: string;
  title: string;
  org: string;
  period: string;
  description: string;
  linkLabel?: string;
  linkUrl?: string;
};

export const experiences: Experience[] = [
  {
    slug: "yammobots",
    title: "Full-stack developer",
    org: "Yammobots",
    period: "2023 — present",
    description:
      "Contributed to enterprise backend systems including SureBenefits, a public-facing benefits platform. Led the migration to a React + C# Web API architecture and implemented concurrency control for high-volume transactions.",
  },
  {
    slug: "colive",
    title: "Lead developer",
    org: "CoLive",
    period: "2025 — present",
    description:
      "Roommate-finder app, built solo from scratch — user workflow, database architecture, real-time chat, and full cloud deployment, all owned independently.",
  },
];

export function getExperienceBySlug(slug: string) {
  return experiences.find((experience) => experience.slug === slug);
}
