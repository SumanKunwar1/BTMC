import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { events } from '../data/events';

const catColors: Record<string,string> = { 'Retreat':'#16a34a','International Retreat':'#b91c1c','World Peace Prayers':'#7c3aed' };
const SL = { height:'1px',background:'linear-gradient(90deg,transparent,rgba(185,28,28,0.2),rgba(217,119,6,0.15),rgba(185,28,28,0.2),transparent)' };

const Events = () => {
  const [search, setSearch] = useState('');
  const filtered = events.filter(e => e.title.toLowerCase().includes(search.toLowerCase()) || e.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ background:'#fdf8f3', minHeight:'100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700;900&family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Crimson+Text:wght@400;600&display=swap');
        .ev-card { background:#fff; border:1px solid rgba(185,28,28,0.1); border-radius:6px; overflow:hidden; display:flex; flex-direction:column; box-shadow:0 2px 12px rgba(185,28,28,0.04); transition:all 0.4s cubic-bezier(0.23,1,0.32,1); }
        .ev-card:hover { border-color:rgba(185,28,28,0.3); transform:translateY(-6px); box-shadow:0 16px 40px rgba(185,28,28,0.12); }
        .ev-card:hover img { transform:scale(1.05); }
        .ev-lnk { display:inline-flex; align-items:center; gap:8px; font-family:'Cinzel',serif; font-size:9.5px; letter-spacing:0.2em; text-transform:uppercase; color:#b91c1c; text-decoration:none; border-bottom:1px solid rgba(185,28,28,0.25); padding-bottom:2px; transition:all 0.25s; }
        .ev-lnk:hover { color:#991b1b; gap:12px; }
        .ev-search { width:100%; padding:12px 16px 12px 46px; background:#fff; border:1px solid rgba(185,28,28,0.2); border-radius:4px; font-family:'Crimson Text',serif; font-size:17px; color:#1a0808; outline:none; box-sizing:border-box; transition:border-color 0.2s; }
        .ev-search:focus { border-color:#b91c1c; box-shadow:0 0 0 3px rgba(185,28,28,0.08); }
        .ev-search::placeholder { color:rgba(26,8,8,0.28); }
      `}</style>

      {/* Hero */}
      <section style={{ position:'relative', padding:'90px 24px 80px', background:'linear-gradient(180deg,rgba(185,28,28,0.07) 0%,rgba(253,248,243,1) 100%)', textAlign:'center', overflow:'hidden' }}>
        {[200,340,480].map(s=><div key={s} style={{ position:'absolute', borderRadius:'50%', border:'1px solid rgba(185,28,28,0.07)', width:s, height:s, top:'50%', left:'50%', transform:'translate(-50%,-50%)', pointerEvents:'none' }} />)}
        <motion.div initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }} style={{ position:'relative', zIndex:2 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'14px', marginBottom:'18px' }}>
            <div style={{ height:'1px', width:'50px', background:'linear-gradient(90deg,transparent,#b91c1c)' }} />
            <span style={{ fontSize:'22px' }}>🔔</span>
            <div style={{ height:'1px', width:'50px', background:'linear-gradient(90deg,#b91c1c,transparent)' }} />
          </div>
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', letterSpacing:'0.4em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'14px' }}>Sacred Gatherings</p>
          <h1 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(30px,5.5vw,66px)', fontWeight:900, color:'#1a0808', lineHeight:1.05, marginBottom:'18px' }}>Events &amp; Retreats</h1>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(16px,2vw,22px)', fontStyle:'italic', fontWeight:300, color:'#a07070' }}>Join us for transformative retreats, prayers &amp; pilgrimage programs</p>
        </motion.div>
      </section>

      <div style={SL as any} />

      <div style={{ maxWidth:'600px', margin:'40px auto 0', padding:'0 24px', position:'relative' }}>
        <Search size={17} color="rgba(185,28,28,0.4)" style={{ position:'absolute', left:'40px', top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }} />
        <input type="text" placeholder="Search events or categories…" value={search} onChange={e=>setSearch(e.target.value)} className="ev-search" />
      </div>

      <section style={{ maxWidth:'1200px', margin:'0 auto', padding:'60px 24px 100px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:'80px', color:'#a07070', fontFamily:"'Crimson Text',serif", fontSize:'20px', fontStyle:'italic' }}>No events match your search.</div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:'24px' }}>
            {filtered.map((event,i)=>(
              <motion.div key={event.id} className="ev-card" initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:false }} transition={{ delay:i*0.08, duration:0.55 }}>
                <div style={{ overflow:'hidden', position:'relative', height:'210px' }}>
                  <img src={event.image} alt={event.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 0.6s ease' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(26,8,8,0.5) 0%,transparent 55%)' }} />
                  <div style={{ position:'absolute', top:'12px', left:'12px', display:'flex', gap:'6px', flexWrap:'wrap' }}>
                    <span style={{ fontFamily:"'Cinzel',serif", fontSize:'8px', letterSpacing:'0.12em', background:catColors[event.category]||'#b91c1c', color:'#fff', padding:'3px 9px', borderRadius:'2px', textTransform:'uppercase' }}>{event.category}</span>
                    {event.isFree && <span style={{ fontFamily:"'Cinzel',serif", fontSize:'8px', letterSpacing:'0.12em', background:'#15803d', color:'#fff', padding:'3px 9px', borderRadius:'2px', textTransform:'uppercase' }}>Free</span>}
                  </div>
                </div>
                <div style={{ padding:'20px', display:'flex', flexDirection:'column', gap:'10px', flex:1 }}>
                  <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', fontWeight:700, color:'#1a0808', lineHeight:1.35 }}>{event.title}</h3>
                  <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'15px', color:'#6b3333', lineHeight:1.65, flex:1 }}>{event.shortDescription?.slice(0,100)}…</p>
                  <div style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'7px' }}><Calendar size={11} color="#b91c1c"/><span style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.1em', color:'#a07070' }}>{event.date}</span></div>
                    <div style={{ display:'flex', alignItems:'center', gap:'7px' }}><MapPin size={11} color="#b91c1c"/><span style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.1em', color:'#a07070' }}>{event.venue}</span></div>
                  </div>
                  <div style={{ height:'1px', background:'linear-gradient(90deg,transparent,rgba(185,28,28,0.12),transparent)' }} />
                  <Link to={`/events/${event.id}`} className="ev-lnk">View Details <ArrowRight size={11}/></Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Events;