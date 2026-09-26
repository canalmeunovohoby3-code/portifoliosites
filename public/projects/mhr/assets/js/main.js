/* ==========================================================================
   MHR — ponto de entrada
   --------------------------------------------------------------------------
   Cada componente só renderiza se o marcador correspondente existir na
   página. Assim o mesmo bundle atende todas as páginas sem custo extra.
   ========================================================================== */
(function (MHR) {
  'use strict';

  var c = MHR.components;

  function boot() {
    c.header.render();
    c.header.init();

    c.footer.render();
    c.footer.init();

    c.pillars.render();

    c.carousel.render();
    c.carousel.init();

    c.services.renderPreview();
    c.services.renderDetail();

    c.segments.render();
    c.segments.renderDetail();

    c.engineering.renderFlow();
    c.engineering.renderDeliverables();
    c.engineering.renderResponsibility();

    c.contact.render();
    c.contact.renderFormOptions();
    c.contact.initForm();

    MHR.reveal.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})((window.MHR = window.MHR || {}));
