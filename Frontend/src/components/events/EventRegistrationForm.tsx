import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

// ─────────────────────────────────────────────────────────────────────
// EMAILJS KEYS — replace all 3 with your actual values
// Dashboard: https://www.emailjs.com
// ─────────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // e.g. 'service_wklc209'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // from EmailJS template page
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // Account → API Keys

interface EventRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  eventTitle: string;
  eventDate?: string;
  eventVenue?: string;
}

const EventRegistrationForm: React.FC<EventRegistrationFormProps> = ({
  isOpen, onClose, onSubmit, eventTitle, eventDate = '', eventVenue = ''
}) => {
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', country: 'Nepal',
    ticketType: 'Regular', participants: 1,
    dietaryRequirements: '', specialRequests: '',
  });
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const inp = (f: string): React.CSSProperties => ({
    width: '100%', padding: '11px 14px', boxSizing: 'border-box',
    background: '#fdf8f3',
    border: `1px solid ${focused === f ? '#b91c1c' : 'rgba(185,28,28,0.2)'}`,
    borderRadius: '4px', color: '#1a0808',
    fontFamily: "'Crimson Text',serif", fontSize: '16px',
    outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
    boxShadow: focused === f ? '0 0 0 3px rgba(185,28,28,0.08)' : 'none',
  });
  const lbl: React.CSSProperties = {
    fontFamily: "'Cinzel',serif", fontSize: '8.5px', letterSpacing: '0.28em',
    color: '#a07070', textTransform: 'uppercase', display: 'block', marginBottom: '5px',
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
          name:                 form.fullName,
          email:                form.email,
          phone:                form.phone,
          country:              form.country,
          event_name:           eventTitle,
          event_date:           eventDate,
          event_venue:          eventVenue,
          ticket_type:          form.ticketType,
          quantity:             String(form.participants),
          total_price:          'See registration',
          special_requirements: [
            form.dietaryRequirements ? `Dietary: ${form.dietaryRequirements}` : '',
            form.specialRequests     ? `Requests: ${form.specialRequests}` : '',
          ].filter(Boolean).join(' | ') || 'None',
          time: new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' }),
        },
        EMAILJS_PUBLIC_KEY,
      );
      setSubmitted(true);
      setTimeout(() => {
        onSubmit(form);
        setSubmitted(false);
        setForm({ fullName: '', email: '', phone: '', country: 'Nepal', ticketType: 'Regular', participants: 1, dietaryRequirements: '', specialRequests: '' });
      }, 2000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setSendError('Failed to send. Please try again or contact us directly.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          style={{ position: 'fixed', inset: 0, background: 'rgba(26,8,8,0.55)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', backdropFilter: 'blur(4px)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={e => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            style={{ background: '#fff', border: '1px solid rgba(185,28,28,0.15)', borderRadius: '6px', width: '100%', maxWidth: '480px', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 60px rgba(26,8,8,0.18)' }}
            initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
          >
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Crimson+Text:wght@400;600&display=swap');
              input::placeholder, textarea::placeholder { color: rgba(26,8,8,0.22) !important; }
              select option { background: #fff; color: #1a0808; }
              @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>

            {/* Header */}
            <div style={{ padding: '18px 22px', borderBottom: '1px solid rgba(185,28,28,0.1)', background: 'rgba(185,28,28,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <div>
                <p style={{ fontFamily: "'Cinzel',serif", fontSize: '8px', letterSpacing: '0.35em', color: '#b91c1c', textTransform: 'uppercase', marginBottom: '4px' }}>Register Now</p>
                <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: '15px', fontWeight: 700, color: '#1a0808' }}>Event Registration</h3>
                <p style={{ fontFamily: "'Crimson Text',serif", fontSize: '13px', color: '#a07070', fontStyle: 'italic', marginTop: '2px' }}>{eventTitle}</p>
              </div>
              <button onClick={onClose} style={{ background: 'rgba(185,28,28,0.06)', border: '1px solid rgba(185,28,28,0.15)', borderRadius: '50%', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={14} color="#a07070" />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '22px' }}>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '28px 0' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(22,163,74,0.1)', border: '2px solid rgba(22,163,74,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <Check size={26} color="#16a34a" />
                  </div>
                  <h4 style={{ fontFamily: "'Cinzel',serif", fontSize: '15px', color: '#1a0808', marginBottom: '8px' }}>Registered!</h4>
                  <p style={{ fontFamily: "'Crimson Text',serif", fontSize: '16px', color: '#a07070', fontStyle: 'italic' }}>We look forward to seeing you. 🙏</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={lbl}>Full Name *</label>
                      <input type="text" required value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} placeholder="Your name" style={inp('name')} />
                    </div>
                    <div>
                      <label style={lbl}>Phone *</label>
                      <input type="tel" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)} placeholder="+977…" style={inp('phone')} />
                    </div>
                  </div>
                  <div>
                    <label style={lbl}>Email *</label>
                    <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} placeholder="your@email.com" style={inp('email')} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={lbl}>Country *</label>
                      <input type="text" required value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} onFocus={() => setFocused('country')} onBlur={() => setFocused(null)} style={inp('country')} />
                    </div>
                    <div>
                      <label style={lbl}>Ticket Type</label>
                      <select value={form.ticketType} onChange={e => setForm({ ...form, ticketType: e.target.value })} onFocus={() => setFocused('ticket')} onBlur={() => setFocused(null)} style={{ ...inp('ticket'), cursor: 'pointer' }}>
                        {['Regular', 'VIP', 'VVIP'].map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={lbl}>Participants *</label>
                    <input type="number" required min="1" value={form.participants} onChange={e => setForm({ ...form, participants: parseInt(e.target.value) || 1 })} onFocus={() => setFocused('part')} onBlur={() => setFocused(null)} style={{ ...inp('part'), maxWidth: '120px' }} />
                  </div>
                  <div>
                    <label style={lbl}>Dietary Requirements</label>
                    <input type="text" value={form.dietaryRequirements} onChange={e => setForm({ ...form, dietaryRequirements: e.target.value })} onFocus={() => setFocused('diet')} onBlur={() => setFocused(null)} placeholder="Vegetarian, vegan…" style={inp('diet')} />
                  </div>
                  <div>
                    <label style={lbl}>Special Requests</label>
                    <textarea value={form.specialRequests} onChange={e => setForm({ ...form, specialRequests: e.target.value })} onFocus={() => setFocused('req')} onBlur={() => setFocused(null)} rows={2} placeholder="Any requirements…" style={{ ...inp('req'), resize: 'vertical', minHeight: '72px' }} />
                  </div>

                  {sendError && (
                    <div style={{ padding: '10px 14px', background: 'rgba(185,28,28,0.06)', border: '1px solid rgba(185,28,28,0.25)', borderRadius: '4px', fontFamily: "'Crimson Text',serif", fontSize: '15px', color: '#b91c1c', lineHeight: 1.5 }}>
                      {sendError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSending}
                    style={{ width: '100%', padding: '13px', background: isSending ? 'rgba(153,27,27,0.6)' : 'linear-gradient(135deg,#991b1b,#b91c1c)', color: '#fff', border: 'none', borderRadius: '4px', fontFamily: "'Cinzel',serif", fontSize: '10.5px', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700, cursor: isSending ? 'not-allowed' : 'pointer', boxShadow: isSending ? 'none' : '0 6px 20px rgba(185,28,28,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    {isSending ? (
                      <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Sending…</>
                    ) : 'Submit Registration'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventRegistrationForm;