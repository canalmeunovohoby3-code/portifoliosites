import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { trackTikTokLead } from './lib/whatsapp'
import './styles/index.css'

// Rede de segurança para links diretos de WhatsApp (wa.me / api.whatsapp.com):
// dispara o Lead do TikTok sem bloquear a navegação.
document.addEventListener(
  'click',
  (event) => {
    const target = event.target
    if (!(target instanceof Element)) return
    const anchor = target.closest('a[href]')
    if (!(anchor instanceof HTMLAnchorElement)) return
    if (anchor.href.includes('wa.me') || anchor.href.includes('api.whatsapp.com')) {
      trackTikTokLead()
    }
  },
  true,
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
