import { useEffect, useRef, useState } from 'react'
import { differentialsSection } from '../data/content'
import { cn } from '../lib/cn'
import { SectionHeading } from './ui/SectionHeading'

/** Tempo de cada diferencial no autoplay (ms). */
const AUTOPLAY_MS = 4500

/* ------------------------------------------------------------------ */
/* Microvisuais (CSS/SVG) — um por conceito, feitos sob medida         */
/* ------------------------------------------------------------------ */

/** 01 — blocos de layout se reorganizando (composição sob medida). */
function VisualDesign() {
  return (
    <div className="vis vis--design" aria-hidden="true">
      <span className="dg dg1" />
      <span className="dg dg2" />
      <span className="dg dg3" />
      <span className="dg dg4" />
    </div>
  )
}

/** 02 — a interface adaptando a largura (responsivo). */
function VisualResponsive() {
  return (
    <div className="vis vis--responsive" aria-hidden="true">
      <div className="rw">
        <span className="rw__bar" />
        <div className="rw__row">
          <span className="rw__b" />
          <span className="rw__b" />
          <span className="rw__b" />
        </div>
      </div>
    </div>
  )
}

/** 03 — hierarquia/estrutura desenhando as conexões (sitemap). */
function VisualStructure() {
  return (
    <svg className="vis vis--structure" viewBox="0 0 320 200" fill="none" aria-hidden="true">
      <path className="st-line st-l1" d="M160 44 V 96" />
      <path className="st-line st-l2" d="M64 152 V 96 H 256 V 152" />
      <path className="st-line st-l3" d="M160 96 V 152" />
      <circle className="st-node st-n0" cx="160" cy="34" r="7" />
      <circle className="st-node st-n1" cx="64" cy="162" r="7" />
      <circle className="st-node st-n2" cx="160" cy="162" r="7" />
      <circle className="st-node st-n3 accent" cx="256" cy="162" r="7" />
    </svg>
  )
}

/** 04 — o caminho até a conversão (foco no negócio). */
function VisualFocus() {
  return (
    <div className="vis vis--focus" aria-hidden="true">
      <span className="fc-track" />
      <span className="fc-cursor" />
      <span className="fc-cta">Falar</span>
    </div>
  )
}

const VISUALS = [VisualDesign, VisualResponsive, VisualStructure, VisualFocus]

/* ------------------------------------------------------------------ */
/* Seção                                                               */
/* ------------------------------------------------------------------ */

export function DifferentialsSection() {
  const items = differentialsSection.items
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)

  // Pausa o autoplay quando a seção não está visível.
  useEffect(() => {
    const el = sectionRef.current
    if (!el || !('IntersectionObserver' in window)) {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.25,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Autoplay elegante: 01 → 02 → 03 → 04 → 01, pausando na interação.
  useEffect(() => {
    if (paused || !inView) return
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % items.length)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [paused, inView, items.length])

  // Profundidade: o número grande acompanha a rolagem por poucos pixels.
  useEffect(() => {
    const el = numberRef.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const section = sectionRef.current
        if (!section) return
        const rect = section.getBoundingClientRect()
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * 0.04
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const current = items[active]
  const Visual = VISUALS[active % VISUALS.length]

  return (
    <section
      ref={sectionRef}
      id="diferenciais"
      data-diff-active={active}
      className="relative scroll-mt-24 overflow-hidden bg-paper-soft py-20 sm:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink-200/70 to-transparent"
        aria-hidden="true"
      />
      <div className="shell-wide">
        <SectionHeading
          eyebrow={differentialsSection.eyebrow}
          title={differentialsSection.title}
          className="max-w-2xl"
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-16">
          {/* Índice numerado */}
          <div className="order-2 lg:order-1">
            <ul className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
              {items.map((item, index) => {
                const isActive = index === active
                return (
                  <li
                    key={item.title}
                    className="reveal w-[74%] shrink-0 snap-start sm:w-[46%] lg:w-full"
                    style={{ transitionDelay: `${160 + index * 80}ms` }}
                  >
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      aria-current={isActive}
                      className={cn(
                        'group/item block w-full py-4 text-left transition-transform duration-300 ease-smooth lg:py-5',
                        !isActive && 'lg:opacity-60 lg:hover:opacity-100',
                      )}
                    >
                      <span className="flex items-center gap-4">
                        <span
                          className={cn(
                            'font-display text-sm font-bold tabular-nums transition-colors duration-300',
                            isActive ? 'text-accent-600' : 'text-ink-300',
                          )}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={cn(
                            'h-px flex-1 origin-left transition-all duration-500 ease-smooth',
                            isActive
                              ? 'bg-accent-500'
                              : 'bg-ink-200 group-hover/item:bg-accent-300',
                          )}
                        />
                      </span>
                      <span
                        className={cn(
                          'mt-3 block font-display text-lg font-bold tracking-tight transition-all duration-400 ease-smooth sm:text-xl',
                          isActive
                            ? 'translate-x-1 text-ink-900'
                            : 'translate-x-0 text-ink-400 group-hover/item:text-ink-700',
                        )}
                      >
                        {item.title}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Palco do diferencial ativo */}
          <div
            className="reveal relative order-1 lg:order-2"
            style={{ transitionDelay: '260ms' }}
            onMouseEnter={() => setActive(active)}
          >
            <span
              ref={numberRef}
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 right-0 select-none font-display text-[8rem] font-extrabold leading-none tracking-tighter text-ink-900/[0.055] sm:text-[11rem] lg:-top-24"
            >
              {String(active + 1).padStart(2, '0')}
            </span>

            <div key={active} className="relative animate-[fade-up_0.5s_cubic-bezier(0.22,1,0.36,1)_both]">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-accent-600">
                Diferencial
              </p>
              <h3 className="mt-4 max-w-md font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
                {current.title}
              </h3>
              <p className="mt-4 max-w-prose text-[1.02rem] leading-relaxed text-ink-500">
                {current.description}
              </p>

              <div className="mt-10">
                <Visual />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
