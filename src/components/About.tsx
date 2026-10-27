"use client";

import { motion } from "motion/react";
import { ChevronRight, GraduationCap } from "lucide-react";
import type { About as AboutContent } from "@/lib/content";
import AboutGallery from "./AboutGallery";
import HighlightText from "./HighlightText";
import SectionHeader from "@/components/SectionHeader";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
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

// Bright, rotating colors for the "off the clock" badges.
const INTEREST_COLORS = [
  "border-accent/40 bg-accent/10 text-accent",
  "border-amber-300/40 bg-amber-300/10 text-amber-300",
  "border-pink-300/40 bg-pink-300/10 text-pink-300",
  "border-violet-300/40 bg-violet-300/10 text-violet-300",
  "border-sky-300/40 bg-sky-300/10 text-sky-300",
  "border-lime-300/40 bg-lime-300/10 text-lime-300",
];

export default function About({ about }: { about?: AboutContent }) {
  if (!about) return null;

  return (
    <section
      id="about"
      className="dotted-bg relative overflow-hidden border-t border-border"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          index="01"
          kicker="$ whoami"
          title={
            <>
              The person behind the <span className="text-accent">code</span>
            </>
          }
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid gap-10 lg:grid-cols-12"
        >
          <motion.div variants={item} className="flex flex-col gap-8 lg:col-span-7">
            <div className="flex flex-col gap-4 text-base leading-relaxed text-text/90">
              {about.story.map((paragraph, index) => (
                <p key={index}>
                  <HighlightText
                    text={paragraph}
                    keywords={about.storyKeywords}
                  />
                </p>
              ))}
            </div>

            {about.workStyle.length > 0 && (
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
                  how I work
                </h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {about.workStyle.map((line) => (
                    <li key={line} className="flex gap-2 text-sm text-text/90">
                      <ChevronRight
                        size={16}
                        aria-hidden
                        className="mt-0.5 shrink-0 text-accent"
                      />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          {(about.facts.length > 0 || about.interests.length > 0) && (
            <motion.div variants={item} className="flex flex-col gap-6 lg:col-span-5">
              {about.facts.length > 0 && (
                <div className="overflow-hidden rounded-xl border border-border bg-surface/90 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur">
                  <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                    <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-border" />
                    <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-border" />
                    <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-border" />
                    <span className="ml-2 font-mono text-xs text-muted">
                      about.json
                    </span>
                  </div>
                  <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 p-5 font-mono text-sm">
                    {about.facts.map((fact) => (
                      <div key={fact.label} className="contents">
                        <dt className="text-accent">{fact.label}</dt>
                        <dd className="text-text/90">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {about.interests.length > 0 && (
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
                    off the clock
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {about.interests.map((interest, index) => (
                      <li
                        key={interest}
                        className={`rounded-full border px-3 py-1 font-mono text-xs ${
                          INTEREST_COLORS[index % INTEREST_COLORS.length]
                        }`}
                      >
                        {interest}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>

        {about.education.length > 0 && (
          <div className="mt-16">
            <h3 className="flex items-center gap-2 font-mono text-sm text-accent">
              <GraduationCap size={16} aria-hidden />
              education
            </h3>
            <motion.ol
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-6 grid gap-4 md:grid-cols-3"
            >
              {about.education.map((entry) => (
                <motion.li
                  key={`${entry.credential}-${entry.school}`}
                  variants={item}
                  className="flex flex-col rounded-xl border border-border bg-surface/90 p-6 backdrop-blur transition-colors hover:border-borderStrong"
                >
                  {entry.period && (
                    <p className="font-mono text-xs text-muted">{entry.period}</p>
                  )}
                  <p className="mt-2 text-base font-semibold text-text">
                    {entry.credential}
                  </p>
                  <p className="mt-1 text-sm text-text/80">{entry.school}</p>
                  {entry.location && (
                    <p className="mt-1 font-mono text-xs text-muted">
                      {entry.location}
                    </p>
                  )}
                  {entry.note && (
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {entry.note}
                    </p>
                  )}
                </motion.li>
              ))}
            </motion.ol>
          </div>
        )}

        {about.photos.length > 0 && (
          <div className="mt-16">
            <h3 className="font-mono text-sm text-accent">~/photos</h3>
            <AboutGallery photos={about.photos} />
          </div>
        )}
      </div>
    </section>
  );
}
