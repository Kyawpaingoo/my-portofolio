import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Contact from "@/components/Contact";
import {
  getAbout,
  getExperiences,
  getProfile,
  getProjects,
  getTechStackGroups,
} from "@/lib/content";

export default async function Home() {
  // Data is fetched at build time, so sections aren't wrapped in Suspense: on
  // a prerendered page that would only hide them behind a swap script.
  const [profile, about, experiences, projects, techStackGroups] =
    await Promise.all([
      getProfile(),
      getAbout(),
      getExperiences(),
      getProjects(),
      getTechStackGroups(),
    ]);

  return (
    <main id="main">
      <Hero profile={profile} />
      <About about={about} />
      <Experience experiences={experiences} />
      <Projects projects={projects} />
      <TechStack
        groups={techStackGroups}
        projects={projects}
        experiences={experiences}
        stackShort={profile.stackShort}
      />
      <Contact profile={profile} />
    </main>
  );
}
