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
import type { Project } from "@/lib/data";

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
      className="group relative overflow-hidden rounded-lg border border-border bg-surface p-6 transition-colors hover:border-borderStrong"
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
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-xl font-semibold text-text transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} on GitHub`}
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
          {project.description}
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
      </div>
    </motion.article>
  );
}
