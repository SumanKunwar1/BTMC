import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, CheckCircle, ArrowLeft, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { events } from '../data/events';
import { CourseOption } from '../types/event';
import EventRegistrationForm from '../components/events/EventRegistrationForm';
import EventCard from '../components/events/EventCard';

const SL = { height:'1px', background:'linear-gradient(90deg,transparent,rgba(185,28,28,0.2),rgba(217,119,6,0.15),rgba(185,28,28,0.2),transparent)' };

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isRegOpen, setIsRegOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const event = events.find(e => e.id === id);
  const related = events.filter(e => e.id !== id).slice(0, 3);

  if (!event) return (
    <div style={{ background:'#fdf8f3', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ textAlign:'center' }}>
        <p style={{ fontFamily:"'Cinzel',serif", fontSize:'22px', color:'#1a0808', marginBottom:'14px' }}>Event Not Found</p>
        <Link to="/events" style={{ fontFamily:"'Cinzel',serif", fontSize:'11px', letterSpacing:'0.2em', color:'#b91c1c', textDecoration:'none' }}>← Back to Events</Link>
      </div>
    </div>
  );

  const handleReg = () => {
    setIsRegOpen(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  return (
    <div style={{ background:'#fdf8f3', minHeight:'100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700;900&family=Cormorant+Garamond:ital,wght@0,400;1,400&family=Crimson+Text:wght@400;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .back-lnk { display:inline-flex; align-items:center; gap:8px; font-family:'Cinzel',serif; font-size:9px; letter-spacing:0.2em; text-transform:uppercase; color:#a07070; text-decoration:none; transition:color 0.2s; }
        .back-lnk:hover { color:#b91c1c; }
        .reg-btn { width:100%; padding:14px; background:linear-gradient(135deg,#991b1b,#b91c1c); color:#fff; border:none; border-radius:4px; font-family:'Cinzel',serif; font-size:11px; letter-spacing:0.25em; text-transform:uppercase; font-weight:700; cursor:pointer; box-shadow:0 6px 20px rgba(185,28,28,0.25); transition:all 0.3s; }
        .reg-btn:hover { background:linear-gradient(135deg,#7f1d1d,#991b1b); box-shadow:0 8px 28px rgba(185,28,28,0.4); transform:translateY(-1px); }
        .course-card { border:1px solid rgba(185,28,28,0.12); border-radius:6px; overflow:hidden; background:#fff; transition:all 0.3s ease; box-shadow:0 2px 8px rgba(185,28,28,0.04); }
        .course-card:hover { border-color:rgba(185,28,28,0.3); box-shadow:0 6px 20px rgba(185,28,28,0.1); }
        .course-header { display:flex; align-items:center; justify-content:space-between; padding:16px 20px; cursor:pointer; background:#fff; transition:background 0.2s; -webkit-tap-highlight-color:transparent; }
        .course-header:hover { background:rgba(185,28,28,0.02); }
        .day-pill { display:inline-block; font-family:'Cinzel',serif; font-size:8px; letter-spacing:0.2em; text-transform:uppercase; padding:3px 10px; border-radius:2px; background:rgba(185,28,28,0.08); color:#b91c1c; margin-bottom:8px; }

        /* Desktop two-column layout */
        .content-grid { display:grid; grid-template-columns:1fr 300px; gap:48px; align-items:start; }

        /* Course day grid: 2-col desktop */
        .day-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }

        /* Related events grid */
        .related-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:22px; }

        /* Sticky register bar hidden on desktop */
        .sticky-reg { display:none; }

        /* ── MOBILE ── */
        @media (max-width: 767px) {
          /* Single column */
          .content-grid { grid-template-columns:1fr; gap:24px; }

          /* Sidebar floats to top on mobile */
          .sidebar-col { order:-1; }

          /* No sticky on mobile */
          .sidebar-inner { position:static !important; }

          /* Day columns stack vertically */
          .day-grid { grid-template-columns:1fr; gap:14px; }

          /* Related: single col */
          .related-grid { grid-template-columns:1fr; }

          /* Show sticky reg bar */
          .sticky-reg {
            display:block;
            position:fixed; bottom:0; left:0; right:0; z-index:40;
            background:rgba(253,248,243,0.97);
            backdrop-filter:blur(10px);
            -webkit-backdrop-filter:blur(10px);
            border-top:1px solid rgba(185,28,28,0.12);
            padding:10px 16px 14px;
            box-shadow:0 -4px 20px rgba(185,28,28,0.08);
          }

          /* Add bottom padding so content isn't hidden behind sticky bar */
          .page-pad { padding-bottom:76px !important; }

          /* Hero shorter on mobile */
          .hero-wrap { height:52vw !important; min-height:220px !important; }
          .hero-inner { padding:16px !important; }

          /* Sidebar reg button hidden — sticky bar handles it */
          .sidebar-reg-wrap { display:none; }

          /* Tighten padding */
          .back-pad { padding:12px 16px 0 !important; }
          .main-pad { padding:20px 16px 40px !important; }
        }

        @media (min-width:768px) and (max-width:1023px) {
          .content-grid { grid-template-columns:1fr 260px; gap:32px; }
        }
      `}</style>

      {/* Hero */}
      <motion.div
        className="hero-wrap"
        style={{ position:'relative', height:'55vh', minHeight:'360px', overflow:'hidden' }}
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.8 }}
      >
        <img src={event.image} alt={event.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(253,248,243,0.9) 0%,rgba(185,28,28,0.25) 50%,rgba(253,248,243,0.8) 100%)' }} />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'180px', background:'linear-gradient(to bottom,transparent,#fdf8f3)' }} />
        <div
          className="hero-inner"
          style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'36px', maxWidth:'1200px', margin:'0 auto', left:0, right:0 }}
        >
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.4em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'10px' }}>Sacred Event</p>
          <h1 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(18px,4vw,50px)', fontWeight:900, color:'#1a0808', lineHeight:1.1, marginBottom:'14px', textShadow:'0 1px 8px rgba(253,248,243,0.8)' }}>{event.title}</h1>
          <div style={{ display:'flex', gap:'14px', flexWrap:'wrap' }}>
            {[
              { icon:<Calendar size={12} color="#b91c1c"/>, text:event.date },
              { icon:<MapPin size={12} color="#b91c1c"/>, text:event.venue },
              { icon:<Clock size={12} color="#b91c1c"/>, text:event.time || 'See details' },
            ].map((item, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                {item.icon}
                <span style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', letterSpacing:'0.12em', color:'#6b3333' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="back-pad" style={{ maxWidth:'1200px', margin:'0 auto', padding:'18px 24px 0' }}>
        <Link to="/events" className="back-lnk"><ArrowLeft size={12}/> Back to Events</Link>
      </div>

      {/* Content */}
      <div className="main-pad page-pad" style={{ maxWidth:'1200px', margin:'0 auto', padding:'36px 24px 80px' }}>
        <div className="content-grid">

          {/* ── Left column ── */}
          <div style={{ display:'flex', flexDirection:'column', gap:'44px' }}>

            {/* About */}
            <motion.section initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.35em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'8px' }}>About This Event</p>
              <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(18px,2.2vw,28px)', fontWeight:700, color:'#1a0808', marginBottom:'16px' }}>Event Overview</h2>
              <div style={{ width:'50px', height:'2px', background:'linear-gradient(90deg,#b91c1c,transparent)', marginBottom:'16px' }} />
              <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'18px', color:'#5a3030', lineHeight:1.85 }}>
                {event.fullDescription}
              </p>
            </motion.section>

            {/* Highlights — VERTICAL list */}
            {event.highlights && event.highlights.length > 0 && (
              <motion.section initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }}>
                <p style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.35em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'8px' }}>Highlights</p>
                <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(16px,2vw,24px)', fontWeight:700, color:'#1a0808', marginBottom:'16px' }}>Event Highlights</h2>
                <div style={{ width:'50px', height:'2px', background:'linear-gradient(90deg,#b91c1c,transparent)', marginBottom:'20px' }} />
                <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                  {event.highlights.map((h: string, i: number) => (
                    <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'12px', padding:'12px 16px', background:'#fff', border:'1px solid rgba(185,28,28,0.08)', borderRadius:'4px', boxShadow:'0 1px 4px rgba(185,28,28,0.04)' }}>
                      <CheckCircle size={15} color="#b91c1c" style={{ marginTop:'2px', flexShrink:0 }} />
                      <span style={{ fontFamily:"'Crimson Text',serif", fontSize:'17px', color:'#5a3030', lineHeight:1.5 }}>{h}</span>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Courses & Schedule — expandable cards */}
            {event.courses && event.courses.length > 0 && (
              <motion.section initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }}>
                <p style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.35em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'8px' }}>Program</p>
                <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(16px,2vw,24px)', fontWeight:700, color:'#1a0808', marginBottom:'16px' }}>Courses &amp; Schedule</h2>
                <div style={{ width:'50px', height:'2px', background:'linear-gradient(90deg,#b91c1c,transparent)', marginBottom:'20px' }} />
                <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                  {event.courses.map((c: CourseOption) => {
                    const isOpen = expandedCourse === c.id;
                    return (
                      <div key={c.id} className="course-card">
                        <div className="course-header" onClick={() => setExpandedCourse(isOpen ? null : c.id)}>
                          <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
                            <div style={{ width:'42px', height:'42px', borderRadius:'50%', background:'rgba(185,28,28,0.07)', border:'1px solid rgba(185,28,28,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', flexShrink:0 }}>
                              {c.icon}
                            </div>
                            <div>
                              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'11px', fontWeight:700, color:'#1a0808', marginBottom:'3px' }}>{c.title}</p>
                              <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'15px', color:'#a07070' }}>{c.subtitle}</p>
                            </div>
                          </div>
                          <div style={{ color:'#b91c1c', flexShrink:0 }}>
                            {isOpen ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                          </div>
                        </div>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height:0, opacity:0 }}
                              animate={{ height:'auto', opacity:1 }}
                              exit={{ height:0, opacity:0 }}
                              transition={{ duration:0.3 }}
                              style={{ overflow:'hidden' }}
                            >
                              {/* day-grid: 2-col desktop → 1-col mobile */}
                              <div className="day-grid" style={{ padding:'0 20px 20px', borderTop:'1px solid rgba(185,28,28,0.08)', marginTop:'16px' }}>
                                <div>
                                  <span className="day-pill">{c.day1Title}</span>
                                  <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'6px' }}>
                                    {c.day1Items.map((item: string, idx: number) => (
                                      <li key={idx} style={{ display:'flex', gap:'8px', alignItems:'flex-start' }}>
                                        <span style={{ color:'#b91c1c', fontSize:'12px', marginTop:'3px', flexShrink:0 }}>•</span>
                                        <span style={{ fontFamily:"'Crimson Text',serif", fontSize:'15px', color:'#5a3030', lineHeight:1.55 }}>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <span className="day-pill">{c.day2Title}</span>
                                  <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'6px' }}>
                                    {c.day2Items.map((item: string, idx: number) => (
                                      <li key={idx} style={{ display:'flex', gap:'8px', alignItems:'flex-start' }}>
                                        <span style={{ color:'#b91c1c', fontSize:'12px', marginTop:'3px', flexShrink:0 }}>•</span>
                                        <span style={{ fontFamily:"'Crimson Text',serif", fontSize:'15px', color:'#5a3030', lineHeight:1.55 }}>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              {c.benefits && c.benefits.length > 0 && (
                                <div style={{ padding:'14px 20px', background:'rgba(185,28,28,0.03)', borderTop:'1px solid rgba(185,28,28,0.07)', display:'flex', flexWrap:'wrap', gap:'8px' }}>
                                  {c.benefits.map((b: string, idx: number) => (
                                    <span key={idx} style={{ fontFamily:"'Cinzel',serif", fontSize:'8px', letterSpacing:'0.15em', textTransform:'uppercase', padding:'4px 10px', borderRadius:'2px', background:'rgba(185,28,28,0.07)', color:'#b91c1c', border:'1px solid rgba(185,28,28,0.12)' }}>{b}</span>
                                  ))}
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.section>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="sidebar-col">
            <motion.div
              className="sidebar-inner"
              initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.5 }}
              style={{ position:'sticky', top:'100px' }}
            >
              <div style={{ background:'#fff', border:'1px solid rgba(185,28,28,0.15)', borderRadius:'6px', overflow:'hidden', boxShadow:'0 8px 30px rgba(185,28,28,0.08)' }}>
                <div style={{ padding:'18px 20px', background:'rgba(185,28,28,0.04)', borderBottom:'1px solid rgba(185,28,28,0.1)' }}>
                  <p style={{ fontFamily:"'Cinzel',serif", fontSize:'8.5px', letterSpacing:'0.3em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'5px' }}>Sacred Gathering</p>
                  <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'16px', fontWeight:700, color:'#1a0808' }}>Event Details</h3>
                </div>
                <div style={{ padding:'18px 20px', display:'flex', flexDirection:'column', gap:'14px' }}>
                  {[
                    { icon:<Calendar size={13} color="#b91c1c"/>, label:'Date', value:event.date },
                    { icon:<MapPin size={13} color="#b91c1c"/>, label:'Venue', value:event.venue },
                    { icon:<Clock size={13} color="#b91c1c"/>, label:'Time', value:event.time || 'TBA' },
                    { icon:<Users size={13} color="#b91c1c"/>, label:'Open To', value:'All practitioners' },
                  ].map(row => (
                    <div key={row.label} style={{ display:'flex', alignItems:'flex-start', gap:'10px', paddingBottom:'10px', borderBottom:'1px solid rgba(185,28,28,0.06)' }}>
                      <div style={{ width:'30px', height:'30px', borderRadius:'50%', background:'rgba(185,28,28,0.06)', border:'1px solid rgba(185,28,28,0.15)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{row.icon}</div>
                      <div>
                        <p style={{ fontFamily:"'Cinzel',serif", fontSize:'8px', letterSpacing:'0.18em', color:'#a07070', textTransform:'uppercase', marginBottom:'3px' }}>{row.label}</p>
                        <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'16px', color:'#5a3030', lineHeight:1.5 }}>{row.value}</p>
                      </div>
                    </div>
                  ))}
                  {event.isFree && (
                    <div style={{ display:'flex', alignItems:'center', gap:'8px', padding:'10px 14px', background:'rgba(22,163,74,0.06)', border:'1px solid rgba(22,163,74,0.2)', borderRadius:'3px' }}>
                      <CheckCircle size={14} color="#16a34a"/>
                      <span style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', letterSpacing:'0.15em', color:'#16a34a', textTransform:'uppercase' }}>Free to Attend</span>
                    </div>
                  )}
                  {/* Hidden on mobile via CSS — sticky bar handles register */}
                  <div className="sidebar-reg-wrap">
                    <button className="reg-btn" onClick={() => setIsRegOpen(true)}>Register Now →</button>
                    <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'13px', color:'#a07070', textAlign:'center', fontStyle:'italic', marginTop:'8px' }}>We'll confirm your registration</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Related Events */}
        {related.length > 0 && (
          <motion.section style={{ marginTop:'80px' }} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.7 }}>
            <div style={SL as any} /><br/>
            <p style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.4em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'10px' }}>More Events</p>
            <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(18px,2.5vw,30px)', fontWeight:700, color:'#1a0808', marginBottom:'28px' }}>Related Events</h2>
            <div className="related-grid">
              {related.map(e => <EventCard key={e.id} event={e}/>)}
            </div>
          </motion.section>
        )}
      </div>

      {/* ── Sticky Register Bar — mobile only ── */}
      <div className="sticky-reg">
        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <div style={{ flex:1, minWidth:0 }}>
            {event.isFree && (
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'8px', letterSpacing:'0.15em', color:'#16a34a', textTransform:'uppercase', marginBottom:'2px' }}>Free to Attend</p>
            )}
            <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'13px', color:'#5a3030', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
              {event.date} · {event.venue}
            </p>
          </div>
          <button
            className="reg-btn"
            style={{ width:'auto', padding:'12px 22px', whiteSpace:'nowrap', flexShrink:0 }}
            onClick={() => setIsRegOpen(true)}
          >
            Register →
          </button>
        </div>
      </div>

      {/* Registration Form — unchanged */}
      <EventRegistrationForm
        isOpen={isRegOpen}
        onClose={() => setIsRegOpen(false)}
        onSubmit={handleReg}
        eventTitle={event.title}
        eventDate={event.date}
        eventVenue={event.venue}
      />

      {/* Success toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity:0, y:50 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:50 }}
            style={{ position:'fixed', bottom:'80px', right:'16px', left:'16px', zIndex:100, background:'linear-gradient(135deg,#14532d,#16a34a)', border:'1px solid rgba(22,163,74,0.4)', borderRadius:'4px', padding:'14px 22px', fontFamily:"'Cinzel',serif", fontSize:'11px', letterSpacing:'0.12em', color:'#fff', boxShadow:'0 8px 28px rgba(22,163,74,0.3)', textAlign:'center' }}
          >
            ✓ Registered successfully — see you there!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventDetail;