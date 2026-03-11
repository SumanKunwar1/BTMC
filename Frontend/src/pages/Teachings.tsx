// Teachings.tsx — light theme
import { motion } from 'framer-motion';
import CategoryCard from '../components/teachings/CategoryCard';
import { courseCategories } from '../data/courses';

const SL = { height:'1px',background:'linear-gradient(90deg,transparent,rgba(185,28,28,0.2),rgba(217,119,6,0.15),rgba(185,28,28,0.2),transparent)' };

const Teachings = () => (
  <div style={{ background:'#fdf8f3', minHeight:'100vh' }}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700;900&family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Crimson+Text:wght@400;600&display=swap');`}</style>

    {/* Hero */}
    <section style={{ position:'relative', padding:'90px 24px 80px', background:'linear-gradient(180deg,rgba(185,28,28,0.07) 0%,rgba(253,248,243,1) 100%)', textAlign:'center', overflow:'hidden' }}>
      {[200,340,480].map(s=><div key={s} style={{ position:'absolute', borderRadius:'50%', border:'1px solid rgba(185,28,28,0.07)', width:s, height:s, top:'50%', left:'50%', transform:'translate(-50%,-50%)', pointerEvents:'none' }} />)}
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', fontFamily:"'Cinzel',serif", fontSize:'clamp(80px,14vw,200px)', fontWeight:900, color:'rgba(185,28,28,0.04)', userSelect:'none', pointerEvents:'none', whiteSpace:'nowrap' }}>DHARMA</div>
      <motion.div initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }} style={{ position:'relative', zIndex:2 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'14px', marginBottom:'18px' }}>
          <div style={{ height:'1px', width:'50px', background:'linear-gradient(90deg,transparent,#b91c1c)' }} />
          <span style={{ fontSize:'22px' }}>☸</span>
          <div style={{ height:'1px', width:'50px', background:'linear-gradient(90deg,#b91c1c,transparent)' }} />
        </div>
        <p style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', letterSpacing:'0.4em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'14px' }}>Path to Awakening</p>
        <h1 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(28px,5vw,64px)', fontWeight:900, color:'#1a0808', lineHeight:1.05, marginBottom:'18px' }}>Buddhist Teachings<br/>&amp; Courses</h1>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(16px,2vw,22px)', fontStyle:'italic', fontWeight:300, color:'#a07070' }}>Explore our comprehensive range of courses and begin your spiritual journey</p>
      </motion.div>
    </section>

    <div style={SL as any}/>

    {/* Courses */}
    <section style={{ maxWidth:'1200px', margin:'0 auto', padding:'80px 24px' }}>
      <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:false }} style={{ marginBottom:'48px' }}>
        <p style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.4em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'10px' }}>Our Programs</p>
        <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(20px,2.5vw,34px)', fontWeight:700, color:'#1a0808' }}>Course Categories</h2>
      </motion.div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:'24px' }}>
        {courseCategories.map((cat,i)=>(
          <motion.div key={cat.id} initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:false }} transition={{ delay:i*0.1, duration:0.55 }}>
            <CategoryCard category={cat}/>
          </motion.div>
        ))}
      </div>
    </section>

    <div style={SL as any}/>

    {/* Info blocks */}
    <section style={{ background:'#fef9f4', padding:'80px 24px' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'24px' }}>
        {[
          { icon:'🏛️', title:'Class Capacity', items:['Teaching Center: 30–50 students','Online with Visuals: 6 students','Online without Visuals: Unlimited'] },
          { icon:'📚', title:'Course Materials', items:['Handouts of related subjects','Audio / Video tutorials','Certificate upon completion'] },
          { icon:'🙏', title:'Support-Based Model', items:['No mandatory course fees','Operate on Buddhist principles','Your support preserves Dharma','Benefiting present & future generations'] },
        ].map((block,i)=>(
          <motion.div key={block.title} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:false }} transition={{ delay:i*0.12 }} style={{ background:'#fff', border:'1px solid rgba(185,28,28,0.1)', borderRadius:'6px', padding:'28px', boxShadow:'0 2px 12px rgba(185,28,28,0.04)' }}>
            <div style={{ fontSize:'30px', marginBottom:'14px' }}>{block.icon}</div>
            <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', fontWeight:700, color:'#1a0808', marginBottom:'14px', letterSpacing:'0.05em' }}>{block.title}</h3>
            <div style={{ width:'36px', height:'1px', background:'linear-gradient(90deg,#b91c1c,transparent)', marginBottom:'14px' }} />
            {block.items.map(item=>(
              <div key={item} style={{ display:'flex', alignItems:'flex-start', gap:'8px', paddingBottom:'7px', borderBottom:'1px solid rgba(185,28,28,0.05)', marginBottom:'7px' }}>
                <span style={{ color:'#b91c1c', fontSize:'11px', marginTop:'3px', flexShrink:0 }}>✦</span>
                <span style={{ fontFamily:"'Crimson Text',serif", fontSize:'16px', color:'#6b3333', lineHeight:1.6 }}>{item}</span>
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  </div>
);

export default Teachings;