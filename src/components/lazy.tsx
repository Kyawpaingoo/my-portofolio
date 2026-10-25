"use client";

import dynamic from "next/dynamic";

/**
 * Lazily loaded Client Components. `next/dynamic` only code-splits when it is
 * called from a Client Component, so Server Components import these instead
 * of calling it themselves.
 *
 * Only use it for components that render no HTML on the server: anything
 * server-rendered through `next/dynamic` gets its own Suspense boundary and is
 * hidden in the prerendered HTML until a swap script runs.
 */

// Renders nothing and only attaches a mousemove listener: no need to
// server-render it or load it before the page is interactive.
export const LazyCursorDotGlow = dynamic(() => import("./CursorDotGlow"), {
  ssr: false,
});
