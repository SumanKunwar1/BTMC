import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Loader2, AlertCircle, Flame, Star, Heart, Moon } from 'lucide-react';
import emailjs from '@emailjs/browser';

// ─────────────────────────────────────────────────────────────────────────────
// EMAILJS CONFIG — fill in your keys here
// Dashboard: https://www.emailjs.com
// ─────────────────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';    // e.g. 'service_wklc209'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';   // e.g. 'template_abc123'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';    // Account → API Keys

// NOTE — 412 error fix: In EmailJS → your template → Settings tab →
// set "To Email" to a fixed address: info@btmcfoundation.org
// ─────────────────────────────────────────────────────────────────────────────

const SL = {
  height: '1px',
  background: 'linear-gradient(90deg,transparent,rgba(185,28,28,0.2),rgba(217,119,6,0.15),rgba(185,28,28,0.2),transparent)',
};

// ── Services data ─────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: 'birthday',
    icon: '🎂',
    lucideIcon: Star,
    title: 'Birthday Happiness Ceremony',
    price: 205,
    currency: 'USD',
    shortDesc: 'Celebrate life with sacred blessings and merit-creating offerings.',
    fullDesc: 'A special ceremony dedicated to celebrating a birthday and creating positive merit. It includes 108 butter lamp offerings, food offering to monks, long-life prayers, and blessings for success, happiness, and good health.',
    includes: ['108 Butter Lamp Offerings', 'Food Offering to Monks', 'Long-Life Prayers', 'Blessings for Success & Health'],
    color: '#d97706',
    gradient: 'linear-gradient(135deg,rgba(217,119,6,0.08),rgba(217,119,6,0.03))',
    border: 'rgba(217,119,6,0.2)',
    accentBorder: 'rgba(217,119,6,0.5)',
  },
  {
    id: 'wish',
    icon: '✨',
    lucideIcon: Star,
    title: 'Wish-Fulfillment Puja Ceremony',
    price: 205,
    currency: 'USD',
    shortDesc: 'Remove obstacles and invite harmony, prosperity, and positive opportunities.',
    fullDesc: 'Monks perform a special puja and feast offering to help fulfill personal wishes and remove obstacles, bringing harmony, prosperity, and positive opportunities in life.',
    includes: ['Special Puja by Monks', 'Feast Offering', 'Obstacle Removal Practice', 'Prosperity & Harmony Prayers'],
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg,rgba(124,58,237,0.08),rgba(124,58,237,0.03))',
    border: 'rgba(124,58,237,0.2)',
    accentBorder: 'rgba(124,58,237,0.5)',
  },
  {
    id: 'healing',
    icon: '🌿',
    lucideIcon: Heart,
    title: 'Healing for Peace & Mental Health',
    price: 305,
    currency: 'USD',
    shortDesc: 'Distance healing to cleanse negative energies and restore inner peace.',
    fullDesc: 'Spiritual masters perform distance healing practices to cleanse negative energies, strengthen mental clarity, and empower inner peace, emotional balance, and success.',
    includes: ['Distance Healing Practice', 'Negative Energy Cleansing', 'Mental Clarity Strengthening', 'Inner Peace Empowerment'],
    color: '#16a34a',
    gradient: 'linear-gradient(135deg,rgba(22,163,74,0.08),rgba(22,163,74,0.03))',
    border: 'rgba(22,163,74,0.2)',
    accentBorder: 'rgba(22,163,74,0.5)',
  },
  {
    id: 'lamps',
    icon: '🪔',
    lucideIcon: Flame,
    title: '1002 Butter Lamp Offering',
    subtitle: 'at 10 Sacred Pilgrimage Sites of Nepal',
    price: 501,
    currency: 'USD',
    shortDesc: '1002 butter lamps offered across Nepal\'s most sacred pilgrimage sites.',
    fullDesc: 'A sacred offering of 1002 butter lamps performed across important pilgrimage sites in Nepal, including Boudhanath Stupa, Swayambhunath Stupa, Namo Buddha, Lumbini, Pharping, Halesi Mahadev Cave, and Tsum Valley. This ceremony can be dedicated for special occasions, personal prayers, or for deceased loved ones, including prayers for peaceful transition and Pure Land rebirth.',
    includes: ['Boudhanath Stupa', 'Swayambhunath Stupa', 'Namo Buddha', 'Lumbini', 'Pharping', 'Halesi Mahadev Cave', 'Tsum Valley & More'],
    color: '#b91c1c',
    gradient: 'linear-gradient(135deg,rgba(185,28,28,0.08),rgba(185,28,28,0.03))',
    border: 'rgba(185,28,28,0.2)',
    accentBorder: 'rgba(185,28,28,0.5)',
  },
  {
    id: 'gonjo',
    icon: '🙏',
    lucideIcon: Moon,
    title: 'Gonjo Puja for the Deceased',
    price: 1500,
    currency: 'USD',
    shortDesc: 'A full-day sacred ritual guiding the departed toward peaceful rebirth.',
    fullDesc: 'A special one-day detailed ritual ceremony performed by a group of monks dedicated to a deceased person. The ceremony includes butter lamp offerings, extensive prayers, and the sacred Phowa practice performed by a renowned master, helping guide the consciousness of the departed toward a peaceful and fortunate rebirth.',
    includes: ['Full-Day Monk Ceremony', 'Butter Lamp Offerings', 'Extensive Prayers', 'Phowa Practice by Renowned Master', 'Guidance to Pure Land Rebirth'],
    color: '#0891b2',
    gradient: 'linear-gradient(135deg,rgba(8,145,178,0.08),rgba(8,145,178,0.03))',
    border: 'rgba(8,145,178,0.2)',
    accentBorder: 'rgba(8,145,178,0.5)',
  },
];

const COUNTRIES = [
  'Nepal','India','USA','UK','Australia','Canada','Germany','France',
  'Singapore','Japan','Thailand','Bhutan','Sri Lanka','Myanmar','Other',
];

// ── Booking Modal ─────────────────────────────────────────────────────────────
interface BookingModalProps {
  service: typeof SERVICES[0] | null;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ service, onClose }) => {
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', country: 'Nepal',
    dedicatedTo: '', specialMessage: '', preferredDate: '',
  });
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const inp = (f: string): React.CSSProperties => ({
    width: '100%', padding: '10px 12px', boxSizing: 'border-box',
    background: '#fdf8f3',
    border: `1px solid ${focused === f ? (service?.color || '#b91c1c') : 'rgba(185,28,28,0.2)'}`,
    borderRadius: '4px', color: '#1a0808',
    fontFamily: "'Crimson Text',serif", fontSize: '15px',
    outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
    boxShadow: focused === f ? `0 0 0 3px ${service?.color || '#b91c1c'}18` : 'none',
  });

  const lbl: React.CSSProperties = {
    fontFamily: "'Cinzel',serif", fontSize: '8px', letterSpacing: '0.25em',
    color: '#a07070', textTransform: 'uppercase', display: 'block', marginBottom: '4px',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setSendError(null);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email:        'info@btmcfoundation.org',
          name:            form.fullName,
          email:           form.email,
          phone:           form.phone,
          country:         form.country,
          service_name:    service?.title || '',
          service_price:   `$${service?.price} USD`,
          dedicated_to:    form.dedicatedTo || 'N/A',
          preferred_date:  form.preferredDate || 'Flexible',
          special_message: form.specialMessage || 'None',
          time: new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' }),
        },
        EMAILJS_PUBLIC_KEY,
      );
      setSubmitted(true);
    } catch (err: any) {
      if (err?.status === 412) {
        setSendError('Setup issue (412): In EmailJS → template → Settings → set "To Email" to info@btmcfoundation.org (fixed address, not a variable).');
      } else if (err?.status === 401) {
        setSendError('Invalid EmailJS public key. Check your API keys in the Services.tsx file.');
      } else {
        setSendError('Failed to send. Please try again or email us directly.');
      }
    } finally {
      setIsSending(false);
    }
  };

  const handleClose = () => {
    if (!isSending) {
      setSendError(null);
      setSubmitted(false);
      setForm({ fullName: '', email: '', phone: '', country: 'Nepal', dedicatedTo: '', specialMessage: '', preferredDate: '' });
      onClose();
    }
  };

  if (!service) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={e => e.target === e.currentTarget && handleClose()}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(26,8,8,0.65)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          padding: '16px', overflowY: 'auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', minHeight: '100%', width: '100%', justifyContent: 'center' }}>
          <motion.div
            initial={{ scale: 0.93, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.93, opacity: 0, y: 16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            style={{
              background: '#fff', border: `1px solid ${service.border}`,
              borderRadius: '10px', width: '100%', maxWidth: '480px',
              boxShadow: `0 24px 60px rgba(26,8,8,0.2), 0 0 0 1px ${service.border}`,
            }}
          >
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Crimson+Text:wght@400;600&display=swap');
              input::placeholder,textarea::placeholder{color:rgba(26,8,8,0.22)!important;}
              select option{background:#fff;color:#1a0808;}
              @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
              .bk-scr::-webkit-scrollbar{width:3px;}
              .bk-scr::-webkit-scrollbar-thumb{background:rgba(185,28,28,0.2);border-radius:2px;}
            `}</style>

            {/* Header */}
            <div style={{ padding: '18px 20px', borderBottom: `1px solid ${service.border}`, background: service.gradient, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderRadius: '10px 10px 0 0' }}>
              <div style={{ flex: 1, paddingRight: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '20px' }}>{service.icon}</span>
                  <p style={{ fontFamily: "'Cinzel',serif", fontSize: '7.5px', letterSpacing: '0.35em', color: service.color, textTransform: 'uppercase' }}>Book This Service</p>
                </div>
                <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: '14px', fontWeight: 700, color: '#1a0808', lineHeight: 1.25, marginBottom: '4px' }}>{service.title}</h3>
                <p style={{ fontFamily: "'Crimson Text',serif", fontSize: '13px', color: '#a07070', fontStyle: 'italic' }}>{service.shortDesc}</p>
                <div style={{ marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', background: `${service.color}15`, border: `1px solid ${service.border}`, borderRadius: '3px' }}>
                  <span style={{ fontFamily: "'Cinzel',serif", fontSize: '14px', fontWeight: 700, color: service.color }}>${service.price}</span>
                  <span style={{ fontFamily: "'Crimson Text',serif", fontSize: '13px', color: '#a07070' }}>USD</span>
                </div>
              </div>
              <button onClick={handleClose} style={{ background: 'rgba(185,28,28,0.06)', border: '1px solid rgba(185,28,28,0.15)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                <X size={13} color="#a07070" />
              </button>
            </div>

            {/* Body */}
            <div className="bk-scr" style={{ padding: '18px 20px', maxHeight: 'calc(100svh - 160px)', overflowY: 'auto' }}>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '30px 16px' }}>
                  <div style={{ width: '58px', height: '58px', borderRadius: '50%', background: 'rgba(22,163,74,0.1)', border: '2px solid rgba(22,163,74,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                    <Check size={26} color="#16a34a" />
                  </div>
                  <h4 style={{ fontFamily: "'Cinzel',serif", fontSize: '14px', color: '#1a0808', marginBottom: '8px' }}>Booking Request Received!</h4>
                  <p style={{ fontFamily: "'Crimson Text',serif", fontSize: '15px', color: '#a07070', fontStyle: 'italic', lineHeight: 1.7 }}>
                    We will contact you at<br /><strong style={{ color: '#6b3333' }}>{form.email}</strong><br />to confirm your ceremony. 🙏
                  </p>
                  <button onClick={handleClose} style={{ marginTop: '20px', padding: '10px 24px', background: `linear-gradient(135deg,${service.color}cc,${service.color})`, color: '#fff', border: 'none', borderRadius: '4px', fontFamily: "'Cinzel',serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer' }}>
                    Close
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>

                  {/* Name + Phone */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={lbl}>Full Name *</label>
                      <input type="text" required value={form.fullName}
                        onChange={e => setForm({ ...form, fullName: e.target.value })}
                        onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                        placeholder="Your name" style={inp('name')} />
                    </div>
                    <div>
                      <label style={lbl}>Phone *</label>
                      <input type="tel" required value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)}
                        placeholder="+977…" style={inp('phone')} />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label style={lbl}>Email Address *</label>
                    <input type="email" required value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                      placeholder="your@email.com" style={inp('email')} />
                  </div>

                  {/* Country + Date */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={lbl}>Country *</label>
                      <select value={form.country}
                        onChange={e => setForm({ ...form, country: e.target.value })}
                        onFocus={() => setFocused('country')} onBlur={() => setFocused(null)}
                        style={{ ...inp('country'), cursor: 'pointer' }}>
                        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={lbl}>Preferred Date</label>
                      <input type="date" value={form.preferredDate}
                        onChange={e => setForm({ ...form, preferredDate: e.target.value })}
                        onFocus={() => setFocused('date')} onBlur={() => setFocused(null)}
                        style={inp('date')} />
                    </div>
                  </div>

                  {/* Dedicated to — relevant for some services */}
                  <div>
                    <label style={lbl}>Dedicated To <span style={{ color: '#c4a0a0', letterSpacing: '0.1em' }}>(name of person this ceremony is for)</span></label>
                    <input type="text" value={form.dedicatedTo}
                      onChange={e => setForm({ ...form, dedicatedTo: e.target.value })}
                      onFocus={() => setFocused('ded')} onBlur={() => setFocused(null)}
                      placeholder="e.g. John Smith, born Jan 5 1980 / or 'Myself'" style={inp('ded')} />
                  </div>

                  {/* Special message */}
                  <div>
                    <label style={lbl}>Special Message / Prayer Intention</label>
                    <textarea value={form.specialMessage}
                      onChange={e => setForm({ ...form, specialMessage: e.target.value })}
                      onFocus={() => setFocused('msg')} onBlur={() => setFocused(null)}
                      rows={3} placeholder="Any specific prayers, intentions, or information for the monks…"
                      style={{ ...inp('msg'), resize: 'vertical', minHeight: '72px' }} />
                  </div>

                  {/* Error */}
                  {sendError && (
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '11px 13px', background: 'rgba(185,28,28,0.04)', border: '1px solid rgba(185,28,28,0.2)', borderRadius: '4px' }}>
                      <AlertCircle size={15} color="#b91c1c" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <p style={{ fontFamily: "'Crimson Text',serif", fontSize: '13px', color: '#b91c1c', lineHeight: 1.55 }}>{sendError}</p>
                    </div>
                  )}

                  {/* Price reminder */}
                  <div style={{ padding: '10px 14px', background: `${service.color}08`, border: `1px solid ${service.border}`, borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: "'Crimson Text',serif", fontSize: '14px', color: '#6b3333' }}>Total for this service</span>
                    <span style={{ fontFamily: "'Cinzel',serif", fontSize: '15px', fontWeight: 700, color: service.color }}>${service.price} USD</span>
                  </div>

                  {/* Submit */}
                  <button type="submit" disabled={isSending} style={{
                    width: '100%', padding: '13px', marginTop: '2px',
                    background: isSending ? `${service.color}80` : `linear-gradient(135deg,${service.color}cc,${service.color})`,
                    color: '#fff', border: 'none', borderRadius: '4px',
                    fontFamily: "'Cinzel',serif", fontSize: '10px', letterSpacing: '0.25em',
                    textTransform: 'uppercase', fontWeight: 700,
                    cursor: isSending ? 'not-allowed' : 'pointer',
                    boxShadow: isSending ? 'none' : `0 6px 20px ${service.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    transition: 'all 0.2s',
                  }}>
                    {isSending
                      ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Sending…</>
                      : 'Send Booking Request'
                    }
                  </button>
                  <p style={{ fontFamily: "'Crimson Text',serif", fontSize: '12px', color: '#c4a0a0', textAlign: 'center', fontStyle: 'italic' }}>
                    Payment details will be shared after confirmation. 🙏
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// ── Service Card ──────────────────────────────────────────────────────────────
const ServiceCard = ({ service, onBook, index }: { service: typeof SERVICES[0]; onBook: () => void; index: number }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      style={{
        background: '#fff', border: `1px solid ${service.border}`,
        borderRadius: '10px', overflow: 'hidden',
        boxShadow: '0 2px 16px rgba(185,28,28,0.05)',
        transition: 'all 0.35s cubic-bezier(0.23,1,0.32,1)',
        display: 'flex', flexDirection: 'column',
      }}
      whileHover={{ y: -4, boxShadow: `0 16px 44px ${service.color}20`, borderColor: service.accentBorder } as any}
    >
      {/* Top accent line */}
      <div style={{ height: '3px', background: `linear-gradient(90deg,${service.color},${service.color}50,transparent)` }} />

      <div style={{ padding: '28px 26px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Icon + title + price row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1 }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: service.gradient, border: `1px solid ${service.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>
              {service.icon}
            </div>
            <div>
              <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(12px,1.4vw,15px)', fontWeight: 700, color: '#1a0808', lineHeight: 1.25, marginBottom: service.subtitle ? '2px' : '0' }}>{service.title}</h3>
              {service.subtitle && <p style={{ fontFamily: "'Crimson Text',serif", fontSize: '13px', color: '#a07070', fontStyle: 'italic' }}>{(service as any).subtitle}</p>}
            </div>
          </div>
          {/* Price badge */}
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: '20px', fontWeight: 900, color: service.color, lineHeight: 1 }}>${service.price}</div>
            <div style={{ fontFamily: "'Crimson Text',serif", fontSize: '12px', color: '#a07070', letterSpacing: '0.05em' }}>USD</div>
          </div>
        </div>

        {/* Short desc */}
        <p style={{ fontFamily: "'Crimson Text',serif", fontSize: '16px', color: '#5a3030', lineHeight: 1.75 }}>{service.shortDesc}</p>

        {/* Expandable details */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ paddingTop: '4px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <p style={{ fontFamily: "'Crimson Text',serif", fontSize: '15.5px', color: '#6b3333', lineHeight: 1.8, borderLeft: `2px solid ${service.color}60`, paddingLeft: '14px' }}>
                  {service.fullDesc}
                </p>
                <div>
                  <p style={{ fontFamily: "'Cinzel',serif", fontSize: '8px', letterSpacing: '0.25em', color: service.color, textTransform: 'uppercase', marginBottom: '10px' }}>What's Included</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                    {service.includes.map(item => (
                      <span key={item} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 10px', background: `${service.color}0d`, border: `1px solid ${service.border}`, borderRadius: '3px', fontFamily: "'Crimson Text',serif", fontSize: '13.5px', color: '#5a3030' }}>
                        <Check size={10} color={service.color} strokeWidth={2.5} />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '4px' }}>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{ flex: 1, padding: '10px', background: 'transparent', border: `1px solid ${service.border}`, borderRadius: '4px', fontFamily: "'Cinzel',serif", fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: service.color, cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${service.color}0d`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
          >
            {expanded ? 'Show Less ↑' : 'Learn More ↓'}
          </button>
          <button
            onClick={onBook}
            style={{ flex: 2, padding: '10px 20px', background: `linear-gradient(135deg,${service.color}cc,${service.color})`, border: 'none', borderRadius: '4px', fontFamily: "'Cinzel',serif", fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#fff', cursor: 'pointer', fontWeight: 700, boxShadow: `0 4px 14px ${service.color}30`, transition: 'all 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 6px 20px ${service.color}45`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 14px ${service.color}30`; }}
          >
            Book Now →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────
const ServicesPage = () => {
  const [activeService, setActiveService] = useState<typeof SERVICES[0] | null>(null);

  return (
    <div style={{ background: '#fdf8f3', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700;900&family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Crimson+Text:wght@400;600&display=swap');
      `}</style>

      {/* Hero */}
      <section style={{ position: 'relative', padding: '80px 24px 70px', background: 'linear-gradient(180deg,rgba(185,28,28,0.07) 0%,rgba(253,248,243,1) 100%)', textAlign: 'center', overflow: 'hidden' }}>
        {[180, 320, 460].map(s => (
          <div key={s} style={{ position: 'absolute', borderRadius: '50%', border: '1px solid rgba(185,28,28,0.07)', width: s, height: s, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />
        ))}
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '18px' }}>
            <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg,transparent,#b91c1c)' }} />
            <span style={{ fontSize: '22px' }}>🙏</span>
            <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg,#b91c1c,transparent)' }} />
          </div>
          <p style={{ fontFamily: "'Cinzel',serif", fontSize: '10px', letterSpacing: '0.4em', color: '#b91c1c', textTransform: 'uppercase', marginBottom: '14px' }}>Sacred Ceremonies & Rituals</p>
          <h1 style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(28px,5vw,60px)', fontWeight: 900, color: '#1a0808', lineHeight: 1.05, marginBottom: '18px' }}>Spiritual Services</h1>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(16px,2vw,21px)', fontStyle: 'italic', fontWeight: 300, color: '#a07070', maxWidth: '540px', margin: '0 auto' }}>
            Sacred ceremonies performed by experienced monks and spiritual masters — offered with devotion, compassion, and heartfelt prayer.
          </p>
        </motion.div>
      </section>

      <div style={{ ...SL } as any} />

      {/* Services grid */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '24px' }}>
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              onBook={() => setActiveService(service)}
            />
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ marginTop: '60px', textAlign: 'center', padding: '36px 28px', background: '#fff', border: '1px solid rgba(185,28,28,0.1)', borderRadius: '10px', boxShadow: '0 4px 20px rgba(185,28,28,0.05)' }}
        >
          <span style={{ fontSize: '28px', display: 'block', marginBottom: '14px' }}>📿</span>
          <p style={{ fontFamily: "'Cinzel',serif", fontSize: '9px', letterSpacing: '0.3em', color: '#b91c1c', textTransform: 'uppercase', marginBottom: '10px' }}>How It Works</p>
          <p style={{ fontFamily: "'Crimson Text',serif", fontSize: '17px', color: '#5a3030', maxWidth: '560px', margin: '0 auto', lineHeight: 1.85 }}>
            Submit your booking request using the form. Our team will contact you to confirm the ceremony date and share payment details. All ceremonies are performed with complete devotion by experienced monks and spiritual masters at BTMC Foundation.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px', flexWrap: 'wrap' }}>
            {['Submit Request','Receive Confirmation','Make Offering','Ceremony Performed','Receive Blessings'].map((step, i) => (
              <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {i > 0 && <span style={{ color: '#d9a0a0', fontSize: '12px' }}>→</span>}
                <span style={{ fontFamily: "'Cinzel',serif", fontSize: '8px', letterSpacing: '0.12em', color: '#6b3333', textTransform: 'uppercase', padding: '4px 10px', background: 'rgba(185,28,28,0.04)', borderRadius: '2px', border: '1px solid rgba(185,28,28,0.1)' }}>{step}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Booking modal */}
      {activeService && (
        <BookingModal service={activeService} onClose={() => setActiveService(null)} />
      )}
    </div>
  );
};

export default ServicesPage;