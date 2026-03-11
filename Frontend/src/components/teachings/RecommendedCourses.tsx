import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { courseCategories } from '../../data/courses';

interface RecommendedCoursesProps { currentCourseId: string; }

const RecommendedCourses: React.FC<RecommendedCoursesProps> = ({ currentCourseId }) => {
  const allCourses = courseCategories.flatMap(cat => cat.courses.map(c => ({ ...c, categoryId:cat.id })));
  const filtered = allCourses.filter(c => c.id!==currentCourseId);
  const recommended = filtered.length<=3 ? filtered : filtered.sort(()=>Math.random()-0.5).slice(0,3);
  if (!recommended.length) return null;

  return (
    <motion.section style={{ marginTop:'80px' }} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.6 }}>
      <div style={{ height:'1px', background:'linear-gradient(90deg,transparent,rgba(185,28,28,0.2),rgba(217,119,6,0.15),rgba(185,28,28,0.2),transparent)', marginBottom:'48px' }} />
      <p style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.4em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'10px' }}>Continue Learning</p>
      <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(18px,2.5vw,30px)', fontWeight:700, color:'#1a0808', marginBottom:'28px' }}>Recommended Courses</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:'20px' }}>
        {recommended.map((course,i)=>(
          <motion.div key={course.id} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:false }} transition={{ delay:i*0.1 }}
            style={{ background:'#fff', border:'1px solid rgba(185,28,28,0.1)', borderRadius:'6px', overflow:'hidden', boxShadow:'0 2px 12px rgba(185,28,28,0.04)', transition:'all 0.35s ease' }}
            onMouseEnter={(e:any)=>{ e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.borderColor='rgba(185,28,28,0.28)'; e.currentTarget.style.boxShadow='0 12px 32px rgba(185,28,28,0.1)'; }}
            onMouseLeave={(e:any)=>{ e.currentTarget.style.transform=''; e.currentTarget.style.borderColor='rgba(185,28,28,0.1)'; e.currentTarget.style.boxShadow='0 2px 12px rgba(185,28,28,0.04)'; }}
          >
            <Link to={`/teachings/${course.categoryId}/${course.id}`} style={{ textDecoration:'none', display:'block', padding:'22px 20px' }}>
              <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', fontWeight:700, color:'#1a0808', marginBottom:'10px', lineHeight:1.3 }}>{course.title}</h3>
              <div style={{ width:'32px', height:'1px', background:'linear-gradient(90deg,#b91c1c,transparent)', marginBottom:'10px' }} />
              <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'15px', color:'#6b3333', lineHeight:1.7, marginBottom:'14px', display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical' as const, overflow:'hidden' }}>{course.description}</p>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontFamily:"'Crimson Text',serif", fontSize:'13px', color:'#a07070', fontStyle:'italic' }}>{course.instructor?.name}</span>
                <div style={{ display:'flex', alignItems:'center', gap:'5px', fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.18em', color:'#b91c1c', textTransform:'uppercase' }}>Explore <ArrowRight size={11}/></div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default RecommendedCourses;