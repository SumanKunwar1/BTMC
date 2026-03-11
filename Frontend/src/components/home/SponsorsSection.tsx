import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { sponsorTiers, Sponsor, SponsorTier } from '../../data/sponsors';

const SL = { height:'1px', background:'linear-gradient(90deg,transparent,rgba(185,28,28,0.2),rgba(217,119,6,0.15),rgba(185,28,28,0.2),transparent)' };

const InitialsAvatar = ({ name, color }: { name: string; color: string }) => {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', background:`${color}15`, fontFamily:"'Cinzel',serif", fontSize:'18px', fontWeight:700, color, letterSpacing:'0.05em' }}>
      {initials}
    </div>
  );
};

const SponsorCard = ({ sponsor, accentColor }: { sponsor: Sponsor; accentColor: string }) => {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  return (
    <motion.a
      href={sponsor.website}
      target={sponsor.website.startsWith('http') ? '_blank' : '_self'}
      rel="noopener noreferrer"
      initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.45 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:'flex', flexDirection:'column', alignItems:'center', gap:'10px',
        padding:'20px 16px', borderRadius:'6px', textDecoration:'none',
        background: hovered ? '#fff' : 'rgba(255,255,255,0.6)',
        border:`1px solid ${hovered ? accentColor : 'rgba(185,28,28,0.1)'}`,
        boxShadow: hovered ? `0 10px 28px ${accentColor}22` : '0 2px 8px rgba(185,28,28,0.04)',
        transition:'all 0.32s cubic-bezier(0.23,1,0.32,1)',
        transform: hovered ? 'translateY(-4px)' : 'none',
        cursor:'pointer', position:'relative', height:'100%', boxSizing:'border-box',
      }}
    >
      {sponsor.countryFlag && (
        <span style={{ position:'absolute', top:'8px', right:'10px', fontSize:'13px', opacity:0.65 }}>{sponsor.countryFlag}</span>
      )}
      <div style={{ width:'68px', height:'68px', borderRadius:'50%', overflow:'hidden', border:`2px solid ${hovered ? accentColor : 'rgba(185,28,28,0.12)'}`, background:'#fdf8f3', flexShrink:0, transition:'border-color 0.3s' }}>
        {sponsor.logo && !imgError
          ? <img src={sponsor.logo} alt={sponsor.name} style={{ width:'100%', height:'100%', objectFit:'contain', padding:'6px' }} onError={() => setImgError(true)} />
          : <InitialsAvatar name={sponsor.name} color={accentColor} />
        }
      </div>
      <div style={{ textAlign:'center' }}>
        <p style={{ fontFamily:"'Cinzel',serif", fontSize:'11px', fontWeight:700, color:'#1a0808', lineHeight:1.3, marginBottom:'4px' }}>{sponsor.name}</p>
        {sponsor.tagline && <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'13px', color:'#a07070', lineHeight:1.45 }}>{sponsor.tagline}</p>}
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:'4px', marginTop:'auto', paddingTop:'6px' }}>
        <span style={{ fontFamily:"'Cinzel',serif", fontSize:'8px', letterSpacing:'0.15em', color:accentColor, textTransform:'uppercase' }}>Visit</span>
        <ExternalLink size={10} color={accentColor} />
      </div>
    </motion.a>
  );
};

// One tier panel — lives inside a paired row
const TierPanel = ({ tier, delay }: { tier: SponsorTier; delay: number }) => (
  <motion.div
    initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay, duration:0.55 }}
    style={{ flex:1, minWidth:0, background:'#fff', border:'1px solid rgba(185,28,28,0.08)', borderRadius:'10px', padding:'24px 20px', boxShadow:'0 2px 14px rgba(185,28,28,0.05)', display:'flex', flexDirection:'column', gap:'20px' }}
  >
    {/* Tier header */}
    <div style={{ display:'flex', alignItems:'center', gap:'10px', paddingBottom:'14px', borderBottom:`1px solid ${tier.accentColor}25` }}>
      <span style={{ fontSize:'19px' }}>{tier.badgeIcon}</span>
      <div style={{ flex:1 }}>
        <p style={{ fontFamily:"'Cinzel',serif", fontSize:'12px', fontWeight:700, color:tier.accentColor, letterSpacing:'0.1em', marginBottom:'2px' }}>{tier.label}</p>
        <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'13px', color:'#a07070', lineHeight:1.35 }}>{tier.description}</p>
      </div>
      <div style={{ width:'3px', height:'32px', borderRadius:'2px', background:`linear-gradient(180deg,${tier.accentColor},${tier.accentColor}30)`, flexShrink:0 }} />
    </div>

    {/* Sponsor cards — max 2 per row, centered when solo */}
    <div style={{ display:'flex', flexWrap:'wrap', gap:'12px', justifyContent:'center', flex:1 }}>
      {tier.sponsors.map(s => (
        <div
          key={s.id}
          style={{
            width: tier.sponsors.length === 1 ? '100%' : 'calc(50% - 6px)',
            maxWidth: tier.sponsors.length === 1 ? '260px' : '240px',
            minWidth:'130px',
          }}
        >
          <SponsorCard sponsor={s} accentColor={tier.accentColor} />
        </div>
      ))}
    </div>
  </motion.div>
);

const SponsorsSection = () => {
  const titleTier  = sponsorTiers.find(t => t.id === 'title');
  const otherTiers = sponsorTiers.filter(t => t.id !== 'title');

  // Group remaining tiers into pairs
  const pairedRows: SponsorTier[][] = [];
  for (let i = 0; i < otherTiers.length; i += 2) {
    pairedRows.push(otherTiers.slice(i, i + 2));
  }

  return (
    <section style={{ position:'relative', padding:'90px 24px', background:'#fdf8f3', overflow:'hidden' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Text:wght@400;600&display=swap');`}</style>
      <div style={{ ...SL, position:'absolute', top:0, left:0, right:0 } as any} />
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 0%,rgba(185,28,28,0.04) 0%,transparent 65%)', pointerEvents:'none' }} />

      <div style={{ maxWidth:'1200px', margin:'0 auto', position:'relative', zIndex:2 }}>

        {/* Header */}
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }} style={{ textAlign:'center', marginBottom:'64px' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'14px', marginBottom:'18px' }}>
            <div style={{ height:'1px', width:'50px', background:'linear-gradient(90deg,transparent,#b91c1c)' }} />
            <span style={{ fontSize:'22px' }}>🌟</span>
            <div style={{ height:'1px', width:'50px', background:'linear-gradient(90deg,#b91c1c,transparent)' }} />
          </div>
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', letterSpacing:'0.4em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'12px' }}>Our Partners & Patrons</p>
          <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(26px,4vw,48px)', fontWeight:900, color:'#1a0808', lineHeight:1.1, marginBottom:'14px' }}>Those Who Make It Possible</h2>
          <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'18px', color:'#6b3333', maxWidth:'540px', margin:'0 auto', lineHeight:1.75, fontStyle:'italic' }}>
            Every sponsor and partner plays a sacred role in sustaining our mission of free Dharma, meditation, and peace for all.
          </p>
        </motion.div>

        {/* Title sponsor — full width solo */}
        {titleTier && (
          <motion.div initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }} style={{ marginBottom:'32px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'22px' }}>
              <span style={{ fontSize:'20px' }}>{titleTier.badgeIcon}</span>
              <div>
                <p style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', fontWeight:700, color:titleTier.accentColor, letterSpacing:'0.08em' }}>{titleTier.label}</p>
                <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'14px', color:'#a07070' }}>{titleTier.description}</p>
              </div>
              <div style={{ flex:1, height:'1px', background:`linear-gradient(90deg,${titleTier.accentColor}50,transparent)` }} />
            </div>
            <div style={{ display:'flex', justifyContent:'center' }}>
              <div style={{ width:'100%', maxWidth:'400px' }}>
                <SponsorCard sponsor={titleTier.sponsors[0]} accentColor={titleTier.accentColor} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Paired tier rows — 2 different sponsor types side by side */}
        <div style={{ display:'flex', flexDirection:'column', gap:'24px' }}>
          {pairedRows.map((pair, ri) => (
            <div key={ri} style={{ display:'flex', gap:'20px', alignItems:'stretch', flexWrap:'wrap' }}>
              {pair.map((tier, ti) => (
                <TierPanel key={tier.id} tier={tier} delay={ti * 0.1} />
              ))}
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.2 }} style={{ textAlign:'center', marginTop:'56px', padding:'40px 32px', background:'#fff', border:'1px solid rgba(185,28,28,0.12)', borderRadius:'8px', boxShadow:'0 4px 20px rgba(185,28,28,0.06)' }}>
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:'9px', letterSpacing:'0.35em', color:'#b91c1c', textTransform:'uppercase', marginBottom:'10px' }}>Join Our Family</p>
          <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(18px,2.5vw,28px)', fontWeight:700, color:'#1a0808', marginBottom:'12px' }}>Become a Sponsor</h3>
          <p style={{ fontFamily:"'Crimson Text',serif", fontSize:'17px', color:'#6b3333', maxWidth:'480px', margin:'0 auto 24px', lineHeight:1.75 }}>
            Partner with BTMC Foundation and align your organization with compassion, wisdom, and global peace. Multiple tiers available.
          </p>
          <a href="/contact"
            style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'12px 28px', background:'linear-gradient(135deg,#991b1b,#b91c1c)', color:'#fff', fontFamily:"'Cinzel',serif", fontSize:'10px', letterSpacing:'0.22em', textTransform:'uppercase', fontWeight:700, borderRadius:'3px', textDecoration:'none', boxShadow:'0 6px 20px rgba(185,28,28,0.22)', transition:'all 0.3s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background='linear-gradient(135deg,#7f1d1d,#991b1b)'; (e.currentTarget as HTMLAnchorElement).style.transform='translateY(-1px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background='linear-gradient(135deg,#991b1b,#b91c1c)'; (e.currentTarget as HTMLAnchorElement).style.transform='none'; }}
          >
            Get In Touch →
          </a>
        </motion.div>

      </div>
      <div style={{ ...SL, position:'absolute', bottom:0, left:0, right:0 } as any} />
    </section>
  );
};

export default SponsorsSection;