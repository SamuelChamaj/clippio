# Clippio

Minimalna React/TypeScript stranka pre podnikanie, pripravena na GitHub Pages.

## Spustenie

```bash
npm install
npm run dev
```

Produkčný build:

```bash
npm run build
```

## GitHub Pages

Repo obsahuje workflow `.github/workflows/ci.yml`. Po pushi do vetvy `main` sa stranka zbuildi a nahra na GitHub Pages. V nastaveniach repozitara zapni Pages cez **Settings -> Pages -> Source -> GitHub Actions**.

## Struktura

- `src/App.tsx` - obsah stranky.
- `src/styles.css` - Tailwind vstup aj vlastne styly.
- `components/ui/parallax-scrolling.tsx` - shadcn-kompatibilny hero komponent.
- `index.html` a `vite.config.ts` - minimalny Vite build pre GitHub Pages.

## Uprava obsahu

Najrychlejsie upravis texty v `src/App.tsx`. Kontakt je teraz nastaveny na:

```bash
hello@clippio.sk
```

Zmen ho na svoj realny email alebo formular.
