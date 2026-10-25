import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { getExperienceBySlug, getExperiences } from "@/lib/content";
import ExperienceDetail from "@/components/ExperienceDetail";
import { socialImageUrl } from "@/lib/media";

// Slugs published after the build render on first request.
export const dynamicParams = true;

export async function generateStaticParams() {
  const experiences = await getExperiences();
  return experiences.map((experience) => ({ slug: experience.slug }));
}

export async function generateMetadata(
  { params }: PageProps<"/experience/[slug]">,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);
  if (!experience) return {};

  const title = `${experience.title} at ${experience.org} | Kyaw Paing Oo`;
  const url = `/experience/${experience.slug}`;
  const mockup = experience.mockups?.[0];

  return {
    title,
    description: experience.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description: experience.description,
      images: mockup
        ? [socialImageUrl(mockup.src)]
        : (await parent).openGraph?.images,
    },
  };
}

export default async function ExperiencePage({
  params,
}: PageProps<"/experience/[slug]">) {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);
  if (!experience) notFound();

  return <ExperienceDetail experience={experience} />;
}
