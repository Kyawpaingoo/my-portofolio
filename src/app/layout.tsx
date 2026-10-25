import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { getProfile, getSiteSettings } from "@/lib/content";
import { socialImageUrl } from "@/lib/media";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});


export async function generateMetadata(): Promise<Metadata> {
  const [settings, profile] = await Promise.all([
    getSiteSettings(),
    getProfile(),
  ]);
  const { title, description } = settings;
  // Social cards: 1200×630 crop of the share image (or the profile photo).
  const source = settings.ogImageUrl ?? profile.imageUrl;
  const image = source ? socialImageUrl(source) : undefined;
  const images = image ? [image] : undefined;

  return {
    metadataBase: new URL(settings.siteUrl),
    title,
    description,
    authors: [{ name: profile.fullName }],
    keywords: settings.keywords,
    robots: { index: true, follow: true },
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: "/",
      title,
      description,
      images,
      siteName: settings.siteName,
      locale: "en_US",
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title,
      description,
      images,
    },
    icons: {
      icon: [
        { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: "/icons/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
  };
}

export const viewport: Viewport = {
  themeColor: "#0d1117",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
