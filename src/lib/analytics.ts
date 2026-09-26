/**
 * Camada de eventos — preparada para receber GA4 / Meta Pixel depois.
 *
 * Hoje cada evento é registrado no console (modo dev) e disparado como
 * `CustomEvent` no window. Para integrar uma ferramenta de analytics,
 * basta preencher os hooks no final deste arquivo.
 */

export type AnalyticsEvent =
  | 'project_open'
  | 'preview_open'
  | 'preview_close'
  | 'preview_fullscreen'
  | 'preview_cta_click'
  | 'whatsapp_click'
  | 'filter_use'
  | 'cta_click'
  | 'section_view'

export interface AnalyticsPayload {
  projectId?: string
  projectName?: string
  category?: string
  source?: string
  [key: string]: string | number | boolean | undefined
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
  }
}

export function track(event: AnalyticsEvent, payload: AnalyticsPayload = {}): void {
  const detail = { event, ...payload, ts: Date.now() }

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', event, payload)
  }

  if (typeof window === 'undefined') return

  window.dispatchEvent(new CustomEvent('portfolio:event', { detail }))

  // GA4
  window.dataLayer?.push(detail)
  window.gtag?.('event', event, payload)

  // Meta Pixel
  window.fbq?.('trackCustom', event, payload)
}
