import SEO from '../Components/SEO'
import { Code2 } from 'lucide-react'
import { skillCategories } from '../Data'

export default function SkillsPage() {
  return (
    <>
      <SEO title="Skills" canonical="/skills" description="Technical skills: React, TypeScript, Node.js, .NET, PostgreSQL, AWS, Docker." />
      <div className="text-white pr-8">
        <h1 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-blue-400" />Skills
        </h1>
        <div className="space-y-3">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <h2 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <category.icon className={`w-4 h-4 ${category.color}`} />{category.title}
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <span key={skill} className="px-2 py-1 text-xs bg-white/10 rounded-full text-gray-300">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
