import { motion } from 'framer-motion';
import { useState, ChangeEvent } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name:'', email:'', subject:'', inquiry:'' });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string|null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setSubmitted(true);
    setFormData({ name:'', email:'', subject:'', inquiry:'' });
    setTimeout(()=>setSubmitted(false), 5000);
  };

  const inp = (field:string): React.CSSProperties => ({
    width:'100%', padding:'12px 16px', boxSizing:'border-box',
    background:'#fff',
    border:`1px solid ${focused===field?'#b91c1c':'rgba(185,28,28,0.2)'}`,
    borderRadius:'4px', color:'#1a0808',
    fontFamily:"'Crimson Text',serif", fontSize:'17px',
    outline:'none', transition:'border-color 0.2s, box-shadow 0.2s',
    boxShadow: focused===field?'0 0 0 3px rgba(185,28,28,0.08)':'none',
  });
  const lbl: React.CSSProperties = { fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.28em', color:'#a07070', textTransform:'uppercase', display:'block', marginBottom:'6px' };
  const SL = { height:'1px', background:'linear-gradient(90deg,transparent,rgba(185,28,28,0.2),rgba(217,119,6,0.15),rgba(185,28,28,0.2),transparent)' };

  return (
    <div style={{ background:'#fdf8f3', minHeight:'100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700;900&family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Crimson+Text:wght@400;600&display=swap');
        .ci-row { display:flex; align-items:flex-start; gap:14px; padding:14px 0; border-bottom:1px solid rgba(185,28,28,0.07); }
        .ci-row:last-child { border-bottom:none; }
        .ci-a { font-family:'Crimson Text',serif; font-size:17px; color:#5a3030; text-decoration:none; display:block; line-height:1.6; transition:color 0.2s; }
        .ci-a:hover { color:#b91c1c; }
        .csub { width:100%; padding:14px; background:linear-gradient(135deg,#991b1b,#b91c1c); color:#fff; border:none; border-radius:4px; font-family:'Cinzel',serif; font-size:11px; letter-spacing:0.25em; text-transform:uppercase; font-weight:700; cursor:pointer; box-shadow:0 6px 20px rgba(185,28,28,0.25); transition:all 0.3s; display:flex; align-items:center; justify-content:center; gap:10px; }
        .csub:hover { background:linear-gradient(135deg,#7f1d1d,#991b1b); box-shadow:0 8px 28px rgba(185,28,28,0.4); transform:translateY(-1px); }
        input::placeholder, textarea::placeholder { color:rgba(26,8,8,0.25)!important; }
      `}</style>

      {/* Hero */}
      <section style={{ position:'relative', padding:'80px 24px', background:'linear-gradient(180deg,rgba(185,28,28,0.06) 0%,rgba(253,248,243,1) 100%)', textAlign:'center', overflow:'hidden' }}>
        {[200,320,440].map(size=><div key={size} style={{ position:'absolute', borderRadius:'50%', border:'1px solid rgba(185,28,28,0.07)', width:size, height:size, top:'50%', left:'50%', transform:'translate(-50%,-50%)', pointerEvents:'none' }} />)}
        <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }} style={{ position:'relative', zIndex:2 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'14px', marginBottom:'18px' }}>
            <div style={{ height:'1px', width:'50px', background:'linear-gradient(90deg,transparent,#b91c1c)' }} />
            <span style={{ fontSize:'20px' }}>✉️</span>
            <div style={{ height:'1px', width:'50px', background:'linear-gradient(90deg,#b91c1c,transparent)' }} />
          </div>
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', letterSpacing:'0.4em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'14px' }}>Reach Out</p>
          <h1 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(30px,5.5vw,62px)', fontWeight:900, color:'#1a0808', lineHeight:1, marginBottom:'14px' }}>Contact Us</h1>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(16px,2vw,20px)', fontStyle:'italic', color:'#a07070', fontWeight:300 }}>We'd love to hear from you</p>
        </motion.div>
      </section>

      <div style={SL as any} />

      {/* Form + Info */}
      <section style={{ padding:'80px 24px', maxWidth:'1200px', margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'60px' }}>
          {/* Form */}
          <motion.div initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:false }} transition={{ duration:0.8 }}>
            <p style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.3em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'10px' }}>Send a Message</p>
            <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(18px,2.5vw,28px)', fontWeight:700, color:'#1a0808', marginBottom:'30px' }}>Write to Us</h2>
            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'18px' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
                <div><label style={lbl}>Full Name *</label><input type="text" name="name" required value={formData.name} onChange={handleChange} onFocus={()=>setFocused('name')} onBlur={()=>setFocused(null)} placeholder="Your name" style={inp('name')} /></div>
                <div><label style={lbl}>Email *</label><input type="email" name="email" required value={formData.email} onChange={handleChange} onFocus={()=>setFocused('email')} onBlur={()=>setFocused(null)} placeholder="your@email.com" style={inp('email')} /></div>
              </div>
              <div><label style={lbl}>Subject *</label><input type="text" name="subject" required value={formData.subject} onChange={handleChange} onFocus={()=>setFocused('subject')} onBlur={()=>setFocused(null)} placeholder="What is this regarding?" style={inp('subject')} /></div>
              <div><label style={lbl}>Message *</label><textarea name="inquiry" required value={formData.inquiry} onChange={handleChange} onFocus={()=>setFocused('inquiry')} onBlur={()=>setFocused(null)} placeholder="Tell us more…" rows={5} style={{ ...inp('inquiry'), resize:'vertical', minHeight:'120px' }} /></div>
              {submitted && <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} style={{ display:'flex', alignItems:'center', gap:'10px', padding:'13px 16px', background:'rgba(22,163,74,0.08)', border:'1px solid rgba(22,163,74,0.3)', borderRadius:'4px', fontFamily:"'Cinzel',serif", fontSize:'10px', letterSpacing:'0.15em', color:'#16a34a' }}><Check size={14}/> Message sent — we'll be in touch soon!</motion.div>}
              <button type="submit" className="csub"><Send size={14}/> Send Message</button>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:false }} transition={{ duration:0.8 }} style={{ display:'flex', flexDirection:'column', gap:'24px' }}>
            <div>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.3em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'10px' }}>Get in Touch</p>
              <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(18px,2.5vw,28px)', fontWeight:700, color:'#1a0808', marginBottom:'14px' }}>Contact Information</h2>
              <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'17px', color:'#6b3333', lineHeight:1.75 }}>Have questions about our programs, meditation courses, or events? We'd love to hear from you.</p>
            </div>

            <div style={{ background:'#fff', border:'1px solid rgba(185,28,28,0.1)', borderRadius:'6px', padding:'22px', boxShadow:'0 2px 12px rgba(185,28,28,0.05)' }}>
              {[
                { icon:<MapPin size={15} color="#b91c1c"/>, label:'Address', content:<p style={{ fontFamily:"'Crimson Text',serif", fontSize:'17px', color:'#5a3030', lineHeight:1.65 }}>BTMC Foundation, Jorpati,<br/>Gokarneswar-5, Pragati Marg,<br/>Kathmandu, Nepal</p> },
                { icon:<Phone size={15} color="#b91c1c"/>, label:'WhatsApp / Phone', content:<><a href="https://wa.me/9779849118562" target="_blank" rel="noopener noreferrer" className="ci-a">+977-9849118562</a><a href="https://wa.me/9779818123174" target="_blank" rel="noopener noreferrer" className="ci-a">+977-9818123174</a></> },
                { icon:<Mail size={15} color="#b91c1c"/>, label:'Email', content:<a href="mailto:info@btmcfoundation.org" className="ci-a">info@btmcfoundation.org</a> },
              ].map(row=>(
                <div key={row.label} className="ci-row">
                  <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'rgba(185,28,28,0.07)', border:'1px solid rgba(185,28,28,0.18)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{row.icon}</div>
                  <div><p style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.18em', color:'#a07070', textTransform:'uppercase', marginBottom:'4px' }}>{row.label}</p>{row.content}</div>
                </div>
              ))}
            </div>

            <div style={{ background:'rgba(185,28,28,0.04)', border:'1px solid rgba(185,28,28,0.1)', borderRadius:'6px', padding:'22px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}><Clock size={14} color="#b91c1c"/><p style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', letterSpacing:'0.25em', color:'#1a0808', textTransform:'uppercase' }}>Office Hours</p></div>
              {[{ day:'Sunday – Thursday', time:'9:00 AM – 5:00 PM' },{ day:'Friday', time:'10:00 AM – 3:00 PM' },{ day:'Saturday', time:'Closed' }].map(row=>(
                <div key={row.day} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:'12px', marginBottom:'7px' }}>
                  <span style={{ fontFamily:"'Crimson Text',serif", fontSize:'16px', color:'#6b3333' }}>{row.day}</span>
                  <span style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', letterSpacing:'0.1em', color: row.time==='Closed'?'#b91c1c':'#a07070' }}>{row.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div style={SL as any} />

      {/* Map */}
      <section style={{ padding:'60px 24px', maxWidth:'1200px', margin:'0 auto' }}>
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:false }} transition={{ duration:0.8 }} style={{ borderRadius:'6px', overflow:'hidden', border:'1px solid rgba(185,28,28,0.15)', boxShadow:'0 12px 40px rgba(185,28,28,0.1)', height:'420px' }}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1765.9625840525828!2d85.3403874!3d27.7375881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190011545255:0xca8e5c9afa20eaeb!2sP8QR%2B25J%2C%20Ring%20Rd%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1717907677167"
            width="100%" height="100%" style={{ border:0, display:'block' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </motion.div>
      </section>
    </div>
  );
};

export default ContactPage;