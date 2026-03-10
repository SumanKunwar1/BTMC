"use client"
import { motion } from "framer-motion"

const SupportHero = () => {
  return (
    <section style={{
      position: 'relative',
      padding: '90px 24px 80px',
      background: 'radial-gradient(ellipse at 50% 0%, rgba(120,10,10,0.35) 0%, rgba(10,5,5,1) 65%)',
      textAlign: 'center', overflow: 'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700;900&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&display=swap');
      `}</style>
      {[180, 320, 460].map((size) => (
        <div key={size} style={{
          position: 'absolute', borderRadius: '50%',
          border: '1px solid rgba(185,28,28,0.07)',
          width: size, height: size,
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }} />
      ))}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        fontFamily: "'Cinzel', serif", fontSize: 'clamp(80px, 15vw, 200px)', fontWeight: 900,
        color: 'rgba(185,28,28,0.03)', userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>DANA</div>

      <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '18px' }}>
          <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg, transparent, #dc2626)' }} />
          <span style={{ fontSize: '22px' }}>🙏</span>
          <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg, #dc2626, transparent)' }} />
        </div>
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '0.4em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '14px' }}>
          The Gift of Dharma
        </p>
        <motion.h1
          initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(28px, 5vw, 64px)', fontWeight: 900, color: '#f5f0eb', lineHeight: 1.05, marginBottom: '18px', textShadow: '0 0 60px rgba(220,38,38,0.12)' }}
        >
          Support Our Cause
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(16px, 2vw, 22px)', fontStyle: 'italic', fontWeight: 300, color: 'rgba(245,240,235,0.5)' }}
        >
          Help us spread Buddhist teachings and support our community
        </motion.p>
      </motion.div>
    </section>
  )
}

export default SupportHero