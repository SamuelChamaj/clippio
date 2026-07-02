# Clippio Function Web

Táto ukážka je vložená do hlavného webu Clippio ako samostatná podstránka:

`/clippio-function-web/`

## Dôležité

V koreňovom súbore `index.html` je nasadená statická verzia pripravená pre GitHub Pages.
Preto sa má na webe používať tento súbor:

- `index.html`
- `assets/`
- `logo-clippio.png`

Zdrojový Vite/React projekt je ponechaný v priečinku kvôli ďalším úpravám:

- `src/`
- `public/`
- `package.json`
- `package-lock.json`
- `.gitignore`
- `index.vite-source.html`
- `dist/`

Súbor `index.vite-source.html` je pôvodný Vite vstupný HTML súbor. Nie je pomenovaný ako `index.html`, aby neprepísal funkčnú statickú verziu pre GitHub Pages.

## Lokálne spustenie zdrojovej verzie

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
