import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { experiences, getExperienceBySlug } from "@/lib/data";
import ExperienceDetail from "@/components/ExperienceDetail";

export function generateStaticParams() {
  return experiences.map((experience) => ({ slug: experience.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const experience = getExperienceBySlug(params.slug);
  if (!experience) return {};

  return {
    title: `${experience.title} at ${experience.org} | Kyaw Paing Oo`,
    description: experience.description,
  };
}

export default function ExperiencePage({
  params,
}: {
  params: { slug: string };
}) {
  const experience = getExperienceBySlug(params.slug);
  if (!experience) notFound();

  return <ExperienceDetail experience={experience} />;
}
