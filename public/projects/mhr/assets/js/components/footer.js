/* ==========================================================================
   MHR — Footer corporativo
   ========================================================================== */
(function (MHR) {
  'use strict';

  var dom = MHR.dom;
  var icon = MHR.icons.get;

  var columns = {
    mhr: [
      { label: 'A Empresa', href: 'a-empresa.html' },
      { label: 'Serviços', href: 'servicos.html' },
      { label: 'Segmentos', href: 'segmentos.html' },
      { label: 'Engenharia', href: 'engenharia.html' },
    ],
    services: [
      { label: 'Montagem Eletromecânica', href: 'servicos.html#montagem-eletromecanica' },
      { label: 'Manutenção Industrial', href: 'servicos.html#manutencao-industrial' },
      { label: 'Caldeiraria Pesada', href: 'servicos.html#caldeiraria-pesada-fabricacao' },
      { label: 'Soldagem Industrial', href: 'servicos.html#soldagem-industrial' },
      { label: 'Vulcanização de Correias', href: 'servicos.html#vulcanizacao-de-correias' },
    ],
    institutional: [
      { label: 'Engenharia', href: 'engenharia.html' },
      { label: 'Segurança e Qualidade', href: 'seguranca-qualidade.html' },
      { label: 'Segmentos', href: 'segmentos.html' },
      { label: 'Contato', href: 'contato.html' },
    ],
  };

  function linkList(items, className) {
    return (
      '<ul class="' +
      (className || 'footer__list') +
      '">' +
      items
        .map(function (item) {
          return (
            '<li><a class="footer__link" href="' +
            dom.esc(item.href) +
            '">' +
            dom.esc(item.label) +
            '</a></li>'
          );
        })
        .join('') +
      '</ul>'
    );
  }

  function contactItem(iconName, label, channel) {
    var value = channel
      ? '<a class="footer__link" href="' +
        dom.esc(channel.href) +
        '"' +
        (/^https?:/.test(channel.href) ? ' target="_blank" rel="noopener"' : '') +
        '>' +
        dom.esc(channel.label) +
        '</a>'
      : '<span class="footer__pending">Em definição</span>';

    return (
      '<div class="footer__contact-item">' +
      icon(iconName) +
      '<div><strong>' +
      dom.esc(label) +
      '</strong>' +
      value +
      '</div></div>'
    );
  }

  function addressBlock() {
    var address = MHR.site.address;
    return (
      '<div class="footer__contact-item">' +
      icon('pin') +
      '<div><strong>Sede</strong>' +
      '<span>' +
      dom.esc(address.city + ' / ' + address.state) +
      '</span><br>' +
      '<span>' +
      dom.esc(address.street + ' — ' + address.district) +
      '</span><br>' +
      '<span>CEP ' +
      dom.esc(address.zip) +
      '</span>' +
      '</div></div>'
    );
  }

  function socialRow() {
    return (
      '<div class="social-row">' +
      MHR.site.socials
        .map(function (social) {
          var channel = MHR.site.contact[social.key];
          var label = dom.esc(social.label);
          if (channel && channel.href) {
            return (
              '<a class="social-btn" href="' +
              dom.esc(channel.href) +
              '" aria-label="' +
              label +
              '"' +
              (/^https?:/.test(channel.href) ? ' target="_blank" rel="noopener"' : '') +
              '>' +
              icon(social.icon) +
              '</a>'
            );
          }
          return (
            '<span class="social-btn social-btn--pending" title="' +
            label +
            ' — canal em definição" aria-label="' +
            label +
            ' (em definição)">' +
            icon(social.icon) +
            '</span>'
          );
        })
        .join('') +
      '</div>'
    );
  }

  function render() {
    var mount = dom.qs('[data-footer]');
    if (!mount) return;

    var site = MHR.site;
    var address = site.address;
    var year = new Date().getFullYear();

    mount.innerHTML =
      '<footer class="site-footer" role="contentinfo">' +
      '<div class="container container--wide">' +
      '<div class="footer__top">' +
      '<div class="footer__brand">' +
      MHR.components.logo.brand({ light: true, href: 'index.html' }) +
      '<p class="footer__about">' +
      dom.esc(
        'Engenharia industrial, montagem eletromecânica, manutenção, caldeiraria e fabricação. Atendimento ao ' +
          site.area.region +
          '.'
      ) +
      '</p>' +
      socialRow() +
      '</div>' +
      '<div class="footer__col footer__col--mhr">' +
      '<h2 class="footer__title">MHR</h2>' +
      linkList(columns.mhr) +
      '</div>' +
      '<div class="footer__col footer__col--services">' +
      '<h2 class="footer__title">Serviços</h2>' +
      linkList(columns.services) +
      '</div>' +
      '<div class="footer__col footer__col--institutional">' +
      '<h2 class="footer__title">Institucional</h2>' +
      linkList(columns.institutional) +
      '</div>' +
      '<div class="footer__col footer__col--contact">' +
      '<h2 class="footer__title">Contato</h2>' +
      '<div class="footer__list">' +
      addressBlock() +
      contactItem('phone', 'Telefone', site.contact.phone) +
      contactItem('whatsapp', 'WhatsApp', site.contact.whatsapp) +
      contactItem('instagram', 'Instagram', site.contact.instagram) +
      contactItem('linkedin', 'LinkedIn', site.contact.linkedin) +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="container container--wide">' +
      '<div class="footer__bottom">' +
      '<div>' +
      '<div class="footer__legal">' +
      '<span><b>' +
      dom.esc(site.legalName) +
      '</b></span>' +
      '<span>CNPJ <b>' +
      dom.esc(site.cnpj) +
      '</b></span>' +
      '<span>' +
      dom.esc(address.street + ' — ' + address.district + ' — ' + address.city + '/' + address.state) +
      '</span>' +
      '</div>' +
      '<p class="footer__note">© ' +
      year +
      ' ' +
      dom.esc(site.legalName) +
      '. Todos os direitos reservados. Imagens do site são ilustrativas e serão substituídas por registros reais das operações.</p>' +
      '</div>' +
      '<div class="footer__bottom-right">' +
      '<a class="to-top" href="#topo" data-to-top>' +
      icon('arrow-up') +
      'Voltar ao topo</a>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</footer>';
  }

  function init() {
    var toTop = dom.qs('[data-to-top]');
    dom.on(toTop, 'click', function (event) {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: dom.prefersReducedMotion() ? 'auto' : 'smooth',
      });
    });
  }

  MHR.components = MHR.components || {};
  MHR.components.footer = { render: render, init: init };
})((window.MHR = window.MHR || {}));
