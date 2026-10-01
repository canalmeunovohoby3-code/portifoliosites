import type { Project } from '../types'

/**
 * ============================================================
 *  PROJETOS DO PORTFÓLIO
 * ============================================================
 *  Para adicionar um trabalho novo:
 *
 *  1. Rode `npm run previews:build` (gera o site embutido em
 *     `public/projects/<id>/`) e `npm run covers:capture`
 *     (gera a capa em `public/covers/<id>.jpg`), ou coloque as
 *     imagens manualmente.
 *  2. Acrescente um objeto abaixo com um `id` novo.
 *
 *  Pronto: o card, o filtro e o preview aparecem automaticamente.
 * ============================================================
 */
export const projects: Project[] = [
  {
    id: 'mhr',
    name: 'MHR Manutenção Industrial',
    category: 'Sites Institucionais',
    description:
      'Presença digital para uma empresa de engenharia e manutenção industrial, com serviços, segmentos e atuação técnica organizados com clareza.',
    segment: 'Engenharia e manutenção industrial',
    location: 'Varginha — MG',
    previewUrl: 'projects/mhr/index.html',
    iframeEnabled: true,
    coverImage: 'covers/mhr.jpg',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    highlights: ['Serviços e segmentos', 'Engenharia e planejamento', 'Contato direto'],
  },
  {
    id: 'famac',
    name: 'FAMAC Caldeiraria',
    category: 'Sites Institucionais',
    description:
      'Site para uma caldeiraria que fabrica, recupera e mantém componentes industriais, com foco em capacidade técnica e pedido de orçamento.',
    segment: 'Caldeiraria, usinagem e soldagem',
    location: 'Araxá — MG',
    previewUrl: 'projects/famac/index.html',
    iframeEnabled: true,
    coverImage: 'covers/famac.jpg',
    technologies: ['React', 'TypeScript'],
    highlights: ['Caldeiraria e fabricação', 'Usinagem e ajuste', 'Orçamento pelo WhatsApp'],
  },
  {
    id: 'rollnorte',
    name: 'Rollnorte Rolamentos',
    category: 'Comércio/Serviços',
    description:
      'Vitrine de produtos industriais para uma revenda de rolamentos, com catálogo, galeria e contato direto por WhatsApp.',
    segment: 'Rolamentos e suprimentos industriais',
    location: 'Maringá — PR',
    previewUrl: 'projects/rollnorte/index.html',
    iframeEnabled: true,
    coverImage: 'covers/rollnorte.jpg',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    highlights: ['Catálogo de produtos', 'Galeria da loja', 'Contato e localização'],
  },
  {
    id: 'mod-moveis',
    name: 'M O D Móveis Planejados',
    category: 'Comércio/Serviços',
    description:
      'Site para marcenaria de móveis planejados: projetos sob medida, ambientes e captação de orçamento pelo WhatsApp.',
    segment: 'Móveis planejados e decoração',
    location: 'Rio de Janeiro — RJ',
    url: 'modmoveisplanejados.com.br',
    previewUrl: 'projects/mod-moveis/index.html',
    iframeEnabled: true,
    coverImage: 'covers/mod-moveis.jpg',
    technologies: ['React', 'TypeScript'],
    highlights: ['Projetos sob medida', 'Ambientes e acabamentos', 'Orçamento pelo WhatsApp'],
  },
  {
    id: 'saraiva',
    name: 'Barbearia Saraiva',
    category: 'Comércio/Serviços',
    description:
      'Site para barbearia com serviços, galeria, agendamento e contato rápido, valorizando a experiência da marca.',
    segment: 'Barbearia e cuidados masculinos',
    location: 'Prainha — PA',
    url: 'barbeariasaraiva.com.br',
    previewUrl: 'projects/saraiva/index.html',
    iframeEnabled: true,
    coverImage: 'covers/saraiva.jpg',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    highlights: ['Serviços e preços', 'Agendamento', 'Galeria de trabalhos'],
  },
  {
    id: 'eliarte',
    name: 'Eliarte & Papel',
    category: 'Portfólios',
    description:
      'Vitrine digital para uma marca de personalizados, reunindo trabalhos, vídeos e encomendas em uma navegação visual.',
    segment: 'Papelaria criativa e personalizados',
    location: 'Salvador — BA',
    url: 'eliarteepapel.com.br',
    previewUrl: 'projects/eliarte/index.html',
    iframeEnabled: true,
    coverImage: 'covers/eliarte.jpg',
    technologies: ['React', 'TypeScript'],
    highlights: ['Galeria de trabalhos', 'Vídeos das peças', 'Encomenda pelo WhatsApp'],
  },
  {
    id: 'gracindo',
    name: 'Gracindo Tur',
    category: 'Landing Pages',
    description:
      'Landing page de transporte executivo em Cuiabá: apresentação da frota, serviços e solicitação de orçamento pelo WhatsApp.',
    segment: 'Transporte executivo e locação de veículos',
    location: 'Cuiabá — MT',
    url: 'gracindotur.com.br',
    previewUrl: 'projects/gracindo/index.html',
    iframeEnabled: true,
    coverImage: 'covers/gracindo.jpg',
    technologies: ['React', 'TypeScript'],
    highlights: ['Frota com galeria de fotos', 'Serviços e diferenciais', 'Orçamento pelo WhatsApp'],
  },
  {
    id: 'alckalar',
    name: 'Alcka-Lar',
    category: 'Sites Institucionais',
    description:
      'Site para construtora de casas e apartamentos em Ibitinga, com apresentação de obras, etapas da construção e contato.',
    segment: 'Construção civil — casas e apartamentos',
    location: 'Ibitinga — SP',
    previewUrl: 'projects/alckalar/index.html',
    iframeEnabled: true,
    coverImage: 'covers/alckalar.jpg',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    highlights: ['Obras e referências', 'Etapas da construção', 'Contato direto'],
  },
  {
    id: 'fibra-net',
    name: 'Fibra Net',
    category: 'Outros',
    description:
      'Estrutura para provedor de internet, apresentando planos, cobertura e diferenciais com foco em conversão.',
    segment: 'Internet fibra óptica',
    previewUrl: 'projects/fibra-net/index.html',
    iframeEnabled: true,
    coverImage: 'covers/fibra-net.jpg',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    highlights: ['Planos e velocidades', 'Diferenciais da rede', 'Contato e cobertura'],
  },
  {
    id: 'orvix',
    name: 'Orvix Offline 8.0',
    category: 'Landing Pages',
    description:
      'Página de vendas para um sistema ERP + PDV para Windows, com apresentação de recursos, planos e fluxo de compra.',
    segment: 'Software ERP e PDV',
    url: 'orvixsistemas.com.br',
    previewUrl: 'projects/orvix/landing.html',
    iframeEnabled: true,
    coverImage: 'covers/orvix.jpg',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    highlights: ['Página de vendas', 'Planos e checkout', 'Design dark premium'],
  },
]
