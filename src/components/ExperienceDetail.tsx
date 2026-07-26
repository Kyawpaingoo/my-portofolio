"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Experience } from "@/lib/data";

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
            {experience.description}
          </p>

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
