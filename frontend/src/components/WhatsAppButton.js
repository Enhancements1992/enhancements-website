import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { whatsappUrl } from '../content/priceListContent';

const TEXT = {
  it: { msg: 'Buongiorno, vorrei informazioni sui prezzi B2B dei vostri prodotti.', label: 'Scrivici su WhatsApp' },
  en: { msg: 'Hello, I would like information about your B2B prices.', label: 'Message us on WhatsApp' }
};

export const WhatsAppButton = () => {
  const { language } = useLanguage();
  const t = TEXT[language];

  return (
    <a
      href={whatsappUrl(t.msg)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.label}
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] text-white rounded-full shadow-lg p-4 transition-transform duration-300 hover:scale-105"
      data-testid="whatsapp-float-button"
    >
      <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor" aria-hidden="true">
        <path d="M16.04 3C8.86 3 3.03 8.82 3.03 16c0 2.29.6 4.53 1.74 6.5L3 29l6.68-1.75A12.95 12.95 0 0 0 16.04 29C23.2 29 29 23.18 29 16S23.2 3 16.04 3Zm0 23.65c-1.98 0-3.92-.53-5.61-1.54l-.4-.24-3.96 1.04 1.06-3.86-.26-.4A10.6 10.6 0 0 1 5.4 16c0-5.87 4.77-10.64 10.64-10.64 5.86 0 10.62 4.77 10.62 10.64 0 5.87-4.76 10.65-10.62 10.65Zm5.83-7.97c-.32-.16-1.89-.93-2.18-1.04-.29-.1-.5-.16-.72.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66 0 1.57 1.14 3.09 1.3 3.3.16.21 2.25 3.43 5.44 4.81.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.89-.77 2.15-1.52.27-.74.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37Z" />
      </svg>
      <span className="hidden md:inline max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-[max-width] duration-300 group-hover:max-w-[220px]">
        {t.label}
      </span>
    </a>
  );
};
