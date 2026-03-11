import { motion } from 'framer-motion';
import HeroButtons from './HeroButtons';

const HeroContent = () => (
  <div style={{ maxWidth:'680px' }}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap');`}</style>

    <motion.div initial={{ opacity:0, scaleX:0 }} animate={{ opacity:1, scaleX:1 }} transition={{ duration:0.8, delay:0.2 }}
      style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }}>
      <div style={{ height:'1px', width:'50px', background:'linear-gradient(90deg, transparent, #b91c1c)' }} />
      <span style={{ fontSize:'20px' }}>☸</span>
      <div style={{ height:'1px', width:'50px', background:'linear-gradient(90deg, #b91c1c, transparent)' }} />
    </motion.div>

    <motion.p initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3, duration:0.7 }}
      style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(9px,1.1vw,11px)', letterSpacing:'0.4em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'16px' }}>
      Buddhist Teaching &amp; Meditation Center
    </motion.p>

    <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.45, duration:0.9, ease:[0.23,1,0.32,1] }}
      style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(30px,5.5vw,66px)', fontWeight:900, lineHeight:1.05, marginBottom:'20px', color:'#1a0808', textShadow:'0 2px 20px rgba(185,28,28,0.12)' }}>
      Promoting Peace,<br />
      <span style={{ background:'linear-gradient(135deg,#991b1b 0%,#b91c1c 50%,#d97706 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
        Wisdom &amp; Compassion
      </span>
    </motion.h1>

    <motion.p initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.65, duration:0.7 }}
      style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(16px,2vw,22px)', fontStyle:'italic', fontWeight:300, color:'#6b3333', marginBottom:'40px', lineHeight:1.6 }}>
      Through Buddhist Teachings, Meditation &amp; Sacred Pilgrimage
    </motion.p>

    <HeroButtons />
  </div>
);

export default HeroContent;