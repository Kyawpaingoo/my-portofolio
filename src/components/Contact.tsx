"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { profile } from "@/lib/data";

type Status = "idle" | "sending" | "success" | "error";

const metaRows = [
  { label: "location", value: profile.location },
  { label: "status", value: "available for remote work" },
  { label: "stack", value: profile.stackShort },
  { label: "github", value: profile.github, href: profile.github },
  { label: "linkedin", value: profile.linkedin, href: profile.linkedin },
  { label: "resume", value: "download PDF", href: profile.resumeUrl },
];

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      const subject = encodeURIComponent(`Portfolio contact from ${formState.name || "a visitor"}`);
      const body = encodeURIComponent(
        `${formState.message}\n\n— ${formState.name} (${formState.email})`
      );
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formState.name,
          from_email: formState.email,
          message: formState.message,
        },
        { publicKey }
      );
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="dotted-bg border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-8 font-mono text-sm text-accent/80"
        >
          03 · CONTACT
        </motion.p>

        <div className="grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a
              href={`mailto:${profile.email}`}
              className="block text-2xl font-semibold text-text transition-colors hover:text-accent sm:text-3xl"
            >
              {profile.email}
            </a>

            <dl className="mt-8 space-y-3">
              {metaRows.map((row) => (
                <div key={row.label} className="flex gap-4 font-mono text-sm">
                  <dt className="w-20 shrink-0 text-muted">{row.label}</dt>
                  {row.href ? (
                    <dd>
                      <a
                        href={row.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text transition-colors hover:text-accent"
                      >
                        {row.value}
                      </a>
                    </dd>
                  ) : (
                    <dd className="text-text">{row.value}</dd>
                  )}
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-lg border border-border bg-surface p-6"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <label className="flex flex-col gap-2">
                <span className="font-mono text-xs uppercase tracking-wide text-muted">
                  name <span className="text-accent">*</span>
                </span>
                <input
                  required
                  type="text"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, name: e.target.value }))
                  }
                  className="rounded-md border border-border bg-bg px-3 py-2 text-text outline-none focus:border-accent"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="font-mono text-xs uppercase tracking-wide text-muted">
                  email <span className="text-accent">*</span>
                </span>
                <input
                  required
                  type="email"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, email: e.target.value }))
                  }
                  className="rounded-md border border-border bg-bg px-3 py-2 text-text outline-none focus:border-accent"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="font-mono text-xs uppercase tracking-wide text-muted">
                  message <span className="text-accent">*</span>
                </span>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, message: e.target.value }))
                  }
                  className="resize-none rounded-md border border-border bg-bg px-3 py-2 text-text outline-none focus:border-accent"
                />
              </label>

              <button
                type="submit"
                disabled={status === "sending"}
                className="flex items-center justify-center gap-2 rounded-md bg-accent-dim px-5 py-2.5 font-mono text-sm text-text transition-colors hover:bg-accent hover:text-bg disabled:opacity-60"
              >
                {status === "sending" ? "sending..." : "send"}
                <ArrowRight size={16} />
              </button>

              {status === "success" && (
                <p className="font-mono text-xs text-success">
                  message sent — I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="font-mono text-xs text-red-400">
                  something went wrong — email me directly at {profile.email}
                </p>
              )}

              <p className="font-mono text-xs text-muted">
                protected · rate-limited
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
