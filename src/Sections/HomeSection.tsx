import * as React from "react";
import myPhoto from '../assets/img/my-photo.jpg';
import TypewriterText from "../Components/TypewriterText.tsx";
import { Download, Github, Linkedin, Mail, MessageCircle} from "lucide-react";
import {pdfFile, type SectionKey} from "../Data.ts";

interface HomeSectionProps {
    onSectionChange: (section: SectionKey) => void;
}

const HomeSection: React.FC<HomeSectionProps> = ({onSectionChange}) => {
    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100
            dark:from-gray-900 dark:to-gray-800">
            <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
                <div className='mb-8'>
                    <img src={myPhoto} alt='Kenvin' className='w-40 h-40 mx-auto rounded-full shadow-lg border-4 object-cover border-white dark:border-gray-700 mb-8' />
                    <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4'>
                        Hi, I'm Kyaw Paing Oo (Kenvin)
                    </h1>
                    <h2 className='text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 dark:text-gray-300 mb-6'>
                        <TypewriterText texts={['Full Stack Developer', 'Digital Nomad', 'AI Enthusiast']} />
                    </h2>
                    <p className='text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto'>
                        Passionate Burmese developer crafting scalable web solutions with modern technologies.
                        Currently exploring the world while building amazing digital experiences.
                    </p>
                    <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                        <a href={pdfFile} className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 shadow-lg' download>
                            <Download className='w-5 h-5' />
                            <span>Download CV</span>
                        </a>
                        <button className='border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2'
                            onClick={() => onSectionChange('contact')}
                        >
                            <MessageCircle className='w-5 h-5' />
                            <span>Let's Talk</span>
                        </button>
                    </div>
                    <div className="flex justify-center space-x-6 mt-8">
                        <a href="https://github.com/Kyawpaingoo" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            <Github className="w-6 h-6" />
                        </a>
                        <a href="https://www.linkedin.com/in/kyaw-paing-oo-dev" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            <Linkedin className="w-6 h-6" />
                        </a>
                        <a href="mailto:paingookyaw624@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            <Mail className="w-6 h-6" />
                        </a>
                    </div>
                    {/*<div className="mt-12 animate-bounce">*/}
                    {/*    <ChevronDown className="w-8 h-8 mx-auto text-gray-400" />*/}
                    {/*</div>*/}
                </div>
            </div>
        </section>
    )
}

export default HomeSection;