import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Facebook, Instagram, Twitter, Linkedin, Youtube, Globe, Heart } from 'lucide-react';
import { donors, Donor, SupportCategory } from '../data/donors';

const SL = { height:'1px', background:'linear-gradient(90deg,transparent,rgba(185,28,28,0.2),rgba(217,119,6,0.15),rgba(185,28,28,0.2),transparent)' };

// ── Helpers ───────────────────────────────────────────────────────────────────

const SUPPORT_META: Record<SupportCategory, { icon: string; color: string; bg: string }> = {
  'Financial':     { icon: '💰', color: '#16a34a', bg: 'rgba(22,163,74,0.08)'  },
  'Food':          { icon: '🍚', color: '#d97706', bg: 'rgba(217,119,6,0.08)'  },
  'Accommodation': { icon: '🏠', color: '#7c3aed', bg: 'rgba(124,58,237,0.08)' },
  'Materials':     { icon: '📦', color: '#0891b2', bg: 'rgba(8,145,178,0.08)'  },
  'Volunteer':     { icon: '🙌', color: '#b91c1c', bg: 'rgba(185,28,28,0.08)'  },
  'Transport':     { icon: '🚐', color: '#4b5563', bg: 'rgba(75,85,99,0.08)'   },
  'Medical':       { icon: '🏥', color: '#dc2626', bg: 'rgba(220,38,38,0.08)'  },
  'Clothing':      { icon: '👘', color: '#9a3412', bg: 'rgba(154,52,18,0.08)'  },
  'Technology':    { icon: '💻', color: '#1d4ed8', bg: 'rgba(29,78,216,0.08)'  },
  'Land & Property':{ icon:'🏡', color: '#065f46', bg: 'rgba(6,95,70,0.08)'   },
  'Other':         { icon: '✨', color: '#6b3333', bg: 'rgba(107,51,51,0.08)'  },
};

const RECOGNITION_META: Record<Donor['recognition'], { label: string; color: string; icon: string }> = {
  'Patron':      { label: 'Patron',      color: '#d97706', icon: '👑' },
  'Benefactor':  { label: 'Benefactor',  color: '#94a3b8', icon: '💎' },
  'Supporter':   { label: 'Supporter',   color: '#b91c1c', icon: '🌸' },
  'Friend':      { label: 'Friend',      color: '#16a34a', icon: '🤝' },
};

const SUPPORT_CATEGORIES: SupportCategory[] = [
  'Financial','Food','Accommodation','Materials','Volunteer','Transport','Medical','Clothing','Technology','Land & Property','Other'
];

const InitialsAvatar = ({ name, size = 80 }: { name: string; size?: number }) => {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: 'linear-gradient(135deg,rgba(185,28,28,0.12),rgba(185,28,28,0.06))', border: '2px solid rgba(185,28,28,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cinzel',serif", fontSize: size * 0.28, fontWeight: 700, color: '#b91c1c', letterSpacing: '0.05em', flexShrink: 0 }}>
      {initials}
    </div>
  );
};

const SocialIcon = ({ platform, url }: { platform: string; url: string }) => {
  const icons: Record<string, { Icon: any; color: string; label: string }> = {
    facebook:  { Icon: Facebook,  color: '#1877f2', label: 'Facebook'  },
    instagram: { Icon: Instagram, color: '#e1306c', label: 'Instagram' },
    twitter:   { Icon: Twitter,   color: '#1da1f2', label: 'Twitter'   },
    linkedin:  { Icon: Linkedin,  color: '#0a66c2', label: 'LinkedIn'  },
    youtube:   { Icon: Youtube,   color: '#ff0000', label: 'YouTube'   },
    website:   { Icon: Globe,     color: '#b91c1c', label: 'Website'   },
  };
  const meta = icons[platform];
  if (!meta) return null;
  const { Icon, color, label } = meta;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" title={label}
      style={{ width: '30px', height: '30px', borderRadius: '50%', border: `1px solid ${color}30`, background: `${color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', textDecoration: 'none' }}
      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = `${color}20`; (e.currentTarget as HTMLAnchorElement).style.borderColor = `${color}60`; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = `${color}10`; (e.currentTarget as HTMLAnchorElement).style.borderColor = `${color}30`; (e.currentTarget as HTMLAnchorElement).style.transform = 'none'; }}
    >
      <Icon size={13} color={color} />
    </a>
  );
};

const DonorCard = ({ donor }: { donor: Donor }) => {
  const rec = RECOGNITION_META[donor.recognition];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      style={{ background: '#fff', border: '1px solid rgba(185,28,28,0.1)', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(185,28,28,0.04)', display: 'flex', flexDirection: 'column', transition: 'all 0.35s cubic-bezier(0.23,1,0.32,1)' }}
      whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(185,28,28,0.12)', borderColor: 'rgba(185,28,28,0.3)' } as any}
    >
      {/* Top accent bar */}
      <div style={{ height: '3px', background: `linear-gradient(90deg,${rec.color},${rec.color}60,transparent)` }} />

      <div style={{ padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
        {/* Header row */}
        <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
          {/* Photo or initials */}
          {donor.photo ? (
            <img src={donor.photo} alt={donor.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(185,28,28,0.15)', flexShrink: 0 }} />
          ) : (
            <InitialsAvatar name={donor.name} size={64} />
          )}

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '4px' }}>
              <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: '13px', fontWeight: 700, color: '#1a0808', lineHeight: 1.2 }}>{donor.name}</h3>
              <span style={{ fontSize: '13px' }}>{donor.countryFlag}</span>
            </div>
            <p style={{ fontFamily: "'Crimson Text',serif", fontSize: '13px', color: '#a07070' }}>{donor.country}{donor.contributionYear ? ` · ${donor.contributionYear}` : ''}</p>

            {/* Recognition badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', marginTop: '6px', padding: '3px 10px', borderRadius: '2px', background: `${rec.color}12`, border: `1px solid ${rec.color}30` }}>
              <span style={{ fontSize: '11px' }}>{rec.icon}</span>
              <span style={{ fontFamily: "'Cinzel',serif", fontSize: '8px', letterSpacing: '0.2em', color: rec.color, textTransform: 'uppercase' }}>{rec.label}</span>
            </div>
          </div>
        </div>

        {/* Support types */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {donor.supportTypes.map(type => {
            const meta = SUPPORT_META[type];
            return (
              <span key={type} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 9px', borderRadius: '2px', background: meta.bg, border: `1px solid ${meta.color}25` }}>
                <span style={{ fontSize: '11px' }}>{meta.icon}</span>
                <span style={{ fontFamily: "'Cinzel',serif", fontSize: '8px', letterSpacing: '0.12em', color: meta.color, textTransform: 'uppercase' }}>{type}</span>
              </span>
            );
          })}
        </div>

        {/* Support detail */}
        <p style={{ fontFamily: "'Crimson Text',serif", fontSize: '15px', color: '#5a3030', lineHeight: 1.7, flex: 1 }}>{donor.supportDetail}</p>

        {/* Message */}
        {donor.message && (
          <div style={{ padding: '10px 14px', background: 'rgba(185,28,28,0.03)', borderLeft: '2px solid rgba(185,28,28,0.2)', borderRadius: '0 4px 4px 0' }}>
            <p style={{ fontFamily: "'Crimson Text',serif", fontSize: '14px', color: '#a07070', fontStyle: 'italic', lineHeight: 1.6 }}>"{donor.message}"</p>
          </div>
        )}

        {/* Social links */}
        {donor.social && Object.keys(donor.social).length > 0 && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', paddingTop: '4px', borderTop: '1px solid rgba(185,28,28,0.06)' }}>
            <span style={{ fontFamily: "'Cinzel',serif", fontSize: '7.5px', letterSpacing: '0.2em', color: '#c4a0a0', textTransform: 'uppercase' }}>Connect</span>
            {Object.entries(donor.social).map(([platform, url]) =>
              url ? <SocialIcon key={platform} platform={platform} url={url} /> : null
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────

const DonorsPage = () => {
  const [activeFilter, setActiveFilter] = useState<SupportCategory | 'All'>('All');
  const [activeRec, setActiveRec] = useState<Donor['recognition'] | 'All'>('All');

  const filtered = donors.filter(d => {
    const catMatch = activeFilter === 'All' || d.supportTypes.includes(activeFilter);
    const recMatch = activeRec === 'All' || d.recognition === activeRec;
    return catMatch && recMatch;
  });

  const supportCategories = [...new Set(donors.flatMap(d => d.supportTypes))];

  return (
    <div style={{ background: '#fdf8f3', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700;900&family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Crimson+Text:wght@400;600&display=swap');
        .filter-btn { font-family:'Cinzel',serif; font-size:9px; letter-spacing:0.18em; text-transform:uppercase; padding:7px 14px; border-radius:3px; border:1px solid rgba(185,28,28,0.2); color:#6b3333; background:transparent; cursor:pointer; transition:all 0.2s; white-space:nowrap; }
        .filter-btn:hover { border-color:rgba(185,28,28,0.4); color:#b91c1c; background:rgba(185,28,28,0.04); }
        .filter-btn.active { background:linear-gradient(135deg,#991b1b,#b91c1c); border-color:#b91c1c; color:#fff; box-shadow:0 4px 12px rgba(185,28,28,0.2); }
      `}</style>

      {/* Hero */}
      <section style={{ position: 'relative', padding: '80px 24px 70px', background: 'linear-gradient(180deg,rgba(185,28,28,0.06) 0%,rgba(253,248,243,1) 100%)', textAlign: 'center', overflow: 'hidden' }}>
        {[180, 300, 420].map(s => <div key={s} style={{ position: 'absolute', borderRadius: '50%', border: '1px solid rgba(185,28,28,0.07)', width: s, height: s, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />)}
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '18px' }}>
            <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg,transparent,#b91c1c)' }} />
            <Heart size={20} color="#b91c1c" fill="rgba(185,28,28,0.2)" />
            <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg,#b91c1c,transparent)' }} />
          </div>
          <p style={{ fontFamily: "'Cinzel',serif", fontSize: '10px', letterSpacing: '0.4em', color: '#b91c1c', textTransform: 'uppercase', marginBottom: '14px' }}>Gratitude & Recognition</p>
          <h1 style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(28px,5vw,58px)', fontWeight: 900, color: '#1a0808', lineHeight: 1.05, marginBottom: '16px' }}>Our Generous Donors</h1>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(16px,2vw,21px)', fontStyle: 'italic', fontWeight: 300, color: '#a07070', maxWidth: '520px', margin: '0 auto' }}>
            Every act of giving — whether money, meals, shelter, or time — is a sacred offering that keeps our mission alive. 🙏
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', marginTop: '40px' }}>
            {[
              { value: `${donors.length}+`, label: 'Donors' },
              { value: `${[...new Set(donors.flatMap(d => d.supportTypes))].length}`, label: 'Ways of Giving' },
              { value: `${[...new Set(donors.map(d => d.country))].length}`, label: 'Countries' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 900, color: '#b91c1c', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: "'Crimson Text',serif", fontSize: '14px', color: '#a07070', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <div style={{ ...SL } as any} />

      {/* Filters */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '36px 24px 0' }}>
        {/* Support type filter */}
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontFamily: "'Cinzel',serif", fontSize: '8px', letterSpacing: '0.3em', color: '#a07070', textTransform: 'uppercase', marginBottom: '10px' }}>Filter by Support Type</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <button className={`filter-btn${activeFilter === 'All' ? ' active' : ''}`} onClick={() => setActiveFilter('All')}>All</button>
            {supportCategories.map(cat => (
              <button key={cat} className={`filter-btn${activeFilter === cat ? ' active' : ''}`} onClick={() => setActiveFilter(cat)}>
                {SUPPORT_META[cat].icon} {cat}
              </button>
            ))}
          </div>
        </div>
        {/* Recognition filter */}
        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontFamily: "'Cinzel',serif", fontSize: '8px', letterSpacing: '0.3em', color: '#a07070', textTransform: 'uppercase', marginBottom: '10px' }}>Filter by Recognition</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <button className={`filter-btn${activeRec === 'All' ? ' active' : ''}`} onClick={() => setActiveRec('All')}>All</button>
            {(['Patron','Benefactor','Supporter','Friend'] as const).map(r => (
              <button key={r} className={`filter-btn${activeRec === r ? ' active' : ''}`} onClick={() => setActiveRec(r)}>
                {RECOGNITION_META[r].icon} {r}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px', color: '#a07070', fontFamily: "'Crimson Text',serif", fontSize: '20px', fontStyle: 'italic' }}>No donors match this filter.</div>
          ) : (
            <motion.div
              layout
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '22px', paddingBottom: '90px' }}
            >
              {filtered.map(donor => <DonorCard key={donor.id} donor={donor} />)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA — Become a donor */}
      <section style={{ background: '#fff', borderTop: '1px solid rgba(185,28,28,0.08)', padding: '60px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Cinzel',serif", fontSize: '9px', letterSpacing: '0.35em', color: '#b91c1c', textTransform: 'uppercase', marginBottom: '10px' }}>Your Turn</p>
        <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(20px,3vw,34px)', fontWeight: 700, color: '#1a0808', marginBottom: '12px' }}>Support Our Mission</h2>
        <p style={{ fontFamily: "'Crimson Text',serif", fontSize: '18px', color: '#6b3333', maxWidth: '480px', margin: '0 auto 28px', lineHeight: 1.75 }}>
          You don't have to donate money to make a difference. Food, accommodation, time, skills — every offering matters.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/support" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', background: 'linear-gradient(135deg,#991b1b,#b91c1c)', color: '#fff', fontFamily: "'Cinzel',serif", fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, borderRadius: '3px', textDecoration: 'none', boxShadow: '0 6px 20px rgba(185,28,28,0.22)', transition: 'all 0.3s' }}>
            Support Us →
          </a>
          <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', background: 'transparent', color: '#b91c1c', fontFamily: "'Cinzel',serif", fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, borderRadius: '3px', textDecoration: 'none', border: '1px solid rgba(185,28,28,0.3)', transition: 'all 0.3s' }}>
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default DonorsPage;