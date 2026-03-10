import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { BookingFormData } from '../../types/tour';

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BookingFormData) => void;
  tourTitle: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ isOpen, onClose, onSubmit, tourTitle }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '', email: '', phone: '', participants: 1, specialRequests: '',
  });
  const [focused, setFocused] = useState<string | null>(null);

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%', padding: '12px 14px', boxSizing: 'border-box',
    background: 'rgba(10,5,5,0.8)',
    border: `1px solid ${focused === field ? 'rgba(220,38,38,0.7)' : 'rgba(185,28,28,0.2)'}`,
    borderRadius: '3px', color: '#f5f0eb',
    fontFamily: "'Crimson Text', serif", fontSize: '16px',
    outline: 'none', transition: 'border-color 0.2s ease',
    boxShadow: focused === field ? '0 0 0 3px rgba(185,28,28,0.08)' : 'none',
  });

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Cinzel', serif", fontSize: '8.5px',
    letterSpacing: '0.28em', color: 'rgba(245,240,235,0.35)',
    textTransform: 'uppercase', display: 'block', marginBottom: '6px',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookingData = {
      ...formData,
      id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      tourTitle,
      bookingDate: new Date().toISOString(),
      status: 'pending' as const,
    };
    const existing = JSON.parse(localStorage.getItem('tourBookings') || '[]');
    localStorage.setItem('tourBookings', JSON.stringify([...existing, bookingData]));
    onSubmit(formData);
    setFormData({ fullName: '', email: '', phone: '', participants: 1, specialRequests: '' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 50, backdropFilter: 'blur(4px)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            style={{
              background: 'linear-gradient(160deg, rgba(14,4,4,0.99), rgba(24,6,6,0.97))',
              border: '1px solid rgba(185,28,28,0.3)',
              borderRadius: '5px', width: '100%', maxWidth: '460px',
              maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
              boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(185,28,28,0.08)',
            }}
            initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
          >
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700&family=Crimson+Text:wght@400;600&display=swap');
              textarea::placeholder, input::placeholder { color: rgba(245,240,235,0.18) !important; }
            `}</style>

            {/* Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid rgba(185,28,28,0.15)',
              background: 'rgba(185,28,28,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
            }}>
              <div>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: '8.5px', letterSpacing: '0.35em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '4px' }}>Sacred Journey</p>
                <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '16px', fontWeight: 700, color: '#f5f0eb' }}>Book This Tour</h3>
                <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '14px', color: 'rgba(245,240,235,0.4)', marginTop: '3px', fontStyle: 'italic' }}>{tourTitle}</p>
              </div>
              <button onClick={onClose} style={{ background: 'rgba(185,28,28,0.1)', border: '1px solid rgba(185,28,28,0.2)', borderRadius: '50%', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s' }}>
                <X size={15} color="rgba(245,240,235,0.6)" />
              </button>
            </div>

            {/* Form */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input type="text" required value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                      placeholder="Your name" style={inputStyle('name')} />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone *</label>
                    <input type="tel" required value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)}
                      placeholder="+977..." style={inputStyle('phone')} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input type="email" required value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                    placeholder="your@email.com" style={inputStyle('email')} />
                </div>
                <div>
                  <label style={labelStyle}>Number of Participants *</label>
                  <input type="number" required min="1" value={formData.participants}
                    onChange={e => setFormData({ ...formData, participants: parseInt(e.target.value) })}
                    onFocus={() => setFocused('participants')} onBlur={() => setFocused(null)}
                    style={inputStyle('participants')} />
                </div>
                <div>
                  <label style={labelStyle}>Special Requests (Optional)</label>
                  <textarea value={formData.specialRequests}
                    onChange={e => setFormData({ ...formData, specialRequests: e.target.value })}
                    onFocus={() => setFocused('requests')} onBlur={() => setFocused(null)}
                    placeholder="Any special requirements..."
                    rows={3}
                    style={{ ...inputStyle('requests'), resize: 'vertical', minHeight: '80px' }} />
                </div>
                <button type="submit" style={{
                  width: '100%', padding: '14px',
                  background: 'linear-gradient(135deg, #991b1b, #dc2626)',
                  color: '#fff', border: 'none', borderRadius: '3px',
                  fontFamily: "'Cinzel', serif", fontSize: '10.5px',
                  letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700,
                  cursor: 'pointer', boxShadow: '0 6px 20px rgba(185,28,28,0.35)',
                  transition: 'all 0.3s ease',
                }}>
                  Submit Booking
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingForm;