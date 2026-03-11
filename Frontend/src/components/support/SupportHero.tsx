import { motion } from 'framer-motion';

const SupportHero = () => (
  <section style={{ position:'relative', padding:'90px 24px 80px', background:'linear-gradient(180deg,rgba(185,28,28,0.07) 0%,rgba(253,248,243,1) 100%)', textAlign:'center', overflow:'hidden' }}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap');`}</style>
    {[200,340,480].map(s=><div key={s} style={{ position:'absolute', borderRadius:'50%', border:'1px solid rgba(185,28,28,0.07)', width:s, height:s, top:'50%', left:'50%', transform:'translate(-50%,-50%)', pointerEvents:'none' }} />)}
    <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', fontFamily:"'Cinzel',serif", fontSize:'clamp(80px,14vw,200px)', fontWeight:900, color:'rgba(185,28,28,0.04)', userSelect:'none', pointerEvents:'none', whiteSpace:'nowrap' }}>DANA</div>
    <motion.div initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }} style={{ position:'relative', zIndex:2 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'14px', marginBottom:'18px' }}>
        <div style={{ height:'1px', width:'50px', background:'linear-gradient(90deg,transparent,#b91c1c)' }} />
        <span style={{ fontSize:'22px' }}>🙏</span>
        <div style={{ height:'1px', width:'50px', background:'linear-gradient(90deg,#b91c1c,transparent)' }} />
      </div>
      <p style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', letterSpacing:'0.4em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'14px' }}>The Gift of Dharma</p>
      <h1 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(30px,5.5vw,66px)', fontWeight:900, color:'#1a0808', lineHeight:1.05, marginBottom:'18px' }}>Support Our Cause</h1>
      <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(16px,2vw,22px)', fontStyle:'italic', fontWeight:300, color:'#a07070' }}>Help us spread Buddhist teachings and support our community</p>
    </motion.div>
  </section>
);

export default SupportHero;