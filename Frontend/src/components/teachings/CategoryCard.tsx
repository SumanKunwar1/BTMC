import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CourseCategory } from '../../types/course';

interface CategoryCardProps { category: CourseCategory; }

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const linkTo = category.id==='buddhism'&&category.courses.length>0 ? `/teachings/${category.id}/${category.courses[0].id}` : `/teachings/${category.id}`;
  return (
    <div style={{ background:'#fff', border:'1px solid rgba(185,28,28,0.1)', borderRadius:'6px', overflow:'hidden', boxShadow:'0 2px 12px rgba(185,28,28,0.04)', transition:'all 0.4s cubic-bezier(0.23,1,0.32,1)' }}
      onMouseEnter={e=>{ const d=e.currentTarget as HTMLDivElement; d.style.transform='translateY(-6px)'; d.style.borderColor='rgba(185,28,28,0.3)'; d.style.boxShadow='0 16px 40px rgba(185,28,28,0.12)'; }}
      onMouseLeave={e=>{ const d=e.currentTarget as HTMLDivElement; d.style.transform=''; d.style.borderColor='rgba(185,28,28,0.1)'; d.style.boxShadow='0 2px 12px rgba(185,28,28,0.04)'; }}
    >
      <Link to={linkTo} style={{ textDecoration:'none', display:'block' }}>
        <div style={{ position:'relative', height:'200px', overflow:'hidden' }}>
          <img src={category.image} alt={category.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 0.6s ease' }}
            onMouseEnter={e=>(e.currentTarget as HTMLImageElement).style.transform='scale(1.06)'}
            onMouseLeave={e=>(e.currentTarget as HTMLImageElement).style.transform='scale(1)'}
          />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(26,8,8,0.55) 0%,transparent 55%)' }} />
          {category.courses?.length>0&&(
            <div style={{ position:'absolute', top:'10px', right:'10px', background:'rgba(253,248,243,0.92)', border:'1px solid rgba(185,28,28,0.3)', borderRadius:'2px', padding:'3px 10px', fontFamily:"'Cinzel',serif", fontSize:'8px', letterSpacing:'0.15em', color:'#b91c1c', backdropFilter:'blur(4px)', textTransform:'uppercase' }}>
              {category.courses.length} Course{category.courses.length!==1?'s':''}
            </div>
          )}
        </div>
        <div style={{ padding:'20px', display:'flex', flexDirection:'column', gap:'10px' }}>
          <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'14px', fontWeight:700, color:'#1a0808', lineHeight:1.3, letterSpacing:'0.03em' }}>{category.title}</h3>
          <div style={{ width:'36px', height:'1px', background:'linear-gradient(90deg,#b91c1c,transparent)' }} />
          <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'16px', color:'#6b3333', lineHeight:1.7, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' as const, overflow:'hidden' }}>{category.description}</p>
          <div style={{ display:'flex', alignItems:'center', gap:'7px', fontFamily:"'Cinzel',serif", fontSize:'9.5px', letterSpacing:'0.2em', color:'#b91c1c', textTransform:'uppercase', marginTop:'4px' }}>
            Explore Courses <ArrowRight size={12}/>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;