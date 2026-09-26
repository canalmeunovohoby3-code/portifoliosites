/* MHR — conjunto de ícones técnicos (SVG inline, stroke = currentColor) */
(function (MHR) {
  'use strict';

  var paths = {
    'arrow-right': '<path d="M5 12h13"/><path d="M12.5 6l6 6-6 6"/>',
    'arrow-left': '<path d="M19 12H6"/><path d="M11.5 18l-6-6 6-6"/>',
    'arrow-up': '<path d="M12 19V6"/><path d="M6 11.5l6-6 6 6"/>',
    'chevron-right': '<path d="M9.5 6l6 6-6 6"/>',
    close: '<path d="M6 6l12 12"/><path d="M18 6L6 18"/>',
    pin: '<path d="M12 21.5s7-6.1 7-11.5a7 7 0 1 0-14 0c0 5.4 7 11.5 7 11.5z"/><circle cx="12" cy="10" r="2.6"/>',
    clock: '<circle cx="12" cy="12" r="8.6"/><path d="M12 7.2v5l3.2 2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="1.6"/><path d="M3.6 6.6 12 13l8.4-6.4"/>',
    phone:
      '<path d="M5.2 3.5h3.6l1.8 4.4-2.2 1.4a12.6 12.6 0 0 0 6.3 6.3l1.4-2.2 4.4 1.8v3.6a2 2 0 0 1-2.2 2A17.4 17.4 0 0 1 3.2 5.7a2 2 0 0 1 2-2.2z"/>',
    whatsapp:
      '<path d="M20.2 12a7.6 7.6 0 0 1-11 6.8L4.6 20l1.3-4.4A7.6 7.6 0 1 1 20.2 12z"/><path d="M9.3 9.4c.3 2.6 2.3 4.6 4.9 4.9l1-1.5"/>',
    instagram:
      '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.9"/><circle cx="16.8" cy="7.2" r="1.1" fill="currentColor" stroke="none"/>',
    linkedin:
      '<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M8 10.4V17"/><circle cx="8" cy="7.6" r="1.1" fill="currentColor" stroke="none"/><path d="M12 17v-3.8a2.4 2.4 0 0 1 4.8 0V17"/>',
    shield:
      '<path d="M12 3 5 5.7v5.5c0 4.4 2.9 8.2 7 9.8 4.1-1.6 7-5.4 7-9.8V5.7L12 3z"/><path d="M9.2 12.3l2 2 3.6-4.2"/>',
    badge:
      '<path d="M12 3l2.1 1.5 2.6-.3 1 2.4 2.2 1.3-.8 2.5.8 2.5-2.2 1.3-1 2.4-2.6-.3L12 20.8l-2.1-1.5-2.6.3-1-2.4-2.2-1.3.8-2.5-.8-2.5 2.2-1.3 1-2.4 2.6.3L12 3z"/><path d="M9.2 11.9l1.9 1.9 3.7-4"/>',
    gear: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.6v2.6M12 18.8v2.6M2.6 12h2.6M18.8 12h2.6M5.4 5.4l1.9 1.9M16.7 16.7l1.9 1.9M18.6 5.4l-1.9 1.9M7.3 16.7l-1.9 1.9"/>',
    wrench:
      '<path d="M20 5.4 17.4 8 14.2 6.8 14 3.6l3.6-.8a5.4 5.4 0 0 0-6.6 6.9L3.6 17a2 2 0 1 0 2.8 2.8l7.4-7.4a5.4 5.4 0 0 0 6.9-6.6z"/>',
    bolt: '<path d="M13.2 2.5 5.5 13.4h5.6l-1 8.1 7.7-11h-5.6l1-8z"/>',
    flame:
      '<path d="M12 3.2s5.2 4.5 5.2 9.2a5.2 5.2 0 0 1-10.4 0c0-1.9 1-3.6 1-3.6s.9 2.1 2.4 2.1c-1-3 1.8-7.7 1.8-7.7z"/>',
    tank: '<rect x="4" y="7.5" width="16" height="12" rx="1.6"/><path d="M4 11.6h16M4 15.4h16"/><path d="M9.5 7.5V4.8h5v2.7"/>',
    belt: '<circle cx="5.2" cy="14" r="3.2"/><circle cx="18.8" cy="14" r="3.2"/><path d="M5.2 10.8h13.6M5.2 17.2h13.6"/>',
    scaffold: '<path d="M5.5 3v18M18.5 3v18M5.5 8.2h13M5.5 14h13M9.2 3v5.2M14.8 8.2V14M9.2 14v7"/>',
    chart: '<path d="M4 4v16h16"/><path d="M8 17v-4.5M12 17V8.5M16 17v-6.5"/>',
    layers: '<path d="M12 3.4 3.4 8 12 12.6 20.6 8 12 3.4z"/><path d="M3.4 12.6 12 17.2l8.6-4.6"/><path d="M3.4 16.8 12 21.4l8.6-4.6"/>',
    factory: '<path d="M3.2 20V10l5.2 3V10l5.2 3V6.8L20.8 11v9z"/><path d="M3.2 20h17.6"/><path d="M8 16.6h2.2M14.6 16.6h2.2"/>',
    clipboard: '<rect x="5" y="4.4" width="14" height="16.6" rx="1.6"/><path d="M9 4.4V3h6v1.4"/><path d="M8.6 10.4h6.8M8.6 14h6.8M8.6 17.4h4"/>',
    calendar: '<rect x="4" y="5.4" width="16" height="15.6" rx="1.6"/><path d="M4 10.2h16M8.4 3v4.2M15.6 3v4.2"/>',
    ruler: '<rect x="2.6" y="8.2" width="18.8" height="7.6" rx="1"/><path d="M6.4 8.2v3M10.2 8.2v4M14 8.2v3M17.8 8.2v4"/>',
    file: '<path d="M6.2 3h7.6l4.2 4.2V21H6.2z"/><path d="M13.8 3v4.2H18"/><path d="M9.2 13h5.6M9.2 16.8h3.8"/>',
    blueprint: '<rect x="3.6" y="5" width="16.8" height="14" rx="1"/><path d="M3.6 9.6h16.8M9 9.6V19M14.4 9.6V19"/>',
    users:
      '<circle cx="9.2" cy="8.2" r="3"/><path d="M3.6 19.6a5.6 5.6 0 0 1 11.2 0"/><path d="M16 5.6a3 3 0 0 1 0 5.6"/><path d="M17.2 14.8a5.6 5.6 0 0 1 3.4 4.8"/>',
    target:
      '<circle cx="12" cy="12" r="8.4"/><circle cx="12" cy="12" r="4.4"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>',
    check: '<path d="M4.8 12.6 9.6 17.4 19.2 6.8"/>',
    play: '<path d="M8.4 5.6 18.4 12 8.4 18.4z"/>',
    pause: '<path d="M9.6 5.6v12.8M14.4 5.6v12.8"/>',
    'check-circle': '<circle cx="12" cy="12" r="8.8"/><path d="M8.2 12.4l2.6 2.6 5.2-5.6"/>',
    building: '<path d="M4.5 20.5V4.5h9v16"/><path d="M13.5 9.5h6v11"/><path d="M2.5 20.5h19"/><path d="M7.5 8h3M7.5 11.8h3M7.5 15.6h3M16 13h1.5M16 16.5h1.5"/>',
    globe: '<circle cx="12" cy="12" r="8.6"/><path d="M3.6 12h16.8"/><path d="M12 3.4c2.4 2.4 3.6 5.4 3.6 8.6s-1.2 6.2-3.6 8.6c-2.4-2.4-3.6-5.4-3.6-8.6S9.6 5.8 12 3.4z"/>',
    helmet:
      '<path d="M4.4 15.6a7.6 7.6 0 0 1 15.2 0"/><path d="M3 15.6h18v2.6H3z"/><path d="M9.6 7.8V4.6h4.8v3.2"/>',
  };

  function icon(name, className) {
    var body = paths[name] || paths.gear;
    var cls = 'mhr-icon' + (className ? ' ' + className : '');
    return (
      '<svg class="' +
      cls +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      body +
      '</svg>'
    );
  }

  MHR.icons = { map: paths, get: icon };
})((window.MHR = window.MHR || {}));
