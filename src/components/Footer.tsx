import { MessageCircle } from 'lucide-react'
import { footer } from '../data/content'
import { nav, siteConfig } from '../data/siteConfig'
import { track } from '../lib/analytics'
import { openWhatsApp, whatsappUrl } from '../lib/whatsapp'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ink-100 bg-white">
      <div className="shell-wide py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Marca */}
          <div className="max-w-sm">
            <img
              src={siteConfig.brand.logo}
              alt={siteConfig.brand.logoAlt}
              className="h-16 w-auto"
              loading="lazy"
              decoding="async"
            />
            <p className="mt-5 text-[0.9rem] leading-relaxed text-ink-500">
              {footer.description}
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="font-display text-[0.82rem] font-bold uppercase tracking-[0.16em] text-ink-900">
              {footer.navTitle}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[0.9rem] text-ink-500 transition-colors hover:text-accent-600"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Serviços */}
          <div>
            <h3 className="font-display text-[0.82rem] font-bold uppercase tracking-[0.16em] text-ink-900">
              {footer.servicesTitle}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footer.services.map((service) => (
                <li key={service} className="text-[0.9rem] text-ink-500">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-display text-[0.82rem] font-bold uppercase tracking-[0.16em] text-ink-900">
              {footer.contactTitle}
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    track('whatsapp_click', { source: 'footer' })
                    openWhatsApp(whatsappUrl(siteConfig.whatsapp.defaultMessage))
                  }}
                  className="inline-flex items-center gap-2 text-[0.9rem] font-medium text-ink-900 transition-colors hover:text-accent-600"
                >
                  <MessageCircle className="h-4 w-4 text-accent-500" />
                  Falar pelo WhatsApp
                </button>
              </li>
              {siteConfig.contact.email && (
                <li>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-[0.9rem] text-ink-500 transition-colors hover:text-accent-600"
                  >
                    {siteConfig.contact.email}
                  </a>
                </li>
              )}
              {siteConfig.contact.city && (
                <li className="text-[0.9rem] text-ink-500">{siteConfig.contact.city}</li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ink-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8rem] text-ink-400">
            © {year} {siteConfig.brand.name}. {footer.rights}
          </p>
          <p className="text-[0.8rem] text-ink-400">{footer.madeNote}</p>
        </div>
      </div>
    </footer>
  )
}
