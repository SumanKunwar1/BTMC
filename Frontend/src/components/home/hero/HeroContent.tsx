import { motion } from 'framer-motion';
import HeroButtons from './HeroButtons';

const HeroContent = () => {
  return (
    <div style={{ color: '#f5f0eb', maxWidth: '680px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
      `}</style>

      {/* Ornament line */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}
      >
        <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg, transparent, #dc2626)' }} />
        <span style={{ fontSize: '18px' }}>☸</span>
        <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg, #dc2626, transparent)' }} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 'clamp(9px, 1.2vw, 11px)',
          letterSpacing: '0.4em',
          color: '#dc2626',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}
      >
        Buddhist Teaching &amp; Meditation Center
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.45, ease: [0.23, 1, 0.32, 1] }}
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 'clamp(32px, 5.5vw, 68px)',
          fontWeight: 900,
          lineHeight: 1.05,
          marginBottom: '20px',
          color: '#f5f0eb',
          textShadow: '0 2px 30px rgba(0,0,0,0.6), 0 0 60px rgba(220,38,38,0.1)',
        }}
      >
        Promoting Peace,<br />
        <span style={{
          background: 'linear-gradient(135deg, #f5f0eb 0%, #dc2626 50%, #f59e0b 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Wisdom &amp; Compassion
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.65 }}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(16px, 2vw, 22px)',
          fontStyle: 'italic',
          color: 'rgba(245,240,235,0.65)',
          marginBottom: '40px',
          lineHeight: 1.6,
          fontWeight: 300,
        }}
      >
        Through Buddhist Teachings, Meditation &amp; Sacred Pilgrimage
      </motion.p>

      <HeroButtons />
    </div>
  );
};

export default HeroContent;