# Clippio web – v7.0.0

Statický HTML, CSS a JavaScript web pre **Clippio**, pripravený na priame nasadenie cez GitHub Pages. Verzia 7 prináša nový light-premium technologický dizajn v bielej, modrej a fialovej, novú informačnú architektúru a samostatnú stránku pre e-shopy bez migrácie na framework.

## Značka a hlavné služby

Clippio je menšie slovenské kreatívne a technologické štúdio zo Zlatých Moraviec. Za značkou stojí Samuel Chamaj.

Hlavné obchodné služby:

- tvorba webových stránok,
- tvorba jednoduchých e-shopov a objednávkových webov,
- firemné a promo videá.

Fotografia, grafika, dronové zábery a obsah z akcií zostávajú doplnkové služby.

## Webové balíky

Základné ceny sa spravujú v `assets/js/pricing.js` a používajú sa vo Web Finderi aj pomocníkovi Clippi. SEO text a structured data obsahujú rovnaké statické hodnoty, aby boli ceny dostupné aj bez JavaScriptu.

- **Štart web – od 199 €**: jedna hlavná stránka alebo menší landing page s pripravenými základnými podkladmi.
- **Firemný web – od 499 €**: niekoľko podstránok pre služby, informácie o firme, realizácie alebo portfólio a kontakt.
- **E-shop – od 999 €**: základný menší e-shop, katalóg alebo objednávkové riešenie s jasne dohodnutým rozsahom.

Ceny „od“ neznamenajú neobmedzené podstránky, úpravy, obsah, produkty ani komplikované integrácie.

## Informačná architektúra

- `/` – homepage a hlavný konverzný funnel,
- `/weby/` – Štart web a Firemný web,
- `/eshopy/` – jednoduché e-shopy a objednávkové weby,
- `/tvorba-videi/` – firemné, promo, produktové a krátke video,
- `/portfolio/` – klientské, vlastné, modelové a experimentálne projekty,
- `/cennik/` – webové a kreatívne ceny, doplnkové práce a dynamický cenník fotografií,
- `/o-clippio/` – Samuel Chamaj, positioning a spôsob práce,
- `/kontakt/` – Web3Forms dopyt a priame kontakty,
- `/sluzby/` – hlavné a doplnkové služby,
- `/web-finder/` – riadené odporúčanie webového rozsahu,
- `/cookies/` a `/ochrana-osobnych-udajov/` – právne informácie,
- `/dakujeme/` a `/404.html` – systémové stránky.

Pôvodné detailné URL pre video, fotografiu, grafiku, dron a osobné udalosti zostali zachované.

## Portfólio

- **RCHbau.sk** – reálny klientsky web,
- **Clippio.sk** – vlastný projekt,
- **MP Store Servis & Shop** – grafické a obsahové výstupy,
- **FreshCar Nitra** – modelový Štart web,
- **STAVEXON** – fiktívny modelový Firemný web,
- **Saténové ruže Liora** – modelový e-shop,
- **Clippio Function Web** – experimentálna ukážka funkcií.

Modelové projekty sa nesmú prezentovať ako klientské realizácie.

## Zachované funkcie

- čisté priečinkové URL a kompatibilita s GitHub Pages,
- Web3Forms formuláre s honeypotom, lokálnou validáciou, úspešným dialógom a chybovým stavom,
- Clippi Light Helper a jeho Web3Forms dopyt,
- Web Finder s automatickým prechodom, cenovým odhadom, kopírovaním výsledku a formulárom,
- Google Sheets CMS pre dostupnosť, CTA, homepage oznam a novinky,
- Google Sheets pre dynamický cenník vytlačených fotografií,
- Google Sheets pre dynamický zoznam webových projektov,
- lokálne fallback dáta pre dynamické bloky,
- cookie consent a analytické meranie aktivované iba po súhlase,
- meranie CTA, Web Finderu, Clippiho a formulárov bez odosielania osobných údajov,
- FAQ, canonical tagy, Open Graph, JSON-LD, sitemap, robots a `llms.txt`.

## Google Sheets

Homepage CMS používa publikovaný CSV zdroj:

`https://docs.google.com/spreadsheets/d/e/2PACX-1vQypNgFRbB3PsaKHmxL4wfWYFu_kh8eR6U2wkwr0b-qOJzLwKeIn-vySWHU4MY1nIGe3twrqZ7nqd6Q/pub?output=csv`

Podporované nastavenia zahŕňajú dostupnosť, hlavné CTA, plávajúce CTA, homepage oznam a novinky. Samostatné existujúce spreadsheet zdroje zostávajú použité pre cenník fotografií a portfólio webov.

## Frontend

- `assets/css/style.css` – pôvodný funkčný základ a komponenty,
- `assets/css/redesign.css` – v7 dizajnový systém a responzívne prepisy,
- `assets/css/clippi.css` – Clippi helper,
- `assets/css/web-finder-redesign.css` – Web Finder,
- `assets/js/pricing.js` – centrálne webové ceny,
- `assets/js/main.js` – navigácia, CMS, consent, formuláre, FAQ, meranie a Web Finder,
- `assets/js/clippi-config.js` a `assets/js/clippi.js` – konfigurácia a správanie Clippiho.

Animácie používajú iba CSS a malý IntersectionObserver. Režim `prefers-reduced-motion` zobrazí obsah bez pohybových efektov.

## Nasadenie

Obsah projektu patrí priamo do koreňa GitHub Pages repozitára:

```text
index.html
eshopy/index.html
weby/index.html
assets/css/redesign.css
assets/js/main.js
robots.txt
sitemap.xml
CNAME
```

Nepoužíva sa build krok ani serverová runtime závislosť.
