import { processSection } from '../data/content'
import { SectionHeading } from './ui/SectionHeading'

/** Como funciona — do primeiro contato ao site no ar. */
export function ProcessSection() {
  return (
    <section id="como-funciona" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="shell-wide">
        <SectionHeading
          eyebrow={processSection.eyebrow}
          title={processSection.title}
          className="max-w-2xl"
        />

        <div className="relative mt-14">
          {/* Linha de conexão (desktop) */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-[2.1rem] hidden h-px bg-gradient-to-r from-transparent via-ink-200 to-transparent lg:block"
            aria-hidden="true"
          />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {processSection.steps.map((step, index) => (
              <div
                key={step.index}
                className="reveal relative flex flex-col"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="flex items-center gap-3">
                  <span className="relative z-10 flex h-[4.2rem] w-[4.2rem] items-center justify-center rounded-2xl border border-ink-100 bg-white font-display text-xl font-extrabold text-ink-900 shadow-card">
                    {step.index}
                    <span className="absolute -bottom-px left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-accent-500" />
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
