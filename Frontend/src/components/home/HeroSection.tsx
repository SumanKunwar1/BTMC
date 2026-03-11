import { motion } from 'framer-motion';
import HeroContent from './hero/HeroContent';

const HeroSection = () => {
  return (
    <section style={{ position:'relative', height:'100vh', minHeight:'600px', overflow:'hidden' }}>
      <style>{`
        @keyframes subtle-zoom { 0%{transform:scale(1)} 100%{transform:scale(1.06)} }
        @keyframes shimmer-hero { 0%{background-position:0% 0%} 100%{background-position:200% 0%} }
        .hero-img { animation: subtle-zoom 14s ease-in-out infinite alternate; }
      `}</style>

      {/* Background */}
      <motion.div style={{ position:'absolute', inset:0 }} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:1.2 }}>
        <img src="https://res.cloudinary.com/dihev9qxc/image/upload/v1762414567/a-cinematic-wide-angle-photograph-of-a-m_CEoy2EDiQumPNWzhdw5_uw_I_igCA0-S7CF5gMT-vWVEA_wftgth.jpg"
          alt="BTMC Foundation" className="hero-img"
          style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
        {/* Warm overlay — lighter than before */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(253,248,243,0.82) 0%, rgba(180,60,30,0.25) 50%, rgba(253,248,243,0.65) 100%)' }} />
        {/* Bottom fade to page bg */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'220px', background:'linear-gradient(to bottom, transparent, #fdf8f3)' }} />
      </motion.div>

      {/* Decorative rings — now use warm cream border */}
      {[300,500,700].map((size,i)=>(
        <div key={size} style={{ position:'absolute', width:size, height:size, borderRadius:'50%', border:`1px solid rgba(185,28,28,${0.1-i*0.025})`, top:'50%', right:'-10%', transform:'translateY(-50%)', pointerEvents:'none' }} />
      ))}

      {/* Top shimmer line */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'3px', background:'linear-gradient(90deg,#991b1b,#b91c1c,#d97706,#b91c1c,#991b1b)', backgroundSize:'200% 100%', animation:'shimmer-hero 4s linear infinite' }} />

      {/* Content */}
      <div style={{ position:'relative', zIndex:2, maxWidth:'1200px', margin:'0 auto', padding:'0 24px', height:'100%', display:'flex', alignItems:'center' }}>
        <HeroContent />
      </div>
    </section>
  );
};

export default HeroSection;