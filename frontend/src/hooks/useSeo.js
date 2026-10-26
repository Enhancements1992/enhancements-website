import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const SITE = 'https://www.enhancements.eu';

const SEO = {
  it: {
    home: ['Enhancements srl | Distributore B2B Cosmetici Trind e K-Beauty Coreana in Italia', 'Distributore italiano B2B di cosmetici: Trind Cosmetics e i migliori brand coreani (Anua, COSRX, Beauty of Joseon, Innisfree). Forniture per farmacie, parafarmacie e profumerie.'],
    about: ['Chi Siamo | Enhancements srl - Distribuzione Cosmetici B2B', 'Enhancements srl, distributore italiano di cosmetici d\'eccellenza per farmacie, profumerie e centri estetici. Professionalità, affidabilità e supporto vendite.'],
    brands: ['Brand Distribuiti | Trind Cosmetics e Cosmetica Coreana | Enhancements srl', 'Scopri i brand distribuiti da Enhancements srl: Trind Cosmetics e i marchi K-Beauty più famosi, Anua, Beauty of Joseon, COSRX, Innisfree, Missha, Some By Mi, Skin1004, Round Lab.'],
    services: ['Servizi di Distribuzione B2B Cosmetici | Enhancements srl', 'Distribuzione B2B, supporto vendite, logistica e formazione per farmacie, profumerie e rivenditori di cosmetici in tutta Italia.'],
    contact: ['Contatti | Diventa Rivenditore | Enhancements srl', 'Contatta Enhancements srl per listini B2B, disponibilità e condizioni commerciali per rivendere cosmetici Trind e coreani in farmacia e profumeria.'],
    kbeauty: ['Distributore Cosmetici Coreani in Italia per Farmacie e Profumerie | Ingrosso K-Beauty B2B', 'Distributore B2B di cosmetici coreani in Italia: Anua, COSRX, Beauty of Joseon, Innisfree, Missha, Some By Mi, Skin1004, Round Lab. Ingrosso K-Beauty per farmacie, parafarmacie, profumerie ed e-commerce.']
  },
  en: {
    home: ['Enhancements srl | B2B Distributor of Trind and Korean K-Beauty Cosmetics in Italy', 'Italian B2B cosmetics distributor: Trind Cosmetics and the best Korean brands (Anua, COSRX, Beauty of Joseon, Innisfree) for pharmacies and perfumeries.'],
    about: ['About Us | Enhancements srl - B2B Cosmetics Distribution', 'Enhancements srl, Italian distributor of excellence cosmetics for pharmacies, perfumeries and beauty centers.'],
    brands: ['Our Brands | Trind Cosmetics and Korean Cosmetics | Enhancements srl', 'Brands distributed by Enhancements srl: Trind Cosmetics and the most famous K-Beauty brands, Anua, Beauty of Joseon, COSRX, Innisfree, Missha, Some By Mi, Skin1004, Round Lab.'],
    services: ['B2B Cosmetics Distribution Services | Enhancements srl', 'B2B distribution, sales support, logistics and training for pharmacies, perfumeries and cosmetics retailers throughout Italy.'],
    contact: ['Contact | Become a Reseller | Enhancements srl', 'Contact Enhancements srl for B2B price lists, availability and trade terms to resell Trind and Korean cosmetics.'],
    kbeauty: ['Korean Cosmetics Distributor in Italy for Pharmacies and Perfumeries | B2B K-Beauty Wholesale', 'B2B distributor of Korean cosmetics in Italy: Anua, COSRX, Beauty of Joseon, Innisfree, Missha, Some By Mi, Skin1004, Round Lab. K-Beauty wholesale for pharmacies, perfumeries and e-commerce.']
  }
};

const setMeta = (selector, attr, value) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta');
    const [, key, name] = selector.match(/\[(\w+)="([^"]+)"\]/);
    el.setAttribute(key, name);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

export const useSeo = (page, path, jsonLd) => {
  const { language } = useLanguage();

  useEffect(() => {
    const [title, description] = SEO[language][page];
    const url = `${SITE}${path}`;
    document.title = title;
    document.documentElement.lang = language;
    setMeta('meta[name="title"]', 'content', title);
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('link[rel="canonical"]', 'href', url);

    if (!jsonLd) return undefined;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => script.remove();
  }, [language, page, path, jsonLd]);
};
