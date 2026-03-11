import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { icon:'⏳', endValue:20, suffix:'+', label:'Years of Experience', description:'in Buddhist Education' },
  { icon:'👥', endValue:5000, suffix:'+', label:'Students Trained', description:'from around the world' },
  { icon:'🗺️', endValue:300, suffix:'+', label:'Pilgrimage Tours', description:'successfully organized' },
  { icon:'🏛️', endValue:7, suffix:'', label:'Institutions Founded', description:'academic & non-academic' },
];

const CountUp = ({ end, suffix, trigger }: { end:number; suffix:string; trigger:boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    setCount(0);
    let current = 0;
    const steps = 60, increment = end / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 2000 / steps);
    return () => clearInterval(timer);
  }, [trigger, end]);
  return <span>{count}{suffix}</span>;
};

const StatItem = ({ stat, i }: { stat:typeof stats[0]; i:number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount:0.5 });
  return (
    <motion.div ref={ref} initial={{ opacity:0, y:24 }} animate={isInView?{ opacity:1, y:0 }:{ opacity:0, y:24 }} transition={{ duration:0.6, delay:i*0.12 }} style={{ textAlign:'center', padding:'8px' }}>
      <motion.div initial={{ scale:0 }} animate={isInView?{ scale:1 }:{ scale:0 }} transition={{ duration:0.5, delay:i*0.12+0.15 }} style={{ fontSize:'32px', marginBottom:'12px' }}>{stat.icon}</motion.div>
      <div style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(30px,4.5vw,50px)', fontWeight:900, color:'#fff', lineHeight:1, marginBottom:'8px', textShadow:'0 2px 12px rgba(0,0,0,0.15)' }}>
        <CountUp end={stat.endValue} suffix={stat.suffix} trigger={isInView} />
      </div>
      <div style={{ fontFamily:"'Cinzel',serif", fontSize:'12px', fontWeight:600, color:'rgba(255,255,255,0.9)', letterSpacing:'0.1em', marginBottom:'4px' }}>{stat.label}</div>
      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'14px', color:'rgba(255,255,255,0.65)', fontStyle:'italic' }}>{stat.description}</div>
    </motion.div>
  );
};

const StatsSection = () => (
  <section style={{ position:'relative', padding:'80px 24px', background:'linear-gradient(135deg, #991b1b 0%, #b91c1c 50%, #7f1d1d 100%)', overflow:'hidden' }}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Cormorant+Garamond:ital,wght@1,400&display=swap');`}</style>
    {/* Subtle pattern overlay */}
    <div style={{ position:'absolute', inset:0, opacity:0.05, backgroundImage:`url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
    <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', fontFamily:"'Cinzel',serif", fontSize:'clamp(100px,20vw,260px)', fontWeight:900, color:'rgba(255,255,255,0.05)', whiteSpace:'nowrap', userSelect:'none', pointerEvents:'none', letterSpacing:'-0.05em' }}>2003</div>
    <div style={{ maxWidth:'1100px', margin:'0 auto', position:'relative', zIndex:2 }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:'48px' }}>
        {stats.map((stat,i)=><StatItem key={stat.label} stat={stat} i={i} />)}
      </div>
    </div>
  </section>
);

export default StatsSection;