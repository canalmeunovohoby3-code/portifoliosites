/* MHR — utilitários de DOM */
(function (MHR) {
  'use strict';

  var dom = {
    qs: function (selector, root) {
      return (root || document).querySelector(selector);
    },

    qsa: function (selector, root) {
      return Array.prototype.slice.call((root || document).querySelectorAll(selector));
    },

    esc: function (value) {
      return String(value == null ? '' : value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    },

    /* Injeta HTML em todos os elementos que casam com o seletor. */
    mount: function (selector, html, root) {
      var nodes = dom.qsa(selector, root);
      nodes.forEach(function (node) {
        node.innerHTML = html;
      });
      return nodes;
    },

    on: function (target, event, handler, options) {
      if (!target) return;
      target.addEventListener(event, handler, options);
    },

    prefersReducedMotion: function () {
      return (
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    },

    /* Aguarda as imagens lazy entrarem na viewport antes de medir. */
    loadImage: function (img) {
      if (img && !img.complete) {
        img.loading = 'lazy';
        img.decoding = 'async';
      }
      return img;
    },
  };

  MHR.dom = dom;
})((window.MHR = window.MHR || {}));
