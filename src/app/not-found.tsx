import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getProfile } from "@/lib/content";

export default async function NotFound() {
  const profile = await getProfile();

  return (
    <>
      <Navigation />
      <main id="main" className="dotted-bg">
        <div className="mx-auto flex min-h-[60vh] max-w-5xl flex-col items-start justify-center gap-4 px-6 py-20 font-mono">
          <p className="text-sm text-accent">$ 404</p>
          <h1 className="text-2xl font-semibold text-text">page not found</h1>
          <Link
            href="/"
            className="text-sm text-muted transition-colors hover:text-accent"
          >
            cd ~
          </Link>
        </div>
      </main>
      <Footer profile={profile} />
    </>
  );
}
