import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SL = { height:'1px', background:'linear-gradient(90deg,transparent,rgba(185,28,28,0.2),rgba(217,119,6,0.15),rgba(185,28,28,0.2),transparent)' };

const BriefAboutSection = () => (
  <section style={{ background:'#fef9f4', padding:'100px 24px', position:'relative', overflow:'hidden' }}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
      .about-lnk { display:inline-flex; align-items:center; gap:10px; font-family:'Cinzel',serif; font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:#b91c1c; text-decoration:none; padding-bottom:4px; border-bottom:1px solid rgba(185,28,28,0.3); transition:all 0.25s; }
      .about-lnk:hover { color:#991b1b; border-bottom-color:#991b1b; gap:14px; }
    `}</style>
    <div style={{ ...SL, position:'absolute', top:0, left:0, right:0 } as any} />

    {/* Ghost text */}
    <div style={{ position:'absolute', top:'50%', right:'-2%', transform:'translateY(-50%)', fontFamily:"'Cinzel',serif", fontSize:'clamp(80px,14vw,200px)', fontWeight:900, color:'rgba(185,28,28,0.04)', userSelect:'none', pointerEvents:'none', lineHeight:1, letterSpacing:'-0.04em' }}>BTMC</div>

    <div style={{ maxWidth:'1200px', margin:'0 auto', position:'relative', zIndex:2 }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'70px', alignItems:'center' }}>

        {/* Image */}
        <motion.div initial={{ opacity:0, x:-50 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:false }} transition={{ duration:0.8 }} style={{ position:'relative' }}>
          <div style={{ borderRadius:'6px', overflow:'hidden', border:'1px solid rgba(185,28,28,0.15)', boxShadow:'0 20px 60px rgba(185,28,28,0.12)' }}>
            <motion.img src="https://res.cloudinary.com/dihev9qxc/image/upload/v1762067523/a-harmonious-collage-style-illustration-_ldwA_JRIQFmvzQgbkHNb4w_e8L27cIHRRC36jH5ipdKXg_jvdxn6.jpg"
              alt="BTMC Foundation" style={{ width:'100%', height:'420px', objectFit:'cover', display:'block' }}
              whileHover={{ scale:1.04 }} transition={{ duration:0.6 }} />
          </div>
          {/* Est. badge */}
          <motion.div initial={{ scale:0 }} whileInView={{ scale:1 }} viewport={{ once:false }} transition={{ duration:0.5, delay:0.5 }}
            style={{ position:'absolute', bottom:'-20px', right:'-20px', width:'100px', height:'100px', background:'linear-gradient(135deg,#991b1b,#b91c1c)', borderRadius:'6px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'3px', boxShadow:'0 10px 30px rgba(185,28,28,0.3)' }}>
            <span style={{ fontSize:'20px' }}>🙏</span>
            <span style={{ fontFamily:"'Cinzel',serif", fontSize:'8px', letterSpacing:'0.15em', color:'rgba(255,255,255,0.9)', textAlign:'center', lineHeight:1.4 }}>EST.<br/>2003</span>
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div initial={{ opacity:0, x:50 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:false }} transition={{ duration:0.8 }} style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
          <div>
            <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:false }} transition={{ delay:0.2 }} style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', letterSpacing:'0.4em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'10px' }}>Who We Are</motion.p>
            <motion.h2 initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:false }} transition={{ delay:0.25, duration:0.6 }} style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(20px,3vw,36px)', fontWeight:700, color:'#1a0808', lineHeight:1.15 }}>About BTMC Foundation</motion.h2>
          </div>
          <div style={{ width:'60px', height:'2px', background:'linear-gradient(90deg,#b91c1c,transparent)' }} />
          <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:false }} transition={{ delay:0.35, duration:0.6 }} style={{ fontFamily:"'Crimson Text',serif", fontSize:'clamp(16px,1.8vw,19px)', color:'#5a3030', lineHeight:1.85 }}>
            Established in <strong style={{ color:'#1a0808' }}>2003</strong> under the compassionate guidance of <em>Venerable Khen Rinpoche Sonam Gyurme</em>, <strong style={{ color:'#1a0808' }}>BTMC Foundation</strong> stands as a beacon of wisdom and compassion — devoted to <strong style={{ color:'#1a0808' }}>Buddhist education, meditation, and public welfare</strong>.
          </motion.p>
          <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:false }} transition={{ delay:0.45, duration:0.6 }} style={{ fontFamily:"'Crimson Text',serif", fontSize:'clamp(15px,1.6vw,17px)', color:'#a07070', lineHeight:1.85 }}>
            Rooted in the timeless teachings of the Buddha, our mission is to preserve and share authentic Dharma — nurturing a peaceful environment where all beings can grow spiritually.
          </motion.p>

          {/* Mini stats */}
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:false }} transition={{ delay:0.5 }} style={{ display:'flex', gap:'28px', flexWrap:'wrap', margin:'8px 0' }}>
            {[{ val:'20+', label:'Years' },{ val:'7', label:'Institutions' },{ val:'5K+', label:'Practitioners' }].map(s=>(
              <div key={s.label} style={{ textAlign:'center' }}>
                <div style={{ fontFamily:"'Cinzel',serif", fontSize:'22px', fontWeight:900, color:'#b91c1c', lineHeight:1 }}>{s.val}</div>
                <div style={{ fontFamily:"'Cinzel',serif", fontSize:'8px', letterSpacing:'0.2em', color:'#a07070', textTransform:'uppercase', marginTop:'4px' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:false }} transition={{ delay:0.55 }}>
            <Link to="/about" className="about-lnk">Discover Our Story <span style={{ fontSize:'14px' }}>→</span></Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
    <div style={{ ...SL, position:'absolute', bottom:0, left:0, right:0 } as any} />
  </section>
);

export default BriefAboutSection;