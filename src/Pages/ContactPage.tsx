import SEO from '../Components/SEO'
import { Mail, Github, Linkedin } from 'lucide-react'

export default function ContactPage() {
  return (
    <>
      <SEO title="Contact" canonical="/contact" description="Get in touch with Kyaw Paing Oo for freelance projects or collaborations." />
      <div className="text-white pr-8">
        <h1 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
          <Mail className="w-5 h-5 text-blue-400" />Contact
        </h1>
        <p className="text-gray-300 text-sm mb-4">Open to opportunities and collaborations!</p>
        <div className="space-y-2">
          <a href="mailto:paingookyaw624@gmail.com" className="flex items-center gap-3 px-3 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors" aria-label="Send email">
            <Mail className="w-4 h-4 text-blue-400" />
            <div><p className="text-sm font-medium">Email</p><p className="text-xs text-gray-400">paingookyaw624@gmail.com</p></div>
          </a>
          <a href="https://github.com/Kyawpaingoo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors" aria-label="Visit GitHub">
            <Github className="w-4 h-4 text-gray-400" />
            <div><p className="text-sm font-medium">GitHub</p><p className="text-xs text-gray-400">@Kyawpaingoo</p></div>
          </a>
          <a href="https://www.linkedin.com/in/kyaw-paing-oo-dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors" aria-label="Visit LinkedIn">
            <Linkedin className="w-4 h-4 text-blue-500" />
            <div><p className="text-sm font-medium">LinkedIn</p><p className="text-xs text-gray-400">kyaw-paing-oo-dev</p></div>
          </a>
        </div>
      </div>
    </>
  )
}
