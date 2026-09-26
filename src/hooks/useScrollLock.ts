import { useEffect } from 'react'

/**
 * Trava o scroll da página por trás de um overlay (preview).
 * Restaura a posição exata ao destravar — o visitante volta para o mesmo
 * ponto do portfólio, sem ser jogado para o topo.
 */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return

    const { body } = document
    const previous = body.style.top
    const scrollY = window.scrollY

    body.dataset.scrollLocked = 'true'
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'

    return () => {
      body.dataset.scrollLocked = 'false'
      body.style.position = ''
      body.style.top = previous
      body.style.left = ''
      body.style.right = ''
      body.style.width = ''
      window.scrollTo(0, scrollY)
    }
  }, [locked])
}
