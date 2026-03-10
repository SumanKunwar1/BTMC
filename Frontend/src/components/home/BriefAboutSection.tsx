import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BriefAboutSection = () => {
  return (
    <section style={{
      background: 'linear-gradient(180deg, rgba(10,5,5,1) 0%, rgba(18,5,5,1) 100%)',
      padding: '100px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
        .about-learn-link {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Cinzel', serif; font-size: 10px;
          letter-spacing: 0.25em; text-transform: uppercase;
          color: #dc2626; text-decoration: none;
          padding-bottom: 4px;
          border-bottom: 1px solid rgba(220,38,38,0.35);
          transition: all 0.25s ease;
        }
        .about-learn-link:hover { color: #f87171; border-bottom-color: #f87171; gap: 14px; }
        .section-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(185,28,28,0.5), rgba(245,166,35,0.3), rgba(185,28,28,0.5), transparent);
        }
      `}</style>

      {/* Top divider */}
      <div className="section-line" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      {/* Decorative large ghost text */}
      <div style={{
        position: 'absolute', top: '50%', right: '-2%',
        transform: 'translateY(-50%)',
        fontFamily: "'Cinzel', serif",
        fontSize: 'clamp(80px, 14vw, 200px)',
        fontWeight: 900,
        color: 'rgba(185,28,28,0.03)',
        userSelect: 'none', pointerEvents: 'none',
        lineHeight: 1,
        letterSpacing: '-0.04em',
      }}>
        BTMC
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '70px', alignItems: 'center' }}>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{ position: 'relative' }}
          >
            <div style={{
              borderRadius: '4px', overflow: 'hidden',
              border: '1px solid rgba(185,28,28,0.3)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
              position: 'relative',
            }}>
              <motion.img
                src="https://res.cloudinary.com/dihev9qxc/image/upload/v1762067523/a-harmonious-collage-style-illustration-_ldwA_JRIQFmvzQgbkHNb4w_e8L27cIHRRC36jH5ipdKXg_jvdxn6.jpg"
                alt="BTMC Foundation"
                style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.6 }}
              />
              {/* Image overlay */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px',
                background: 'linear-gradient(to top, rgba(10,5,5,0.8), transparent)',
              }} />
            </div>

            {/* Est. badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{
                position: 'absolute', bottom: '-20px', right: '-20px',
                width: '100px', height: '100px',
                background: 'linear-gradient(135deg, #991b1b, #dc2626)',
                borderRadius: '4px',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: '3px',
                boxShadow: '0 10px 30px rgba(185,28,28,0.4)',
              }}
            >
              <span style={{ fontSize: '20px' }}>🙏</span>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: '8px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.85)', textAlign: 'center', lineHeight: 1.4 }}>
                EST.<br />2003
              </span>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.2 }}
                style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '0.4em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '10px' }}
              >
                Who We Are
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.25, duration: 0.6 }}
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 'clamp(22px, 3vw, 38px)',
                  fontWeight: 700,
                  color: '#f5f0eb',
                  lineHeight: 1.15,
                  marginBottom: '8px',
                }}
              >
                About BTMC Foundation
              </motion.h2>
            </div>

            <div style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, #dc2626, transparent)' }} />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.35, duration: 0.6 }}
              style={{
                fontFamily: "'Crimson Text', serif",
                fontSize: 'clamp(16px, 1.8vw, 19px)',
                color: 'rgba(245,240,235,0.65)',
                lineHeight: 1.85,
              }}
            >
              Established in <strong style={{ color: '#f5f0eb' }}>2003</strong> under the compassionate guidance of{' '}
              <em>Venerable Khen Rinpoche Sonam Gyurme</em>,{' '}
              <strong style={{ color: '#f5f0eb' }}>BTMC Foundation</strong> stands as a beacon of wisdom and compassion —
              devoted to <strong style={{ color: '#f5f0eb' }}>Buddhist education, meditation, and public welfare</strong>.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.45, duration: 0.6 }}
              style={{
                fontFamily: "'Crimson Text', serif",
                fontSize: 'clamp(15px, 1.6vw, 17px)',
                color: 'rgba(245,240,235,0.45)',
                lineHeight: 1.85,
              }}
            >
              Rooted in the timeless teachings of the Buddha, our mission is to preserve and share authentic Dharma —
              nurturing a peaceful environment where individuals can deepen their understanding, cultivate mindfulness,
              and grow spiritually for the benefit of all beings.
            </motion.p>

            {/* Mini stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5 }}
              style={{ display: 'flex', gap: '28px', flexWrap: 'wrap', margin: '8px 0' }}
            >
              {[
                { val: '20+', label: 'Years' },
                { val: '7', label: 'Institutions' },
                { val: '5K+', label: 'Practitioners' },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: '22px', fontWeight: 900, color: '#dc2626', lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: '8px', letterSpacing: '0.2em', color: 'rgba(245,240,235,0.35)', textTransform: 'uppercase', marginTop: '4px' }}>{s.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.55 }}
            >
              <Link to="/about" className="about-learn-link">
                Discover Our Story <span style={{ fontSize: '14px' }}>→</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="section-line" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
    </section>
  );
};

export default BriefAboutSection;