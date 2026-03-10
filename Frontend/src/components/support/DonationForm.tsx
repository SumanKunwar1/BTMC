"use client"
import type React from "react"
import { useState } from "react"
import { CheckCircle, Upload } from "lucide-react"
import { motion } from "framer-motion"

interface DonationFormProps {
  supportType: string
  onSuccess?: () => void
}

const DonationForm: React.FC<DonationFormProps> = ({ supportType, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "", email: "", amount: "",
    frequency: supportType === "Monthly Giving" ? "monthly" : "one-time",
    screenshot: null as File | null,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const isDonation = ["One-time Donation", "Monthly Giving"].includes(supportType)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!formData.name.trim()) e.name = "Name required"
    if (!formData.email.trim()) e.email = "Email required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Invalid email"
    if (isDonation) {
      if (!formData.amount) e.amount = "Amount required"
      else if (parseFloat(formData.amount) <= 0) e.amount = "Must be > 0"
    }
    setErrors(e); return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false); setIsSuccess(true)
      if (onSuccess) setTimeout(onSuccess, 2500)
      setTimeout(() => {
        setFormData({ name: "", email: "", amount: "", frequency: supportType === "Monthly Giving" ? "monthly" : "one-time", screenshot: null })
        setIsSuccess(false)
      }, 3000)
    }, 1500)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px', boxSizing: 'border-box',
    background: 'rgba(10,5,5,0.8)',
    border: '1px solid rgba(185,28,28,0.25)',
    borderRadius: '3px', color: '#f5f0eb',
    fontFamily: "'Crimson Text', serif", fontSize: '16px',
    outline: 'none', transition: 'border-color 0.2s',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Cinzel', serif", fontSize: '8.5px',
    letterSpacing: '0.25em', color: 'rgba(245,240,235,0.35)',
    textTransform: 'uppercase', display: 'block', marginBottom: '5px',
  }

  if (isSuccess) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '24px 0' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(22,163,74,0.1)', border: '2px solid rgba(22,163,74,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <CheckCircle size={24} color="#16a34a" />
        </div>
        <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '15px', color: '#f5f0eb', marginBottom: '8px' }}>Thank You!</h3>
        <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '16px', color: 'rgba(245,240,235,0.5)', fontStyle: 'italic' }}>
          Your generous {supportType.toLowerCase()} has been received.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <style>{`
        .df-input:focus { border-color: rgba(220,38,38,0.7) !important; box-shadow: 0 0 0 3px rgba(185,28,28,0.08); }
        .df-input::placeholder { color: rgba(245,240,235,0.18) !important; }
      `}</style>

      {isDonation && (
        <div style={{ background: 'rgba(185,28,28,0.06)', border: '1px solid rgba(185,28,28,0.18)', borderRadius: '3px', padding: '14px' }}>
          <p style={{ ...labelStyle, marginBottom: '10px', color: '#dc2626' }}>Bank Transfer Details</p>
          {[
            ['Account Name', 'B.T.M.C. Foundation'],
            ['Account No.', '0570155982700014'],
            ['Bank', 'Prabhu Bank (Boudha Branch)'],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', gap: '8px', marginBottom: '5px' }}>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: '8px', letterSpacing: '0.1em', color: 'rgba(245,240,235,0.3)', textTransform: 'uppercase', minWidth: '90px', paddingTop: '3px' }}>{k}</span>
              <span style={{ fontFamily: "'Crimson Text', serif", fontSize: '15px', color: 'rgba(245,240,235,0.65)' }}>{v}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: isDonation ? '1fr 1fr' : '1fr', gap: '12px' }}>
        <div>
          <label style={labelStyle}>Your Name *</label>
          <input type="text" required className="df-input" style={inputStyle} value={formData.name}
            onChange={e => { setFormData({ ...formData, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: '' }) }}
            disabled={isLoading} placeholder="Full name" />
          {errors.name && <p style={{ color: '#f87171', fontSize: '11px', marginTop: '3px', fontFamily: "'Cinzel', serif" }}>{errors.name}</p>}
        </div>
        {isDonation && (
          <div>
            <label style={labelStyle}>Amount (NPR) *</label>
            <input type="number" required step="1" min="1" className="df-input" style={inputStyle} value={formData.amount}
              onChange={e => { setFormData({ ...formData, amount: e.target.value }); if (errors.amount) setErrors({ ...errors, amount: '' }) }}
              disabled={isLoading} placeholder="e.g. 500" />
            {errors.amount && <p style={{ color: '#f87171', fontSize: '11px', marginTop: '3px', fontFamily: "'Cinzel', serif" }}>{errors.amount}</p>}
          </div>
        )}
      </div>

      <div>
        <label style={labelStyle}>Email *</label>
        <input type="email" required className="df-input" style={inputStyle} value={formData.email}
          onChange={e => { setFormData({ ...formData, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: '' }) }}
          disabled={isLoading} placeholder="your@email.com" />
        {errors.email && <p style={{ color: '#f87171', fontSize: '11px', marginTop: '3px', fontFamily: "'Cinzel', serif" }}>{errors.email}</p>}
      </div>

      {isDonation && (
        <div>
          <label style={labelStyle}>Payment Screenshot *</label>
          <label style={{
            display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 14px', cursor: 'pointer',
            background: 'rgba(10,5,5,0.8)',
            border: `1px solid ${formData.screenshot ? 'rgba(22,163,74,0.5)' : 'rgba(185,28,28,0.25)'}`,
            borderRadius: '3px', transition: 'border-color 0.2s',
          }}>
            <Upload size={13} color={formData.screenshot ? '#16a34a' : 'rgba(245,240,235,0.3)'} />
            <span style={{ fontFamily: "'Crimson Text', serif", fontSize: '15px', color: formData.screenshot ? 'rgba(134,239,172,0.8)' : 'rgba(245,240,235,0.25)' }}>
              {formData.screenshot ? formData.screenshot.name : 'Upload screenshot…'}
            </span>
            <input type="file" accept="image/*" required style={{ display: 'none' }}
              onChange={e => { if (e.target.files?.[0]) setFormData({ ...formData, screenshot: e.target.files[0] }) }} disabled={isLoading} />
          </label>
        </div>
      )}

      <button type="submit" disabled={isLoading} style={{
        width: '100%', padding: '13px',
        background: isLoading ? 'rgba(80,40,40,0.5)' : 'linear-gradient(135deg, #991b1b, #dc2626)',
        color: '#fff', border: 'none', borderRadius: '3px',
        fontFamily: "'Cinzel', serif", fontSize: '10px',
        letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700,
        cursor: isLoading ? 'not-allowed' : 'pointer',
        boxShadow: isLoading ? 'none' : '0 6px 20px rgba(185,28,28,0.3)',
        transition: 'all 0.3s ease',
      }}>
        {isLoading ? 'Processing…' : supportType === "Volunteer" ? 'Submit Application' : 'Submit Donation Details'}
      </button>
    </form>
  )
}

export default DonationForm