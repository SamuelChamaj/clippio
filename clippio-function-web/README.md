# Clippio Function Web

Samostatný React/Vite projekt, ktorý slúži ako ukážkový web pre klientov Clippio. Nie je postavený ako suchý katalóg „naše funkcie“, ale ako funkčná stránka, kde sú efekty použité v reálnych sekciách: hero, výber pozadia, predajný blok, mini e-shop prvok, proces spolupráce a živé ukážky jednotlivých efektov.

## Čo je opravené vo verzii 2.0.0

- Prepínač pozadia mení vzhľad celej stránky, nie iba jedného preview boxu.
- Stránka používa 55/55 prvkov z priloženého súboru promptov ako živé ukážky.
- Každý prvok má krátky obchodný popis, kde sa hodí a do akého typu balíka patrí.
- Na stránke je jasne napísané, že nejde o kompletný zoznam všetkého, ale o výber použiteľných funkcií.
- Efekty sú zasadené do funkčného webu: hero, CTA, služby, proces, mini shop, bento sekcie a ukážkové karty.
- Nepoužíva sa text promptov ako obsah stránky. Prompty slúžili iba ako zdroj funkcií.

## Spustenie

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Hotový build je v priečinku `dist`.

## Štruktúra

```text
index.html
package.json
public/logo-clippio.png
src/main.jsx
src/App.jsx
src/styles/global.css
README.md
```

## Poznámka

Animácie sú spravené tak, aby projekt bežal bez ťažkých externých animačných knižníc. Cieľom je stabilný ukážkový web pripravený na ďalšie dopracovanie alebo vloženie do hlavného webu Clippio.

## Poznámka k nasadeniu v Clippio

V hlavnom projekte Clippio je súbor `index.html` pripravený ako deploy verzia pre `/clippio-function-web/`. Pôvodný Vite vstup je ponechaný ako `index.vite-source.html`, aby sa zdrojový projekt dal ďalej upravovať bez rozbitia GitHub Pages nasadenia.
