import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const buttons = [
  {
    to: '/teachings',
    label: 'Enroll in a Course',
    style: 'primary',
    delay: 0.85,
  },
  {
    to: '/events',
    label: 'Join a Retreat',
    style: 'gold',
    delay: 0.95,
  },
  {
    to: '/support',
    label: 'Donate Now',
    style: 'outline',
    delay: 1.05,
  },
];

const HeroButtons = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&display=swap');
        .hbtn { transition: all 0.3s cubic-bezier(0.23,1,0.32,1); text-decoration: none; display: inline-flex; align-items: center; }
        .hbtn-primary {
          background: linear-gradient(135deg, #991b1b, #dc2626);
          color: #fff;
          padding: 13px 26px;
          border-radius: 3px;
          box-shadow: 0 6px 20px rgba(185,28,28,0.4);
        }
        .hbtn-primary:hover {
          background: linear-gradient(135deg, #7f1d1d, #b91c1c);
          box-shadow: 0 8px 28px rgba(185,28,28,0.6);
          transform: translateY(-2px);
        }
        .hbtn-gold {
          background: linear-gradient(135deg, #b45309, #f59e0b);
          color: #fff;
          padding: 13px 26px;
          border-radius: 3px;
          box-shadow: 0 6px 20px rgba(245,158,11,0.3);
        }
        .hbtn-gold:hover {
          background: linear-gradient(135deg, #92400e, #d97706);
          box-shadow: 0 8px 28px rgba(245,158,11,0.5);
          transform: translateY(-2px);
        }
        .hbtn-outline {
          background: rgba(245,240,235,0.08);
          color: #f5f0eb;
          padding: 12px 26px;
          border-radius: 3px;
          border: 1px solid rgba(245,240,235,0.35);
          backdrop-filter: blur(4px);
        }
        .hbtn-outline:hover {
          background: rgba(245,240,235,0.15);
          border-color: rgba(245,240,235,0.7);
          transform: translateY(-2px);
        }
        .hbtn-label {
          font-family: 'Cinzel', serif;
          font-size: 10.5px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 600;
        }
      `}</style>

      {buttons.map((btn) => (
        <motion.div
          key={btn.to}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: btn.delay }}
        >
          <Link
            to={btn.to}
            className={`hbtn hbtn-${btn.style}`}
          >
            <span className="hbtn-label">{btn.label}</span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default HeroButtons;