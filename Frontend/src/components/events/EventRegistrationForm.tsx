import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ChevronDown } from 'lucide-react';
import { Event } from '../../types/event';

export interface EventRegistrationData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  ticketType: string;
  quantity: number;
  specialRequirements: string;
}

interface EventRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EventRegistrationData) => void;
  event: Event;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  background: 'rgba(10,5,5,0.8)',
  border: '1px solid rgba(185,28,28,0.25)',
  borderRadius: '3px',
  color: '#f5f0eb',
  fontFamily: "'Crimson Text', serif",
  fontSize: '16px',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  boxSizing: 'border-box' as const,
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'Cinzel', serif",
  fontSize: '9px',
  letterSpacing: '0.25em',
  textTransform: 'uppercase' as const,
  color: 'rgba(245,240,235,0.45)',
  display: 'block',
  marginBottom: '6px',
};

export default function EventRegistrationForm({
  isOpen,
  onClose,
  onSubmit,
  event,
}: EventRegistrationFormProps) {
  const [formData, setFormData] = useState<EventRegistrationData>({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    ticketType: event.ticketTypes[0]?.type || '',
    quantity: 1,
    specialRequirements: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1);

  const selectedTicket = event.ticketTypes.find((t) => t.type === formData.ticketType);
  const totalPrice = selectedTicket ? selectedTicket.price * formData.quantity : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const focusedBorder = 'rgba(220,38,38,0.7)';
  const normalBorder = 'rgba(185,28,28,0.25)';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(5,2,2,0.85)',
            backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '16px', zIndex: 9999,
          }}
        >
          <motion.div
            initial={{ scale: 0.93, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.93, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: '620px',
              maxHeight: '90vh', overflowY: 'auto',
              background: 'linear-gradient(160deg, #110404, #1c0808)',
              border: '1px solid rgba(185,28,28,0.35)',
              borderRadius: '8px',
              boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 60px rgba(185,28,28,0.1)',
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700&family=Cormorant+Garamond:wght@400;500;600&family=Crimson+Text:wght@400;600&display=swap');
              .reg-input:focus { border-color: rgba(220,38,38,0.7) !important; box-shadow: 0 0 0 3px rgba(185,28,28,0.1); }
              .reg-textarea { resize: vertical; min-height: 80px; }
              .ticket-option { cursor: pointer; transition: all 0.25s ease; }
              .ticket-option:hover { border-color: rgba(220,38,38,0.5) !important; }
              .ticket-option.selected { border-color: #dc2626 !important; background: rgba(40,8,8,0.8) !important; }
              .reg-form-scroll::-webkit-scrollbar { width: 3px; }
              .reg-form-scroll::-webkit-scrollbar-track { background: transparent; }
              .reg-form-scroll::-webkit-scrollbar-thumb { background: rgba(185,28,28,0.4); border-radius: 2px; }
            `}</style>

            {/* ── Header ── */}
            <div style={{
              padding: '24px 28px',
              borderBottom: '1px solid rgba(185,28,28,0.15)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
              background: 'linear-gradient(135deg, rgba(120,10,10,0.25), rgba(185,28,28,0.1))',
            }}>
              <div>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.3em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Event Registration
                </p>
                <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(14px, 2vw, 20px)', fontWeight: 700, color: '#f5f0eb', lineHeight: 1.2, maxWidth: '440px' }}>
                  {event.title}
                </h3>
                <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '14px', color: 'rgba(245,240,235,0.4)', marginTop: '4px', fontStyle: 'italic' }}>
                  {event.date}
                </p>
              </div>
              <button
                onClick={onClose}
                style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  border: '1px solid rgba(185,28,28,0.3)',
                  background: 'rgba(185,28,28,0.08)',
                  color: 'rgba(245,240,235,0.5)',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginLeft: '12px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(185,28,28,0.25)'; (e.currentTarget as HTMLButtonElement).style.color = '#f5f0eb'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(185,28,28,0.08)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(245,240,235,0.5)'; }}
              >
                <X size={15} />
              </button>
            </div>

            {/* ── Step indicator ── */}
            <div style={{ padding: '16px 28px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              {[1, 2].map((s) => (
                <React.Fragment key={s}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '8px', cursor: s < step ? 'pointer' : 'default',
                  }} onClick={() => s < step && setStep(s as 1 | 2)}>
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '50%',
                      background: step >= s ? 'linear-gradient(135deg, #991b1b, #dc2626)' : 'rgba(20,5,5,0.8)',
                      border: `1px solid ${step >= s ? '#dc2626' : 'rgba(185,28,28,0.25)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "'Cinzel', serif", fontSize: '10px', color: step >= s ? '#fff' : 'rgba(245,240,235,0.3)',
                      flexShrink: 0,
                    }}>
                      {step > s ? <Check size={11} /> : s}
                    </div>
                    <span style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: step >= s ? 'rgba(245,240,235,0.7)' : 'rgba(245,240,235,0.25)' }}>
                      {s === 1 ? 'Choose Option' : 'Your Details'}
                    </span>
                  </div>
                  {s === 1 && <div style={{ flex: 1, height: '1px', background: step > 1 ? '#dc2626' : 'rgba(185,28,28,0.2)' }} />}
                </React.Fragment>
              ))}
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '8px 28px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* ── STEP 1: Ticket selection ── */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.3em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Select Participation Type
                  </p>
                  {event.ticketTypes.map((ticket) => (
                    <div
                      key={ticket.type}
                      className={`ticket-option${formData.ticketType === ticket.type ? ' selected' : ''}`}
                      onClick={() => setFormData({ ...formData, ticketType: ticket.type })}
                      style={{
                        padding: '16px', borderRadius: '4px',
                        border: `1px solid ${formData.ticketType === ticket.type ? '#dc2626' : 'rgba(185,28,28,0.2)'}`,
                        background: formData.ticketType === ticket.type ? 'rgba(40,8,8,0.8)' : 'rgba(20,5,5,0.5)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontFamily: "'Cinzel', serif", fontSize: '13px', fontWeight: 600, color: '#f5f0eb' }}>
                          {ticket.type}
                        </span>
                        <span style={{
                          fontFamily: "'Cinzel', serif", fontSize: '13px', fontWeight: 700,
                          color: ticket.price === 0 ? '#16a34a' : '#dc2626',
                        }}>
                          {ticket.price === 0 ? 'Free' : `Rs. ${ticket.price}`}
                        </span>
                      </div>
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: '5px', listStyle: 'none', padding: 0 }}>
                        {ticket.benefits.map((benefit, i) => (
                          <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                            <Check size={12} color="#16a34a" style={{ marginTop: '3px', flexShrink: 0 }} />
                            <span style={{ fontFamily: "'Crimson Text', serif", fontSize: '15px', color: 'rgba(245,240,235,0.55)' }}>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(245,240,235,0.2)', marginTop: '10px' }}>
                        {ticket.available} spots available
                      </p>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    style={{
                      marginTop: '8px',
                      padding: '14px',
                      background: 'linear-gradient(135deg, #991b1b, #dc2626)',
                      color: '#fff', border: 'none', borderRadius: '3px',
                      fontFamily: "'Cinzel', serif", fontSize: '11px',
                      letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700,
                      cursor: 'pointer', boxShadow: '0 6px 20px rgba(185,28,28,0.35)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, #7f1d1d, #b91c1c)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, #991b1b, #dc2626)'; }}
                  >
                    Continue →
                  </button>
                </motion.div>
              )}

              {/* ── STEP 2: Personal details ── */}
              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={labelStyle}>Full Name *</label>
                      <input
                        type="text" required className="reg-input"
                        placeholder="Your full name"
                        style={{ ...inputStyle, borderColor: focusedField === 'name' ? focusedBorder : normalBorder }}
                        value={formData.fullName}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Country *</label>
                      <input
                        type="text" required className="reg-input"
                        placeholder="Your country"
                        style={{ ...inputStyle, borderColor: focusedField === 'country' ? focusedBorder : normalBorder }}
                        value={formData.country}
                        onFocus={() => setFocusedField('country')}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input
                        type="email" required className="reg-input"
                        placeholder="your@email.com"
                        style={{ ...inputStyle, borderColor: focusedField === 'email' ? focusedBorder : normalBorder }}
                        value={formData.email}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone / WhatsApp *</label>
                      <input
                        type="tel" required className="reg-input"
                        placeholder="+977 ..."
                        style={{ ...inputStyle, borderColor: focusedField === 'phone' ? focusedBorder : normalBorder }}
                        value={formData.phone}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Number of Participants</label>
                    <input
                      type="number" min="1"
                      max={selectedTicket?.available || 1}
                      className="reg-input"
                      style={{ ...inputStyle, borderColor: focusedField === 'qty' ? focusedBorder : normalBorder, maxWidth: '140px' }}
                      value={formData.quantity}
                      onFocus={() => setFocusedField('qty')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setFormData({ ...formData, quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Special Requirements or Message (Optional)</label>
                    <textarea
                      className="reg-input reg-textarea"
                      placeholder="Dietary needs, accessibility requirements, or any questions..."
                      style={{ ...inputStyle, borderColor: focusedField === 'req' ? focusedBorder : normalBorder, minHeight: '80px', resize: 'vertical' }}
                      value={formData.specialRequirements}
                      onFocus={() => setFocusedField('req')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                    />
                  </div>

                  {/* Summary */}
                  <div style={{
                    padding: '16px', borderRadius: '3px',
                    background: 'rgba(10,5,5,0.7)',
                    border: '1px solid rgba(185,28,28,0.2)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(245,240,235,0.4)', textTransform: 'uppercase' }}>
                        {formData.ticketType} × {formData.quantity}
                      </span>
                      <span style={{ fontFamily: "'Cinzel', serif", fontSize: '16px', fontWeight: 700, color: totalPrice === 0 ? '#16a34a' : '#dc2626' }}>
                        {totalPrice === 0 ? 'Free' : `Rs. ${totalPrice}`}
                      </span>
                    </div>
                    {event.registrationNote && (
                      <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '13px', color: 'rgba(245,240,235,0.3)', fontStyle: 'italic', lineHeight: 1.5 }}>
                        {event.registrationNote}
                      </p>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      style={{
                        padding: '14px 20px',
                        background: 'transparent',
                        color: 'rgba(245,240,235,0.45)',
                        border: '1px solid rgba(185,28,28,0.25)',
                        borderRadius: '3px',
                        fontFamily: "'Cinzel', serif", fontSize: '10px',
                        letterSpacing: '0.2em', textTransform: 'uppercase',
                        cursor: 'pointer', transition: 'all 0.2s ease',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      style={{
                        flex: 1, padding: '14px',
                        background: 'linear-gradient(135deg, #991b1b, #dc2626)',
                        color: '#fff', border: 'none', borderRadius: '3px',
                        fontFamily: "'Cinzel', serif", fontSize: '11px',
                        letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700,
                        cursor: 'pointer', boxShadow: '0 6px 20px rgba(185,28,28,0.35)',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, #7f1d1d, #b91c1c)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, #991b1b, #dc2626)'; }}
                    >
                      Complete Registration
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}