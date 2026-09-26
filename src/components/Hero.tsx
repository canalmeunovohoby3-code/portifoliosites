import { ArrowRight, Sparkles } from 'lucide-react'
import { hero } from '../data/content'
import { siteConfig } from '../data/siteConfig'
import { track } from '../lib/analytics'
import { openWhatsApp, whatsappUrl } from '../lib/whatsapp'
import { HeroShowcase } from './HeroShowcase'
import { CTAButton } from './ui/CTAButton'
import { TypedHeadline } from './ui/TypedHeadline'

/** Ritmo da soletração do título (ms). Ajuste em um lugar só. */
const TITLE_TYPING = {
  startDelay: 300,
  charDelay: 55,
  settleDelay: 2000,
  exitMs: 380,
}

export function Hero() {
  const handlePrimary = () => {
    track('cta_click', { source: 'hero-primary' })
    track('whatsapp_click', { source: 'hero' })
    openWhatsApp(whatsappUrl(siteConfig.whatsapp.projectMessage))
  }

  return (
    <section id="inicio" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      {/* Textura e brilho de fundo */}
      <div className="pointer-events-none absolute inset-0 grain opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent-100/70 blur-3xl"
        aria-hidden="true"
      />

      <div className="shell-wide relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Coluna de texto */}
          <div className="reveal is-visible max-w-xl">
            <span className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-ink-100 bg-white/80 px-3.5 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink-500">
              <Sparkles className="h-3.5 w-3.5 text-accent-500" />
              {hero.eyebrow}
            </span>

            <TypedHeadline
              text={hero.title}
              className="mt-6 text-display font-extrabold text-ink-900"
              startDelay={TITLE_TYPING.startDelay}
              charDelay={TITLE_TYPING.charDelay}
              settleDelay={TITLE_TYPING.settleDelay}
              exitMs={TITLE_TYPING.exitMs}
            />

            <p
              className="mt-6 max-w-prose animate-fade-up text-[1.05rem] leading-relaxed text-ink-500"
              style={{ animationDelay: '120ms' }}
            >
              {hero.text}
            </p>

            <div
              className="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: '220ms' }}
            >
              <CTAButton variant="primary" size="lg" icon={ArrowRight} onClick={handlePrimary}>
                {hero.ctaPrimary}
              </CTAButton>
              <CTAButton
                variant="secondary"
                size="lg"
                href="#projetos"
                onClick={() => track('cta_click', { source: 'hero-secondary' })}
              >
                {hero.ctaSecondary}
              </CTAButton>
            </div>

            {/* Indicador de confiança */}
            <div
              className="mt-10 flex animate-fade-up flex-wrap items-center gap-x-3 gap-y-2 text-[0.8rem] font-medium text-ink-400"
              style={{ animationDelay: '320ms' }}
            >
              {hero.trustLine.map((item, index) => (
                <span key={item} className="flex items-center gap-3">
                  {index > 0 && <span className="h-1 w-1 rounded-full bg-accent-400" />}
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Coluna visual */}
          <div className="reveal is-visible lg:pl-4" style={{ transitionDelay: '0.1s' }}>
            <HeroShowcase />
          </div>
        </div>
      </div>

      {/* Faixa que conecta com a próxima seção */}
      <div className="mt-20 border-y border-ink-100 bg-white/60 py-5 sm:mt-24">
        <div className="shell-wide">
          <p className="text-center text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ink-400">
            Projetos reais · Sites que já saíram do papel · Feitos sob medida
          </p>
        </div>
      </div>
    </section>
  )
}
