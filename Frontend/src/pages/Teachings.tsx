import { motion } from 'framer-motion';
import CategoryCard from '../components/teachings/CategoryCard';
import { courseCategories } from '../data/courses';

const Teachings = () => {
  return (
    <div style={{ background: '#0a0505', minHeight: '100vh', color: '#f5f0eb' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
        .section-line { height: 1px; background: linear-gradient(90deg, transparent, rgba(185,28,28,0.5), rgba(245,166,35,0.3), rgba(185,28,28,0.5), transparent); }
        .info-row { display: flex; align-items: flex-start; gap: 10px; padding: 8px 0; border-bottom: 1px solid rgba(185,28,28,0.08); }
        .info-row:last-child { border-bottom: none; }
      `}</style>

      {/* Hero */}
      <section style={{
        position: 'relative',
        padding: '90px 24px 80px',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(120,10,10,0.35) 0%, rgba(10,5,5,1) 65%)',
        textAlign: 'center', overflow: 'hidden',
      }}>
        {[180, 320, 460].map((size) => (
          <div key={size} style={{
            position: 'absolute', borderRadius: '50%',
            border: '1px solid rgba(185,28,28,0.07)',
            width: size, height: size,
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }} />
        ))}

        {/* Ghost large text */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          fontFamily: "'Cinzel', serif", fontSize: 'clamp(80px, 15vw, 200px)', fontWeight: 900,
          color: 'rgba(185,28,28,0.03)', userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap',
        }}>DHARMA</div>

        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '18px' }}>
            <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg, transparent, #dc2626)' }} />
            <span style={{ fontSize: '22px' }}>☸</span>
            <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg, #dc2626, transparent)' }} />
          </div>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '0.4em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '14px' }}>
            Path to Awakening
          </p>
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(28px, 5vw, 64px)', fontWeight: 900, color: '#f5f0eb', lineHeight: 1.05, marginBottom: '18px', textShadow: '0 0 60px rgba(220,38,38,0.12)' }}>
            Buddhist Teachings<br />&amp; Courses
          </h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(16px, 2vw, 22px)', fontStyle: 'italic', fontWeight: 300, color: 'rgba(245,240,235,0.5)' }}>
            Explore our comprehensive range of courses and begin your spiritual journey
          </p>
        </motion.div>
      </section>

      <div className="section-line" />

      {/* Course grid */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}
          style={{ marginBottom: '48px' }}
        >
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.4em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '10px' }}>Our Programs</p>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(20px, 2.5vw, 34px)', fontWeight: 700, color: '#f5f0eb' }}>Course Categories</h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {courseCategories.map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }} transition={{ delay: i * 0.1, duration: 0.55 }}
            >
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </div>
      </section>

      <div className="section-line" />

      {/* Course Info section */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}
        >
          {[
            {
              title: 'Class Capacity',
              icon: '🏛️',
              items: ['Teaching Center: 30–50 students', 'Online with Visuals: 6 students', 'Online without Visuals: Unlimited'],
            },
            {
              title: 'Course Materials',
              icon: '📚',
              items: ['Handouts of related subjects', 'Audio / Video tutorials', 'Certificate upon completion'],
            },
            {
              title: 'Support-Based Model',
              icon: '🙏',
              items: ['No mandatory course fees', 'Operate on Buddhist principles', 'Your support preserves Dharma', 'Benefiting present & future generations'],
            },
          ].map((block, i) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }} transition={{ delay: i * 0.12 }}
              style={{
                background: 'linear-gradient(160deg, rgba(20,5,5,0.97), rgba(28,8,8,0.92))',
                border: '1px solid rgba(185,28,28,0.18)',
                borderRadius: '4px', padding: '28px',
              }}
            >
              <div style={{ fontSize: '30px', marginBottom: '14px' }}>{block.icon}</div>
              <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '13px', fontWeight: 700, color: '#f5f0eb', marginBottom: '16px', letterSpacing: '0.05em' }}>
                {block.title}
              </h3>
              <div style={{ width: '36px', height: '1px', background: 'linear-gradient(90deg, #dc2626, transparent)', marginBottom: '16px' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {block.items.map((item) => (
                  <div key={item} className="info-row">
                    <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '2px', flexShrink: 0 }}>✦</span>
                    <span style={{ fontFamily: "'Crimson Text', serif", fontSize: '16px', color: 'rgba(245,240,235,0.55)', lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Teachings;