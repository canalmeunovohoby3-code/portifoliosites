/**
 * ============================================================
 *  CAPTURA DE CAPAS
 * ============================================================
 *  Sobe um servidor local da pasta `public/` e captura, com o Chrome
 *  instalado, uma imagem de capa (16:10) para cada projeto já buildado
 *  em `public/projects/<id>/`. Também gera `public/og-cover.png`.
 *
 *  O projeto Rollnorte usa roteamento por pathname, então é capturado a
 *  partir de um servidor com raiz própria (pathname "/").
 *
 *  Uso:  npm run covers:capture
 *  Requer: ter rodado `npm run previews:build` antes.
 */
import { createServer } from 'node:http'
import { existsSync, mkdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer-core'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORTFOLIO_ROOT = path.resolve(__dirname, '..')
const PUBLIC_DIR = path.join(PORTFOLIO_ROOT, 'public')
const COVERS_DIR = path.join(PUBLIC_DIR, 'covers')
const PORT = 4318
const PORT_ALT = 4319

const CHROME_CANDIDATES = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  path.join(process.env.LOCALAPPDATA ?? '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
]

const covers = [
  { id: 'mhr', path: 'projects/mhr/index.html' },
  { id: 'famac', path: 'projects/famac/index.html' },
  { id: 'rollnorte', path: 'projects/rollnorte/index.html' },
  { id: 'mod-moveis', path: 'projects/mod-moveis/index.html' },
  { id: 'saraiva', path: 'projects/saraiva/index.html' },
  { id: 'eliarte', path: 'projects/eliarte/index.html' },
  { id: 'fibra-net', path: 'projects/fibra-net/index.html' },
  { id: 'orvix', path: 'projects/orvix/landing.html' },
]

/** Permite capturar apenas alguns ids: `node scripts/... orvix`. */
const onlyCovers = process.argv.slice(2).filter((arg) => !arg.startsWith('-'))
const selectedCovers = onlyCovers.length
  ? covers.filter((cover) => onlyCovers.includes(cover.id))
  : covers

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
  '.map': 'application/json',
}

function startServer(rootDir, port) {
  const server = createServer((req, res) => {
    try {
      const url = new URL(req.url ?? '/', `http://127.0.0.1:${port}`)

      if (url.pathname === '/__og-cover') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.end(ogCoverHtml())
        return
      }

      let filePath = path.join(rootDir, decodeURIComponent(url.pathname))
      if (!filePath.startsWith(rootDir)) {
        res.writeHead(403).end('Forbidden')
        return
      }

      if (existsSync(filePath) && statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html')
      }

      if (!existsSync(filePath)) {
        res.writeHead(404).end('Not found')
        return
      }

      const ext = path.extname(filePath).toLowerCase()
      res.writeHead(200, { 'Content-Type': MIME[ext] ?? 'application/octet-stream' })
      res.end(readFileSync(filePath))
    } catch {
      res.writeHead(500).end('Server error')
    }
  })

  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve(server)))
}

function ogCoverHtml() {
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{width:1200px;height:630px;font-family:'Segoe UI',system-ui,sans-serif;background:#FBFBFA;color:#1A1A1A;display:flex;overflow:hidden;position:relative}
    .left{flex:1;padding:70px 60px;display:flex;flex-direction:column;justify-content:space-between}
    .brand{display:flex;align-items:center;gap:14px}
    .mark{width:52px;height:52px;border-radius:14px;background:#1A1A1A;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:20px}
    .name{font-weight:800;font-size:20px}
    .tag{font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#7C7C7C}
    h1{font-size:46px;line-height:1.08;letter-spacing:-1px;max-width:600px}
    h1 em{color:#E04A67;font-style:normal}
    .foot{font-size:15px;color:#565656}
    .chip{display:inline-block;border:1px solid #E7E7E7;background:#fff;border-radius:999px;padding:7px 14px;font-size:13px;margin-right:8px;color:#3A3A3A}
    .right{width:430px;background:#1A1A1A;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center}
    .glow{position:absolute;width:320px;height:320px;border-radius:50%;background:rgba(224,74,103,0.35);filter:blur(80px);top:-60px;right:-40px}
    .frame{position:relative;width:300px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 30px 60px rgba(0,0,0,.45)}
    .bar{display:flex;gap:6px;padding:10px;background:#F5F5F4;border-bottom:1px solid #E7E7E7}
    .dot{width:9px;height:9px;border-radius:50%;background:#CFCFCF}
    .body{height:190px;background:linear-gradient(135deg,#fff 0%,#F5F5F4 100%);padding:20px;display:flex;flex-direction:column;gap:10px}
    .l{height:12px;border-radius:6px;background:#E7E7E7}
    .l.a{width:70%;background:#1A1A1A}
    .l.b{width:90%}
    .l.c{width:50%}
    .btn{margin-top:auto;width:120px;height:30px;border-radius:999px;background:#E04A67}
  </style></head><body>
    <div class="left">
      <div class="brand">
        <img src="/logo.svg" alt="Tiago Design" style="height:64px;width:auto" />
      </div>
      <div>
        <h1>Seu negócio merece um site <em>à altura da sua marca</em>.</h1>
        <div style="margin-top:26px">
          <span class="chip">Sites institucionais</span>
          <span class="chip">Landing pages</span>
          <span class="chip">Portfólios</span>
        </div>
      </div>
      <div class="foot">Sites profissionais, modernos e personalizados.</div>
    </div>
    <div class="right">
      <div class="glow"></div>
      <div class="frame">
        <div class="bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
        <div class="body">
          <div class="l a"></div><div class="l b"></div><div class="l c"></div>
          <div class="btn"></div>
        </div>
      </div>
    </div>
  </body></html>`
}

async function main() {
  const executablePath = CHROME_CANDIDATES.find((candidate) => candidate && existsSync(candidate))
  if (!executablePath) {
    console.error('Chrome/Edge não encontrado. Instale o Chrome ou ajuste CHROME_CANDIDATES.')
    process.exit(1)
  }

  mkdirSync(COVERS_DIR, { recursive: true })

  const server = await startServer(PUBLIC_DIR, PORT)
  const altServer = await startServer(path.join(PUBLIC_DIR, 'projects', 'rollnorte'), PORT_ALT)
  const base = `http://127.0.0.1:${PORT}`
  const altBase = `http://127.0.0.1:${PORT_ALT}`
  console.log(`Servidor local em ${base}`)

  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--force-device-scale-factor=1'],
  })

  let generated = 0

  for (const cover of selectedCovers) {
    const origin = cover.altRoot ? altBase : base
    if (!cover.altRoot && !existsSync(path.join(PUBLIC_DIR, cover.path))) {
      console.warn(`[skip] preview ausente: ${cover.path}`)
      continue
    }

    const page = await browser.newPage()
    try {
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
      await page.goto(`${origin}/${cover.path}`, { waitUntil: 'load', timeout: 45000 })
      await page.evaluate(() => window.scrollTo(0, 0))
      await new Promise((resolve) => setTimeout(resolve, 2400))

      if (cover.fullPage) {
        await page.screenshot({
          path: path.join(COVERS_DIR, `${cover.id}-full.jpg`),
          type: 'jpeg',
          quality: 64,
          fullPage: true,
        })
      }

      await page.evaluate(() => window.scrollTo(0, 0))
      await new Promise((resolve) => setTimeout(resolve, 500))
      await page.screenshot({
        path: path.join(COVERS_DIR, `${cover.id}.jpg`),
        type: 'jpeg',
        quality: 80,
      })

      generated += 1
      console.log(`[ok] capa: ${cover.id}.jpg`)
    } catch (error) {
      console.error(`[erro] ${cover.id}:`, error)
    } finally {
      await page.close()
    }
  }

  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 })
    await page.goto(`${base}/__og-cover`, { waitUntil: 'load', timeout: 30000 })
    await page.screenshot({ path: path.join(PUBLIC_DIR, 'og-cover.png'), type: 'png' })
    await page.close()
    console.log('[ok] og-cover.png')
  } catch (error) {
    console.error('[erro] og-cover:', error)
  }

  await browser.close()
  server.close()
  altServer.close()
  console.log(`\n${generated} capa(s) gerada(s) em public/covers/.`)
}

main()
