export type ProjectCategory =
  | 'Sites Institucionais'
  | 'Landing Pages'
  | 'Portfólios'
  | 'Comércio/Serviços'
  | 'Cardápios'
  | 'Outros'

/**
 * Dados de um projeto do portfólio.
 *
 * Para publicar um novo trabalho, basta acrescentar um objeto em
 * `src/data/projects.ts`. A galeria, os filtros e o preview se atualizam
 * automaticamente — nenhum componente precisa ser alterado.
 */
export interface Project {
  /** Identificador único (também usado no caminho do preview embutido). */
  id: string
  /** Nome do projeto/empresa. */
  name: string
  /** Categoria exibida no filtro e no card. */
  category: ProjectCategory
  /** Descrição curta (1 frase). */
  description: string
  /** Segmento/área de atuação, em poucas palavras. */
  segment: string
  /** Cidade/UF quando conhecido. */
  location?: string
  /**
   * Domínio público do site, quando já existe.
   * Quando ausente, a barra do navegador exibe apenas o nome do projeto
   * (não inventamos domínio).
   */
  url?: string
  /** Caminho relativo do site buildado, exibido dentro do preview. */
  previewUrl: string
  /**
   * `true` = o site real é carregado em iframe dentro do preview.
   * `false` = usamos a demonstração visual (imagem longa/screenshot).
   */
  iframeEnabled: boolean
  /** Imagem de capa do card (16:10). */
  coverImage: string
  /** Imagem longa opcional para o modo de demonstração visual. */
  longPreviewImage?: string
  /** Tecnologias — mantidas em segundo plano, exibidas discretamente. */
  technologies: string[]
  /** Destaques do que foi construído (usado no rodapé do preview). */
  highlights: string[]
}
