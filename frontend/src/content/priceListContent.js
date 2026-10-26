export const WHATSAPP_NUMBER = '393501339513';
export const whatsappUrl = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const BRAND_OPTIONS = ['Trind', 'Anua', 'Beauty of Joseon', 'COSRX', 'Innisfree', 'Missha', 'Some By Mi', 'Skin1004', 'Round Lab'];

export const priceListContent = {
  it: {
    label: 'Area Rivenditori',
    h1: 'Richiedi il Listino B2B',
    intro: 'Sei una farmacia, una profumeria o un rivenditore? Compila il modulo: ti invieremo listino prezzi, disponibilità e condizioni commerciali dedicate per i brand Trind e K-Beauty.',
    formTitle: 'Dati della tua attività',
    fields: {
      company: 'Ragione sociale',
      vat: 'Partita IVA',
      shopType: 'Tipo di attività',
      contact: 'Nome referente',
      email: 'Email',
      phone: 'Telefono',
      city: 'Città',
      brands: 'Brand di interesse',
      message: 'Note (facoltativo)',
      privacy: 'Accetto la privacy policy e acconsento al trattamento dei dati per ricevere il listino.'
    },
    selectPlaceholder: 'Seleziona...',
    shopTypes: ['Farmacia', 'Parafarmacia', 'Profumeria', 'Centro estetico / SPA', 'E-commerce', 'Negozio / Concept store', 'Grossista', 'Altro'],
    vatError: 'Inserisci una Partita IVA valida (11 cifre).',
    submit: 'Invia richiesta via email',
    whatsapp: 'Invia via WhatsApp',
    sending: 'Invio in corso...',
    success: 'Richiesta inviata! Ti invieremo il listino al più presto.',
    error: 'Si è verificato un errore. Riprova o scrivici su WhatsApp.',
    waIntro: 'Buongiorno, vorrei ricevere il listino B2B.',
    asideTitle: 'Cosa riceverai',
    aside: ['Listino prezzi B2B riservato', 'Disponibilità aggiornata dei prodotti', 'Condizioni commerciali e minimi d\'ordine', 'Materiali di vendita e schede prodotto'],
    asideNote: 'Vendita riservata ad aziende e professionisti con Partita IVA.'
  },
  en: {
    label: 'Resellers Area',
    h1: 'Request the B2B Price List',
    intro: 'Are you a pharmacy, perfumery or retailer? Fill in the form: we will send you price list, availability and dedicated trade terms for Trind and K-Beauty brands.',
    formTitle: 'Your business details',
    fields: {
      company: 'Company name',
      vat: 'VAT number',
      shopType: 'Business type',
      contact: 'Contact person',
      email: 'Email',
      phone: 'Phone',
      city: 'City',
      brands: 'Brands of interest',
      message: 'Notes (optional)',
      privacy: 'I accept the privacy policy and consent to data processing to receive the price list.'
    },
    selectPlaceholder: 'Select...',
    shopTypes: ['Pharmacy', 'Parapharmacy', 'Perfumery', 'Beauty center / SPA', 'E-commerce', 'Store / Concept store', 'Wholesaler', 'Other'],
    vatError: 'Please enter a valid VAT number (Italian: 11 digits).',
    submit: 'Send request by email',
    whatsapp: 'Send via WhatsApp',
    sending: 'Sending...',
    success: 'Request sent! We will send you the price list as soon as possible.',
    error: 'An error occurred. Please try again or message us on WhatsApp.',
    waIntro: 'Hello, I would like to receive the B2B price list.',
    asideTitle: 'What you will receive',
    aside: ['Reserved B2B price list', 'Updated product availability', 'Trade terms and minimum order', 'Sales materials and product sheets'],
    asideNote: 'Sales reserved for businesses and professionals with a VAT number.'
  }
};
