import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { LazyCursorDotGlow } from "@/components/lazy";
import { getProfile, getSiteSettings } from "@/lib/content";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [profile, settings] = await Promise.all([
    getProfile(),
    getSiteSettings(),
  ]);

  const jsonLdImage = settings.ogImageUrl ?? profile.imageUrl;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    alternateName: profile.name,
    url: settings.siteUrl,
    image: jsonLdImage && new URL(jsonLdImage, settings.siteUrl).href,
    jobTitle: settings.jobTitle,
    worksFor: settings.worksFor && {
      "@type": "Organization",
      name: settings.worksFor,
    },
    sameAs: [profile.github, profile.linkedin].filter(Boolean),
    knowsAbout: settings.knowsAbout,
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <LazyCursorDotGlow />
      <Navigation />
      {children}
      <Footer profile={profile} />
      <script
        type="application/ld+json"
        // Escape "<" so CMS text can't close the script tag.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
