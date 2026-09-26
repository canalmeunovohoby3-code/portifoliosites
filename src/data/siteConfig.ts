/**
 * ============================================================
 *  CONFIGURAÇÃO DO SITE
 * ============================================================
 *  Este é o único arquivo que você precisa editar para publicar.
 *
 *  1. Troque `brand.name` e `brand.mark` pelo seu nome/marca.
 *  2. Coloque o SEU número de WhatsApp em `whatsapp.number`
 *     (somente dígitos, com DDI + DDD). Ex.: 5511999999999
 *  3. Ajuste `domain` e os dados de contato quando definir o domínio.
 * ============================================================
 */

export const siteConfig = {
  brand: {
    /** Nome exibido em textos e no rodapé. */
    name: 'Tiago Design',
    /** Monograma curto (usado como reserva caso a logo não carregue). */
    mark: 'TD',
    /** Assinatura curta usada em textos de apoio. */
    tagline: 'Criação de sites profissionais',
    /** Logomarca (arquivo em /public). */
    logo: 'logo.svg',
    logoAlt: 'Tiago Design — Designer Gráfico',
  },

  whatsapp: {
    /**
     * Número do WhatsApp — SOMENTE DÍGITOS, com DDI e DDD.
     * 55 (Brasil) + 11 (DDD) + 956508302
     */
    number: '5511956508302',
    /** Mensagem usada nos CTAs genéricos (fora de um projeto). */
    defaultMessage:
      'Olá! Vim pelo seu portfólio e gostaria de criar um site para a minha empresa.',
    /** Mensagem usada no CTA do hero / CTA final. */
    projectMessage:
      'Olá! Vi o seu portfólio e gostaria de conversar sobre a criação de um site para a minha empresa.',
  },

  contact: {
    /** Exibido no footer. Substitua pelos seus dados reais. */
    email: '',
    city: '',
  },

  domain: 'https://SEU-DOMINIO.com.br/',
} as const

export const nav = [
  { label: 'Início', href: '#inicio' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
] as const
