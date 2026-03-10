import { motion } from 'framer-motion';
import { useState, ChangeEvent } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', inquiry: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', inquiry: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    padding: '13px 16px',
    background: 'rgba(10,5,5,0.8)',
    border: `1px solid ${focused === field ? 'rgba(220,38,38,0.7)' : 'rgba(185,28,28,0.2)'}`,
    borderRadius: '3px',
    color: '#f5f0eb',
    fontFamily: "'Crimson Text', serif",
    fontSize: '17px',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    boxSizing: 'border-box' as const,
    boxShadow: focused === field ? '0 0 0 3px rgba(185,28,28,0.08)' : 'none',
  });

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Cinzel', serif",
    fontSize: '9px', letterSpacing: '0.28em',
    color: 'rgba(245,240,235,0.35)',
    textTransform: 'uppercase' as const,
    display: 'block', marginBottom: '7px',
  };

  return (
    <div style={{ background: '#0a0505', minHeight: '100vh', color: '#f5f0eb' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

        .contact-info-row {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(185,28,28,0.1);
        }
        .contact-info-row:last-child { border-bottom: none; }
        .contact-icon-wrap {
          width: 38px; height: 38px; border-radius: 50%;
          background: rgba(185,28,28,0.1);
          border: 1px solid rgba(185,28,28,0.3);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .contact-a {
          font-family: 'Crimson Text', serif; font-size: 17px;
          color: rgba(245,240,235,0.65); text-decoration: none;
          transition: color 0.2s ease; display: block; line-height: 1.6;
        }
        .contact-a:hover { color: #dc2626; }
        .submit-btn {
          width: 100%; padding: 15px;
          background: linear-gradient(135deg, #991b1b, #dc2626);
          color: #fff; border: none; border-radius: 3px;
          font-family: 'Cinzel', serif; font-size: 11px;
          letter-spacing: 0.28em; text-transform: uppercase; font-weight: 700;
          cursor: pointer; box-shadow: 0 6px 20px rgba(185,28,28,0.35);
          transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .submit-btn:hover {
          background: linear-gradient(135deg, #7f1d1d, #b91c1c);
          box-shadow: 0 8px 28px rgba(185,28,28,0.55);
          transform: translateY(-1px);
        }
        .section-line { height: 1px; background: linear-gradient(90deg, transparent, rgba(185,28,28,0.5), rgba(245,166,35,0.3), rgba(185,28,28,0.5), transparent); }
        textarea::placeholder, input::placeholder { color: rgba(245,240,235,0.2) !important; }
      `}</style>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative',
        padding: '80px 24px',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(120,10,10,0.3) 0%, rgba(10,5,5,1) 65%)',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        {[200, 320, 440].map((size) => (
          <div key={size} style={{
            position: 'absolute', borderRadius: '50%',
            border: '1px solid rgba(185,28,28,0.1)',
            width: size, height: size,
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }} />
        ))}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '18px' }}>
            <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg, transparent, #dc2626)' }} />
            <span style={{ fontSize: '20px' }}>✉️</span>
            <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg, #dc2626, transparent)' }} />
          </div>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '0.4em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '14px' }}>
            Reach Out
          </p>
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(32px, 5.5vw, 64px)', fontWeight: 900, color: '#f5f0eb', lineHeight: 1, marginBottom: '16px', textShadow: '0 0 40px rgba(220,38,38,0.15)' }}>
            Contact Us
          </h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(16px, 2vw, 20px)', fontStyle: 'italic', color: 'rgba(245,240,235,0.5)', fontWeight: 300 }}>
            We'd love to hear from you
          </p>
        </motion.div>
      </section>

      <div className="section-line" />

      {/* ── FORM + INFO ── */}
      <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.3em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '10px' }}>
              Send a Message
            </p>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(18px, 2.5vw, 28px)', fontWeight: 700, color: '#f5f0eb', marginBottom: '32px' }}>
              Write to Us
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input type="text" name="name" required value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                    placeholder="Your name"
                    style={inputStyle('name')} />
                </div>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input type="email" name="email" required value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                    placeholder="your@email.com"
                    style={inputStyle('email')} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Subject *</label>
                <input type="text" name="subject" required value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)}
                  placeholder="What is this regarding?"
                  style={inputStyle('subject')} />
              </div>

              <div>
                <label style={labelStyle}>Message *</label>
                <textarea name="inquiry" required value={formData.inquiry}
                  onChange={handleChange}
                  onFocus={() => setFocused('inquiry')} onBlur={() => setFocused(null)}
                  placeholder="Tell us more about your inquiry..."
                  rows={5}
                  style={{ ...inputStyle('inquiry'), resize: 'vertical', minHeight: '120px' }} />
              </div>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '14px 16px',
                    background: 'rgba(22,163,74,0.12)',
                    border: '1px solid rgba(22,163,74,0.35)',
                    borderRadius: '3px',
                    fontFamily: "'Cinzel', serif", fontSize: '10px',
                    letterSpacing: '0.15em', color: 'rgba(134,239,172,0.9)',
                  }}
                >
                  <Check size={15} /> Message sent — we'll be in touch soon!
                </motion.div>
              )}

              <button type="submit" className="submit-btn">
                <Send size={14} /> Send Message
              </button>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
          >
            <div>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.3em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '10px' }}>
                Get in Touch
              </p>
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(18px, 2.5vw, 28px)', fontWeight: 700, color: '#f5f0eb', marginBottom: '16px' }}>
                Contact Information
              </h2>
              <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '17px', color: 'rgba(245,240,235,0.5)', lineHeight: 1.75 }}>
                Have questions about our programs, meditation courses, or events? Fill out the form and we'll get back to you as soon as possible.
              </p>
            </div>

            {/* Contact details */}
            <div style={{
              background: 'linear-gradient(160deg, rgba(20,5,5,0.97) 0%, rgba(28,8,8,0.92) 100%)',
              border: '1px solid rgba(185,28,28,0.2)',
              borderRadius: '4px',
              padding: '24px 24px 12px',
            }}>
              <div className="contact-info-row">
                <div className="contact-icon-wrap"><MapPin size={15} color="#dc2626" /></div>
                <div>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.18em', color: 'rgba(245,240,235,0.3)', textTransform: 'uppercase', marginBottom: '4px' }}>Address</p>
                  <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '17px', color: 'rgba(245,240,235,0.65)', lineHeight: 1.65 }}>
                    BTMC Foundation, Jorpati,<br />
                    Gokarneswar-5, Pragati Marg,<br />
                    Kathmandu, Nepal
                  </p>
                </div>
              </div>

              <div className="contact-info-row">
                <div className="contact-icon-wrap"><Phone size={15} color="#dc2626" /></div>
                <div>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.18em', color: 'rgba(245,240,235,0.3)', textTransform: 'uppercase', marginBottom: '4px' }}>WhatsApp / Phone</p>
                  <a href="https://wa.me/9779849118562" target="_blank" rel="noopener noreferrer" className="contact-a">+977-9849118562</a>
                  <a href="https://wa.me/9779818123174" target="_blank" rel="noopener noreferrer" className="contact-a">+977-9818123174</a>
                </div>
              </div>

              <div className="contact-info-row">
                <div className="contact-icon-wrap"><Mail size={15} color="#dc2626" /></div>
                <div>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.18em', color: 'rgba(245,240,235,0.3)', textTransform: 'uppercase', marginBottom: '4px' }}>Email</p>
                  <a href="mailto:info@btmcfoundation.org" className="contact-a">info@btmcfoundation.org</a>
                </div>
              </div>
            </div>

            {/* Office hours */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(185,28,28,0.08), rgba(185,28,28,0.04))',
              border: '1px solid rgba(185,28,28,0.18)',
              borderRadius: '4px',
              padding: '24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <Clock size={14} color="#dc2626" />
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '0.25em', color: '#f5f0eb', textTransform: 'uppercase' }}>
                  Office Hours
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { day: 'Sunday – Thursday', time: '9:00 AM – 5:00 PM' },
                  { day: 'Friday', time: '10:00 AM – 3:00 PM' },
                  { day: 'Saturday', time: 'Closed' },
                ].map((row) => (
                  <div key={row.day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontFamily: "'Crimson Text', serif", fontSize: '16px', color: 'rgba(245,240,235,0.55)' }}>{row.day}</span>
                    <span style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '0.1em', color: row.time === 'Closed' ? 'rgba(185,28,28,0.6)' : 'rgba(245,240,235,0.5)' }}>{row.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MAP ── */}
      <div className="section-line" />
      <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          style={{
            borderRadius: '5px', overflow: 'hidden',
            border: '1px solid rgba(185,28,28,0.25)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            height: '420px',
          }}
        >
          <iframe
            src="https://www.google.com/maps/place/DHARMA+TELEVISION+HD/@27.7189136,85.372373,17z/data=!3m1!4b1!4m6!3m5!1s0x39eb1b48aba75f4f:0xf0ea8f4c2b765e31!8m2!3d27.7189136!4d85.3749479!16s%2Fg%2F11q45mpkns?entry=ttu&g_ep=EgoyMDI2MDMwOC4wIKXMDSoASAFQAw%3D%3D"
            width="100%" height="100%"
            style={{ border: 0, display: 'block', filter: 'invert(90%) hue-rotate(180deg) saturate(0.7) brightness(0.85)' }}
            allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </section>
    </div>
  );
};

export default ContactPage;