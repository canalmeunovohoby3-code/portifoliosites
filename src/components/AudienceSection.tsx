import {
  Building2,
  Factory,
  MapPin,
  Sparkles,
  Store,
  UserRound,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { audienceSection } from '../data/content'
import { SectionHeading } from './ui/SectionHeading'

const icons: LucideIcon[] = [
  Building2,
  Wrench,
  UserRound,
  Store,
  Factory,
  UtensilsCrossed,
  MapPin,
  Sparkles,
]

/** Para quem é — tipos de negócio, sem inventar clientes. */
export function AudienceSection() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="shell-wide">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeading
            eyebrow={audienceSection.eyebrow}
            title={audienceSection.title}
            text={audienceSection.text}
          />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
            {audienceSection.items.map((item, index) => {
              const Icon = icons[index] ?? Sparkles
              return (
                <div
                  key={item}
                  className="reveal flex flex-col items-start gap-3 rounded-2xl border border-ink-100 bg-paper-soft p-4 transition-all duration-400 ease-smooth hover:border-accent-200 hover:bg-accent-50/50"
                  style={{ transitionDelay: `${index * 45}ms` }}
                >
                  <Icon className="h-5 w-5 text-accent-500" />
                  <span className="text-[0.88rem] font-medium leading-snug text-ink-700">
                    {item}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
