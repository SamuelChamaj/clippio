import ParallaxDemo from '@/demos/default';

export default function Home() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'Clippio',
        url: 'https://clippio.sk',
        inLanguage: 'sk',
      },
      {
        '@type': 'Person',
        name: 'Samuel Chamaj',
        url: 'https://clippio.sk',
        email: 'info@clippio.sk',
        telephone: '+421951025596',
        jobTitle: 'Fotograf a tvorca vizuálneho obsahu',
        sameAs: [
          'https://www.youtube.com/@Clippio_sk',
          'https://www.instagram.com/clippio_sk/',
          'https://www.tiktok.com/@clippio.sk',
        ],
        knowsAbout: ['fotografia', 'video', 'dronové zábery', 'grafika'],
      },
    ],
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <ParallaxDemo />
    </main>
  );
}
