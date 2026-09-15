import type { Metadata } from 'next';
import { LegalPage } from '@/components/ui/legal-page';

export const metadata: Metadata = {
  title: 'Ochrana osobných údajov',
  description: 'Informácie o spracúvaní osobných údajov na webovej stránke Clippio.',
  alternates: { canonical: '/ochrana-osobnych-udajov' },
};

export default function OchranaOsobnychUdajovPage() {
  return (
    <LegalPage
      eyebrow="Súkromie"
      title="Ochrana osobných údajov"
      intro="Toto je prehľad toho, aké údaje môže stránka spracúvať, keď ma kontaktuješ cez web."
      sections={[
        {
          title: 'Prevádzkovateľ osobných údajov',
          body:
            'Prevádzkovateľom osobných údajov je Samuel Chamaj / Clippio. Kontakt pre otázky a uplatnenie práv je info@clippio.sk alebo +421 951 025 596.',
        },
        {
          title: 'Aké údaje spracúvam',
          body:
            'Pri odoslaní kontaktného formulára môžem spracúvať meno alebo názov firmy, e-mail, telefón, vybranú službu a text správy. Pri bežnej návšteve webu sa môžu technicky spracúvať aj údaje potrebné na zobrazenie stránky, napríklad IP adresa a základné technické informácie prehliadača.',
        },
        {
          title: 'Právny základ a účel',
          body:
            'Údaje z formulára spracúvam na základe predzmluvnej komunikácie alebo oprávneného záujmu odpovedať na správu. Účelom je komunikácia so záujemcom, príprava ponuky a dohodnutie spolupráce.',
        },
        {
          title: 'Sprostredkovatelia a externé služby',
          body:
            'Kontaktný formulár je odosielaný cez službu Web3Forms. Na webe sa môžu načítavať obrázky alebo technický obsah z externých služieb, napríklad Google Drive, Unsplash alebo poskytovateľ hostingu.',
        },
        {
          title: 'Ako dlho údaje uchovávam',
          body:
            'Správy a kontaktné údaje uchovávam len tak dlho, ako je potrebné na vybavenie komunikácie, prípadne na ďalšiu dohodnutú spoluprácu.',
        },
        {
          title: 'Tvoje práva',
          body:
            'Môžeš ma požiadať o prístup k svojim údajom, opravu, vymazanie, obmedzenie spracúvania alebo namietať proti spracúvaniu. Stačí napísať na info@clippio.sk.',
        },
        {
          title: 'Sťažnosť na úrad',
          body:
            'Ak si myslíš, že s údajmi nie je nakladané správne, môžeš sa obrátiť na Úrad na ochranu osobných údajov Slovenskej republiky.',
        },
      ]}
    />
  );
}
