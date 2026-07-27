"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/lib/data";
import HighlightText from "./HighlightText";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Hero() {
  return (
    <section id="home" className="dotted-bg">
      <div className="mx-auto grid max-w-5xl items-center gap-12 px-6 pb-24 pt-20 md:grid-cols-[1.2fr_1fr] md:pt-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-6"
        >
          <motion.div
            variants={item}
            className="flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-success" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            available for remote work
          </motion.div>

          <motion.p variants={item} className="font-mono text-accent">
            $ hi, I&apos;m
          </motion.p>

          <motion.h1
            variants={item}
            className="text-4xl font-bold tracking-tight text-text sm:text-5xl md:text-6xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p variants={item} className="text-lg text-muted">
            {profile.role} · {profile.location}
          </motion.p>

          <motion.p
            variants={item}
            className="max-w-2xl text-base text-text/90"
          >
            <HighlightText
              text={profile.tagline}
              keywords={profile.taglineKeywords}
            />
          </motion.p>

          <motion.div
            variants={item}
            className="mt-2 flex w-full flex-wrap items-center justify-between gap-4"
          >
            <div className="flex flex-wrap gap-4">
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
            </div>

            <div className="flex items-center gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-md border border-border p-2.5 text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Github size={20} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-md border border-border p-2.5 text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="rounded-md border border-border p-2.5 text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Mail size={20} />
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="order-first flex justify-center md:order-last md:justify-end"
        >
          <div className="relative h-56 w-56 overflow-hidden rounded-lg border border-border sm:h-64 sm:w-64 md:h-72 md:w-72">
            <Image
              src={profile.imageUrl}
              alt={profile.fullName}
              fill
              priority
              sizes="(max-width: 768px) 224px, 288px"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
