import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Plus, FileText, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSeo } from '../hooks/useSeo';
import { kbeautyContent, KBEAUTY_IMAGES } from '../content/kbeautyContent';
import { whatsappUrl } from '../content/priceListContent';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } };
const reveal = { initial: 'hidden', whileInView: 'visible', viewport: { once: true }, variants: stagger };

const mailto = (subject) => `mailto:info@enhancements.eu?subject=${encodeURIComponent(subject)}`;
const slug = (name) => name.toLowerCase().replace(/\s+/g, '-');

const buildJsonLd = (c) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      mainEntity: c.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.enhancements.eu/' },
        { '@type': 'ListItem', position: 2, name: c.h1, item: 'https://www.enhancements.eu/cosmetici-coreani' }
      ]
    },
    {
      '@type': 'Service',
      name: c.h1,
      serviceType: 'B2B wholesale distribution of Korean cosmetics',
      areaServed: { '@type': 'Country', name: 'Italy' },
      provider: { '@type': 'Organization', name: 'Enhancements srl', url: 'https://www.enhancements.eu' },
      brand: c.brands.map((b) => ({ '@type': 'Brand', name: b.name }))
    }
  ]
});

const SectionHead = ({ title, text }) => (
  <motion.div className="max-w-3xl mb-12" variants={fadeInUp}>
    <h2 className="font-heading text-3xl sm:text-4xl mb-4">{title}</h2>
    {text && <p className="text-gray-600 leading-relaxed">{text}</p>}
  </motion.div>
);

const BrandRow = ({ brand, c }) => (
  <motion.article
    className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 py-10 border-b border-gray-200 last:border-0"
    variants={fadeInUp}
    id={slug(brand.name)}
    data-testid={`kb-brand-${slug(brand.name)}`}
  >
    <div className="img-zoom-container aspect-square overflow-hidden bg-[#F4F4F4]">
      <img src={`/images/kbeauty/${KBEAUTY_IMAGES[brand.name]}`} alt={`${brand.name} - ${brand.best[0]}`} className="img-zoom w-full h-full object-cover" loading="lazy" />
    </div>
    <div>
      <h3 className="font-heading text-2xl mb-3">{brand.name}</h3>
      <p className="text-gray-600 leading-relaxed mb-5">{brand.text}</p>
      <p className="label-style text-gold mb-3">{c.bestsellers}</p>
      <ul className="flex flex-wrap gap-2 mb-6">
        {brand.best.map((p) => (
          <li key={p} className="px-3 py-1 bg-[#F4EBD9] text-xs font-medium">{p}</li>
        ))}
      </ul>
      <a href={mailto(`${c.mailSubject} - ${brand.name}`)} className="text-xs uppercase tracking-wider text-gold inline-flex items-center gap-2 group" data-testid={`kb-brand-mail-${slug(brand.name)}`}>
        {c.requestBrand} {brand.name}
        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </div>
  </motion.article>
);

const FaqItem = ({ item, index }) => (
  <details className="group border-b border-gray-200 py-5" data-testid={`kb-faq-${index}`}>
    <summary className="flex justify-between items-center gap-4 cursor-pointer list-none font-medium">
      <h3 className="text-base">{item.q}</h3>
      <Plus size={18} className="text-gold flex-shrink-0 transition-transform duration-300 group-open:rotate-45" />
    </summary>
    <p className="text-gray-600 leading-relaxed mt-3">{item.a}</p>
  </details>
);

const CtaButtons = ({ c, prefix }) => (
  <div className="flex flex-wrap gap-4">
    <Link to="/richiesta-listino" className="btn-primary inline-flex items-center gap-2" data-testid={`${prefix}-pricelist-cta`}>
      <FileText size={16} /> {c.ctaEmail}
    </Link>
    <a href={whatsappUrl(c.waText)} target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex items-center gap-2" data-testid={`${prefix}-whatsapp-cta`}>
      <MessageCircle size={16} /> {c.ctaForm}
    </a>
  </div>
);

export default function KBeautyPage() {
  const { language } = useLanguage();
  const c = kbeautyContent[language];
  const jsonLd = useMemo(() => buildJsonLd(c), [c]);
  useSeo('kbeauty', '/cosmetici-coreani', jsonLd);

  return (
    <main className="pt-20" data-testid="kbeauty-page">
      <section className="section-spacing bg-[#F9F9F9]">
        <div className="container-luxury grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span className="label-style text-gold mb-4 block" variants={fadeInUp}>{c.label}</motion.span>
            <motion.h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl mb-6" variants={fadeInUp} data-testid="kb-h1">{c.h1}</motion.h1>
            <motion.p className="text-lg text-gray-600 leading-relaxed mb-8" variants={fadeInUp}>{c.intro}</motion.p>
            <motion.div variants={fadeInUp}><CtaButtons c={c} prefix="kb-hero" /></motion.div>
          </motion.div>
          <motion.div className="aspect-square overflow-hidden" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <img src="/images/kbeauty/skin1004.jpg" alt={c.h1} className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      <section className="section-spacing">
        <motion.div className="container-luxury" {...reveal}>
          <SectionHead title={c.whyTitle} text={c.whyText} />
          <motion.h2 className="font-heading text-2xl mb-8" variants={fadeInUp}>{c.clientsTitle}</motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.clients.map((cl, i) => (
              <motion.div key={cl.title} className="p-8 bg-[#F9F9F9] border-t-2 border-[#C5A059]" variants={fadeInUp} data-testid={`kb-client-${i}`}>
                <h3 className="font-heading text-xl mb-3">{cl.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{cl.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="section-spacing bg-[#F9F9F9]" data-testid="kb-brands">
        <motion.div className="container-luxury" {...reveal}>
          <SectionHead title={c.brandsTitle} text={c.brandsText} />
          {c.brands.map((b) => <BrandRow key={b.name} brand={b} c={c} />)}
        </motion.div>
      </section>

      <section className="section-spacing bg-[#0A0A0A] text-white">
        <motion.div className="container-luxury grid grid-cols-1 lg:grid-cols-2 gap-16" {...reveal}>
          <div>
            <motion.h2 className="font-heading text-3xl sm:text-4xl mb-10" variants={fadeInUp}>{c.stepsTitle}</motion.h2>
            <ol className="space-y-8">
              {c.steps.map((s, i) => (
                <motion.li key={s.title} className="flex gap-6" variants={fadeInUp}>
                  <span className="font-heading text-3xl text-gold w-10 flex-shrink-0">0{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-medium mb-1">{s.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{s.text}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
          <div>
            <motion.h2 className="font-heading text-3xl sm:text-4xl mb-10" variants={fadeInUp}>{c.advantagesTitle}</motion.h2>
            <ul className="space-y-4">
              {c.advantages.map((a) => (
                <motion.li key={a} className="flex items-center gap-3" variants={fadeInUp}>
                  <Check size={18} className="text-gold flex-shrink-0" />
                  <span className="text-gray-300">{a}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

      <section className="section-spacing" data-testid="kb-faq">
        <motion.div className="container-luxury" {...reveal}><div className="max-w-3xl">
          <SectionHead title={c.faqTitle} />
          <motion.div variants={fadeInUp}>
            {c.faq.map((f, i) => <FaqItem key={f.q} item={f} index={i} />)}
          </motion.div>
        </div></motion.div>
      </section>

      <section className="section-spacing bg-[#F4EBD9]">
        <motion.div className="container-luxury text-center" {...reveal}>
          <motion.h2 className="font-heading text-3xl sm:text-4xl mb-4" variants={fadeInUp}>{c.finalTitle}</motion.h2>
          <motion.p className="text-gray-700 max-w-xl mx-auto mb-10" variants={fadeInUp}>{c.finalText}</motion.p>
          <motion.div className="flex justify-center" variants={fadeInUp}><CtaButtons c={c} prefix="kb-final" /></motion.div>
        </motion.div>
      </section>
    </main>
  );
}
