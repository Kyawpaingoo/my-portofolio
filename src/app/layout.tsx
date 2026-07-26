import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CursorDotGlow from "@/components/CursorDotGlow";
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

const title = "Kyaw Paing Oo (Kelvin) | Full Stack Developer";
const description =
  "Full Stack Developer from Myanmar specializing in React, Node.js, .NET, and cloud services. Building scalable web applications as a digital nomad.";

export const metadata: Metadata = {
  metadataBase: new URL("https://kyawpaingoo.dev"),
  title,
  description,
  authors: [{ name: "Kyaw Paing Oo" }],
  keywords: [
    "Kyaw Paing Oo",
    "Kelvin",
    "Full Stack Developer",
    "React Developer",
    "Node.js Developer",
    ".NET Developer",
    "Web Developer",
    "Myanmar Developer",
    "Digital Nomad",
    "Portfolio",
    "TypeScript",
    "JavaScript",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://kyawpaingoo.dev/",
    title,
    description,
    images: ["/og-image.png"],
    siteName: "Kelvin Dev Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
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

export const viewport: Viewport = {
  themeColor: "#0d1117",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kyaw Paing Oo",
  alternateName: "Kelvin",
  url: "https://kyawpaingoo.dev",
  image: "/og-image.png",
  jobTitle: "Full Stack Developer",
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
  sameAs: [
    "https://github.com/Kyawpaingoo",
    "https://www.linkedin.com/in/kyaw-paing-oo-dev",
  ],
  knowsAbout: [
    "React",
    "Node.js",
    ".NET",
    "TypeScript",
    "JavaScript",
    "PostgreSQL",
    "AWS",
    "Docker",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <CursorDotGlow />
        <Navigation />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
