import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://clippio.sk'),
  title: {
    default: 'Clippio | Fotografie, video a dronové zábery',
    template: '%s | Clippio',
  },
  description: 'Samuel Chamaj tvorí fotografie, videá, dronové zábery a vizuálny obsah pre ľudí, projekty a značky.',
  keywords: ['fotograf', 'natáčanie videí', 'dronové zábery', 'grafika', 'Clippio', 'Samuel Chamaj'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'sk_SK',
    siteName: 'Clippio',
    title: 'Clippio | Fotografie, video a dronové zábery',
    description: 'Fotografie, videá a vizuálny obsah s prirodzeným a moderným výsledkom.',
    url: '/',
    images: [{ url: '/assets/clippio-logo.png', width: 256, height: 256, alt: 'Clippio' }],
  },
  twitter: {
    card: 'summary',
    title: 'Clippio | Fotografie, video a dronové zábery',
    description: 'Fotografie, videá a vizuálny obsah s prirodzeným a moderným výsledkom.',
    images: ['/assets/clippio-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/assets/clippio-logo.png',
    apple: '/assets/clippio-logo.png',
  },
};

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body className="antialiased">
        <a className="skip-link" href="#main-content">
          Preskočiť na obsah
        </a>
        {children}
      </body>
    </html>
  );
}
