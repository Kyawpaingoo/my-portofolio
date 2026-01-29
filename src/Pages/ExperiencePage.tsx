import SEO from '../Components/SEO'
import { Briefcase, Calendar } from 'lucide-react'
import { experiences } from '../Data'

export default function ExperiencePage() {
  return (
    <>
      <SEO title="Experience" canonical="/experience" description="Professional experience as Software Engineer at Yammobots." />
      <div className="text-white pr-8">
        <h1 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-blue-400" />Experience
        </h1>
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <article key={index} className="border-l-2 border-blue-500 pl-3">
              <h2 className="text-sm font-semibold">{exp.title}</h2>
              <p className="text-blue-400 text-xs">{exp.company}</p>
              <p className="text-xs text-gray-400 flex items-center gap-1 mb-1">
                <Calendar className="w-3 h-3" /><time>{exp.period}</time>
              </p>
              <p className="text-gray-300 text-xs mb-2">{exp.description}</p>
              <div className="flex flex-wrap gap-1">
                {exp.technologies.slice(0, 4).map((tech) => (
                  <span key={tech} className="px-1.5 py-0.5 text-xs bg-blue-500/20 text-blue-300 rounded">{tech}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}
