import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import { Tour } from '../../types/tour';

interface TourCardProps { tour: Tour; }

const TourCard: React.FC<TourCardProps> = ({ tour }) => (
  <div style={{ background:'#fff', border:'1px solid rgba(185,28,28,0.1)', borderRadius:'6px', overflow:'hidden', boxShadow:'0 2px 12px rgba(185,28,28,0.05)', transition:'all 0.4s cubic-bezier(0.23,1,0.32,1)' }}
    onMouseEnter={e=>{ const d=e.currentTarget as HTMLDivElement; d.style.transform='translateY(-6px)'; d.style.borderColor='rgba(185,28,28,0.3)'; d.style.boxShadow='0 16px 40px rgba(185,28,28,0.12)'; }}
    onMouseLeave={e=>{ const d=e.currentTarget as HTMLDivElement; d.style.transform=''; d.style.borderColor='rgba(185,28,28,0.1)'; d.style.boxShadow='0 2px 12px rgba(185,28,28,0.05)'; }}
  >
    <Link to={`/tours/${tour.id}`} style={{ textDecoration:'none', display:'block' }}>
      <div style={{ position:'relative', height:'220px', overflow:'hidden' }}>
        <img src={tour.image} alt={tour.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 0.6s ease' }}
          onMouseEnter={e=>(e.currentTarget as HTMLImageElement).style.transform='scale(1.06)'}
          onMouseLeave={e=>(e.currentTarget as HTMLImageElement).style.transform='scale(1)'}
        />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(26,8,8,0.6) 0%,transparent 55%)' }} />
        <div style={{ position:'absolute', top:'12px', right:'12px', background:'linear-gradient(135deg,#991b1b,#b91c1c)', padding:'4px 12px', borderRadius:'2px', fontFamily:"'Cinzel',serif", fontSize:'8.5px', letterSpacing:'0.15em', color:'#fff', textTransform:'uppercase', boxShadow:'0 3px 10px rgba(185,28,28,0.3)' }}>
          {tour.days} Days
        </div>
        <div style={{ position:'absolute', bottom:'12px', left:'12px', display:'flex', alignItems:'center', gap:'14px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'5px' }}><MapPin size={11} color="rgba(255,255,255,0.8)"/><span style={{ fontFamily:"'Cinzel',serif", fontSize:'8px', letterSpacing:'0.1em', color:'rgba(255,255,255,0.75)' }}>Multiple Sites</span></div>
          <div style={{ display:'flex', alignItems:'center', gap:'5px' }}><Clock size={11} color="rgba(255,255,255,0.8)"/><span style={{ fontFamily:"'Cinzel',serif", fontSize:'8px', letterSpacing:'0.1em', color:'rgba(255,255,255,0.75)' }}>{tour.days} Days</span></div>
        </div>
      </div>
      <div style={{ padding:'22px 20px', display:'flex', flexDirection:'column', gap:'10px' }}>
        <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'14px', fontWeight:700, color:'#1a0808', lineHeight:1.3, letterSpacing:'0.03em' }}>{tour.title}</h3>
        <div style={{ width:'36px', height:'1px', background:'linear-gradient(90deg,#b91c1c,transparent)' }} />
        <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'16px', color:'#6b3333', lineHeight:1.7, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' as const, overflow:'hidden' }}>{tour.description}</p>
        <div style={{ display:'flex', alignItems:'center', gap:'7px', fontFamily:"'Cinzel',serif", fontSize:'9.5px', letterSpacing:'0.2em', color:'#b91c1c', textTransform:'uppercase', marginTop:'4px' }}>
          View Details <ArrowRight size={12}/>
        </div>
      </div>
    </Link>
  </div>
);

export default TourCard;