# Clippio Function Web

Táto verzia je vložená do hlavného webu Clippio ako samostatná ukážka na URL:

`/clippio-function-web/`

## Dôležité pre nasadenie

Koreňový `index.html` je upravená statická verzia z `dist/`, pripravená pre GitHub Pages v podpriečinku. Preto sa má na webe používať hlavne:

- `index.html`
- `assets/`
- `logo-clippio.png`

Zdrojový Vite/React projekt je ponechaný kvôli ďalším úpravám:

- `src/`
- `public/`
- `package.json`
- `package-lock.json`
- `.gitignore`
- `index.vite-source.html`
- `dist/`

Súbor `index.vite-source.html` je pôvodný Vite vstup. Neprepisuj ním koreňový `index.html`, lebo ten je deploy verzia pre Clippio.sk.

---

Samostatný React/Vite projekt, ktorý slúži ako katalóg webových funkcií, efektov, pozadí a obchodných sekcií použiteľných pri tvorbe webov od Clippio.

## Čo projekt ukazuje

- 55 promptových komponentov z priloženého `prompts.txt` spracovaných ako samostatné ukážkové karty.
- Prepínač pozadia, ktorý mení vzhľad celého webu, nie iba malého preview boxu.
- Katalóg funkcií s filtrovaním podľa typu: textové efekty, pozadia, interakcie, predajné sekcie, e-shop a prémiové efekty.
- Obchodný popis pri každej funkcii: čo robí, kde sa hodí a do akého balíka dáva zmysel.
- Ukážky predajných prvkov: FAQ, cenníkové karty, proces, mini e-shop / košík.
- Logo Clippio použité v hlavičke aj hero sekcii.

## Spustenie projektu

```bash
npm install
npm run dev
```

Lokálny server bude dostupný podľa výpisu Vite, typicky na adrese `http://localhost:5173`.

## Build

```bash
npm run build
```

Výsledok sa vytvorí do priečinka `dist/`.

## Závislosti

Projekt používa:

- React
- React DOM
- Vite

Ťažké knižnice z pôvodných promptov nie sú nasilu pridané do produkčného balíka. Efekty sú spracované ako ľahšie ukážkové varianty, aby stránka ostala použiteľná, rýchla a vhodná ako obchodná prezentácia funkcií.

## Poznámka k promptom

Priložené prompty boli použité ako zdroj funkcií a názvov komponentov. Nie sú vložené na stránku ako text ani ako technické zadanie. Stránka ukazuje výber funkcií obchodne zrozumiteľne pre klienta.

## Obchodná hranica

Táto stránka nie je sľub, že všetky funkcie sú automaticky v každom balíku. Konkrétny rozsah webu sa vyberá podľa cieľa projektu, rozpočtu a technickej náročnosti.
