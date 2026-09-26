/**
 * Shim de roteador — usado SOMENTE no build de preview do portfólio.
 *
 * O site do Rollnorte usa `BrowserRouter`, que renderiza "404 — Page not found"
 * quando é servido dentro de uma subpasta (como no preview do portfólio).
 * Aqui trocamos apenas o `BrowserRouter` por `HashRouter`; todo o restante do
 * react-router-dom é reexportado sem alterações.
 *
 * O projeto original do cliente NÃO é modificado.
 */
const REAL = '../../../CLIENTE 1208 ROLLNORTE/node_modules/react-router-dom/dist/index.js'

export * from '../../../CLIENTE 1208 ROLLNORTE/node_modules/react-router-dom/dist/index.js'
export { HashRouter as BrowserRouter } from '../../../CLIENTE 1208 ROLLNORTE/node_modules/react-router-dom/dist/index.js'

// Referência explícita para evitar que o bundler remova o import acima.
export const __routerShimTarget = REAL
