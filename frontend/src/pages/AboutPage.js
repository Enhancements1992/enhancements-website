import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Check } from 'lucide-react';

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

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className="pt-20" data-testid="about-page">
      {/* Hero Section */}
      <section className="section-spacing bg-[#F9F9F9]" data-testid="about-hero">
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
              Enhancements srl
            </motion.span>
            <motion.h1 
              className="font-heading text-4xl sm:text-5xl lg:text-6xl mb-6"
              variants={fadeInUp}
              data-testid="about-hero-title"
            >
              {t('about.heroTitle')}
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600"
              variants={fadeInUp}
            >
              {t('about.heroSubtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-spacing" data-testid="mission-section">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.span 
                className="label-style text-gold mb-4 block"
                variants={fadeInUp}
              >
                {t('about.missionTitle')}
              </motion.span>
              <motion.h2 
                className="font-heading text-3xl sm:text-4xl mb-6"
                variants={fadeInUp}
              >
                {t('about.missionTitle')}
              </motion.h2>
              <motion.p 
                className="text-gray-600 leading-relaxed text-lg"
                variants={fadeInUp}
              >
                {t('about.missionText')}
              </motion.p>
            </motion.div>

            <motion.div
              className="img-zoom-container aspect-[4/3] overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="https://images.pexels.com/photos/4487363/pexels-photo-4487363.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Warehouse logistics"
                className="img-zoom w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-spacing bg-[#0A0A0A] text-white" data-testid="values-section">
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
              {t('about.valuesTitle')}
            </motion.span>
            <motion.h2 
              className="font-heading text-3xl sm:text-4xl lg:text-5xl"
              variants={fadeInUp}
            >
              {t('about.valuesTitle')}
            </motion.h2>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {t('about.values').map((value, index) => (
              <motion.div 
                key={index}
                className="text-center p-8 border border-gray-800 hover:border-gold transition-colors duration-300"
                variants={fadeInUp}
                data-testid={`value-item-${index}`}
              >
                <div className="w-12 h-12 border border-gold flex items-center justify-center mx-auto mb-6">
                  <Check size={24} className="text-gold" />
                </div>
                <h3 className="font-heading text-xl mb-3">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="section-spacing" data-testid="expertise-section">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="img-zoom-container aspect-[4/3] overflow-hidden order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="https://images.pexels.com/photos/3735149/pexels-photo-3735149.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Professional team"
                className="img-zoom w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              className="order-1 lg:order-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.span 
                className="label-style text-gold mb-4 block"
                variants={fadeInUp}
              >
                {t('about.expertiseTitle')}
              </motion.span>
              <motion.h2 
                className="font-heading text-3xl sm:text-4xl mb-6"
                variants={fadeInUp}
              >
                {t('about.expertiseTitle')}
              </motion.h2>
              <motion.p 
                className="text-gray-600 leading-relaxed text-lg mb-8"
                variants={fadeInUp}
              >
                {t('about.expertiseText')}
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Link 
                  to="/contact" 
                  className="btn-primary"
                  data-testid="about-cta"
                >
                  {t('hero.ctaSecondary')}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
