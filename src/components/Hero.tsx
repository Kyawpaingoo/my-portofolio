"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Github, Linkedin, Mail } from "lucide-react";
import type { Profile } from "@/lib/content";
import HighlightText from "./HighlightText";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

type HeroProps = {
  profile: Profile;
  // Kept optional so existing callers don't break; unused.
  projects?: unknown[];
  experiences?: unknown[];
};

export default function Hero({ profile }: HeroProps) {
  const [imgError, setImgError] = useState(false);
  const showImage = Boolean(profile.imageUrl) && !imgError;
  const initials = profile.fullName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  const roleLine = [profile.role, profile.location]
    .filter(Boolean)
    .join(" · ");

  return (
    <section id="home" className="dotted-bg relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-14 md:pt-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid items-center gap-12 lg:grid-cols-2"
        >
          {/* ---- Left: headline ---- */}
          <div className="flex flex-col items-start gap-5">
            <motion.div
              variants={item}
              className="flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 font-mono text-xs text-muted"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-success" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              available for remote work
            </motion.div>

            <motion.p variants={item} className="font-mono text-sm text-accent">
              $ hi, I&apos;m
            </motion.p>

            <motion.h1
              variants={item}
              className="text-6xl font-black tracking-tight text-text sm:text-7xl"
            >
              {profile.name}
            </motion.h1>

            <motion.p variants={item} className="text-lg text-muted">
              {roleLine || profile.role}
            </motion.p>

            <motion.p
              variants={item}
              className="max-w-xl text-base leading-relaxed text-text/90"
            >
              <HighlightText
                text={profile.tagline}
                keywords={profile.taglineKeywords}
              />
            </motion.p>

            <motion.div
              variants={item}
              className="mt-1 flex flex-wrap items-center gap-3"
            >
              <a
                href="#contact"
                className="rounded-md bg-accent-dim px-5 py-2.5 font-mono text-sm text-text transition-colors hover:bg-accent hover:text-bg"
              >
                get in touch
              </a>
              <a
                href="#projects"
                className="rounded-md border border-border px-5 py-2.5 font-mono text-sm text-text transition-colors hover:border-borderStrong hover:bg-surface"
              >
                view projects
              </a>

              <div className="flex items-center gap-3">
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="rounded-md border border-border p-2.5 text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    <Github size={18} />
                  </a>
                )}
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="rounded-md border border-border p-2.5 text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    <Linkedin size={18} />
                  </a>
                )}
                <a
                  href={`mailto:${profile.email}`}
                  aria-label="Email"
                  className="rounded-md border border-border p-2.5 text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Mail size={18} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* ---- Right: square portrait ----
              Not animated: it is the LCP element, and an opacity-0 wrapper
              would hide it until hydration even after it has loaded. */}
          <div className="relative mx-auto w-full max-w-[400px] lg:justify-self-end">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-surface">
              <div
                aria-hidden={!showImage}
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-accent-dim/40 via-surface to-surface"
              >
                <span className="flex h-20 w-20 items-center justify-center rounded-full border border-borderStrong bg-bg font-mono text-2xl font-bold text-accent">
                  {initials}
                </span>
                <span className="font-mono text-xs text-muted">
                  {profile.fullName}
                </span>
              </div>
              {showImage && (
                <Image
                  src={profile.imageUrl!}
                  alt={profile.imageAlt}
                  fill
                  preload
                  onError={() => setImgError(true)}
                  sizes="400px"
                  className="object-cover object-top"
                />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
