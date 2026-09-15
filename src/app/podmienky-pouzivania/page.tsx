import type { Metadata } from 'next';
import { LegalPage } from '@/components/ui/legal-page';

export const metadata: Metadata = {
  title: 'Podmienky používania',
  description: 'Základné podmienky používania webu a kontaktovania Clippio.',
  alternates: { canonical: '/podmienky-pouzivania' },
};

export default function PodmienkyPouzivaniaPage() {
  return (
    <LegalPage
      eyebrow="Podmienky"
      title="Podmienky používania"
      intro="Základné informácie k používaniu tejto stránky a obsahu, ktorý sa na nej nachádza."
      sections={[
        {
          title: 'Obsah stránky',
          body:
            'Texty, grafika, fotografie, videá a ukážky prác na stránke slúžia na prezentáciu tvorby značky Clippio a nesmú sa kopírovať bez súhlasu.',
        },
        {
          title: 'Kontaktný formulár',
          body:
            'Formulár slúži na nezáväzný kontakt. Odoslaním formulára nevzniká automaticky objednávka ani zmluvný vzťah.',
        },
        {
          title: 'Objednávky a ceny',
          body:
            'Web neslúži ako e-shop a neumožňuje priamu platbu ani záväzné online objednanie služby. Uvedené ceny sú orientačné ceny základného rozsahu. Presná cena, termín a podmienky spolupráce sa potvrdia individuálne pred začatím práce.',
        },
        {
          title: 'Dostupnosť stránky',
          body:
            'Snažím sa, aby web fungoval správne, no stránka môže byť občas dočasne nedostupná alebo upravená bez predchádzajúceho upozornenia.',
        },
        {
          title: 'Kontakt',
          body:
            'Ak máš otázku k obsahu stránky alebo k týmto podmienkam, napíš na info@clippio.sk alebo zavolaj na +421 951 025 596.',
        },
      ]}
    />
  );
}
