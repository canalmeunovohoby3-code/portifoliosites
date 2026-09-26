/* MHR — reveal on scroll (IntersectionObserver, progressivo) */
(function (MHR) {
  'use strict';

  function init() {
    var selector = '.reveal';
    var nodes = MHR.dom.qsa(selector);
    if (!nodes.length) return;

    /* Sem suporte ou movimento reduzido: mostra tudo imediatamente. */
    if (!('IntersectionObserver' in window) || MHR.dom.prefersReducedMotion()) {
      nodes.forEach(function (node) {
        node.classList.add('is-visible');
      });
      return;
    }

    /* Stagger automático para itens dentro de um mesmo grupo. */
    var groups = MHR.dom.qsa('[data-reveal-group]');
    groups.forEach(function (group) {
      var step = parseInt(group.getAttribute('data-reveal-step') || '80', 10);
      MHR.dom.qsa('.reveal', group).forEach(function (child, index) {
        if (!child.style.getPropertyValue('--reveal-delay')) {
          child.style.setProperty('--reveal-delay', index * step + 'ms');
        }
      });
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    );

    nodes.forEach(function (node) {
      observer.observe(node);
    });
  }

  MHR.reveal = { init: init };
})((window.MHR = window.MHR || {}));
