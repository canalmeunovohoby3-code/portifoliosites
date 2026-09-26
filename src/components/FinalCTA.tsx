import { ArrowRight, MessageCircle } from 'lucide-react'
import { finalCta } from '../data/content'
import { siteConfig } from '../data/siteConfig'
import { track } from '../lib/analytics'
import { openWhatsApp, whatsappUrl } from '../lib/whatsapp'
import { CTAButton } from './ui/CTAButton'

/** CTA final — bloco de contraste com a conversão principal. */
export function FinalCTA() {
  const handlePrimary = () => {
    track('cta_click', { source: 'final-primary' })
    track('whatsapp_click', { source: 'final' })
    openWhatsApp(whatsappUrl(siteConfig.whatsapp.projectMessage))
  }

  return (
    <section id="contato" className="scroll-mt-24 bg-white px-4 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-wide">
        <div className="relative overflow-hidden rounded-3xl bg-ink-900 px-6 py-16 sm:px-12 sm:py-20">
          {/* Detalhes gráficos */}
          <div className="pointer-events-none absolute inset-0 grain opacity-30" aria-hidden="true" />
          <div
            className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-accent-500/25 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-accent-500/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-3xl text-center">
            <p className="eyebrow eyebrow--bare justify-center text-accent-300">
              {finalCta.eyebrow}
            </p>
            <h2 className="mt-4 text-balance font-display text-display-sm font-extrabold text-white md:text-[2.9rem]">
              {finalCta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-prose text-[1.02rem] leading-relaxed text-white/65">
              {finalCta.text}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <CTAButton variant="primary" size="lg" icon={ArrowRight} onClick={handlePrimary}>
                {finalCta.ctaPrimary}
              </CTAButton>
              <CTAButton
                variant="outline"
                size="lg"
                icon={MessageCircle}
                iconPosition="left"
                onClick={handlePrimary}
              >
                {finalCta.ctaSecondary}
              </CTAButton>
            </div>

            <p className="mt-6 text-[0.8rem] text-white/40">
              Conversa inicial sem compromisso · Resposta pelo WhatsApp
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
