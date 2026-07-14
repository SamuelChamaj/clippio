(function () {
  'use strict';

  const packages = Object.freeze({
    start: Object.freeze({ name: 'Štart web', value: 199, display: 'od 199 €' }),
    business: Object.freeze({ name: 'Firemný web', value: 499, display: 'od 499 €' }),
    shop: Object.freeze({ name: 'E-shop', value: 999, display: 'od 999 €' })
  });

  window.CLIPPIO_PRICING = packages;

  function applyPrices() {
    document.querySelectorAll('[data-price-key]').forEach(function (element) {
      const price = packages[element.dataset.priceKey];
      if (!price) return;
      element.textContent = price.display;
      element.dataset.priceValue = String(price.value);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyPrices, { once: true });
  } else {
    applyPrices();
  }
})();
