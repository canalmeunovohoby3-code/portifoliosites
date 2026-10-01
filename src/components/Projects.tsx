import type { Project } from '../types'
import { projects } from '../data/projects'
import { projectsSection } from '../data/content'
import { ProjectCard } from './ProjectCard'
import { SectionHeading } from './ui/SectionHeading'

interface ProjectsProps {
  onOpen: (project: Project) => void
}

/** Todos os projetos expostos — 4 por linha no desktop (4 em cima, 4 embaixo). */
export function Projects({ onOpen }: ProjectsProps) {
  return (
    <section id="projetos" className="relative scroll-mt-24 bg-paper-soft py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink-200/70 to-transparent"
        aria-hidden="true"
      />
      <div className="shell-wide">
        <SectionHeading
          eyebrow={projectsSection.eyebrow}
          title={projectsSection.title}
          text={projectsSection.text}
          className="max-w-2xl"
        />

        <div className="mt-14 flex flex-wrap justify-center gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="flex w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
            >
              <ProjectCard project={project} onOpen={onOpen} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
