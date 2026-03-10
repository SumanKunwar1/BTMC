import { motion } from 'framer-motion';
import HeroContent from './hero/HeroContent';

const HeroSection = () => {
  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: '600px', overflow: 'hidden' }}>
      <style>{`
        @keyframes subtle-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        .hero-bg-img {
          animation: subtle-zoom 12s ease-in-out infinite alternate;
        }
        @keyframes shimmer-bar-hero {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
      `}</style>

      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <img
          src="https://res.cloudinary.com/dihev9qxc/image/upload/v1762414567/a-cinematic-wide-angle-photograph-of-a-m_CEoy2EDiQumPNWzhdw5_uw_I_igCA0-S7CF5gMT-vWVEA_wftgth.jpg"
          alt="BTMC Foundation"
          className="hero-bg-img"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* Multi-layer overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(10,5,5,0.85) 0%, rgba(80,10,10,0.5) 50%, rgba(10,5,5,0.75) 100%)',
        }} />
        {/* Noise texture */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }} />
        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '200px',
          background: 'linear-gradient(to bottom, transparent, #0a0505)',
        }} />
      </motion.div>

      {/* Decorative rings */}
      {[300, 500, 700].map((size, i) => (
        <div key={size} style={{
          position: 'absolute',
          width: size, height: size,
          borderRadius: '50%',
          border: `1px solid rgba(185,28,28,${0.12 - i * 0.03})`,
          top: '50%', right: '-10%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }} />
      ))}

      {/* Shimmer top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: 'linear-gradient(90deg, #7f1d1d, #dc2626, #f59e0b, #dc2626, #7f1d1d)',
        backgroundSize: '200% 100%',
        animation: 'shimmer-bar-hero 4s linear infinite',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: '1200px', margin: '0 auto',
        padding: '0 24px',
        height: '100%',
        display: 'flex', alignItems: 'center',
      }}>
        <HeroContent />
      </div>
    </section>
  );
};

export default HeroSection;