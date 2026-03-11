import { motion } from 'framer-motion';

const features = [
  { icon:'📖', title:'Buddhist Teachings', description:'Authentic Buddhist philosophy and practices from experienced masters — open to beginners and advanced practitioners alike.' },
  { icon:'🧘', title:'Meditation Courses', description:'Weekly and intensive meditation programs for inner peace, clarity, and spiritual growth — all offered free of cost.' },
  { icon:'🏔️', title:'Pilgrimage Tours', description:'Experience sacred Buddhist sites across Nepal, India, Sri Lanka and beyond with knowledgeable spiritual guides.' },
];

const SL = { height:'1px', background:'linear-gradient(90deg,transparent,rgba(185,28,28,0.2),rgba(217,119,6,0.15),rgba(185,28,28,0.2),transparent)' };

const FeaturesSection = () => (
  <section style={{ background:'#fdf8f3', padding:'80px 24px', position:'relative' }}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Crimson+Text:wght@400;600&display=swap');
      .feat-card { background:#fff; border:1px solid rgba(185,28,28,0.1); border-radius:6px; padding:36px 28px; text-align:center; transition:all 0.4s cubic-bezier(0.23,1,0.32,1); position:relative; overflow:hidden; box-shadow:0 2px 12px rgba(185,28,28,0.05); }
      .feat-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,#b91c1c,transparent); transform:scaleX(0); transition:transform 0.4s; }
      .feat-card:hover { border-color:rgba(185,28,28,0.3); transform:translateY(-6px); box-shadow:0 16px 40px rgba(185,28,28,0.12); }
      .feat-card:hover::before { transform:scaleX(1); }
    `}</style>
    <div style={SL as any} />
    <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
      <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:false }} transition={{ duration:0.6 }} style={{ textAlign:'center', marginBottom:'56px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'14px', marginBottom:'16px' }}>
          <div style={{ height:'1px', width:'50px', background:'linear-gradient(90deg,transparent,rgba(185,28,28,0.4))' }} />
          <span style={{ fontSize:'18px' }}>☸</span>
          <div style={{ height:'1px', width:'50px', background:'linear-gradient(90deg,rgba(185,28,28,0.4),transparent)' }} />
        </div>
        <p style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', letterSpacing:'0.4em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'12px' }}>What We Offer</p>
        <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(22px,3.5vw,38px)', fontWeight:700, color:'#1a0808' }}>Paths to Wisdom</h2>
      </motion.div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'24px' }}>
        {features.map((f,i)=>(
          <motion.div key={f.title} className="feat-card" initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:false }} transition={{ delay:i*0.15, duration:0.6 }}>
            <div style={{ fontSize:'40px', marginBottom:'18px' }}>{f.icon}</div>
            <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'15px', fontWeight:700, color:'#1a0808', marginBottom:'12px', letterSpacing:'0.05em' }}>{f.title}</h3>
            <div style={{ width:'40px', height:'1px', background:'linear-gradient(90deg,transparent,#b91c1c,transparent)', margin:'0 auto 14px' }} />
            <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'17px', color:'#6b3333', lineHeight:1.75 }}>{f.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;