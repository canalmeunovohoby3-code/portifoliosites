import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react'
import { ArrowUpRight, MapPin } from 'lucide-react'
import type { Project } from '../types'
import { previewSection } from '../data/content'
import { cn } from '../lib/cn'
import { ProjectThumb } from './ProjectThumb'

interface ProjectCardProps {
  project: Project
  onOpen: (project: Project) => void
  /** Atraso de entrada (animação escalonada). */
  index?: number
  /** Quando false, o card não usa o reveal de scroll (o pai controla o foco). */
  revealOnScroll?: boolean
}

/**
 * Card de projeto — TODOS os projetos usam exatamente esta mesma estrutura
 * e o mesmo tamanho. Sem destaque, sem ranking, sem card "gigante".
 */
export function ProjectCard({ project, onOpen, index = 0, revealOnScroll = true }: ProjectCardProps) {
  const label = project.url ?? project.name
  const imageAlt = `Prévia do site ${project.name} — ${project.segment}`

  // Inclinação 3D seguindo o mouse — apenas em dispositivos com ponteiro fino.
  const cardRef = useRef<HTMLDivElement>(null)
  const canTilt = useRef(false)

  useEffect(() => {
    canTilt.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches
  }, [])

  const handleMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!canTilt.current) return
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    const ry = (px * 9).toFixed(2) // ±4,5 graus
    const rx = (-py * 9).toFixed(2)
    el.style.transform = `translateY(-8px) scale(1.02) perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`
  }

  const handleLeave = () => {
    const el = cardRef.current
    if (el) el.style.transform = ''
  }

  return (
    <article
      className={cn('group relative flex h-full flex-col', revealOnScroll && 'reveal')}
      style={revealOnScroll ? { transitionDelay: `${Math.min(index, 6) * 60}ms` } : undefined}
    >
      <div
        ref={cardRef}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card transition-all duration-300 ease-smooth hover:border-ink-200 hover:shadow-card-hover"
        style={{ willChange: 'transform' }}
      >
        {/* Moldura de navegador + preview */}
        <button
          type="button"
          onClick={() => onOpen(project)}
          aria-label={`Ver projeto ${project.name}`}
          className="relative block w-full text-left"
        >
          <div className="border-b border-ink-100 bg-paper-muted/80 px-3.5 py-2.5">
            <div className="flex items-center gap-2.5">
              <div className="browser-dots" aria-hidden="true">
                <span className="browser-dot bg-ink-200" />
                <span className="browser-dot bg-ink-200" />
                <span className="browser-dot bg-ink-200" />
              </div>
              <span className="truncate rounded-full border border-ink-100 bg-white px-2.5 py-1 text-[0.68rem] text-ink-400">
                {label}
              </span>
            </div>
          </div>

          <div className="relative aspect-[16/10] overflow-hidden bg-paper-muted">
            <ProjectThumb
              src={project.coverImage}
              alt={imageAlt}
              projectName={project.name}
              segment={project.segment}
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 380px"
              imgClassName="transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
            />

            {/* Brilho que percorre a imagem no hover */}
            <span
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[900ms] ease-smooth group-hover:translate-x-full"
              aria-hidden="true"
            />

            {/* Overlay de convite ao preview */}
            <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-ink-900/75 via-ink-900/10 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100">
              <div className="flex w-full items-center justify-between gap-3 p-4">
                <span className="text-sm font-semibold text-white">{previewSection.openLabel}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-500 text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>

            {/* Selo de preview disponível */}
            <span
              className={cn(
                'absolute left-3 top-3 rounded-full px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.12em] backdrop-blur',
                project.iframeEnabled
                  ? 'bg-white/90 text-ink-700'
                  : 'bg-ink-900/80 text-white/80',
              )}
            >
              {project.iframeEnabled ? 'Preview interativo' : 'Demonstração'}
            </span>
          </div>
        </button>

        {/* Conteúdo do card */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-[1.12rem] font-bold leading-snug text-ink-900">
            {project.name}
          </h3>

          <p className="mt-2 line-clamp-2 text-[0.9rem] leading-relaxed text-ink-500">
            {project.description}
          </p>

          <div className="mt-4 flex items-center gap-2 text-[0.78rem] text-ink-400">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">
              {project.segment}
              {project.location ? ` · ${project.location}` : ''}
            </span>
          </div>

          {/* Rodapé alinhado em todos os cards */}
          <div className="mt-auto pt-5">
            <button
              type="button"
              onClick={() => onOpen(project)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink-200 px-4 py-2.5 text-[0.85rem] font-semibold text-ink-900 transition-all duration-300 hover:border-ink-900 hover:bg-ink-900 hover:text-white"
            >
              {previewSection.openLabel}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
