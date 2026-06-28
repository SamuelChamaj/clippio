# Clippio web – v6.0.6

Statický HTML web pre **Clippio** pripravený na GitHub Pages. Verzia v6.x vychádza z funkčného základu **v5.1.1** a pridáva kontrolovaný Brand Book positioning bez rozbitia pôvodných napojení a funkcií.

## Hlavný positioning

Clippio je slovenské kreatívne štúdio pre profesionálnu digitálnu prezentáciu firiem a značiek.

Hlavný obchodný pilier:
- tvorba profesionálnych firemných webov.

Podporné služby:
- fotografia,
- video produkcia,
- grafický dizajn,
- dronové zábery,
- marketingový obsah.

Tieto služby nemajú pôsobiť ako nesúvisiace ponuky. Ich cieľ je podporiť dôveryhodnú prezentáciu klienta na webe, sociálnych sieťach a v online komunikácii.

## Stav verzie

Aktuálna verzia: **v6.0.6 – ďakovacie okno po odoslaní dopytu**

Obsahovo vychádza z:
- **v6.0.0** – Brand Book positioning update,
- **v6.0.1** – oprava portfólia, cenníka a balíkov,
- **v6.0.2** – rozšírenie webových balíkov a O Clippio,
- **v6.0.3** – oprava layoutu balíkov, väčšie medzery a detailnejší opis balíkov,
- **v6.0.4** – oprava dokumentácie,
- **v6.0.6** – doplnené viditeľné ďakovacie okno po úspešnom odoslaní dopytu.
- **v6.0.5** – oprava správania formulára po odoslaní dopytu.

Verzia **v6.0.6** dopĺňa jasné ďakovacie okno po úspešnom odoslaní dopytu. Formulár ostáva odosielaný cez Web3Forms bez presmerovania na technickú Web3Forms stránku a zároveň má záložnú stránku `/dakujeme/` pre prípad vypnutého JavaScriptu.

## Zachované funkcie

- statický web vhodný pre GitHub Pages,
- čisté URL cez priečinky s `index.html`,
- staré `.html` adresy ponechané ako presmerovania,
- Web3Forms kontaktné formuláre s lokálnou úspešnou/chybovou hláškou,
- floating Smart CTA,
- cookie banner,
- FAQ bloky,
- napojenie noviniek na Google Spreadsheet,
- napojenie cenníka fotiek na Google Spreadsheet,
- napojenie portfólia hotových webov na Google Spreadsheet,
- lokálne fallback dáta pre dynamické bloky,
- sitemap, robots, favicon, Open Graph a základné SEO prvky.

## Najdôležitejšie stránky

- `/` – homepage
- `/sluzby/` – služby
- `/weby/` – tvorba webov a webové balíky
- `/portfolio/` – portfólio a externé prekliky
- `/cennik/` – orientačný cenník a dopytové CTA
- `/o-clippio/` – informácie o Clippio
- `/kontakt/` – kontaktný formulár
- `/dakujeme/` – záložná ďakovacia stránka po odoslaní formulára
- `/cookies/` – cookies
- `/ochrana-osobnych-udajov/` – ochrana osobných údajov

Staré adresy ako `sluzby.html`, `portfolio.html`, `kontakt.html` ostávajú v projekte kvôli presmerovaniu a spätnej kompatibilite.

## Webové balíky

Stránka `/weby/` obsahuje tri hlavné balíky:

### Štart

Pre živnostníka, jednoduchú službu alebo prvú online prezentáciu.

Typicky obsahuje:
- jednu hlavnú stránku alebo landing page,
- základné predstavenie firmy alebo služby,
- niekoľko doplnkových sekcií,
- kontaktné CTA alebo jednoduchý formulár,
- responzívny dizajn,
- základnú technickú a SEO prípravu.

### Rast

Najvýhodnejší balík pre väčšinu lokálnych firiem, remesiel a rastúcich značiek.

Typicky obsahuje:
- 3–6 podstránok podľa rozsahu,
- služby, o firme, realizácie alebo portfólio a kontakt,
- texty upravené na dôveru a dopyt,
- kontaktný formulár, sociálne siete a telefonický kontakt,
- favicon, sitemap, robots a technickú prípravu,
- možnosť prepojenia na YouTube, Google Drive alebo živé realizácie.

### Predaj / e-shop

Pre menší e-shop, katalóg, objednávky, rezervácie alebo predajný web.

Typicky obsahuje:
- štruktúru produktov alebo služieb,
- kategórie a detail produktu alebo služby,
- jasné CTA na objednávku alebo dopyt,
- objednávkový, rezervačný alebo dopytový formulár,
- základné obchodné podstránky,
- technickú prípravu na analytiku a ďalšie rozšírenie.

Platobná brána, sklad, účtovníctvo a automatizácie sa naceňujú osobitne podľa konkrétneho systému.

## Dôležité obchodné pravidlá

Pri webových projektoch sa používa jasne ohraničený proces:

- úvodná konzultácia,
- návrh smerovania,
- vizuálny koncept homepage pri kvalifikovanom projekte,
- klikateľný prototyp v dohodnutom rozsahu,
- vývoj webu,
- kontrola a schválenie,
- platba po schválení hotového webu v dohodnutom rozsahu,
- spustenie,
- 6-mesačná záruka na dodanú funkčnosť.

Dôležité: tieto výhody neznamenajú neobmedzené úpravy, nové sekcie zadarmo alebo neustále prerábanie smerovania projektu. Rozsah musí byť vždy dohodnutý dopredu.

## Štruktúra projektu

```txt
/
├── index.html
├── sluzby/
│   └── index.html
├── portfolio/
│   └── index.html
├── kontakt/
│   └── index.html
├── weby/
│   └── index.html
├── cennik/
│   └── index.html
├── o-clippio/
│   └── index.html
├── cookies/
│   └── index.html
├── ochrana-osobnych-udajov/
│   └── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   ├── images/
│   └── icons/
├── favicon/
├── data/
├── docs/
├── robots.txt
├── sitemap.xml
├── CNAME
└── .nojekyll
```

## Nasadenie na GitHub Pages

Nahraj obsah priečinka `clippio-main` priamo do koreňa repozitára.

Správne:

```txt
index.html
sluzby/index.html
portfolio/index.html
assets/css/style.css
assets/js/main.js
robots.txt
sitemap.xml
CNAME
.nojekyll
```

Nesprávne:

```txt
clippio-main/index.html
clippio-main/sluzby/index.html
```

Na GitHub Pages musí byť obsah priečinka `clippio-main` v roote repozitára, nie vložený ako ďalší podpriečinok.

## Poznámky k úpravám

- Navbar a footer sú priamo v HTML, aby web fungoval aj pri otvorení zo ZIPu cez `file://`.
- Pri úpravách textov treba zachovať positioning: web ako hlavný pilier, ostatné kreatívne služby ako podpora digitálnej prezentácie.
- Nepoužívať interné vety určené pre vývojára v texte pre návštevníka.
- Nepoužívať falošné recenzie, vymyslené čísla ani náhodné vizuály ako klientsku prácu.
- Cenník a dynamické bloky musia zostať napojené na existujúci JavaScript a spreadsheet/fallback systém.

## Changelog

### v6.0.4 – README fix

- Aktualizovaný hlavný `README.md`, ktorý predtým zostal pri starom označení v4.7/v5.1.1.
- Doplnený aktuálny popis verzie v6.x, štruktúry, balíkov, napojení a nasadenia.
- Bez zásahu do funkcií webu.

### v6.0.3 – Package detail and layout fix

- Opravený prekrytý badge „Najvýhodnejšie“ v balíku Rast.
- Zväčšená medzera medzi spoločným základom webových balíkov a kartami balíkov.
- Rozšírený opis balíkov Štart, Rast a Predaj na stránke Tvorba webov aj v cenníku.
- Rozšírená sekcia O Clippio na homepage a stránke O Clippio.
- Zachované existujúce napojenia, formuláre, cookie banner a floating CTA.

### v6.0.2 – finálny obsahový patch

- Rozšírené webové balíky na stránke Tvorba webov aj v cenníku.
- Balík Rast doplnený ako profesionálny firemný web s konkrétnym rozsahom.
- Balík Predaj jasnejšie označený ako objednávkový web / menší e-shop.
- Stránka O Clippio doplnená o viac kontextu, prístup a dôvody spolupráce.
- Zachované existujúce napojenia, formuláre, cookie banner, floating CTA a lokálna štruktúra URL.

### v6.0.1 – oprava portfólia, cenníka a balíkov

- Zvýraznený YouTube blok ako jasný preklik na YouTube portfólio.
- Doplnený preklik na Google Drive s grafikou v portfóliu.
- Odstránené návštevnícky nevhodné interné vysvetlenie pri hotových weboch.
- Rozšírený cenník o viac informácií, priame CTA na dopyt a jasnejšie vysvetlenie cien.
- Skrátené a skompaktnené webové balíky, aby karty nepôsobili zbytočne roztiahnuto.
- Zachované napojenia, formuláre, cookie banner, floating CTA a existujúce sekcie.

### v6.0.0 – Controlled Brand Book positioning update

- Základ ponechaný na funkčnej verzii v5.1.1.
- Homepage prepracovaná podľa Brand Book positioningu.
- Profesionálna digitálna prezentácia nastavená ako hlavný výsledok.
- Web nastavený ako hlavný komerčný pilier.
- Foto, video, grafika a dron nastavené ako podpora webu a značky.
- Zachované pôvodné funkčné moduly.
- Webové balíky rozšírené na Štart, Rast a Predaj/e-shop.
- Recenzie nahradené pripraveným dôkazovým blokom bez falošných hodnotení.
- Portfólio prepracované na reálne projekty a overiteľné odkazy.

### v5.1.1 – Floating Smart CTA

- Smart floating CTA pridané na všetky stránky webu.
- Jemné upozornenie po 60 sekundách alebo po 70 % scrollu.
- CTA sa skryje pri vypĺňaní formulára na mobile a neprekrýva cookie banner.
- Kliknutie sa ukladá do localStorage.

### v5.1 – Trust & Conversion Update

- Pridané CTA prvky na zvýšenie počtu dopytov.
- Pridaná sekcia Pre koho je Clippio.
- Rozšírená dôveryhodnosť hlavnej stránky.
- Pridané FAQ.
- Pripravený dôkazový blok pre reálne a schválené recenzie.
- Upravený text O Clippio.
- Zlepšené texty pri formulári.

### v5.0.1

- Opravené načítanie CSS, JavaScriptu, obrázkov a favicon pri čistých URL typu `/sluzby/`.
- Všetky interné odkazy a asset cesty zmenené na root-relative tvar pre GitHub Pages.
- Staré `.html` stránky ponechané ako presmerovania na nové URL.

### v5.0.0

- Podstránky sú presunuté do priečinkov s `index.html`, aby URL fungovali bez `.html`.
- Interné odkazy, canonical URL a sitemap boli upravené na čisté URL.
- Staré `.html` adresy ostávajú ako presmerovania na nové čisté URL.
