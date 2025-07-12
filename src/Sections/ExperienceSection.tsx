import * as React from "react";
import {experiences} from "../Data.ts";
import type {experienceType} from "../Data.ts";

const ExperienceSection: React.FC = () => {
    return (
        <section className='py-20 bg-gray-50 dark:bg-gray-900'>
            <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Experience
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        My professional journey and the experiences that shaped me as a developer.
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-600 dark:bg-blue-400"></div>
                    <div className="space-y-8">
                        {experiences.map((exp: experienceType, index: number) => (
                            <div key={index} className="relative flex items-start space-x-6">
                                <div className="flex-shrink-0 w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full relative z-10"></div>
                                <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            {exp.title}
                                        </h3>
                                        <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                                          {exp.period} ({exp.type})
                                        </span>
                                    </div>
                                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                                        {exp.company}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        {exp.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.technologies.map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                                            >
                                                {tech}
                                          </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ExperienceSection;