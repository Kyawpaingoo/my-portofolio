import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { profile } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="dotted-bg border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-8 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {profile.fullName}. built with Next.js, Tailwind CSS &
          Motion.
        </p>
        <div className="flex items-center gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-md border border-border p-2 transition-colors hover:border-accent hover:text-accent"
          >
            <Github size={16} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-md border border-border p-2 transition-colors hover:border-accent hover:text-accent"
          >
            <Linkedin size={16} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="rounded-md border border-border p-2 transition-colors hover:border-accent hover:text-accent"
          >
            <Mail size={16} />
          </a>
          <a
            href="/#home"
            className="flex items-center gap-1 transition-colors hover:text-accent"
          >
            back to top
            <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
