import React, { useRef, useState } from 'react';
import { CheckCircle, AlertCircle, Send, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { priceListContent, BRAND_OPTIONS, whatsappUrl } from '../content/priceListContent';

const EMPTY = { company: '', vat: '', shopType: '', contact: '', email: '', phone: '', city: '', message: '', brands: [], privacy: false };
const VAT_RE = /^(IT)?\s?\d{11}$/i;

const Field = ({ id, label, required, children }) => (
  <div className="form-group">
    <label htmlFor={id} className="form-label">{label}{required && ' *'}</label>
    {children}
  </div>
);

const Status = ({ type, text }) => (
  <div className={`flex items-center gap-3 p-4 mb-6 ${type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`} data-testid={`pricelist-${type}`}>
    {type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
    <span className="text-sm">{text}</span>
  </div>
);

export const PriceListForm = () => {
  const { language } = useLanguage();
  const c = priceListContent[language];
  const f = c.fields;
  const formRef = useRef(null);
  const [data, setData] = useState(EMPTY);
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((d) => ({ ...d, [name]: type === 'checkbox' ? checked : value }));
  };
  const toggleBrand = (b) => setData((d) => ({ ...d, brands: d.brands.includes(b) ? d.brands.filter((x) => x !== b) : [...d.brands, b] }));

  const isValid = () => {
    const vat = formRef.current.elements.vat;
    vat.setCustomValidity(VAT_RE.test(data.vat.trim()) ? '' : c.vatError);
    return formRef.current.reportValidity();
  };

  const summary = () => [
    `${f.company}: ${data.company}`, `${f.vat}: ${data.vat}`, `${f.shopType}: ${data.shopType}`,
    `${f.contact}: ${data.contact}`, `${f.email}: ${data.email}`, `${f.phone}: ${data.phone || '-'}`,
    `${f.city}: ${data.city || '-'}`, `${f.brands}: ${data.brands.join(', ') || '-'}`, `${f.message}: ${data.message || '-'}`
  ].join('\n');

  const sendWhatsapp = () => {
    if (!isValid()) return;
    window.open(whatsappUrl(`${c.waIntro}\n\n${summary()}`), '_blank', 'noopener');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) return;
    setSending(true);
    setStatus(null);
    try {
      const res = await fetch('https://formspree.io/f/xkovegre', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          tipo_richiesta: 'Richiesta listino B2B',
          ragione_sociale: data.company, partita_iva: data.vat, tipo_attivita: data.shopType,
          referente: data.contact, email: data.email, telefono: data.phone, citta: data.city,
          brand: data.brands.join(', '), note: data.message, lingua: language,
          _replyto: data.email,
          _subject: `Richiesta listino B2B - ${data.company} (${data.shopType})`
        })
      });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) setData(EMPTY);
    } catch {
      setStatus('error');
    } finally {
      setSending(false);
    }
  };

  const input = (name, type = 'text', required = false) => (
    <input id={`pl-${name}`} name={name} type={type} value={data[name]} onChange={onChange} required={required} className="input-minimal" placeholder={f[name]} data-testid={`pricelist-input-${name}`} />
  );

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate={false} data-testid="pricelist-form">
      {status && <Status type={status} text={c[status]} />}
      <Field id="pl-company" label={f.company} required>{input('company', 'text', true)}</Field>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field id="pl-vat" label={f.vat} required>
          <input id="pl-vat" name="vat" value={data.vat} onChange={(e) => { e.target.setCustomValidity(''); onChange(e); }} required className="input-minimal" placeholder="IT01234567890" inputMode="numeric" data-testid="pricelist-input-vat" />
        </Field>
        <Field id="pl-shopType" label={f.shopType} required>
          <select id="pl-shopType" name="shopType" value={data.shopType} onChange={onChange} required className="input-minimal bg-transparent" data-testid="pricelist-select-shoptype">
            <option value="">{c.selectPlaceholder}</option>
            {c.shopTypes.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field id="pl-contact" label={f.contact} required>{input('contact', 'text', true)}</Field>
        <Field id="pl-email" label={f.email} required>{input('email', 'email', true)}</Field>
        <Field id="pl-phone" label={f.phone}>{input('phone', 'tel')}</Field>
        <Field id="pl-city" label={f.city}>{input('city')}</Field>
      </div>
      <div className="form-group">
        <span className="form-label">{f.brands}</span>
        <div className="flex flex-wrap gap-2 mt-2">
          {BRAND_OPTIONS.map((b) => {
            const on = data.brands.includes(b);
            return (
              <button type="button" key={b} onClick={() => toggleBrand(b)} aria-pressed={on}
                className={`px-3 py-2 text-xs border transition-colors duration-200 ${on ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]' : 'border-gray-300 hover:border-[#C5A059]'}`}
                data-testid={`pricelist-brand-${b.toLowerCase().replace(/\s+/g, '-')}`}>
                {b}
              </button>
            );
          })}
        </div>
      </div>
      <Field id="pl-message" label={f.message}>
        <textarea id="pl-message" name="message" rows={3} value={data.message} onChange={onChange} className="input-minimal resize-none" data-testid="pricelist-input-message" />
      </Field>
      <label className="flex items-start gap-3 mb-8 cursor-pointer">
        <input type="checkbox" name="privacy" checked={data.privacy} onChange={onChange} required className="mt-1" data-testid="pricelist-privacy" />
        <span className="text-sm text-gray-600">{f.privacy}</span>
      </label>
      <div className="flex flex-wrap gap-4">
        <button type="submit" disabled={sending} className="btn-primary inline-flex items-center gap-2 disabled:opacity-60" data-testid="pricelist-submit">
          <Send size={16} /> {sending ? c.sending : c.submit}
        </button>
        <button type="button" onClick={sendWhatsapp} className="btn-secondary inline-flex items-center gap-2 !border-[#25D366] hover:!bg-[#25D366] hover:!text-white" data-testid="pricelist-whatsapp">
          <MessageCircle size={16} /> {c.whatsapp}
        </button>
      </div>
    </form>
  );
};
