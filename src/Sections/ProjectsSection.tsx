import * as React from "react";
import {projects, type projectType} from "../Data.ts";
import {ExternalLink, Github} from "lucide-react";

const ProjectsSection: React.FC = () => {
    return (
       <section className="py-20 bg-white dark:bg-gray-900">
           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-16">
                   <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                       Featured Projects
                   </h2>
                   <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                       A showcase of my recent work and personal projects that demonstrate my skills and passion for development.
                   </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {
                       projects.map((project: projectType, index: number) => (
                           <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                               <img
                                   src={project.image}
                                   alt={project.title}
                                   className="w-full h-48 object-cover"
                               />
                               <div className="p-6">
                                   <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                       {project.title}
                                   </h3>
                                   <p className="text-gray-600 dark:text-gray-400 mb-4">
                                       {project.description}
                                   </p>
                                   <div className="flex flex-wrap gap-2 mb-4">
                                       {project.technologies.map((tech, techIndex) => (
                                           <span
                                               key={techIndex}
                                               className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                                           >
                                              {tech}
                                            </span>
                                       ))}
                                   </div>
                                   <div className="flex space-x-4">
                                       {
                                           project.liveLink != null && (
                                               <a
                                                   href={project.liveLink}
                                                   className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                                               >
                                                   <ExternalLink className="w-4 h-4" />
                                                   <span>Live Demo</span>
                                               </a>
                                           )
                                       }

                                       <a
                                           href={project.githubLink}
                                           className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
                                       >
                                           <Github className="w-4 h-4" />
                                           <span>Code</span>
                                       </a>
                                   </div>
                               </div>
                           </div>
                       ))
                   }
               </div>
           </div>
       </section>
    )
}

export default ProjectsSection;