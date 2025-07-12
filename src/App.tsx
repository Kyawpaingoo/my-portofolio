import React, {type ReactElement, useState} from 'react'
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


    const sections: Record<string, ReactElement> = {
        home: <HomeSection />,
        about: <AboutSection />,
        skills: <SkillSection />,
        projects: <ProjectsSection />,
        experience: <ExperienceSection />,
        contact: <ContactSection />,
    }

    const handleSectionChange = (section: SectionKey): void => {
        setActiveSection(section)
    }

    return (
        <ThemeContext.Provider value={themeValue}>
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
                {/* Navigation could be added here */}
                <Navbar activeSection={activeSection} onSectionChange={handleSectionChange} />

                <main className="pt-16">
                    {sections[activeSection]}
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