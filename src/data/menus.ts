import type { Project } from '../types'

/**
 * ============================================================
 *  CARDÁPIOS DIGITAIS
 * ============================================================
 *  Vitrine específica de cardápios/menus digitais para o food service.
 *
 *  - Projetos reais usam preview em `demonstração visual`
 *    (`iframeEnabled: false` + `longPreviewImage`), pois são aplicações que
 *    dependem de servidor e não podem ser embutidas como página estática.
 *  - Os cardápios-modelo são páginas estáticas próprias e abrem no preview
 *    interativo (`iframeEnabled: true`).
 * ============================================================
 */
export const menus: Project[] = [
  {
    id: 'felipe-pizzaria',
    name: "Felipe's Pizzaria",
    category: 'Cardápios',
    description:
      'Cardápio digital para pizzaria com delivery: categorias, tamanhos, bordas e pedido montado direto pelo WhatsApp.',
    segment: 'Pizzaria e delivery',
    location: 'Toledo — PR',
    previewUrl: '',
    iframeEnabled: false,
    coverImage: 'covers/cliente629.jpg',
    longPreviewImage: 'covers/cliente629-full.jpg',
    technologies: ['Next.js', 'React'],
    highlights: ['Cardápio por categorias', 'Monte seu pedido', 'Delivery e taxas'],
  },
  {
    id: 'saborear',
    name: 'Pastelaria Saborear',
    category: 'Cardápios',
    description:
      'Cardápio digital para pastelaria e açaí, com categorias, itens com foto e carrinho que envia o pedido pelo WhatsApp.',
    segment: 'Pastelaria, açaí e porções',
    location: 'Seabra — BA',
    previewUrl: '',
    iframeEnabled: false,
    coverImage: 'covers/saborear.jpg',
    longPreviewImage: 'covers/saborear-full.jpg',
    technologies: ['React', 'TanStack'],
    highlights: ['Categorias e fotos', 'Carrinho de pedido', 'Pedido pelo WhatsApp'],
  },
  {
    id: 'sorveteria',
    name: 'Gelateria Dolce Neve',
    category: 'Cardápios',
    description:
      'Cardápio digital para sorveteria, com sorvetes, milkshakes e açaí, carrinho e envio do pedido pelo WhatsApp.',
    segment: 'Sorveteria, milkshakes e açaí',
    previewUrl: 'menus/sorveteria/index.html',
    iframeEnabled: true,
    coverImage: 'covers/sorveteria.jpg',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    highlights: ['Sorvetes e açaí', 'Carrinho com total', 'Envio pelo WhatsApp'],
  },
  {
    id: 'restaurante',
    name: 'Bistrô Aurora',
    category: 'Cardápios',
    description:
      'Cardápio digital para restaurante, com entradas, pratos principais, massas e sobremesas, e pedido pelo WhatsApp.',
    segment: 'Restaurante e bistrô',
    previewUrl: 'menus/restaurante/index.html',
    iframeEnabled: true,
    coverImage: 'covers/restaurante.jpg',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    highlights: ['Carta por categorias', 'Carrinho com total', 'Envio pelo WhatsApp'],
  },
]
