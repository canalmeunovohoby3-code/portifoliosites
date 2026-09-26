/**
 * ============================================================
 *  PREVIEWS DOS PROJETOS
 * ============================================================
 *  Gera `public/projects/<id>/` a partir dos sites reais dos clientes,
 *  prontos para serem carregados dentro do modal do portfólio.
 *
 *  - Projetos Vite/React: build com `--base=./` (caminhos relativos),
 *    para funcionar dentro de uma subpasta do portfólio.
 *  - Projeto estático (MHR): cópia direta dos arquivos.
 *  - Pós-processamento: normaliza caminhos absolutos de mídia
 *    (`/midia/...`, `/images/...`, `/assets/...`) para relativos.
 *
 *  Uso:  npm run previews:build
 *  Os originais dos clientes NÃO são alterados.
 */
import { spawnSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORTFOLIO_ROOT = path.resolve(__dirname, '..')
const OUT_ROOT = path.join(PORTFOLIO_ROOT, 'public', 'projects')
const CLIENTES_ROOT = path.resolve(PORTFOLIO_ROOT, '..')

/** id do portfólio -> origem do site do cliente. */
const projects = [
  { id: 'mhr', mode: 'static', dir: 'CLIENTE 3737 MHR industrial' },
  { id: 'famac', mode: 'vite', dir: 'CLIENTE 3716 FAMAC' },
  { id: 'rollnorte', mode: 'vite', dir: 'CLIENTE 1208 ROLLNORTE', config: path.join(__dirname, 'rollnorte', 'vite.config.mjs') },
  { id: 'mod-moveis', mode: 'vite', dir: 'CLIENTE 3726 MOD MOVEIS' },
  { id: 'saraiva', mode: 'vite', dir: 'CLIENTE 3651 SARAIVA' },
  { id: 'eliarte', mode: 'vite', dir: 'CLIENTE 3736 ELIARTE' },
  { id: 'fibra-net', mode: 'vite', dir: 'CLIENTE 1873/FIBRA NET' },
  {
    // Página de vendas do Orvix Offline (projeto baixado do GitHub).
    // Usa um config de build próprio, que gera SOMENTE a landing em .portfolio-preview.
    id: 'orvix',
    mode: 'vite',
    dir: 'C:/Users/TIAGO/Downloads/orvixsistemasoff-cab65259-main/orvixsistemasoff-cab65259-main',
    config: 'vite.landing.config.ts',
  },
]

/** Permite rodar apenas alguns ids: `node scripts/... orvix`. */
const only = process.argv.slice(2).filter((arg) => !arg.startsWith('-'))
const selected = only.length ? projects.filter((project) => only.includes(project.id)) : projects

const TEXT_EXTENSIONS = new Set([
  '.html', '.htm', '.css', '.js', '.mjs', '.cjs', '.json',
  '.svg', '.webmanifest', '.xml', '.txt', '.map',
])

/** Normaliza caminhos absolutos locais para relativos. */
function rewriteMediaPaths(text) {
  // /assets/ , /midia/ , /images/ , /gallery/ , /img/  ->  ./...
  // O lookbehind evita tocar em caminhos já relativos (./ , ../), em URLs
  // externas (https://...) e em //.
  let out = text.replace(
    /(?<![:/\w.-])\/(assets|midia|images|gallery|img)\//g,
    './$1/',
  )

  // Arquivos servidos na raiz do projeto (ex.: /logo.svg, /VIDEO.mp4, /corte.svg),
  // sempre como atributo/string. Não afeta URLs externas nem caminhos relativos.
  out = out.replace(
    /(?<![:/\w.-])\/([A-Za-z0-9_][A-Za-z0-9_\- ]*\.(?:mp4|webm|ogg|mp3|png|jpe?g|webp|gif|avif|svg|ico|woff2?|ttf|otf|css|js|mjs|json|xml|txt|webmanifest|pdf|vcf))/g,
    './$1',
  )

  return out
}

function shouldProcess(file) {
  return TEXT_EXTENSIONS.has(path.extname(file).toLowerCase())
}

/**
 * Ajustes exclusivos do preview do Orvix.
 *
 * A landing original referencia imagens pela CDN do Lovable
 * (`/__l5e/assets-v1/...`), que não existe no build. Substituímos por
 * arquivos locais — SOMENTE no preview do portfólio. O projeto do cliente
 * não é alterado; a estrutura e o conteúdo das seções permanecem iguais.
 */
const ORVIX_ASSETS_DIR = path.join(__dirname, 'orvix-assets')
const ORVIX_REPLACEMENTS = [
  {
    from: '/__l5e/assets-v1/7f1c48b8-ba80-49eb-bb07-ced5d4478e03/orvix-pdv-showcase.png',
    to: './assets/orvix-pdv-showcase.jpg',
    file: 'orvix-pdv-showcase.jpg',
  },
  {
    from: '/__l5e/assets-v1/9666da9f-bfa5-42ad-bb10-b322f6299c62/logo-orvix-white.png',
    to: './assets/logo-orvix-white.png',
    file: 'logo-orvix-white.png',
  },
]

function replaceInTree(dir, replacements) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      replaceInTree(full, replacements)
      continue
    }
    if (!TEXT_EXTENSIONS.has(path.extname(full).toLowerCase())) continue
    let content = readFileSync(full, 'utf8')
    let changed = false
    for (const { from, to } of replacements) {
      if (content.includes(from)) {
        content = content.split(from).join(to)
        changed = true
      }
    }
    if (changed) writeFileSync(full, content, 'utf8')
  }
}
function patchOrvixPreview(destDir) {
  const assetsDir = path.join(destDir, 'assets')
  mkdirSync(assetsDir, { recursive: true })

  for (const { file } of ORVIX_REPLACEMENTS) {
    const src = path.join(ORVIX_ASSETS_DIR, file)
    if (existsSync(src)) copyFileSync(src, path.join(assetsDir, file))
  }

  replaceInTree(destDir, ORVIX_REPLACEMENTS)
}

/**
 * Ajustes exclusivos do preview da MHR.
 *
 * Completa as áreas que ainda usavam placeholders (SVG ilustrativos) com fotos
 * reais — SOMENTE na cópia usada pelo portfólio. O projeto do cliente não é
 * alterado, e a estrutura, os textos e o layout do site permanecem iguais.
 */
const MHR_ASSETS_DIR = path.join(__dirname, 'mhr-assets')

const MHR_FOLDERS = [
  { match: /^servico-/, folder: 'assets/img/services' },
  { match: /^segmento-/, folder: 'assets/img/segments' },
  { match: /^(empresa|engenharia|qualidade|seguranca|cta-bg)/, folder: 'assets/img/media' },
]

const MHR_PATH_SWAPS = [
  ['assets/img/services/servico-04.svg', 'assets/img/services/servico-04.jpg'],
  ['assets/img/services/servico-07.svg', 'assets/img/services/servico-07.jpg'],
  ['assets/img/services/servico-08.svg', 'assets/img/services/servico-08.jpg'],
  ['assets/img/services/servico-09.svg', 'assets/img/services/servico-09.jpg'],
  ['assets/img/segments/segmento-01.svg', 'assets/img/segments/segmento-01.jpg'],
  ['assets/img/segments/segmento-02.svg', 'assets/img/segments/segmento-02.jpg'],
  ['assets/img/segments/segmento-03.svg', 'assets/img/segments/segmento-03.jpg'],
  ['assets/img/segments/segmento-04.svg', 'assets/img/segments/segmento-04.jpg'],
  ['assets/img/media/empresa-01.svg', 'assets/img/media/empresa-01.jpg'],
  ['assets/img/media/empresa-02.svg', 'assets/img/media/empresa-02.jpg'],
  ['assets/img/media/engenharia-01.svg', 'assets/img/media/engenharia-01.jpg'],
  ['assets/img/media/qualidade-01.svg', 'assets/img/media/qualidade-01.jpg'],
  ['assets/img/media/seguranca-01.svg', 'assets/img/media/seguranca-01.jpg'],
  ['assets/img/media/cta-bg.svg', 'assets/img/media/cta-bg.jpg'],
].map(([from, to]) => ({ from, to }))

const MHR_ALTS = [
  { rel: 'assets/img/services/servico-04.jpg', alt: 'Equipe executando manutenção industrial em equipamento de grande porte.' },
  { rel: 'assets/img/services/servico-07.jpg', alt: 'Correia transportadora de material a granel em operação.' },
  { rel: 'assets/img/services/servico-08.jpg', alt: 'Estrutura de andaime montada para trabalho em altura.' },
  { rel: 'assets/img/services/servico-09.jpg', alt: 'Desenhos técnicos e cronograma sobre mesa de planejamento.' },
  { rel: 'assets/img/segments/segmento-01.jpg', alt: 'Frente de lavra em mina a céu aberto com caminhão fora de estrada.' },
  { rel: 'assets/img/segments/segmento-02.jpg', alt: 'Silos de armazenagem de grãos em unidade de recebimento.' },
  { rel: 'assets/img/segments/segmento-03.jpg', alt: 'Trabalhador na colheita de café, entre ramos carregados de grãos.' },
  { rel: 'assets/img/segments/segmento-04.jpg', alt: 'Interior de galpão industrial com estrutura metálica e equipamentos.' },
]

function patchMhrPreview(destDir) {
  // 1) copia as fotos para as pastas correspondentes do preview
  for (const file of readdirSync(MHR_ASSETS_DIR)) {
    if (!/\.jpe?g$/i.test(file)) continue
    const folder = MHR_FOLDERS.find((entry) => entry.match.test(file))?.folder
    if (!folder) continue
    const dest = path.join(destDir, folder)
    mkdirSync(dest, { recursive: true })
    copyFileSync(path.join(MHR_ASSETS_DIR, file), path.join(dest, file))
  }

  // 2) troca as referências placeholder (.svg) pelas fotos (.jpg)
  replaceInTree(destDir, MHR_PATH_SWAPS)

  // 3) adiciona o imageAlt onde o dado ainda não tem (metadado de acessibilidade)
  for (const dataFile of ['assets/js/data/services.js', 'assets/js/data/segments.js']) {
    const full = path.join(destDir, dataFile)
    if (!existsSync(full)) continue
    let content = readFileSync(full, 'utf8')
    for (const { rel, alt } of MHR_ALTS) {
      const from = `image: '${rel}',`
      if (content.includes(from) && !content.includes(alt)) {
        content = content.replace(from, `${from}\n      imageAlt: '${alt}',`)
      }
    }
    writeFileSync(full, content, 'utf8')
  }
}

function copyTree(src, dest) {
  mkdirSync(dest, { recursive: true })
  for (const entry of readdirSync(src)) {
    if (entry === '.git' || entry === '.kilo' || entry === 'node_modules') continue
    if (entry === '.portfolio-preview') continue
    const srcPath = path.join(src, entry)
    const destPath = path.join(dest, entry)
    const stat = statSync(srcPath)

    if (stat.isDirectory()) {
      copyTree(srcPath, destPath)
      continue
    }

    if (shouldProcess(destPath)) {
      const content = readFileSync(srcPath, 'utf8')
      writeFileSync(destPath, rewriteMediaPaths(content), 'utf8')
    } else {
      writeFileSync(destPath, readFileSync(srcPath))
    }
  }
}

/** Copia um build estático, ignorando arquivos de projeto. */
function copyStaticProject(srcDir, destDir) {
  mkdirSync(destDir, { recursive: true })
  for (const entry of readdirSync(srcDir)) {
    if (['.git', '.kilo', 'node_modules', 'tools', 'package.json', 'README.md'].includes(entry)) {
      continue
    }
    const srcPath = path.join(srcDir, entry)
    const destPath = path.join(destDir, entry)
    const stat = statSync(srcPath)
    if (stat.isDirectory()) {
      copyTree(srcPath, destPath)
    } else if (shouldProcess(destPath)) {
      writeFileSync(destPath, rewriteMediaPaths(readFileSync(srcPath, 'utf8')), 'utf8')
    } else {
      writeFileSync(destPath, readFileSync(srcPath))
    }
  }
}

function buildViteProject(clientDir, tempOutDir, config) {
  const command = config
    ? `npx vite build --config "${config}"`
    : `npx vite build --base=./ --outDir "${tempOutDir}" --emptyOutDir`

  const result = spawnSync(command, { cwd: clientDir, stdio: 'inherit', shell: true })
  return result.status === 0
}

function main() {
  mkdirSync(OUT_ROOT, { recursive: true })

  const summary = []

  for (const project of selected) {
    const clientDir = path.isAbsolute(project.dir)
      ? project.dir
      : path.join(CLIENTES_ROOT, project.dir)
    const destDir = path.join(OUT_ROOT, project.id)

    if (!existsSync(clientDir)) {
      console.warn(`[skip] origem não encontrada: ${clientDir}`)
      summary.push({ id: project.id, ok: false, reason: 'origem ausente' })
      continue
    }

    console.log(`\n=== ${project.id} (${project.mode}) ===`)
    rmSync(destDir, { recursive: true, force: true })

    try {
      if (project.mode === 'static') {
        copyStaticProject(clientDir, destDir)
        if (project.id === 'mhr') {
          patchMhrPreview(destDir)
          console.log('[ok] imagens da MHR completadas (preview)')
        }
        summary.push({ id: project.id, ok: true })
        console.log(`[ok] copiado (estático) -> ${destDir}`)
      } else {
        const tempOutDir = project.outDir ?? '.portfolio-preview'
        const ok = buildViteProject(clientDir, tempOutDir, project.config)
        const builtDir = path.join(clientDir, tempOutDir)

        if (!ok || !existsSync(builtDir)) {
          console.warn(`[falhou] build de ${project.id}`)
          summary.push({ id: project.id, ok: false, reason: 'build falhou' })
          continue
        }

        copyTree(builtDir, destDir)
        rmSync(builtDir, { recursive: true, force: true })

        if (project.id === 'orvix') {
          patchOrvixPreview(destDir)
          console.log('[ok] imagens da CDN substituídas por assets locais (preview)')
        }

        summary.push({ id: project.id, ok: true })
        console.log(`[ok] buildado -> ${destDir}`)
      }
    } catch (error) {
      console.error(`[erro] ${project.id}:`, error)
      summary.push({ id: project.id, ok: false, reason: String(error) })
    }
  }

  console.log('\n===== Resumo =====')
  for (const item of summary) {
    console.log(`${item.ok ? 'OK  ' : 'FALHA'}  ${item.id}${item.reason ? ` — ${item.reason}` : ''}`)
  }

  const failed = summary.filter((item) => !item.ok)
  if (failed.length > 0) {
    console.log(`\n${failed.length} projeto(s) não puderam ser gerados.`)
  }
}

main()
