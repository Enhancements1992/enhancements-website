import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/brands', label: t('nav.brands') },
    { path: '/services', label: t('nav.services') },
    { path: '/contact', label: t('nav.contact') }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 w-full z-50 bg-white shadow-sm"
        data-testid="header"
      >
        <div className="container-luxury h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center" data-testid="logo-link">
            <img 
              src="https://customer-assets.emergentagent.com/job_luxury-cosmetics-hub/artifacts/gdm7f77x_Senza%20titolo-1.jpg"
              alt="Enhancements"
              className="h-8 md:h-10 object-contain mix-blend-multiply"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10" data-testid="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                data-testid={`nav-link-${link.path.replace('/', '') || 'home'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side: Language + CTA */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Language Switcher */}
            <div className="lang-switch" data-testid="language-switcher">
              <button
                onClick={() => setLanguage('it')}
                className={`lang-btn ${language === 'it' ? 'active' : ''}`}
                data-testid="lang-it"
              >
                IT
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                data-testid="lang-en"
              >
                EN
              </button>
            </div>

            {/* CTA Button */}
            <Link
              to="/contact"
              className="btn-primary text-xs"
              data-testid="header-cta"
            >
              {t('hero.ctaSecondary')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2"
            data-testid="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu"
            data-testid="mobile-menu"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`mobile-menu-link ${isActive(link.path) ? 'text-gold' : ''}`}
                    data-testid={`mobile-nav-link-${link.path.replace('/', '') || 'home'}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Mobile Language Switcher */}
            <div className="lang-switch mt-8" data-testid="mobile-language-switcher">
              <button
                onClick={() => setLanguage('it')}
                className={`lang-btn text-base ${language === 'it' ? 'active' : ''}`}
              >
                Italiano
              </button>
              <span className="text-gray-300 mx-2">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={`lang-btn text-base ${language === 'en' ? 'active' : ''}`}
              >
                English
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
