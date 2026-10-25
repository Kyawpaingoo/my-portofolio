"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Shared section header matching the hero language: mono accent kicker,
 * oversized black title with one accent word, teal divider bar, muted
 * description. Animates in on scroll like the hero entrance.
 */
export default function SectionHeader({
  index,
  kicker,
  title,
  description,
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <div className="flex max-w-3xl flex-col items-start gap-4">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="font-mono text-sm text-accent"
      >
        {index} · {kicker}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-4xl font-black leading-[0.95] tracking-tight text-text sm:text-5xl"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        aria-hidden
        className="h-1 w-12 origin-left rounded-full bg-accent"
      />
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="max-w-xl text-base leading-relaxed text-muted"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
