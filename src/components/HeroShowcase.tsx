import { useCallback, useEffect, useRef, useState } from 'react'
import { Monitor } from 'lucide-react'
import { projects } from '../data/projects'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { ProjectThumb } from './ProjectThumb'
import { BrowserFrame } from './ui/BrowserFrame'

/**
 * Ritmo da rotação dos previews (configurável em um só lugar).
 *  - intervalMs: tempo que cada projeto fica em destaque
 *  - transitionMs: duração da reorganização da pilha
 */
const PREVIEW_ROTATION = {
  intervalMs: 4000,
  transitionMs: 950,
}

/** Ids usados na composição do hero (caem para os 3 primeiros se não existirem). */
const SHOWCASE_IDS = ['saraiva', 'mhr', 'mod-moveis']

interface SlotStyle {
  left: string
  top: string
  width: string
  scale: number
  rotate: number
  /** Rotação em Y (profundidade 3D). */
  rotateY: number
  /** Profundidade em px. */
  depth: number
  z: number
  opacity: number
}

/** Posições da pilha: [0] frente, [1] meio, [2] fundo. */
const DESKTOP_SLOTS: SlotStyle[] = [
  { left: '50%', top: '56%', width: '78%', scale: 1, rotate: 0, rotateY: 0, depth: 60, z: 30, opacity: 1 },
  { left: '76%', top: '26%', width: '78%', scale: 0.82, rotate: -2, rotateY: -15, depth: -40, z: 20, opacity: 0.97 },
  { left: '24%', top: '42%', width: '78%', scale: 0.76, rotate: 3, rotateY: 14, depth: -110, z: 10, opacity: 0.92 },
]

const MOBILE_SLOTS: SlotStyle[] = [
  { left: '50%', top: '58%', width: '84%', scale: 1, rotate: 0, rotateY: 0, depth: 30, z: 30, opacity: 1 },
  { left: '66%', top: '30%', width: '84%', scale: 0.82, rotate: -2, rotateY: -12, depth: -30, z: 20, opacity: 0.96 },
  { left: '34%', top: '44%', width: '84%', scale: 0.76, rotate: 3, rotateY: 10, depth: -80, z: 10, opacity: 0.9 },
]

function pickShowcase() {
  const picked = SHOWCASE_IDS
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is (typeof projects)[number] => Boolean(project))

  if (picked.length >= 3) return picked.slice(0, 3)
  return projects.slice(0, 3)
}

const EASING = 'cubic-bezier(0.22, 1, 0.36, 1)'

/**
 * Composição visual do hero com recortes de projetos reais.
 *
 * Os três cards sobrepostos formam uma pilha em perspectiva 3D que se
 * reorganiza continuamente: o que está atrás vem para a frente, o da frente
 * vai para o fundo e o do meio assume a posição intermediária.
 */
export function HeroShowcase() {
  const showcase = pickShowcase()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  // `order[slot] = índice do projeto`: [frente, meio, fundo].
  const [order, setOrder] = useState<number[]>([0, 1, 2])
  const pausedRef = useRef(false)

  useEffect(() => {
    const id = window.setInterval(() => {
      if (pausedRef.current) return
      setOrder(([front, mid, back]) => [back, front, mid])
    }, PREVIEW_ROTATION.intervalMs)
    return () => window.clearInterval(id)
  }, [])

  // Microparallax: a composição acompanha a rolagem (poucos pixels).
  const parallaxRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = parallaxRef.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 700)
        el.style.transform = `translate3d(0, ${(y * 0.06).toFixed(1)}px, 0)`
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const pause = useCallback(() => {
    pausedRef.current = true
  }, [])
  const resume = useCallback(() => {
    pausedRef.current = false
  }, [])

  const slots = isDesktop ? DESKTOP_SLOTS : MOBILE_SLOTS
  const duration = PREVIEW_ROTATION.transitionMs

  return (
    <div
      ref={parallaxRef}
      className="relative mx-auto w-full max-w-[560px]"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* Brilho de fundo discreto */}
      <div
        className="pointer-events-none absolute -top-6 right-0 h-64 w-64 rounded-full bg-accent-200/55 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-52 w-52 rounded-full bg-ink-200/60 blur-3xl"
        aria-hidden="true"
      />

      {/* Leve flutuação contínua de toda a composição */}
      <div className="relative aspect-[4/5] w-full animate-float-slow sm:aspect-[5/5]">
        {/* Palco 3D */}
        <div className="absolute inset-0" style={{ perspective: '1600px' }}>
          {showcase.map((project, projectIndex) => {
            const slotIndex = order.indexOf(projectIndex)
            const slot = slots[slotIndex] ?? slots[slots.length - 1]
            const isFront = slotIndex === 0

            return (
              <div
                key={project.id}
                className="absolute"
                style={{
                  left: slot.left,
                  top: slot.top,
                  width: slot.width,
                  zIndex: slot.z,
                  opacity: slot.opacity,
                  transform: `translate(-50%, -50%) translateZ(${slot.depth}px) rotateY(${slot.rotateY}deg) rotate(${slot.rotate}deg) scale(${slot.scale})`,
                  transformStyle: 'preserve-3d',
                  transition: `left ${duration}ms ${EASING}, top ${duration}ms ${EASING}, transform ${duration}ms ${EASING}, opacity ${duration}ms ${EASING}`,
                  willChange: 'left, top, transform, opacity',
                }}
              >
                <BrowserFrame label={project.url ?? project.name}>
                  <div className="aspect-[16/10] overflow-hidden bg-paper-muted">
                    <ProjectThumb
                      src={project.coverImage}
                      alt={`Prévia do projeto ${project.name}`}
                      projectName={project.name}
                      segment={project.segment}
                      priority={isFront}
                      sizes="(max-width: 1024px) 84vw, 440px"
                    />
                  </div>
                </BrowserFrame>
              </div>
            )
          })}
        </div>

        {/* Selo flutuante */}
        <div className="pointer-events-none absolute bottom-4 right-2 z-40 animate-float sm:right-6">
          <div className="flex items-center gap-2.5 rounded-2xl border border-ink-100 bg-white/95 px-4 py-3 shadow-card backdrop-blur">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
              <Monitor className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <p className="text-[0.78rem] font-semibold text-ink-900">Preview interativo</p>
              <p className="text-[0.7rem] text-ink-400">Navegue dentro do portfólio</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
