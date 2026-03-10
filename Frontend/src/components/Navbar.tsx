import React from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { NavItems } from '../config/navigation';

const LOGO_URL =
  'https://res.cloudinary.com/dihev9qxc/image/upload/v1773154972/WhatsApp_Image_2026-03-10_at_15.26.43-removebg-preview_eixatv.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Google Fonts — scoped to navbar */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Cormorant+Garamond:wght@400;500;600&display=swap');

        .btmc-nav {
          position: sticky;
          top: 0;
          z-index: 9999;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          background: ${scrolled
            ? 'rgba(255,255,255,0.97)'
            : 'rgba(255,255,255,1)'};
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: ${scrolled
            ? '0 4px 30px rgba(185,28,28,0.12), 0 1px 0 rgba(185,28,28,0.08)'
            : '0 2px 20px rgba(0,0,0,0.06)'};
          border-bottom: 1.5px solid rgba(185,28,28,0.13);
        }

        .btmc-nav::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #7f1d1d, #dc2626, #f59e0b, #dc2626, #7f1d1d);
          background-size: 200% 100%;
          animation: shimmer-bar 4s linear infinite;
        }
        @keyframes shimmer-bar {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }

        .btmc-nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
          position: relative;
        }

        /* ── Logo ── */
        .btmc-logo-link {
          display: flex;
          align-items: center;
          gap: 14px;
          text-decoration: none;
          flex-shrink: 0;
          transition: opacity 0.2s ease;
        }
        .btmc-logo-link:hover { opacity: 0.88; }

        .btmc-logo-img-wrap {
          position: relative;
          width: 64px;
          height: 72px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .btmc-logo-img-wrap::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .btmc-logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          filter: drop-shadow(0 2px 8px rgba(185,28,28,0.25));
          transition: filter 0.3s ease, transform 0.3s ease;
        }
        .btmc-logo-link:hover .btmc-logo-img {
          filter: drop-shadow(0 4px 16px rgba(185,28,28,0.4));
          transform: scale(1.03);
        }

        .btmc-logo-text {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .btmc-logo-title {
          font-family: 'Cinzel', serif;
          font-size: 20px;
          font-weight: 900;
          letter-spacing: 0.08em;
          line-height: 1;
          background: linear-gradient(135deg, #991b1b 0%, #dc2626 50%, #b91c1c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .btmc-logo-sub {
          font-family: 'Cormorant Garamond', serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.28em;
          color: #6b7280;
          text-transform: uppercase;
        }
        .btmc-logo-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.15em;
          color: rgba(185,28,28,0.55);
          font-style: italic;
          margin-top: 2px;
        }

        /* ── Desktop nav links ── */
        .btmc-nav-links {
          display: flex;
          align-items: center;
          gap: 2px;
        }
        @media (max-width: 900px) { .btmc-nav-links { display: none; } }

        .btmc-nav-link {
          font-family: 'Cinzel', serif;
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          color: #374151;
          padding: 8px 14px;
          border-radius: 3px;
          position: relative;
          transition: color 0.25s ease, background 0.25s ease;
        }
        .btmc-nav-link::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 14px; right: 14px;
          height: 1.5px;
          background: #dc2626;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          border-radius: 1px;
        }
        .btmc-nav-link:hover { color: #dc2626; background: rgba(220,38,38,0.05); }
        .btmc-nav-link:hover::after { transform: scaleX(1); }
        .btmc-nav-link.active {
          color: #dc2626;
          background: rgba(220,38,38,0.07);
        }
        .btmc-nav-link.active::after { transform: scaleX(1); }

        /* ── Support button ── */
        .btmc-support-btn {
          font-family: 'Cinzel', serif;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          color: #fff;
          padding: 10px 22px;
          border-radius: 3px;
          margin-left: 12px;
          background: linear-gradient(135deg, #991b1b, #dc2626);
          box-shadow: 0 4px 14px rgba(185,28,28,0.35);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .btmc-support-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.5s ease;
        }
        .btmc-support-btn:hover {
          background: linear-gradient(135deg, #7f1d1d, #b91c1c);
          box-shadow: 0 6px 20px rgba(185,28,28,0.5);
          transform: translateY(-1px);
        }
        .btmc-support-btn:hover::before { left: 100%; }

        /* ── Ornamental divider between links and CTA ── */
        .btmc-divider {
          width: 1px;
          height: 22px;
          background: linear-gradient(to bottom, transparent, rgba(185,28,28,0.3), transparent);
          margin: 0 8px;
        }

        /* ── Mobile toggle ── */
        .btmc-mobile-toggle {
          display: none;
          align-items: center;
          justify-content: center;
          width: 40px; height: 40px;
          border-radius: 4px;
          border: 1px solid rgba(185,28,28,0.25);
          background: rgba(220,38,38,0.04);
          cursor: pointer;
          color: #dc2626;
          transition: all 0.25s ease;
        }
        .btmc-mobile-toggle:hover {
          background: rgba(220,38,38,0.1);
          border-color: rgba(185,28,28,0.5);
        }
        @media (max-width: 900px) { .btmc-mobile-toggle { display: flex; } }

        /* ── Mobile menu ── */
        .btmc-mobile-menu {
          display: none;
          flex-direction: column;
          border-top: 1px solid rgba(185,28,28,0.1);
          background: rgba(255,255,255,0.99);
          padding: 12px 16px 20px;
          gap: 4px;
        }
        .btmc-mobile-menu.open { display: flex; }

        .btmc-mobile-link {
          font-family: 'Cinzel', serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          color: #374151;
          padding: 12px 16px;
          border-radius: 3px;
          border-left: 2px solid transparent;
          transition: all 0.2s ease;
        }
        .btmc-mobile-link:hover,
        .btmc-mobile-link.active {
          color: #dc2626;
          background: rgba(220,38,38,0.06);
          border-left-color: #dc2626;
        }

        .btmc-mobile-support {
          font-family: 'Cinzel', serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          color: #fff;
          padding: 13px 16px;
          border-radius: 3px;
          background: linear-gradient(135deg, #991b1b, #dc2626);
          text-align: center;
          margin-top: 8px;
          box-shadow: 0 3px 12px rgba(185,28,28,0.3);
          transition: all 0.25s ease;
        }
        .btmc-mobile-support:hover {
          background: linear-gradient(135deg, #7f1d1d, #b91c1c);
        }

        /* Subtle bottom accent line on mobile items */
        .btmc-mobile-sep {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(185,28,28,0.12), transparent);
          margin: 4px 0;
        }
      `}</style>

      <nav className="btmc-nav">
        <div className="btmc-nav-inner">

          {/* ── Logo ── */}
          <Link to="/" className="btmc-logo-link">
            <div className="btmc-logo-img-wrap">
              <img
                src={LOGO_URL}
                alt="BTMC Foundation Logo"
                className="btmc-logo-img"
              />
            </div>
            <div className="btmc-logo-text">
              <span className="btmc-logo-title">BTMC</span>
              <span className="btmc-logo-sub">Foundation</span>
              <span className="btmc-logo-tagline">Peace · Wisdom · Compassion</span>
            </div>
          </Link>

          {/* ── Desktop links ── */}
          <div className="btmc-nav-links">
            {NavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`btmc-nav-link${location.pathname === item.path ? ' active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
            <div className="btmc-divider" />
            <Link to="/support" className="btmc-support-btn">
              Support Us
            </Link>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            className="btmc-mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* ── Mobile menu ── */}
        <div className={`btmc-mobile-menu${isOpen ? ' open' : ''}`}>
          {NavItems.map((item, i) => (
            <React.Fragment key={item.path}>
              <Link
                to={item.path}
                className={`btmc-mobile-link${location.pathname === item.path ? ' active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
              {i < NavItems.length - 1 && <div className="btmc-mobile-sep" />}
            </React.Fragment>
          ))}
          <Link
            to="/support"
            className="btmc-mobile-support"
            onClick={() => setIsOpen(false)}
          >
            Support Us
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;