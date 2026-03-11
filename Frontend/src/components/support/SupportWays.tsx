import type React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SupportModal from './SupportModal';

interface SupportWay { title:string; description:string; fullDescription:string; benefits:string[]; icon:React.ComponentType<any>; image:string; emoji:string; }

const Heart=()=><span>❤️</span>, Users=()=><span>👥</span>, Briefcase=()=><span>💼</span>, BookOpen=()=><span>📚</span>;

const supportWays: SupportWay[] = [
  { title:'One-time Donation', description:'Make a one-time contribution to support our mission', fullDescription:'Your one-time donation provides immediate support for our programs and helps us respond quickly to community needs.', benefits:['Direct impact on programs','Tax-deductible donation','Receive donation receipt','Support our mission immediately'], icon:Heart, image:'https://images.unsplash.com/photo-1532996122724-8f3c2cd83c5d?auto=format&fit=crop&q=80', emoji:'💝' },
  { title:'Monthly Giving', description:'Become a sustaining member with regular donations', fullDescription:'Become a sustaining member with monthly donations to provide consistent support for our long-term initiatives.', benefits:['Consistent monthly impact','Tax benefits','Recognition in community','Flexible monthly amount'], icon:Users, image:'https://images.unsplash.com/photo-1559027615-cd1628902249?auto=format&fit=crop&q=80', emoji:'🌱' },
  { title:'Volunteer', description:'Contribute your time and skills to support us', fullDescription:'Join our volunteer team and help us deliver quality programs and services to our community.', benefits:['Make a personal impact','Build community connections','Develop new skills','Flexible time commitment'], icon:Briefcase, image:'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80', emoji:'🤝' },
  { title:'In-Kind Donation', description:'Donate goods or services to support our mission', fullDescription:'Contribute material goods or professional services to help us expand our reach and impact.', benefits:['Tax deductible','Recycled resources','Community partnerships','Special recognition'], icon:BookOpen, image:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80', emoji:'📦' },
];

const SL = { height:'1px', background:'linear-gradient(90deg,transparent,rgba(185,28,28,0.2),rgba(217,119,6,0.15),rgba(185,28,28,0.2),transparent)' };

const SupportWays = () => {
  const [selectedWay, setSelectedWay] = useState<SupportWay|null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section style={{ background:'#fdf8f3', padding:'80px 24px', position:'relative' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Crimson+Text:wght@400;600&display=swap');
        .sw-card { background:#fff; border:1px solid rgba(185,28,28,0.1); border-radius:6px; padding:28px 22px; display:flex; flex-direction:column; gap:14px; transition:all 0.4s cubic-bezier(0.23,1,0.32,1); position:relative; overflow:hidden; box-shadow:0 2px 12px rgba(185,28,28,0.04); }
        .sw-card::after { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,#b91c1c,transparent); transform:scaleX(0); transition:transform 0.4s; }
        .sw-card:hover { border-color:rgba(185,28,28,0.3); transform:translateY(-5px); box-shadow:0 16px 40px rgba(185,28,28,0.1); }
        .sw-card:hover::after { transform:scaleX(1); }
        .sw-btn { display:inline-flex; align-items:center; gap:7px; margin-top:auto; font-family:'Cinzel',serif; font-size:9.5px; letter-spacing:0.2em; text-transform:uppercase; color:#b91c1c; background:none; border:none; cursor:pointer; padding:0; transition:gap 0.2s; }
        .sw-btn:hover { gap:11px; color:#991b1b; }
      `}</style>
      <div style={{ ...SL, position:'absolute', top:0, left:0, right:0 } as any}/>
      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:false }} transition={{ duration:0.7 }} style={{ textAlign:'center', marginBottom:'56px' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'14px', marginBottom:'16px' }}>
            <div style={{ height:'1px', width:'50px', background:'linear-gradient(90deg,transparent,rgba(185,28,28,0.4))' }} />
            <span style={{ fontSize:'18px' }}>🌸</span>
            <div style={{ height:'1px', width:'50px', background:'linear-gradient(90deg,rgba(185,28,28,0.4),transparent)' }} />
          </div>
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', letterSpacing:'0.4em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'12px' }}>Give with Heart</p>
          <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(22px,3vw,40px)', fontWeight:700, color:'#1a0808', marginBottom:'10px' }}>Ways to Support</h2>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'18px', fontStyle:'italic', color:'#a07070' }}>Choose how you'd like to contribute to our mission</p>
        </motion.div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:'22px' }}>
          {supportWays.map((way,i)=>(
            <motion.div key={i} className="sw-card" initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:false }} transition={{ delay:i*0.12, duration:0.55 }}>
              <div style={{ fontSize:'34px' }}>{way.emoji}</div>
              <div style={{ width:'32px', height:'1px', background:'linear-gradient(90deg,#b91c1c,transparent)' }} />
              <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', fontWeight:700, color:'#1a0808', lineHeight:1.3, letterSpacing:'0.04em' }}>{way.title}</h3>
              <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'16px', color:'#6b3333', lineHeight:1.7 }}>{way.description}</p>
              <button className="sw-btn" onClick={()=>{ setSelectedWay(way); setIsModalOpen(true); }}>Learn More <ArrowRight size={11}/></button>
            </motion.div>
          ))}
        </div>
      </div>
      <div style={{ ...SL, position:'absolute', bottom:0, left:0, right:0 } as any}/>
      <SupportModal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} supportWay={selectedWay}/>
    </section>
  );
};

export default SupportWays;