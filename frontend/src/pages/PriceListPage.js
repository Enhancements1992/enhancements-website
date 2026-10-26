import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSeo } from '../hooks/useSeo';
import { PriceListForm } from '../components/PriceListForm';
import { priceListContent } from '../content/priceListContent';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function PriceListPage() {
  useSeo('pricelist', '/richiesta-listino');
  const { language } = useLanguage();
  const c = priceListContent[language];

  return (
    <main className="pt-20" data-testid="pricelist-page">
      <section className="section-spacing bg-[#F9F9F9]">
        <motion.div className="container-luxury" initial="hidden" animate="visible" variants={fadeInUp}><div className="max-w-3xl">
          <span className="label-style text-gold mb-4 block">{c.label}</span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl mb-6" data-testid="pricelist-h1">{c.h1}</h1>
          <p className="text-lg text-gray-600 leading-relaxed">{c.intro}</p>
        </div></motion.div>
      </section>
      <section className="section-spacing">
        <div className="container-luxury grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl mb-8">{c.formTitle}</h2>
            <PriceListForm />
          </div>
          <aside className="bg-[#0A0A0A] text-white p-10 h-fit lg:sticky lg:top-28" data-testid="pricelist-aside">
            <h2 className="font-heading text-2xl mb-6">{c.asideTitle}</h2>
            <ul className="space-y-4 mb-8">
              {c.aside.map((a) => (
                <li key={a} className="flex items-start gap-3">
                  <Check size={18} className="text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">{a}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 uppercase tracking-wider">{c.asideNote}</p>
          </aside>
        </div>
      </section>
    </main>
  );
}
