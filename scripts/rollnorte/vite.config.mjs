/**
 * Config de build isolada para gerar o preview do Rollnorte dentro do portfólio.
 * Não altera o projeto original: apenas aponta `react-router-dom` para um shim
 * (HashRouter) e gera a saída em `.portfolio-preview`.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CLIENT_DIR = path.resolve(__dirname, '..', '..', '..', 'CLIENTE 1208 ROLLNORTE')

export default defineConfig({
  root: CLIENT_DIR,
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(CLIENT_DIR, 'src'),
      'react-router-dom': path.resolve(__dirname, 'router-shim.mjs'),
    },
  },
  build: {
    outDir: '.portfolio-preview',
    emptyOutDir: true,
    sourcemap: false,
  },
})
