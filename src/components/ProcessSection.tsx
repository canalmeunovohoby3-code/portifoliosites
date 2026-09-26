import { useEffect, useRef, useState } from 'react'
import { processSection } from '../data/content'
import { cn } from '../lib/cn'
import { SectionHeading } from './ui/SectionHeading'

/** Tempo de cada passo da sequência (ms). Ajuste em um só lugar. */
const STEP_MS = 700

/**
 * Como funciona — sequência contínua dos 4 passos.
 *
 * Enquanto a seção está visível, os passos acendem em ciclo:
 * 01 → 02 → 03 → 04 → (retorno) → 01 → ...
 * A linha de ligação avança no mesmo tempo dos números e volta suavemente
 * na fase de retorno, então a animação nunca para.
 */
export function ProcessSection() {
  const [inView, setInView] = useState(false)
  // 0..3 = passo ativo | steps.length = fase de retorno (linha volta)
  const [phase, setPhase] = useState(0)
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = rowRef.current
    if (!el || !('IntersectionObserver' in window)) {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const steps = processSection.steps
  const cycleLength = steps.length + 1 // 4 passos + 1 retorno
  const isReset = phase >= steps.length
  const active = isReset ? -1 : phase

  useEffect(() => {
    if (!inView) {
      setPhase(0)
      return
    }
    const id = window.setInterval(() => {
      setPhase((current) => (current + 1) % cycleLength)
    }, STEP_MS)
    return () => window.clearInterval(id)
  }, [inView, cycleLength])

  const lineMs = STEP_MS
  const linePct = active >= 0 ? (active / Math.max(1, steps.length - 1)) * 100 : 0

  return (
    <section id="como-funciona" className="relative scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="shell-wide">
        <SectionHeading
          eyebrow={processSection.eyebrow}
          title={processSection.title}
          className="max-w-2xl"
        />

        <div ref={rowRef} data-process-row data-phase={phase} className="relative mt-16">
          {/* Linha de ligação (desktop) */}
          <div
            className="pointer-events-none absolute left-[2.1rem] right-[2.1rem] top-[2.1rem] hidden h-px lg:block"
            aria-hidden="true"
          >
            <div className="h-px w-full bg-ink-100" />
            <div
              data-process-fill
              className="absolute left-0 top-0 h-px bg-gradient-to-r from-accent-500 to-accent-300"
              style={{
                width: `${linePct}%`,
                transitionProperty: 'width',
                transitionDuration: `${lineMs}ms`,
                transitionDelay: '0ms',
                transitionTimingFunction: 'linear',
              }}
            />
            <span
              className="absolute top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500 shadow-[0_0_0_4px_rgba(224,74,103,0.18)]"
              style={{
                left: `${linePct}%`,
                opacity: isReset ? 0 : 1,
                transitionProperty: 'left, opacity',
                transitionDuration: `${lineMs}ms`,
                transitionDelay: '0ms',
                transitionTimingFunction: 'linear',
              }}
            />
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, index) => {
              const isActive = index === active
              const isPassed = active > index
              const isOn = isActive || isPassed

              return (
                <div
                  key={step.index}
                  className="reveal relative flex flex-col"
                  style={{ transitionDelay: `${index * 140}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        'process-badge relative z-10 flex h-[4.2rem] w-[4.2rem] items-center justify-center rounded-2xl border font-display text-xl font-extrabold shadow-card transition-colors duration-500 ease-smooth',
                        isOn
                          ? 'border-ink-900 bg-ink-900 text-white'
                          : 'border-ink-100 bg-white text-ink-900',
                        isPassed && 'opacity-90',
                      )}
                    >
                      <span
                        key={isActive ? `on-${phase}` : `off-${index}`}
                        className={cn('relative', isActive && 'process-number')}
                      >
                        {step.index}
                      </span>

                      {/* Sublinhado de destaque */}
                      <span
                        className={cn(
                          'absolute -bottom-px left-1/2 h-1 -translate-x-1/2 rounded-full bg-accent-500 transition-all duration-500 ease-smooth',
                          isOn ? 'w-8 opacity-100' : 'w-1 opacity-0',
                        )}
                        aria-hidden="true"
                      />

                      {/* Anel que pulsa a cada ativação */}
                      {isActive && (
                        <span
                          key={`ring-${phase}`}
                          className="process-ring"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-bold text-ink-900">{step.title}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-500">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
