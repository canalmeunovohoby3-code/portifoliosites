import { useEffect } from 'react'

/**
 * Reveal suave no scroll.
 * Observa todos os elementos com a classe `.reveal` e aplica `.is-visible`
 * quando entram na viewport. Uma única instância cuida da página inteira.
 *
 * Observação: as animações rodam sempre (sem depender de prefers-reduced-motion),
 * conforme decisão do projeto de manter o movimento visível em qualquer máquina.
 */
export function useReveal(): void {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))

    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  })
}
