/**
 * Embedded Sanity Studio. Every route under /studio is handled here via the
 * optional catch-all segment. https://github.com/sanity-io/next-sanity
 */
import type { Metadata, Viewport } from "next";
import StudioLoader from "./StudioLoader";

export const dynamic = "force-static";

// Same values as `metadata` / `viewport` from `next-sanity/studio`, inlined so
// this server file doesn't import the Studio package.
export const metadata: Metadata = {
  title: "Studio | Portfolio",
  referrer: "same-origin",
  robots: "noindex",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function StudioPage() {
  return <StudioLoader />;
}
