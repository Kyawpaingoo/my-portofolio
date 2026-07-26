"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  type Variants,
} from "motion/react";
import { ExternalLink } from "lucide-react";
import type { Experience } from "@/lib/data";

export default function ExperienceCard({
  experience,
  variants,
}: {
  experience: Experience;
  variants: Variants;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const background = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(45, 212, 191, 0.15), transparent 80%)`;

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.article
      variants={variants}
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden rounded-lg border border-border bg-surface p-6 transition-colors hover:border-borderStrong"
    >
      <Link
        href={`/experience/${experience.slug}`}
        aria-label={`View details for ${experience.title} at ${experience.org}`}
        className="absolute inset-0 z-0"
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />

      <div className="relative z-10 pointer-events-none">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-xl font-semibold text-text transition-colors group-hover:text-accent">
            {experience.title} · {experience.org}
          </h3>
          {experience.linkUrl && (
            <a
              href={experience.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto relative z-20 flex items-center gap-1 font-mono text-xs text-muted transition-colors hover:text-accent"
            >
              {experience.linkLabel}
              <ExternalLink size={14} />
            </a>
          )}
        </div>
        <p className="mt-1 font-mono text-xs text-muted">
          {experience.period}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-text/90">
          {experience.description}
        </p>
      </div>
    </motion.article>
  );
}
