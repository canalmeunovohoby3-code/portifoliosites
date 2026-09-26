/* ==========================================================================
   MHR — EngineeringSection (fluxo + entregáveis + responsabilidade técnica)
   ========================================================================== */
(function (MHR) {
  'use strict';

  var dom = MHR.dom;
  var icon = MHR.icons.get;

  function pad2(value) {
    return String(value).padStart(2, '0');
  }

  function renderFlow() {
    var mount = dom.qs('[data-engineering-flow]');
    var flow = MHR.engineering.flow || [];
    if (!mount || !flow.length) return;

    mount.innerHTML = flow
      .map(function (step, index) {
        var isLast = index === flow.length - 1;
        return (
          '<div class="flow__step reveal">' +
          '<span class="flow__num">Etapa ' +
          pad2(index + 1) +
          '</span>' +
          '<h3 class="flow__title">' +
          dom.esc(step.title) +
          '</h3>' +
          '<p class="flow__text">' +
          dom.esc(step.text) +
          '</p>' +
          (isLast ? '' : '<span class="flow__arrow">' + icon('chevron-right') + '</span>') +
          '</div>'
        );
      })
      .join('');
  }

  function renderDeliverables() {
    var mount = dom.qs('[data-engineering-deliverables]');
    var items = MHR.engineering.deliverables || [];
    if (!mount || !items.length) return;

    mount.innerHTML = items
      .map(function (item, index) {
        return (
          '<article class="deliverable reveal">' +
          '<span class="deliverable__num">' +
          pad2(index + 1) +
          '</span>' +
          '<h3 class="deliverable__title">' +
          dom.esc(item.title) +
          '</h3>' +
          '<p class="deliverable__text">' +
          dom.esc(item.text) +
          '</p>' +
          '</article>'
        );
      })
      .join('');
  }

  function renderResponsibility() {
    var mount = dom.qs('[data-engineering-responsibility]');
    var items = MHR.engineering.responsibility || [];
    if (!mount || !items.length) return;
    mount.innerHTML = items
      .map(function (item) {
        return '<li class="checklist__item">' + dom.esc(item) + '</li>';
      })
      .join('');
  }

  MHR.components = MHR.components || {};
  MHR.components.engineering = {
    renderFlow: renderFlow,
    renderDeliverables: renderDeliverables,
    renderResponsibility: renderResponsibility,
  };
})((window.MHR = window.MHR || {}));
