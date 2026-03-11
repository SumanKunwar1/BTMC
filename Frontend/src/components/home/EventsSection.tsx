import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { events } from '../../data/events';

const catColors: Record<string,string> = { 'Retreat':'#16a34a', 'International Retreat':'#b91c1c', 'World Peace Prayers':'#7c3aed' };
const SL = { height:'1px', background:'linear-gradient(90deg,transparent,rgba(185,28,28,0.2),rgba(217,119,6,0.15),rgba(185,28,28,0.2),transparent)' };

const EventsSection = () => {
  const displayed = events.slice(0, 4);
  return (
    <section style={{ background:'#fdf8f3', padding:'100px 24px', position:'relative' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Text:wght@400;600&display=swap');
        .ev-card { background:#fff; border:1px solid rgba(185,28,28,0.1); border-radius:6px; overflow:hidden; transition:all 0.4s cubic-bezier(0.23,1,0.32,1); display:flex; flex-direction:column; box-shadow:0 2px 12px rgba(185,28,28,0.05); }
        .ev-card:hover { border-color:rgba(185,28,28,0.3); transform:translateY(-6px); box-shadow:0 16px 40px rgba(185,28,28,0.12); }
        .ev-card img { transition:transform 0.6s ease; }
        .ev-card:hover img { transform:scale(1.05); }
        .ev-more { display:inline-flex; align-items:center; gap:8px; font-family:'Cinzel',serif; font-size:9.5px; letter-spacing:0.2em; text-transform:uppercase; color:#b91c1c; text-decoration:none; padding-bottom:2px; border-bottom:1px solid rgba(185,28,28,0.25); transition:all 0.25s; }
        .ev-more:hover { color:#991b1b; border-bottom-color:#991b1b; gap:12px; }
        .ev-all { display:inline-flex; align-items:center; gap:10px; font-family:'Cinzel',serif; font-size:11px; letter-spacing:0.25em; text-transform:uppercase; color:#b91c1c; text-decoration:none; padding:13px 28px; border:1.5px solid rgba(185,28,28,0.35); border-radius:3px; transition:all 0.3s; }
        .ev-all:hover { background:rgba(185,28,28,0.06); border-color:#b91c1c; gap:14px; }
      `}</style>
      <div style={{ ...SL, position:'absolute', top:0, left:0, right:0 } as any} />
      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:false }} transition={{ duration:0.7 }} style={{ textAlign:'center', marginBottom:'60px' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'14px', marginBottom:'16px' }}>
            <div style={{ height:'1px', width:'50px', background:'linear-gradient(90deg,transparent,rgba(185,28,28,0.4))' }} />
            <span style={{ fontSize:'18px' }}>🔔</span>
            <div style={{ height:'1px', width:'50px', background:'linear-gradient(90deg,rgba(185,28,28,0.4),transparent)' }} />
          </div>
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', letterSpacing:'0.4em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'12px' }}>Sacred Gatherings</p>
          <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(22px,3.5vw,42px)', fontWeight:700, color:'#1a0808' }}>Upcoming Events &amp; Retreats</h2>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'24px', marginBottom:'56px' }}>
          {displayed.map((event,i)=>(
            <motion.div key={event.id} className="ev-card" initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:false }} transition={{ delay:i*0.1, duration:0.55 }}>
              <div style={{ overflow:'hidden', position:'relative', height:'180px' }}>
                <img src={event.image} alt={event.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
                <div style={{ position:'absolute', top:'10px', left:'10px', display:'flex', gap:'6px', flexWrap:'wrap' }}>
                  <span style={{ fontFamily:"'Cinzel',serif", fontSize:'8px', letterSpacing:'0.12em', background:catColors[event.category]||'#b91c1c', color:'#fff', padding:'3px 8px', borderRadius:'2px', textTransform:'uppercase' }}>{event.category}</span>
                  {event.isFree && <span style={{ fontFamily:"'Cinzel',serif", fontSize:'8px', letterSpacing:'0.12em', background:'#15803d', color:'#fff', padding:'3px 8px', borderRadius:'2px', textTransform:'uppercase' }}>Free</span>}
                </div>
              </div>
              <div style={{ padding:'18px', display:'flex', flexDirection:'column', gap:'10px', flex:1 }}>
                <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', fontWeight:700, color:'#1a0808', lineHeight:1.35 }}>{event.title}</h3>
                <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'15px', color:'#6b3333', lineHeight:1.6, flex:1 }}>{event.shortDescription.length>90?event.shortDescription.slice(0,90)+'…':event.shortDescription}</p>
                <div style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'7px' }}>
                    <Calendar size={11} color="#b91c1c" /><span style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.1em', color:'#a07070' }}>{event.date}</span>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'7px' }}>
                    <MapPin size={11} color="#b91c1c" /><span style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.1em', color:'#a07070' }}>{event.venue}</span>
                  </div>
                </div>
                <div style={{ height:'1px', background:'linear-gradient(90deg,transparent,rgba(185,28,28,0.15),transparent)' }} />
                <Link to={`/events/${event.id}`} className="ev-more">View Details <ArrowRight size={11} /></Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:false }} style={{ textAlign:'center' }}>
          <Link to="/events" className="ev-all">View All Events <ArrowRight size={13} /></Link>
        </motion.div>
      </div>
      <div style={{ ...SL, position:'absolute', bottom:0, left:0, right:0 } as any} />
    </section>
  );
};

export default EventsSection;