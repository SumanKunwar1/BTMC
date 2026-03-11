import type React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Upload } from 'lucide-react';

const SL = { height:'1px', background:'linear-gradient(90deg,transparent,rgba(185,28,28,0.2),rgba(217,119,6,0.15),rgba(185,28,28,0.2),transparent)' };

const DonationSection = () => {
  const [form, setForm] = useState({ name:'', email:'', amount:'', screenshot:null as File|null });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [focused, setFocused] = useState<string|null>(null);

  const validate = () => {
    const e: Record<string,string> = {};
    if (!form.name.trim()) e.name='Name is required';
    if (!form.email.trim()) e.email='Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email='Invalid email';
    if (!form.amount) e.amount='Amount is required';
    else if (parseFloat(form.amount)<=0) e.amount='Must be greater than 0';
    if (!form.screenshot) e.screenshot='Payment screenshot required';
    setErrors(e); return Object.keys(e).length===0;
  };

  const inp = (f:string): React.CSSProperties => ({
    width:'100%', padding:'11px 14px', boxSizing:'border-box',
    background:'#fdf8f3', border:`1px solid ${focused===f?'#b91c1c':errors[f]?'rgba(220,38,38,0.4)':'rgba(185,28,28,0.2)'}`,
    borderRadius:'4px', color:'#1a0808', fontFamily:"'Crimson Text',serif", fontSize:'16px',
    outline:'none', transition:'border-color 0.2s, box-shadow 0.2s',
    boxShadow: focused===f?'0 0 0 3px rgba(185,28,28,0.08)':'none',
  });
  const lbl: React.CSSProperties = { fontFamily:"'Cinzel',serif", fontSize:'8.5px', letterSpacing:'0.28em', color:'#6b3333', textTransform:'uppercase', display:'block', marginBottom:'5px' };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setTimeout(()=>{ setIsLoading(false); setIsSuccess(true); setTimeout(()=>{ setForm({ name:'', email:'', amount:'', screenshot:null }); setIsSuccess(false); }, 4000); }, 1500);
  };

  return (
    <section style={{ position:'relative', padding:'80px 24px', overflow:'hidden' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Crimson+Text:wght@400;600&display=swap'); input::placeholder,textarea::placeholder{color:rgba(26,8,8,0.22)!important;}`}</style>
      <div style={{ ...SL, position:'absolute', top:0, left:0, right:0 } as any}/>
      {/* Warm parchment bg */}
      <div style={{ position:'absolute', inset:0, background:'#fdf8f3' }} />
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 30% 50%,rgba(185,28,28,0.05) 0%,transparent 70%)' }} />

      <div style={{ maxWidth:'1200px', margin:'0 auto', position:'relative', zIndex:2 }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'60px', alignItems:'center' }}>

          {/* Left info */}
          <motion.div initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:false }} transition={{ duration:0.8 }}>
            <p style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.4em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'10px' }}>Make a Difference</p>
            <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(22px,3vw,40px)', fontWeight:700, color:'#1a0808', marginBottom:'18px', lineHeight:1.15 }}>Support Our Mission</h2>
            <div style={{ width:'50px', height:'2px', background:'linear-gradient(90deg,#b91c1c,transparent)', marginBottom:'18px' }} />
            <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'18px', color:'#5a3030', lineHeight:1.85, marginBottom:'32px' }}>Your generous donation helps us maintain our facilities, support our teachers, and continue providing Buddhist education and meditation programs to our community.</p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px' }}>
              {[{ icon:'💡', title:'Transparent', text:'Clear use of funds' },{ icon:'⚡', title:'Impactful', text:'Helping thousands' },{ icon:'🌸', title:'Meaningful', text:'Supporting Dharma' }].map(item=>(
                <div key={item.title} style={{ textAlign:'center' }}>
                  <div style={{ fontSize:'26px', marginBottom:'8px' }}>{item.icon}</div>
                  <div style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', letterSpacing:'0.1em', color:'#1a0808', fontWeight:600, marginBottom:'4px' }}>{item.title}</div>
                  <div style={{ fontFamily:"'Crimson Text',serif", fontSize:'14px', color:'#a07070' }}>{item.text}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:false }} transition={{ duration:0.8 }}>
            <div style={{ background:'#fff', border:'1px solid rgba(185,28,28,0.15)', borderRadius:'6px', overflow:'hidden', boxShadow:'0 12px 40px rgba(185,28,28,0.1)' }}>
              <div style={{ padding:'18px 22px', borderBottom:'1px solid rgba(185,28,28,0.08)', background:'rgba(185,28,28,0.03)' }}>
                <p style={{ fontFamily:"'Cinzel',serif", fontSize:'8.5px', letterSpacing:'0.35em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'4px' }}>Dana — The Art of Giving</p>
                <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'18px', fontWeight:700, color:'#1a0808' }}>Make a Donation</h3>
              </div>
              <div style={{ padding:'22px' }}>
                {isSuccess ? (
                  <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} style={{ textAlign:'center', padding:'28px 0' }}>
                    <div style={{ width:'60px', height:'60px', borderRadius:'50%', background:'rgba(22,163,74,0.08)', border:'2px solid rgba(22,163,74,0.3)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}><CheckCircle size={26} color="#16a34a"/></div>
                    <h4 style={{ fontFamily:"'Cinzel',serif", fontSize:'16px', color:'#1a0808', marginBottom:'8px' }}>Thank You for Your Generosity!</h4>
                    <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'16px', color:'#a07070', fontStyle:'italic' }}>Confirmation sent to {form.email}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
                    {/* Bank details */}
                    <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                      {/* Nepal Bank */}
                      <div style={{ background:'linear-gradient(135deg,rgba(185,28,28,0.04),rgba(185,28,28,0.02))', border:'1px solid rgba(185,28,28,0.14)', borderRadius:'6px', overflow:'hidden' }}>
                        <div style={{ padding:'10px 14px', background:'rgba(185,28,28,0.06)', borderBottom:'1px solid rgba(185,28,28,0.1)', display:'flex', alignItems:'center', gap:'8px' }}>
                          <span style={{ fontSize:'16px' }}>🇳🇵</span>
                          <div>
                            <p style={{ fontFamily:"'Cinzel',serif", fontSize:'8px', letterSpacing:'0.25em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'1px' }}>Nepal — Bank Transfer</p>
                            <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'13px', color:'#a07070', fontStyle:'italic' }}>Prabhu Bank · Boudha Branch</p>
                          </div>
                        </div>
                        <div style={{ padding:'12px 14px', display:'flex', flexDirection:'column', gap:'6px' }}>
                          {[['Account Name','B.T.M.C. Foundation'],['Account No.','0570155982700014'],['Bank','Prabhu Bank (Boudha Branch)']].map(([k,v])=>(
                            <div key={k} style={{ display:'flex', gap:'8px', alignItems:'baseline' }}>
                              <span style={{ fontFamily:"'Cinzel',serif", fontSize:'7.5px', letterSpacing:'0.12em', color:'#a07070', textTransform:'uppercase', minWidth:'88px', flexShrink:0 }}>{k}</span>
                              <span style={{ fontFamily:"'Crimson Text',serif", fontSize:'15px', color:'#5a3030', fontWeight:600 }}>{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* India Bank */}
                      <div style={{ background:'linear-gradient(135deg,rgba(19,96,179,0.04),rgba(19,96,179,0.02))', border:'1px solid rgba(19,96,179,0.14)', borderRadius:'6px', overflow:'hidden' }}>
                        <div style={{ padding:'10px 14px', background:'rgba(19,96,179,0.05)', borderBottom:'1px solid rgba(19,96,179,0.1)', display:'flex', alignItems:'center', gap:'8px' }}>
                          <span style={{ fontSize:'16px' }}>🇮🇳</span>
                          <div>
                            <p style={{ fontFamily:"'Cinzel',serif", fontSize:'8px', letterSpacing:'0.25em', color:'#1360b3', textTransform:'uppercase', marginBottom:'1px' }}>India — Bank Transfer</p>
                            <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'13px', color:'#a07070', fontStyle:'italic' }}>Bank of India · Salugara, Siliguri</p>
                          </div>
                        </div>
                        <div style={{ padding:'12px 14px', display:'flex', flexDirection:'column', gap:'6px' }}>
                          {[['Account Name','BTMC Foundation'],['Account No.','50782011000314'],['IFSC Code','BKID0005078'],['Branch','Salugara, Siliguri'],['Address','H No.737, Gr. Fl., BSF Road, Ward No.42, PO Salugara, Jalpaiguri, West Bengal – 734008']].map(([k,v])=>(
                            <div key={k} style={{ display:'flex', gap:'8px', alignItems:'baseline' }}>
                              <span style={{ fontFamily:"'Cinzel',serif", fontSize:'7.5px', letterSpacing:'0.12em', color:'#a07070', textTransform:'uppercase', minWidth:'88px', flexShrink:0 }}>{k}</span>
                              <span style={{ fontFamily:"'Crimson Text',serif", fontSize:'15px', color:'#5a3030', fontWeight:600, lineHeight:1.4 }}>{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'13px', color:'#a07070', fontStyle:'italic', textAlign:'center' }}>Transfer first, then fill the form below.</p>
                    </div>

                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
                      <div><label style={lbl}>Name *</label><input type="text" required value={form.name} onChange={e=>{ setForm({...form,name:e.target.value}); if(errors.name)setErrors({...errors,name:''}); }} onFocus={()=>setFocused('name')} onBlur={()=>setFocused(null)} disabled={isLoading} placeholder="Your name" style={inp('name')}/>{errors.name&&<p style={{ color:'#b91c1c', fontSize:'11px', marginTop:'3px', fontFamily:"'Cinzel',serif" }}>{errors.name}</p>}</div>
                      <div><label style={lbl}>Amount (NPR) *</label><input type="number" required step="1" min="1" value={form.amount} onChange={e=>{ setForm({...form,amount:e.target.value}); if(errors.amount)setErrors({...errors,amount:''}); }} onFocus={()=>setFocused('amount')} onBlur={()=>setFocused(null)} disabled={isLoading} placeholder="e.g. 500" style={inp('amount')}/>{errors.amount&&<p style={{ color:'#b91c1c', fontSize:'11px', marginTop:'3px', fontFamily:"'Cinzel',serif" }}>{errors.amount}</p>}</div>
                    </div>
                    <div><label style={lbl}>Email *</label><input type="email" required value={form.email} onChange={e=>{ setForm({...form,email:e.target.value}); if(errors.email)setErrors({...errors,email:''}); }} onFocus={()=>setFocused('email')} onBlur={()=>setFocused(null)} disabled={isLoading} placeholder="your@email.com" style={inp('email')}/>{errors.email&&<p style={{ color:'#b91c1c', fontSize:'11px', marginTop:'3px', fontFamily:"'Cinzel',serif" }}>{errors.email}</p>}</div>
                    <div>
                      <label style={lbl}>Payment Screenshot *</label>
                      <label style={{ display:'flex', alignItems:'center', gap:'10px', padding:'11px 14px', cursor:'pointer', background:'#fdf8f3', border:`1px solid ${form.screenshot?'rgba(22,163,74,0.45)':errors.screenshot?'rgba(220,38,38,0.4)':'rgba(185,28,28,0.2)'}`, borderRadius:'4px', transition:'border-color 0.2s' }}>
                        <Upload size={14} color={form.screenshot?'#16a34a':'#a07070'}/><span style={{ fontFamily:"'Crimson Text',serif", fontSize:'16px', color:form.screenshot?'#16a34a':'#a07070' }}>{form.screenshot?form.screenshot.name:'Upload screenshot…'}</span>
                        <input type="file" accept="image/*" required style={{ display:'none' }} onChange={e=>{ if(e.target.files?.[0]){ setForm({...form,screenshot:e.target.files[0]}); if(errors.screenshot)setErrors({...errors,screenshot:''}); } }} disabled={isLoading}/>
                      </label>
                      {errors.screenshot&&<p style={{ color:'#b91c1c', fontSize:'11px', marginTop:'3px', fontFamily:"'Cinzel',serif" }}>{errors.screenshot}</p>}
                    </div>
                    <button type="submit" disabled={isLoading} style={{ width:'100%', padding:'13px', background:isLoading?'rgba(185,28,28,0.3)':'linear-gradient(135deg,#991b1b,#b91c1c)', color:'#fff', border:'none', borderRadius:'4px', fontFamily:"'Cinzel',serif", fontSize:'10.5px', letterSpacing:'0.25em', textTransform:'uppercase', fontWeight:700, cursor:isLoading?'not-allowed':'pointer', boxShadow:isLoading?'none':'0 6px 20px rgba(185,28,28,0.22)', transition:'all 0.3s' }}>
                      {isLoading?'Processing…':'Submit Donation Details'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div style={{ ...SL, position:'absolute', bottom:0, left:0, right:0 } as any}/>
    </section>
  );
};

export default DonationSection;