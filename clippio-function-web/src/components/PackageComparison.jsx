const packages = [
  {
    name: 'Štart',
    description: 'Jednoduchý web bez zbytočnej technickej záťaže.',
    items: ['čisté pozadie', 'základné CTA', 'kontaktná sekcia', 'jemné animácie']
  },
  {
    name: 'Rast',
    description: 'Lepší prvý dojem a viac sekcií pre dôveru.',
    items: ['animovaný hero', 'glass karty', 'referencie', 'FAQ a proces']
  },
  {
    name: 'Predaj',
    description: 'Web zameraný na konverzie, produkty alebo dopyty.',
    items: ['produktové karty', 'predajné CTA', 'mini košík', 'optimalizované texty']
  }
];

export default function PackageComparison() {
  return (
    <section className="section muted-section" id="vyber">
      <div className="section-heading">
        <span className="eyebrow">Ako si vybrať funkcie</span>
        <h2>Najlacnejšia funkcia je tá, ktorú netreba robiť.</h2>
        <p>
          Dobrý web nie je zoznam efektov. Je to výber prvkov, ktoré majú dôvod. Tu je praktické delenie podľa cieľa projektu.
        </p>
      </div>
      <div className="package-grid">
        {packages.map((item) => (
          <article className="package-card" key={item.name}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <ul>
              {item.items.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
