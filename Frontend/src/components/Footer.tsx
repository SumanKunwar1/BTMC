import { Mail, Phone, MapPin } from 'lucide-react';

const LOGO_URL =
  'https://res.cloudinary.com/dihev9qxc/image/upload/v1773154972/WhatsApp_Image_2026-03-10_at_15.26.43-removebg-preview_eixatv.png';

const Footer = () => {
  return (
    <footer style={{
      background: 'linear-gradient(180deg, #0a0505 0%, #050202 100%)',
      color: '#f5f0eb',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700&family=Cormorant+Garamond:wght@400;500&family=Crimson+Text:wght@400;600&display=swap');

        .footer-link {
          font-family: 'Crimson Text', serif;
          font-size: 16px;
          color: rgba(245,240,235,0.45);
          text-decoration: none;
          transition: color 0.2s ease;
          display: block;
          padding: 3px 0;
        }
        .footer-link:hover { color: #dc2626; }

        .footer-input {
          width: 100%;
          padding: 11px 14px;
          background: rgba(20,5,5,0.8);
          border: 1px solid rgba(185,28,28,0.25);
          border-radius: 3px;
          color: #f5f0eb;
          font-family: 'Crimson Text', serif;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s ease;
          box-sizing: border-box;
        }
        .footer-input:focus { border-color: rgba(220,38,38,0.6); }
        .footer-input::placeholder { color: rgba(245,240,235,0.25); }

        .footer-subscribe-btn {
          width: 100%;
          padding: 11px;
          background: linear-gradient(135deg, #991b1b, #dc2626);
          color: #fff;
          border: none;
          border-radius: 3px;
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 14px rgba(185,28,28,0.3);
        }
        .footer-subscribe-btn:hover {
          background: linear-gradient(135deg, #7f1d1d, #b91c1c);
          box-shadow: 0 6px 20px rgba(185,28,28,0.5);
        }

        .footer-contact-row {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 6px 0;
        }

        .section-line { height: 1px; background: linear-gradient(90deg, transparent, rgba(185,28,28,0.5), rgba(245,166,35,0.3), rgba(185,28,28,0.5), transparent); }
      `}</style>

      {/* Top shimmer line */}
      <div className="section-line" />

      {/* Ghost background text */}
      <div style={{
        position: 'absolute', bottom: '40px', right: '-2%',
        fontFamily: "'Cinzel', serif",
        fontSize: 'clamp(60px, 10vw, 140px)',
        fontWeight: 900,
        color: 'rgba(185,28,28,0.03)',
        userSelect: 'none', pointerEvents: 'none',
        lineHeight: 1, letterSpacing: '-0.04em',
      }}>
        BTMC
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px 40px', position: 'relative', zIndex: 2 }}>

        {/* Top row: logo + columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px 48px', marginBottom: '52px' }}>

          {/* Brand column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src={LOGO_URL}
                alt="BTMC Foundation Logo"
                style={{ width: '52px', height: '58px', objectFit: 'contain', filter: 'drop-shadow(0 2px 8px rgba(185,28,28,0.3))' }}
              />
              <div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: '18px', fontWeight: 900, letterSpacing: '0.06em', background: 'linear-gradient(135deg, #f5f0eb, #dc2626)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>BTMC</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '11px', letterSpacing: '0.25em', color: 'rgba(245,240,235,0.4)', textTransform: 'uppercase' }}>Foundation</div>
              </div>
            </div>
            <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '15px', color: 'rgba(245,240,235,0.4)', lineHeight: 1.7, fontStyle: 'italic' }}>
              Spreading the light of Dharma — peace, wisdom &amp; compassion for all beings.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['☸', '🙏', '🌸'].map((sym) => (
                <span key={sym} style={{ fontSize: '18px', opacity: 0.4 }}>{sym}</span>
              ))}
            </div>
          </div>

          {/* Contact column */}
          <div>
            <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '12px', letterSpacing: '0.25em', color: '#f5f0eb', textTransform: 'uppercase', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid rgba(185,28,28,0.2)' }}>
              Contact Us
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div className="footer-contact-row">
                <MapPin size={14} color="#dc2626" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span style={{ fontFamily: "'Crimson Text', serif", fontSize: '15px', color: 'rgba(245,240,235,0.5)', lineHeight: 1.6 }}>
                  Jorpati, Gokarneswar-5,<br />Pragati Marg, Kathmandu, Nepal
                </span>
              </div>
              <div className="footer-contact-row">
                <Phone size={14} color="#dc2626" style={{ marginTop: '3px', flexShrink: 0 }} />
                <div>
                  <a href="https://wa.me/9779849118562" target="_blank" rel="noopener noreferrer" className="footer-link">+977-9849118562</a>
                  <a href="https://wa.me/9779818123174" target="_blank" rel="noopener noreferrer" className="footer-link">+977-9818123174</a>
                </div>
              </div>
              <div className="footer-contact-row">
                <Mail size={14} color="#dc2626" style={{ marginTop: '3px', flexShrink: 0 }} />
                <a href="mailto:info@btmcfoundation.org" className="footer-link">info@btmcfoundation.org</a>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '12px', letterSpacing: '0.25em', color: '#f5f0eb', textTransform: 'uppercase', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid rgba(185,28,28,0.2)' }}>
              Quick Links
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { href: '/about', label: 'About Us' },
                { href: '/teachings', label: 'Teachings' },
                { href: '/events', label: 'Events & Retreats' },
                { href: '/support', label: 'Support Us' },
                { href: '/contact', label: 'Contact' },
              ].map((l) => (
                <a key={l.href} href={l.href} className="footer-link">{l.label}</a>
              ))}
            </div>
          </div>

          {/* Resources 
          <div>
            <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '12px', letterSpacing: '0.25em', color: '#f5f0eb', textTransform: 'uppercase', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid rgba(185,28,28,0.2)' }}>
              Resources
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '28px' }}>
              {[
                { href: '/blog', label: 'Blog' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/team', label: 'Our Team' },
                { href: '/faq', label: 'FAQ' },
                { href: '/career', label: 'Career' },
              ].map((l) => (
                <a key={l.href} href={l.href} className="footer-link">{l.label}</a>
              ))}
            </div>
          </div>
          */}

          {/* Newsletter */}
          <div>
            <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '12px', letterSpacing: '0.25em', color: '#f5f0eb', textTransform: 'uppercase', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid rgba(185,28,28,0.2)' }}>
              Newsletter
            </h3>
            <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '15px', color: 'rgba(245,240,235,0.4)', marginBottom: '16px', lineHeight: 1.6 }}>
              Subscribe to receive updates about our activities, retreats, and events.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="email"
                placeholder="Enter your email"
                className="footer-input"
              />
              <button type="button" className="footer-subscribe-btn">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="section-line" style={{ marginBottom: '24px' }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '14px', color: 'rgba(245,240,235,0.25)' }}>
            © {new Date().getFullYear()} BTMC Foundation. All rights reserved.
          </p>
          <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '14px', color: 'rgba(245,240,235,0.2)', fontStyle: 'italic' }}>
            Peace · Wisdom · Compassion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;