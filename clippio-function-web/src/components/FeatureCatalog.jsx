import { useMemo, useState } from 'react';
import CountUp from './functions/CountUp.jsx';
import FAQAccordion from './FAQAccordion.jsx';
import MiniShopDemo from './MiniShopDemo.jsx';

const filters = [
  { id: 'all', label: 'Všetko' },
  { id: 'text', label: 'Textové efekty' },
  { id: 'background', label: 'Pozadia' },
  { id: 'interaction', label: 'Interakcie' },
  { id: 'sales', label: 'Predajné sekcie' },
  { id: 'eshop', label: 'E-shop' },
  { id: 'premium', label: 'Prémiové efekty' }
];

const promptFeatures = [
  ['BlurText', 'text', false, 'Rozmazaný text pri načítaní', 'Zvýrazní hlavný nadpis bez kriku. Dobré pre prvý dojem, ak je použitý iba na krátky text.', 'hero, nadpis sekcie, landing page', 'Rast / Predaj'],
  ['SplitText', 'text', true, 'Rozdelený text po znakoch', 'Dodá nadpisu pohyb a prémiový rytmus. Pri dlhých vetách je to už skôr vizuálny hluk.', 'hero nadpis, kampaň, portfólio', 'Predaj / Doplnková funkcia'],
  ['CircularText', 'text', true, 'Kruhový text / badge', 'Dekoratívny prvok pre kreatívny web. Nepredáva sám, ale vie vytvoriť zapamätateľný detail.', 'badge, portfólio, hero doplnok', 'Doplnková funkcia'],
  ['TextType', 'text', false, 'Písací text', 'Vie ukázať viac použití jednej služby na jednom riadku. Funguje len pri krátkych slovách.', 'hero, služby, kampane', 'Rast / Predaj'],
  ['ShinyText', 'text', true, 'Lesklý text', 'Prémiový akcent na jednu vetu alebo CTA. Ak sa použije všade, okamžite pôsobí lacno.', 'CTA, claim, zvýraznenie benefitu', 'Rast / Predaj'],
  ['TextPressure', 'text', true, 'Interaktívny tlakový text', 'Výrazný efekt pre kreatívne alebo technologické značky. Pre bežný remeselný web je to zbytočné.', 'kreatívny hero, event, tech stránka', 'Doplnková funkcia'],
  ['CurvedLoop', 'text', true, 'Zakrivený bežiaci text', 'Dynamická páska pre atmosféru. Má zmysel ako doplnok, nie ako hlavný nosič informácie.', 'event web, portfólio, kreatívny blok', 'Doplnková funkcia'],
  ['FuzzyText', 'text', true, 'Fuzzy / glitch text', 'Štýlový efekt pre video, hudbu alebo tech. Pri serióznych lokálnych službách je to väčšinou mimo.', 'video, event, tech, špeciálna kampaň', 'Doplnková funkcia'],
  ['GradientText', 'text', false, 'Gradientový text', 'Lacný spôsob, ako vytiahnuť najdôležitejšie slovo v nadpise bez ťažkej animácie.', 'nadpisy, benefit, cenové zvýraznenie', 'Štart / Rast'],
  ['DecryptedText', 'text', true, 'Dekódovací text', 'Digitálny efekt pre AI, IT alebo moderné služby. Nevhodný pre konzervatívny web.', 'tech web, AI, digitálne služby', 'Predaj / Doplnková funkcia'],
  ['TrueFocus', 'text', true, 'Zameranie na slovo', 'Pomáha nasmerovať pozornosť na konkrétnu hodnotu. Použiť iba na kľúčové slová.', 'hero claim, benefit, proces', 'Rast / Predaj'],
  ['ScrollFloat', 'text', true, 'Plávajúci text pri scrollovaní', 'Dodá stránke hĺbku. Musí byť jemný, inak znižuje čitateľnosť.', 'dlhšie landing pages, prémiové sekcie', 'Predaj / Doplnková funkcia'],
  ['RotatingText', 'text', false, 'Rotujúce slová', 'Rýchlo ukáže viac ponúk alebo cieľoviek. Riziko je, že používateľ nestihne čítať.', 'hero, služby, segmenty klientov', 'Rast / Predaj'],
  ['ScrollVelocity', 'text', true, 'Text s rýchlosťou podľa scrollu', 'Efekt pre energické weby. Hodí sa skôr na vizuálny dôraz než na dôležitý obsah.', 'event, fashion, video, kreatívne štúdio', 'Doplnková funkcia'],
  ['VariableProximity', 'text', true, 'Text reagujúci na blízkosť kurzora', 'Interaktívny detail, ktorý zvyšuje pocit kvality. ROI má len pri prémiovejšom webe.', 'prémiové hero, portfólio, tech', 'Predaj / Doplnková funkcia'],
  ['CountUp', 'sales', false, 'Animované číslo', 'Rýchlo vytiahne dôkaz dôvery. Použiteľné iba s pravdivými číslami, inak škodí dôveryhodnosti.', 'referencie, výsledky, štatistiky', 'Štart / Rast / Predaj'],
  ['CountUp KPI', 'sales', false, 'Animované KPI číslo', 'Druhá varianta počítadla pre percentá, čas alebo kapacitu. Dobré na jasne merateľné výsledky.', 'výsledky kampane, kapacita, garancia rozsahu', 'Rast / Predaj'],
  ['ElectricBorder', 'premium', true, 'Elektrický okraj', 'Silné zvýraznenie jednej karty alebo CTA. Ak svieti všetko, nič nie je dôležité.', 'CTA, hlavný balík, tech sekcia', 'Predaj / Doplnková funkcia'],
  ['GlareHover', 'interaction', true, 'Lesk pri hoveri', 'Ukáže, že karta je interaktívna. Dobrý detail pre portfólio a produktové karty.', 'karty služieb, portfólio, produkt', 'Rast / Predaj'],
  ['LogoLoop', 'sales', false, 'Slučka log partnerov', 'Buduje dôveru, ale iba keď sú logá reálne. Falošné logá sú okamžitý problém.', 'partneri, klienti, použité nástroje', 'Rast / Predaj'],
  ['TargetCursor', 'interaction', true, 'Cieľový kurzor', 'Prémiový kurzor pre špeciálne weby. Na bežnom firemnom webe môže byť zbytočný.', 'kreatívne weby, portfólio, event', 'Doplnková funkcia'],
  ['GradualBlur', 'background', false, 'Postupný blur prechod', 'Zjemní prechod medzi sekciami alebo textom a pozadím. Nízky rizikový doplnok.', 'hero, obrázkové sekcie, overlay', 'Rast / Predaj'],
  ['ClickSpark', 'interaction', true, 'Iskra po kliknutí', 'Mikrointerakcia, ktorá pridá hravosť. Použiť len pri značke, kde hravosť sedí.', 'CTA, hravý web, kreatívna značka', 'Doplnková funkcia'],
  ['Magnet', 'interaction', true, 'Magnetické tlačidlo', 'Tlačidlo pôsobí drahšie, ale nesmie zhoršiť použiteľnosť na mobile.', 'CTA, navigácia, hero', 'Doplnková funkcia'],
  ['Strands', 'background', true, 'Vlákna v pozadí', 'Abstraktné pozadie pre moderný web. Vyžaduje kontrolu výkonu.', 'tech, AI, kreatívne štúdio', 'Predaj / Doplnková funkcia'],
  ['StickerPeel', 'interaction', true, 'Odlepenie nálepky', 'Hravý efekt pre promo prvok alebo zľavu. Nie je vhodný pre seriózny cenník.', 'promo, zľava, produktový detail', 'Doplnková funkcia'],
  ['Cubes', 'background', true, '3D kocky', 'Technologický vizuál pre pozadie alebo sekciu. Použiť v malom rozsahu.', 'tech web, AI, produktový web', 'Predaj / Doplnková funkcia'],
  ['MetallicPaint', 'premium', true, 'Metalický náter', 'Luxusný vizuálny efekt. Hodí sa len tam, kde značka unesie výrazný štýl.', 'premium značka, event, fashion, tech', 'Doplnková funkcia'],
  ['Noise', 'background', false, 'Jemný šum', 'Odstráni sterilný AI vzhľad a pridá textúru. Musí zostať subtílny.', 'pozadia, hero, prémiové sekcie', 'Štart / Rast / Predaj'],
  ['ShapeBlur', 'background', true, 'Rozmazané tvary', 'Moderné pozadie bez nutnosti fotiek. Dobrý kompromis medzi dizajnom a výkonom.', 'hero, služby, landing page', 'Rast / Predaj'],
  ['ImageTrail', 'interaction', true, 'Stopa obrázkov za kurzorom', 'Efektné pre portfólio, ale nie pre informačný web. Vyššia vizuálna hlučnosť.', 'portfólio, galéria, event', 'Doplnková funkcia'],
  ['MetaBalls', 'background', true, 'Metaballs objekty', 'Organický pohyb v pozadí. Vhodný pre moderné a kreatívne značky.', 'hero pozadie, tech, kreatíva', 'Predaj / Doplnková funkcia'],
  ['StarBorder', 'premium', true, 'Hviezdny okraj', 'Dekoratívne zvýraznenie jedného prvku. Pri nesprávnom použití pôsobí detsky.', 'CTA, badge, zvýraznený balík', 'Doplnková funkcia'],
  ['ScrollStack', 'interaction', true, 'Stack kariet pri scrollovaní', 'Pomáha rozprávať príbeh po krokoch. Výborné pre proces alebo výhody.', 'proces, služby, case study', 'Predaj'],
  ['MagicBento', 'sales', true, 'Magic Bento rozloženie', 'Silná sekcia pre výhody, funkcie alebo služby. Vyzerá drahšie než obyčajný zoznam.', 'benefity, služby, funkcie', 'Rast / Predaj'],
  ['Stack', 'interaction', false, 'Stack kariet', 'Jednoduché vrstvenie kariet. Dobrý vizuálny spôsob, ako ukázať viac blokov bez chaosu.', 'benefity, proces, portfólio', 'Rast / Predaj'],
  ['FluidGlass', 'premium', true, 'Fluid glass efekt', 'Moderný glassmorphism s pohybom. Dobrý pre Clippio štýl, ale netreba ním preliať celý web.', 'hero, prémiová karta, tech sekcia', 'Predaj / Doplnková funkcia'],
  ['TiltedCard', 'interaction', false, 'Naklonená karta', 'Karta reaguje na hover a pôsobí živšie. Nízky náklad, dobrý detail.', 'portfólio, služby, produkt', 'Rast / Predaj'],
  ['Masonry', 'sales', false, 'Masonry galéria', 'Dobré pre portfólio s rôznymi veľkosťami fotiek. Bez dobrého obsahu nemá zmysel.', 'portfólio, galéria, referencie', 'Rast / Predaj'],
  ['Folder', 'interaction', false, 'Priečinok / súbory', 'Vizualizuje dokumenty alebo balíky. Hodí sa pri procesoch a odovzdávaní materiálov.', 'proces, dokumenty, klientská zóna', 'Rast / Predaj'],
  ['StaggeredMenu', 'interaction', true, 'Staggered menu', 'Navigácia s postupným nástupom. Dáva zmysel pri väčšom webe, nie pri jednej stránke.', 'viacstránkový web, prémiové menu', 'Predaj / Doplnková funkcia'],
  ['ProfileCard', 'sales', false, 'Profilová karta', 'Zvyšuje osobnú dôveru. Dobré pre freelancera, tím alebo lokálnu službu.', 'o mne, tím, kontakt', 'Štart / Rast / Predaj'],
  ['Dock', 'interaction', true, 'Dock navigácia', 'Rýchla spodná navigácia pre moderný web. Treba opatrne, aby nekolidovala s CTA.', 'mobilné CTA, aplikácia, portfólio', 'Doplnková funkcia'],
  ['GooeyNav', 'interaction', true, 'Gooey navigácia', 'Hravá navigácia s plynulým prechodom. Vhodná len pre značky s odvážnejším štýlom.', 'kreatívny web, event, portfolio', 'Doplnková funkcia'],
  ['SpotlightCard', 'interaction', false, 'Spotlight karta', 'Nasvieti dôležitú kartu pri hoveri. Dobrý prvok pre balíky alebo výhody.', 'cenník, služby, benefity', 'Rast / Predaj'],
  ['BorderGlow', 'premium', true, 'Glow okraj', 'Jemnejšia alternatíva elektrického okraja. Najlepšia na jednu prioritnú kartu.', 'CTA, cenník, hero panel', 'Rast / Predaj'],
  ['CardSwap', 'interaction', true, 'Výmena kariet', 'Interaktívne porovnanie alebo ukážka variantov. Dáva zmysel pri viac možnostiach.', 'balíky, pred/po, varianty služby', 'Predaj / Doplnková funkcia'],
  ['GlassIcons', 'sales', false, 'Glass ikony', 'Dobre zjednodušia benefitové bloky. Lacnejšie a čistejšie než veľké ilustrácie.', 'benefity, služby, proces', 'Štart / Rast / Predaj'],
  ['InfiniteMenu', 'interaction', true, 'Nekonečné menu', 'Efekt pre veľké portfólio alebo galériu. Pri malom obsahu je to zbytočný cirkus.', 'portfólio, galéria, katalóg', 'Doplnková funkcia'],
  ['Stepper', 'sales', false, 'Krokový proces', 'Jedna z najpraktickejších funkcií. Znižuje chaos pri objednávke alebo spolupráci.', 'objednávka, onboarding, formulár', 'Rast / Predaj'],
  ['Ferrofluid', 'background', true, 'Ferrofluid pozadie', 'Silný organický efekt. Vizuálne dobrý, ale výkonovo ho treba držať v malej ploche.', 'tech, premium, hero vizuál', 'Doplnková funkcia'],
  ['LineWaves', 'background', true, 'Vlnové línie', 'Elegantné pozadie s menším rizikom než ťažké 3D efekty. Dobré pre moderný web.', 'hero, sekcie, tech služby', 'Rast / Predaj'],
  ['GridDistortion', 'background', true, 'Deformovaná mriežka', 'Vizuálny efekt pre tech alebo produkt. Použiť len tam, kde podporuje značku.', 'tech, AI, digitálny produkt', 'Doplnková funkcia'],
  ['PrismaticBurst', 'premium', true, 'Prizmatický výbuch', 'Veľmi výrazný efekt. Má zmysel ako hero wow prvok, nie ako opakujúca sa dekorácia.', 'kampaň, event, premium hero', 'Doplnková funkcia'],
  ['LiquidChrome', 'premium', true, 'Liquid chrome', 'Najvýraznejší vizuálny efekt zo zoznamu. Predáva pocit, ale potrebuje silnú kontrolu výkonu.', 'premium značka, tech, kreatívna prezentácia', 'Doplnková funkcia']
];

const extraFeatures = [
  ['FAQAccordion', 'sales', false, 'FAQ accordion', 'Znižuje počet opakovaných otázok a pomáha klientovi rozhodnúť sa bez telefonátu.', 'služby, cenník, e-shop, dopyt', 'Rast / Predaj'],
  ['PricingCards', 'sales', false, 'Cenníkové karty', 'Pomáhajú vysvetliť rozdiel medzi balíkmi. Musia mať hranice, inak klient čaká všetko v cene.', 'balíky, služby, porovnanie', 'Rast / Predaj'],
  ['MiniCart', 'eshop', false, 'Produktová karta + mini košík', 'Ukáže nákupnú logiku bez platobnej brány. Dobré pre klienta, ktorý ešte len testuje predaj.', 'jednoduchý e-shop, dopytový košík', 'Predaj']
];

const features = [...promptFeatures, ...extraFeatures].map(([component, category, premium, title, description, use, packageLevel], index) => ({
  id: `${component.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index}`,
  component,
  category,
  premium,
  title,
  description,
  use,
  package: packageLevel,
  fromPrompt: index < promptFeatures.length
}));

function DemoPreview({ name }) {
  if (name === 'FAQAccordion') return <FAQAccordion />;
  if (name === 'MiniCart') return <MiniShopDemo />;
  if (name === 'PricingCards') {
    return <div className="demo-pricing"><span>Rast</span><strong>od 499 €</strong><small>najlepší pomer cena / výkon</small></div>;
  }
  if (name === 'CountUp') return <div className="demo-stat"><strong><CountUp end={30} suffix="+" /></strong><span>realizácií / ukážok</span></div>;
  if (name === 'CountUp KPI') return <div className="demo-stat"><strong><CountUp end={87} suffix="%" /></strong><span>jasnejší výber balíka</span></div>;

  const safeName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const label = name.replace(' KPI', '');

  switch (name) {
    case 'BlurText':
      return <div className="fx-split fx-blur-demo">{'CLIPPIO'.split('').map((l, i) => <span style={{ '--i': i }} key={i}>{l}</span>)}</div>;
    case 'SplitText':
      return <div className="fx-split">{'SPLIT TEXT'.split('').map((l, i) => <span style={{ '--i': i }} key={i}>{l === ' ' ? '\u00a0' : l}</span>)}</div>;
    case 'CircularText':
      return <div className="fx-circle-text"><span>CLIPPIO • WEB • FUNKCIE •</span><b>C</b></div>;
    case 'TextType':
      return <div className="fx-typewriter">web pre firmy<span /></div>;
    case 'ShinyText':
      return <div className="fx-shiny-text">Premium detail</div>;
    case 'TextPressure':
      return <div className="fx-pressure">PRESSURE</div>;
    case 'CurvedLoop':
      return <div className="fx-curved"><span>CLIPPIO • FUNKCIE • EFEKTY •</span></div>;
    case 'FuzzyText':
      return <div className="fx-fuzzy-word">GLITCH</div>;
    case 'GradientText':
      return <div className="fx-gradient-word">Gradient text</div>;
    case 'DecryptedText':
      return <div className="fx-decrypt">C1IPP10 WEB</div>;
    case 'TrueFocus':
      return <div className="fx-focus"><span>web</span><span>ktorý</span><strong>predáva</strong></div>;
    case 'ScrollFloat':
      return <div className="fx-float"><span>Float</span><span>Cards</span><span>Text</span></div>;
    case 'RotatingText':
      return <div className="fx-rotating"><span>firmy</span><span>e-shopy</span><span>portfóliá</span></div>;
    case 'ScrollVelocity':
      return <div className="fx-velocity"><span>RÝCHLY DOJEM • SILNÝ HERO • </span></div>;
    case 'VariableProximity':
      return <div className="fx-proximity">PROXIMITY</div>;
    case 'ElectricBorder':
      return <div className="fx-box fx-electric">Electric</div>;
    case 'GlareHover':
      return <div className="fx-box fx-glare">Glare hover</div>;
    case 'LogoLoop':
      return <div className="fx-logo-loop"><span>C</span><span>WEB</span><span>AI</span><span>SEO</span></div>;
    case 'TargetCursor':
      return <div className="fx-target"><span>+</span><button type="button">CTA</button></div>;
    case 'GradualBlur':
      return <div className="fx-box fx-gradual-blur">Gradual blur</div>;
    case 'ClickSpark':
      return <div className="fx-box fx-spark">Click spark</div>;
    case 'Magnet':
      return <button type="button" className="demo-magnet">Magnet CTA</button>;
    case 'Strands':
      return <div className="fx-strands"><i /><i /><i /><i /></div>;
    case 'StickerPeel':
      return <div className="fx-sticker">-20%</div>;
    case 'Cubes':
      return <div className="fx-cubes">{Array.from({ length: 9 }).map((_, i) => <span key={i} />)}</div>;
    case 'MetallicPaint':
      return <div className="fx-metallic">Metallic</div>;
    case 'Noise':
      return <div className="demo-noise"><span>Subtílna textúra</span></div>;
    case 'ShapeBlur':
      return <div className="fx-shape-blur"><span /><span /><b>Blur</b></div>;
    case 'ImageTrail':
      return <div className="fx-image-trail"><span /><span /><span /><b>Trail</b></div>;
    case 'MetaBalls':
      return <div className="fx-metaballs"><span /><span /><span /></div>;
    case 'StarBorder':
      return <div className="fx-box fx-star">Star border</div>;
    case 'ScrollStack':
      return <div className="fx-stack"><span>01</span><span>02</span><span>03</span></div>;
    case 'MagicBento':
      return <div className="fx-bento"><span /><span /><span /><span /></div>;
    case 'Stack':
      return <div className="fx-card-stack"><span /><span /><span /></div>;
    case 'FluidGlass':
      return <div className="demo-liquid-panel"><span>Fluid Glass</span></div>;
    case 'TiltedCard':
      return <div className="fx-tilt">Tilt card</div>;
    case 'Masonry':
      return <div className="fx-masonry"><span /><span /><span /><span /><span /></div>;
    case 'Folder':
      return <div className="fx-folder"><span>brief.pdf</span><span>logo.png</span></div>;
    case 'StaggeredMenu':
      return <div className="fx-menu"><span>Domov</span><span>Služby</span><span>Kontakt</span></div>;
    case 'ProfileCard':
      return <div className="fx-profile"><b>C</b><span>Clippio</span><small>web / video / dron</small></div>;
    case 'Dock':
      return <div className="fx-dock"><span>⌂</span><span>✦</span><span>✉</span></div>;
    case 'GooeyNav':
      return <div className="fx-gooey"><span>Weby</span><span>Video</span><span>Dron</span></div>;
    case 'SpotlightCard':
      return <div className="fx-box fx-spotlight">Spotlight</div>;
    case 'BorderGlow':
      return <div className="demo-glow-border"><span>Glow border</span></div>;
    case 'CardSwap':
      return <div className="fx-swap"><span>Štart</span><span>Rast</span><span>Predaj</span></div>;
    case 'GlassIcons':
      return <div className="fx-icons"><span>✓</span><span>↗</span><span>✦</span><span>€</span></div>;
    case 'InfiniteMenu':
      return <div className="fx-infinite"><span>01</span><span>02</span><span>03</span><span>04</span></div>;
    case 'Stepper':
      return <div className="demo-steps"><span>1 Zadanie</span><span>2 Návrh</span><span>3 Web</span></div>;
    case 'Ferrofluid':
      return <div className="fx-ferro"><span /></div>;
    case 'LineWaves':
      return <div className="fx-waves"><i /><i /><i /></div>;
    case 'GridDistortion':
      return <div className="fx-grid-distortion">Grid</div>;
    case 'PrismaticBurst':
      return <div className="fx-prism"><span /></div>;
    case 'LiquidChrome':
      return <div className="fx-chrome">Liquid Chrome</div>;
    default:
      return <div className={`fx-generic fx-${safeName}`}>{label}</div>;
  }
}

function FeatureCard({ feature }) {
  return (
    <article className="feature-card">
      <div className="feature-card__demo"><DemoPreview name={feature.component} /></div>
      <div className="feature-card__content">
        <div className="feature-card__meta">
          <span>{filters.find((filter) => filter.id === feature.category)?.label}</span>
          {feature.premium && <span>prémiové</span>}
          {feature.fromPrompt && <span>z prompts.txt</span>}
        </div>
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
        <dl>
          <div>
            <dt>Komponent / funkcia</dt>
            <dd>{feature.component}</dd>
          </div>
          <div>
            <dt>Vhodné pre</dt>
            <dd>{feature.use}</dd>
          </div>
          <div>
            <dt>Balík</dt>
            <dd>{feature.package}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

export default function FeatureCatalog() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredFeatures = useMemo(() => {
    if (activeFilter === 'all') return features;
    if (activeFilter === 'premium') return features.filter((feature) => feature.premium);
    return features.filter((feature) => feature.category === activeFilter);
  }, [activeFilter]);

  const promptCount = features.filter((feature) => feature.fromPrompt).length;

  return (
    <section className="section" id="funkcie">
      <div className="section-heading section-heading--wide">
        <span className="eyebrow">Katalóg funkcií</span>
        <h2>Všetky položky z prompts.txt sú teraz v katalógu.</h2>
        <p>
          Je tu {promptCount} ukážok z priloženého súboru plus obchodné sekcie pre cenník, FAQ a mini e-shop. Nie je cieľ použiť všetko naraz. Cieľ je vybrať minimum prvkov s najvyšším prínosom pre konkrétny web.
        </p>
        <div className="catalog-audit" aria-label="Kontrola zapracovania promptov">
          <strong>{promptCount}/55</strong>
          <span>promptových komponentov zapracovaných ako samostatné karty</span>
        </div>
      </div>

      <div className="filter-bar" role="tablist" aria-label="Filter funkcií">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={activeFilter === filter.id ? 'filter-button is-active' : 'filter-button'}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="feature-grid">
        {filteredFeatures.map((feature) => (
          <FeatureCard feature={feature} key={feature.id} />
        ))}
      </div>
    </section>
  );
}
