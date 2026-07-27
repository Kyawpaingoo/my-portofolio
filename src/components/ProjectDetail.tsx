"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/data";
import HighlightText from "./HighlightText";

export default function ProjectDetail({ project }: { project: Project }) {
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

          <p className="mt-8 font-mono text-xs text-accent/80">
            {project.category}
          </p>
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

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 rounded-md bg-accent-dim px-5 py-2.5 font-mono text-sm text-text transition-colors hover:bg-accent hover:text-bg"
            >
              view on GitHub
              <ExternalLink size={16} />
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
