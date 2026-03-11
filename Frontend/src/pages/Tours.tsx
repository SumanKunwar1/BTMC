import { motion } from 'framer-motion';
import TourCard from '../components/tours/TourCard';
import { tours } from '../data/tours';

const SL = { height:'1px',background:'linear-gradient(90deg,transparent,rgba(185,28,28,0.2),rgba(217,119,6,0.15),rgba(185,28,28,0.2),transparent)' };

const Tours = () => (
  <div style={{ background:'#fdf8f3', minHeight:'100vh' }}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700;900&family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap');`}</style>

    {/* Hero */}
    <section style={{ position:'relative', padding:'90px 24px 80px', background:'linear-gradient(180deg,rgba(185,28,28,0.07) 0%,rgba(253,248,243,1) 100%)', textAlign:'center', overflow:'hidden' }}>
      {[200,340,480].map(s=><div key={s} style={{ position:'absolute', borderRadius:'50%', border:'1px solid rgba(185,28,28,0.07)', width:s, height:s, top:'50%', left:'50%', transform:'translate(-50%,-50%)', pointerEvents:'none' }} />)}
      <motion.div initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }} style={{ position:'relative', zIndex:2 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'14px', marginBottom:'18px' }}>
          <div style={{ height:'1px', width:'50px', background:'linear-gradient(90deg,transparent,#b91c1c)' }} />
          <span style={{ fontSize:'22px' }}>🏔️</span>
          <div style={{ height:'1px', width:'50px', background:'linear-gradient(90deg,#b91c1c,transparent)' }} />
        </div>
        <p style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', letterSpacing:'0.4em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'14px' }}>Sacred Journeys</p>
        <h1 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(30px,5.5vw,66px)', fontWeight:900, color:'#1a0808', lineHeight:1.05, marginBottom:'18px' }}>Pilgrimage Tours</h1>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(16px,2vw,22px)', fontStyle:'italic', fontWeight:300, color:'#a07070' }}>Explore sacred Buddhist sites and experience profound spiritual journeys</p>
      </motion.div>
    </section>

    <div style={SL as any} />

    <section style={{ maxWidth:'1200px', margin:'0 auto', padding:'80px 24px' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:'28px' }}>
        {tours.map((tour,i)=>(
          <motion.div key={tour.id} initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:false }} transition={{ delay:i*0.1, duration:0.55 }}>
            <TourCard tour={tour}/>
          </motion.div>
        ))}
      </div>
    </section>
  </div>
);

export default Tours;