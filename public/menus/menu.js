/* ============================================================
   Cardápio digital — interações (categorias + carrinho)
   ============================================================ */
(function () {
  'use strict';

  var cart = [];
  var brand = document.body.dataset.brand || 'Cardápio';
  var whatsapp = document.body.dataset.whatsapp || '5500900000000';

  /* ---------------------------------------------------- categorias */
  var chips = Array.prototype.slice.call(document.querySelectorAll('[data-cat]'));
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var target = document.getElementById(chip.dataset.cat);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  var blocks = Array.prototype.slice.call(document.querySelectorAll('[data-block]'));
  if ('IntersectionObserver' in window && blocks.length) {
    var byId = {};
    chips.forEach(function (c) { byId[c.dataset.cat] = c; });
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          chips.forEach(function (c) { c.classList.remove('is-active'); });
          var chip = byId[entry.target.id];
          if (chip) chip.classList.add('is-active');
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    blocks.forEach(function (b) { observer.observe(b); });
  }

  /* ------------------------------------------------------ carrinho */
  var cartEl = document.getElementById('cart');
  var overlay = document.getElementById('cartOverlay');
  var listEl = document.getElementById('cartList');
  var totalEl = document.getElementById('cartTotal');
  var countEls = Array.prototype.slice.call(document.querySelectorAll('[data-cart-count]'));

  function money(value) {
    return 'R$ ' + value.toFixed(2).replace('.', ',');
  }

  function openCart() {
    cartEl.classList.add('is-open');
    overlay.classList.add('is-open');
  }
  function closeCart() {
    cartEl.classList.remove('is-open');
    overlay.classList.remove('is-open');
  }

  function render() {
    var total = cart.reduce(function (sum, item) { return sum + item.price * item.qty; }, 0);
    var count = cart.reduce(function (sum, item) { return sum + item.qty; }, 0);
    countEls.forEach(function (el) { el.textContent = count; });

    if (!cart.length) {
      listEl.innerHTML = '<p class="cart__empty">Seu carrinho está vazio. Escolha seus favoritos e monte o pedido.</p>';
    } else {
      listEl.innerHTML = cart
        .map(function (item) {
          return (
            '<div class="cart__row">' +
            '<div><div class="cart__row-name">' + item.name + '</div>' +
            '<div class="cart__row-price">' + money(item.price) + '</div></div>' +
            '<div class="cart__qty">' +
            '<button data-dec="' + item.name + '" aria-label="Menos">−</button>' +
            '<span>' + item.qty + '</span>' +
            '<button data-inc="' + item.name + '" aria-label="Mais">+</button>' +
            '</div></div>'
          );
        })
        .join('');
    }

    totalEl.textContent = money(total);
  }

  function add(name, price) {
    var existing = cart.find(function (item) { return item.name === name; });
    if (existing) existing.qty += 1;
    else cart.push({ name: name, price: price, qty: 1 });
    render();
  }

  document.addEventListener('click', function (event) {
    var addBtn = event.target.closest('[data-add]');
    if (addBtn) {
      add(addBtn.dataset.name, parseFloat(addBtn.dataset.price));
      openCart();
      return;
    }
    var inc = event.target.closest('[data-inc]');
    if (inc) {
      var i = cart.find(function (x) { return x.name === inc.dataset.inc; });
      if (i) i.qty += 1;
      render();
      return;
    }
    var dec = event.target.closest('[data-dec]');
    if (dec) {
      var j = cart.findIndex(function (x) { return x.name === dec.dataset.dec; });
      if (j > -1) {
        cart[j].qty -= 1;
        if (cart[j].qty <= 0) cart.splice(j, 1);
      }
      render();
    }
  });

  document.querySelectorAll('[data-open-cart]').forEach(function (b) { b.addEventListener('click', openCart); });
  document.querySelectorAll('[data-close-cart]').forEach(function (b) { b.addEventListener('click', closeCart); });
  overlay.addEventListener('click', closeCart);

  var send = document.getElementById('cartSend');
  send.addEventListener('click', function () {
    if (!cart.length) return;
    var lines = cart.map(function (item) {
      return '• ' + item.qty + 'x ' + item.name + ' — ' + money(item.price * item.qty);
    });
    var text = 'Olá, ' + brand + '! Gostaria de fazer o seguinte pedido:\n\n' + lines.join('\n') +
      '\n\nTotal: ' + totalEl.textContent;
    window.open('https://wa.me/' + whatsapp + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
  });

  render();
})();
