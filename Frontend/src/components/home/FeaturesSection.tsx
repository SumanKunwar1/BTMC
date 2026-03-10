import { motion } from 'framer-motion';

const features = [
  {
    icon: '📖',
    title: 'Buddhist Teachings',
    description: 'Authentic Buddhist philosophy and practices from experienced masters — open to beginners and advanced practitioners alike.',
  },
  {
    icon: '🧘',
    title: 'Meditation Courses',
    description: 'Weekly and intensive meditation programs for inner peace, clarity, and spiritual growth — all offered free of cost.',
  },
  {
    icon: '🏔️',
    title: 'Pilgrimage Tours',
    description: 'Experience sacred Buddhist sites across Nepal, India, Sri Lanka and beyond with knowledgeable spiritual guides.',
  },
];

const FeaturesSection = () => {
  return (
    <section style={{
      background: 'linear-gradient(180deg, #0a0505 0%, rgba(15,5,5,1) 100%)',
      padding: '80px 24px',
      position: 'relative',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700&family=Cormorant+Garamond:wght@400;500;600&family=Crimson+Text:wght@400;600&display=swap');
        .feat-card {
          background: linear-gradient(135deg, rgba(20,5,5,0.95) 0%, rgba(28,8,8,0.9) 100%);
          border: 1px solid rgba(185,28,28,0.2);
          border-radius: 4px;
          padding: 36px 28px;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
          position: relative;
          overflow: hidden;
        }
        .feat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #dc2626, transparent);
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }
        .feat-card:hover {
          border-color: rgba(220,38,38,0.5);
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(185,28,28,0.2), 0 0 30px rgba(185,28,28,0.08);
        }
        .feat-card:hover::before { transform: scaleX(1); }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '16px' }}>
            <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg, transparent, rgba(185,28,28,0.6))' }} />
            <span style={{ fontSize: '18px' }}>☸</span>
            <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg, rgba(185,28,28,0.6), transparent)' }} />
          </div>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '0.4em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '12px' }}>
            What We Offer
          </p>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 700, color: '#f5f0eb' }}>
            Paths to Wisdom
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="feat-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <div style={{ fontSize: '40px', marginBottom: '20px' }}>{feature.icon}</div>
              <h3 style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '15px', fontWeight: 700,
                color: '#f5f0eb', marginBottom: '14px',
                letterSpacing: '0.05em',
              }}>
                {feature.title}
              </h3>
              <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, #dc2626, transparent)', margin: '0 auto 14px' }} />
              <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '17px', color: 'rgba(245,240,235,0.55)', lineHeight: 1.75 }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;