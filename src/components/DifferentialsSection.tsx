import { differentialsSection } from '../data/content'
import { SectionHeading } from './ui/SectionHeading'

/* ------------------------------------------------------------------ */
/* Microvisuais próprios (CSS/SVG) — um por diferencial                */
/* ------------------------------------------------------------------ */

/** 01 — módulos de layout se reorganizando (interface sob medida). */
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

/** 02 — a interface adaptando a largura (mobile / responsivo). */
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

/** 03 — estrutura/hierarquia conectada (arquitetura de informação). */
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

/** 04 — o percurso até o objetivo (contato / ação). */
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

/**
 * Diferenciais — quatro cards premium.
 * O conteúdo é o aprovado; aqui só muda o tratamento visual: numeração
 * editorial, microvisual próprio por card (sem ícones de biblioteca),
 * profundidade, moldura refinada e microanimações no hover.
 */
export function DifferentialsSection() {
  const items = differentialsSection.items

  return (
    <section
      id="diferenciais"
      className="relative scroll-mt-24 overflow-hidden bg-paper-soft py-20 sm:py-28"
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

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Visual = VISUALS[index % VISUALS.length]
            return (
              <div
                key={item.title}
                className="reveal flex"
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <article className="diff-card group relative flex w-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-card transition-all duration-400 ease-smooth hover:-translate-y-1.5 hover:border-accent-200 hover:shadow-card-hover sm:p-7">
                  {/* Numeração + régua que se expande no hover */}
                  <div className="flex items-center gap-3">
                    <span className="font-display text-[0.8rem] font-bold tabular-nums tracking-[0.18em] text-ink-300 transition-colors duration-300 group-hover:text-accent-600">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="relative h-px flex-1 overflow-hidden bg-ink-100">
                      <span className="absolute inset-y-0 left-0 w-0 bg-accent-500 transition-[width] duration-500 ease-smooth group-hover:w-full" />
                    </span>
                  </div>

                  {/* Microvisual */}
                  <div className="diff-card__media relative mt-6 h-[168px] overflow-hidden rounded-xl">
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <Visual />
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <h3 className="mt-6 font-display text-[1.05rem] font-bold leading-snug text-ink-900 transition-transform duration-400 ease-smooth group-hover:translate-x-1">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-500">
                    {item.description}
                  </p>
                </article>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
