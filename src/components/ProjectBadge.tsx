import { Briefcase, User } from "lucide-react";
import type { Project } from "@/lib/content";

export default function ProjectBadge({ project }: { project: Project }) {
  const work = project.kind === "work";
  const org = project.experience?.org;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${
        work
          ? "border-accent/40 bg-accent/10 text-accent"
          : "border-border text-muted"
      }`}
    >
      {work ? <Briefcase size={11} /> : <User size={11} />}
      {work ? (org ? `Work · ${org}` : "Work") : "Personal"}
    </span>
  );
}
