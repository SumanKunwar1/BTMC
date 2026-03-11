// EnrollmentForm.tsx — light theme
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { EnrollmentFormData } from '../../types/course';

interface EnrollmentFormProps { isOpen:boolean; onClose:()=>void; onSubmit:(data:EnrollmentFormData)=>void; courseTitle:string; }

const EnrollmentForm: React.FC<EnrollmentFormProps> = ({ isOpen, onClose, onSubmit, courseTitle }) => {
  const [form, setForm] = useState<EnrollmentFormData>({ fullName:'', email:'', phone:'', address:'', preferredLanguage:'English', message:'' });
  const [focused, setFocused] = useState<string|null>(null);
  const [submitted, setSubmitted] = useState(false);

  const inp = (f:string): React.CSSProperties => ({
    width:'100%', padding:'11px 14px', boxSizing:'border-box',
    background:'#fdf8f3', border:`1px solid ${focused===f?'#b91c1c':'rgba(185,28,28,0.2)'}`,
    borderRadius:'4px', color:'#1a0808', fontFamily:"'Crimson Text',serif", fontSize:'16px',
    outline:'none', transition:'border-color 0.2s, box-shadow 0.2s',
    boxShadow: focused===f?'0 0 0 3px rgba(185,28,28,0.08)':'none',
  });
  const lbl: React.CSSProperties = { fontFamily:"'Cinzel',serif", fontSize:'8.5px', letterSpacing:'0.28em', color:'#a07070', textTransform:'uppercase', display:'block', marginBottom:'5px' };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setSubmitted(true);
    setTimeout(()=>{ onSubmit(form); setSubmitted(false); setForm({ fullName:'', email:'', phone:'', address:'', preferredLanguage:'English', message:'' }); }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen&&(
        <motion.div style={{ position:'fixed', inset:0, background:'rgba(26,8,8,0.55)', zIndex:50, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px', backdropFilter:'blur(4px)' }} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={e=>e.target===e.currentTarget&&onClose()}>
          <motion.div style={{ background:'#fff', border:'1px solid rgba(185,28,28,0.15)', borderRadius:'6px', width:'100%', maxWidth:'460px', maxHeight:'90vh', overflow:'hidden', display:'flex', flexDirection:'column', boxShadow:'0 24px 60px rgba(26,8,8,0.18)' }} initial={{ scale:0.92, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.92, opacity:0 }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Crimson+Text:wght@400&display=swap'); input::placeholder,textarea::placeholder{color:rgba(26,8,8,0.22)!important;} select option{background:#fff;color:#1a0808;}`}</style>
            <div style={{ padding:'18px 22px', borderBottom:'1px solid rgba(185,28,28,0.1)', background:'rgba(185,28,28,0.03)', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
              <div>
                <p style={{ fontFamily:"'Cinzel',serif", fontSize:'8px', letterSpacing:'0.35em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'4px' }}>Begin Your Journey</p>
                <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'15px', fontWeight:700, color:'#1a0808' }}>Enroll in Course</h3>
                <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'13px', color:'#a07070', fontStyle:'italic', marginTop:'2px' }}>{courseTitle}</p>
              </div>
              <button onClick={onClose} style={{ background:'rgba(185,28,28,0.06)', border:'1px solid rgba(185,28,28,0.15)', borderRadius:'50%', width:'34px', height:'34px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}><X size={14} color="#a07070"/></button>
            </div>
            <div style={{ flex:1, overflowY:'auto', padding:'22px' }}>
              {submitted ? (
                <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} style={{ textAlign:'center', padding:'28px 0' }}>
                  <div style={{ width:'60px', height:'60px', borderRadius:'50%', background:'rgba(22,163,74,0.08)', border:'2px solid rgba(22,163,74,0.3)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}><Check size={26} color="#16a34a"/></div>
                  <h4 style={{ fontFamily:"'Cinzel',serif", fontSize:'15px', color:'#1a0808', marginBottom:'8px' }}>Enrollment Submitted!</h4>
                  <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'16px', color:'#a07070', fontStyle:'italic' }}>We'll be in touch soon. 🙏</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
                    <div><label style={lbl}>Full Name *</label><input type="text" required value={form.fullName} onChange={e=>setForm({...form,fullName:e.target.value})} onFocus={()=>setFocused('name')} onBlur={()=>setFocused(null)} placeholder="Your name" style={inp('name')}/></div>
                    <div><label style={lbl}>Phone *</label><input type="tel" required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} onFocus={()=>setFocused('phone')} onBlur={()=>setFocused(null)} placeholder="+977…" style={inp('phone')}/></div>
                  </div>
                  <div><label style={lbl}>Email *</label><input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} onFocus={()=>setFocused('email')} onBlur={()=>setFocused(null)} placeholder="your@email.com" style={inp('email')}/></div>
                  <div><label style={lbl}>Address *</label><textarea required value={form.address} rows={2} onChange={e=>setForm({...form,address:e.target.value})} onFocus={()=>setFocused('addr')} onBlur={()=>setFocused(null)} placeholder="Your address…" style={{ ...inp('addr'), resize:'none' }}/></div>
                  <div><label style={lbl}>Preferred Language</label>
                    <select value={form.preferredLanguage} onChange={e=>setForm({...form,preferredLanguage:e.target.value})} onFocus={()=>setFocused('lang')} onBlur={()=>setFocused(null)} style={{ ...inp('lang'), cursor:'pointer' }}>
                      {['English','Nepali','Tibetan','Hindi'].map(l=><option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <div><label style={lbl}>Additional Message</label><textarea value={form.message} rows={2} onChange={e=>setForm({...form,message:e.target.value})} onFocus={()=>setFocused('msg')} onBlur={()=>setFocused(null)} placeholder="Any questions…" style={{ ...inp('msg'), resize:'none' }}/></div>
                  <button type="submit" style={{ width:'100%', padding:'13px', background:'linear-gradient(135deg,#991b1b,#b91c1c)', color:'#fff', border:'none', borderRadius:'4px', fontFamily:"'Cinzel',serif", fontSize:'10.5px', letterSpacing:'0.25em', textTransform:'uppercase', fontWeight:700, cursor:'pointer', boxShadow:'0 6px 20px rgba(185,28,28,0.22)' }}>Submit Enrollment</button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnrollmentForm;