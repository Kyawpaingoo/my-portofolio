"use client";

import { motion } from "motion/react";
import type { Project } from "@/lib/content";
import ProjectCard from "@/components/ProjectCard";
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

export default function Projects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section
      id="projects"
      className="dotted-bg relative overflow-hidden border-t border-border"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          index="02"
          kicker="$ ls projects/"
          title={
            <>
              Selected <span className="text-accent">projects</span>
            </>
          }
          description="Production products I've built at work, alongside projects I've designed, coded, and deployed end to end on my own time."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid gap-6 md:grid-cols-2"
        >
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} variants={card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
