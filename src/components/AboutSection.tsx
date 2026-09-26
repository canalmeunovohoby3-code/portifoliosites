import { Quote } from 'lucide-react'
import { aboutSection } from '../data/content'
import { siteConfig } from '../data/siteConfig'
import { SectionHeading } from './ui/SectionHeading'

/**
 * Sobre — card centralizado com a logomarca em destaque.
 * A logo vem de `siteConfig.brand.logo` (arquivo em /public, referência
 * relativa, funciona em qualquer subpasta do deploy).
 */
const LOGO_SRC = siteConfig.brand.logo
const LOGO_ALT = siteConfig.brand.logoAlt

export function AboutSection() {
  return (
    <section id="sobre" className="relative scroll-mt-24 bg-paper-soft py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink-200/70 to-transparent"
        aria-hidden="true"
      />
      <div className="shell-wide">
        <div className="reveal mx-auto max-w-3xl">
          {/* Card centralizado */}
          <div className="relative overflow-hidden rounded-[2.5rem] border border-ink-100 bg-white px-6 py-12 shadow-card sm:px-12 sm:py-16">
            {/* Brilhos e textura */}
            <div
              className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent-200/50 blur-3xl"
              aria-hidden="true"
            />
            <div className="pointer-events-none absolute inset-0 grain opacity-40" aria-hidden="true" />

            <div className="relative flex flex-col items-center text-center">
              {/* Círculo com a logomarca + anel de efeito */}
              <div className="relative h-56 w-56 shrink-0 sm:h-72 sm:w-72">
                {/* Halo suave */}
                <div
                  className="pointer-events-none absolute -inset-4 animate-halo-pulse rounded-full bg-accent-500/20 blur-2xl"
                  aria-hidden="true"
                />
                {/* Anel em gradiente girando */}
                <div
                  className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,#E04A67,#1A1A1A,#F4A8B8,#E04A67,#1A1A1A,#E04A67)]"
                  aria-hidden="true"
                />
                {/* Miolo branco com a logo */}
                <div className="absolute inset-[6px] flex items-center justify-center rounded-full bg-white p-4 shadow-[inset_0_2px_18px_rgba(26,26,26,0.08)] sm:p-5">
                  <img
                    src={LOGO_SRC}
                    alt={LOGO_ALT}
                    className="w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              {/* Texto */}
              <SectionHeading
                eyebrow={aboutSection.eyebrow}
                title={aboutSection.title}
                align="center"
                className="mt-9"
              />

              <div className="mt-6 space-y-4">
                {aboutSection.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mx-auto max-w-prose text-[1rem] leading-relaxed text-ink-500"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-8 flex max-w-prose items-start gap-3 rounded-2xl border border-ink-100 bg-paper-soft p-5 text-left shadow-card">
                <Quote className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                <p className="text-[0.95rem] font-medium leading-relaxed text-ink-700">
                  Meu compromisso é entregar um site que represente bem o seu negócio e deixe
                  claro, para quem chega, o que você faz e como falar com você.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
