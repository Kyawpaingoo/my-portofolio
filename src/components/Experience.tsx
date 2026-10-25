"use client";

import { motion } from "motion/react";
import type { Experience as ExperienceItem } from "@/lib/content";
import ExperienceCard from "@/components/ExperienceCard";
import SectionHeader from "@/components/SectionHeader";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Experience({
  experiences,
}: {
  experiences: ExperienceItem[];
}) {
  if (experiences.length === 0) return null;

  return (
    <section
      id="experience"
      className="dotted-bg relative overflow-hidden border-t border-border"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          index="01"
          kicker="$ cat experience.log"
          title={
            <>
              Where I&apos;ve <span className="text-accent">shipped</span>
            </>
          }
          description="Professional roles and the teams I've worked with — production products I've helped build, scale, and support on the job."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid max-w-4xl gap-6"
        >
          {experiences.map((exp) => (
            <ExperienceCard key={exp.slug} experience={exp} variants={card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
