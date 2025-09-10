import React, {type ReactElement, useEffect, useRef, useState} from 'react'
import type {SectionKey} from "./Data.ts";
import useTheme from "./Hook/useTheme.tsx";
import HomeSection from "./Sections/HomeSection.tsx";
import AboutSection from "./Sections/AboutSection.tsx";
import SkillSection from "./Sections/SkillsSection.tsx";
import ProjectsSection from "./Sections/ProjectsSection.tsx";
import ExperienceSection from "./Sections/ExperienceSection.tsx";
import ContactSection from "./Sections/Contact.tsx";
import ThemeContext from "./Context/ThemeContext.tsx";
import Navbar from "./Components/Navbar.tsx";

const App: React.FC = () => {
    const [activeSection, setActiveSection] = useState<SectionKey>('home')
    const themeValue = useTheme();

    const sectionRefs = useRef<Record<SectionKey, HTMLDivElement | null>>({
        home: null,
        about: null,
        skills: null,
        projects: null,
        experience: null,
        contact: null,
    })

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100;

            const sectionKeys = Object.keys(sectionRefs.current) as SectionKey[];

            for(let i = sectionKeys.length - 1; i >= 0; i--) {
                const sectionKey = sectionKeys[i];
                const element = sectionRefs.current[sectionKey];

                if(element && element.offsetTop <= scrollPosition) {
                    setActiveSection(sectionKey);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSectionChange = (section: SectionKey): void => {
        setActiveSection(section)
        const element = sectionRefs.current[section];
        if (element) {
            const offsetTop = element.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    const setSectionRef = (sectionKey: SectionKey) => (el: HTMLDivElement | null) => {
        sectionRefs.current[sectionKey] = el;
    };

    const sections: Record<SectionKey, ReactElement> = {
        home: <HomeSection onSectionChange={handleSectionChange} />,
        about: <AboutSection />,
        skills: <SkillSection />,
        projects: <ProjectsSection />,
        experience: <ExperienceSection />,
        contact: <ContactSection />,
    }

    return (
        <ThemeContext.Provider value={themeValue}>
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
                {/* Navigation could be added here */}
                <Navbar activeSection={activeSection} onSectionChange={handleSectionChange} />

                <main className="pt-16">
                    <div ref={setSectionRef('home')} id='home'>
                        {sections.home}
                    </div>
                    <div ref={setSectionRef('about')} id='about'>
                        {sections.about}
                    </div>
                    <div ref={setSectionRef('skills')} id='skills'>
                        {sections.skills}
                    </div>
                    <div ref={setSectionRef('projects')} id='projects'>
                        {sections.projects}
                    </div>
                    <div ref={setSectionRef('experience')} id='experience'>
                        {sections.experience}
                    </div>
                    <div ref={setSectionRef('contact')} id='contact'>
                        {sections.contact}
                    </div>
                </main>

                <footer className="bg-gray-900 dark:bg-gray-800 text-white py-8">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-gray-300">
                            © 2025 Kenvin. Built with React, TypeScript, and Tailwind CSS.
                        </p>
                    </div>
                </footer>
            </div>
        </ThemeContext.Provider>
    )
}

export default App