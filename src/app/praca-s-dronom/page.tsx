import type { Metadata } from 'next';
import { ServicePage } from '@/components/ui/service-page';

export const metadata: Metadata = {
  title: 'Práca s dronom',
  description: 'Letecké fotografie a dronové video pre nehnuteľnosti, prevádzky, udalosti a promo obsah. Základný balík od 120 €.',
  alternates: { canonical: '/praca-s-dronom' },
  openGraph: {
    title: 'Práca s dronom | Clippio',
    description: 'Letecké fotografie a video, ktoré ukážu miesto, udalosť alebo projekt z novej perspektívy.',
    url: '/praca-s-dronom',
  },
};

export default function PracaSDronomPage() {
  return (
    <ServicePage
      title="Práca s dronom"
      eyebrow="Dron"
      lead="Letecké zábery, ktoré ukážu priestor, udalosť alebo projekt v širšom kontexte a s jasným vizuálnym účinkom."
      description="Dronové fotografie a video doplnia prezentáciu nehnuteľnosti, prevádzky, podujatia alebo značky. Každé natáčanie sa plánuje podľa lokality, počasia a pravidiel bezpečnej prevádzky."
      heroImage="/api/portfolio/image/1X3XziwE0JnXpb9oJ9qUuWmYVwdqLWMYx"
      price="od 120 €"
      priceLabel="Základný balík"
      priceNote="Jedna lokalita a jednoduchý rozsah leteckých záberov. Cena sa môže meniť podľa podmienok, presunov a potrebných povolení."
      deliverables={[
        'letecké fotografie alebo krátke videozábery',
        'základné farebné spracovanie vybraných výstupov',
        'formát vhodný pre web a sociálne siete',
        'kontrola podmienok a uskutočniteľnosti letu',
      ]}
      idealFor={[
        'nehnuteľnosti a ubytovanie',
        'prevádzky, areály a stavby',
        'podujatia a športové aktivity',
        'promo a prezentačné videá',
      ]}
      steps={[
        { title: 'Lokalita', text: 'Overíme miesto, účel záberov a predpokladané podmienky letu.' },
        { title: 'Plán', text: 'Dohodneme si hlavné pohyby kamery, čas a požadované výstupy.' },
        { title: 'Realizácia', text: 'Zábery vzniknú iba pri vhodných a bezpečných podmienkach.' },
        { title: 'Spracovanie', text: 'Vybrané fotografie alebo videoklipy farebne zjednotím a pripravím na použitie.' },
      ]}
      faq={[
        { question: 'Dá sa lietať na každom mieste?', answer: 'Nie vždy. Možnosť letu závisí od vzdušného priestoru, charakteru lokality, ľudí v okolí a aktuálnych podmienok.' },
        { question: 'Čo ak je zlé počasie?', answer: 'Pri silnom vetre, daždi alebo iných nevhodných podmienkach sa termín presunie. Bezpečnosť a kvalita záberov majú prednosť.' },
        { question: 'Môžu byť dronové zábery súčasťou videa?', answer: 'Áno. Dron sa dá spojiť s klasickým natáčaním a vytvoriť jeden ucelený výstup.' },
      ]}
      serviceType="Letecké fotografovanie a video"
    />
  );
}
