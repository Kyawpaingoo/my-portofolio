import * as React from "react";
import {skillCategories} from "../Data.ts";
import type {skillCategoryType} from "../Data.ts";

const SkillSection: React.FC = () => {
    return (
        <section className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Skills & Technologies
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        A comprehensive overview of my technical expertise and the tools I use to build amazing applications.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {
                        skillCategories.map((category: skillCategoryType, index: number) => (
                            <div key={index} className="bg-white dark:bg-gray-950 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                                <div className={`flex items-center space-x-3 mb-4`}>
                                    <category.icon className={`w-6 h-6 ${category.color}`} />
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{category.title}</h3>
                                </div>
                                <div className="space-y-2">
                                    {category.skills.map((skill, skillIndex) => (
                                        <div key={skillIndex} className="flex items-center space-x-2">
                                            <div className={`w-2 h-2 rounded-full ${category.color.replace('text-', 'bg-')}`}></div>
                                            <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default SkillSection;