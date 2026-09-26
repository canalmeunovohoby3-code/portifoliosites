import { useEffect, useRef, useState } from 'react'
import { processSection } from '../data/content'
import { cn } from '../lib/cn'
import { SectionHeading } from './ui/SectionHeading'

/** Tempo de cada passo da sequência (ms). Ajuste em um só lugar. */
const STEP_MS = 700

/**
 * Como funciona — os 4 passos acendem em sequência (01 → 04) quando a seção
 * entra em cena: a linha de ligação avança até o quarto passo, cada número
 * ganha um anel em #E04A67 e o marcador percorre a linha no mesmo ritmo.
 */
export function ProcessSection() {
  const [started, setStarted] = useState(false)
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = rowRef.current
    if (!el || !('IntersectionObserver' in window)) {
      setStarted(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const steps = processSection.steps
  const lineMs = STEP_MS * Math.max(1, steps.length - 1)

  return (
    <section id="como-funciona" className="relative scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="shell-wide">
        <SectionHeading
          eyebrow={processSection.eyebrow}
          title={processSection.title}
          className="max-w-2xl"
        />

        <div ref={rowRef} className="relative mt-16">
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
                width: started ? '100%' : '0%',
                transitionProperty: 'width',
                transitionDuration: `${lineMs}ms`,
                transitionDelay: '0ms',
                // Linear: a linha chega em cada número exatamente quando ele acende.
                transitionTimingFunction: 'linear',
              }}
            />
            <span
              data-process-dot
              className="absolute top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500 shadow-[0_0_0_4px_rgba(224,74,103,0.18)]"
              style={{
                left: started ? '100%' : '0%',
                transitionProperty: 'left',
                transitionDuration: `${lineMs}ms`,
                transitionDelay: '0ms',
                transitionTimingFunction: 'linear',
              }}
            />
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, index) => (
              <div
                key={step.index}
                className="reveal relative flex flex-col"
                style={{ transitionDelay: `${index * 140}ms` }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'process-badge relative z-10 flex h-[4.2rem] w-[4.2rem] items-center justify-center rounded-2xl border font-display text-xl font-extrabold shadow-card transition-colors duration-500 ease-smooth',
                      started
                        ? 'border-ink-900 bg-ink-900 text-white'
                        : 'border-ink-100 bg-white text-ink-900',
                    )}
                    style={{ transitionDelay: `${index * STEP_MS}ms` }}
                  >
                    <span
                      className={cn('relative', started && 'process-number')}
                      style={started ? { animationDelay: `${index * STEP_MS}ms` } : undefined}
                    >
                      {step.index}
                    </span>

                    {/* Sublinhado de destaque */}
                    <span
                      className={cn(
                        'absolute -bottom-px left-1/2 h-1 -translate-x-1/2 rounded-full bg-accent-500 transition-all duration-500 ease-smooth',
                        started ? 'w-8 opacity-100' : 'w-1 opacity-0',
                      )}
                      style={{ transitionDelay: `${index * STEP_MS}ms` }}
                      aria-hidden="true"
                    />

                    {/* Anel que pulsa na ativação */}
                    {started && (
                      <span
                        className="process-ring"
                        style={{ animationDelay: `${index * STEP_MS}ms` }}
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
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
