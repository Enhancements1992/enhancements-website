import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
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

export default function BrandsPage() {
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
                  href="https://www.trinditalia.it" 
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

      {/* Ingrid Section */}
      <section className="section-spacing" data-testid="ingrid-section">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="order-2 lg:order-1"
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
                  src="https://customer-assets.emergentagent.com/job_luxury-cosmetics-hub/artifacts/w4c2hk0c_ingrid-cosmetics.png"
                  alt="Ingrid Logo"
                  className="h-12 object-contain"
                />
              </motion.div>
              
              <motion.span 
                className="label-style text-gold mb-2 block"
                variants={fadeInUp}
              >
                {t('brandsPage.ingrid.subtitle')}
              </motion.span>
              
              <motion.h2 
                className="font-heading text-3xl sm:text-4xl mb-6"
                variants={fadeInUp}
              >
                {t('brandsPage.ingrid.title')}
              </motion.h2>
              
              <motion.p 
                className="text-gray-600 leading-relaxed mb-4"
                variants={fadeInUp}
              >
                {t('brandsPage.ingrid.description')}
              </motion.p>

              <motion.p 
                className="text-gray-600 leading-relaxed mb-6"
                variants={fadeInUp}
              >
                {t('brandsPage.ingrid.longDescription')}
              </motion.p>

              {/* Certifications */}
              <motion.div 
                className="flex flex-wrap gap-3 mb-6"
                variants={fadeInUp}
              >
                {t('brandsPage.ingrid.certifications').map((cert, index) => (
                  <span key={index} className="px-3 py-1 bg-[#F4EBD9] text-[#0A0A0A] text-xs font-semibold uppercase tracking-wider">
                    {cert}
                  </span>
                ))}
              </motion.div>

              <motion.ul 
                className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8"
                variants={fadeInUp}
              >
                {t('brandsPage.ingrid.features').map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check size={18} className="text-gold flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </motion.ul>

              <motion.div variants={fadeInUp}>
                <a 
                  href="mailto:info@enhancements.eu?subject=Richiesta%20informazioni%20Ingrid%20Cosmetics"
                  className="btn-primary inline-flex items-center gap-2"
                  data-testid="ingrid-contact-link"
                >
                  {language === 'it' ? 'Contattaci' : 'Contact Us'} <ArrowRight size={16} />
                </a>
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
                src="https://customer-assets.emergentagent.com/job_luxury-cosmetics-hub/artifacts/0ad4ayzh_3266_5902026632621-5902026632638-5902026632652-5902026632645-5902026661584-1.jpg"
                alt="Ingrid Cosmetics"
                className="img-zoom w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ingrid Gallery Section */}
      <section className="py-16 bg-[#F9F9F9]" data-testid="ingrid-gallery">
        <div className="container-luxury">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              variants={fadeInUp}
            >
              <div className="img-zoom-container aspect-square overflow-hidden">
                <img 
                  src="https://customer-assets.emergentagent.com/job_luxury-cosmetics-hub/artifacts/251saidg_3402_mineral-silk-lifestyle-2.jpg"
                  alt="Ingrid Mineral Silk Foundation"
                  className="img-zoom w-full h-full object-cover"
                />
              </div>
              <div className="img-zoom-container aspect-square overflow-hidden">
                <img 
                  src="https://customer-assets.emergentagent.com/job_luxury-cosmetics-hub/artifacts/kguw9536_3368_5902026663458-lel-fixation-2.jpg"
                  alt="Ingrid Eyebrow Fixation"
                  className="img-zoom w-full h-full object-cover"
                />
              </div>
              <div className="img-zoom-container aspect-square overflow-hidden">
                <img 
                  src="https://customer-assets.emergentagent.com/job_luxury-cosmetics-hub/artifacts/0ad4ayzh_3266_5902026632621-5902026632638-5902026632652-5902026632645-5902026661584-1.jpg"
                  alt="Ingrid Ideal Matt Foundation"
                  className="img-zoom w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Ingrid Certifications Section */}
      <section className="py-16 bg-[#0A0A0A] text-white" data-testid="ingrid-certifications">
        <div className="container-luxury">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="flex flex-col items-center">
              <div className="w-16 h-16 border border-gold rounded-full flex items-center justify-center mb-4">
                <Check size={28} className="text-gold" />
              </div>
              <p className="text-sm font-semibold">Cruelty Free</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col items-center">
              <div className="w-16 h-16 border border-gold rounded-full flex items-center justify-center mb-4">
                <Check size={28} className="text-gold" />
              </div>
              <p className="text-sm font-semibold">{language === 'it' ? 'Certificato ISO' : 'ISO Certified'}</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col items-center">
              <div className="w-16 h-16 border border-gold rounded-full flex items-center justify-center mb-4">
                <Check size={28} className="text-gold" />
              </div>
              <p className="text-sm font-semibold">Made in EU</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col items-center">
              <div className="w-16 h-16 border border-gold rounded-full flex items-center justify-center mb-4">
                <Check size={28} className="text-gold" />
              </div>
              <p className="text-sm font-semibold">{language === 'it' ? 'Laboratorio Proprio' : 'Own Laboratory'}</p>
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
