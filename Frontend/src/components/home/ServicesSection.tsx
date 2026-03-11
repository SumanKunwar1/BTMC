// ServicesSection.tsx — light theme
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const services = [
  { icon:'📖', title:'Buddhist Teachings & Meditation', description:'Comprehensive courses in Buddhist philosophy and meditation for monks, nuns, and lay practitioners.', link:'/teachings' },
  { icon:'🗺️', title:'Pilgrimage Tours', description:'Explore sacred sites in Nepal, India, Sri Lanka, and beyond — guided by experienced Buddhist masters.', link:'/events' },
  { icon:'🕯️', title:'Rituals & Ceremonies', description:'Buddhist ritual support for birth, marriage, healing, and funeral ceremonies with authentic tradition.', link:'/services' },
  { icon:'🤝', title:'Community Services', description:'Disaster relief distribution, social welfare programs, and spiritual counseling for all beings.', link:'/community' },
];

const SL = { height:'1px', background:'linear-gradient(90deg,transparent,rgba(185,28,28,0.2),rgba(217,119,6,0.15),rgba(185,28,28,0.2),transparent)' };

const ServicesSection = () => (
  <section style={{ background:'#fef9f4', padding:'100px 24px', position:'relative' }}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Crimson+Text:wght@400;600&display=swap');
      .svc-card { background:#fff; border:1px solid rgba(185,28,28,0.1); border-radius:6px; padding:32px 26px; transition:all 0.4s cubic-bezier(0.23,1,0.32,1); display:flex; flex-direction:column; gap:14px; position:relative; overflow:hidden; box-shadow:0 2px 12px rgba(185,28,28,0.04); }
      .svc-card::after { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,#b91c1c,transparent); transform:scaleX(0); transition:transform 0.4s; }
      .svc-card:hover { border-color:rgba(185,28,28,0.3); transform:translateY(-5px); box-shadow:0 16px 40px rgba(185,28,28,0.1); }
      .svc-card:hover::after { transform:scaleX(1); }
      .svc-lnk { display:inline-flex; align-items:center; gap:8px; font-family:'Cinzel',serif; font-size:9.5px; letter-spacing:0.2em; text-transform:uppercase; color:#b91c1c; text-decoration:none; padding-bottom:2px; border-bottom:1px solid rgba(185,28,28,0.2); transition:all 0.25s; margin-top:auto; }
      .svc-lnk:hover { color:#991b1b; gap:12px; border-bottom-color:#991b1b; }
    `}</style>
    <div style={{ ...SL, position:'absolute', top:0, left:0, right:0 } as any} />
    <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
      <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:false }} transition={{ duration:0.7 }} style={{ textAlign:'center', marginBottom:'60px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'14px', marginBottom:'16px' }}>
          <div style={{ height:'1px', width:'50px', background:'linear-gradient(90deg,transparent,rgba(185,28,28,0.4))' }} />
          <span style={{ fontSize:'18px' }}>☸</span>
          <div style={{ height:'1px', width:'50px', background:'linear-gradient(90deg,rgba(185,28,28,0.4),transparent)' }} />
        </div>
        <p style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', letterSpacing:'0.4em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'12px' }}>How We Serve</p>
        <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(22px,3.5vw,40px)', fontWeight:700, color:'#1a0808' }}>Our Services</h2>
      </motion.div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(250px,1fr))', gap:'22px' }}>
        {services.map((svc,i)=>(
          <motion.div key={svc.title} className="svc-card" initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:false }} transition={{ delay:i*0.12, duration:0.6 }}>
            <div style={{ fontSize:'34px' }}>{svc.icon}</div>
            <div style={{ width:'30px', height:'1px', background:'linear-gradient(90deg,#b91c1c,transparent)' }} />
            <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', fontWeight:700, color:'#1a0808', lineHeight:1.3, letterSpacing:'0.04em' }}>{svc.title}</h3>
            <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'16px', color:'#6b3333', lineHeight:1.75, flex:1 }}>{svc.description}</p>
            <Link to={svc.link} className="svc-lnk">Learn More →</Link>
          </motion.div>
        ))}
      </div>
    </div>
    <div style={{ ...SL, position:'absolute', bottom:0, left:0, right:0 } as any} />
  </section>
);

export default ServicesSection;