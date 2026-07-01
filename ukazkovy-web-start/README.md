# FreshCar Nitra – ukážkový web pre balík Štart

Toto je fiktívny jednostránkový web vytvorený ako ukážka pre balík Štart od Clippio.

## Čo web obsahuje

- modernú jednostránkovú prezentáciu malej lokálnej služby,
- hero sekciu s jasným CTA,
- služby s konkrétnymi bodmi,
- jednoduchý orientačný cenník,
- postup objednávky,
- sekciu o firme,
- jednoduchú ukážku výsledku pred/po,
- pre koho je balík vhodný,
- fiktívne referencie,
- FAQ sekciu,
- kontaktné údaje,
- dopytový formulár bez backendu,
- mobilné menu,
- základné SEO meta tagy,
- LocalBusiness structured data,
- robots.txt, sitemap.xml a favicon.svg.

## Ako web spustiť lokálne

Stačí otvoriť súbor `index.html` v prehliadači.

## Súbory na hosting

Na hosting treba nahrať:

- index.html
- style.css
- main.js
- robots.txt
- sitemap.xml
- favicon.svg

## Čo upraviť pri reálnom klientovi

- názov firmy,
- služby,
- ceny,
- kontaktné údaje,
- URL v canonical, Open Graph, sitemap.xml a robots.txt,
- texty v sekcii O firme,
- reálne fotky namiesto placeholderov,
- skutočné referencie,
- napojenie formulára na e-mail alebo formulárovú službu,
- meta robots z `noindex, follow` na `index, follow`.

## Poznámka k indexovaniu

Web je nastavený ako `noindex`, pretože ide o fiktívnu firmu. Pri reálnom klientovi treba web nastaviť na indexovanie a odoslať sitemap.xml do Google Search Console a Bing Webmaster Tools.

Indexovanie nie je okamžité ani garantované.

## Umiestnenie v Clippio

Ukážka je vložená na adrese `/ukazkovy-web-start/` a slúži ako príklad rozsahu balíka Štart. V ukážke je ponechané `noindex, follow`, pretože FreshCar Nitra je fiktívna firma.
