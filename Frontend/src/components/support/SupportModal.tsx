import type React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import DonationFormBase from './DonationForm';

// Cast DonationForm to accept the props we need — fix for TS2322
const DonationForm = DonationFormBase as React.ComponentType<{ supportType?: string; onSuccess?: () => void }>;

interface SupportWay {
  title: string;
  description: string;
  fullDescription: string;
  benefits: string[];
  icon: React.ComponentType<any>;
  image: string;
}

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  supportWay: SupportWay | null;
}

const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose, supportWay }) => {
  if (!supportWay) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          style={{ position:'fixed', inset:0, background:'rgba(26,8,8,0.55)', zIndex:50, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px', backdropFilter:'blur(4px)' }}
          initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
          onClick={e => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            style={{ background:'#fff', border:'1px solid rgba(185,28,28,0.15)', borderRadius:'6px', width:'100%', maxWidth:'560px', maxHeight:'90vh', overflow:'hidden', display:'flex', flexDirection:'column', boxShadow:'0 24px 60px rgba(26,8,8,0.18)' }}
            initial={{ scale:0.92, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.92, opacity:0 }}
          >
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;1,400&family=Crimson+Text:wght@400;600&display=swap');`}</style>

            {/* Header */}
            <div style={{ padding:'18px 22px', borderBottom:'1px solid rgba(185,28,28,0.1)', background:'rgba(185,28,28,0.03)', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
              <div>
                <p style={{ fontFamily:"'Cinzel',serif", fontSize:'8px', letterSpacing:'0.35em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'4px' }}>Ways to Give</p>
                <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'18px', fontWeight:700, color:'#1a0808' }}>{supportWay.title}</h2>
              </div>
              <button
                onClick={onClose}
                style={{ background:'rgba(185,28,28,0.06)', border:'1px solid rgba(185,28,28,0.15)', borderRadius:'50%', width:'35px', height:'35px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}
              >
                <X size={14} color="#a07070"/>
              </button>
            </div>

            <div style={{ flex:1, overflowY:'auto', padding:'22px', display:'flex', flexDirection:'column', gap:'22px' }}>
              {/* Image */}
              <div style={{ borderRadius:'4px', overflow:'hidden', border:'1px solid rgba(185,28,28,0.1)', height:'180px', boxShadow:'0 2px 12px rgba(185,28,28,0.06)' }}>
                <img src={supportWay.image} alt={supportWay.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
              </div>

              <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'18px', color:'#5a3030', lineHeight:1.85 }}>{supportWay.fullDescription}</p>

              <div>
                <p style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.3em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'12px' }}>Benefits</p>
                <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                  {supportWay.benefits.map((benefit, i) => (
                    <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'10px' }}>
                      <CheckCircle size={14} color="#b91c1c" style={{ marginTop:'3px', flexShrink:0 }}/>
                      <span style={{ fontFamily:"'Crimson Text',serif", fontSize:'16px', color:'#6b3333', lineHeight:1.6 }}>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ height:'1px', background:'linear-gradient(90deg,transparent,rgba(185,28,28,0.15),transparent)' }} />

              <div>
                <p style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.3em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'16px' }}>Support Now</p>
                <DonationForm supportType={supportWay.title} onSuccess={onClose}/>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SupportModal;