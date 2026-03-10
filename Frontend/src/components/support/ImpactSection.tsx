"use client"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const impacts = [
  { icon: '👥', number: '5000+', title: 'Students Supported', description: 'Providing education and guidance to practitioners worldwide' },
  { icon: '📖', number: '1000+', title: 'Teaching Hours', description: 'Delivering quality Buddhist education and meditation instruction' },
  { icon: '❤️', number: '20+', title: 'Community Programs', description: 'Supporting local communities through various initiatives' },
  { icon: '🌍', number: '10+', title: 'Countries Reached', description: 'Spreading Buddhist wisdom across international borders' },
]

const ImpactCard = ({ impact, i }: { impact: typeof impacts[0]; i: number }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.4 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ delay: i * 0.12, duration: 0.6 }}
      style={{
        background: 'linear-gradient(160deg, rgba(20,5,5,0.97), rgba(28,8,8,0.92))',
        border: '1px solid rgba(185,28,28,0.18)',
        borderRadius: '4px', padding: '28px 20px',
        textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '12px',
        transition: 'all 0.35s ease',
      }}
      whileHover={{ y: -5, borderColor: 'rgba(220,38,38,0.45)' } as any}
    >
      <div style={{ fontSize: '36px' }}>{impact.icon}</div>
      <div style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, color: '#dc2626', lineHeight: 1, textShadow: '0 0 20px rgba(220,38,38,0.25)' }}>
        {impact.number}
      </div>
      <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, #dc2626, transparent)', margin: '0 auto' }} />
      <h4 style={{ fontFamily: "'Cinzel', serif", fontSize: '12px', fontWeight: 700, color: '#f5f0eb', letterSpacing: '0.08em' }}>{impact.title}</h4>
      <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '16px', color: 'rgba(245,240,235,0.45)', lineHeight: 1.7 }}>{impact.description}</p>
    </motion.div>
  )
}

const ImpactSection = () => {
  return (
    <section style={{
      background: 'linear-gradient(180deg, rgba(12,5,5,1) 0%, rgba(10,5,5,1) 100%)',
      padding: '80px 24px', position: 'relative',
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Text:wght@400&display=swap');`}</style>
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(185,28,28,0.5), rgba(245,166,35,0.3), rgba(185,28,28,0.5), transparent)', position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '16px' }}>
            <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg, transparent, rgba(185,28,28,0.6))' }} />
            <span style={{ fontSize: '18px' }}>✨</span>
            <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg, rgba(185,28,28,0.6), transparent)' }} />
          </div>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '0.4em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '12px' }}>The Difference We Make</p>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(22px, 3vw, 38px)', fontWeight: 700, color: '#f5f0eb' }}>Our Impact</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontStyle: 'italic', color: 'rgba(245,240,235,0.4)', marginTop: '8px' }}>Your support helps us make a lasting difference</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
          {impacts.map((impact, i) => <ImpactCard key={i} impact={impact} i={i} />)}
        </div>
      </div>

      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(185,28,28,0.5), rgba(245,166,35,0.3), rgba(185,28,28,0.5), transparent)', position: 'absolute', bottom: 0, left: 0, right: 0 }} />
    </section>
  )
}

export default ImpactSection