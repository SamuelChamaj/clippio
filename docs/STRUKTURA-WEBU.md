# Štruktúra webu Clippio v4.7

Táto verzia je uprataná tak, aby sa v nej dalo orientovať aj po nahratí na GitHub.

## Hlavné HTML stránky

Sú v koreňovom priečinku, aby GitHub Pages bez problémov našiel `index.html`.

## Assets

- `assets/css/style.css` – hlavný dizajn webu
- `assets/js/main.js` – menu, cookies a dynamické portfólio
- `assets/images/hero/` – hlavný vizuál
- `assets/images/portfolio/` – ukážky práce
- `assets/images/services/` – obrázky služieb
- `assets/images/logos/` – logo Clippio
- `assets/icons/social/` – sociálne siete
- `favicon/` – favicon a apple-touch-icon

## Prečo nie spoločný navbar cez JS

Fungovalo by to na GitHub Pages, ale nie pri otvorení ZIPu cez `file://`. Preto je navbar/footer vložený priamo v HTML. Je to stabilnejšie riešenie pre čistý HTML web.
