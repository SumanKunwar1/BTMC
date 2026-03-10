import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Stat {
  icon: string;
  endValue: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: Stat[] = [
  { icon: '⏳', endValue: 20, suffix: '+', label: 'Years of Experience', description: 'in Buddhist Education' },
  { icon: '👥', endValue: 5000, suffix: '+', label: 'Students Trained', description: 'from around the world' },
  { icon: '🗺️', endValue: 300, suffix: '+', label: 'Pilgrimage Tours', description: 'successfully organized' },
  { icon: '🏛️', endValue: 7, suffix: '', label: 'Institutions Founded', description: 'academic & non-academic' },
];

const CountUp = ({ end, suffix, trigger }: { end: number; suffix: string; trigger: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    setCount(0);
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [trigger, end]);
  return <span>{count}{suffix}</span>;
};

const StatItem = ({ stat, i }: { stat: Stat; i: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, delay: i * 0.12 }}
      style={{ textAlign: 'center', padding: '8px' }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: i * 0.12 + 0.15 }}
        style={{ fontSize: '32px', marginBottom: '12px' }}
      >
        {stat.icon}
      </motion.div>
      <div style={{
        fontFamily: "'Cinzel', serif",
        fontSize: 'clamp(32px, 4.5vw, 52px)',
        fontWeight: 900,
        color: '#f5f0eb',
        lineHeight: 1,
        marginBottom: '8px',
        textShadow: '0 0 30px rgba(220,38,38,0.3)',
      }}>
        <CountUp end={stat.endValue} suffix={stat.suffix} trigger={isInView} />
      </div>
      <div style={{ fontFamily: "'Cinzel', serif", fontSize: '12px', fontWeight: 600, color: '#f5f0eb', letterSpacing: '0.1em', marginBottom: '4px' }}>
        {stat.label}
      </div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '14px', color: 'rgba(245,240,235,0.45)', fontStyle: 'italic' }}>
        {stat.description}
      </div>
    </motion.div>
  );
};

const StatsSection = () => {
  return (
    <section style={{
      position: 'relative',
      padding: '80px 24px',
      background: 'linear-gradient(135deg, #1a0404, #2d0808, #1a0404)',
      overflow: 'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700;900&family=Cormorant+Garamond:ital,wght@1,300;1,400&display=swap');
      `}</style>

      {/* Big ghost number */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: "'Cinzel', serif",
        fontSize: 'clamp(100px, 20vw, 260px)',
        fontWeight: 900,
        color: 'rgba(185,28,28,0.04)',
        whiteSpace: 'nowrap',
        userSelect: 'none', pointerEvents: 'none',
        letterSpacing: '-0.05em',
      }}>2003</div>

      {/* Top shimmer line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(185,28,28,0.6), rgba(245,166,35,0.4), rgba(185,28,28,0.6), transparent)' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '48px' }}>
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} i={i} />
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(185,28,28,0.6), rgba(245,166,35,0.4), rgba(185,28,28,0.6), transparent)' }} />
    </section>
  );
};

export default StatsSection;