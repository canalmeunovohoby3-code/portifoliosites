/* ==========================================================================
   MHR — HeroBannerCarousel (full width) + soletração do título
   --------------------------------------------------------------------------
   O título principal de cada banner é revelado letra por letra, com a letra
   que está entrando destacada em laranja. A troca de banner NÃO usa intervalo
   fixo: ela acontece quando a soletração termina e o título permanece completo
   pelo tempo de leitura (POST_TYPING_DELAY).

       duração do banner = nº de caracteres do título × LETTER_DELAY
                           + POST_TYPING_DELAY

   Ou seja, títulos mais longos permanecem mais tempo e títulos curtos menos.

   Ajuste de velocidade (assets/js/data/site.js > carousel):
     letterDelay     tempo entre a entrada de cada letra (ms)
     postTypingDelay tempo com o título completo antes de avançar (ms)

   Nunca há dois timers concorrentes: cada troca (automática, setas, dots,
   swipe ou teclado) cancela o ciclo anterior e reinicia o novo do zero.
   Com prefers-reduced-motion o título aparece completo e o carrossel segue
   funcionando normalmente.
   ========================================================================== */
(function (MHR) {
  'use strict';

  var dom = MHR.dom;
  var icon = MHR.icons.get;

  /* --- Configuração padrão da animação ---------------------------------- */

  /* Tempo entre a entrada de cada letra do título, em milissegundos. */
  var LETTER_DELAY = 55;

  /* Tempo que o título completo permanece visível antes de avançar, em ms. */
  var POST_TYPING_DELAY = 1700;

  /* Duração usada apenas quando o banner não possui título. */
  var FALLBACK_CYCLE_MS = 4000;

  /* Se true, quem tem "reduzir animações" ativo no sistema operacional vê o
     título completo de uma vez (sem soletração). Se false, a soletração
     acontece para todos os visitantes. Configurável em data/site.js. */
  var RESPECT_REDUCED_MOTION = true;

  function readConfig() {
    var config = (MHR.site && MHR.site.carousel) || {};

    function int(value, fallback, min) {
      var parsed = parseInt(value, 10);
      return isFinite(parsed) && parsed >= min ? parsed : fallback;
    }

    LETTER_DELAY = int(config.letterDelay, LETTER_DELAY, 0);
    POST_TYPING_DELAY = int(config.postTypingDelay, POST_TYPING_DELAY, 0);
    RESPECT_REDUCED_MOTION = config.respectReducedMotion !== false;
  }

  function pad2(value) {
    return String(value).padStart(2, '0');
  }

  /* Divide o texto em caracteres preservando acentos, pontuação e espaços.
     Usa Intl.Segmenter quando disponível (não quebra acentos compostos) e
     cai para Array.from, que já respeita pares de surrogates. */
  function toCharacters(text) {
    var value = String(text == null ? '' : text);
    if (value.normalize) value = value.normalize('NFC');

    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      try {
        var segmenter = new Intl.Segmenter('pt-BR', { granularity: 'grapheme' });
        var result = [];
        var iterator = segmenter.segment(value)[Symbol.iterator]();
        var step = iterator.next();
        while (!step.done) {
          result.push(step.value.segment);
          step = iterator.next();
        }
        return result;
      } catch (error) {
        /* usa o fallback abaixo */
      }
    }

    return Array.from(value);
  }

  /* --- Soletração de um título ------------------------------------------
     Monta o texto como palavras (inline-block, sem quebra interna) com uma
     span por caractere. Ocupa o layout final desde o início: apenas a
     opacidade das letras muda, então não há reposicionamento de linhas. */
  function createTyper(host, title) {
    if (!host) return null;

    var characters = toCharacters(title);
    var elements = [];
    var typed = 0;
    var current = null;

    function build() {
      var fragment = document.createDocumentFragment();
      var word = null;

      characters.forEach(function (character) {
        if (/\s/.test(character)) {
          word = null;
          fragment.appendChild(document.createTextNode(character));
          elements.push(null);
          return;
        }

        if (!word) {
          word = document.createElement('span');
          word.className = 'hero__word';
          fragment.appendChild(word);
        }

        var letter = document.createElement('span');
        letter.className = 'hero__letter';
        letter.textContent = character;
        word.appendChild(letter);
        elements.push(letter);
      });

      host.textContent = '';
      host.appendChild(fragment);
    }

    function clearHighlight() {
      if (current) current.classList.remove('is-current');
      current = null;
    }

    build();

    return {
      total: elements.length,

      /* Volta o título ao estado vazio (nenhuma letra visível). */
      reset: function () {
        clearHighlight();
        elements.forEach(function (element) {
          if (element) element.classList.remove('is-typed');
        });
        typed = 0;
      },

      /* Revela o próximo caractere. Retorna false quando já terminou.
         Espaços entram no fluxo mas não recebem destaque. */
      next: function () {
        if (typed >= elements.length) return false;

        var element = elements[typed];
        typed++;

        if (element) {
          element.classList.add('is-typed');
          clearHighlight();
          element.classList.add('is-current');
          current = element;
        }

        return true;
      },

      /* Mostra o título completo de uma vez (prefers-reduced-motion). */
      showAll: function () {
        clearHighlight();
        elements.forEach(function (element) {
          if (element) element.classList.add('is-typed');
        });
        typed = elements.length;
      },

      typedCount: function () {
        return typed;
      },
    };
  }

  function actions(slide) {
    var buttons = [];
    if (slide.cta) {
      buttons.push(
        '<a class="btn btn--primary" href="' +
          dom.esc(slide.cta.href) +
          '">' +
          dom.esc(slide.cta.label) +
          icon('arrow-right') +
          '</a>'
      );
    }
    if (slide.ctaAlt) {
      buttons.push(
        '<a class="btn btn--ghost-light" href="' +
          dom.esc(slide.ctaAlt.href) +
          '">' +
          dom.esc(slide.ctaAlt.label) +
          '</a>'
      );
    }
    return buttons.length ? '<div class="hero__actions">' + buttons.join('') + '</div>' : '';
  }

  /* O título é montado por JS: o texto acessível fica em um span oculto e a
     soletração acontece em um container aria-hidden, evitando que leitores
     de tela leiam letra por letra. */
  function titleMarkup(slide, isFirst) {
    var tag = isFirst ? 'h1' : 'h2';
    return (
      '<' +
      tag +
      ' class="hero__title">' +
      '<span class="visually-hidden">' +
      dom.esc(slide.title) +
      '</span>' +
      '<span class="hero__type" aria-hidden="true" data-hero-type></span>' +
      '</' +
      tag +
      '>'
    );
  }

  function slideMarkup(slide, index, total) {
    var isFirst = index === 0;

    return (
      '<article class="hero__slide" data-hero-slide data-index="' +
      index +
      '" role="group" aria-roledescription="slide" aria-label="' +
      (index + 1) +
      ' de ' +
      total +
      '"' +
      (isFirst ? '' : ' aria-hidden="true"') +
      '>' +
      '<div class="hero__media">' +
      '<img src="' +
      dom.esc(slide.image) +
      '" alt="' +
      dom.esc(slide.alt || '') +
      '" width="1920" height="820" ' +
      (isFirst ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"') +
      ' decoding="async">' +
      '</div>' +
      '<div class="hero__overlay"></div>' +
      /* Aviso de imagem provisória: só nos banners ainda sem foto definitiva. */
      (slide.placeholder
        ? '<span class="hero__media-tag">Imagem provisória — ' +
          pad2(index + 1) +
          ' / ' +
          pad2(total) +
          '</span>'
        : '') +
      '<div class="hero__content">' +
      '<div class="container container--wide">' +
      '<div class="hero__panel">' +
      (slide.eyebrow ? '<p class="eyebrow hero__eyebrow">' + dom.esc(slide.eyebrow) + '</p>' : '') +
      titleMarkup(slide, isFirst) +
      (slide.text ? '<p class="hero__text">' + dom.esc(slide.text) + '</p>' : '') +
      actions(slide) +
      '</div>' +
      '</div>' +
      '</div>' +
      '</article>'
    );
  }

  function controls(total, showToggle) {
    var dots = MHR.banners
      .map(function (_, index) {
        return (
          '<button class="hero__dot' +
          (index === 0 ? ' is-active' : '') +
          '" type="button" data-hero-dot data-index="' +
          index +
          '" aria-label="Ir para o banner ' +
          (index + 1) +
          ' de ' +
          total +
          '"' +
          (index === 0 ? ' aria-current="true"' : '') +
          '></button>'
        );
      })
      .join('');

    var toggle = showToggle
      ? '<button class="hero__toggle" type="button" data-hero-toggle aria-pressed="true" aria-label="Alternar rotação automática dos banners" title="Pausar rotação"></button>'
      : '';

    return (
      '<div class="hero__ui">' +
      '<div class="container container--wide">' +
      '<div class="hero__ui-inner">' +
      '<div class="hero__nav-group">' +
      '<p class="hero__counter"><strong data-hero-current>01</strong> / ' +
      pad2(total) +
      '</p>' +
      '<div class="hero__dots" role="group" aria-label="Selecionar banner">' +
      dots +
      '</div>' +
      toggle +
      '</div>' +
      '<div class="hero__arrows">' +
      '<button class="hero__arrow" type="button" data-hero-prev aria-label="Banner anterior">' +
      icon('arrow-left') +
      '</button>' +
      '<button class="hero__arrow" type="button" data-hero-next aria-label="Próximo banner">' +
      icon('arrow-right') +
      '</button>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="hero__progress"><div class="hero__progress-bar" data-hero-progress></div></div>' +
      '</div>'
    );
  }

  function render() {
    var mount = dom.qs('[data-hero]');
    var banners = MHR.banners || [];
    if (!mount || !banners.length) return;

    mount.innerHTML =
      '<section class="hero" aria-roledescription="carrossel" aria-label="Destaques da MHR">' +
      '<div class="hero__viewport">' +
      '<div class="hero__track" data-hero-track>' +
      banners
        .map(function (slide, index) {
          return slideMarkup(slide, index, banners.length);
        })
        .join('') +
      '</div>' +
      '</div>' +
      controls(banners.length, banners.length > 1) +
      '</section>';
  }

  function init() {
    var root = dom.qs('[data-hero] .hero');
    if (!root) return;

    var slides = dom.qsa('[data-hero-slide]', root);
    var dots = dom.qsa('[data-hero-dot]', root);
    var counter = dom.qs('[data-hero-current]', root);
    var progress = dom.qs('[data-hero-progress]', root);
    var toggle = dom.qs('[data-hero-toggle]', root);
    var total = slides.length;
    var banners = MHR.banners || [];

    readConfig();

    /* `reduced` controla apenas a soletração. Com "reduzir animações" no
       sistema, o título é exibido completo — a menos que a soletração tenha
       sido forçada em data/site.js (respectReducedMotion: false). */
    var prefersReduced = dom.prefersReducedMotion();
    var reduced = prefersReduced && RESPECT_REDUCED_MOTION;

    if (prefersReduced && !RESPECT_REDUCED_MOTION) {
      document.documentElement.classList.add('has-forced-typing');
    }

    var canRotate = total > 1;
    /* Só o botão pausar/retomar interrompe a rotação. */
    var paused = false;

    /* Um controlador de soletração por banner (texto vindo de data/banners.js) */
    var typers = slides.map(function (slide, index) {
      return createTyper(dom.qs('[data-hero-type]', slide), banners[index] && banners[index].title);
    });

    var current = 0;
    var activeTyper = null;
    var letterTimer = null;
    var advanceTimer = null;
    var rafId = null;
    var progressElapsed = 0;
    var lastFrame = 0;
    var typingStart = 0;

    function focusables(slide) {
      return dom.qsa('a, button', slide);
    }

    function setInert(slide, inert) {
      if (inert) {
        slide.setAttribute('aria-hidden', 'true');
        if ('inert' in slide) slide.inert = true;
        focusables(slide).forEach(function (node) {
          node.setAttribute('tabindex', '-1');
        });
      } else {
        slide.removeAttribute('aria-hidden');
        if ('inert' in slide) slide.inert = false;
        focusables(slide).forEach(function (node) {
          node.removeAttribute('tabindex');
        });
      }
    }

    /* --- Controle de timers: no máximo um por vez ----------------------- */

    function clearTimers() {
      window.clearTimeout(letterTimer);
      window.clearTimeout(advanceTimer);
      letterTimer = null;
      advanceTimer = null;
    }

    function stopFrames() {
      if (rafId) window.cancelAnimationFrame(rafId);
      rafId = null;
      lastFrame = 0;
    }

    function stopCycle() {
      clearTimers();
      stopFrames();
    }

    function setProgress(ratio) {
      if (progress) progress.style.width = Math.max(0, Math.min(ratio, 1)) * 100 + '%';
    }

    function cycleDuration() {
      if (!activeTyper || !activeTyper.total) return FALLBACK_CYCLE_MS;
      return activeTyper.total * LETTER_DELAY + POST_TYPING_DELAY;
    }

    function animateProgress(frameTime) {
      rafId = null;
      if (paused) return;
      var now = typeof frameTime === 'number' ? frameTime : performance.now();
      if (lastFrame) progressElapsed += now - lastFrame;
      lastFrame = now;
      setProgress(progressElapsed / cycleDuration());
      rafId = window.requestAnimationFrame(animateProgress);
    }

    function scheduleAdvance() {
      advanceTimer = window.setTimeout(function () {
        advanceTimer = null;
        go(current + 1);
      }, POST_TYPING_DELAY);
    }

    /* Revela uma letra e agenda a próxima.
       O encadeamento é ancorado em horário absoluto (typingStart), então o
       atraso de cada setTimeout não se acumula: a soletração dura exatamente
       nº de caracteres × LETTER_DELAY. Ao terminar, agenda a troca. */
    function typeNext() {
      letterTimer = null;
      if (paused || !activeTyper) return;

      if (!activeTyper.next()) {
        scheduleAdvance();
        return;
      }

      var ideal = typingStart + (activeTyper.typedCount() + 1) * LETTER_DELAY;
      letterTimer = window.setTimeout(typeNext, Math.max(0, ideal - performance.now()));
    }

    /* --- Ciclo de vida de um banner ------------------------------------- */

    function startCycle() {
      stopCycle();
      progressElapsed = 0;
      lastFrame = 0;
      activeTyper = typers[current] || null;

      if (!activeTyper || !activeTyper.total) {
        setProgress(0);
        if (canRotate && !paused) scheduleAdvance();
        return;
      }

      /* Sem soletração em dois casos: movimento reduzido no sistema, ou
         carrossel pausado pelo visitante. Nos dois o título aparece completo
         — inclusive ao trocar de banner manualmente durante a pausa. */
      if (reduced || paused) {
        activeTyper.showAll();
        setProgress((current + 1) / total);
        if (canRotate && !paused) scheduleAdvance();
        return;
      }

      activeTyper.reset();
      setProgress(0);
      lastFrame = 0;
      typingStart = performance.now();
      rafId = window.requestAnimationFrame(animateProgress);
      letterTimer = window.setTimeout(typeNext, LETTER_DELAY);
    }

    function pauseCycle() {
      clearTimers();
      stopFrames();
    }

    function resumeCycle() {
      if (paused || !activeTyper) return;

      if (reduced) {
        setProgress((current + 1) / total);
        if (canRotate) scheduleAdvance();
        return;
      }

      /* Retoma de onde parou, mantendo a barra coerente com as letras já
         reveladas. */
      progressElapsed = activeTyper.typedCount() * LETTER_DELAY;
      lastFrame = 0;
      rafId = window.requestAnimationFrame(animateProgress);

      if (activeTyper.typedCount() < activeTyper.total) {
        /* Retoma a cadência como se não tivesse havido pausa. */
        typingStart = performance.now() - activeTyper.typedCount() * LETTER_DELAY;
        letterTimer = window.setTimeout(typeNext, LETTER_DELAY);
      } else {
        scheduleAdvance();
      }
    }

    function updateToggle() {
      if (!toggle) return;
      var running = canRotate && !paused;
      toggle.innerHTML = icon(running ? 'pause' : 'play');
      toggle.setAttribute('aria-pressed', running ? 'true' : 'false');
      toggle.setAttribute('title', running ? 'Pausar rotação' : 'Retomar rotação');
      toggle.classList.toggle('is-paused', !running);
    }

    /* Troca de banner com loop contínuo: depois do último volta ao primeiro.
       Cancela o ciclo anterior e reinicia a soletração do novo banner. */
    function go(index) {
      var next = ((index % total) + total) % total;

      stopCycle();

      /* Garante que nenhum banner fique com letras soltas na tela. */
      typers.forEach(function (typer) {
        if (typer) typer.reset();
      });

      slides.forEach(function (slide, i) {
        var isActive = i === next;
        slide.classList.toggle('is-active', isActive);
        setInert(slide, !isActive);
      });

      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === next);
        if (i === next) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });

      if (counter) counter.textContent = pad2(next + 1);

      current = next;
      startCycle();
    }

    /* Estado inicial */
    slides.forEach(function (slide, i) {
      var isActive = i === 0;
      slide.classList.toggle('is-active', isActive);
      setInert(slide, !isActive);
    });
    updateToggle();
    startCycle();

    /* Navegação manual: reinicia a soletração do banner escolhido */
    dom.on(dom.qs('[data-hero-prev]', root), 'click', function () {
      go(current - 1);
    });
    dom.on(dom.qs('[data-hero-next]', root), 'click', function () {
      go(current + 1);
    });

    dots.forEach(function (dot) {
      dom.on(dot, 'click', function () {
        go(parseInt(dot.getAttribute('data-index'), 10));
      });
    });

    /* Pausar / retomar (única forma de interromper a rotação).
       Ao pausar, a soletração do banner atual é concluída de imediato: o
       visitante não deve ficar com um título pela metade na tela. */
    dom.on(toggle, 'click', function () {
      paused = !paused;
      updateToggle();
      if (paused) {
        if (activeTyper && activeTyper.typedCount() < activeTyper.total) {
          activeTyper.showAll();
        }
        setProgress((current + 1) / total);
        pauseCycle();
      } else {
        resumeCycle();
      }
    });

    /* Teclado (quando o foco está nos controles do carrossel) */
    dom.on(root, 'keydown', function (event) {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        go(current + 1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        go(current - 1);
      }
    });

    /* Pausa apenas quando a aba está oculta */
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) pauseCycle();
      else if (!paused) resumeCycle();
    });

    /* Swipe (mobile) */
    var startX = 0;
    var deltaX = 0;
    dom.on(
      root,
      'touchstart',
      function (event) {
        startX = event.touches[0].clientX;
        deltaX = 0;
      },
      { passive: true }
    );
    dom.on(
      root,
      'touchmove',
      function (event) {
        deltaX = event.touches[0].clientX - startX;
      },
      { passive: true }
    );
    dom.on(root, 'touchend', function () {
      if (Math.abs(deltaX) < 45) return;
      go(deltaX < 0 ? current + 1 : current - 1);
    });
  }

  MHR.components = MHR.components || {};
  MHR.components.carousel = { render: render, init: init };
})((window.MHR = window.MHR || {}));
