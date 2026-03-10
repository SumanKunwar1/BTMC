"use client"
import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle } from "lucide-react"
import DonationForm from "./DonationForm"

interface SupportWay {
  title: string
  description: string
  fullDescription: string
  benefits: string[]
  icon: React.ComponentType<{ className?: string }>
  image: string
}

interface SupportModalProps {
  isOpen: boolean
  onClose: () => void
  supportWay: SupportWay | null
}

const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose, supportWay }) => {
  if (!supportWay) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', backdropFilter: 'blur(4px)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            style={{
              background: 'linear-gradient(160deg, rgba(14,4,4,0.99), rgba(24,6,6,0.97))',
              border: '1px solid rgba(185,28,28,0.3)',
              borderRadius: '5px', width: '100%', maxWidth: '580px',
              maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
              boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(185,28,28,0.08)',
            }}
            initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
          >
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700&family=Cormorant+Garamond:ital,wght@0,400;1,400&family=Crimson+Text:wght@400;600&display=swap');`}</style>

            {/* Header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(185,28,28,0.15)', background: 'rgba(185,28,28,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <div>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: '8.5px', letterSpacing: '0.35em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '4px' }}>Ways to Give</p>
                <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: '18px', fontWeight: 700, color: '#f5f0eb' }}>{supportWay.title}</h2>
              </div>
              <button onClick={onClose} style={{ background: 'rgba(185,28,28,0.1)', border: '1px solid rgba(185,28,28,0.2)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s' }}>
                <X size={15} color="rgba(245,240,235,0.6)" />
              </button>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Image */}
              <div style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(185,28,28,0.2)', height: '200px' }}>
                <img src={supportWay.image} alt={supportWay.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>

              {/* Description */}
              <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '18px', color: 'rgba(245,240,235,0.6)', lineHeight: 1.85 }}>
                {supportWay.fullDescription}
              </p>

              {/* Benefits */}
              <div>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.3em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '14px' }}>Benefits</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {supportWay.benefits.map((benefit, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle size={14} color="#dc2626" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Crimson Text', serif", fontSize: '16px', color: 'rgba(245,240,235,0.6)', lineHeight: 1.6 }}>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(185,28,28,0.4), transparent)' }} />

              {/* Form */}
              <div>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.3em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '18px' }}>Support Now</p>
                <DonationForm supportType={supportWay.title} onSuccess={onClose} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SupportModal