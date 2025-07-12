import * as React from "react";
import {Briefcase, Code2, FileText, MapPin} from "lucide-react";

const AboutSection: React.FC = () => {
    const workSpace = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&auto=format';
    return (
        <section className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        About Me
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Get to know me better - my journey, passions, and what drives me as a developer.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <img
                            src={workSpace}
                            alt="Developer workspace"
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Burmese Developer with Global Aspirations
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            I'm a passionate full-stack developer from Myanmar, specializing in .NET and MERN stack technologies.
                            My journey in software development has been driven by curiosity and a desire to create meaningful digital experiences.
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            As an aspiring digital nomad, I believe in the power of technology to connect people across borders.
                            I'm passionate about DevOps practices, AI content creation, and smart investing strategies that align with my remote lifestyle goals.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                            <div className="flex items-center space-x-3">
                                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                <span className="text-gray-700 dark:text-gray-300">Currently in Thailand</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                <span className="text-gray-700 dark:text-gray-300">Full Stack Developer</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                <span className="text-gray-700 dark:text-gray-300">Remote Work</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                <span className="text-gray-700 dark:text-gray-300">Content Creator</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection;