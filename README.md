# Clippio static website

Framework-free website (HTML, CSS, JavaScript) for GitHub Pages.

## Portfólio z Google Drive

Galéria na `/portfolio/` vie brať fotky priamo z Drive priečinka.

1. Návod: `scripts/README.md`
2. Kód pre Google Apps Script: `scripts/drive-portfolio.gs`
3. Konfigurácia URL: `data/portfolio-config.json` → pole `driveListUrl`

Kým `driveListUrl` nie je vyplnené, použije sa lokálny `data/portfolio-page.json`.

## Štruktúra

- `index.html` — homepage
- `portfolio/`, `kontakt/`, … — stránky s čistými URL
- `assets/css/`, `assets/js/`, `assets/images/`
- `data/` — JSON pre galériu a upozornenia
- `scripts/` — generovanie zoznamu z Drive

## GitHub Pages

Publikuj z koreňa repozitára. Folder pages majú adresy typu `/portfolio/`.
