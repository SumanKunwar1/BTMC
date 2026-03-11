import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const buttons = [
  { to:'/teachings', label:'Enroll in a Course', style:'primary', delay:0.85 },
  { to:'/events',    label:'Join a Retreat',    style:'gold',    delay:0.95 },
  { to:'/support',   label:'Donate Now',        style:'outline', delay:1.05 },
];

const HeroButtons = () => (
  <div style={{ display:'flex', flexWrap:'wrap', gap:'14px' }}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&display=swap');
      .hb { transition:all 0.3s cubic-bezier(0.23,1,0.32,1); text-decoration:none; display:inline-flex; align-items:center; }
      .hb-primary { background:linear-gradient(135deg,#991b1b,#b91c1c); color:#fff; padding:13px 26px; border-radius:3px; box-shadow:0 6px 20px rgba(185,28,28,0.3); }
      .hb-primary:hover { background:linear-gradient(135deg,#7f1d1d,#991b1b); box-shadow:0 8px 28px rgba(185,28,28,0.45); transform:translateY(-2px); }
      .hb-gold { background:linear-gradient(135deg,#b45309,#d97706); color:#fff; padding:13px 26px; border-radius:3px; box-shadow:0 6px 20px rgba(217,119,6,0.25); }
      .hb-gold:hover { background:linear-gradient(135deg,#92400e,#b45309); box-shadow:0 8px 28px rgba(217,119,6,0.4); transform:translateY(-2px); }
      .hb-outline { background:rgba(255,255,255,0.75); color:#b91c1c; padding:12px 26px; border-radius:3px; border:1.5px solid rgba(185,28,28,0.45); backdrop-filter:blur(4px); }
      .hb-outline:hover { background:rgba(255,255,255,0.95); border-color:#b91c1c; transform:translateY(-2px); box-shadow:0 6px 20px rgba(185,28,28,0.15); }
      .hb-label { font-family:'Cinzel',serif; font-size:10.5px; letter-spacing:0.22em; text-transform:uppercase; font-weight:600; }
    `}</style>
    {buttons.map(btn=>(
      <motion.div key={btn.to} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:btn.delay }}>
        <Link to={btn.to} className={`hb hb-${btn.style}`}><span className="hb-label">{btn.label}</span></Link>
      </motion.div>
    ))}
  </div>
);

export default HeroButtons;