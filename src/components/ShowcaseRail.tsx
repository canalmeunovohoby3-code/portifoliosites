import { useEffect, useRef } from 'react'

/**
 * "Digital Showcase Rail" — faixa autoral de transição entre o Hero e os Projetos.
 *
 * - movimento contínuo e infinito feito 100% em CSS (loop sem salto);
 * - uma linha de percurso fina atravessa a faixa;
 * - cada item tem um glifo geométrico próprio (não é "bolinha" genérica);
 * - o item que passa pela região central "acende" em #E04A67 (detectado por
 *   IntersectionObserver, sem cálculo por frame);
 * - hover: o item cresce, o rosa aparece e os vizinhos reduzem o contraste.
 */

const ITEMS = [
  'Websites',
  'Landing pages',
  'Portfólios',
  'Design personalizado',
  'Mobile first',
  'Experiência digital',
  'Desenvolvimento',
  'Comércio e serviços',
]

function Glyph({ index }: { index: number }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: '0 0 18 18',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (index % 8) {
    case 0:
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="9" cy="9" r="6.4" />
        </svg>
      )
    case 1:
      return (
        <svg {...common} aria-hidden="true">
          <rect x="4" y="4" width="10" height="10" transform="rotate(45 9 9)" />
        </svg>
      )
    case 2:
      return (
        <svg {...common} aria-hidden="true">
          <path d="M9 2.5v13M2.5 9h13" />
        </svg>
      )
    case 3:
      return (
        <svg {...common} aria-hidden="true">
          <rect x="3.2" y="3.2" width="11.6" height="11.6" rx="1" />
        </svg>
      )
    case 4:
      return (
        <svg {...common} aria-hidden="true">
          <path d="M9 2.6 15.4 15.4H2.6z" />
        </svg>
      )
    case 5:
      return (
        <svg {...common} aria-hidden="true">
          <path d="M9 2.4l5.8 3.4v6.4L9 15.6 3.2 12.2V5.8z" />
        </svg>
      )
    case 6:
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="9" cy="9" r="6.6" />
          <circle cx="9" cy="9" r="3.1" />
        </svg>
      )
    default:
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="9" cy="9" r="6.6" />
          <path d="M9 5.4v7.2M5.4 9h7.2" />
        </svg>
      )
  }
}

export function ShowcaseRail() {
  const viewportRef = useRef<HTMLDivElement>(null)

  // Detecta o item que está na região central (banda estreita no meio da faixa).
  useEffect(() => {
    const root = viewportRef.current
    if (!root || !('IntersectionObserver' in window)) return

    const items = root.querySelectorAll<HTMLElement>('[data-rail-item]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-active', entry.isIntersecting)
        })
      },
      { root, rootMargin: '0% -45% 0% -45%', threshold: 0 },
    )

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  const set = (ariaHidden: boolean) => (
    <ul className="rail__set" aria-hidden={ariaHidden || undefined}>
      {ITEMS.map((label, index) => (
        <li key={`${label}-${index}`} data-rail-item className="rail-item">
          <span className="rail-item__glyph">
            <Glyph index={index} />
          </span>
          <span className="rail-item__label">{label}</span>
        </li>
      ))}
    </ul>
  )

  return (
    <section className="rail" aria-label="Áreas de atuação">
      <div ref={viewportRef} className="rail__viewport">
        <div className="rail__path" aria-hidden="true" />
        <div className="rail__glow" aria-hidden="true" />

        <div className="rail__track">
          {set(false)}
          {set(true)}
        </div>

        <span className="rail__scanner" aria-hidden="true" />
        <span className="rail__beam" aria-hidden="true" />
        <span className="rail__fade rail__fade--l" aria-hidden="true" />
        <span className="rail__fade rail__fade--r" aria-hidden="true" />
      </div>
    </section>
  )
}
