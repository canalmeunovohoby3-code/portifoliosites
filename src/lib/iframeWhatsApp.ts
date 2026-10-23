/**
 * Rastreamento de WhatsApp DENTRO dos previews (iframes) do portfólio.
 *
 * Os previews são servidos pela mesma origem do portfólio, então conseguimos
 * acessar `contentWindow`/`contentDocument` e instalar, a partir do portfólio,
 * um interceptador de:
 *  - `window.open` chamado pelo site do preview;
 *  - cliques em links `wa.me` / `api.whatsapp.com`.
 *
 * Quando qualquer um acontece, disparamos o evento `Lead` do TikTok no pixel
 * do portfólio. O site do cliente NÃO é modificado e a navegação continua
 * funcionando normalmente.
 */
const WHATSAPP_RE = /(?:wa\.me|api\.whatsapp\.com)/i
const MARKER = '__portfolioWaLeadTracking'

type WindowWithMarker = Window & { [MARKER]?: boolean }

export function installWhatsAppTracking(iframe: HTMLIFrameElement | null): void {
  if (!iframe) return

  let win: Window | null = null
  let doc: Document | null = null
  try {
    win = iframe.contentWindow
    doc = iframe.contentDocument
  } catch {
    // Origem diferente: não é possível acessar (previews são locais, então
    // isso não deve acontecer).
    return
  }
  if (!win || !doc) return

  const target = win as WindowWithMarker
  if (target[MARKER]) return
  target[MARKER] = true

  const fire = () => {
    // O pixel vive no portfólio (window pai).
    window.ttq?.track('Lead', { content_name: 'Contato WhatsApp' })
  }

  // 1) window.open usado pelo site dentro do preview
  const originalOpen = win.open.bind(win)
  win.open = function (url?: string | URL, targetName?: string, features?: string) {
    const value = typeof url === 'string' ? url : url ? String(url) : ''
    if (WHATSAPP_RE.test(value)) fire()
    return originalOpen(url, targetName, features)
  } as typeof win.open

  // 2) links wa.me / api.whatsapp.com
  doc.addEventListener(
    'click',
    (event) => {
      const element = event.target as Element | null
      if (!element || typeof element.closest !== 'function') return
      const anchor = element.closest('a[href]')
      if (!anchor) return
      const href = anchor.getAttribute('href') ?? ''
      if (WHATSAPP_RE.test(href)) fire()
    },
    true,
  )
}
