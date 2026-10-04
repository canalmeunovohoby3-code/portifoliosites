import { useCallback, useState } from 'react'
import type { Project } from './types'
import { AboutSection } from './components/AboutSection'
import { AudienceSection } from './components/AudienceSection'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { MenusSection } from './components/MenusSection'
import { ProcessSection } from './components/ProcessSection'
import { ProjectPreview } from './components/ProjectPreview'
import { Projects } from './components/Projects'
import { ShowcaseRail } from './components/ShowcaseRail'
import { WhatsAppFloat } from './components/WhatsAppFloat'
import { useReveal } from './hooks/useReveal'
import { track } from './lib/analytics'

export default function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  // Reveal suave em toda a página.
  useReveal()

  const openProject = useCallback((project: Project) => {
    track('project_open', {
      projectId: project.id,
      projectName: project.name,
      category: project.category,
    })
    setActiveProject(project)
  }, [])

  return (
    <>
      <Header />

      <main>
        <Hero />
        <ShowcaseRail />
        <Projects onOpen={openProject} />
        <ProcessSection />
        <MenusSection onOpen={openProject} />
        <AudienceSection />
        <AboutSection />
        <FinalCTA />
      </main>

      <Footer />

      <WhatsAppFloat hidden={Boolean(activeProject)} />

      <ProjectPreview project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  )
}
