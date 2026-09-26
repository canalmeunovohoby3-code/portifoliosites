/* ==========================================================================
   MHR — ServicesSection
   --------------------------------------------------------------------------
   Um único componente (.service-detail) atende as duas áreas:

     página inicial  -> prévia compacta dos principais serviços
     página Serviços -> versão completa, com escopo ampliado e entregáveis

   A linguagem visual é a mesma (imagem, índice, título, texto, lista de
   escopo e link). O que muda entre as duas áreas é apenas a quantidade de
   conteúdo e a densidade do bloco — nunca o estilo.

   `featured: true` em data/services.js define quais serviços entram na prévia.
   ========================================================================== */
(function (MHR) {
  'use strict';

  var dom = MHR.dom;
  var icon = MHR.icons.get;

  function pad2(value) {
    return String(value).padStart(2, '0');
  }

  /* Bloco de serviço reutilizável.
       options.variant       'preview' (página inicial) | 'full' (Serviços)
       options.number        posição do serviço na lista completa (rótulo X / 09)
       options.order         posição na lista exibida (define a alternância de lado)
       options.total         total de serviços da lista completa
       options.headingLevel  nível do título (2 na página Serviços, 3 na Home) */
  function serviceBlock(service, options) {
    var opts = options || {};
    var preview = opts.variant === 'preview';
    var number = typeof opts.number === 'number' ? opts.number : 0;
    var order = typeof opts.order === 'number' ? opts.order : number;
    var total = opts.total || 1;
    var level = opts.headingLevel === 3 ? 3 : 2;

    var classes = ['service-detail'];
    if (order % 2 === 1) classes.push('service-detail--reverse');
    if (preview) classes.push('service-detail--compact');

    var bullets = service.bullets || [];
    var shownBullets = preview ? bullets.slice(0, 3) : bullets;
    var text = preview ? service.short : service.scope;
    var href = preview ? 'servicos.html#' + service.slug : 'contato.html';
    var linkLabel = preview ? 'Ver detalhes completos' : 'Solicitar orçamento';

    return (
      '<article class="' +
      classes.join(' ') +
      ' reveal"' +
      (preview ? '' : ' id="' + dom.esc(service.slug) + '"') +
      '>' +
      /* A imagem usa a mesma proporção nas duas áreas: o que muda na prévia é
         só a quantidade de texto, nunca o tratamento visual. */
      '<div class="service-detail__media media-frame media-frame--zoom media-frame--tech aspect-4x3">' +
      '<img src="' +
      dom.esc(service.image) +
      '" alt="' +
      dom.esc(service.imageAlt || service.title + ' — imagem ilustrativa') +
      '" loading="lazy" decoding="async">' +
      '</div>' +
      '<div class="service-detail__body">' +
      '<span class="service-detail__index">Serviço ' +
      pad2(number + 1) +
      ' / ' +
      pad2(total) +
      '</span>' +
      '<h' +
      level +
      ' class="service-detail__title">' +
      dom.esc(service.title) +
      '</h' +
      level +
      '>' +
      '<p class="service-detail__text">' +
      dom.esc(text) +
      '</p>' +
      (shownBullets.length
        ? '<ul class="service-detail__list">' +
          shownBullets
            .map(function (bullet) {
              return '<li>' + dom.esc(bullet) + '</li>';
            })
            .join('') +
          '</ul>'
        : '') +
      '<p><a class="link-arrow" href="' +
      dom.esc(href) +
      '">' +
      linkLabel +
      icon('arrow-right') +
      '</a></p>' +
      '</div>' +
      '</article>'
    );
  }

  /* Prévia da página inicial: apenas os serviços marcados como destaque. */
  function renderPreview() {
    var mount = dom.qs('[data-services-preview]');
    var services = MHR.services || [];
    if (!mount || !services.length) return;

    var selected = [];
    services.forEach(function (service, index) {
      if (service.featured) selected.push({ service: service, number: index });
    });
    if (!selected.length) return;

    mount.innerHTML = selected
      .map(function (item, order) {
        return serviceBlock(item.service, {
          variant: 'preview',
          number: item.number,
          order: order,
          total: services.length,
          headingLevel: 3,
        });
      })
      .join('');
  }

  /* Página Serviços: todos os serviços, com o escopo completo. */
  function renderDetail() {
    var mount = dom.qs('[data-services-detail]');
    var services = MHR.services || [];
    if (!mount || !services.length) return;

    mount.innerHTML = services
      .map(function (service, index) {
        return serviceBlock(service, {
          variant: 'full',
          number: index,
          order: index,
          total: services.length,
          headingLevel: 2,
        });
      })
      .join('');
  }

  MHR.components = MHR.components || {};
  MHR.components.services = { renderPreview: renderPreview, renderDetail: renderDetail };
})((window.MHR = window.MHR || {}));
