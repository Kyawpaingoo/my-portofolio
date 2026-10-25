"use client";

import dynamic from "next/dynamic";

// The Studio only runs in the browser. Skipping SSR keeps the `sanity`
// package out of the Cloudflare Worker's server bundle.
const Studio = dynamic(() => import("./Studio"), {
  ssr: false,
  // The Studio bundle is large; show something while it downloads.
  loading: () => (
    <div className="flex h-screen items-center justify-center bg-bg font-mono text-sm text-muted">
      loading studio...
    </div>
  ),
});

export default function StudioLoader() {
  return <Studio />;
}
