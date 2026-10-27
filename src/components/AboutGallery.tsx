"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { About } from "@/lib/content";

type Photo = About["photos"][number];

// Used when an upload didn't record its dimensions.
const FALLBACK_WIDTH = 1200;
const FALLBACK_HEIGHT = 900;

export default function AboutGallery({ photos }: { photos: Photo[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const open = (index: number, trigger: HTMLElement) => {
    opener.current = trigger;
    setOpenIndex(index);
  };

  const close = useCallback(() => {
    setOpenIndex(null);
    opener.current?.focus();
  }, []);

  const step = useCallback(
    (delta: number) =>
      setOpenIndex((index) =>
        index === null ? null : (index + delta + photos.length) % photos.length
      ),
    [photos.length]
  );

  const isOpen = openIndex !== null;

  // Runs on open and close only, not when stepping between photos.
  useEffect(() => {
    if (!isOpen) return;

    closeButton.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowRight") step(1);
      else if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close, step]);

  const current = openIndex === null ? undefined : photos[openIndex];

  return (
    <>
      <ul className="mt-6 columns-2 gap-4 sm:columns-3 lg:columns-4">
        {photos.map((photo, index) => (
          <motion.li
            key={photo.src}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
            className="mb-4 break-inside-avoid"
          >
            <button
              type="button"
              onClick={(event) => open(index, event.currentTarget)}
              aria-label={`View photo: ${photo.caption ?? photo.alt}`}
              className="group relative block w-full overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-accent"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width ?? FALLBACK_WIDTH}
                height={photo.height ?? FALLBACK_HEIGHT}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {photo.caption && (
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-2 pt-6 text-left font-mono text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  {photo.caption}
                </span>
              )}
            </button>
          </motion.li>
        ))}
      </ul>

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.caption ?? current.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/90 p-4 backdrop-blur-sm sm:p-10"
          >
            <button
              ref={closeButton}
              type="button"
              onClick={close}
              aria-label="Close photo"
              className="absolute right-4 top-4 rounded-md border border-white/20 p-2 text-white/80 transition-colors hover:border-accent hover:text-accent"
            >
              <X size={20} />
            </button>

            <motion.div
              key={current.src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
              className="relative h-full max-h-[80vh] w-full max-w-5xl"
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>

            <div
              onClick={(event) => event.stopPropagation()}
              className="flex items-center gap-4 font-mono text-xs text-white/80"
            >
              {photos.length > 1 && (
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className="rounded-md border border-white/20 p-2 transition-colors hover:border-accent hover:text-accent"
                >
                  <ChevronLeft size={18} />
                </button>
              )}
              <p className="text-center">
                {current.caption && <span>{current.caption} · </span>}
                {(openIndex ?? 0) + 1} / {photos.length}
              </p>
              {photos.length > 1 && (
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className="rounded-md border border-white/20 p-2 transition-colors hover:border-accent hover:text-accent"
                >
                  <ChevronRight size={18} />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
