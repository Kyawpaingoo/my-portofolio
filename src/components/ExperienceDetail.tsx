"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Experience } from "@/lib/data";
import HighlightText from "./HighlightText";

export default function ExperienceDetail({
  experience,
}: {
  experience: Experience;
}) {
  return (
    <section className="dotted-bg min-h-[calc(100vh-65px)]">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Link
            href="/#experience"
            className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={16} />
            back to experience
          </Link>

          <p className="mt-8 font-mono text-xs text-accent/80">
            {experience.period}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-text sm:text-4xl">
            {experience.title} · {experience.org}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-text/90">
            <HighlightText
              text={experience.description}
              keywords={experience.keywords}
            />
          </p>

          {experience.overview && (
            <div className="mt-10">
              <h2 className="font-mono text-xs uppercase tracking-wide text-muted">
                Overview
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text/90">
                <HighlightText
                  text={experience.overview}
                  keywords={experience.keywords}
                />
              </p>
            </div>
          )}

          {experience.products && experience.products.length > 0 && (
            <div className="mt-10">
              <h2 className="font-mono text-xs uppercase tracking-wide text-muted">
                The Products
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {experience.products.map((product) => (
                  <div
                    key={product.name}
                    className="rounded-lg border border-border bg-surface p-4"
                  >
                    <p className="font-mono text-sm font-semibold text-accent">
                      {product.name}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-text/90">
                      <HighlightText
                        text={product.description}
                        keywords={experience.keywords}
                      />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {experience.stack.length > 0 && (
            <div className="mt-10">
              <h2 className="font-mono text-xs uppercase tracking-wide text-muted">
                Tech Stack
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {experience.stack.map((tech) => (
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

          {experience.highlights.length > 0 && (
            <div className="mt-10">
              <h2 className="font-mono text-xs uppercase tracking-wide text-muted">
                Key Contributions
              </h2>
              <ul className="mt-4 space-y-3">
                {experience.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-3 text-sm leading-relaxed text-text/90"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>
                      <HighlightText
                        text={highlight}
                        keywords={experience.keywords}
                      />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {experience.challenge && (
            <div className="mt-10">
              <h2 className="font-mono text-xs uppercase tracking-wide text-muted">
                The Real Engineering Challenge
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text/90">
                <HighlightText
                  text={experience.challenge}
                  keywords={experience.keywords}
                />
              </p>
            </div>
          )}

          {experience.mockups && experience.mockups.length > 0 && (
            <div className="mt-10">
              <h2 className="font-mono text-xs uppercase tracking-wide text-muted">
                Product Preview
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {experience.mockups.map((mockup) => (
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
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {experience.beforeAfter && (
            <div className="mt-10">
              <h2 className="font-mono text-xs uppercase tracking-wide text-muted">
                Before → After
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-surface p-4">
                  <p className="font-mono text-xs text-muted">Before</p>
                  <p className="mt-2 text-sm leading-relaxed text-text/90">
                    <HighlightText
                      text={experience.beforeAfter.before}
                      keywords={experience.keywords}
                    />
                  </p>
                </div>
                <div className="rounded-lg border border-accent/40 bg-surface p-4">
                  <p className="font-mono text-xs text-accent">After</p>
                  <p className="mt-2 text-sm leading-relaxed text-text/90">
                    <HighlightText
                      text={experience.beforeAfter.after}
                      keywords={experience.keywords}
                    />
                  </p>
                </div>
              </div>
            </div>
          )}

          {experience.whyItMatters && (
            <div className="mt-10">
              <h2 className="font-mono text-xs uppercase tracking-wide text-muted">
                Why It Matters
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text/90">
                <HighlightText
                  text={experience.whyItMatters}
                  keywords={experience.keywords}
                />
              </p>
            </div>
          )}

          {experience.linkUrl && (
            <a
              href={experience.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 rounded-md bg-accent-dim px-5 py-2.5 font-mono text-sm text-text transition-colors hover:bg-accent hover:text-bg"
            >
              {experience.linkLabel ?? "view link"}
              <ExternalLink size={16} />
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
