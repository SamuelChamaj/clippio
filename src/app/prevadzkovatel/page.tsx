import type { Metadata } from 'next';
import { LegalPage } from '@/components/ui/legal-page';

export const metadata: Metadata = {
  title: 'Prevádzkovateľ webu',
  description: 'Základné kontaktné údaje prevádzkovateľa webu Clippio.',
  alternates: { canonical: '/prevadzkovatel' },
};

export default function PrevadzkovatelPage() {
  return (
    <LegalPage
      eyebrow="Identifikačné údaje"
      title="Prevádzkovateľ webu"
      intro="Základné kontaktné údaje osoby zodpovednej za obsah a prevádzku webu Clippio."
      sections={[
        {
          title: 'Prevádzkovateľ',
          body: [
            'Meno: Samuel Chamaj',
            'Značka: Clippio',
          ],
        },
        {
          title: 'Kontakt',
          body: ['E-mail: info@clippio.sk', 'Telefón: +421 951 025 596'],
        },
      ]}
    />
  );
}
