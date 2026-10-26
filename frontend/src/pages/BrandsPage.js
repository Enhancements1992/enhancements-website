import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useSeo } from '../hooks/useSeo';
import { Check, ArrowRight } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const KBEAUTY_PRODUCTS = {
  'Anua': { img: 'anua.jpg', product: 'Heartleaf 77% Soothing Toner' },
  'Beauty of Joseon': { img: 'boj.jpg', product: 'Relief Sun: Rice + Niacinamide SPF50+' },
  'COSRX': { img: 'cosrx.jpg', product: 'Advanced Snail 96 Mucin Power Essence' },
  'Innisfree': { img: 'innisfree.jpg', product: 'Green Tea Seed Hyaluronic Serum' },
  'Missha': { img: 'missha.jpg', product: 'Time Revolution Night Repair Ampoule' },
  'Some By Mi': { img: 'somebymi.jpg', product: 'AHA BHA PHA 30 Days Miracle Toner' },
  'Skin1004': { img: 'skin1004.jpg', product: 'Madagascar Centella Ampoule' },
  'Round Lab': { img: 'roundlab.jpg', product: '1025 Dokdo Water Gel Mask' }
};

const mailto = (subject) => `mailto:info@enhancements.eu?subject=${encodeURIComponent(subject)}`;

export default function BrandsPage() {
  useSeo('brands', '/brands');
  const { t, language } = useLanguage();

  return (
    <main className="pt-20" data-testid="brands-page">
      {/* Hero Section */}
      <section className="section-spacing bg-[#F9F9F9]" data-testid="brands-hero">
        <div className="container-luxury">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.span 
              className="label-style text-gold mb-4 block"
              variants={fadeInUp}
            >
              {t('brands.label')}
            </motion.span>
            <motion.h1 
              className="font-heading text-4xl sm:text-5xl lg:text-6xl mb-6"
              variants={fadeInUp}
              data-testid="brands-hero-title"
            >
              {t('brandsPage.heroTitle')}
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600"
              variants={fadeInUp}
            >
              {t('brandsPage.heroSubtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Trind Section */}
      <section className="section-spacing" data-testid="trind-section">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="img-zoom-container aspect-square overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="https://customer-assets.emergentagent.com/job_luxury-cosmetics-hub/artifacts/pimj9vxn_WVW_3620-bewerkt.jpg"
                alt="Trind Cosmetics - Natural Nails"
                className="img-zoom w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div 
                className="mb-6"
                variants={fadeInUp}
              >
                <img 
                  src="https://customer-assets.emergentagent.com/job_luxury-cosmetics-hub/artifacts/b7lsz4wm_trind-logo_ytls-jz.png"
                  alt="Trind Logo"
                  className="h-20 object-contain"
                  style={{ filter: 'invert(1)' }}
                />
              </motion.div>
              
              <motion.span 
                className="label-style text-gold mb-2 block"
                variants={fadeInUp}
              >
                {t('brandsPage.trind.subtitle')}
              </motion.span>
              
              <motion.h2 
                className="font-heading text-3xl sm:text-4xl mb-6"
                variants={fadeInUp}
              >
                {t('brandsPage.trind.title')}
              </motion.h2>
              
              <motion.p 
                className="text-gray-600 leading-relaxed mb-4"
                variants={fadeInUp}
              >
                {t('brandsPage.trind.description')}
              </motion.p>

              <motion.p 
                className="text-gray-600 leading-relaxed mb-8"
                variants={fadeInUp}
              >
                {t('brandsPage.trind.longDescription')}
              </motion.p>

              <motion.ul 
                className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8"
                variants={fadeInUp}
              >
                {t('brandsPage.trind.features').map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check size={18} className="text-gold flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </motion.ul>

              <motion.div variants={fadeInUp}>
                <a 
                  href="https://trind.it" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center gap-2"
                  data-testid="trind-website-link"
                >
                  {t('brands.cta')} <ArrowRight size={16} />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trind Products Section */}
      <section className="py-16 bg-[#F9F9F9]" data-testid="trind-products">
        <div className="container-luxury">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h3 
              className="font-heading text-2xl mb-8 text-center"
              variants={fadeInUp}
            >
              {language === 'it' ? 'Prodotti in Evidenza' : 'Featured Products'}
            </motion.h3>
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
              variants={fadeInUp}
            >
              {t('brandsPage.trind.products').map((product, index) => (
                <div key={index} className="bg-white p-4 text-center hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#F4EBD9] flex items-center justify-center">
                    <Check size={20} className="text-gold" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">{product}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trind Gallery Section */}
      <section className="py-16" data-testid="trind-gallery">
        <div className="container-luxury">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              variants={fadeInUp}
            >
              <div className="img-zoom-container aspect-square overflow-hidden">
                <img 
                  src="https://customer-assets.emergentagent.com/job_luxury-cosmetics-hub/artifacts/rjeqzsc6_WVW_3626-bewerkt.jpg"
                  alt="Trind - Beautiful Natural Nails"
                  className="img-zoom w-full h-full object-cover"
                />
              </div>
              <div className="img-zoom-container aspect-square overflow-hidden">
                <img 
                  src="https://customer-assets.emergentagent.com/job_luxury-cosmetics-hub/artifacts/mfewnoio_WVW_3699-bewerkt.jpg"
                  alt="Trind - Nail Care Treatment"
                  className="img-zoom w-full h-full object-cover"
                />
              </div>
              <div className="img-zoom-container aspect-square overflow-hidden">
                <img 
                  src="https://customer-assets.emergentagent.com/job_luxury-cosmetics-hub/artifacts/6bf0vo90_WVW_4075-1080x720.jpeg"
                  alt="Trind - Nail Repair Application"
                  className="img-zoom w-full h-full object-cover"
                />
              </div>
              <div className="img-zoom-container aspect-square overflow-hidden">
                <img 
                  src="https://customer-assets.emergentagent.com/job_luxury-cosmetics-hub/artifacts/po802mms_WVW_4075-bewerkt.jpg"
                  alt="Trind - Professional Nail Treatment"
                  className="img-zoom w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="separator-gold" />

      {/* K-Beauty Section */}
      <section className="section-spacing" data-testid="kbeauty-section">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="order-2 lg:order-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.span className="label-style text-gold mb-2 block" variants={fadeInUp}>
                {t('brandsPage.kbeauty.subtitle')}
              </motion.span>
              <motion.h2 className="font-heading text-3xl sm:text-4xl mb-6" variants={fadeInUp} data-testid="kbeauty-title">
                {t('brandsPage.kbeauty.title')}
              </motion.h2>
              <motion.p className="text-gray-600 leading-relaxed mb-4" variants={fadeInUp}>
                {t('brandsPage.kbeauty.description')}
              </motion.p>
              <motion.p className="text-gray-600 leading-relaxed mb-8" variants={fadeInUp}>
                {t('brandsPage.kbeauty.longDescription')}
              </motion.p>
              <motion.ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8" variants={fadeInUp}>
                {t('brandsPage.kbeauty.features').map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check size={18} className="text-gold flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </motion.ul>
              <motion.div className="flex flex-wrap gap-4" variants={fadeInUp}>
                <a
                  href={mailto(t('brandsPage.kbeauty.mailSubject'))}
                  className="btn-primary inline-flex items-center gap-2"
                  data-testid="kbeauty-contact-link"
                >
                  {t('brandsPage.kbeauty.cta')} <ArrowRight size={16} />
                </a>
                <Link to="/cosmetici-coreani" className="btn-secondary inline-flex items-center gap-2" data-testid="kbeauty-page-link">
                  {t('brands.cta')} <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="img-zoom-container aspect-square overflow-hidden order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/images/kbeauty/skin1004.jpg"
                alt="Skin1004 Madagascar Centella Ampoule - K-Beauty"
                className="img-zoom w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* K-Beauty Brands Grid */}
      <section className="py-16 bg-[#F9F9F9]" data-testid="kbeauty-brands">
        <div className="container-luxury">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h3 className="font-heading text-2xl mb-3 text-center" variants={fadeInUp}>
              {t('brandsPage.kbeauty.brandsTitle')}
            </motion.h3>
            <motion.p className="text-gray-600 text-center max-w-2xl mx-auto mb-10" variants={fadeInUp}>
              {t('brandsPage.kbeauty.brandsSubtitle')}
            </motion.p>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" variants={fadeInUp}>
              {t('brandsPage.kbeauty.brands').map((brand) => (
                <a
                  key={brand.name}
                  href={mailto(`${t('brandsPage.kbeauty.mailSubject')} - ${brand.name}`)}
                  className="group bg-white border border-transparent hover:border-[#C5A059] hover:shadow-md transition-[box-shadow,border-color] duration-300"
                  data-testid={`kbeauty-brand-${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="img-zoom-container aspect-square overflow-hidden bg-[#F4F4F4]">
                    <img
                      src={`/images/kbeauty/${KBEAUTY_PRODUCTS[brand.name].img}`}
                      alt={`${brand.name} - ${KBEAUTY_PRODUCTS[brand.name].product}`}
                      className="img-zoom w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                  <p className="font-heading text-xl mb-1">{brand.name}</p>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">{KBEAUTY_PRODUCTS[brand.name].product}</p>
                  <p className="text-sm text-gray-600 mb-4">{brand.description}</p>
                  <span className="text-xs uppercase tracking-wider text-gold inline-flex items-center gap-2">
                    {t('brandsPage.kbeauty.requestInfo')}
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  </div>
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-[#0A0A0A] text-white" data-testid="brands-cta-section">
        <div className="container-luxury text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="font-heading text-3xl sm:text-4xl lg:text-5xl mb-6"
              variants={fadeInUp}
            >
              {t('cta.title')}
            </motion.h2>
            <motion.p 
              className="text-gray-400 text-lg max-w-xl mx-auto mb-10"
              variants={fadeInUp}
            >
              {t('cta.subtitle')}
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link 
                to="/contact" 
                className="btn-primary bg-gold hover:bg-white hover:text-black"
                data-testid="brands-cta-button"
              >
                {t('cta.button')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
