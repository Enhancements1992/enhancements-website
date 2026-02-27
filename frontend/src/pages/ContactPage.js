import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Clock, Mail, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';

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

export default function ContactPage() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    privacy_accepted: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://formspree.io/f/xwpopnpk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          message: formData.message,
          language: language,
          _subject: `Nuovo messaggio da ${formData.name} - Enhancements.eu`
        })
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          message: '',
          privacy_accepted: false
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
        privacy_accepted: false
      });
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=Via+degli+Olmetti+5B+00060+Formello+RM+Italy';

  return (
    <main className="pt-20" data-testid="contact-page">
      {/* Hero Section */}
      <section className="section-spacing bg-[#F9F9F9]" data-testid="contact-hero">
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
              {t('nav.contact')}
            </motion.span>
            <motion.h1 
              className="font-heading text-4xl sm:text-5xl lg:text-6xl mb-6"
              variants={fadeInUp}
              data-testid="contact-hero-title"
            >
              {t('contact.heroTitle')}
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600"
              variants={fadeInUp}
            >
              {t('contact.heroSubtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-spacing" data-testid="contact-form-section">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 
                className="font-heading text-2xl sm:text-3xl mb-8"
                variants={fadeInUp}
              >
                {t('contact.formTitle')}
              </motion.h2>

              {submitStatus === 'success' && (
                <motion.div 
                  className="mb-8 p-4 bg-green-50 border border-green-200 flex items-start gap-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  data-testid="form-success-message"
                >
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                  <p className="text-green-800">{t('contact.form.success')}</p>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div 
                  className="mb-8 p-4 bg-red-50 border border-red-200 flex items-start gap-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  data-testid="form-error-message"
                >
                  <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                  <p className="text-red-800">{t('contact.form.error')}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} data-testid="contact-form">
                <motion.div className="form-group" variants={fadeInUp}>
                  <label htmlFor="name" className="form-label">{t('contact.form.name')} *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-minimal"
                    placeholder={t('contact.form.name')}
                    data-testid="input-name"
                  />
                </motion.div>

                <motion.div className="form-group" variants={fadeInUp}>
                  <label htmlFor="email" className="form-label">{t('contact.form.email')} *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-minimal"
                    placeholder={t('contact.form.email')}
                    data-testid="input-email"
                  />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div className="form-group" variants={fadeInUp}>
                    <label htmlFor="company" className="form-label">{t('contact.form.company')}</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="input-minimal"
                      placeholder={t('contact.form.company')}
                      data-testid="input-company"
                    />
                  </motion.div>

                  <motion.div className="form-group" variants={fadeInUp}>
                    <label htmlFor="phone" className="form-label">{t('contact.form.phone')}</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-minimal"
                      placeholder={t('contact.form.phone')}
                      data-testid="input-phone"
                    />
                  </motion.div>
                </div>

                <motion.div className="form-group" variants={fadeInUp}>
                  <label htmlFor="message" className="form-label">{t('contact.form.message')} *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="input-minimal resize-none"
                    placeholder={t('contact.form.message')}
                    data-testid="input-message"
                  />
                </motion.div>

                <motion.div className="form-group" variants={fadeInUp}>
                  <label className="checkbox-custom">
                    <input
                      type="checkbox"
                      name="privacy_accepted"
                      checked={formData.privacy_accepted}
                      onChange={handleChange}
                      required
                      data-testid="input-privacy"
                    />
                    <span className="text-sm text-gray-600">{t('contact.form.privacy')} *</span>
                  </label>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="submit-button"
                  >
                    {isSubmitting ? '...' : t('contact.form.submit')}
                  </button>
                </motion.div>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 
                className="font-heading text-2xl sm:text-3xl mb-8"
                variants={fadeInUp}
              >
                {t('contact.infoTitle')}
              </motion.h2>

              <div className="space-y-8">
                <motion.div className="contact-info-item" variants={fadeInUp} data-testid="contact-address">
                  <div className="contact-icon">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="label-style text-[#0A0A0A] mb-2">{t('contact.info.address')}</h4>
                    <p className="text-gray-600">
                      Enhancements srl<br />
                      Via degli Olmetti, 5/B<br />
                      00060 Formello (RM)<br />
                      Città Metropolitana di Roma Capitale
                    </p>
                  </div>
                </motion.div>

                <motion.div className="contact-info-item" variants={fadeInUp} data-testid="contact-phone">
                  <div className="contact-icon">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="label-style text-[#0A0A0A] mb-2">{t('contact.info.phone')}</h4>
                    <a 
                      href="tel:+393501339513" 
                      className="text-gray-600 hover:text-gold transition-colors"
                    >
                      +39 350 133 9513
                    </a>
                  </div>
                </motion.div>

                <motion.div className="contact-info-item" variants={fadeInUp} data-testid="contact-email">
                  <div className="contact-icon">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="label-style text-[#0A0A0A] mb-2">Email</h4>
                    <a 
                      href="mailto:info@enhancements.eu" 
                      className="text-gray-600 hover:text-gold transition-colors"
                    >
                      info@enhancements.eu
                    </a>
                  </div>
                </motion.div>

                <motion.div className="contact-info-item" variants={fadeInUp} data-testid="contact-hours">
                  <div className="contact-icon">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="label-style text-[#0A0A0A] mb-2">{t('contact.info.hours')}</h4>
                    <p className="text-gray-600">{t('contact.info.hoursValue')}</p>
                  </div>
                </motion.div>
              </div>

              {/* Google Maps Link */}
              <motion.div 
                className="mt-12"
                variants={fadeInUp}
              >
                <a 
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center gap-2"
                  data-testid="google-maps-link"
                >
                  <MapPin size={16} />
                  {t('contact.map')}
                  <ExternalLink size={14} />
                </a>
              </motion.div>

              {/* Map Preview Image */}
              <motion.div 
                className="mt-8 aspect-video bg-gray-100 overflow-hidden"
                variants={fadeInUp}
              >
                <a 
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                    alt="Location map"
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                  />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
