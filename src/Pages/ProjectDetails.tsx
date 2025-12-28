import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../Data'; // Ensure your project list is exported from here
import { 
    ArrowLeft, ExternalLink, Github, Code2, 
    Layers, Cpu, CheckCircle2, Terminal 
} from 'lucide-react';

const ProjectDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const project = projects.find(p => p.id === Number(id));
    const devPortolio = 'src/assets/img/dev-portfolio.png';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) return <div className="dark:text-white text-center py-20">Project not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Header / Hero */}
            <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 pt-24 pb-12">
                <div className="max-w-6xl mx-auto px-4">
                    <Link to="/" className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6 font-medium">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portfolio
                    </Link>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                                {project.title}
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                                {project.description}
                            </p>
                        </div>
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <img 
                                src={(project.id === 2 ? devPortolio : project.image)} 
                                alt={project.title} 
                                className="relative rounded-xl shadow-2xl w-full object-cover aspect-video"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* Left & Center: Engineering Details */}
                    <div className="lg:col-span-2 space-y-12">
                        
                        {/* Ecosystem Section */}
                        <section>
                            <div className="flex items-center gap-2 mb-4 text-blue-600 dark:text-blue-400">
                                <Layers className="w-6 h-6" />
                                <h2 className="text-2xl font-bold">System Ecosystem</h2>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                                    "{project.ecosystem}"
                                </p>
                            </div>
                        </section>

                        {/* Key Features Grid */}
                        <section>
                            <div className="flex items-center gap-2 mb-6 text-gray-900 dark:text-white">
                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                                <h2 className="text-2xl font-bold">Key Features</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {project.keyFeatures!.map((feature, idx) => (
                                    <div key={idx} className="flex gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                                        <div className="h-2 w-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Technical Highlights */}
                        <section className="bg-gray-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                            <Terminal className="absolute right-4 bottom-4 w-32 h-32 text-gray-800 opacity-50" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <Cpu className="w-6 h-6 text-cyan-400" />
                                    <h2 className="text-2xl font-bold text-cyan-400">Technical Highlights</h2>
                                </div>
                                <p className="text-gray-300 text-lg leading-relaxed font-mono">
                                    {project.technicalHighlights}
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* Right Sidebar: Tech Stack & Actions */}
                    <div className="space-y-8">
                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3">
                            {project.liveLink && (
                                <a href={project.liveLink} className="flex items-center justify-center gap-2 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-transform active:scale-95 shadow-lg shadow-blue-600/20">
                                    <ExternalLink className="w-5 h-5" /> Live Demo
                                </a>
                            )}
                            {
                                project.githubLink && (
                                     <a href={project.githubLink} className="flex items-center justify-center gap-2 w-full py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                        <Github className="w-5 h-5" /> View Source Code
                                    </a>
                                )
                            }
                           
                        </div>

                        {/* Tech Stack Card */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-2 mb-6 text-gray-900 dark:text-white border-b dark:border-gray-700 pb-4">
                                <Code2 className="w-5 h-5 text-blue-500" />
                                <h3 className="font-bold text-lg">Technologies Used</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, idx) => (
                                    <span key={idx} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default ProjectDetails;