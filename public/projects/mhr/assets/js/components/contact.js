/* ==========================================================================
   MHR — ContactSection
   --------------------------------------------------------------------------
   Renderiza os cartões de contato. Canais sem valor configurado em
   `MHR.site.contact` aparecem como espaços reservados (nenhum dado é
   inventado). Preencha o data/site.js para publicá-los.
   ========================================================================== */
(function (MHR) {
  'use strict';

  var dom = MHR.dom;
  var icon = MHR.icons.get;

  function card(label, valueMarkup) {
    return (
      '<div class="contact-card">' +
      '<span class="contact-card__label">' +
      dom.esc(label) +
      '</span>' +
      '<span class="contact-card__value">' +
      valueMarkup +
      '</span>' +
      '</div>'
    );
  }

  function pendingCard(label, hint) {
    return (
      '<div class="contact-card contact-card--pending">' +
      '<span class="contact-card__label">' +
      dom.esc(label) +
      '</span>' +
      '<span class="contact-card__pending-value">Aguardando definição</span>' +
      '<span class="contact-card__hint">' +
      dom.esc(hint || 'Espaço reservado para o canal oficial.') +
      '</span>' +
      '</div>'
    );
  }

  function channelCard(label, channel, options) {
    var opts = options || {};
    if (!channel || !channel.href) {
      return pendingCard(label, opts.hint);
    }
    var external = /^https?:/.test(channel.href);
    return card(
      label,
      '<a href="' +
        dom.esc(channel.href) +
        '"' +
        (external ? ' target="_blank" rel="noopener"' : '') +
        '>' +
        dom.esc(channel.label) +
        '</a>'
    );
  }

  function render() {
    var mount = dom.qs('[data-contact-cards]');
    if (!mount) return;

    var site = MHR.site;
    var address = site.address;
    var mapsUrl =
      'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(site.mapQuery);

    mount.innerHTML = [
      card(
        'Sede',
        dom.esc(address.street) +
          '<br>' +
          dom.esc(address.district) +
          '<br>' +
          dom.esc(address.city + '/' + address.state) +
          '<br>CEP ' +
          dom.esc(address.zip) +
          '<br><a class="link-arrow" href="' +
          mapsUrl +
          '" target="_blank" rel="noopener">Ver no mapa' +
          icon('arrow-right') +
          '</a>'
      ),
      card(
        'Área de atendimento',
        dom.esc(site.area.region) +
          '<br><span class="text-muted">' +
          dom.esc(site.area.note) +
          '</span>'
      ),
      channelCard('Telefone', site.contact.phone, {
        hint: 'Espaço reservado para o número oficial de atendimento.',
      }),
      channelCard('WhatsApp', site.contact.whatsapp, {
        hint: 'Espaço reservado para o canal de WhatsApp comercial.',
      }),
      channelCard('E-mail', site.contact.email, {
        hint: 'Espaço reservado para o e-mail de contato.',
      }),
      channelCard('Instagram', site.contact.instagram, {
        hint: 'Espaço reservado para o perfil institucional.',
      }),
      channelCard('LinkedIn', site.contact.linkedin, {
        hint: 'Espaço reservado para a página da empresa.',
      }),
      card(
        'Responsabilidade técnica',
        dom.esc(site.technical.crea) +
          '<br><span class="text-muted">' +
          dom.esc(site.technical.safety) +
          '</span>'
      ),
    ].join('');
  }

  function renderFormOptions() {
    var select = dom.qs('[data-form-subject]');
    if (!select) return;

    var serviceOptions = (MHR.services || [])
      .map(function (service) {
        return '<option value="' + dom.esc(service.title) + '">' + dom.esc(service.title) + '</option>';
      })
      .join('');

    var segmentOptions = (MHR.segments || [])
      .map(function (segment) {
        return '<option value="Segmento: ' + dom.esc(segment.title) + '">Segmento — ' + dom.esc(segment.title) + '</option>';
      })
      .join('');

    select.innerHTML =
      '<option value="">Selecione o assunto</option>' +
      '<optgroup label="Serviços">' +
      serviceOptions +
      '</optgroup>' +
      '<optgroup label="Segmentos">' +
      segmentOptions +
      '</optgroup>' +
      '<option value="Outro assunto">Outro assunto</option>';
  }

  function initForm() {
    var form = dom.qs('[data-contact-form]');
    if (!form) return;

    var status = dom.qs('[data-form-status]', form);

    function fieldOf(input) {
      return input.closest('.form__field');
    }

    function setError(input, message) {
      var field = fieldOf(input);
      if (!field) return;
      field.classList.add('has-error');
      var error = dom.qs('.form__error', field);
      if (error) error.textContent = message;
      input.setAttribute('aria-invalid', 'true');
    }

    function clearError(input) {
      var field = fieldOf(input);
      if (!field) return;
      field.classList.remove('has-error');
      var error = dom.qs('.form__error', field);
      if (error) error.textContent = '';
      input.removeAttribute('aria-invalid');
    }

    function validate() {
      var errors = 0;
      var required = dom.qsa('[required]', form);

      required.forEach(function (input) {
        clearError(input);
        if (input.type === 'checkbox' && !input.checked) {
          setError(input, 'Confirme o consentimento para prosseguir.');
          errors++;
          return;
        }
        if (!String(input.value || '').trim()) {
          setError(input, 'Campo obrigatório.');
          errors++;
          return;
        }
        if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          setError(input, 'Informe um e-mail válido.');
          errors++;
        }
      });

      return errors === 0;
    }

    dom.on(form, 'input', function (event) {
      if (event.target.matches('input, select, textarea')) clearError(event.target);
    });

    dom.on(form, 'submit', function (event) {
      event.preventDefault();
      if (!validate()) {
        var firstError = dom.qs('.has-error input, .has-error select, .has-error textarea', form);
        if (firstError) firstError.focus();
        return;
      }

      if (status) {
        status.textContent =
          'Solicitação registrada. Este formulário está pronto para ser conectado ao canal oficial de atendimento da MHR.';
        status.classList.add('is-visible');
      }
      form.reset();
    });
  }

  MHR.components = MHR.components || {};
  MHR.components.contact = { render: render, renderFormOptions: renderFormOptions, initForm: initForm };
})((window.MHR = window.MHR || {}));
