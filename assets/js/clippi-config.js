(function(){
  window.CLIPPIO_CONFIG = {
    version: '6.6.0',
    webFinderUrl: '/web-finder/',
    contactUrl: '/kontakt/',
    web3Forms: {
      endpoint: 'https://api.web3forms.com/submit',
      accessKey: '87c05461-c84f-4b0a-bcfc-83cd027dcc90',
      subject: 'Nový dopyt cez Clippiho'
    },
    storage: {
      state: 'clippi_state_v1',
      service: 'clippi_service',
      goal: 'clippi_goal',
      budget: 'clippi_budget',
      source: 'clippi_source'
    },
    categories: [
      'Webové stránky',
      'Video tvorba',
      'Fotografovanie',
      'Dron zábery',
      'Grafika',
      'Kombinácia služieb',
      'Neviem presne, čo potrebujem'
    ],
    intro: 'Pomôžem vám vybrať službu, ktorá dáva pre váš projekt najväčší zmysel.',
    firstQuestion: {
      id: 'main_service',
      text: 'Čo chcete vyriešiť?',
      options: [
        { label: 'Potrebujem web', service: 'web', webFinder: true },
        { label: 'Potrebujem video', service: 'video' },
        { label: 'Potrebujem fotky', service: 'photo' },
        { label: 'Potrebujem dron zábery', service: 'drone' },
        { label: 'Potrebujem grafiku', service: 'graphics' },
        { label: 'Neviem presne', service: 'unknown' },
        { label: 'Chcem kombináciu služieb', service: 'combo' }
      ]
    },
    services: {
      web: {
        label: 'Webové stránky',
        questions: [
          {
            id: 'web_status',
            text: 'Máte už web?',
            options: ['Nie, web ešte nemám', 'Áno, ale je zastaraný', 'Áno, ale nefunguje mi dobre', 'Áno, chcem len úpravy']
          },
          {
            id: 'web_goal',
            text: 'Čo má web hlavne robiť?',
            options: ['Predstaviť firmu', 'Získavať dopyty', 'Ukázať služby', 'Ukázať portfólio', 'Predávať produkty', 'Pôsobiť profesionálnejšie']
          },
          {
            id: 'web_scope',
            text: 'Koľko obsahu má web približne obsahovať?',
            options: ['Len základné informácie', 'Viac sekcií a podstránok', 'Portfólio / referencie / služby', 'Produkty alebo katalóg', 'Ešte neviem']
          },
          {
            id: 'web_assets',
            text: 'Máte pripravené podklady?',
            options: ['Mám logo, texty aj fotky', 'Mám len niečo', 'Nemám skoro nič', 'Potrebujem pomôcť aj s obsahom']
          },
          {
            id: 'web_budget',
            text: 'Aký rozpočet približne plánujete?',
            options: ['Do 200 €', '200 – 500 €', '500 – 1000 €', '1000 €+', 'Ešte neviem']
          },
          {
            id: 'web_timing',
            text: 'Kedy by ste web potrebovali?',
            options: ['Čo najskôr', 'Do 2 týždňov', 'Do mesiaca', 'Nemám presný termín']
          }
        ]
      },
      video: {
        label: 'Video tvorba',
        questions: [
          {
            id: 'video_type',
            text: 'Aký typ videa potrebujete?',
            options: ['Promo video', 'Video na sociálne siete', 'Video z akcie', 'Firemné video', 'Produktové video', 'Len zostrih z dodaných záberov']
          },
          {
            id: 'video_use',
            text: 'Kde sa bude video používať?',
            options: ['Instagram / TikTok / Shorts', 'Web', 'Facebook', 'Reklama', 'Prezentácia firmy', 'Ešte neviem']
          },
          {
            id: 'video_length',
            text: 'Má byť video krátke alebo dlhšie?',
            options: ['Do 30 sekúnd', '30 – 60 sekúnd', '1 – 3 minúty', 'Dlhší záznam', 'Ešte neviem']
          },
          {
            id: 'video_script',
            text: 'Máte už predstavu alebo scenár?',
            options: ['Áno, viem presne čo chcem', 'Mám len približnú predstavu', 'Nemám predstavu, potrebujem poradiť']
          },
          {
            id: 'video_shooting',
            text: 'Bude treba aj natáčanie?',
            options: ['Áno, treba natočiť všetko', 'Mám vlastné zábery', 'Kombinácia mojich a nových záberov', 'Ešte neviem']
          },
          {
            id: 'video_timing',
            text: 'Kedy to potrebujete?',
            options: ['Čo najskôr', 'Do týždňa', 'Do 2 týždňov', 'Do mesiaca', 'Nemám presný termín']
          }
        ]
      },
      photo: {
        label: 'Fotografovanie',
        questions: [
          {
            id: 'photo_type',
            text: 'Čo potrebujete nafotiť?',
            options: ['Firmu alebo priestory', 'Produkty', 'Akciu', 'Tím / ľudí', 'Fotky na web', 'Fotky na sociálne siete']
          },
          {
            id: 'photo_count',
            text: 'Koľko výstupov približne potrebujete?',
            options: ['Len pár fotiek', '10 – 30 fotiek', '30 – 80 fotiek', 'Veľa fotiek z celej akcie', 'Ešte neviem']
          },
          {
            id: 'photo_use',
            text: 'Kde sa fotky budú používať?',
            options: ['Web', 'Sociálne siete', 'Tlač', 'Reklama', 'Interné použitie']
          },
          {
            id: 'photo_location',
            text: 'Kde má fotenie prebiehať?',
            options: ['U nás vo firme', 'V exteriéri', 'Na akcii', 'V dohodnutej lokalite', 'Ešte neviem']
          },
          {
            id: 'photo_editing',
            text: 'Potrebujete aj úpravu fotiek?',
            options: ['Áno, základnú úpravu', 'Áno, výraznejšiu úpravu', 'Nie, len nafotiť', 'Neviem']
          }
        ]
      },
      drone: {
        label: 'Dron zábery',
        questions: [
          {
            id: 'drone_subject',
            text: 'Čo chcete natočiť dronom?',
            options: ['Firmu / budovu', 'Nehnuteľnosť', 'Stavbu', 'Akciu', 'Krajinu / lokalitu', 'Zábery do promo videa']
          },
          {
            id: 'drone_output',
            text: 'Potrebujete len zábery alebo aj zostrih?',
            options: ['Len surové zábery', 'Krátky zostrih', 'Dron ako súčasť promo videa', 'Ešte neviem']
          },
          {
            id: 'drone_area',
            text: 'V akej lokalite sa má lietať?',
            options: ['Zlaté Moravce a okolie', 'Nitra a okolie', 'Levice / Vráble a okolie', 'Inde na Slovensku', 'Ešte neviem']
          },
          {
            id: 'drone_safety',
            text: 'Je miesto vhodné na lietanie?',
            options: ['Áno, je to otvorený priestor', 'Nie som si istý', 'Je to v meste', 'Je to pri ľuďoch / akcii']
          },
          {
            id: 'drone_timing',
            text: 'Kedy to potrebujete?',
            options: ['Čo najskôr', 'Do týždňa', 'Do mesiaca', 'Nemám presný termín']
          }
        ]
      },
      graphics: {
        label: 'Grafika',
        questions: [
          {
            id: 'graphics_type',
            text: 'Aký typ grafiky potrebujete?',
            options: ['Plagát', 'Leták', 'Vizitka', 'Banner', 'Grafika na sociálne siete', 'Logo / úprava loga', 'Iné']
          },
          {
            id: 'graphics_use',
            text: 'Kde sa bude grafika používať?',
            options: ['Online', 'Tlač', 'Sociálne siete', 'Web', 'Na akciu']
          },
          {
            id: 'graphics_assets',
            text: 'Máte pripravené texty a logo?',
            options: ['Áno, mám všetko', 'Mám len časť', 'Nemám nič', 'Potrebujem pomôcť aj s textom']
          },
          {
            id: 'graphics_style',
            text: 'Máte predstavu o štýle?',
            options: ['Áno, mám presnú predstavu', 'Mám príklad', 'Neviem, potrebujem návrh', 'Chcem to podľa existujúcej značky']
          },
          {
            id: 'graphics_timing',
            text: 'Kedy grafiku potrebujete?',
            options: ['Dnes / urgentne', 'Do pár dní', 'Do týždňa', 'Nemám presný termín']
          }
        ]
      },
      combo: {
        label: 'Kombinácia služieb',
        questions: [
          {
            id: 'combo_first',
            text: 'Čo chcete zlepšiť ako prvé?',
            options: ['Web', 'Obsah na sociálne siete', 'Profesionálny vzhľad firmy', 'Propagáciu akcie', 'Predaj služieb / produktov', 'Celkovú online prezentáciu']
          },
          {
            id: 'combo_assets',
            text: 'Čo už máte?',
            options: ['Mám web', 'Mám logo', 'Mám fotky', 'Mám video', 'Nemám skoro nič', 'Mám všetko, ale pôsobí to slabo']
          },
          {
            id: 'combo_missing',
            text: 'Čo vám najviac chýba?',
            options: ['Profesionálny web', 'Kvalitné fotky', 'Video obsah', 'Grafika', 'Jasná prezentácia služieb', 'Neviem to posúdiť']
          },
          {
            id: 'combo_goal',
            text: 'Aký je hlavný cieľ?',
            options: ['Získať viac klientov', 'Vybudovať dôveru', 'Zlepšiť sociálne siete', 'Spustiť novú službu', 'Ukázať firmu profesionálnejšie']
          },
          {
            id: 'combo_budget',
            text: 'Aký rozpočet je realistický?',
            options: ['Do 200 €', '200 – 500 €', '500 – 1000 €', '1000 €+', 'Ešte neviem']
          }
        ]
      },
      unknown: {
        label: 'Neviem presne, čo potrebujem',
        questions: [
          {
            id: 'unknown_problem',
            text: 'Čo je váš hlavný problém?',
            options: ['Ľudia o mne nevedia', 'Web alebo profil pôsobí slabo', 'Nemám dobrý obsah', 'Chcem viac dopytov', 'Chcem vyzerať profesionálnejšie', 'Spúšťam novú službu / firmu']
          },
          {
            id: 'unknown_channel',
            text: 'Kde vás majú ľudia najčastejšie nájsť?',
            options: ['Google', 'Instagram / Facebook', 'Osobné odporúčania', 'Web', 'Na akciách', 'Ešte neviem']
          },
          {
            id: 'unknown_ready',
            text: 'Čo máte momentálne hotové?',
            options: ['Nič', 'Len sociálne siete', 'Web', 'Logo', 'Fotky', 'Niečo mám, ale nie je to dobré']
          },
          {
            id: 'unknown_result',
            text: 'Čo by malo prísť ako výsledok?',
            options: ['Viac správ / dopytov', 'Lepší prvý dojem', 'Viac obsahu na siete', 'Moderný web', 'Propagácia konkrétnej akcie', 'Neviem, potrebujem poradiť']
          }
        ]
      }
    },
    recommendations: {
      webStart: {
        service: 'Webové stránky',
        title: 'Web Štart',
        intro: 'Podľa odpovedí odporúčam Web Štart.',
        why: 'Dáva zmysel, ak potrebujete jednoduchú a profesionálnu online prezentáciu bez zbytočných funkcií. Väčší balík by bol v tejto fáze pravdepodobne zbytočný.',
        suitable: 'Vhodné pre: menšie firmy, služby, osobné portfólio alebo prvý firemný web.',
        price: 'od 199 €',
        next: 'Pripraviť základné info o firme, kontakt a 2 – 3 referenčné weby, ktoré sa vám páčia.',
        webFinder: true
      },
      webRast: {
        service: 'Webové stránky',
        title: 'Web Rast',
        intro: 'Podľa odpovedí odporúčam Web Rast.',
        why: 'Tento balík dáva zmysel, ak má web nielen vyzerať dobre, ale aj lepšie predstaviť služby, dôveru a viesť ľudí ku kontaktu. Oproti základnému webu je vhodnejší pri väčšom rozsahu obsahu.',
        suitable: 'Vhodné pre: firmy, služby, lokálne podnikanie a projekty, ktoré chcú pôsobiť profesionálnejšie.',
        price: 'od 499 €',
        next: 'Spísať hlavné služby, cieľ webu, dostupné podklady a požadovaný termín.',
        webFinder: true
      },
      webPredaj: {
        service: 'Webové stránky',
        title: 'Web Predaj alebo individuálne riešenie',
        intro: 'Podľa odpovedí odporúčam Web Predaj alebo individuálne riešenie.',
        why: 'Ak má web pracovať s produktmi, katalógom alebo predajom, jednoduchý prezentačný web by nestačil. Tu je dôležité riešiť štruktúru, prehľadnosť a cestu zákazníka.',
        suitable: 'Vhodné pre: katalóg, predaj produktov, objednávky, rezervácie alebo obchodný web.',
        price: 'od 999 €',
        next: 'Pripraviť typy produktov, spôsob objednávky, platbu alebo dopytový proces.',
        webFinder: true,
        priceNote: 'Presná cena závisí od rozsahu, termínu, lokality a dodaných podkladov.'
      },
      promoVideo: {
        service: 'Video tvorba',
        title: 'Promo video',
        intro: 'Podľa odpovedí odporúčam promo video.',
        why: 'Dáva zmysel, ak chcete rýchlo ukázať firmu, službu alebo produkt a použiť výstup na webe, sociálnych sieťach alebo v reklame.',
        suitable: 'Vhodné pre: predstavenie firmy, služby, produktu alebo kampane.',
        price: 'orientačne od 99 €',
        next: 'Doplniť miesto, účel videa, požadovanú dĺžku a termín.'
      },
      reels: {
        service: 'Video tvorba',
        title: 'Krátke video na sociálne siete',
        intro: 'Podľa odpovedí odporúčam krátke video na sociálne siete.',
        why: 'Toto je vhodné, ak potrebujete pravidelnejší a rýchlo použiteľný obsah. Pri sociálnych sieťach často dáva väčší zmysel viac kratších výstupov než jedno dlhé video.',
        suitable: 'Vhodné pre: Instagram, TikTok, Shorts, Facebook alebo krátku reklamu.',
        price: 'orientačne od 49 €',
        next: 'Určiť formát, počet výstupov a kde sa budú videá publikovať.'
      },
      eventVideo: {
        service: 'Video tvorba',
        title: 'Video z akcie',
        intro: 'Podľa odpovedí odporúčam video z akcie.',
        why: 'Dáva zmysel, ak chcete zachytiť atmosféru, ľudí a priebeh udalosti. Ak má výstup slúžiť aj na propagáciu ďalších akcií, odporúčam pripraviť aj kratšiu verziu na sociálne siete.',
        suitable: 'Vhodné pre: firemné akcie, verejné podujatia, oslavy alebo promo z eventu.',
        price: 'individuálne podľa času a rozsahu',
        next: 'Doplniť miesto, dátum, čas trvania akcie a požadovaný typ výstupu.',
        priceNote: 'Presná cena závisí od rozsahu, termínu, lokality a dodaných podkladov.'
      },
      corporatePhoto: {
        service: 'Fotografovanie',
        title: 'Firemné fotografovanie',
        intro: 'Podľa odpovedí odporúčam firemné fotografovanie.',
        why: 'Ak web alebo sociálne siete pôsobia slabo, problém často nie je len v dizajne, ale v nekvalitných fotkách. Dobré fotky vedia výrazne zlepšiť prvý dojem.',
        suitable: 'Vhodné pre: firmu, priestory, tím, web alebo sociálne siete.',
        price: 'orientačne od 79 €',
        next: 'Doplniť miesto fotenia, počet výstupov a spôsob použitia fotiek.'
      },
      productPhoto: {
        service: 'Fotografovanie',
        title: 'Produktové fotografie',
        intro: 'Podľa odpovedí odporúčam produktové fotografie.',
        why: 'Pri produktoch je vizuál rozhodujúci. Slabé fotky znižujú dôveru a môžu zbytočne kaziť predaj, aj keď je samotný produkt dobrý.',
        suitable: 'Vhodné pre: produkty, katalóg, e-shop, web alebo sociálne siete.',
        price: 'orientačne od 79 €',
        next: 'Pripraviť počet produktov, štýl fotenia a kde sa budú fotky používať.'
      },
      eventPhoto: {
        service: 'Fotografovanie',
        title: 'Fotenie akcie',
        intro: 'Podľa odpovedí odporúčam fotenie akcie.',
        why: 'Pri akcii je dôležité zachytiť atmosféru, ľudí a momenty, ktoré sa dajú použiť na web, sociálne siete alebo ďalšiu propagáciu.',
        suitable: 'Vhodné pre: firemné akcie, školy, eventy, oslavy alebo verejné podujatia.',
        price: 'individuálne podľa času a počtu výstupov',
        next: 'Doplniť dátum, miesto, dĺžku akcie a približný počet požadovaných fotiek.',
        priceNote: 'Presná cena závisí od rozsahu, termínu, lokality a dodaných podkladov.'
      },
      drone: {
        service: 'Dron zábery',
        title: 'Dron zábery',
        intro: 'Podľa odpovedí odporúčam dron zábery.',
        why: 'Dron má zmysel hlavne vtedy, keď lokalita, budova, stavba alebo akcia vyzerá z výšky lepšie a pomáha vytvoriť silnejší prvý dojem.',
        suitable: 'Vhodné pre: budovu, stavbu, nehnuteľnosť, akciu alebo zábery do promo videa.',
        price: 'orientačne od 49 €',
        next: 'Overiť lokalitu, bezpečnosť lietania, počasie a požadovaný typ výstupu.',
        warning: 'Dron zábery závisia od počasia, lokality a možností bezpečného lietania.'
      },
      graphic: {
        service: 'Grafika',
        title: 'Grafický návrh',
        intro: 'Podľa odpovedí odporúčam grafický návrh.',
        why: 'Je vhodný, ak potrebujete rýchlo a jasne odkomunikovať akciu, službu alebo ponuku. Pri tlači je dôležité pripraviť správne rozmery a čitateľný text.',
        suitable: 'Vhodné pre: plagát, leták, vizitku, banner, sociálne siete alebo tlačový podklad.',
        price: 'orientačne od 25 €',
        next: 'Dodať texty, logo, rozmery, miesto použitia a požadovaný termín.'
      },
      comboWebPhoto: {
        service: 'Kombinácia služieb',
        title: 'Web + základné fotky',
        intro: 'Podľa odpovedí by som začal kombináciou webu a základných fotiek.',
        why: 'Ak nemáte dobré fotky, samotný web nebude pôsobiť dostatočne dôveryhodne. Video sa dá doplniť neskôr, keď bude jasné, kde bude mať najväčší efekt.',
        suitable: 'Vhodné pre: nový firemný web, slabé podklady alebo prvú profesionálnu prezentáciu.',
        price: 'orientačne od 249 €',
        next: 'Najprv pripraviť základné zadanie webu a zoznam fotiek, ktoré budú potrebné.',
        webFinder: true
      },
      comboEvent: {
        service: 'Kombinácia služieb',
        title: 'Grafika + fotenie + krátke video',
        intro: 'Podľa odpovedí odporúčam kombináciu grafiky, fotenia a krátkeho videa.',
        why: 'Grafika pomôže akciu odkomunikovať pred jej konaním. Foto a video potom vytvoria obsah, ktorý sa dá použiť po akcii na sociálne siete alebo ďalšiu propagáciu.',
        suitable: 'Vhodné pre: propagáciu akcie, event, verejné podujatie alebo opakovanú udalosť.',
        price: 'individuálne podľa rozsahu',
        next: 'Doplniť dátum akcie, miesto, program, požadované výstupy a rozpočet.',
        priceNote: 'Presná cena závisí od rozsahu, termínu, lokality a dodaných podkladov.'
      },
      unknown: {
        service: 'Neviem presne, čo potrebujem',
        title: 'Najprv krátke zadanie a jeden hlavný smer',
        intro: 'Podľa odpovedí zatiaľ neodporúčam riešiť všetko naraz.',
        why: 'Najskôr treba určiť, kde vám uniká najväčšia hodnota: či v slabom webe, nekvalitnom obsahu, nejasnej ponuke alebo nízkej viditeľnosti. Ako prvý krok by dávalo zmysel pripraviť jednoduché zadanie a vybrať jednu službu s najväčším dopadom.',
        suitable: 'Vhodné, keď ešte nie je jasné, či má prioritu web, fotky, video, grafika alebo kombinácia služieb.',
        price: 'podľa rozsahu',
        next: 'Poslať krátky popis situácie a cieľa, aby sa vybral jeden najdôležitejší prvý krok.',
        priceNote: 'Presná cena závisí od rozsahu, termínu, lokality a dodaných podkladov.'
      }
    }
  };
})();
