"use client";

import { motion } from "motion/react";
import {
  Brain,
  Cloud,
  Code2,
  Database,
  FlaskConical,
  LayoutGrid,
  Server,
  ShieldCheck,
  Smartphone,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Experience, Project, TechStackGroup } from "@/lib/content";
import type { TechStackIcon } from "@/lib/tech-stack";
import SectionHeader from "@/components/SectionHeader";

type Group = {
  name: string;
  kicker?: string;
  icon: LucideIcon;
  match: RegExp;
  items: string[];
};

const ICONS: Record<TechStackIcon, LucideIcon> = {
  code: Code2,
  layout: LayoutGrid,
  server: Server,
  database: Database,
  cloud: Cloud,
  mobile: Smartphone,
  ai: Brain,
  testing: FlaskConical,
  security: ShieldCheck,
  tools: Wrench,
};

// Used only while the Studio's Tech stack document has no groups: stack tags
// from projects and experience are sorted into these by name.

const GROUPS: Omit<Group, "items">[] = [
  {
    name: "Languages",
    kicker: "lang",
    icon: Code2,
    match: /c#|typescript|javascript|python|\bsql\b|html|css|java|\bgo\b|rust/i,
  },
  {
    name: "Frontend",
    kicker: "ui",
    icon: LayoutGrid,
    match: /react|next|tailwind|vite|motion|framer|shadcn|css|expo|react native/i,
  },
  {
    name: "Backend",
    kicker: "api",
    icon: Server,
    match: /\.net|asp|web api|node|express|rest|ef core|entity framework|signalr|hangfire|jwt/i,
  },
  {
    name: "Data",
    kicker: "db",
    icon: Database,
    match: /postgres|sql server|redis|supabase|neon|sqlite|drizzle|prisma|mongodb|database/i,
  },
  {
    name: "Cloud & DevOps",
    kicker: "ops",
    icon: Cloud,
    match: /docker|azure|gcp|cloud run|cloudflare|vercel|ci\/cd|actions|nginx|opennext|workers/i,
  },
];

const FALLBACK: Omit<Group, "items"> = {
  name: "Tools & More",
  kicker: "misc",
  icon: Wrench,
  match: /.*/i,
};

function autoGroups(
  projects: Project[],
  experiences: Experience[],
  stackShort?: string
): Group[] {
  // Dedupe case-insensitively, keep first-seen display form.
  const seen = new Map<string, string>();
  const add = (s: string) => {
    const t = s.trim();
    if (!t) return;
    const key = t.toLowerCase();
    if (!seen.has(key)) seen.set(key, t);
  };
  (stackShort ?? "").split("/").forEach(add);
  projects.flatMap((p) => p.stack).forEach(add);
  experiences.flatMap((e) => e.stack).forEach(add);

  const remaining = [...seen.values()];
  const groups: Group[] = GROUPS.map((g) => ({ ...g, items: [] }));
  const fallbackItems: string[] = [];
  for (const item of remaining) {
    const group = groups.find((g) => g.match.test(item));
    if (group) group.items.push(item);
    else fallbackItems.push(item);
  }
  const visible = groups.filter((g) => g.items.length > 0);
  if (fallbackItems.length > 0)
    visible.push({ ...FALLBACK, items: fallbackItems });
  return visible;
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
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

export default function TechStack({
  groups,
  projects,
  experiences,
  stackShort,
}: {
  groups: TechStackGroup[];
  projects: Project[];
  experiences: Experience[];
  stackShort?: string;
}) {
  const visible =
    groups.length > 0
      ? groups.map((group) => ({ ...group, icon: ICONS[group.icon] ?? Code2 }))
      : autoGroups(projects, experiences, stackShort);

  if (visible.length === 0) return null;

  return (
    <section
      id="stack"
      className="dotted-bg relative overflow-hidden border-t border-border"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          index="04"
          kicker="$ stack --list"
          title={
            <>
              Tech I <span className="text-accent">ship</span> with
            </>
          }
          description="The languages, frameworks, and platforms behind the work above."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((group) => (
            <motion.div
              key={group.name}
              variants={card}
              whileHover={{ y: -4 }}
              className="rounded-xl border border-border bg-surface/90 p-6 backdrop-blur transition-colors hover:border-borderStrong"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-dim/40 text-accent">
                  <group.icon size={20} />
                </span>
                <div>
                  {group.kicker && (
                    <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
                      {group.kicker}
                    </p>
                  )}
                  <h3 className="text-base font-semibold text-text">
                    {group.name}
                  </h3>
                </div>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
