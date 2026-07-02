const backgrounds = [
  {
    id: 'clean-light',
    name: 'Clean Light',
    fit: 'jednoduché firemné weby',
    mood: 'čistý, ľahký a prehľadný dojem'
  },
  {
    id: 'dark-premium',
    name: 'Dark Premium',
    fit: 'prémiové služby, video, eventy a tech',
    mood: 'tmavší, drahší a výraznejší prvý dojem'
  },
  {
    id: 'liquid-glass',
    name: 'Liquid Glass',
    fit: 'moderné značky, štúdiá a kreatívne weby',
    mood: 'jemný glassmorphism bez zbytočného chaosu'
  },
  {
    id: 'blue-gradient',
    name: 'Blue Gradient',
    fit: 'online služby, softvér a technologické riešenia',
    mood: 'moderný digitálny charakter'
  },
  {
    id: 'warm-accent',
    name: 'Warm Accent',
    fit: 'osobnejšie značky a lokálne služby',
    mood: 'prístupnejší, mäkší a menej technický vzhľad'
  },
  {
    id: 'image-background',
    name: 'Image Background',
    fit: 'eventy, portfóliá, gastro a produktové značky',
    mood: 'vizuálne silnejšia sekcia s priestorom pre fotku'
  }
];

export default function BackgroundSelector({ activeBackground, setActiveBackground }) {
  const current = backgrounds.find((item) => item.id === activeBackground) ?? backgrounds[0];

  return (
    <section className="section" id="pozadia">
      <div className="section-heading">
        <span className="eyebrow">Výber pozadia</span>
        <h2>Pozadie nemá byť dekorácia. Má podporiť značku.</h2>
        <p>
          Prepínač ukazuje, ako sa mení dojem z rovnakej sekcie podľa vizuálneho štýlu. Toto je presne vec, ktorú treba vyberať podľa cieľa webu, nie podľa nálady.
        </p>
      </div>

      <div className="background-layout">
        <div className="background-tabs" role="tablist" aria-label="Typy pozadia">
          {backgrounds.map((background) => (
            <button
              className={background.id === activeBackground ? 'tab is-active' : 'tab'}
              type="button"
              onClick={() => setActiveBackground(background.id)}
              key={background.id}
            >
              <span>{background.name}</span>
              <small>{background.fit}</small>
            </button>
          ))}
        </div>

        <div className={`background-preview preview-${activeBackground}`}>
          <div className="preview-orb" />
          <div className="preview-card">
            <span className="eyebrow">Aktívny štýl</span>
            <h3>{current.name}</h3>
            <p><strong>Kde sa hodí:</strong> {current.fit}.</p>
            <p><strong>Dojem:</strong> {current.mood}.</p>
            <button type="button" className="button button-light">Ukážkové CTA</button>
          </div>
        </div>
      </div>
    </section>
  );
}
