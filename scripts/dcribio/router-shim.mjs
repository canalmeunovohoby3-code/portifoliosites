/**
 * Shim de roteador — usado SOMENTE no build de preview do portfólio.
 * O Dcribioshop usa `BrowserRouter`, que não casa a rota "/" quando servido
 * dentro de uma subpasta. Aqui trocamos apenas o `BrowserRouter` por
 * `HashRouter`; o restante é reexportado sem alterações.
 * O projeto original do cliente NÃO é modificado.
 */
export * from '../../../CLIENTE 3742 DCRIBIO/node_modules/react-router-dom/dist/index.js'
export { HashRouter as BrowserRouter } from '../../../CLIENTE 3742 DCRIBIO/node_modules/react-router-dom/dist/index.js'
