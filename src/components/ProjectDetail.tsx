"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/content";
import HighlightText from "./HighlightText";
import ProjectBadge from "./ProjectBadge";

export default function ProjectDetail({ project }: { project: Project }) {
  // R2 objects can be missing (e.g. bucket recreated); hide mockups that
  // fail to load instead of showing broken image boxes.
  const [failed, setFailed] = useState<string[]>([]);
  const mockups = (project.mockups ?? []).filter(
    (m) => !failed.includes(m.src),
  );
  return (
    <section className="dotted-bg min-h-[calc(100vh-65px)]">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={16} />
            back to projects
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.experience ? (
              <Link
                href={`/experience/${project.experience.slug}`}
                className="transition-opacity hover:opacity-80"
              >
                <ProjectBadge project={project} />
              </Link>
            ) : (
              <ProjectBadge project={project} />
            )}
            {project.category && (
              <p className="font-mono text-xs text-accent/80">
                {project.category}
              </p>
            )}
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-text sm:text-4xl">
            {project.title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-text/90">
            <HighlightText text={project.description} keywords={project.keywords} />
          </p>

          {project.stack.length > 0 && (
            <div className="mt-6">
              <h2 className="font-mono text-xs uppercase tracking-wide text-muted">
                Tech Stack
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
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
          )}

          {project.highlights.length > 0 && (
            <ul className="mt-8 space-y-3">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-3 text-sm leading-relaxed text-text/90"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>
                    <HighlightText text={highlight} keywords={project.keywords} />
                  </span>
                </li>
              ))}
            </ul>
          )}

          {mockups.length > 0 && (
            <div className="mt-10">
              <h2 className="font-mono text-xs uppercase tracking-wide text-muted">
                Product Preview
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {mockups.map((mockup) => (
                  <div
                    key={mockup.src}
                    className="relative aspect-[1206/2622] overflow-hidden rounded-2xl border border-border bg-surface p-2"
                  >
                    <Image
                      src={mockup.src}
                      alt={mockup.alt}
                      fill
                      sizes="(min-width: 640px) 33vw, 50vw"
                      className="object-contain"
                      onError={() =>
                        setFailed((prev) =>
                          prev.includes(mockup.src)
                            ? prev
                            : [...prev, mockup.src],
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {(project.liveUrl || project.githubUrl) && (
            <div className="mt-10 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-accent-dim px-5 py-2.5 font-mono text-sm text-text transition-colors hover:bg-accent hover:text-bg"
                >
                  visit {new URL(project.liveUrl).hostname.replace(/^www\./, "")}
                  <ExternalLink size={16} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    project.liveUrl
                      ? "inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 font-mono text-sm text-text transition-colors hover:border-accent hover:text-accent"
                      : "inline-flex items-center gap-2 rounded-md bg-accent-dim px-5 py-2.5 font-mono text-sm text-text transition-colors hover:bg-accent hover:text-bg"
                  }
                >
                  view on GitHub
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
