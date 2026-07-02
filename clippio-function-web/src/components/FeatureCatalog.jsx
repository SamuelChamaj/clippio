import { useMemo, useState } from 'react';
import BlurText from './functions/BlurText.jsx';
import ShinyText from './functions/ShinyText.jsx';
import TextType from './functions/TextType.jsx';
import CircularText from './functions/CircularText.jsx';
import GradientText from './functions/GradientText.jsx';
import DecryptedText from './functions/DecryptedText.jsx';
import FuzzyText from './functions/FuzzyText.jsx';
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

const features = [
  {
    id: 'blur-title',
    category: 'text',
    premium: false,
    title: 'Rozmazaný text pri načítaní',
    description: 'Zvýrazní hlavný nadpis bez toho, aby stránka pôsobila lacno. Vhodné najmä na hero sekcie a landing pages.',
    use: 'hero sekcie, služby, portfólio',
    package: 'Rast / Predaj',
    demo: <BlurText text="Moderný prvý dojem bez preplácania" />
  },
  {
    id: 'typing-effect',
    category: 'text',
    premium: false,
    title: 'Písací efekt',
    description: 'Ukazuje viac benefitov na jednom mieste. Má zmysel len tam, kde text ostáva krátky a jasný.',
    use: 'hero, kampane, špecializované služby',
    package: 'Rast / Doplnková funkcia',
    demo: <TextType text={['weby pre firmy', 'predajné stránky', 'jednoduché e-shopy']} />
  },
  {
    id: 'shiny-text',
    category: 'text',
    premium: true,
    title: 'Lesklý text',
    description: 'Dodá prémiový akcent krátkej vete alebo CTA. Nepatrí na dlhé odseky, inak pôsobí rušivo.',
    use: 'nadpis, mikrocopy, CTA',
    package: 'Rast / Predaj',
    demo: <ShinyText text="Prémiový detail pre správne miesto" />
  },
  {
    id: 'gradient-text',
    category: 'text',
    premium: false,
    title: 'Gradientový text',
    description: 'Pomáha vytiahnuť dôležitú časť nadpisu. Lacný spôsob, ako pridať charakter bez ťažkej animácie.',
    use: 'nadpisy, benefit, cenové zvýraznenie',
    package: 'Štart / Rast',
    demo: <span>Funkcie, ktoré <GradientText>dávajú zmysel</GradientText></span>
  },
  {
    id: 'decrypted-text',
    category: 'text',
    premium: true,
    title: 'Dekódovací text',
    description: 'Technologický efekt pre značky, ktoré chcú pôsobiť digitálne. Nevhodné pre konzervatívne lokálne služby.',
    use: 'tech weby, AI, digitálne služby',
    package: 'Predaj / Doplnková funkcia',
    demo: <DecryptedText text="CLIPPIO WEB SYSTEM" />
  },
  {
    id: 'circular-text',
    category: 'text',
    premium: true,
    title: 'Kruhový text',
    description: 'Dekoratívny prvok pre portfólio alebo kreatívnu sekciu. Silný vizuálne, ale netreba ho tlačiť všade.',
    use: 'portfólio, badge, kreatívny detail',
    package: 'Doplnková funkcia',
    demo: <CircularText text="CLIPPIO*WEB*EFEKTY*" />
  },
  {
    id: 'fuzzy-text',
    category: 'text',
    premium: true,
    title: 'Fuzzy / glitch text',
    description: 'Efekt pre špecifický vizuálny štýl. Dobrý pre video, hudbu alebo tech, zlý pre seriózny remeselný web.',
    use: 'eventy, video, tech, špeciálne kampane',
    package: 'Doplnková funkcia',
    demo: <FuzzyText>GLITCH</FuzzyText>
  },
  {
    id: 'glass-card',
    category: 'background',
    premium: false,
    title: 'Glassmorphism karta',
    description: 'Moderný spôsob, ako oddeliť obsah od pozadia. Funguje dobre, keď sa použije striedmo.',
    use: 'hero, výhody, služby, referencie',
    package: 'Rast / Predaj',
    demo: <div className="demo-glass"><strong>Glass karta</strong><span>čistá vrstva nad pozadím</span></div>
  },
  {
    id: 'noise-overlay',
    category: 'background',
    premium: false,
    title: 'Jemný noise overlay',
    description: 'Odstráni sterilný AI vzhľad a dodá ploche textúru. Nesmie byť silný, inak pôsobí špinavo.',
    use: 'pozadia, hero, prémiové sekcie',
    package: 'Rast / Predaj',
    demo: <div className="demo-noise"><span>Subtílna textúra</span></div>
  },
  {
    id: 'image-hero',
    category: 'background',
    premium: false,
    title: 'Obrazové pozadie',
    description: 'Vhodné, keď má klient kvalitné fotky. Bez dobrých fotiek je to skôr riziko než výhoda.',
    use: 'svadby, eventy, gastro, produkty',
    package: 'Rast / Predaj',
    demo: <div className="demo-image-bg"><span>Foto sekcia</span></div>
  },
  {
    id: 'hover-card',
    category: 'interaction',
    premium: false,
    title: 'Hover efekt na kartách',
    description: 'Pomáha ukázať, že prvok je klikateľný alebo dôležitý. Nízky náklad, dobrý prínos.',
    use: 'portfólio, služby, balíky',
    package: 'Štart / Rast / Predaj',
    demo: <div className="demo-hover-card"><strong>Prejdi myšou</strong><span>jemný pohyb a tieň</span></div>
  },
  {
    id: 'filter-demo',
    category: 'interaction',
    premium: false,
    title: 'Filter kategórií',
    description: 'Dáva zmysel pri väčšom portfóliu alebo katalógu. Pri malom webe je to zbytočná komplikácia.',
    use: 'portfólio, blog, katalóg funkcií',
    package: 'Rast / Predaj',
    demo: <div className="demo-pills"><span>Video</span><span>Weby</span><span>Dron</span></div>
  },
  {
    id: 'faq',
    category: 'interaction',
    premium: false,
    title: 'FAQ accordion',
    description: 'Znižuje počet opakovaných otázok a pomáha klientovi rozhodnúť sa bez telefonátu.',
    use: 'služby, cenník, e-shop, dopytové weby',
    package: 'Rast / Predaj',
    demo: <FAQAccordion />
  },
  {
    id: 'pricing',
    category: 'sales',
    premium: false,
    title: 'Cenníkové karty',
    description: 'Pomáhajú návštevníkovi pochopiť rozdiel medzi rozsahmi. Musia mať hranice, inak lákajú klientov, ktorí chcú všetko zadarmo.',
    use: 'balíky, služby, porovnanie ponúk',
    package: 'Rast / Predaj',
    demo: <div className="demo-pricing"><span>Štart</span><strong>od 199 €</strong><small>základný rozsah</small></div>
  },
  {
    id: 'trust-count',
    category: 'sales',
    premium: false,
    title: 'Dôkaz dôvery / čísla',
    description: 'Krátke čísla zvyšujú dôveryhodnosť, ale len ak sú pravdivé. Vymyslené štatistiky sú lacný trik.',
    use: 'hero, o nás, predajné bloky',
    package: 'Štart / Rast / Predaj',
    demo: <div className="demo-stat"><strong><CountUp end={30} suffix="+" /></strong><span>realizácií / ukážok</span></div>
  },
  {
    id: 'process',
    category: 'sales',
    premium: false,
    title: 'Proces spolupráce',
    description: 'Znižuje neistotu klienta. Dobré najmä pri webových službách, kde klient nevie, čo presne ho čaká.',
    use: 'služby, web balíky, objednávkový proces',
    package: 'Rast / Predaj',
    demo: <div className="demo-steps"><span>1 Zadanie</span><span>2 Návrh</span><span>3 Web</span></div>
  },
  {
    id: 'product-card',
    category: 'eshop',
    premium: false,
    title: 'Produktová karta + mini košík',
    description: 'Ukáže základ predajného webu. Nie je to platobná brána, ale pomáha klientovi pochopiť nákupnú logiku.',
    use: 'jednoduchý e-shop, dopytový košík, produktové služby',
    package: 'Predaj',
    demo: <MiniShopDemo />
  },
  {
    id: 'premium-border',
    category: 'premium',
    premium: true,
    title: 'Glow / elektrický okraj',
    description: 'Dobré na jednu hlavné CTA alebo najdôležitejšiu kartu. Ak svieti všetko, nesvieti nič.',
    use: 'CTA, zvýraznený balík, hero karta',
    package: 'Predaj / Doplnková funkcia',
    demo: <div className="demo-glow-border"><span>Prémiový akcent</span></div>
  },
  {
    id: 'magnet-button',
    category: 'premium',
    premium: true,
    title: 'Magnetické tlačidlo',
    description: 'Interaktívny detail pre weby, kde záleží na prémiovom pocite. Pre lacný firemný web je to väčšinou zbytočné.',
    use: 'prémiové landing pages, portfólio, kreatívne štúdiá',
    package: 'Doplnková funkcia',
    demo: <button type="button" className="demo-magnet">Kontaktovať</button>
  },
  {
    id: 'liquid-panel',
    category: 'premium',
    premium: true,
    title: 'Liquid glass panel',
    description: 'Silný vizuálny efekt pre moderné značky. Má vyšší nárok na dizajn aj výkon, preto sa má používať opatrne.',
    use: 'hero, prémiové služby, tech weby',
    package: 'Predaj / Doplnková funkcia',
    demo: <div className="demo-liquid-panel"><span>Liquid Glass</span></div>
  }
];

function FeatureCard({ feature }) {
  return (
    <article className="feature-card">
      <div className="feature-card__demo">{feature.demo}</div>
      <div className="feature-card__content">
        <div className="feature-card__meta">
          <span>{filters.find((filter) => filter.id === feature.category)?.label}</span>
          {feature.premium && <span>prémiové</span>}
        </div>
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
        <dl>
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

  return (
    <section className="section" id="funkcie">
      <div className="section-heading">
        <span className="eyebrow">Katalóg funkcií</span>
        <h2>Ukážky prvkov, ktoré sa dajú vybrať podľa cieľa webu.</h2>
        <p>
          Efekty sú rozdelené podľa použitia. Pointa nie je použiť všetko. Pointa je vybrať minimum prvkov s najvyšším obchodným prínosom.
        </p>
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
