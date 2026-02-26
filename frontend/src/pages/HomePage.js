import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Truck, Users, HeadphonesIcon, Package, BookOpen, Megaphone } from 'lucide-react';

// Animation variants
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

// Service icons mapping
const serviceIcons = [Truck, Users, HeadphonesIcon, Package, BookOpen, Megaphone];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <main data-testid="home-page">
      {/* Hero Section */}
      <section className="hero-section" data-testid="hero-section">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://customer-assets.emergentagent.com/job_luxury-cosmetics-hub/artifacts/rjeqzsc6_WVW_3626-bewerkt.jpg')` 
          }}
        />
        <div className="hero-overlay" />
        
        <motion.div 
          className="hero-content container-luxury text-center text-white px-4"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 
            className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl max-w-5xl mx-auto leading-tight mb-6"
            variants={fadeInUp}
            data-testid="hero-title"
          >
            {t('hero.title')}
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10"
            variants={fadeInUp}
          >
            {t('hero.subtitle')}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeInUp}
          >
            <Link 
              to="/brands" 
              className="btn-primary"
              data-testid="hero-cta-primary"
            >
              {t('hero.cta')}
            </Link>
            <Link 
              to="/contact" 
              className="btn-secondary border-white text-white hover:bg-white hover:text-black"
              data-testid="hero-cta-secondary"
            >
              {t('hero.ctaSecondary')}
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <span className="label-style text-[10px]">Scroll</span>
          <div className="scroll-indicator-line" />
        </div>
      </section>

      {/* Intro Section */}
      <section className="section-spacing bg-white" data-testid="intro-section">
        <div className="container-luxury">
          <motion.div 
            className="max-w-4xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.span 
              className="label-style text-gold mb-4 block"
              variants={fadeInUp}
            >
              {t('intro.label')}
            </motion.span>
            
            <motion.h2 
              className="font-heading text-3xl sm:text-4xl lg:text-5xl mb-8"
              variants={fadeInUp}
            >
              {t('intro.title')}
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 leading-relaxed"
              variants={fadeInUp}
            >
              {t('intro.description')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Brands Showcase */}
      <section data-testid="brands-section">
        <div className="container-luxury py-12">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.span 
              className="label-style text-gold mb-4 block"
              variants={fadeInUp}
            >
              {t('brands.label')}
            </motion.span>
            <motion.h2 
              className="font-heading text-3xl sm:text-4xl lg:text-5xl"
              variants={fadeInUp}
            >
              {t('brands.title')}
            </motion.h2>
          </motion.div>
        </div>

        <div className="brand-split">
          {/* Trind Card */}
          <motion.div 
            className="brand-card"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="https://customer-assets.emergentagent.com/job_luxury-cosmetics-hub/artifacts/po802mms_WVW_4075-bewerkt.jpg" 
              alt="Trind Cosmetics"
              className="brand-card-image"
            />
            <div className="brand-card-overlay" />
            <div className="brand-card-content text-white">
              <img 
                src="https://customer-assets.emergentagent.com/job_luxury-cosmetics-hub/artifacts/b7lsz4wm_trind-logo_ytls-jz.png"
                alt="Trind Logo"
                className="h-16 md:h-20 mb-4 object-contain"
                style={{ mixBlendMode: 'screen' }}
              />
              <h3 className="font-heading text-3xl md:text-4xl mb-2">
                {t('brands.trind.name')}
              </h3>
              <p className="text-gray-200 text-center max-w-sm mb-6">
                {t('brands.trind.description')}
              </p>
              <Link 
                to="/brands" 
                className="btn-secondary border-white text-white hover:bg-white hover:text-black text-xs"
                data-testid="brand-trind-cta"
              >
                {t('brands.cta')} <ArrowRight size={14} className="inline ml-2" />
              </Link>
            </div>
          </motion.div>

          {/* Ingrid Card */}
          <motion.div 
            className="brand-card"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img 
              src="https://customer-assets.emergentagent.com/job_luxury-cosmetics-hub/artifacts/251saidg_3402_mineral-silk-lifestyle-2.jpg" 
              alt="Ingrid Cosmetics"
              className="brand-card-image"
            />
            <div className="brand-card-overlay" />
            <div className="brand-card-content text-white">
              <img 
                src="https://customer-assets.emergentagent.com/job_luxury-cosmetics-hub/artifacts/w4c2hk0c_ingrid-cosmetics.png"
                alt="Ingrid Logo"
                className="h-12 md:h-16 mb-4 object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <h3 className="font-heading text-3xl md:text-4xl mb-2">
                {t('brands.ingrid.name')}
              </h3>
              <p className="text-gray-200 text-center max-w-sm mb-6">
                {t('brands.ingrid.description')}
              </p>
              <Link 
                to="/brands" 
                className="btn-secondary border-white text-white hover:bg-white hover:text-black text-xs"
                data-testid="brand-ingrid-cta"
              >
                {t('brands.cta')} <ArrowRight size={14} className="inline ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-spacing bg-[#F9F9F9]" data-testid="services-section">
        <div className="container-luxury">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.span 
              className="label-style text-gold mb-4 block"
              variants={fadeInUp}
            >
              {t('services.label')}
            </motion.span>
            <motion.h2 
              className="font-heading text-3xl sm:text-4xl lg:text-5xl"
              variants={fadeInUp}
            >
              {t('services.title')}
            </motion.h2>
          </motion.div>

          <motion.div 
            className="bento-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {t('services.items').map((service, index) => {
              const Icon = serviceIcons[index];
              return (
                <motion.div 
                  key={index}
                  className="bento-item"
                  variants={fadeInUp}
                  data-testid={`service-item-${index}`}
                >
                  <Icon size={28} className="text-gold" />
                  <h3 className="font-heading text-xl">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-[#0A0A0A] text-white" data-testid="cta-section">
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
                data-testid="cta-button"
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
