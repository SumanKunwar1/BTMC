import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Globe, ArrowLeft, ArrowRight } from 'lucide-react';
import { courseCategories } from '../data/courses';

const CourseCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = courseCategories.find((cat) => cat.id === categoryId);

  if (!category) {
    return (
      <div style={{ background:'#fdf8f3', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ textAlign:'center', padding:'24px' }}>
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:'20px', color:'#1a0808', marginBottom:'14px' }}>Category Not Found</p>
          <Link to="/teachings" style={{ fontFamily:"'Cinzel',serif", fontSize:'11px', letterSpacing:'0.2em', color:'#b91c1c', textDecoration:'none' }}>← Back to Teachings</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background:'#fdf8f3', minHeight:'100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700;900&family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Crimson+Text:wght@400;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .back-lnk { display:inline-flex; align-items:center; gap:8px; font-family:'Cinzel',serif; font-size:9px; letter-spacing:0.2em; text-transform:uppercase; color:#a07070; text-decoration:none; transition:color 0.2s; }
        .back-lnk:hover { color:#b91c1c; }

        .course-card { background:#fff; border:1px solid rgba(185,28,28,0.1); border-radius:6px; overflow:hidden; text-decoration:none; display:block; box-shadow:0 2px 12px rgba(185,28,28,0.05); transition:all 0.4s cubic-bezier(0.23,1,0.32,1); }
        .course-card:hover { transform:translateY(-6px); border-color:rgba(185,28,28,0.3); box-shadow:0 16px 40px rgba(185,28,28,0.12); }
        .course-card:hover .card-img { transform:scale(1.05); }

        .card-img { width:100%; height:100%; object-fit:cover; transition:transform 0.6s ease; }

        .courses-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(300px,1fr)); gap:24px; }

        @media (max-width: 767px) {
          .hero-wrap { height:52vw !important; min-height:220px !important; }
          .hero-inner { padding:18px 16px !important; }
          .back-area { padding:14px 16px 0 !important; }
          .main-area { padding:24px 16px 60px !important; }
          .courses-grid { grid-template-columns:1fr; gap:18px; }
        }
      `}</style>

      {/* Hero */}
      <motion.div
        className="hero-wrap"
        style={{ position:'relative', height:'50vh', minHeight:'320px', overflow:'hidden' }}
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.7 }}
      >
        <img src={category.image} alt={category.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(26,8,8,0.75) 0%,rgba(185,28,28,0.3) 60%,rgba(26,8,8,0.6) 100%)' }} />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'160px', background:'linear-gradient(to bottom,transparent,#fdf8f3)' }} />
        <div
          className="hero-inner"
          style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'36px', maxWidth:'1200px', margin:'0 auto', left:0, right:0 }}
        >
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.4em', color:'rgba(253,220,200,0.9)', textTransform:'uppercase', marginBottom:'8px' }}>Sacred Studies</p>
          <h1 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(20px,4vw,48px)', fontWeight:900, color:'#fff', lineHeight:1.1, marginBottom:'12px', textShadow:'0 2px 12px rgba(0,0,0,0.4)' }}>{category.title}</h1>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(14px,1.8vw,18px)', fontStyle:'italic', fontWeight:300, color:'rgba(253,220,200,0.85)', maxWidth:'600px', lineHeight:1.6 }}>{category.description}</p>
        </div>
      </motion.div>

      {/* Back link */}
      <div className="back-area" style={{ maxWidth:'1200px', margin:'0 auto', padding:'18px 24px 0' }}>
        <Link to="/teachings" className="back-lnk"><ArrowLeft size={12}/> Back to Teachings</Link>
      </div>

      {/* Courses */}
      <div className="main-area" style={{ maxWidth:'1200px', margin:'0 auto', padding:'36px 24px 80px' }}>
        {category.courses.length > 0 ? (
          <>
            <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }} style={{ marginBottom:'36px' }}>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.4em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'8px' }}>Available Courses</p>
              <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(18px,2.5vw,30px)', fontWeight:700, color:'#1a0808' }}>{category.courses.length} Course{category.courses.length !== 1 ? 's' : ''} Available</h2>
              <div style={{ width:'50px', height:'2px', background:'linear-gradient(90deg,#b91c1c,transparent)', marginTop:'12px' }} />
            </motion.div>

            <div className="courses-grid">
              {category.courses.map((course, i) => (
                <motion.div key={course.id} initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:false }} transition={{ delay:i*0.1, duration:0.5 }}>
                  <Link to={`/teachings/${categoryId}/${course.id}`} className="course-card">
                    <div style={{ height:'200px', overflow:'hidden', position:'relative' }}>
                      <img src={category.image} alt={course.title} className="card-img" />
                      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(26,8,8,0.5) 0%,transparent 55%)' }} />
                      <div style={{ position:'absolute', top:'12px', left:'12px' }}>
                        <span style={{ fontFamily:"'Cinzel',serif", fontSize:'8px', letterSpacing:'0.12em', background:'rgba(185,28,28,0.88)', color:'#fff', padding:'3px 10px', borderRadius:'2px', textTransform:'uppercase', backdropFilter:'blur(4px)' }}>
                          {course.category}
                        </span>
                      </div>
                    </div>
                    <div style={{ padding:'20px', display:'flex', flexDirection:'column', gap:'10px' }}>
                      <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'14px', fontWeight:700, color:'#1a0808', lineHeight:1.3 }}>{course.title}</h3>
                      <div style={{ width:'36px', height:'1px', background:'linear-gradient(90deg,#b91c1c,transparent)' }} />
                      <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'16px', color:'#6b3333', lineHeight:1.7, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' as const, overflow:'hidden' }}>
                        {course.description}
                      </p>
                      <div style={{ display:'flex', gap:'16px', flexWrap:'wrap', paddingTop:'4px' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                          <Clock size={11} color="#b91c1c"/>
                          <span style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.1em', color:'#a07070' }}>{course.duration}</span>
                        </div>
                        <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                          <Globe size={11} color="#b91c1c"/>
                          <span style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.1em', color:'#a07070' }}>{course.language.join(', ')}</span>
                        </div>
                      </div>
                      <div style={{ height:'1px', background:'linear-gradient(90deg,transparent,rgba(185,28,28,0.12),transparent)' }} />
                      <div style={{ display:'flex', alignItems:'center', gap:'7px', fontFamily:"'Cinzel',serif", fontSize:'9.5px', letterSpacing:'0.2em', color:'#b91c1c', textTransform:'uppercase' }}>
                        View Details <ArrowRight size={11}/>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div style={{ textAlign:'center', padding:'80px 24px', fontFamily:"'Crimson Text',serif", fontSize:'18px', color:'#a07070', fontStyle:'italic' }}>
            Courses for this category will be available soon.
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCategory;