import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { nav, siteConfig } from '../data/siteConfig'
import { track } from '../lib/analytics'
import { cn } from '../lib/cn'
import { openWhatsApp, whatsappUrl } from '../lib/whatsapp'
import { CTAButton } from './ui/CTAButton'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Trava o scroll do fundo enquanto o menu mobile está aberto.
  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [menuOpen])

  // Fecha com ESC.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const handleWhatsApp = (source: string) => {
    track('whatsapp_click', { source })
    openWhatsApp(whatsappUrl(siteConfig.whatsapp.projectMessage))
    setMenuOpen(false)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth',
        scrolled
          ? 'border-b border-ink-100/80 bg-paper/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="shell-wide">
        <div
          className={cn(
            'flex items-center justify-between transition-all duration-500 ease-smooth',
            scrolled ? 'h-16' : 'h-20',
          )}
        >
          {/* Marca */}
          <a
            href="#inicio"
            className="group flex items-center"
            aria-label={`${siteConfig.brand.name} — início`}
          >
            <img
              src={siteConfig.brand.logo}
              alt={siteConfig.brand.logoAlt}
              className={cn(
                'w-auto transition-all duration-500 ease-smooth hover:drop-shadow-[0_8px_20px_rgba(224,74,103,0.35)]',
                scrolled ? 'h-12' : 'h-14',
              )}
            />
          </a>

          {/* Navegação desktop */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group/nav relative rounded-full px-3.5 py-2 text-[0.88rem] font-medium text-ink-500 transition-colors duration-200 hover:text-ink-900"
              >
                {item.label}
                <span
                  className="pointer-events-none absolute inset-x-3.5 bottom-1 h-px origin-left scale-x-0 rounded-full bg-accent-500 transition-transform duration-300 ease-smooth group-hover/nav:scale-x-100"
                  aria-hidden="true"
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <CTAButton
              variant="dark"
              size="sm"
              icon={ArrowUpRight}
              className="hidden sm:inline-flex"
              onClick={() => handleWhatsApp('header')}
            >
              Quero meu site
            </CTAButton>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ink-200 bg-white/70 text-ink-900 transition-colors hover:border-ink-900 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div className="lg:hidden" aria-hidden={!menuOpen}>
        <div
          onClick={() => setMenuOpen(false)}
          className={cn(
            'fixed inset-0 z-40 bg-ink-900/45 backdrop-blur-[2px] transition-opacity duration-300',
            menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
        />
        <div
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={cn(
            'fixed inset-y-0 right-0 z-50 flex w-[86%] max-w-sm flex-col bg-paper shadow-frame transition-transform duration-400 ease-smooth',
            menuOpen ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <div className="flex h-20 items-center justify-between border-b border-ink-100 px-6">
            <span className="font-display text-sm font-bold uppercase tracking-[0.18em] text-ink-400">
              Menu
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ink-200 text-ink-900 transition-colors hover:border-ink-900"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-1 px-6 py-6" aria-label="Navegação mobile">
            {nav.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{ transitionDelay: menuOpen ? `${index * 40}ms` : '0ms' }}
                className={cn(
                  'flex items-center justify-between rounded-2xl px-4 py-4 font-display text-lg font-semibold text-ink-900 transition-all duration-300 hover:bg-ink-50',
                  menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-3 opacity-0',
                )}
              >
                {item.label}
                <ArrowUpRight className="h-4 w-4 text-accent-500" />
              </a>
            ))}
          </nav>

          <div className="border-t border-ink-100 px-6 py-6">
            <CTAButton
              variant="primary"
              size="lg"
              icon={ArrowUpRight}
              className="w-full"
              onClick={() => handleWhatsApp('menu-mobile')}
            >
              Quero meu site
            </CTAButton>
            <p className="mt-4 text-center text-xs text-ink-400">
              Resposta pelo WhatsApp, sem compromisso.
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
