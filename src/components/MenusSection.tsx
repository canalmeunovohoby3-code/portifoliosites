import type { Project } from '../types'
import { menus } from '../data/menus'
import { ProjectCard } from './ProjectCard'
import { SectionHeading } from './ui/SectionHeading'

interface MenusSectionProps {
  onOpen: (project: Project) => void
}

/** Seção específica de cardápios digitais (menus para o food service). */
export function MenusSection({ onOpen }: MenusSectionProps) {
  return (
    <section id="cardapios" className="relative scroll-mt-24 bg-paper-soft py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink-200/70 to-transparent"
        aria-hidden="true"
      />
      <div className="shell-wide">
        <SectionHeading
          eyebrow="Cardápios digitais"
          title="Cardápios digitais que facilitam o pedido."
          text="Menus para restaurantes, pizzarias, pastelarias e sorveterias — com fotos, categorias e pedido direto pelo WhatsApp."
          className="max-w-2xl"
        />

        <div className="mt-14 flex flex-wrap justify-center gap-6">
          {menus.map((menu, index) => (
            <div
              key={menu.id}
              className="flex w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
            >
              <ProjectCard project={menu} onOpen={onOpen} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
