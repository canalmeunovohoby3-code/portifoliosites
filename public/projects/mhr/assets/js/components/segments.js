/* ==========================================================================
   MHR — SegmentsSection
   ========================================================================== */
(function (MHR) {
  'use strict';

  var dom = MHR.dom;
  var icon = MHR.icons.get;

  function pad2(value) {
    return String(value).padStart(2, '0');
  }

  function render() {
    var mount = dom.qs('[data-segments-grid]');
    var segments = MHR.segments || [];
    if (!mount || !segments.length) return;

    mount.innerHTML = segments
      .map(function (segment, index) {
        return (
          '<article class="segment reveal">' +
          '<div class="segment__media">' +
          '<img src="' +
          dom.esc(segment.image) +
          '" alt="' +
          dom.esc(segment.title + ' — imagem ilustrativa') +
          '" loading="lazy" decoding="async">' +
          '</div>' +
          '<span class="segment__index">Segmento ' +
          pad2(index + 1) +
          '</span>' +
          '<div class="segment__rule"></div>' +
          '<h3 class="segment__title">' +
          dom.esc(segment.title) +
          '</h3>' +
          '<p class="segment__text">' +
          dom.esc(segment.short) +
          '</p>' +
          (segment.cta
            ? '<a class="segment__cta" href="' +
              dom.esc(segment.cta.href) +
              '">' +
              dom.esc(segment.cta.label) +
              '</a>'
            : '') +
          '</article>'
        );
      })
      .join('');
  }

  function renderDetail() {
    var mount = dom.qs('[data-segments-detail]');
    var segments = MHR.segments || [];
    if (!mount || !segments.length) return;

    mount.innerHTML = segments
      .map(function (segment, index) {
        var reverse = index % 2 === 1 ? ' service-detail--reverse' : '';
        return (
          '<article class="service-detail' +
          reverse +
          ' reveal" id="' +
          dom.esc(segment.slug || segment.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')) +
          '">' +
          '<div class="service-detail__media media-frame media-frame--zoom media-frame--tech aspect-4x3">' +
          '<img src="' +
          dom.esc(segment.image) +
          '" alt="' +
          dom.esc(segment.title + ' — imagem ilustrativa') +
          '" loading="lazy" decoding="async">' +
          '</div>' +
          '<div class="service-detail__body">' +
          '<span class="service-detail__index">Segmento ' +
          pad2(index + 1) +
          ' / ' +
          pad2(segments.length) +
          '</span>' +
          '<h2 class="service-detail__title">' +
          dom.esc(segment.title) +
          '</h2>' +
          '<p class="service-detail__text">' +
          dom.esc(segment.short) +
          '</p>' +
          '<ul class="service-detail__list">' +
          segment.bullets
            .map(function (bullet) {
              return '<li>' + dom.esc(bullet) + '</li>';
            })
            .join('') +
          '</ul>' +
          '<p>' +
          (segment.page
            ? '<a class="link-arrow" href="' +
              dom.esc(segment.page.href) +
              '">' +
              dom.esc(segment.page.label) +
              icon('arrow-right') +
              '</a>&nbsp;&nbsp;'
            : '') +
          '<a class="link-arrow" href="contato.html">Falar com a engenharia' +
          icon('arrow-right') +
          '</a>' +
          '</p>' +
          '</div>' +
          '</article>'
        );
      })
      .join('');
  }

  MHR.components = MHR.components || {};
  MHR.components.segments = { render: render, renderDetail: renderDetail };
})((window.MHR = window.MHR || {}));
