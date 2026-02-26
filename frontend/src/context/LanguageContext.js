import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  it: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'Chi Siamo',
      brands: 'Brand',
      services: 'Servizi',
      contact: 'Contatti'
    },
    // Hero
    hero: {
      title: 'Distributore italiano di cosmetici d\'eccellenza',
      subtitle: 'Portiamo i migliori brand di bellezza ai professionisti del settore con affidabilità e competenza.',
      cta: 'Scopri i Brand',
      ctaSecondary: 'Contattaci'
    },
    // Intro
    intro: {
      label: 'La Nostra Missione',
      title: 'Professionalità, Affidabilità, Eccellenza',
      description: 'Enhancements srl è un distributore italiano di cosmetici d\'eccellenza. La nostra missione è servire i nostri clienti con la massima professionalità e supporto alle vendite, affidandoci a personale altamente specializzato. Siamo un\'azienda moderna e competitiva che offre servizi di distribuzione impeccabili grazie alla nostra affidabilità, efficienza e professionalità.'
    },
    // Brands
    brands: {
      label: 'I Nostri Brand',
      title: 'Distribuzione Esclusiva',
      trind: {
        name: 'Trind Cosmetics',
        description: 'Leader mondiale nella cura delle unghie naturali con prodotti innovativi e risultati visibili.'
      },
      ingrid: {
        name: 'Ingrid Cosmetics',
        description: 'Brand polacco di makeup professionale con una gamma completa per ogni esigenza.'
      },
      cta: 'Scopri di più'
    },
    // Services/Features
    services: {
      label: 'I Nostri Servizi',
      title: 'Distribuzione B2B Completa',
      items: [
        {
          title: 'Distribuzione B2B',
          description: 'Servizio di distribuzione professionale per saloni di bellezza, farmacie e rivenditori.'
        },
        {
          title: 'Supporto Vendite',
          description: 'Team dedicato al supporto commerciale per massimizzare le tue performance.'
        },
        {
          title: 'Consulenza Professionale',
          description: 'Esperti del settore pronti ad aiutarti nella scelta dei prodotti giusti.'
        },
        {
          title: 'Logistica Affidabile',
          description: 'Consegne rapide e puntuali in tutta Italia con tracciamento completo.'
        },
        {
          title: 'Formazione',
          description: 'Sessioni formative sui prodotti per il tuo staff e i tuoi clienti.'
        },
        {
          title: 'Marketing',
          description: 'Materiali promozionali e supporto marketing per il tuo punto vendita.'
        }
      ]
    },
    // CTA Section
    cta: {
      title: 'Diventa Partner',
      subtitle: 'Unisciti alla nostra rete di distribuzione e porta l\'eccellenza ai tuoi clienti.',
      button: 'Contattaci Ora'
    },
    // About Page
    about: {
      heroTitle: 'Chi Siamo',
      heroSubtitle: 'Esperienza e passione al servizio della bellezza professionale.',
      missionTitle: 'La Nostra Missione',
      missionText: 'Enhancements srl nasce dalla passione per la bellezza e dalla volontà di portare l\'eccellenza cosmetica in Italia. La nostra missione è servire i nostri clienti con la massima professionalità, offrendo non solo prodotti di qualità superiore ma anche un supporto alle vendite completo e personalizzato.',
      valuesTitle: 'I Nostri Valori',
      values: [
        { title: 'Professionalità', text: 'Team altamente qualificato e competente.' },
        { title: 'Affidabilità', text: 'Partner di fiducia per una crescita duratura.' },
        { title: 'Efficienza', text: 'Processi ottimizzati per risultati eccellenti.' },
        { title: 'Innovazione', text: 'Sempre alla ricerca delle ultime tendenze.' }
      ],
      expertiseTitle: 'La Nostra Esperienza',
      expertiseText: 'Con anni di esperienza nel settore della distribuzione cosmetica, conosciamo le esigenze dei professionisti del beauty. Il nostro personale altamente specializzato è in grado di fornire consulenza personalizzata e supporto tecnico per ogni necessità.'
    },
    // Brands Page
    brandsPage: {
      heroTitle: 'I Nostri Brand',
      heroSubtitle: 'Distribuzione esclusiva dei migliori marchi di cosmetica.',
      trind: {
        title: 'Trind Cosmetics',
        subtitle: 'Care for Natural Nails',
        description: 'TRIND è l\'esperto leader mondiale nella cura delle unghie con oltre 30 anni di esperienza. I loro prodotti forniscono a unghie, cuticole, mani e piedi una condizione decisamente migliore. Crediamo fermamente che unghie belle siano possibili per tutti.',
        longDescription: 'Che tu preferisca unghie dall\'aspetto naturale o utilizzi colori diversi e fantasiosi per diverse occasioni, prendersi cura delle proprie unghie è importante per mantenerle sane, forti e semplicemente belle. TRIND Nail Repair rafforza le unghie dall\'interno: gli ingredienti attivi rinforzano i filamenti di cheratina all\'interno dell\'unghia, ottenendo unghie belle e forti in sole due settimane.',
        features: ['Nail Care - Trattamenti rinforzanti', 'Cuticle Care - Cura delle cuticole', 'Nail Finishers - Base e top coat', 'Nail Polish - Smalti professionali', 'Hand Care - Cura delle mani', 'Manicure Tools - Strumenti professionali'],
        products: ['Nail Repair Natural', 'Nail Balsam', 'Keratin Nail Restorer', 'Keratin Nail Protector', 'Cuticle Balsam', 'Hand Repair']
      },
      ingrid: {
        title: 'Ingrid Cosmetics',
        subtitle: 'Professional Makeup',
        description: 'INGRID COSMETICS è un brand polacco di makeup professionale con oltre 30 anni di esperienza nel settore cosmetico. Prodotti di altissima qualità, certificati ISO, cruelty-free e Made in EU. Un marchio apprezzato dalle donne di tutto il mondo.',
        longDescription: 'Con un proprio laboratorio di ricerca e sviluppo, INGRID COSMETICS crea formule innovative per viso, occhi e labbra. Tutti i prodotti sono testati dermatologicamente e garantiscono performance professionali a prezzi accessibili.',
        features: ['Face Makeup - Fondotinta, correttori, ciprie', 'Eye Makeup - Ombretti, mascara, eyeliner', 'Lip Products - Rossetti, gloss, matite labbra', 'Nail Polish - Smalti e trattamenti', 'Skincare - Cura della pelle', 'Accessories - Pennelli e strumenti'],
        certifications: ['Cruelty Free', 'Certificato ISO', 'Made in EU', 'Laboratorio proprio']
      }
    },
    // Services Page
    servicesPage: {
      heroTitle: 'I Nostri Servizi',
      heroSubtitle: 'Soluzioni complete per la distribuzione B2B di cosmetici.',
      distribution: {
        title: 'Distribuzione B2B',
        description: 'Offriamo un servizio di distribuzione professionale rivolto a saloni di bellezza, centri estetici, farmacie, profumerie e rivenditori specializzati. La nostra rete logistica garantisce consegne rapide e puntuali in tutta Italia.'
      },
      support: {
        title: 'Supporto Vendite',
        description: 'Il nostro team commerciale è a tua disposizione per supportarti nella crescita del tuo business. Offriamo consulenza personalizzata, analisi di mercato e strategie di vendita efficaci.'
      },
      consulting: {
        title: 'Consulenza Professionale',
        description: 'I nostri esperti del settore sono pronti ad aiutarti nella scelta dei prodotti più adatti alle tue esigenze e a quelle dei tuoi clienti.'
      },
      logistics: {
        title: 'Logistica Affidabile',
        description: 'Sistema logistico efficiente con tracciamento delle spedizioni, consegne programmate e gestione ottimizzata del magazzino.'
      },
      training: {
        title: 'Formazione',
        description: 'Organizziamo sessioni formative sui prodotti per il tuo staff, fornendo le competenze necessarie per offrire il miglior servizio ai clienti.'
      },
      marketing: {
        title: 'Supporto Marketing',
        description: 'Forniamo materiali promozionali, espositori e supporto per le attività di marketing del tuo punto vendita.'
      }
    },
    // Contact Page
    contact: {
      heroTitle: 'Contattaci',
      heroSubtitle: 'Siamo qui per rispondere a ogni tua domanda.',
      formTitle: 'Inviaci un Messaggio',
      infoTitle: 'Informazioni di Contatto',
      form: {
        name: 'Nome e Cognome',
        email: 'Email',
        company: 'Azienda',
        phone: 'Telefono',
        message: 'Messaggio',
        privacy: 'Accetto la privacy policy e acconsento al trattamento dei miei dati personali.',
        submit: 'Invia Messaggio',
        success: 'Messaggio inviato con successo! Ti contatteremo presto.',
        error: 'Si è verificato un errore. Riprova più tardi.'
      },
      info: {
        address: 'Indirizzo',
        phone: 'Telefono',
        hours: 'Orari',
        hoursValue: 'Lun-Ven: 9:00 - 17:00'
      },
      map: 'Apri in Google Maps'
    },
    // Footer
    footer: {
      description: 'Distributore italiano di cosmetici d\'eccellenza.',
      quickLinks: 'Link Rapidi',
      contact: 'Contatti',
      followUs: 'Seguici',
      rights: 'Tutti i diritti riservati.',
      privacy: 'Privacy Policy',
      terms: 'Termini e Condizioni'
    }
  },
  en: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'About Us',
      brands: 'Brands',
      services: 'Services',
      contact: 'Contact'
    },
    // Hero
    hero: {
      title: 'Italian Distributor of Excellence Cosmetics',
      subtitle: 'We bring the finest beauty brands to industry professionals with reliability and expertise.',
      cta: 'Discover Brands',
      ctaSecondary: 'Contact Us'
    },
    // Intro
    intro: {
      label: 'Our Mission',
      title: 'Professionalism, Reliability, Excellence',
      description: 'Enhancements srl is an Italian distributor of excellence cosmetics. Our mission is to serve our clients with maximum professionalism and sales support, relying on highly specialized staff. We are a modern and competitive company offering impeccable distribution services thanks to our reliability, efficiency, and professionalism.'
    },
    // Brands
    brands: {
      label: 'Our Brands',
      title: 'Exclusive Distribution',
      trind: {
        name: 'Trind Cosmetics',
        description: 'World leader in natural nail care with innovative products and visible results.'
      },
      ingrid: {
        name: 'Ingrid Cosmetics',
        description: 'Polish professional makeup brand with a complete range for every need.'
      },
      cta: 'Learn more'
    },
    // Services/Features
    services: {
      label: 'Our Services',
      title: 'Complete B2B Distribution',
      items: [
        {
          title: 'B2B Distribution',
          description: 'Professional distribution service for beauty salons, pharmacies and retailers.'
        },
        {
          title: 'Sales Support',
          description: 'Dedicated team for commercial support to maximize your performance.'
        },
        {
          title: 'Professional Consulting',
          description: 'Industry experts ready to help you choose the right products.'
        },
        {
          title: 'Reliable Logistics',
          description: 'Fast and punctual deliveries throughout Italy with complete tracking.'
        },
        {
          title: 'Training',
          description: 'Product training sessions for your staff and customers.'
        },
        {
          title: 'Marketing',
          description: 'Promotional materials and marketing support for your store.'
        }
      ]
    },
    // CTA Section
    cta: {
      title: 'Become a Partner',
      subtitle: 'Join our distribution network and bring excellence to your customers.',
      button: 'Contact Us Now'
    },
    // About Page
    about: {
      heroTitle: 'About Us',
      heroSubtitle: 'Experience and passion at the service of professional beauty.',
      missionTitle: 'Our Mission',
      missionText: 'Enhancements srl was born from a passion for beauty and the desire to bring cosmetic excellence to Italy. Our mission is to serve our clients with maximum professionalism, offering not only superior quality products but also complete and personalized sales support.',
      valuesTitle: 'Our Values',
      values: [
        { title: 'Professionalism', text: 'Highly qualified and competent team.' },
        { title: 'Reliability', text: 'Trusted partner for lasting growth.' },
        { title: 'Efficiency', text: 'Optimized processes for excellent results.' },
        { title: 'Innovation', text: 'Always looking for the latest trends.' }
      ],
      expertiseTitle: 'Our Expertise',
      expertiseText: 'With years of experience in cosmetic distribution, we understand the needs of beauty professionals. Our highly specialized staff is able to provide personalized advice and technical support for every need.'
    },
    // Brands Page
    brandsPage: {
      heroTitle: 'Our Brands',
      heroSubtitle: 'Exclusive distribution of the best cosmetic brands.',
      trind: {
        title: 'Trind Cosmetics',
        subtitle: 'Care for Natural Nails',
        description: 'TRIND is the leading expert in nail care worldwide, with more than 30 years of experience. Their products provide nails, cuticles, hands and feet with a strikingly better condition. We strongly believe beautiful nails are possible for everyone.',
        longDescription: 'Whether you prefer natural looking nails, or use different and fancy colors for different occasions, taking care of your nails is important to keep them healthy, strong and simply beautiful. TRIND Nail Repair strengthens nails from within: the active ingredients strengthen the keratin strands within the nail, resulting in beautiful strong nails in just two weeks.',
        features: ['Nail Care - Strengthening treatments', 'Cuticle Care - Cuticle treatments', 'Nail Finishers - Base and top coats', 'Nail Polish - Professional colors', 'Hand Care - Hand treatments', 'Manicure Tools - Professional tools'],
        products: ['Nail Repair Natural', 'Nail Balsam', 'Keratin Nail Restorer', 'Keratin Nail Protector', 'Cuticle Balsam', 'Hand Repair']
      },
      ingrid: {
        title: 'Ingrid Cosmetics',
        subtitle: 'Professional Makeup',
        description: 'INGRID COSMETICS is a Polish professional makeup brand with over 30 years of experience in the cosmetic industry. Highest quality products, ISO certified, cruelty-free and Made in EU. A brand appreciated by women all over the world.',
        longDescription: 'With its own research and development laboratory, INGRID COSMETICS creates innovative formulas for face, eyes and lips. All products are dermatologically tested and guarantee professional performance at accessible prices.',
        features: ['Face Makeup - Foundations, concealers, powders', 'Eye Makeup - Eyeshadows, mascaras, eyeliners', 'Lip Products - Lipsticks, glosses, lip pencils', 'Nail Polish - Polishes and treatments', 'Skincare - Skin care', 'Accessories - Brushes and tools'],
        certifications: ['Cruelty Free', 'ISO Certified', 'Made in EU', 'Own Laboratory']
      }
    },
    // Services Page
    servicesPage: {
      heroTitle: 'Our Services',
      heroSubtitle: 'Complete solutions for B2B cosmetics distribution.',
      distribution: {
        title: 'B2B Distribution',
        description: 'We offer a professional distribution service for beauty salons, aesthetic centers, pharmacies, perfumeries and specialized retailers. Our logistics network ensures fast and punctual deliveries throughout Italy.'
      },
      support: {
        title: 'Sales Support',
        description: 'Our commercial team is at your disposal to support you in growing your business. We offer personalized consulting, market analysis and effective sales strategies.'
      },
      consulting: {
        title: 'Professional Consulting',
        description: 'Our industry experts are ready to help you choose the products best suited to your needs and those of your customers.'
      },
      logistics: {
        title: 'Reliable Logistics',
        description: 'Efficient logistics system with shipment tracking, scheduled deliveries and optimized warehouse management.'
      },
      training: {
        title: 'Training',
        description: 'We organize product training sessions for your staff, providing the skills needed to offer the best service to customers.'
      },
      marketing: {
        title: 'Marketing Support',
        description: 'We provide promotional materials, displays and support for your store marketing activities.'
      }
    },
    // Contact Page
    contact: {
      heroTitle: 'Contact Us',
      heroSubtitle: 'We are here to answer all your questions.',
      formTitle: 'Send Us a Message',
      infoTitle: 'Contact Information',
      form: {
        name: 'Full Name',
        email: 'Email',
        company: 'Company',
        phone: 'Phone',
        message: 'Message',
        privacy: 'I accept the privacy policy and consent to the processing of my personal data.',
        submit: 'Send Message',
        success: 'Message sent successfully! We will contact you soon.',
        error: 'An error occurred. Please try again later.'
      },
      info: {
        address: 'Address',
        phone: 'Phone',
        hours: 'Hours',
        hoursValue: 'Mon-Fri: 9:00 - 17:00'
      },
      map: 'Open in Google Maps'
    },
    // Footer
    footer: {
      description: 'Italian distributor of excellence cosmetics.',
      quickLinks: 'Quick Links',
      contact: 'Contact',
      followUs: 'Follow Us',
      rights: 'All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms and Conditions'
    }
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('enhancements-lang');
      return saved || 'it';
    }
    return 'it';
  });

  useEffect(() => {
    localStorage.setItem('enhancements-lang', language);
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'it' ? 'en' : 'it');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
