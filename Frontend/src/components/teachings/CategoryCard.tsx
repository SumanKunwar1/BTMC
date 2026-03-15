import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Globe } from 'lucide-react';
import { CourseCategory } from '../../types/course';

interface CategoryCardProps { category: CourseCategory; }

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  // Each category has one main course — link directly to it
  const firstCourse = category.courses[0];
  const linkTo = firstCourse
    ? `/teachings/${category.id}/${firstCourse.id}`
    : `/teachings/${category.id}`;

  return (
    <div
      style={{ background:'#fff', border:'1px solid rgba(185,28,28,0.1)', borderRadius:'6px', overflow:'hidden', boxShadow:'0 2px 12px rgba(185,28,28,0.04)', transition:'all 0.4s cubic-bezier(0.23,1,0.32,1)' }}
      onMouseEnter={e=>{ const d=e.currentTarget as HTMLDivElement; d.style.transform='translateY(-6px)'; d.style.borderColor='rgba(185,28,28,0.3)'; d.style.boxShadow='0 16px 40px rgba(185,28,28,0.12)'; }}
      onMouseLeave={e=>{ const d=e.currentTarget as HTMLDivElement; d.style.transform=''; d.style.borderColor='rgba(185,28,28,0.1)'; d.style.boxShadow='0 2px 12px rgba(185,28,28,0.04)'; }}
    >
      <Link to={linkTo} style={{ textDecoration:'none', display:'flex', flexDirection:'column' }}>

        {/* Image */}
        <div style={{ position:'relative', height:'210px', overflow:'hidden' }}>
          <img
            src={category.image}
            alt={category.title}
            style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 0.6s ease' }}
            onMouseEnter={e=>(e.currentTarget as HTMLImageElement).style.transform='scale(1.06)'}
            onMouseLeave={e=>(e.currentTarget as HTMLImageElement).style.transform='scale(1)'}
          />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(26,8,8,0.6) 0%,transparent 55%)' }} />
          {/* Course count badge */}
          {category.courses.length > 0 && (
            <div style={{ position:'absolute', top:'10px', right:'10px', background:'rgba(253,248,243,0.92)', border:'1px solid rgba(185,28,28,0.3)', borderRadius:'2px', padding:'3px 10px', fontFamily:"'Cinzel',serif", fontSize:'8px', letterSpacing:'0.15em', color:'#b91c1c', backdropFilter:'blur(4px)', textTransform:'uppercase' }}>
              {category.courses.length} Course{category.courses.length !== 1 ? 's' : ''}
            </div>
          )}
          {/* Title overlay on image */}
          <div style={{ position:'absolute', bottom:'14px', left:'16px', right:'16px' }}>
            <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'15px', fontWeight:700, color:'#fff', lineHeight:1.25, textShadow:'0 1px 6px rgba(0,0,0,0.5)', margin:0 }}>
              {category.title}
            </h3>
          </div>
        </div>

        {/* Card body */}
        <div style={{ padding:'18px 20px', display:'flex', flexDirection:'column', gap:'10px', flex:1 }}>
          <div style={{ width:'36px', height:'1px', background:'linear-gradient(90deg,#b91c1c,transparent)' }} />
          <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'16px', color:'#6b3333', lineHeight:1.7, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' as const, overflow:'hidden', margin:0 }}>
            {category.description}
          </p>

          {/* Meta — duration & language from first course */}
          {firstCourse && (
            <div style={{ display:'flex', gap:'14px', flexWrap:'wrap' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'5px' }}>
                <Clock size={10} color="#b91c1c"/>
                <span style={{ fontFamily:"'Cinzel',serif", fontSize:'8.5px', letterSpacing:'0.1em', color:'#a07070' }}>{firstCourse.duration}</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:'5px' }}>
                <Globe size={10} color="#b91c1c"/>
                <span style={{ fontFamily:"'Cinzel',serif", fontSize:'8.5px', letterSpacing:'0.1em', color:'#a07070' }}>{firstCourse.language.join(', ')}</span>
              </div>
            </div>
          )}

          <div style={{ height:'1px', background:'linear-gradient(90deg,transparent,rgba(185,28,28,0.12),transparent)' }} />
          <div style={{ display:'flex', alignItems:'center', gap:'7px', fontFamily:"'Cinzel',serif", fontSize:'9.5px', letterSpacing:'0.2em', color:'#b91c1c', textTransform:'uppercase', marginTop:'2px' }}>
            Explore Course <ArrowRight size={11}/>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;