"use client";

const links = [
  { href: "/#home", label: "home" },
  { href: "/#projects", label: "projects" },
  { href: "/#experience", label: "experience" },
  { href: "/#contact", label: "contact" },
];

export default function Navigation() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="/#home"
          className="font-mono text-sm font-semibold text-accent"
        >
          kevin.dev
        </a>
        <ul className="flex items-center gap-6 font-mono text-sm text-muted">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors hover:text-text"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
