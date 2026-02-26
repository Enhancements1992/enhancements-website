import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Truck, Users, HeadphonesIcon, Package, BookOpen, Megaphone } from 'lucide-react';

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

const services = [
  { key: 'distribution', icon: Truck },
  { key: 'support', icon: Users },
  { key: 'consulting', icon: HeadphonesIcon },
  { key: 'logistics', icon: Package },
  { key: 'training', icon: BookOpen },
  { key: 'marketing', icon: Megaphone }
];

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <main className="pt-20" data-testid="services-page">
      {/* Hero Section */}
      <section className="section-spacing bg-[#F9F9F9]" data-testid="services-hero">
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
              {t('services.label')}
            </motion.span>
            <motion.h1 
              className="font-heading text-4xl sm:text-5xl lg:text-6xl mb-6"
              variants={fadeInUp}
              data-testid="services-hero-title"
            >
              {t('servicesPage.heroTitle')}
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600"
              variants={fadeInUp}
            >
              {t('servicesPage.heroSubtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-spacing" data-testid="services-grid">
        <div className="container-luxury">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E5E5E5]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              const serviceData = t(`servicesPage.${service.key}`);
              return (
                <motion.div 
                  key={service.key}
                  className="bg-white p-8 md:p-12 hover:bg-[#FAFAFA] transition-colors duration-500"
                  variants={fadeInUp}
                  data-testid={`service-detail-${service.key}`}
                >
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 border border-gold flex items-center justify-center flex-shrink-0">
                      <Icon size={24} className="text-gold" />
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl mb-4">{serviceData.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{serviceData.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Image Section */}
      <section className="relative h-[50vh] overflow-hidden" data-testid="services-image">
        <img 
          src="https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Professional cosmetics distribution"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="text-center text-white px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl mb-4">
              {t('intro.title')}
            </h2>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-[#0A0A0A] text-white" data-testid="services-cta-section">
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
                data-testid="services-cta-button"
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
