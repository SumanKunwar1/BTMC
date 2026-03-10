import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { events } from '../data/events';

const CATEGORIES = ['All', 'Retreat', 'International Retreat', 'World Peace Prayers'];

const categoryColors: Record<string, string> = {
  'Retreat': '#16a34a',
  'International Retreat': '#dc2626',
  'World Peace Prayers': '#7c3aed',
};

export default function Events() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? events
      : events.filter((e) => e.category === activeCategory);

  return (
    <div
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        backgroundColor: '#0a0505',
        color: '#f5f0eb',
        minHeight: '100vh',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

        .ev-hero-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(185,28,28,0.18);
          pointer-events: none;
        }
        .ev-filter-btn {
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 8px 18px;
          border-radius: 2px;
          border: 1px solid rgba(185,28,28,0.3);
          color: rgba(245,240,235,0.55);
          background: transparent;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .ev-filter-btn:hover {
          border-color: rgba(220,38,38,0.7);
          color: #f5f0eb;
          background: rgba(220,38,38,0.08);
        }
        .ev-filter-btn.active {
          background: linear-gradient(135deg, #991b1b, #dc2626);
          border-color: #dc2626;
          color: #fff;
          box-shadow: 0 4px 16px rgba(185,28,28,0.35);
        }

        .ev-card {
          background: linear-gradient(160deg, rgba(20,5,5,0.95) 0%, rgba(28,8,8,0.9) 100%);
          border: 1px solid rgba(185,28,28,0.18);
          border-radius: 6px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }
        .ev-card:hover {
          border-color: rgba(220,38,38,0.6);
          box-shadow: 0 20px 60px rgba(185,28,28,0.2), 0 0 30px rgba(185,28,28,0.08);
          transform: translateY(-6px);
        }

        .ev-card-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          transition: transform 0.6s ease;
          display: block;
        }
        .ev-card:hover .ev-card-img {
          transform: scale(1.04);
        }

        .ev-tag {
          font-family: 'Cinzel', serif;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 2px;
          display: inline-block;
          font-weight: 600;
        }

        .ev-learn-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #dc2626;
          text-decoration: none;
          padding: 8px 0;
          border-bottom: 1px solid rgba(220,38,38,0.3);
          transition: all 0.25s ease;
        }
        .ev-learn-btn:hover {
          color: #f87171;
          border-bottom-color: #f87171;
          gap: 12px;
        }

        .section-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(185,28,28,0.5), rgba(245,166,35,0.3), rgba(185,28,28,0.5), transparent);
        }

        .free-badge {
          font-family: 'Cinzel', serif;
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          background: linear-gradient(135deg, #15803d, #16a34a);
          color: #fff;
          padding: 3px 10px;
          border-radius: 2px;
        }
      `}</style>

      {/* ── HERO BANNER ──────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          padding: '80px 24px',
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(120,10,10,0.35) 0%, rgba(10,5,5,1) 65%)',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        {[200, 320, 440, 560].map((size) => (
          <div
            key={size}
            className="ev-hero-ring"
            style={{
              width: size, height: size,
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0.5,
            }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: 'relative', zIndex: 2 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, transparent, #dc2626)' }} />
            <Sparkles size={16} color="#dc2626" />
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, #dc2626, transparent)' }} />
          </div>

          <p style={{ fontFamily: "'Cinzel', serif", fontSize: '11px', letterSpacing: '0.4em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '14px' }}>
            BTMC Foundation
          </p>

          <h1
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 900,
              color: '#f5f0eb',
              lineHeight: 1,
              marginBottom: '16px',
              textShadow: '0 0 40px rgba(220,38,38,0.2)',
            }}
          >
            Events &amp; Retreats
          </h1>
          <p
            style={{
              fontFamily: "'Crimson Text', serif",
              fontSize: 'clamp(16px, 2vw, 20px)',
              color: 'rgba(245,240,235,0.55)',
              fontStyle: 'italic',
              maxWidth: '520px',
              margin: '0 auto',
            }}
          >
            Join our sacred gatherings — deepen your practice, cultivate peace, and walk the path of wisdom together.
          </p>
        </motion.div>
      </section>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        {/* ── FILTER TABS ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', padding: '40px 0 48px' }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`ev-filter-btn${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── EVENT GRID ───────────────────────────────────────────────── */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '28px',
            paddingBottom: '100px',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((event, i) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="ev-card"
              >
                {/* Image */}
                <div style={{ overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="ev-card-img"
                  />
                  {/* Category pill overlay */}
                  <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', gap: '8px' }}>
                    <span
                      className="ev-tag"
                      style={{
                        background: categoryColors[event.category] || '#dc2626',
                        color: '#fff',
                      }}
                    >
                      {event.category}
                    </span>
                    {event.isFree && (
                      <span className="free-badge">Free</span>
                    )}
                  </div>
                  {/* Date tag */}
                  {event.tag && (
                    <div style={{
                      position: 'absolute', bottom: '14px', right: '14px',
                      fontFamily: "'Cinzel', serif",
                      fontSize: '9px', letterSpacing: '0.15em',
                      background: 'rgba(10,5,5,0.85)',
                      border: `1px solid ${event.tagColor || '#dc2626'}`,
                      color: event.tagColor || '#dc2626',
                      padding: '4px 10px', borderRadius: '2px',
                      textTransform: 'uppercase',
                      backdropFilter: 'blur(4px)',
                    }}>
                      {event.tag}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: 'clamp(14px, 1.5vw, 17px)',
                      fontWeight: 700,
                      color: '#f5f0eb',
                      lineHeight: 1.3,
                    }}
                  >
                    {event.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "'Crimson Text', serif",
                      fontSize: '16px',
                      color: 'rgba(245,240,235,0.55)',
                      lineHeight: 1.65,
                      flex: 1,
                    }}
                  >
                    {event.shortDescription}
                  </p>

                  {/* Meta info */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calendar size={13} color="#dc2626" />
                      <span style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(245,240,235,0.5)' }}>
                        {event.date}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MapPin size={13} color="#dc2626" />
                      <span style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(245,240,235,0.5)' }}>
                        {event.venue}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="section-line" style={{ margin: '8px 0' }} />

                  {/* Learn more */}
                  <Link to={`/events/${event.id}`} className="ev-learn-btn">
                    View Details <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}