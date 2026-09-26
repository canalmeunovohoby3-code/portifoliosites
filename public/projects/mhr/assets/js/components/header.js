/* ==========================================================================
   MHR — Header institucional (topbar + navegação sticky + menu mobile)
   ========================================================================== */
(function (MHR) {
  'use strict';

  var dom = MHR.dom;
  var icon = MHR.icons.get;

  function currentPage() {
    return (document.body.getAttribute('data-page') || '').toLowerCase();
  }

  function navList(className, linkClass) {
    var page = currentPage();
    return (
      '<ul class="' +
      className +
      '">' +
      MHR.site.nav
        .map(function (item) {
          var active = item.href.replace('.html', '').toLowerCase();
          var isActive = active === page || (page === 'index' && active === 'inicio');
          return (
            '<li>' +
            '<a class="' +
            linkClass +
            '" href="' +
            item.href +
            '"' +
            (isActive ? ' aria-current="page"' : '') +
            '>' +
            dom.esc(item.label) +
            '</a>' +
            '</li>'
          );
        })
        .join('') +
      '</ul>'
    );
  }

  function topbar() {
    var phone = MHR.site.contact.phone;
    var contact = phone
      ? '<a class="topbar__item" href="' +
        dom.esc(phone.href) +
        '">' +
        icon('phone') +
        dom.esc(phone.label) +
        '</a>'
      : '';

    return (
      '<div class="topbar">' +
      '<div class="container container--wide topbar__inner">' +
      '<ul class="topbar__list">' +
      '<li class="topbar__item">' +
      icon('pin') +
      dom.esc(MHR.site.address.city + ' / ' + MHR.site.address.state) +
      '<span class="topbar__item--hide-sm">&nbsp;— ' +
      dom.esc(MHR.site.area.region) +
      '</span>' +
      '</li>' +
      '</ul>' +
      '<div class="topbar__aside">' +
      '<span class="topbar__badge">Responsável técnico CREA</span>' +
      contact +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  function headerBar() {
    return (
      '<div class="header-bar">' +
      '<div class="container container--wide header-bar__inner">' +
      MHR.components.logo.brand({ href: 'index.html' }) +
      '<nav class="main-nav" aria-label="Navegação principal">' +
      navList('main-nav__list', 'main-nav__link') +
      '</nav>' +
      '<div class="header-bar__actions">' +
      '<a class="btn btn--primary btn--sm" href="' +
      MHR.site.cta.href +
      '">' +
      dom.esc(MHR.site.cta.label) +
      '</a>' +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Abrir menu">' +
      '<span class="nav-toggle__bar"></span>' +
      '<span class="nav-toggle__bar"></span>' +
      '<span class="nav-toggle__bar"></span>' +
      '</button>' +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  function mobileNav() {
    var phone = MHR.site.contact.phone;

    return (
      '<div class="mobile-nav" id="mobile-nav" data-mobile-nav aria-hidden="true">' +
      '<div class="mobile-nav__head">' +
      MHR.components.logo.brand({ light: true, href: 'index.html', compact: true }) +
      '<button class="mobile-nav__close" type="button" data-nav-close aria-label="Fechar menu">' +
      icon('close') +
      '</button>' +
      '</div>' +
      '<div class="mobile-nav__body">' +
      '<nav aria-label="Navegação mobile">' +
      navList('mobile-nav__list', 'mobile-nav__link') +
      '</nav>' +
      '<a class="btn btn--primary btn--block" href="' +
      MHR.site.cta.href +
      '">' +
      dom.esc(MHR.site.cta.label) +
      '</a>' +
      '<div class="mobile-nav__meta">' +
      '<span>' +
      icon('pin') +
      ' ' +
      dom.esc(
        MHR.site.address.street +
          ' — ' +
          MHR.site.address.district +
          ', ' +
          MHR.site.address.city +
          '/' +
          MHR.site.address.state
      ) +
      '</span>' +
      '<span>' +
        (phone ? dom.esc(phone.label) : 'Telefone e WhatsApp: canais em definição') +
        '</span>' +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  function render() {
    var mount = dom.qs('[data-header]');
    if (!mount) return;
    mount.innerHTML =
      '<header class="site-header" data-site-header>' +
      topbar() +
      headerBar() +
      '</header>' +
      mobileNav();
  }

  function init() {
    var header = dom.qs('[data-site-header]');
    var toggle = dom.qs('.nav-toggle');
    var panel = dom.qs('[data-mobile-nav]');
    var closeBtn = dom.qs('[data-nav-close]');
    var lastFocused = null;

    if (!header || !toggle || !panel) return;

    function openPanel() {
      lastFocused = document.activeElement;
      panel.classList.add('is-open');
      panel.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Fechar menu');
      document.body.classList.add('is-locked');
      var first = panel.querySelector('a, button');
      if (first) first.focus();
    }

    function closePanel() {
      panel.classList.remove('is-open');
      panel.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
      document.body.classList.remove('is-locked');
      if (lastFocused) lastFocused.focus();
    }

    dom.on(toggle, 'click', function () {
      if (panel.classList.contains('is-open')) closePanel();
      else openPanel();
    });

    dom.on(closeBtn, 'click', closePanel);

    dom.qsa('a', panel).forEach(function (link) {
      dom.on(link, 'click', closePanel);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && panel.classList.contains('is-open')) {
        closePanel();
      }
    });

    /* Fecha o menu se a viewport crescer até o layout desktop. */
    if (typeof window.matchMedia === 'function') {
      var desktop = window.matchMedia('(min-width: 1140px)');
      var onChange = function (event) {
        if (event.matches && panel.classList.contains('is-open')) closePanel();
      };
      if (desktop.addEventListener) desktop.addEventListener('change', onChange);
      else if (desktop.addListener) desktop.addListener(onChange);
    }

    /* Estado visual ao rolar */
    var ticking = false;
    function updateScrollState() {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
      ticking = false;
    }
    dom.on(
      window,
      'scroll',
      function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(updateScrollState);
      },
      { passive: true }
    );
    updateScrollState();
  }

  MHR.components = MHR.components || {};
  MHR.components.header = { render: render, init: init };
})((window.MHR = window.MHR || {}));
