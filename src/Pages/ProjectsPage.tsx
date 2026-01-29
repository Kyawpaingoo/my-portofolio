import { useState } from 'react'
import SEO from '../Components/SEO'
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { projects } from '../Data'

export default function ProjectsPage() {
  const [currentProject, setCurrentProject] = useState(0)
  const project = projects[currentProject]

  return (
    <>
      <SEO title="Projects" canonical="/projects" description="Portfolio projects: NomadFocus, DevCanvas, and more full-stack applications." />
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-between p-3 border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>
          <span className="text-xs text-gray-400">{currentProject + 1} / {projects.length}</span>
        </div>
        <div className="p-4">
          <h1 className="text-lg font-bold text-blue-400 mb-2">{project.title}</h1>
          <p className="text-sm text-gray-300 mb-4 leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded">{tech}</span>
            ))}
          </div>
          <div className="flex gap-2">
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-white transition-colors" aria-label={`View ${project.title} on GitHub`}>
                <Github className="w-4 h-4" />GitHub
              </a>
            )}
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm text-white transition-colors" aria-label={`View ${project.title} live`}>
                <ExternalLink className="w-4 h-4" />Live Demo
              </a>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between p-3 border-t border-white/10 bg-gray-800/50">
          <button onClick={() => setCurrentProject((p) => (p - 1 + projects.length) % projects.length)} className="flex items-center gap-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-white transition-colors" aria-label="Previous project">
            <ChevronLeft className="w-4 h-4" />Prev
          </button>
          <div className="flex gap-1">
            {projects.slice(0, 5).map((_, idx) => (
              <button key={idx} onClick={() => setCurrentProject(idx)} className={`w-2 h-2 rounded-full transition-colors ${currentProject === idx ? 'bg-blue-500' : 'bg-gray-600'}`} aria-label={`Go to project ${idx + 1}`} />
            ))}
          </div>
          <button onClick={() => setCurrentProject((p) => (p + 1) % projects.length)} className="flex items-center gap-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-white transition-colors" aria-label="Next project">
            Next<ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "ItemList",
          "itemListElement": projects.map((proj, idx) => ({
            "@type": "ListItem", "position": idx + 1,
            "item": { "@type": "SoftwareSourceCode", "name": proj.title, "description": proj.description, "programmingLanguage": proj.technologies, "codeRepository": proj.githubLink }
          }))
        })
      }} />
    </>
  )
}
