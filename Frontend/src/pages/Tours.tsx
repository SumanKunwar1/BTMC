import { motion } from 'framer-motion';
import TourCard from '../components/tours/TourCard';
import { tours } from '../data/tours';

const Tours = () => {
  return (
    <div style={{ background: '#0a0505', minHeight: '100vh', color: '#f5f0eb' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Crimson+Text:wght@400;600&display=swap');
        .section-line { height: 1px; background: linear-gradient(90deg, transparent, rgba(185,28,28,0.5), rgba(245,166,35,0.3), rgba(185,28,28,0.5), transparent); }
      `}</style>

      {/* Hero */}
      <section style={{
        position: 'relative',
        padding: '90px 24px 80px',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(120,10,10,0.35) 0%, rgba(10,5,5,1) 65%)',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        {[200, 340, 480].map((size) => (
          <div key={size} style={{
            position: 'absolute', borderRadius: '50%',
            border: '1px solid rgba(185,28,28,0.08)',
            width: size, height: size,
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }} />
        ))}
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '18px' }}>
            <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg, transparent, #dc2626)' }} />
            <span style={{ fontSize: '22px' }}>🏔️</span>
            <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg, #dc2626, transparent)' }} />
          </div>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '0.4em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '14px' }}>
            Sacred Journeys
          </p>
          <h1 style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(32px, 5.5vw, 68px)',
            fontWeight: 900, lineHeight: 1.05,
            color: '#f5f0eb', marginBottom: '18px',
            textShadow: '0 0 60px rgba(220,38,38,0.12)',
          }}>
            Pilgrimage Tours
          </h1>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(16px, 2vw, 22px)',
            fontStyle: 'italic', fontWeight: 300,
            color: 'rgba(245,240,235,0.5)',
          }}>
            Explore sacred Buddhist sites and experience profound spiritual journeys
          </p>
        </motion.div>
      </section>

      <div className="section-line" />

      {/* Grid */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px' }}>
          {tours.map((tour, i) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
            >
              <TourCard tour={tour} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Tours;