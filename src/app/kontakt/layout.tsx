import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Kontaktujte Samuela Chamaja / Clippio telefonicky, e-mailom alebo cez kontaktný formulár.',
  alternates: { canonical: '/kontakt' },
  openGraph: {
    title: 'Kontakt | Clippio',
    description: 'Dohodnite si fotenie, natáčanie videa, dronové zábery alebo obsah pre značku.',
    url: '/kontakt',
  },
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
