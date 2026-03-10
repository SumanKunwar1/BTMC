import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const services = [
  {
    icon: '📖',
    title: 'Buddhist Teachings & Meditation',
    description: 'Comprehensive courses in Buddhist philosophy and meditation for monks, nuns, and lay practitioners — from beginner to advanced levels.',
    link: '/teachings',
  },
  {
    icon: '🗺️',
    title: 'Pilgrimage Tours',
    description: 'Explore sacred sites in Nepal, India, Sri Lanka, and beyond — guided by experienced Buddhist masters with full logistics support.',
    link: '/events',
  },
  {
    icon: '🕯️',
    title: 'Rituals & Ceremonies',
    description: 'Buddhist ritual support for birth, marriage, healing, and funeral ceremonies — performed with authentic Dharma tradition.',
    link: '/services',
  },
  {
    icon: '🤝',
    title: 'Community Services',
    description: 'Disaster relief distribution, social welfare programs, and spiritual counseling — grounded in compassion for all beings.',
    link: '/community',
  },
];

const ServicesSection = () => {
  return (
    <section style={{
      background: 'linear-gradient(180deg, rgba(10,5,5,1) 0%, rgba(15,5,5,1) 100%)',
      padding: '100px 24px',
      position: 'relative',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700&family=Crimson+Text:wght@400;600&display=swap');
        .svc-card {
          background: linear-gradient(135deg, rgba(20,5,5,0.95) 0%, rgba(28,8,8,0.9) 100%);
          border: 1px solid rgba(185,28,28,0.18);
          border-radius: 4px;
          padding: 32px 26px;
          transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
          display: flex; flex-direction: column; gap: 14px;
          position: relative; overflow: hidden;
        }
        .svc-card::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #dc2626, transparent);
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }
        .svc-card:hover {
          border-color: rgba(220,38,38,0.5);
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(185,28,28,0.18), 0 0 30px rgba(185,28,28,0.06);
        }
        .svc-card:hover::after { transform: scaleX(1); }
        .svc-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Cinzel', serif; font-size: 9px;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #dc2626; text-decoration: none;
          padding-bottom: 3px;
          border-bottom: 1px solid rgba(220,38,38,0.25);
          transition: all 0.25s ease; margin-top: auto;
        }
        .svc-link:hover { color: #f87171; border-bottom-color: #f87171; gap: 12px; }
        .section-line { height: 1px; background: linear-gradient(90deg, transparent, rgba(185,28,28,0.5), rgba(245,166,35,0.3), rgba(185,28,28,0.5), transparent); }
      `}</style>

      <div className="section-line" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '16px' }}>
            <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg, transparent, rgba(185,28,28,0.6))' }} />
            <span style={{ fontSize: '18px' }}>☸</span>
            <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg, rgba(185,28,28,0.6), transparent)' }} />
          </div>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '0.4em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '12px' }}>
            How We Serve
          </p>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(24px, 3.5vw, 42px)', fontWeight: 700, color: '#f5f0eb' }}>
            Our Services
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '22px' }}>
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              className="svc-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
            >
              <div style={{ fontSize: '36px' }}>{svc.icon}</div>
              <div style={{ width: '30px', height: '1px', background: 'linear-gradient(90deg, #dc2626, transparent)' }} />
              <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '13px', fontWeight: 700, color: '#f5f0eb', lineHeight: 1.3, letterSpacing: '0.04em' }}>
                {svc.title}
              </h3>
              <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '16px', color: 'rgba(245,240,235,0.55)', lineHeight: 1.75, flex: 1 }}>
                {svc.description}
              </p>
              <Link to={svc.link} className="svc-link">
                Learn More →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="section-line" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
    </section>
  );
};

export default ServicesSection;