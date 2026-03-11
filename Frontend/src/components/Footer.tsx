import { Mail, Phone, MapPin } from 'lucide-react';

const LOGO_URL = 'https://res.cloudinary.com/dihev9qxc/image/upload/v1773154972/WhatsApp_Image_2026-03-10_at_15.26.43-removebg-preview_eixatv.png';

const Footer = () => (
  <footer style={{ background:'#1a0808', color:'#f5eeee' }}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700&family=Crimson+Text:wght@400;600&display=swap');
      .fl { font-family:'Crimson Text',serif; font-size:16px; color:rgba(245,238,238,0.5); text-decoration:none; display:block; padding:3px 0; transition:color 0.2s; }
      .fl:hover { color:#e8a0a0; }
      .fi { padding:11px 14px; width:100%; box-sizing:border-box; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius:3px; color:#f5eeee; font-family:'Crimson Text',serif; font-size:15px; outline:none; transition:border-color 0.2s; }
      .fi::placeholder { color:rgba(245,238,238,0.25); }
      .fi:focus { border-color:rgba(185,28,28,0.5); }
      .fsub { width:100%; padding:11px; background:linear-gradient(135deg,#991b1b,#b91c1c); color:#fff; border:none; border-radius:3px; font-family:'Cinzel',serif; font-size:10px; letter-spacing:0.22em; text-transform:uppercase; font-weight:600; cursor:pointer; transition:all 0.3s; box-shadow:0 4px 14px rgba(185,28,28,0.3); }
      .fsub:hover { background:linear-gradient(135deg,#7f1d1d,#991b1b); box-shadow:0 6px 20px rgba(185,28,28,0.5); }
      .fhead { font-family:'Cinzel',serif; font-size:12px; letter-spacing:0.25em; color:#f5eeee; text-transform:uppercase; margin-bottom:18px; padding-bottom:10px; border-bottom:1px solid rgba(185,28,28,0.2); }
      .frow { display:flex; align-items:flex-start; gap:10px; padding:5px 0; }
    `}</style>

    <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'60px 24px 36px', position:'relative' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:'36px 48px', marginBottom:'48px' }}>

        {/* Brand */}
        <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
            <img src={LOGO_URL} alt="BTMC" style={{ width:'50px', height:'56px', objectFit:'contain', filter:'drop-shadow(0 2px 6px rgba(185,28,28,0.3))' }} />
            <div>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:'18px', fontWeight:900, letterSpacing:'0.06em', background:'linear-gradient(135deg,#fde8e8,#e8a0a0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>BTMC</div>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', letterSpacing:'0.28em', color:'rgba(245,238,238,0.4)', textTransform:'uppercase' }}>Foundation</div>
            </div>
          </div>
          <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'15px', color:'rgba(245,238,238,0.4)', lineHeight:1.7, fontStyle:'italic' }}>Spreading the light of Dharma — peace, wisdom &amp; compassion for all beings.</p>
          <div style={{ display:'flex', gap:'10px' }}>{['☸','🙏','🌸'].map(s=><span key={s} style={{ fontSize:'18px', opacity:0.35 }}>{s}</span>)}</div>
        </div>

        {/* Contact */}
        <div>
          <div className="fhead">Contact Us</div>
          <div className="frow"><MapPin size={14} color="#e8a0a0" style={{ marginTop:'3px', flexShrink:0 }} /><span style={{ fontFamily:"'Crimson Text',serif", fontSize:'15px', color:'rgba(245,238,238,0.5)', lineHeight:1.6 }}>Jorpati, Gokarneswar-5,<br/>Pragati Marg, Kathmandu, Nepal</span></div>
          <div className="frow"><Phone size={14} color="#e8a0a0" style={{ marginTop:'3px', flexShrink:0 }} /><div><a href="https://wa.me/9779849118562" target="_blank" rel="noopener noreferrer" className="fl">+977-9849118562</a><a href="https://wa.me/9779818123174" target="_blank" rel="noopener noreferrer" className="fl">+977-9818123174</a></div></div>
          <div className="frow"><Mail size={14} color="#e8a0a0" style={{ marginTop:'3px', flexShrink:0 }} /><a href="mailto:info@btmcfoundation.org" className="fl">info@btmcfoundation.org</a></div>
        </div>

        {/* Quick Links */}
        <div>
          <div className="fhead">Quick Links</div>
          {[{href:'/about',label:'About Us'},{href:'/teachings',label:'Teachings'},{href:'/events',label:'Events & Retreats'},{href:'/support',label:'Support Us'},{href:'/contact',label:'Contact'}].map(l=><a key={l.href} href={l.href} className="fl">{l.label}</a>)}
        </div>

        {/* Resources */}
        <div>
          <div className="fhead">Resources</div>
          {[{href:'/blog',label:'Blog'},{href:'/gallery',label:'Gallery'},{href:'/team',label:'Our Team'},{href:'/faq',label:'FAQ'},{href:'/career',label:'Career'}].map(l=><a key={l.href} href={l.href} className="fl">{l.label}</a>)}
        </div>

        {/* Newsletter */}
        <div>
          <div className="fhead">Newsletter</div>
          <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'15px', color:'rgba(245,238,238,0.4)', marginBottom:'14px', lineHeight:1.6 }}>Subscribe to receive updates about our activities and events.</p>
          <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
            <input type="email" placeholder="Enter your email" className="fi" />
            <button type="button" className="fsub">Subscribe</button>
          </div>
        </div>
      </div>

      <div style={{ height:'1px', background:'linear-gradient(90deg,transparent,rgba(185,28,28,0.3),rgba(217,119,6,0.2),rgba(185,28,28,0.3),transparent)', marginBottom:'22px' }} />
      <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:'10px' }}>
        <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'14px', color:'rgba(245,238,238,0.25)' }}>© {new Date().getFullYear()} BTMC Foundation. All rights reserved.</p>
        <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'14px', color:'rgba(245,238,238,0.2)', fontStyle:'italic' }}>Peace · Wisdom · Compassion</p>
      </div>
    </div>
  </footer>
);

export default Footer;