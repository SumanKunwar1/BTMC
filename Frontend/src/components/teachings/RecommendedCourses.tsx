import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { courseCategories } from '../../data/courses';
import { Course } from '../../types/course';

interface RecommendedCoursesProps {
  currentCourseId: string;
}

const RecommendedCourses: React.FC<RecommendedCoursesProps> = ({ currentCourseId }) => {
  const getRandomCourses = (): (Course & { categoryId: string })[] => {
    const allCourses = courseCategories.flatMap((category) =>
      category.courses.map((course) => ({ ...course, categoryId: category.id }))
    );
    const filtered = allCourses.filter((c) => c.id !== currentCourseId);
    if (filtered.length === 0) return [];
    if (filtered.length <= 3) return filtered;
    return filtered.sort(() => Math.random() - 0.5).slice(0, 3);
  };

  const recommended = getRandomCourses();
  if (recommended.length === 0) return null;

  return (
    <motion.section
      style={{ marginTop: '80px' }}
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
    >
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(185,28,28,0.5), rgba(245,166,35,0.3), rgba(185,28,28,0.5), transparent)', marginBottom: '48px' }} />
      <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.4em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '10px' }}>Continue Learning</p>
      <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 700, color: '#f5f0eb', marginBottom: '32px' }}>
        Recommended Courses
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '22px' }}>
        {recommended.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }} transition={{ delay: i * 0.1 }}
            style={{
              background: 'linear-gradient(160deg, rgba(20,5,5,0.97), rgba(28,8,8,0.92))',
              border: '1px solid rgba(185,28,28,0.18)',
              borderRadius: '4px', overflow: 'hidden',
              transition: 'all 0.35s ease',
            }}
            whileHover={{ y: -5, borderColor: 'rgba(220,38,38,0.45)' } as any}
          >
            <Link to={`/teachings/${course.categoryId}/${course.id}`} style={{ textDecoration: 'none', display: 'block', padding: '22px 20px' }}>
              <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '13px', fontWeight: 700, color: '#f5f0eb', marginBottom: '10px', lineHeight: 1.3 }}>
                {course.title}
              </h3>
              <div style={{ width: '32px', height: '1px', background: 'linear-gradient(90deg, #dc2626, transparent)', marginBottom: '10px' }} />
              <p style={{
                fontFamily: "'Crimson Text', serif", fontSize: '15px',
                color: 'rgba(245,240,235,0.5)', lineHeight: 1.7, marginBottom: '14px',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical' as const,
                overflow: 'hidden',
              }}>
                {course.description}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: "'Crimson Text', serif", fontSize: '13px', color: 'rgba(245,240,235,0.3)', fontStyle: 'italic' }}>
                  {course.instructor?.name}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.18em', color: '#dc2626', textTransform: 'uppercase' }}>
                  Explore <ArrowRight size={11} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default RecommendedCourses;