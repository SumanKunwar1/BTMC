import React from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { NavItems } from '../config/navigation';
import EventRegistrationForm from './events/EventRegistrationForm';

const LOGO_URL =
  'https://res.cloudinary.com/dihev9qxc/image/upload/v1773154972/WhatsApp_Image_2026-03-10_at_15.26.43-removebg-preview_eixatv.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [regOpen, setRegOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  React.useEffect(() => { setIsOpen(false); }, [location.pathname]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Cormorant+Garamond:wght@400;500;600&display=swap');
        @keyframes shimmer-nav { 0%{background-position:0% 0%} 100%{background-position:200% 0%} }
        .nav-lnk {
          font-family:'Cinzel',serif; font-size:10.5px; letter-spacing:0.18em;
          text-transform:uppercase; color:#4a1818; text-decoration:none;
          position:relative; padding-bottom:3px; transition:color 0.25s;
        }
        .nav-lnk::after { content:''; position:absolute; bottom:0; left:0; width:0; height:1.5px; background:linear-gradient(90deg,#b91c1c,#d97706); transition:width 0.3s; }
        .nav-lnk:hover,.nav-lnk.active { color:#b91c1c; }
        .nav-lnk:hover::after,.nav-lnk.active::after { width:100%; }
        .sup-btn {
          font-family:'Cinzel',serif; font-size:10px; letter-spacing:0.18em;
          text-transform:uppercase; color:#fff; text-decoration:none;
          padding:10px 22px; border-radius:3px;
          background:linear-gradient(135deg,#991b1b,#b91c1c);
          box-shadow:0 4px 14px rgba(185,28,28,0.25); transition:all 0.3s;
        }
        .sup-btn:hover { box-shadow:0 6px 22px rgba(185,28,28,0.4); transform:translateY(-1px); background:linear-gradient(135deg,#7f1d1d,#991b1b); }
        .reg-btn {
          font-family:'Cinzel',serif; font-size:10px; letter-spacing:0.18em;
          text-transform:uppercase; color:#b91c1c; text-decoration:none;
          padding:9px 20px; border-radius:3px;
          border:1px solid rgba(185,28,28,0.4); background:transparent; transition:all 0.3s;
          cursor:pointer;
        }
        .reg-btn:hover { background:rgba(185,28,28,0.06); border-color:#b91c1c; transform:translateY(-1px); }
        .mob-lnk {
          font-family:'Cinzel',serif; font-size:11px; letter-spacing:0.18em;
          text-transform:uppercase; color:#4a1818; text-decoration:none; display:block;
          padding:13px 16px; border-radius:3px; border-left:2px solid transparent; transition:all 0.2s;
        }
        .mob-lnk:hover,.mob-lnk.active { color:#b91c1c; background:rgba(185,28,28,0.05); border-left-color:#b91c1c; }
        .desk-nav { display:none; }
        @media(min-width:900px){ .desk-nav{display:flex!important;} .mob-ham{display:none!important;} }
      `}</style>

      {/* Top shimmer bar */}
      <div style={{ position:'fixed', top:0, left:0, right:0, height:'2px', zIndex:101, background:'linear-gradient(90deg,#991b1b,#b91c1c,#d97706,#b91c1c,#991b1b)', backgroundSize:'200% 100%', animation:'shimmer-nav 5s linear infinite' }} />

      <nav style={{ position:'fixed', top:'2px', left:0, right:0, zIndex:100, background: scrolled ? 'rgba(253,248,243,0.98)' : 'rgba(253,248,243,0.96)', backdropFilter:'blur(14px)', borderBottom:'1px solid rgba(185,28,28,0.1)', boxShadow: scrolled ? '0 4px 28px rgba(185,28,28,0.1)' : '0 2px 12px rgba(185,28,28,0.05)', transition:'all 0.3s' }}>
        <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', height:'72px' }}>

          {/* Logo */}
          <Link to="/" style={{ display:'flex', alignItems:'center', gap:'12px', textDecoration:'none', flexShrink:0 }}>
            <img src={LOGO_URL} alt="BTMC Foundation" style={{ width:'52px', height:'60px', objectFit:'contain', filter:'drop-shadow(0 2px 6px rgba(185,28,28,0.15))', transition:'filter 0.3s' }}
              onMouseEnter={e=>(e.currentTarget as HTMLImageElement).style.filter='drop-shadow(0 4px 14px rgba(185,28,28,0.35))'}
              onMouseLeave={e=>(e.currentTarget as HTMLImageElement).style.filter='drop-shadow(0 2px 6px rgba(185,28,28,0.15))'}
            />
            <div>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:'20px', fontWeight:900, letterSpacing:'0.06em', background:'linear-gradient(135deg,#7f1d1d,#b91c1c)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', lineHeight:1.1 }}>BTMC</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'11px', letterSpacing:'0.28em', color:'#9a5a5a', textTransform:'uppercase', lineHeight:1 }}>Foundation</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'9px', letterSpacing:'0.18em', color:'#c4a0a0', fontStyle:'italic' }}>Peace · Wisdom · Compassion</div>
            </div>
          </Link>

          {/* Right side */}
          <div style={{ display:'flex', alignItems:'center', gap:'20px' }}>
            {/* Desktop links */}
            <div className="desk-nav" style={{ alignItems:'center', gap:'24px' }}>
              {NavItems.map((item) => (
                <Link key={item.path} to={item.path} className={`nav-lnk${location.pathname===item.path?' active':''}`}>{item.label}</Link>
              ))}
            </div>
            <div className="desk-nav" style={{ width:'1px', height:'20px', background:'rgba(185,28,28,0.15)' }} />

            {/* Register button — opens modal */}
            <button onClick={() => setRegOpen(true)} className="reg-btn desk-nav">Register</button>
            <Link to="/support" className="sup-btn desk-nav">Support Us</Link>

            {/* Hamburger */}
            <button className="mob-ham" onClick={()=>setIsOpen(!isOpen)} style={{ background:'rgba(185,28,28,0.06)', border:'1px solid rgba(185,28,28,0.18)', borderRadius:'3px', padding:'8px', cursor:'pointer', display:'flex', alignItems:'center' }}>
              {isOpen ? <X size={20} color="#b91c1c"/> : <Menu size={20} color="#b91c1c"/>}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div style={{ borderTop:'1px solid rgba(185,28,28,0.08)', background:'#fdf8f3', padding:'10px 16px 18px' }}>
            {NavItems.map(item=>(
              <Link key={item.path} to={item.path} className={`mob-lnk${location.pathname===item.path?' active':''}`}>{item.label}</Link>
            ))}
            <div style={{ marginTop:'12px' }}>
              {/* Register button in mobile — opens modal */}
              <button onClick={() => { setIsOpen(false); setRegOpen(true); }} className="reg-btn" style={{ display:'block', textAlign:'center', marginBottom:'8px', width:'100%' }}>Register</button>
              <Link to="/support" className="sup-btn" style={{ display:'block', textAlign:'center' }}>Support Us</Link>
            </div>
          </div>
        )}
      </nav>
      <div style={{ height:'74px' }} />

      {/* Registration Modal */}
      <EventRegistrationForm
        isOpen={regOpen}
        onClose={() => setRegOpen(false)}
        onSubmit={() => setRegOpen(false)}
        eventTitle="BTMC Foundation Event"
      />
    </>
  );
};

export default Navbar;