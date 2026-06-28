# Clippio web – v4.7

Statický HTML web pripravený pre GitHub Pages.

## Ako nahrať na GitHub

Nahraj obsah priečinka `clippio-main` priamo do rootu repozitára.
Správne:

```
index.html
sluzby.html
portfolio.html
assets/
favicon/
robots.txt
sitemap.xml
```

Nesprávne:

```
clippio-main/index.html
```

## Štruktúra

```
/
├── index.html
├── sluzby.html
├── portfolio.html
├── kontakt.html
├── weby.html
├── cookies.html
├── ochrana-osobnych-udajov.html
├── 404.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   ├── images/
│   │   ├── hero/
│   │   ├── portfolio/
│   │   ├── services/
│   │   ├── logos/
│   │   └── backgrounds/
│   └── icons/
│       └── social/
├── favicon/
├── data/
├── docs/
├── robots.txt
├── sitemap.xml
├── CNAME
└── .nojekyll
```

## Portfólio webov

Portfólio hotových webov je napojené na Google Spreadsheet. Nové weby dopĺňaj v tabuľke, nie priamo v HTML.

## Poznámka

Navbar a footer sú priamo v HTML, aby web fungoval aj pri otvorení zo ZIPu cez `file://`, nielen na GitHub Pages.


## v5.0.0 – čisté URL bez .html

Podstránky sú presunuté do priečinkov s vlastným `index.html`, napríklad:

- `sluzby/index.html` → `/sluzby/`
- `portfolio/index.html` → `/portfolio/`
- `kontakt/index.html` → `/kontakt/`

Staré `.html` súbory ostávajú len ako jednoduché presmerovania, aby staré odkazy nepadali na chybu.


## Nasadenie na GitHub Pages

Nahraj obsah priečinka `clippio-main` priamo do koreňa repozitára. Neuploaduj celý priečinok ako podpriečinok.

Správne:
- `index.html`
- `sluzby/index.html`
- `assets/css/style.css`

Nesprávne:
- `clippio-main/index.html`

Clean URL fungujú cez priečinky s `index.html`, napríklad `/sluzby/`.


## Clippio v5.1 – Trust & Conversion Update
- Pridané CTA prvky na zvýšenie počtu dopytov
- Pridaná sekcia Pre koho je Clippio
- Rozšírená dôveryhodnosť hlavnej stránky
- Pridané FAQ
- Pripravený dôkazový blok pre reálne a schválené recenzie
- Upravený text O Clippio
- Zlepšené texty pri formulári
- Pridané floating CTA


## Clippio v5.1.1 – Floating Smart CTA
- Smart floating CTA pridané na všetky stránky webu.
- Jemné upozornenie po 60 sekundách alebo po 70 % scrollu.
- CTA sa skryje pri vypĺňaní formulára na mobile a neprekrýva cookie banner.
- Kliknutie sa ukladá do localStorage.
