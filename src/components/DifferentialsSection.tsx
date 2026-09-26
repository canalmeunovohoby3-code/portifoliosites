import { LayoutGrid, Palette, Smartphone, Target, type LucideIcon } from 'lucide-react'
import { differentialsSection } from '../data/content'
import { SectionHeading } from './ui/SectionHeading'

const icons: LucideIcon[] = [Palette, Smartphone, LayoutGrid, Target]

/** Diferenciais — objetivos, sem promessas que não podem ser comprovadas. */
export function DifferentialsSection() {
  return (
    <section className="relative bg-paper-soft py-20 sm:py-28">
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

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {differentialsSection.items.map((item, index) => {
            const Icon = icons[index] ?? Palette
            return (
              <div
                key={item.title}
                className="reveal flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-card transition-all duration-500 ease-smooth hover:-translate-y-1 hover:shadow-card-hover"
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-[1.05rem] font-bold text-ink-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-500">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
