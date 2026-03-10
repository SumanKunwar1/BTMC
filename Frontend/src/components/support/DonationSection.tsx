"use client"
import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Upload } from "lucide-react"

const SHARED_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700&family=Crimson+Text:wght@400;600&display=swap');
  .dn-input {
    width: 100%; padding: 12px 14px; box-sizing: border-box;
    background: rgba(10,5,5,0.9);
    border: 1px solid rgba(185,28,28,0.25);
    border-radius: 3px; color: #f5f0eb;
    font-family: 'Crimson Text', serif; font-size: 16px;
    outline: none; transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .dn-input:focus { border-color: rgba(220,38,38,0.7); box-shadow: 0 0 0 3px rgba(185,28,28,0.08); }
  .dn-input::placeholder { color: rgba(245,240,235,0.2); }
  .dn-label {
    font-family: 'Cinzel', serif; font-size: 8.5px;
    letter-spacing: 0.28em; color: rgba(245,240,235,0.35);
    text-transform: uppercase; display: block; margin-bottom: 6px;
  }
  .dn-submit {
    width: 100%; padding: 15px;
    background: linear-gradient(135deg, #991b1b, #dc2626);
    color: #fff; border: none; border-radius: 3px;
    font-family: 'Cinzel', serif; font-size: 11px;
    letter-spacing: 0.25em; text-transform: uppercase; font-weight: 700;
    cursor: pointer; box-shadow: 0 6px 20px rgba(185,28,28,0.35);
    transition: all 0.3s ease;
  }
  .dn-submit:hover { background: linear-gradient(135deg, #7f1d1d, #b91c1c); box-shadow: 0 8px 28px rgba(185,28,28,0.55); transform: translateY(-1px); }
  .dn-submit:disabled { background: rgba(80,40,40,0.5); cursor: not-allowed; box-shadow: none; transform: none; }
`

const DonationSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", amount: "", screenshot: null as File | null })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!formData.name.trim()) e.name = "Name is required"
    if (!formData.email.trim()) e.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Invalid email"
    if (!formData.amount) e.amount = "Amount is required"
    else if (parseFloat(formData.amount) <= 0) e.amount = "Must be greater than 0"
    if (!formData.screenshot) e.screenshot = "Payment screenshot required"
    setErrors(e); return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false); setIsSuccess(true)
      setTimeout(() => { setFormData({ name: "", email: "", amount: "", screenshot: null }); setIsSuccess(false) }, 4000)
    }, 1500)
  }

  return (
    <section style={{ position: 'relative', padding: '80px 24px', overflow: 'hidden' }}>
      <style>{SHARED_STYLE}</style>
      <div style={{ position: 'absolute', inset: 0 }}>
        <img src="https://res.cloudinary.com/dihev9qxc/image/upload/v1762075318/a-cinematic-wide-angle-photograph-of-a-m_CYibIl1yTZq0NLAJZrcvzA_I_igCA0-S7CF5gMT-vWVEA_wggrfk.jpg"
          alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,2,2,0.88)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(120,10,10,0.2) 0%, transparent 70%)' }} />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>

          {/* Left info */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ duration: 0.8 }} style={{ color: '#f5f0eb' }}>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.4em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '10px' }}>Make a Difference</p>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(22px, 3vw, 40px)', fontWeight: 700, color: '#f5f0eb', marginBottom: '20px', lineHeight: 1.15 }}>Support Our Mission</h2>
            <div style={{ width: '50px', height: '2px', background: 'linear-gradient(90deg, #dc2626, transparent)', marginBottom: '20px' }} />
            <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '18px', color: 'rgba(245,240,235,0.55)', lineHeight: 1.85, marginBottom: '36px' }}>
              Your generous donation helps us maintain our facilities, support our teachers, and continue providing Buddhist education and meditation programs to our community.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {[
                { icon: '💡', title: 'Transparent', text: 'Clear use of funds' },
                { icon: '⚡', title: 'Impactful', text: 'Helping thousands' },
                { icon: '🌸', title: 'Meaningful', text: 'Supporting Dharma' },
              ].map((item) => (
                <div key={item.title} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '26px', marginBottom: '8px' }}>{item.icon}</div>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '0.1em', color: '#f5f0eb', fontWeight: 600, marginBottom: '4px' }}>{item.title}</div>
                  <div style={{ fontFamily: "'Crimson Text', serif", fontSize: '14px', color: 'rgba(245,240,235,0.35)' }}>{item.text}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ duration: 0.8 }}>
            <div style={{
              background: 'linear-gradient(160deg, rgba(14,4,4,0.99), rgba(24,6,6,0.97))',
              border: '1px solid rgba(185,28,28,0.3)',
              borderRadius: '5px', overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(185,28,28,0.06)',
            }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(185,28,28,0.15)', background: 'rgba(185,28,28,0.06)' }}>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: '8.5px', letterSpacing: '0.35em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '4px' }}>Dana — The Art of Giving</p>
                <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '18px', fontWeight: 700, color: '#f5f0eb' }}>Make a Donation</h3>
              </div>

              <div style={{ padding: '24px' }}>
                {isSuccess ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '32px 0' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(22,163,74,0.12)', border: '2px solid rgba(22,163,74,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                      <CheckCircle size={28} color="#16a34a" />
                    </div>
                    <h4 style={{ fontFamily: "'Cinzel', serif", fontSize: '16px', color: '#f5f0eb', marginBottom: '10px' }}>Thank You for Your Generosity!</h4>
                    <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '16px', color: 'rgba(245,240,235,0.5)', fontStyle: 'italic' }}>
                      Confirmation will be sent to {formData.email}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Bank details */}
                    <div style={{ background: 'rgba(185,28,28,0.06)', border: '1px solid rgba(185,28,28,0.18)', borderRadius: '3px', padding: '16px' }}>
                      <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.25em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '10px' }}>Bank Transfer Details</p>
                      {[
                        { label: 'Account Name', value: 'B.T.M.C. Foundation' },
                        { label: 'Account No.', value: '0570155982700014' },
                        { label: 'Bank', value: 'Prabhu Bank (Boudha Branch)' },
                      ].map(row => (
                        <div key={row.label} style={{ display: 'flex', gap: '10px', marginBottom: '6px' }}>
                          <span style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.1em', color: 'rgba(245,240,235,0.35)', textTransform: 'uppercase', minWidth: '100px', paddingTop: '2px' }}>{row.label}</span>
                          <span style={{ fontFamily: "'Crimson Text', serif", fontSize: '16px', color: 'rgba(245,240,235,0.7)' }}>{row.value}</span>
                        </div>
                      ))}
                      <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '13px', color: 'rgba(245,240,235,0.3)', fontStyle: 'italic', marginTop: '8px' }}>Transfer first, then fill this form and upload screenshot.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label className="dn-label">Name *</label>
                        <input type="text" required className="dn-input" value={formData.name}
                          onChange={e => { setFormData({ ...formData, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: '' }) }}
                          disabled={isLoading} placeholder="Your name" />
                        {errors.name && <p style={{ color: '#f87171', fontSize: '11px', marginTop: '4px', fontFamily: "'Cinzel', serif" }}>{errors.name}</p>}
                      </div>
                      <div>
                        <label className="dn-label">Amount (NPR) *</label>
                        <input type="number" required step="1" min="1" className="dn-input" value={formData.amount}
                          onChange={e => { setFormData({ ...formData, amount: e.target.value }); if (errors.amount) setErrors({ ...errors, amount: '' }) }}
                          disabled={isLoading} placeholder="e.g. 500" />
                        {errors.amount && <p style={{ color: '#f87171', fontSize: '11px', marginTop: '4px', fontFamily: "'Cinzel', serif" }}>{errors.amount}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="dn-label">Email *</label>
                      <input type="email" required className="dn-input" value={formData.email}
                        onChange={e => { setFormData({ ...formData, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: '' }) }}
                        disabled={isLoading} placeholder="your@email.com" />
                      {errors.email && <p style={{ color: '#f87171', fontSize: '11px', marginTop: '4px', fontFamily: "'Cinzel', serif" }}>{errors.email}</p>}
                    </div>
                    <div>
                      <label className="dn-label">Payment Screenshot *</label>
                      <label style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '12px 14px', cursor: 'pointer',
                        background: 'rgba(10,5,5,0.8)',
                        border: `1px solid ${errors.screenshot ? 'rgba(248,113,113,0.5)' : formData.screenshot ? 'rgba(22,163,74,0.5)' : 'rgba(185,28,28,0.25)'}`,
                        borderRadius: '3px', transition: 'border-color 0.2s',
                      }}>
                        <Upload size={15} color={formData.screenshot ? '#16a34a' : 'rgba(245,240,235,0.35)'} />
                        <span style={{ fontFamily: "'Crimson Text', serif", fontSize: '15px', color: formData.screenshot ? 'rgba(134,239,172,0.8)' : 'rgba(245,240,235,0.3)' }}>
                          {formData.screenshot ? formData.screenshot.name : 'Upload screenshot…'}
                        </span>
                        <input type="file" accept="image/*" required style={{ display: 'none' }}
                          onChange={e => { if (e.target.files?.[0]) { setFormData({ ...formData, screenshot: e.target.files[0] }); if (errors.screenshot) setErrors({ ...errors, screenshot: '' }) } }} disabled={isLoading} />
                      </label>
                      {errors.screenshot && <p style={{ color: '#f87171', fontSize: '11px', marginTop: '4px', fontFamily: "'Cinzel', serif" }}>{errors.screenshot}</p>}
                    </div>
                    <button type="submit" className="dn-submit" disabled={isLoading}>
                      {isLoading ? 'Processing…' : 'Submit Donation Details'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default DonationSection