import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Loader2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID  = 'service_e8tjodn';
const EMAILJS_TEMPLATE_ID = 'template_0na8fw3';
const EMAILJS_PUBLIC_KEY  = 'ar7BuT-S-2ysVDrIB';

// ─────────────────────────────────────────────────────────────────────
// FIX FOR 412 ERROR — READ THIS:
// Go to emailjs.com → Email Templates → your template → Settings tab
// Set "To Email" to: info@btmcfoundation.org  (a FIXED address, NOT {{email}})
// The 412 error happens when "To Email" field is a variable that
// EmailJS can't resolve at send-time. It must be a real hardcoded email.
// ─────────────────────────────────────────────────────────────────────

interface EventRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  eventTitle: string;
  eventDate?: string;
  eventVenue?: string;
}

const COUNTRIES = [
  'Nepal','India','USA','UK','Australia','Canada','Germany','France',
  'Singapore','Japan','Thailand','Bhutan','Sri Lanka','Myanmar','Other',
];

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
    width: '100%', padding: '10px 12px', boxSizing: 'border-box',
    background: '#fdf8f3',
    border: `1px solid ${focused === f ? '#b91c1c' : 'rgba(185,28,28,0.2)'}`,
    borderRadius: '4px', color: '#1a0808',
    fontFamily: "'Crimson Text',serif",
    // 16px prevents iOS auto-zoom on input focus
    fontSize: '16px',
    outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
    boxShadow: focused === f ? '0 0 0 3px rgba(185,28,28,0.08)' : 'none',
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
          to_email:             'buddhistlecturer@gmail.com',
          name:                 form.fullName,
          email:                form.email,
          phone:                form.phone,
          country:              form.country,
          event_name:           eventTitle,
          event_date:           eventDate  || 'TBD',
          event_venue:          eventVenue || 'TBD',
          ticket_type:          form.ticketType,
          quantity:             String(form.participants),
          total_price:          'See registration details',
          special_requirements: [
            form.dietaryRequirements ? `Dietary: ${form.dietaryRequirements}` : '',
            form.specialRequests     ? `Requests: ${form.specialRequests}`     : '',
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
      }, 3000);
    } catch (err: any) {
      console.error('EmailJS error:', err);
      if (err?.status === 412) {
        setSendError('Setup issue (412): In EmailJS → your template → Settings → set "To Email" to a fixed address like buddhistlecturer@gmail.com, not a variable.');
      } else if (err?.status === 401) {
        setSendError('Invalid EmailJS public key. Please check your API keys.');
      } else if (err?.status === 404) {
        setSendError('EmailJS service or template not found. Check your service/template IDs.');
      } else {
        setSendError('Failed to send. Please try again or contact us directly.');
      }
    } finally {
      setIsSending(false);
    }
  };

  const handleClose = () => { if (!isSending) { setSendError(null); onClose(); } };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={e => e.target === e.currentTarget && handleClose()}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(26,8,8,0.6)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            // Use flex so the modal can be centred; overflowY lets backdrop scroll
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '16px',
            overflowY: 'auto',
          }}
        >
          {/* Centre vertically if space, otherwise scroll from top */}
          <div style={{ display: 'flex', alignItems: 'center', minHeight: '100%', width: '100%', justifyContent: 'center' }}>
            <motion.div
              initial={{ scale: 0.93, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 16 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              style={{
                background: '#fff',
                border: '1px solid rgba(185,28,28,0.15)',
                borderRadius: '8px',
                width: '100%',
                maxWidth: '460px',
                boxShadow: '0 24px 60px rgba(26,8,8,0.2)',
                // Constrain height so it doesn't overflow the viewport on mobile
                maxHeight: 'calc(100svh - 32px)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Crimson+Text:wght@400;600&display=swap');
                *, *::before, *::after { box-sizing: border-box; }
                input::placeholder, textarea::placeholder { color: rgba(26,8,8,0.22) !important; }
                select option { background: #fff; color: #1a0808; }
                @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
                .reg-scr::-webkit-scrollbar { width: 3px; }
                .reg-scr::-webkit-scrollbar-thumb { background: rgba(185,28,28,0.2); border-radius:2px; }

                /* Name+Phone and Country+Ticket: side-by-side on wider screens,
                   stacked on narrow mobile */
                .form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
                @media (max-width: 400px) {
                  .form-row-2 { grid-template-columns: 1fr; }
                }
              `}</style>

              {/* Header — fixed, never scrolls away */}
              <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(185,28,28,0.1)', background: 'rgba(185,28,28,0.025)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderRadius: '8px 8px 0 0', flexShrink: 0 }}>
                <div style={{ flex: 1, minWidth: 0, paddingRight: '10px' }}>
                  <p style={{ fontFamily: "'Cinzel',serif", fontSize: '7.5px', letterSpacing: '0.35em', color: '#b91c1c', textTransform: 'uppercase', marginBottom: '3px' }}>Register Now</p>
                  <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: '14px', fontWeight: 700, color: '#1a0808', lineHeight: 1.2, marginBottom: '3px' }}>Event Registration</h3>
                  <p style={{ fontFamily: "'Crimson Text',serif", fontSize: '13px', color: '#a07070', fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{eventTitle}</p>
                  {(eventDate || eventVenue) && (
                    <p style={{ fontFamily: "'Crimson Text',serif", fontSize: '11.5px', color: '#c4a0a0', marginTop: '2px' }}>
                      {[eventDate, eventVenue].filter(Boolean).join(' · ')}
                    </p>
                  )}
                </div>
                <button onClick={handleClose} style={{ background: 'rgba(185,28,28,0.06)', border: '1px solid rgba(185,28,28,0.15)', borderRadius: '50%', width: '32px', height: '32px', minWidth: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                  <X size={13} color="#a07070" />
                </button>
              </div>

              {/* Body — this scrolls when content is taller than the modal */}
              <div className="reg-scr" style={{ padding: '18px 20px', overflowY: 'auto', flex: 1 }}>
                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '30px 16px' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(22,163,74,0.1)', border: '2px solid rgba(22,163,74,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                      <Check size={24} color="#16a34a" />
                    </div>
                    <h4 style={{ fontFamily: "'Cinzel',serif", fontSize: '14px', color: '#1a0808', marginBottom: '8px' }}>Registered Successfully!</h4>
                    <p style={{ fontFamily: "'Crimson Text',serif", fontSize: '15px', color: '#a07070', fontStyle: 'italic', lineHeight: 1.65 }}>
                      Confirmation sent to<br /><strong style={{ color: '#6b3333' }}>{form.email}</strong><br />We look forward to seeing you. 🙏
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>

                    {/* Name + Phone */}
                    <div className="form-row-2">
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

                    {/* Country + Ticket */}
                    <div className="form-row-2">
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
                        <label style={lbl}>Ticket Type</label>
                        <select value={form.ticketType}
                          onChange={e => setForm({ ...form, ticketType: e.target.value })}
                          onFocus={() => setFocused('ticket')} onBlur={() => setFocused(null)}
                          style={{ ...inp('ticket'), cursor: 'pointer' }}>
                          {['Regular','VIP','VVIP'].map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Participants */}
                    <div>
                      <label style={lbl}>Number of Participants *</label>
                      <input type="number" required min="1" max="50" value={form.participants}
                        onChange={e => setForm({ ...form, participants: Math.max(1, parseInt(e.target.value) || 1) })}
                        onFocus={() => setFocused('part')} onBlur={() => setFocused(null)}
                        style={{ ...inp('part'), maxWidth: '110px' }} />
                    </div>

                    {/* Dietary */}
                    <div>
                      <label style={lbl}>Dietary Requirements</label>
                      <input type="text" value={form.dietaryRequirements}
                        onChange={e => setForm({ ...form, dietaryRequirements: e.target.value })}
                        onFocus={() => setFocused('diet')} onBlur={() => setFocused(null)}
                        placeholder="Vegetarian, vegan, gluten-free…" style={inp('diet')} />
                    </div>

                    {/* Special requests */}
                    <div>
                      <label style={lbl}>Special Requests</label>
                      <textarea value={form.specialRequests}
                        onChange={e => setForm({ ...form, specialRequests: e.target.value })}
                        onFocus={() => setFocused('req')} onBlur={() => setFocused(null)}
                        rows={2} placeholder="Accessibility needs, questions…"
                        style={{ ...inp('req'), resize: 'vertical', minHeight: '64px' }} />
                    </div>

                    {/* Error */}
                    {sendError && (
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '11px 13px', background: 'rgba(185,28,28,0.04)', border: '1px solid rgba(185,28,28,0.2)', borderRadius: '4px' }}>
                        <AlertCircle size={15} color="#b91c1c" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <p style={{ fontFamily: "'Crimson Text',serif", fontSize: '13.5px', color: '#b91c1c', lineHeight: 1.55 }}>{sendError}</p>
                      </div>
                    )}

                    {/* Submit */}
                    <button type="submit" disabled={isSending} style={{
                      width: '100%', padding: '13px', marginTop: '4px',
                      background: isSending ? 'rgba(153,27,27,0.55)' : 'linear-gradient(135deg,#991b1b,#b91c1c)',
                      color: '#fff', border: 'none', borderRadius: '4px',
                      fontFamily: "'Cinzel',serif", fontSize: '10px', letterSpacing: '0.25em',
                      textTransform: 'uppercase', fontWeight: 700,
                      cursor: isSending ? 'not-allowed' : 'pointer',
                      boxShadow: isSending ? 'none' : '0 6px 20px rgba(185,28,28,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      transition: 'all 0.2s',
                      minHeight: '46px',
                    }}>
                      {isSending
                        ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Sending…</>
                        : 'Submit Registration'
                      }
                    </button>

                    <p style={{ fontFamily: "'Crimson Text',serif", fontSize: '12px', color: '#c4a0a0', textAlign: 'center', fontStyle: 'italic', paddingBottom: '4px' }}>
                      A confirmation email will be sent after registration.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventRegistrationForm;