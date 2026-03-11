import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Event } from '../../types/event';

interface EventCardProps { event: Event; }

const catColors: Record<string,string> = { 'Retreat':'#16a34a','International Retreat':'#b91c1c','World Peace Prayers':'#7c3aed' };

const EventCard: React.FC<EventCardProps> = ({ event }) => (
  <div style={{ background:'#fff', border:'1px solid rgba(185,28,28,0.1)', borderRadius:'6px', overflow:'hidden', display:'flex', flexDirection:'column', boxShadow:'0 2px 12px rgba(185,28,28,0.05)', transition:'all 0.4s cubic-bezier(0.23,1,0.32,1)' }}
    onMouseEnter={e=>{ const d=e.currentTarget as HTMLDivElement; d.style.transform='translateY(-6px)'; d.style.borderColor='rgba(185,28,28,0.3)'; d.style.boxShadow='0 16px 40px rgba(185,28,28,0.12)'; }}
    onMouseLeave={e=>{ const d=e.currentTarget as HTMLDivElement; d.style.transform=''; d.style.borderColor='rgba(185,28,28,0.1)'; d.style.boxShadow='0 2px 12px rgba(185,28,28,0.05)'; }}
  >
    <Link to={`/events/${event.id}`} style={{ textDecoration:'none', display:'flex', flexDirection:'column', flex:1 }}>
      <div style={{ overflow:'hidden', position:'relative', height:'200px' }}>
        <img src={event.image} alt={event.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 0.6s ease' }}
          onMouseEnter={e=>(e.currentTarget as HTMLImageElement).style.transform='scale(1.05)'}
          onMouseLeave={e=>(e.currentTarget as HTMLImageElement).style.transform='scale(1)'}
        />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(26,8,8,0.5) 0%,transparent 55%)' }} />
        <div style={{ position:'absolute', top:'12px', left:'12px', display:'flex', gap:'6px', flexWrap:'wrap' }}>
          <span style={{ fontFamily:"'Cinzel',serif", fontSize:'8px', letterSpacing:'0.12em', background:catColors[event.category]||'#b91c1c', color:'#fff', padding:'3px 9px', borderRadius:'2px', textTransform:'uppercase' }}>{event.category}</span>
          {event.isFree && <span style={{ fontFamily:"'Cinzel',serif", fontSize:'8px', background:'#15803d', color:'#fff', padding:'3px 9px', borderRadius:'2px', textTransform:'uppercase' }}>Free</span>}
        </div>
      </div>
      <div style={{ padding:'18px', display:'flex', flexDirection:'column', gap:'10px', flex:1 }}>
        <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', fontWeight:700, color:'#1a0808', lineHeight:1.35 }}>{event.title}</h3>
        <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'15px', color:'#6b3333', lineHeight:1.65, flex:1 }}>{event.shortDescription?.slice(0,90)}…</p>
        <div style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'7px' }}><Calendar size={11} color="#b91c1c"/><span style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.1em', color:'#a07070' }}>{event.date}</span></div>
          <div style={{ display:'flex', alignItems:'center', gap:'7px' }}><MapPin size={11} color="#b91c1c"/><span style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.1em', color:'#a07070' }}>{event.venue}</span></div>
        </div>
        <div style={{ height:'1px', background:'linear-gradient(90deg,transparent,rgba(185,28,28,0.12),transparent)' }} />
        <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', fontFamily:"'Cinzel',serif", fontSize:'9.5px', letterSpacing:'0.2em', textTransform:'uppercase', color:'#b91c1c' }}>
          View Details <ArrowRight size={11}/>
        </div>
      </div>
    </Link>
  </div>
);

export default EventCard;