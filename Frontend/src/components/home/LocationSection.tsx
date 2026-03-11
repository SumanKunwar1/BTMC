import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

const SL = { height:'1px', background:'linear-gradient(90deg,transparent,rgba(185,28,28,0.2),rgba(217,119,6,0.15),rgba(185,28,28,0.2),transparent)' };

const LocationSection = () => (
  <section style={{ background:'#fef9f4', padding:'100px 24px', position:'relative' }}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Crimson+Text:wght@400;600&display=swap');
      .loc-row { display:flex; align-items:flex-start; gap:14px; padding:14px 0; border-bottom:1px solid rgba(185,28,28,0.08); }
      .loc-row:last-child { border-bottom:none; }
      .loc-dir { display:inline-flex; align-items:center; gap:10px; font-family:'Cinzel',serif; font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:#b91c1c; text-decoration:none; padding-bottom:3px; border-bottom:1px solid rgba(185,28,28,0.3); transition:all 0.25s; }
      .loc-dir:hover { color:#991b1b; gap:14px; }
      .loc-a { font-family:'Crimson Text',serif; font-size:17px; color:#5a3030; text-decoration:none; display:block; line-height:1.6; transition:color 0.2s; }
      .loc-a:hover { color:#b91c1c; }
    `}</style>
    <div style={{ ...SL, position:'absolute', top:0, left:0, right:0 } as any} />
    <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
      <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:false }} transition={{ duration:0.7 }} style={{ textAlign:'center', marginBottom:'60px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'14px', marginBottom:'16px' }}>
          <div style={{ height:'1px', width:'50px', background:'linear-gradient(90deg,transparent,rgba(185,28,28,0.4))' }} />
          <span style={{ fontSize:'18px' }}>📍</span>
          <div style={{ height:'1px', width:'50px', background:'linear-gradient(90deg,rgba(185,28,28,0.4),transparent)' }} />
        </div>
        <p style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', letterSpacing:'0.4em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'12px' }}>Find Us</p>
        <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(22px,3.5vw,40px)', fontWeight:700, color:'#1a0808' }}>Our Location</h2>
      </motion.div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'60px', alignItems:'start' }}>
        <motion.div initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:false }} transition={{ duration:0.8 }} style={{ display:'flex', flexDirection:'column', gap:'28px' }}>
          <div>
            <p style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.3em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'8px' }}>Meditation Center</p>
            <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(16px,2vw,22px)', fontWeight:700, color:'#1a0808', lineHeight:1.2 }}>BTMC Foundation<br/>Meditation Center</h3>
          </div>
          <div style={{ width:'50px', height:'2px', background:'linear-gradient(90deg,#b91c1c,transparent)' }} />

          <div style={{ background:'#fff', border:'1px solid rgba(185,28,28,0.1)', borderRadius:'6px', padding:'20px', boxShadow:'0 2px 12px rgba(185,28,28,0.05)' }}>
            {[
              { icon:<MapPin size={15} color="#b91c1c"/>, label:'Address', content:<p style={{ fontFamily:"'Crimson Text',serif", fontSize:'17px', color:'#5a3030', lineHeight:1.65 }}>BTMC Foundation, Jorpati,<br/>Gokarneswar-5, Pragati Marg,<br/>Kathmandu, Nepal</p> },
              { icon:<Phone size={15} color="#b91c1c"/>, label:'WhatsApp / Phone', content:<><a href="https://wa.me/9779849118562" target="_blank" rel="noopener noreferrer" className="loc-a">+977-9849118562</a><a href="https://wa.me/9779818123174" target="_blank" rel="noopener noreferrer" className="loc-a">+977-9818123174</a></> },
              { icon:<Mail size={15} color="#b91c1c"/>, label:'Email', content:<a href="mailto:info@btmcfoundation.org" className="loc-a">info@btmcfoundation.org</a> },
            ].map(row=>(
              <div key={row.label} className="loc-row">
                <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'rgba(185,28,28,0.08)', border:'1px solid rgba(185,28,28,0.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{row.icon}</div>
                <div>
                  <p style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.18em', color:'#a07070', textTransform:'uppercase', marginBottom:'4px' }}>{row.label}</p>
                  {row.content}
                </div>
              </div>
            ))}
          </div>

          <a href="https://maps.google.com/?q=Jorpati,Gokarnewar,Kathmandu,Nepal" target="_blank" rel="noopener noreferrer" className="loc-dir">Get Directions →</a>
        </motion.div>

        <motion.div initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:false }} transition={{ duration:0.8 }}
          style={{ borderRadius:'6px', overflow:'hidden', border:'1px solid rgba(185,28,28,0.15)', boxShadow:'0 12px 40px rgba(185,28,28,0.1)', height:'420px' }}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.407437805686!2d85.372373!3d27.7189136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1b48aba75f4f%3A0xf0ea8f4c2b765e31!2sDharma%20Television%20HD!5e0!3m2!1sen!2snp!4v1719999999999"
            width="100%" height="100%" style={{ border:0, display:'block' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </motion.div>
      </div>
    </div>
    <div style={{ ...SL, position:'absolute', bottom:0, left:0, right:0 } as any} />
  </section>
);

export default LocationSection;