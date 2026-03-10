import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

const LocationSection = () => {
  return (
    <section style={{
      background: 'linear-gradient(180deg, rgba(10,5,5,1) 0%, rgba(14,5,5,1) 100%)',
      padding: '100px 24px',
      position: 'relative',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700&family=Cormorant+Garamond:wght@400;500;600&family=Crimson+Text:wght@400;600&display=swap');
        .loc-contact-item {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 14px 0;
          border-bottom: 1px solid rgba(185,28,28,0.1);
          transition: border-color 0.25s ease;
        }
        .loc-contact-item:last-child { border-bottom: none; }
        .loc-contact-item:hover { border-bottom-color: rgba(185,28,28,0.3); }
        .loc-dir-link {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Cinzel', serif; font-size: 10px;
          letter-spacing: 0.25em; text-transform: uppercase;
          color: #dc2626; text-decoration: none;
          padding-bottom: 3px;
          border-bottom: 1px solid rgba(220,38,38,0.35);
          transition: all 0.25s ease;
        }
        .loc-dir-link:hover { color: #f87171; border-bottom-color: #f87171; gap: 14px; }
        .section-line { height: 1px; background: linear-gradient(90deg, transparent, rgba(185,28,28,0.5), rgba(245,166,35,0.3), rgba(185,28,28,0.5), transparent); }
      `}</style>

      <div className="section-line" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '16px' }}>
            <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg, transparent, rgba(185,28,28,0.6))' }} />
            <span style={{ fontSize: '18px' }}>📍</span>
            <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg, rgba(185,28,28,0.6), transparent)' }} />
          </div>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '0.4em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '12px' }}>
            Find Us
          </p>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(24px, 3.5vw, 42px)', fontWeight: 700, color: '#f5f0eb' }}>
            Our Location
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'start' }}>

          {/* Info side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
          >
            {/* Center name */}
            <div>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.3em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '8px' }}>
                Meditation Center
              </p>
              <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(16px, 2vw, 22px)', fontWeight: 700, color: '#f5f0eb', lineHeight: 1.2 }}>
                BTMC Foundation<br />Meditation Center
              </h3>
            </div>

            <div style={{ width: '50px', height: '2px', background: 'linear-gradient(90deg, #dc2626, transparent)' }} />

            {/* Contact items */}
            <div>
              <div className="loc-contact-item">
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'rgba(185,28,28,0.12)',
                  border: '1px solid rgba(185,28,28,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <MapPin size={15} color="#dc2626" />
                </div>
                <div>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.18em', color: 'rgba(245,240,235,0.35)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Address
                  </p>
                  <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '17px', color: 'rgba(245,240,235,0.75)', lineHeight: 1.6 }}>
                    BTMC Foundation, Jorpati,<br />
                    Gokarneswar-5, Pragati Marg,<br />
                    Kathmandu, Nepal
                  </p>
                </div>
              </div>

              <div className="loc-contact-item">
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'rgba(185,28,28,0.12)',
                  border: '1px solid rgba(185,28,28,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Phone size={15} color="#dc2626" />
                </div>
                <div>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.18em', color: 'rgba(245,240,235,0.35)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    WhatsApp / Phone
                  </p>
                  <a href="https://wa.me/9779849118562" target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: "'Crimson Text', serif", fontSize: '17px', color: 'rgba(245,240,235,0.75)', textDecoration: 'none', display: 'block', lineHeight: 1.6, transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#dc2626'}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(245,240,235,0.75)'}
                  >
                    +977-9849118562
                  </a>
                  <a href="https://wa.me/9779818123174" target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: "'Crimson Text', serif", fontSize: '17px', color: 'rgba(245,240,235,0.75)', textDecoration: 'none', display: 'block', lineHeight: 1.6, transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#dc2626'}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(245,240,235,0.75)'}
                  >
                    +977-9818123174
                  </a>
                </div>
              </div>

              <div className="loc-contact-item">
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'rgba(185,28,28,0.12)',
                  border: '1px solid rgba(185,28,28,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Mail size={15} color="#dc2626" />
                </div>
                <div>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.18em', color: 'rgba(245,240,235,0.35)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Email
                  </p>
                  <a href="mailto:info@btmcfoundation.org"
                    style={{ fontFamily: "'Crimson Text', serif", fontSize: '17px', color: 'rgba(245,240,235,0.75)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#dc2626'}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(245,240,235,0.75)'}
                  >
                    info@btmcfoundation.org
                  </a>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Jorpati,Gokarnewar,Kathmandu,Nepal"
              target="_blank"
              rel="noopener noreferrer"
              className="loc-dir-link"
            >
              Get Directions →
            </a>
          </motion.div>

          {/* Map side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{
              borderRadius: '5px', overflow: 'hidden',
              border: '1px solid rgba(185,28,28,0.25)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(185,28,28,0.08)',
              height: '420px',
            }}
          >
           <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.407437805686!2d85.372373!3d27.7189136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1b48aba75f4f%3A0xf0ea8f4c2b765e31!2sDharma%20Television%20HD!5e0!3m2!1sen!2snp!4v1719999999999"
  width="100%"
  height="100%"
  style={{
    border: 0,
    display: "block",
    filter: "invert(90%) hue-rotate(180deg) saturate(0.7) brightness(0.85)"
  }}
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  allowFullScreen
/>
          </motion.div>
        </div>
      </div>

      <div className="section-line" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
    </section>
  );
};

export default LocationSection;