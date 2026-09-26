/* ==========================================================================
   MHR — Faixa institucional (assinatura corporativa / diferenciais)
   ========================================================================== */
(function (MHR) {
  'use strict';

  var dom = MHR.dom;
  var icon = MHR.icons.get;

  var pillars = [
    {
      icon: 'layers',
      title: 'Engenharia Industrial',
      text: 'Soluções completas para operações industriais.',
    },
    {
      icon: 'users',
      title: 'Equipe Técnica',
      text: 'Profissionais especializados em diferentes disciplinas.',
    },
    {
      icon: 'badge',
      title: 'Responsabilidade Técnica',
      text: 'Atuação com responsável técnico registrado no CREA.',
    },
    {
      icon: 'shield',
      title: 'Segurança',
      text: 'Compromisso com normas e boas práticas de segurança.',
    },
  ];

  function render() {
    var mount = dom.qs('[data-pillars]');
    if (!mount) return;
    mount.innerHTML =
      '<div class="container container--wide">' +
      '<div class="pillars__grid">' +
      pillars
        .map(function (pillar) {
          return (
            '<article class="pillar reveal">' +
            '<span class="pillar__icon">' +
            icon(pillar.icon) +
            '</span>' +
            '<h3 class="pillar__title">' +
            dom.esc(pillar.title) +
            '</h3>' +
            '<p class="pillar__text">' +
            dom.esc(pillar.text) +
            '</p>' +
            '</article>'
          );
        })
        .join('') +
      '</div>' +
      '</div>';
  }

  MHR.components = MHR.components || {};
  MHR.components.pillars = { render: render };
})((window.MHR = window.MHR || {}));
