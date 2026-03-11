import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, CheckCircle, Calendar, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { tours } from '../data/tours';
import BookingForm from '../components/tours/BookingForm';
import TourCard from '../components/tours/TourCard';
import { BookingFormData } from '../types/tour';

const SL = { height:'1px',background:'linear-gradient(90deg,transparent,rgba(185,28,28,0.2),rgba(217,119,6,0.15),rgba(185,28,28,0.2),transparent)' };

const TourDetail = () => {
  const { id } = useParams<{ id:string }>();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [expandedDays, setExpandedDays] = useState<number[]>([]);
  const tour = tours.find(t=>t.id===id);
  const related = tours.filter(t=>t.id!==id).slice(0,3);

  if (!tour) return (
    <div style={{ background:'#fdf8f3', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ textAlign:'center' }}><p style={{ fontFamily:"'Cinzel',serif", fontSize:'22px', color:'#1a0808', marginBottom:'14px' }}>Tour Not Found</p><Link to="/tours" style={{ fontFamily:"'Cinzel',serif", fontSize:'11px', letterSpacing:'0.2em', color:'#b91c1c', textDecoration:'none' }}>← Back to Tours</Link></div>
    </div>
  );

  const handleBooking = (data: BookingFormData) => { setIsBookingOpen(false); setShowThankYou(true); setTimeout(()=>setShowThankYou(false),3500); };
  const toggleDay = (day:number) => setExpandedDays(prev=>prev.includes(day)?prev.filter(d=>d!==day):[...prev,day]);

  return (
    <div style={{ background:'#fdf8f3', minHeight:'100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700;900&family=Cormorant+Garamond:ital,wght@0,400;1,400&family=Crimson+Text:wght@400;600&display=swap');
        .it-item { background:#fff; border:1px solid rgba(185,28,28,0.1); border-radius:4px; overflow:hidden; transition:border-color 0.3s; box-shadow:0 1px 6px rgba(185,28,28,0.04); }
        .it-item:hover { border-color:rgba(185,28,28,0.25); }
        .it-btn { width:100%; background:none; border:none; cursor:pointer; padding:16px 18px; display:flex; align-items:center; justify-content:space-between; text-align:left; }
        .bk-btn { width:100%; padding:14px; background:linear-gradient(135deg,#991b1b,#b91c1c); color:#fff; border:none; border-radius:4px; font-family:'Cinzel',serif; font-size:11px; letter-spacing:0.25em; text-transform:uppercase; font-weight:700; cursor:pointer; box-shadow:0 6px 20px rgba(185,28,28,0.22); transition:all 0.3s; }
        .bk-btn:hover { background:linear-gradient(135deg,#7f1d1d,#991b1b); box-shadow:0 8px 28px rgba(185,28,28,0.38); transform:translateY(-1px); }
        .back-l { display:inline-flex; align-items:center; gap:8px; font-family:'Cinzel',serif; font-size:9px; letter-spacing:0.2em; color:#a07070; text-decoration:none; text-transform:uppercase; transition:color 0.2s; }
        .back-l:hover { color:#b91c1c; }
      `}</style>

      {/* Hero image */}
      <motion.div style={{ position:'relative', height:'60vh', minHeight:'400px', overflow:'hidden' }} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.8 }}>
        <img src={tour.image} alt={tour.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(253,248,243,0.88) 0%,rgba(185,28,28,0.2) 50%,rgba(253,248,243,0.75) 100%)' }} />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'200px', background:'linear-gradient(to bottom,transparent,#fdf8f3)' }} />
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'40px', maxWidth:'1200px', margin:'0 auto', left:0, right:0 }}>
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.4em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'10px' }}>Sacred Pilgrimage</p>
          <h1 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(24px,4vw,52px)', fontWeight:900, color:'#1a0808', lineHeight:1.1, marginBottom:'14px', textShadow:'0 1px 10px rgba(253,248,243,0.7)' }}>{tour.title}</h1>
          <div style={{ display:'flex', gap:'18px', flexWrap:'wrap' }}>
            {[{ icon:<Clock size={13} color="#b91c1c"/>, text:`${tour.days} Days` },{ icon:<MapPin size={13} color="#b91c1c"/>, text:'Multiple Locations' }].map((item,i)=>(
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'7px' }}>{item.icon}<span style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', letterSpacing:'0.15em', color:'#6b3333' }}>{item.text}</span></div>
            ))}
          </div>
        </div>
      </motion.div>

      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'20px 24px 0' }}>
        <Link to="/tours" className="back-l"><ArrowLeft size={12}/> Back to Tours</Link>
      </div>

      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'36px 24px 80px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:'48px', alignItems:'start' }}>
          {/* Left */}
          <div style={{ display:'flex', flexDirection:'column', gap:'44px' }}>
            <section>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.35em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'8px' }}>Overview</p>
              <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(18px,2.2vw,28px)', fontWeight:700, color:'#1a0808', marginBottom:'16px' }}>Tour Overview</h2>
              <div style={{ width:'50px', height:'2px', background:'linear-gradient(90deg,#b91c1c,transparent)', marginBottom:'16px' }} />
              <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'18px', color:'#5a3030', lineHeight:1.85 }}>{tour.description}</p>
            </section>

            <section>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.35em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'8px' }}>Highlights</p>
              <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(16px,2vw,24px)', fontWeight:700, color:'#1a0808', marginBottom:'16px' }}>Tour Highlights</h2>
              <div style={{ width:'50px', height:'2px', background:'linear-gradient(90deg,#b91c1c,transparent)', marginBottom:'20px' }} />
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:'10px' }}>
                {tour.highlights.map((h:string,i:number)=>(
                  <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'10px' }}><CheckCircle size={15} color="#b91c1c" style={{ marginTop:'3px', flexShrink:0 }}/><span style={{ fontFamily:"'Crimson Text',serif", fontSize:'17px', color:'#6b3333', lineHeight:1.6 }}>{h}</span></div>
                ))}
              </div>
            </section>

            <section>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.35em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'8px' }}>Day by Day</p>
              <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(16px,2vw,24px)', fontWeight:700, color:'#1a0808', marginBottom:'20px' }}>Itinerary</h2>
              <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                {tour.itinerary.map((item:any)=>(
                  <div key={item.day} className="it-item">
                    <button className="it-btn" onClick={()=>toggleDay(item.day)}>
                      <div style={{ display:'flex', alignItems:'flex-start', gap:'12px' }}>
                        <div style={{ width:'34px', height:'34px', borderRadius:'50%', background:'rgba(185,28,28,0.07)', border:'1px solid rgba(185,28,28,0.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><Calendar size={13} color="#b91c1c"/></div>
                        <div style={{ textAlign:'left' }}>
                          <div style={{ fontFamily:"'Cinzel',serif", fontSize:'11px', letterSpacing:'0.12em', color:'#1a0808', fontWeight:600 }}>Day {item.day}</div>
                          {!expandedDays.includes(item.day)&&<div style={{ fontFamily:"'Crimson Text',serif", fontSize:'14px', color:'#a07070', marginTop:'2px', maxWidth:'380px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.description.substring(0,80)}…</div>}
                        </div>
                      </div>
                      {expandedDays.includes(item.day)?<ChevronUp size={15} color="#a07070"/>:<ChevronDown size={15} color="#a07070"/>}
                    </button>
                    <AnimatePresence>
                      {expandedDays.includes(item.day)&&(
                        <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }} transition={{ duration:0.3 }} style={{ padding:'0 18px 16px 64px' }}>
                          <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'17px', color:'#6b3333', lineHeight:1.8 }}>{item.description}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.5 }} style={{ position:'sticky', top:'100px' }}>
            <div style={{ background:'#fff', border:'1px solid rgba(185,28,28,0.15)', borderRadius:'6px', overflow:'hidden', boxShadow:'0 8px 30px rgba(185,28,28,0.08)' }}>
              <div style={{ padding:'18px 20px', background:'rgba(185,28,28,0.04)', borderBottom:'1px solid rgba(185,28,28,0.08)' }}>
                <p style={{ fontFamily:"'Cinzel',serif", fontSize:'8.5px', letterSpacing:'0.3em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'5px' }}>Ready to Join?</p>
                <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'16px', fontWeight:700, color:'#1a0808' }}>Book This Tour</h3>
              </div>
              <div style={{ padding:'18px 20px', display:'flex', flexDirection:'column', gap:'16px' }}>
                <p style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.22em', color:'#a07070', textTransform:'uppercase', marginBottom:'6px' }}>What's Included</p>
                {tour.inclusions.map((item:string,i:number)=>(
                  <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'8px' }}><CheckCircle size={13} color="#16a34a" style={{ marginTop:'3px', flexShrink:0 }}/><span style={{ fontFamily:"'Crimson Text',serif", fontSize:'15px', color:'#6b3333', lineHeight:1.5 }}>{item}</span></div>
                ))}
                <div style={{ height:'1px', background:'linear-gradient(90deg,transparent,rgba(185,28,28,0.15),transparent)' }} />
                <button className="bk-btn" onClick={()=>setIsBookingOpen(true)}>Book Now →</button>
                <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'13px', color:'#a07070', textAlign:'center', fontStyle:'italic' }}>We'll contact you within 24 hours</p>
              </div>
            </div>
          </motion.div>
        </div>

        {related.length>0&&(
          <motion.section style={{ marginTop:'80px' }} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.7 }}>
            <div style={SL as any}/><br/>
            <p style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.4em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'10px' }}>More Journeys</p>
            <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(18px,2.5vw,30px)', fontWeight:700, color:'#1a0808', marginBottom:'28px' }}>Related Tours</h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'22px' }}>
              {related.map(t=><TourCard key={t.id} tour={t}/>)}
            </div>
          </motion.section>
        )}
      </div>

      <BookingForm isOpen={isBookingOpen} onClose={()=>setIsBookingOpen(false)} onSubmit={handleBooking} tourTitle={tour.title}/>
      <AnimatePresence>
        {showThankYou&&(
          <motion.div initial={{ opacity:0, y:50 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:50 }} style={{ position:'fixed', bottom:'28px', right:'28px', zIndex:100, background:'linear-gradient(135deg,#14532d,#16a34a)', border:'1px solid rgba(22,163,74,0.4)', borderRadius:'4px', padding:'14px 22px', fontFamily:"'Cinzel',serif", fontSize:'11px', letterSpacing:'0.12em', color:'#fff', boxShadow:'0 8px 28px rgba(22,163,74,0.3)' }}>
            ✓ Booking received — we'll contact you soon!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TourDetail;