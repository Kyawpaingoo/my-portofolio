"use client";

import { motion } from "motion/react";
import { projects } from "@/lib/data";
import ProjectCard from "@/components/ProjectCard";

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

export default function Projects() {
  return (
    <section id="projects" className="dotted-bg border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-8 font-mono text-sm text-accent/80"
        >
          01 · PROJECTS
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6"
        >
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} variants={card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
