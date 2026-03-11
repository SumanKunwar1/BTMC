import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { BookingFormData } from '../../types/tour';

interface BookingFormProps { isOpen:boolean; onClose:()=>void; onSubmit:(data:BookingFormData)=>void; tourTitle:string; }

const BookingForm: React.FC<BookingFormProps> = ({ isOpen, onClose, onSubmit, tourTitle }) => {
  const [form, setForm] = useState<BookingFormData>({ fullName:'', email:'', phone:'', participants:1, specialRequests:'' });
  const [focused, setFocused] = useState<string|null>(null);

  const inp = (f:string): React.CSSProperties => ({
    width:'100%', padding:'11px 14px', boxSizing:'border-box',
    background:'#fdf8f3', border:`1px solid ${focused===f?'#b91c1c':'rgba(185,28,28,0.2)'}`,
    borderRadius:'4px', color:'#1a0808', fontFamily:"'Crimson Text',serif", fontSize:'16px',
    outline:'none', transition:'border-color 0.2s, box-shadow 0.2s',
    boxShadow: focused===f?'0 0 0 3px rgba(185,28,28,0.08)':'none',
  });
  const lbl: React.CSSProperties = { fontFamily:"'Cinzel',serif", fontSize:'8.5px', letterSpacing:'0.28em', color:'#a07070', textTransform:'uppercase', display:'block', marginBottom:'5px' };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const saved = JSON.parse(localStorage.getItem('tourBookings')||'[]');
    localStorage.setItem('tourBookings', JSON.stringify([...saved, { ...form, tourTitle, bookingDate:new Date().toISOString(), status:'pending' }]));
    onSubmit(form);
    setForm({ fullName:'', email:'', phone:'', participants:1, specialRequests:'' });
  };

  return (
    <AnimatePresence>
      {isOpen&&(
        <motion.div style={{ position:'fixed', inset:0, background:'rgba(26,8,8,0.55)', zIndex:50, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px', backdropFilter:'blur(4px)' }} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={e=>e.target===e.currentTarget&&onClose()}>
          <motion.div style={{ background:'#fff', border:'1px solid rgba(185,28,28,0.15)', borderRadius:'6px', width:'100%', maxWidth:'440px', maxHeight:'90vh', overflow:'hidden', display:'flex', flexDirection:'column', boxShadow:'0 24px 60px rgba(26,8,8,0.18)' }} initial={{ scale:0.92, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.92, opacity:0 }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Crimson+Text:wght@400&display=swap'); input::placeholder,textarea::placeholder{color:rgba(26,8,8,0.22)!important;}`}</style>

            <div style={{ padding:'18px 22px', borderBottom:'1px solid rgba(185,28,28,0.1)', background:'rgba(185,28,28,0.03)', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
              <div>
                <p style={{ fontFamily:"'Cinzel',serif", fontSize:'8px', letterSpacing:'0.35em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'4px' }}>Sacred Journey</p>
                <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'15px', fontWeight:700, color:'#1a0808' }}>Book This Tour</h3>
                <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'13px', color:'#a07070', fontStyle:'italic', marginTop:'2px' }}>{tourTitle}</p>
              </div>
              <button onClick={onClose} style={{ background:'rgba(185,28,28,0.06)', border:'1px solid rgba(185,28,28,0.15)', borderRadius:'50%', width:'34px', height:'34px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}><X size={14} color="#a07070"/></button>
            </div>

            <div style={{ flex:1, overflowY:'auto', padding:'22px' }}>
              <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
                  <div><label style={lbl}>Full Name *</label><input type="text" required value={form.fullName} onChange={e=>setForm({...form,fullName:e.target.value})} onFocus={()=>setFocused('name')} onBlur={()=>setFocused(null)} placeholder="Your name" style={inp('name')}/></div>
                  <div><label style={lbl}>Phone *</label><input type="tel" required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} onFocus={()=>setFocused('phone')} onBlur={()=>setFocused(null)} placeholder="+977…" style={inp('phone')}/></div>
                </div>
                <div><label style={lbl}>Email *</label><input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} onFocus={()=>setFocused('email')} onBlur={()=>setFocused(null)} placeholder="your@email.com" style={inp('email')}/></div>
                <div><label style={lbl}>Participants *</label><input type="number" required min="1" value={form.participants} onChange={e=>setForm({...form,participants:parseInt(e.target.value)})} onFocus={()=>setFocused('part')} onBlur={()=>setFocused(null)} style={inp('part')}/></div>
                <div><label style={lbl}>Special Requests</label><textarea value={form.specialRequests} onChange={e=>setForm({...form,specialRequests:e.target.value})} onFocus={()=>setFocused('req')} onBlur={()=>setFocused(null)} rows={3} placeholder="Any requirements…" style={{ ...inp('req'), resize:'vertical', minHeight:'80px' }}/></div>
                <button type="submit" style={{ width:'100%', padding:'13px', background:'linear-gradient(135deg,#991b1b,#b91c1c)', color:'#fff', border:'none', borderRadius:'4px', fontFamily:"'Cinzel',serif", fontSize:'10.5px', letterSpacing:'0.25em', textTransform:'uppercase', fontWeight:700, cursor:'pointer', boxShadow:'0 6px 20px rgba(185,28,28,0.22)' }}>Submit Booking</button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingForm;