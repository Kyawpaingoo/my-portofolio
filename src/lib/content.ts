import { mediaUrl } from "@/lib/media";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  EXPERIENCE_BY_SLUG_QUERY,
  EXPERIENCES_QUERY,
  PROFILE_QUERY,
  PROJECT_BY_SLUG_QUERY,
  PROJECTS_QUERY,
  SITE_SETTINGS_QUERY,
  SITEMAP_QUERY,
  TECH_STACK_QUERY,
} from "@/sanity/queries";
import type {
  EXPERIENCE_BY_SLUG_QUERY_RESULT,
  PROJECTS_QUERY_RESULT,
} from "@/sanity/types";
import type { TechStackIcon } from "@/lib/tech-stack";

export type Profile = {
  name: string;
  fullName: string;
  role: string;
  location?: string;
  stackShort?: string;
  tagline: string;
  taglineKeywords: string[];
  email: string;
  github?: string;
  linkedin?: string;
  imageUrl?: string;
  imageAlt: string;
  resumeUrl?: string;
};

export type SiteSettings = {
  title: string;
  description: string;
  siteUrl: string;
  siteName?: string;
  keywords: string[];
  ogImageUrl?: string;
  jobTitle?: string;
  worksFor?: string;
  knowsAbout: string[];
};

export type Project = {
  slug: string;
  title: string;
  kind: "work" | "personal";
  category?: string;
  description: string;
  stack: string[];
  highlights: string[];
  keywords: string[];
  githubUrl?: string;
  liveUrl?: string;
  mockups?: MockupImage[];
  /** Set when an experience lists this project; names the org on work badges. */
  experience?: { slug: string; org: string };
};

export type TechStackGroup = {
  name: string;
  kicker?: string;
  icon: TechStackIcon;
  items: string[];
};

export type MockupImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type Experience = {
  slug: string;
  title: string;
  org: string;
  period?: string;
  description: string;
  stack: string[];
  highlights: string[];
  keywords: string[];
  overview?: string;
  projects?: { slug: string; title: string; category?: string }[];
  challenge?: string;
  beforeAfter?: { before: string; after: string };
  whyItMatters?: string;
  mockups?: MockupImage[];
  linkLabel?: string;
  linkUrl?: string;
};

/** Sanity returns `null` for empty fields; components expect `undefined`. */
function opt<T>(value: T | null | undefined): T | undefined {
  return value ?? undefined;
}

export async function getProfile(): Promise<Profile> {
  const data = await sanityFetch({ query: PROFILE_QUERY });
  if (!data) {
    throw new Error('Sanity document "profile" is missing.');
  }

  return {
    name: data.name,
    fullName: data.fullName,
    role: data.role,
    location: opt(data.location),
    stackShort: opt(data.stackShort),
    tagline: data.tagline,
    taglineKeywords: data.taglineKeywords,
    email: data.email,
    github: opt(data.github),
    linkedin: opt(data.linkedin),
    imageUrl: data.imageKey ? mediaUrl(data.imageKey) : undefined,
    imageAlt: data.imageAlt ?? data.fullName,
    resumeUrl: data.resumeKey ? mediaUrl(data.resumeKey) : undefined,
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  if (!data) {
    throw new Error('Sanity document "siteSettings" is missing.');
  }

  return {
    title: data.title,
    description: data.description,
    siteUrl: data.siteUrl.replace(/\/+$/, ""),
    siteName: opt(data.siteName),
    keywords: data.keywords,
    ogImageUrl: data.ogImageKey ? mediaUrl(data.ogImageKey) : undefined,
    jobTitle: opt(data.jobTitle),
    worksFor: opt(data.worksFor),
    knowsAbout: data.knowsAbout,
  };
}

type MockupRows = NonNullable<EXPERIENCE_BY_SLUG_QUERY_RESULT>["mockups"];

function toMockups(rows: MockupRows | undefined): MockupImage[] | undefined {
  return rows?.flatMap((mockup) =>
    mockup.key
      ? [
          {
            src: mediaUrl(mockup.key),
            alt: mockup.alt,
            width: opt(mockup.width),
            height: opt(mockup.height),
          },
        ]
      : []
  );
}

function toProject(
  data: PROJECTS_QUERY_RESULT[number] & { mockups?: MockupRows }
): Project {
  return {
    ...data,
    mockups: toMockups(data.mockups),
    category: opt(data.category),
    githubUrl: opt(data.githubUrl),
    liveUrl: opt(data.liveUrl),
    experience: opt(data.experience),
  };
}

export async function getProjects(): Promise<Project[]> {
  const data = await sanityFetch({ query: PROJECTS_QUERY });
  return data.map(toProject);
}

export async function getProjectBySlug(
  slug: string
): Promise<Project | undefined> {
  const data = await sanityFetch({
    query: PROJECT_BY_SLUG_QUERY,
    params: { slug },
  });
  return data ? toProject(data) : undefined;
}

export async function getExperiences(): Promise<Experience[]> {
  const data = await sanityFetch({ query: EXPERIENCES_QUERY });

  return data.map((experience) => ({
    ...experience,
    period: opt(experience.period),
    linkLabel: opt(experience.linkLabel),
    linkUrl: opt(experience.linkUrl),
  }));
}

export async function getExperienceBySlug(
  slug: string
): Promise<Experience | undefined> {
  const data = await sanityFetch({
    query: EXPERIENCE_BY_SLUG_QUERY,
    params: { slug },
  });
  if (!data) return undefined;

  return {
    ...data,
    period: opt(data.period),
    overview: opt(data.overview),
    projects: data.projects.map((project) => ({
      ...project,
      category: opt(project.category),
    })),
    challenge: opt(data.challenge),
    beforeAfter: opt(data.beforeAfter),
    whyItMatters: opt(data.whyItMatters),
    mockups: toMockups(data.mockups),
    linkLabel: opt(data.linkLabel),
    linkUrl: opt(data.linkUrl),
  };
}

/** Empty when the Studio's Tech stack document has no groups yet. */
export async function getTechStackGroups(): Promise<TechStackGroup[]> {
  const data = await sanityFetch({ query: TECH_STACK_QUERY });
  return (data?.groups ?? [])
    .filter((group) => group.items.length > 0)
    .map((group) => ({ ...group, kicker: opt(group.kicker) }));
}

export async function getSitemapEntries() {
  return sanityFetch({ query: SITEMAP_QUERY });
}
