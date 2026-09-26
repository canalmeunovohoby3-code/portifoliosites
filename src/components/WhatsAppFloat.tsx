import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'
import { track } from '../lib/analytics'
import { cn } from '../lib/cn'
import { openWhatsApp, whatsappUrl } from '../lib/whatsapp'

interface WhatsAppFloatProps {
  /** Esconde quando o preview está aberto (evita sobreposição). */
  hidden?: boolean
}

/** Atalho permanente para o WhatsApp, visível durante a navegação. */
export function WhatsAppFloat({ hidden = false }: WhatsAppFloatProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={() => {
        track('whatsapp_click', { source: 'float' })
        openWhatsApp(whatsappUrl(siteConfig.whatsapp.defaultMessage))
      }}
      aria-label="Falar pelo WhatsApp"
      className={cn(
        'group fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 rounded-full bg-accent-500 py-3.5 pl-3.5 pr-4 text-white shadow-accent transition-all duration-500 ease-smooth hover:bg-accent-600 active:scale-[0.97] sm:bottom-6 sm:right-6',
        visible && !hidden ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
        <MessageCircle className="h-4 w-4" />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[0.88rem] font-semibold transition-all duration-500 ease-smooth group-hover:max-w-[11rem] sm:max-w-[11rem]">
        Falar no WhatsApp
      </span>
    </button>
  )
}
