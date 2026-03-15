import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Book, GraduationCap, Calendar, Globe, CheckCircle, ArrowLeft } from 'lucide-react';
import { courseCategories } from '../data/courses';
import EnrollmentForm from '../components/teachings/EnrollmentForm';
import RecommendedCourses from '../components/teachings/RecommendedCourses';
import { EnrollmentFormData } from '../types/course';

const SL = { height:'1px', background:'linear-gradient(90deg,transparent,rgba(185,28,28,0.2),rgba(217,119,6,0.15),rgba(185,28,28,0.2),transparent)' };

const CourseDetail = () => {
  const { categoryId, courseId } = useParams<{ categoryId: string; courseId: string }>();
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const category = courseCategories.find((cat) => cat.id === categoryId);
  const course = category?.courses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div style={{ background:'#fdf8f3', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ textAlign:'center', padding:'24px' }}>
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:'20px', color:'#1a0808', marginBottom:'14px' }}>Course Not Found</p>
          <Link to="/teachings" style={{ fontFamily:"'Cinzel',serif", fontSize:'11px', letterSpacing:'0.2em', color:'#b91c1c', textDecoration:'none' }}>← Back to Teachings</Link>
        </div>
      </div>
    );
  }

  const handleEnrollment = (data: EnrollmentFormData) => {
    console.log('Enrollment data:', data);
    setIsEnrollmentOpen(false);
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);
  };

  return (
    <div style={{ background:'#fdf8f3', minHeight:'100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700;900&family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Crimson+Text:wght@400;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .back-lnk { display:inline-flex; align-items:center; gap:8px; font-family:'Cinzel',serif; font-size:9px; letter-spacing:0.2em; text-transform:uppercase; color:#a07070; text-decoration:none; transition:color 0.2s; }
        .back-lnk:hover { color:#b91c1c; }

        .enroll-btn { width:100%; padding:14px; background:linear-gradient(135deg,#991b1b,#b91c1c); color:#fff; border:none; border-radius:4px; font-family:'Cinzel',serif; font-size:11px; letter-spacing:0.25em; text-transform:uppercase; font-weight:700; cursor:pointer; box-shadow:0 6px 20px rgba(185,28,28,0.25); transition:all 0.3s; }
        .enroll-btn:hover { background:linear-gradient(135deg,#7f1d1d,#991b1b); box-shadow:0 8px 28px rgba(185,28,28,0.4); transform:translateY(-1px); }
        .enroll-btn:active { transform:translateY(0); }

        /* Two-column layout desktop */
        .content-grid { display:grid; grid-template-columns:1fr 300px; gap:48px; align-items:start; }

        /* Highlights: 2-col desktop */
        .highlights-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }

        /* Sticky register bar — mobile only */
        .sticky-enroll { display:none; }

        @media (max-width: 767px) {
          /* Single column */
          .content-grid { grid-template-columns:1fr; gap:24px; }

          /* Sidebar moves to top on mobile */
          .sidebar-col { order:-1; }
          .sidebar-inner { position:static !important; }

          /* Highlights stack on mobile */
          .highlights-grid { grid-template-columns:1fr; }

          /* Sticky enroll bar */
          .sticky-enroll {
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

          /* Hero */
          .hero-wrap { height:52vw !important; min-height:220px !important; }
          .hero-inner { padding:18px 16px !important; }

          /* Sidebar enroll btn hidden on mobile */
          .sidebar-enroll { display:none; }

          .back-area { padding:14px 16px 0 !important; }
          .main-area { padding:20px 16px 40px !important; }
        }

        @media (min-width:768px) and (max-width:1023px) {
          .content-grid { grid-template-columns:1fr 260px; gap:32px; }
        }
      `}</style>

      {/* Hero */}
      <motion.div
        className="hero-wrap"
        style={{ position:'relative', height:'55vh', minHeight:'340px', overflow:'hidden' }}
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.7 }}
      >
        <img
          src={category?.image ?? ''}
          alt={course.title}
          style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
        />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(26,8,8,0.8) 0%,rgba(185,28,28,0.3) 60%,rgba(26,8,8,0.65) 100%)' }} />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'180px', background:'linear-gradient(to bottom,transparent,#fdf8f3)' }} />
        <div
          className="hero-inner"
          style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'36px', maxWidth:'1200px', margin:'0 auto', left:0, right:0 }}
        >
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.4em', color:'rgba(253,220,200,0.9)', textTransform:'uppercase', marginBottom:'8px' }}>Sacred Course</p>
          <h1 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(18px,4vw,48px)', fontWeight:900, color:'#fff', lineHeight:1.1, marginBottom:'14px', textShadow:'0 2px 12px rgba(0,0,0,0.5)' }}>
            {course.title}
          </h1>
          <div style={{ display:'flex', gap:'14px', flexWrap:'wrap' }}>
            {[
              { icon:<Clock size={12} color="rgba(253,220,200,0.8)"/>, text:course.duration },
              { icon:<Globe size={12} color="rgba(253,220,200,0.8)"/>, text:course.language.join(', ') },
              { icon:<GraduationCap size={12} color="rgba(253,220,200,0.8)"/>, text:course.instructor.name },
            ].map((item, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                {item.icon}
                <span style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', letterSpacing:'0.1em', color:'rgba(253,220,200,0.85)' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Back link */}
      <div className="back-area" style={{ maxWidth:'1200px', margin:'0 auto', padding:'18px 24px 0' }}>
        <Link to={`/teachings/${categoryId}`} className="back-lnk"><ArrowLeft size={12}/> Back to {category?.title}</Link>
      </div>

      {/* Main content */}
      <div className="main-area page-pad" style={{ maxWidth:'1200px', margin:'0 auto', padding:'36px 24px 80px' }}>
        <div className="content-grid">

          {/* ── Left column ── */}
          <div style={{ display:'flex', flexDirection:'column', gap:'44px' }}>

            {/* About */}
            <motion.section initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.35em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'8px' }}>About This Course</p>
              <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(17px,2.2vw,26px)', fontWeight:700, color:'#1a0808', marginBottom:'14px' }}>Course Overview</h2>
              <div style={{ width:'50px', height:'2px', background:'linear-gradient(90deg,#b91c1c,transparent)', marginBottom:'16px' }} />
              <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'18px', color:'#5a3030', lineHeight:1.85 }}>
                {course.description}
              </p>
            </motion.section>

            {/* Highlights */}
            {course.highlights.length > 0 && (
              <motion.section initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }}>
                <p style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.35em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'8px' }}>What You'll Learn</p>
                <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(16px,2vw,24px)', fontWeight:700, color:'#1a0808', marginBottom:'14px' }}>Course Highlights</h2>
                <div style={{ width:'50px', height:'2px', background:'linear-gradient(90deg,#b91c1c,transparent)', marginBottom:'18px' }} />
                <div className="highlights-grid">
                  {course.highlights.map((h, i) => (
                    <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'12px', padding:'12px 14px', background:'#fff', border:'1px solid rgba(185,28,28,0.08)', borderRadius:'4px', boxShadow:'0 1px 4px rgba(185,28,28,0.04)' }}>
                      <CheckCircle size={14} color="#b91c1c" style={{ marginTop:'3px', flexShrink:0 }} />
                      <span style={{ fontFamily:"'Crimson Text',serif", fontSize:'16px', color:'#5a3030', lineHeight:1.5 }}>{h}</span>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Materials */}
            {course.materials.length > 0 && (
              <motion.section initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }}>
                <p style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.35em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'8px' }}>Included</p>
                <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(16px,2vw,24px)', fontWeight:700, color:'#1a0808', marginBottom:'14px' }}>Course Materials</h2>
                <div style={{ width:'50px', height:'2px', background:'linear-gradient(90deg,#b91c1c,transparent)', marginBottom:'18px' }} />
                <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                  {course.materials.map((m, i) => (
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:'12px', padding:'12px 14px', background:'#fff', border:'1px solid rgba(185,28,28,0.08)', borderRadius:'4px', boxShadow:'0 1px 4px rgba(185,28,28,0.04)' }}>
                      <Book size={14} color="#b91c1c" style={{ flexShrink:0 }} />
                      <span style={{ fontFamily:"'Crimson Text',serif", fontSize:'16px', color:'#5a3030', lineHeight:1.5 }}>{m}</span>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="sidebar-col">
            <motion.div
              className="sidebar-inner"
              initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.45 }}
              style={{ position:'sticky', top:'100px' }}
            >
              <div style={{ background:'#fff', border:'1px solid rgba(185,28,28,0.15)', borderRadius:'6px', overflow:'hidden', boxShadow:'0 8px 30px rgba(185,28,28,0.08)' }}>

                {/* Instructor */}
                <div style={{ padding:'18px 20px', background:'rgba(185,28,28,0.04)', borderBottom:'1px solid rgba(185,28,28,0.1)' }}>
                  <p style={{ fontFamily:"'Cinzel',serif", fontSize:'8.5px', letterSpacing:'0.3em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'5px' }}>Your Instructor</p>
                  <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'15px', fontWeight:700, color:'#1a0808' }}>{course.instructor.name}</h3>
                  <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'14px', color:'#a07070', fontStyle:'italic', marginTop:'3px' }}>{course.instructor.title}</p>
                </div>
                <div style={{ padding:'16px 20px', borderBottom:'1px solid rgba(185,28,28,0.07)' }}>
                  <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'15px', color:'#5a3030', lineHeight:1.7 }}>{course.instructor.bio}</p>
                </div>

                {/* Course info rows */}
                <div style={{ padding:'16px 20px', display:'flex', flexDirection:'column', gap:'12px' }}>
                  {[
                    { icon:<Clock size={13} color="#b91c1c"/>, label:'Duration', value:course.duration },
                    { icon:<Globe size={13} color="#b91c1c"/>, label:'Language', value:course.language.join(', ') },
                    { icon:<Calendar size={13} color="#b91c1c"/>, label:'Start Date', value:'Flexible' },
                    { icon:<GraduationCap size={13} color="#b91c1c"/>, label:'Mode', value:'Online / Offline' },
                  ].map(row => (
                    <div key={row.label} style={{ display:'flex', alignItems:'flex-start', gap:'10px', paddingBottom:'10px', borderBottom:'1px solid rgba(185,28,28,0.06)' }}>
                      <div style={{ width:'28px', height:'28px', borderRadius:'50%', background:'rgba(185,28,28,0.06)', border:'1px solid rgba(185,28,28,0.15)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{row.icon}</div>
                      <div>
                        <p style={{ fontFamily:"'Cinzel',serif", fontSize:'8px', letterSpacing:'0.18em', color:'#a07070', textTransform:'uppercase', marginBottom:'2px' }}>{row.label}</p>
                        <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'15px', color:'#5a3030', lineHeight:1.4 }}>{row.value}</p>
                      </div>
                    </div>
                  ))}

                  {/* Enroll button — hidden on mobile via CSS, sticky bar handles it */}
                  <div className="sidebar-enroll">
                    <button className="enroll-btn" onClick={() => setIsEnrollmentOpen(true)}>
                      Enroll Now →
                    </button>
                    <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'13px', color:'#a07070', textAlign:'center', fontStyle:'italic', marginTop:'8px' }}>We'll be in touch shortly</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Recommended Courses */}
        <motion.div style={{ marginTop:'80px' }} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.7 }}>
          <div style={SL as any} />
          <RecommendedCourses currentCourseId={courseId ?? ''} />
        </motion.div>
      </div>

      {/* ── Sticky Enroll Bar — mobile only ── */}
      <div className="sticky-enroll">
        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <div style={{ flex:1, minWidth:0 }}>
            <p style={{ fontFamily:"'Cinzel',serif", fontSize:'8px', letterSpacing:'0.15em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'2px' }}>Sacred Course</p>
            <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'13px', color:'#5a3030', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
              {course.duration} · {course.language[0]}
            </p>
          </div>
          <button
            className="enroll-btn"
            style={{ width:'auto', padding:'12px 22px', whiteSpace:'nowrap', flexShrink:0 }}
            onClick={() => setIsEnrollmentOpen(true)}
          >
            Enroll →
          </button>
        </div>
      </div>

      {/* Enrollment Form */}
      <EnrollmentForm
        isOpen={isEnrollmentOpen}
        onClose={() => setIsEnrollmentOpen(false)}
        onSubmit={handleEnrollment}
        courseTitle={course.title}
      />

      {/* Thank you toast */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity:0, y:50 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:50 }}
            style={{ position:'fixed', bottom:'80px', right:'16px', left:'16px', zIndex:100, background:'linear-gradient(135deg,#14532d,#16a34a)', border:'1px solid rgba(22,163,74,0.4)', borderRadius:'4px', padding:'14px 22px', fontFamily:"'Cinzel',serif", fontSize:'11px', letterSpacing:'0.12em', color:'#fff', boxShadow:'0 8px 28px rgba(22,163,74,0.3)', textAlign:'center' }}
          >
            ✓ Enrollment submitted — we'll be in touch soon!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseDetail;