"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  type Variants,
} from "motion/react";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/content";
import HighlightText from "./HighlightText";
import ProjectBadge from "./ProjectBadge";

export default function ProjectCard({
  project,
  variants,
}: {
  project: Project;
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
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-xl border border-border bg-surface/90 p-6 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur transition-colors hover:border-borderStrong"
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View details for ${project.title}`}
        className="absolute inset-0 z-0"
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />

      <div className="relative z-10 pointer-events-none">
        <ProjectBadge project={project} />
        <div className="mt-3 flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-xl font-semibold text-text transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          {(project.liveUrl ?? project.githubUrl) && (
            <a
              href={project.liveUrl ?? project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={
                project.liveUrl
                  ? `Visit ${project.title}`
                  : `Open ${project.title} on GitHub`
              }
              className="pointer-events-auto relative z-20 text-muted transition-colors hover:text-accent"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
        <p className="mt-1 font-mono text-xs text-muted">
          {project.category}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-text/90">
          <HighlightText text={project.description} keywords={project.keywords} />
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
        {/* Visual only: the card-wide Link above handles click and focus. */}
        <span
          aria-hidden="true"
          className="mt-5 inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 font-mono text-xs text-text transition-colors group-hover:border-accent group-hover:text-accent"
        >
          view details
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </motion.article>
  );
}
