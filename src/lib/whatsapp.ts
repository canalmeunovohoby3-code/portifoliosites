import { siteConfig } from '../data/siteConfig'
import type { Project } from '../types'

/** Monta uma URL de WhatsApp com a mensagem já codificada. */
export function whatsappUrl(message: string = siteConfig.whatsapp.defaultMessage): string {
  const number = siteConfig.whatsapp.number.replace(/\D/g, '')
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

/** Mensagem contextualizada a partir de um projeto do portfólio. */
export function projectWhatsappMessage(project: Project): string {
  return `Olá! Vi o projeto ${project.name} no seu portfólio e gostaria de criar um site para minha empresa.`
}

/** URL de WhatsApp contextualizada para um projeto específico. */
export function projectWhatsappUrl(project: Project): string {
  return whatsappUrl(projectWhatsappMessage(project))
}

/** Abre o WhatsApp em nova aba sem prejudicar a posição atual do visitante. */
export function openWhatsApp(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer')
}
