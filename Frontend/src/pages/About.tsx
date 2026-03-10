import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const institutions = [
  {
    abbr: "RDCCK",
    name: "Residential Dharma Children's Care Khenpo School",
    desc: "A monastic residential school nurturing young monks in discipline, compassion, and Buddhist philosophy — providing both spiritual and academic education.",
    logo: "https://rdcck.org/img/logo.png", // replace with RDCCK logo
    fallbackIcon: "🏫",
    color: "#b91c1c",
    website: "#",
  },
  {
    abbr: "RDSCL",
    name: "Residential Dharma Sangha College & Learning Center",
    desc: "A higher-level monastic college offering advanced Buddhist studies, meditation training, and philosophical education for monks and serious practitioners.",
    logo: null,
    fallbackIcon: "🎓",
    color: "#991b1b",
    website: "#",
  },
  {
    abbr: "Dharma TV",
    name: "Dharma Television",
    desc: "A satellite TV channel registered under the Government of Nepal — broadcasting Dharma teachings, meditation guidance, and spiritual programs to a global audience.",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdYysfqrvalS-TerkBDcijeup1P4ez5WSPkg&s",
    fallbackIcon: "📡",
    color: "#7f1d1d",
    website: "https://dharmatelevision.tv/",
  },
  {
    abbr: "NEA",
    name: "Noble Enlightened Association",
    desc: "A community-based non-profit supporting humanitarian activities, spiritual education, and community welfare inspired by Buddhist values.",
    logo: null,
    fallbackIcon: "🌸",
    color: "#b91c1c",
    website: "#",
  },
  {
    abbr: "BTMC Foundation",
    name: "BTMC Foundation – Nepal & India",
    desc: "A charitable foundation promoting educational, humanitarian, and spiritual programs across both Nepal and India.",
    logo: "https://rdcck.org/img/BTMC%20FINAL%20LOGO%20.png",
    fallbackIcon: "🙏",
    color: "#dc2626",
    website: "https://btmcfoundation.org/",
  },
  {
    abbr: "Pure Land Tours",
    name: "Pure Land Tours & Travels",
    desc: "Providing affordable transport, accommodation, and pilgrimage services to spiritual travelers, retreat participants, and pilgrims.",
    logo: "https://catalog.wlimg.com/4/1834597/other-images/54852.jpg",
    fallbackIcon: "🗺️",
    color: "#991b1b",
    website: "https://www.purelandtravels.com.np/",
  },
  {
    abbr: "Padma Sambhava Tri",
    name: "Padma Sambhava Tri – India",
    desc: "A partner organization in India facilitating pilgrimage tours, spiritual travel, and retreat logistics for practitioners and visitors.",
    logo: "https://res.cloudinary.com/dihev9qxc/image/upload/v1768991877/453207561_122102729312441160_4787222294410407220_n-removebg-preview_voy795.png",
    fallbackIcon: "☸️",
    color: "#7f1d1d",
    website: "https://padmasambhavatrip.com/",
  },
];

const retreatOfferings = [
  { label: "Meditation & Mindfulness", icon: "🧘" },
  { label: "Dharma Teachings", icon: "📜" },
  { label: "Healing & Spiritual Guidance", icon: "✨" },
  { label: "Pilgrimage Practice", icon: "🏔️" },
  { label: "Inner Transformation", icon: "🌅" },
  { label: "Community Practice", icon: "🤝" },
];

const stats = [
  { value: "2003", label: "Year Founded", suffix: "" },
  { value: "7", label: "Institutions Born", suffix: "+" },
  { value: "100", label: "Practitioners Served", suffix: "s" },
  { value: "Free", label: "All Retreat Programs", suffix: "" },
];

// ─── Counter Animation ────────────────────────────────────────────────────────

function AnimatedCounter({ value, suffix }: { value: string; suffix: string }) {
  const isNum = !isNaN(Number(value));
  const [display, setDisplay] = useState(isNum ? "0" : value);
  const hasAnimated = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isNum) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const target = Number(value);
          let start = 0;
          const duration = 1800;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setDisplay(String(Math.floor(progress * target)));
            if (progress < 1) requestAnimationFrame(step);
            else setDisplay(value);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, isNum]);

  return (
    <div ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const headerParallax = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const [activeInstitution, setActiveInstitution] = useState<number | null>(null);
  const [mandalaAngle, setMandalaAngle] = useState(0);

  useEffect(() => {
    let raf: number;
    const rotate = () => {
      setMandalaAngle((a) => (a + 0.15) % 360);
      raf = requestAnimationFrame(rotate);
    };
    raf = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
        backgroundColor: "#0a0505",
        color: "#f5f0eb",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Cinzel:wght@400;500;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0505; }
        ::-webkit-scrollbar-thumb { background: #b91c1c; border-radius: 2px; }

        .institution-card {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          border: 1px solid rgba(185,28,28,0.2);
          background: linear-gradient(135deg, rgba(20,5,5,0.9) 0%, rgba(30,10,10,0.8) 100%);
          cursor: pointer;
        }
        .institution-card:hover {
          border-color: rgba(220,38,38,0.7);
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(185,28,28,0.25), 0 0 30px rgba(185,28,28,0.1);
        }
        .institution-card.active {
          border-color: #dc2626;
          background: linear-gradient(135deg, rgba(40,8,8,0.95) 0%, rgba(80,15,15,0.9) 100%);
          box-shadow: 0 25px 70px rgba(185,28,28,0.35), 0 0 50px rgba(185,28,28,0.15);
        }

        .glow-text {
          text-shadow: 0 0 40px rgba(220,38,38,0.4), 0 0 80px rgba(220,38,38,0.15);
        }

        .dharma-wheel {
          animation: spin 30s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: float-up linear infinite;
        }
        @keyframes float-up {
          0% { opacity: 0; transform: translateY(0) scale(0); }
          20% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-120px) scale(1); }
        }

        .retreat-pill {
          transition: all 0.3s ease;
          border: 1px solid rgba(185,28,28,0.3);
        }
        .retreat-pill:hover {
          background: rgba(185,28,28,0.3);
          border-color: #dc2626;
          transform: scale(1.05);
        }

        .quote-line {
          position: relative;
        }
        .quote-line::before {
          content: '';
          position: absolute;
          left: -24px;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 80%;
          background: linear-gradient(to bottom, transparent, #dc2626, transparent);
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #f5f0eb 0%, #dc2626 40%, #f5a623 50%, #dc2626 60%, #f5f0eb 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .section-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(185,28,28,0.6), rgba(245,166,35,0.4), rgba(185,28,28,0.6), transparent);
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(185,28,28,0.3); }
          50% { box-shadow: 0 0 50px rgba(185,28,28,0.7), 0 0 80px rgba(185,28,28,0.3); }
        }
        .pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "radial-gradient(ellipse at 50% 0%, rgba(120,10,10,0.4) 0%, rgba(10,5,5,1) 70%)",
        }}
      >
        {/* Noise texture overlay */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }} />

        {/* Animated mandala background */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          pointerEvents: "none",
        }}>
          {[1, 2, 3, 4, 5].map((ring) => (
            <div key={ring} style={{
              position: "absolute",
              width: `${ring * 160}px`,
              height: `${ring * 160}px`,
              border: `1px solid rgba(185,28,28,${0.25 - ring * 0.04})`,
              borderRadius: "50%",
              transform: `rotate(${mandalaAngle * (ring % 2 === 0 ? 1 : -1) * (0.3 + ring * 0.1)}deg)`,
              borderStyle: ring % 2 === 0 ? "dashed" : "solid",
            }} />
          ))}
          {/* Dharma wheel */}
          <svg width="300" height="300" viewBox="0 0 300 300" style={{ opacity: 0.06, position: "absolute" }}>
            <g transform="translate(150,150)">
              {Array.from({ length: 8 }).map((_, i) => (
                <line key={i}
                  x1="0" y1="-120" x2="0" y2="120"
                  stroke="#dc2626" strokeWidth="2"
                  transform={`rotate(${i * 22.5 + mandalaAngle * 0.5})`}
                />
              ))}
              <circle cx="0" cy="0" r="30" fill="none" stroke="#dc2626" strokeWidth="3" />
              <circle cx="0" cy="0" r="120" fill="none" stroke="#dc2626" strokeWidth="2" />
            </g>
          </svg>
        </div>

        {/* Floating particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="particle" style={{
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            background: i % 3 === 0 ? "#f5a623" : "#dc2626",
            left: `${5 + i * 8}%`,
            bottom: `${10 + (i % 4) * 15}%`,
            animationDuration: `${3 + i * 0.7}s`,
            animationDelay: `${i * 0.5}s`,
          }} />
        ))}

        {/* Hero content */}
        <motion.div
          style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px", y: headerParallax }}
        >
          {/* Top ornament */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "32px" }}
          >
            <div style={{ height: "1px", width: "80px", background: "linear-gradient(90deg, transparent, #dc2626)" }} />
            <span style={{ fontSize: "24px" }}>☸</span>
            <div style={{ height: "1px", width: "80px", background: "linear-gradient(90deg, #dc2626, transparent)" }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(10px, 2vw, 13px)",
              letterSpacing: "0.35em",
              color: "#dc2626",
              marginBottom: "20px",
              textTransform: "uppercase",
            }}
          >
            Buddhist Teaching &amp; Meditation Center
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="glow-text"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(48px, 8vw, 110px)",
              fontWeight: 900,
              lineHeight: 0.9,
              marginBottom: "32px",
              color: "#f5f0eb",
              letterSpacing: "-0.02em",
            }}
          >
            About
            <br />
            <span className="shimmer-text">BTMC</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            style={{
              fontFamily: "'Crimson Text', serif",
              fontSize: "clamp(16px, 2.5vw, 22px)",
              color: "rgba(245,240,235,0.65)",
              maxWidth: "600px",
              margin: "0 auto 48px",
              lineHeight: 1.7,
              fontStyle: "italic",
            }}
          >
            Spreading Buddhist wisdom and fostering spiritual growth since 2003 —
            a sanctuary of peace open to all.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
          >
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "0.3em", color: "rgba(245,240,235,0.35)", textTransform: "uppercase" }}>Scroll to discover</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: "1px", height: "50px", background: "linear-gradient(to bottom, rgba(220,38,38,0.8), transparent)" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg, rgba(15,5,5,1) 0%, rgba(25,8,8,1) 100%)", position: "relative" }}>
        <div className="section-divider" style={{ position: "absolute", top: 0, left: 0 }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "48px" }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              style={{ textAlign: "center" }}
            >
              <div style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 900,
                color: "#dc2626",
                lineHeight: 1,
                marginBottom: "8px",
              }}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div style={{ fontFamily: "'Crimson Text', serif", fontSize: "16px", color: "rgba(245,240,235,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="section-divider" style={{ position: "absolute", bottom: 0, left: 0 }} />
      </section>

      {/* ── FOUNDER ──────────────────────────────────────────────────────── */}
      <section style={{ padding: "120px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "80px", alignItems: "center" }}>
          {/* Founder portrait */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            style={{ position: "relative", display: "flex", justifyContent: "center" }}
          >
            {/* Decorative rings behind image */}
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
              {[280, 340, 400].map((size, i) => (
                <div key={size} style={{
                  position: "absolute",
                  width: size, height: size,
                  borderRadius: "50%",
                  border: `1px solid rgba(185,28,28,${0.18 - i * 0.05})`,
                  borderStyle: i % 2 === 0 ? "solid" : "dashed",
                }} />
              ))}
            </div>

            {/* Image frame */}
            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{
                width: "260px",
                height: "320px",
                borderRadius: "6px",
                overflow: "hidden",
                border: "2px solid rgba(185,28,28,0.5)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(185,28,28,0.15)",
                position: "relative",
              }}>
                <img
                  src="https://res.cloudinary.com/dihev9qxc/image/upload/v1764919931/guru1_wja3ki.jpg"
                  alt="Venerable Dr. Khen Rinpoche Sonam Gyurme"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top center",
                    display: "block",
                  }}
                />
                {/* Subtle gradient overlay at bottom */}
                <div style={{
                  position: "absolute",
                  bottom: 0, left: 0, right: 0,
                  height: "80px",
                  background: "linear-gradient(to top, rgba(10,5,5,0.8), transparent)",
                }} />
              </div>

              {/* Red accent badge */}
              <div className="pulse-glow" style={{
                position: "absolute",
                bottom: "-16px",
                right: "-16px",
                width: "90px",
                height: "90px",
                background: "linear-gradient(135deg, #991b1b, #dc2626)",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "3px",
              }}>
                <span style={{ fontSize: "22px" }}>☸</span>
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: "8px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.85)", textAlign: "center", lineHeight: 1.3 }}>FOUNDER</span>
              </div>
            </div>
          </motion.div>

          {/* Founder text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            <div>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "0.35em", color: "#dc2626", textTransform: "uppercase", marginBottom: "12px" }}>
                Spiritual Director &amp; Founder
              </p>
              <h2 style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(24px, 3.5vw, 42px)",
                fontWeight: 700,
                color: "#f5f0eb",
                lineHeight: 1.15,
                marginBottom: "8px",
              }}>
                Venerable Dr. Khen Rinpoche
              </h2>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(18px, 2.5vw, 28px)",
                fontWeight: 400,
                color: "rgba(245,240,235,0.6)",
                fontStyle: "italic",
              }}>
                Sonam Gyurme
              </h3>
            </div>

            <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg, #dc2626, transparent)" }} />

            <p className="quote-line" style={{
              fontFamily: "'Crimson Text', serif",
              fontSize: "clamp(15px, 1.8vw, 19px)",
              color: "rgba(245,240,235,0.75)",
              lineHeight: 1.85,
              paddingLeft: "24px",
              borderLeft: "none",
            }}>
              A respected Buddhist scholar, meditation master, and humanitarian spiritual leader dedicated to spreading the teachings of compassion, wisdom, and peace throughout the world.
            </p>

            <p style={{
              fontFamily: "'Crimson Text', serif",
              fontSize: "clamp(14px, 1.6vw, 17px)",
              color: "rgba(245,240,235,0.55)",
              lineHeight: 1.85,
            }}>
              Having received extensive monastic education and earned the prestigious title of <em>Khenpo (Abbot/Professor of Buddhist Philosophy)</em>, he has guided thousands of practitioners in Mahayana and Vajrayana Buddhism — particularly the powerful Ngyungne fasting retreat of Chenrezig, the Buddha of Compassion.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "8px" }}>
              {["Khenpo Scholar", "Meditation Master", "Humanitarian", "Dharma TV Founder"].map((tag) => (
                <span key={tag} style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  padding: "6px 14px",
                  border: "1px solid rgba(185,28,28,0.5)",
                  color: "rgba(245,240,235,0.6)",
                  borderRadius: "2px",
                  textTransform: "uppercase",
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT BTMC ───────────────────────────────────────────────────── */}
      <section style={{
        padding: "120px 24px",
        background: "linear-gradient(180deg, rgba(10,5,5,0) 0%, rgba(20,5,5,1) 20%, rgba(20,5,5,1) 80%, rgba(10,5,5,0) 100%)",
        position: "relative",
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "0.35em", color: "#dc2626", textTransform: "uppercase", marginBottom: "20px" }}
          >
            Our Story
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(28px, 5vw, 60px)",
              fontWeight: 700,
              color: "#f5f0eb",
              lineHeight: 1.1,
              marginBottom: "60px",
            }}
          >
            The Heart of BTMC
          </motion.h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "32px", textAlign: "left" }}>
            {[
              {
                heading: "Founded on a Vision of Free Dharma",
                body: "The Buddhist Teaching & Meditation Center was founded in 2023 in Kathmandu, Nepal by Venerable Dr. Khen Rinpoche Sonam Gyurme with a singular, noble purpose — to offer retreat programs, meditation practices, Dharma teachings, and spiritual courses completely free of cost, making authentic Buddhist wisdom accessible to all, regardless of financial background.",
              },
              {
                heading: "A Growing Spiritual Ecosystem",
                body: "Since its founding, BTMC has rapidly grown into a dynamic spiritual hub, giving birth to seven major academic and non-academic institutions that together serve hundreds of practitioners, residential monastic students, volunteers, and spiritual seekers. This vibrant network is united by one purpose: the preservation and propagation of Buddhist teachings.",
              },
              {
                heading: "Rooted in Compassion",
                body: "BTMC is dedicated to promoting inner peace, compassion, wisdom, and spiritual awakening through the teachings of the Buddha. The center welcomes practitioners, students, and peace seekers from Nepal and around the world who wish to deepen their understanding of meditation and the path to enlightenment — building a truly global community.",
              },
            ].map((block, i) => (
              <motion.div
                key={block.heading}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: "32px",
                  alignItems: "start",
                }}
              >
                <div style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(48px, 6vw, 80px)",
                  fontWeight: 900,
                  color: "rgba(185,28,28,0.15)",
                  lineHeight: 1,
                  userSelect: "none",
                  minWidth: "60px",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "clamp(14px, 1.8vw, 20px)",
                    fontWeight: 600,
                    color: "#f5f0eb",
                    marginBottom: "12px",
                  }}>
                    {block.heading}
                  </h3>
                  <p style={{
                    fontFamily: "'Crimson Text', serif",
                    fontSize: "clamp(15px, 1.7vw, 18px)",
                    color: "rgba(245,240,235,0.6)",
                    lineHeight: 1.85,
                  }}>
                    {block.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTITUTIONS ─────────────────────────────────────────────────── */}
      <section style={{ padding: "120px 24px", position: "relative" }}>
        <div className="section-divider" style={{ position: "absolute", top: 0, left: 0 }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "80px" }}
          >
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "0.35em", color: "#dc2626", textTransform: "uppercase", marginBottom: "16px" }}>
              Our Ecosystem
            </p>
            <h2 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(28px, 5vw, 56px)",
              fontWeight: 700,
              color: "#f5f0eb",
              lineHeight: 1.1,
            }}>
              Seven Institutions.<br />One Mission.
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
            {institutions.map((inst, i) => (
              <motion.div
                key={inst.abbr}
                className={`institution-card ${activeInstitution === i ? "active" : ""}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                onClick={() => setActiveInstitution(activeInstitution === i ? null : i)}
                style={{ padding: "32px", borderRadius: "4px", display: "flex", flexDirection: "column" }}
              >
                {/* Logo area — centered */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                  <div style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: `2px solid rgba(185,28,28,${activeInstitution === i ? 0.8 : 0.35})`,
                    background: "rgba(20,5,5,0.9)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "border-color 0.3s ease",
                    flexShrink: 0,
                  }}>
                    {inst.logo ? (
                      <img
                        src={inst.logo}
                        alt={`${inst.abbr} logo`}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                          (e.currentTarget.nextSibling as HTMLElement).style.display = "flex";
                        }}
                      />
                    ) : null}
                    <span style={{
                      fontSize: "32px",
                      display: inst.logo ? "none" : "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "100%",
                    }}>
                      {inst.fallbackIcon}
                    </span>
                  </div>
                </div>

                {/* Abbr label */}
                <div style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  color: "#dc2626",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                  textAlign: "center",
                }}>
                  {inst.abbr}
                </div>

                {/* Full name */}
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "17px",
                  fontWeight: 600,
                  color: "#f5f0eb",
                  lineHeight: 1.35,
                  marginBottom: "16px",
                  textAlign: "center",
                }}>
                  {inst.name}
                </h3>

                {/* Divider */}
                <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(185,28,28,0.4), transparent)", marginBottom: "16px" }} />

                {/* Expandable description */}
                <AnimatePresence>
                  {activeInstitution === i && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{
                        fontFamily: "'Crimson Text', serif",
                        fontSize: "16px",
                        color: "rgba(245,240,235,0.65)",
                        lineHeight: 1.75,
                        overflow: "hidden",
                        marginBottom: "20px",
                        textAlign: "center",
                      }}
                    >
                      {inst.desc}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Action row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginTop: "auto" }}>
                  {activeInstitution !== i ? (
                    <span style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "9px",
                      letterSpacing: "0.2em",
                      color: "rgba(185,28,28,0.55)",
                      textTransform: "uppercase",
                    }}>
                      Tap to learn more ↓
                    </span>
                  ) : (
                    <a
                      href={inst.website}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "9px 20px",
                        background: "linear-gradient(135deg, rgba(185,28,28,0.25), rgba(220,38,38,0.15))",
                        border: "1px solid rgba(220,38,38,0.6)",
                        borderRadius: "2px",
                        fontFamily: "'Cinzel', serif",
                        fontSize: "10px",
                        letterSpacing: "0.2em",
                        color: "#f5f0eb",
                        textDecoration: "none",
                        textTransform: "uppercase",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.background = "rgba(220,38,38,0.35)";
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = "#dc2626";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.background = "linear-gradient(135deg, rgba(185,28,28,0.25), rgba(220,38,38,0.15))";
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(220,38,38,0.6)";
                      }}
                    >
                      Visit Website <span style={{ color: "#dc2626" }}>→</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="section-divider" style={{ position: "absolute", bottom: 0, left: 0 }} />
      </section>

      {/* ── WEEKLY RETREATS ──────────────────────────────────────────────── */}
      <section style={{
        padding: "120px 24px",
        background: "radial-gradient(ellipse at 50% 100%, rgba(120,10,10,0.25) 0%, rgba(10,5,5,0) 70%)",
        position: "relative",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "80px", alignItems: "center" }}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "0.35em", color: "#dc2626", textTransform: "uppercase", marginBottom: "16px" }}>
                Now Launching
              </p>
              <h2 style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(26px, 4vw, 50px)",
                fontWeight: 700,
                color: "#f5f0eb",
                lineHeight: 1.15,
                marginBottom: "24px",
              }}>
                Weekly Free<br />Retreat Programs
              </h2>
              <p style={{
                fontFamily: "'Crimson Text', serif",
                fontSize: "clamp(15px, 1.7vw, 18px)",
                color: "rgba(245,240,235,0.6)",
                lineHeight: 1.85,
                marginBottom: "32px",
              }}>
                BTMC is launching weekly retreats designed to welcome hundreds of practitioners, peace lovers, and spiritual seekers — offered entirely free of cost, reflecting our unwavering commitment to accessible spiritual practice for all.
              </p>
              <a
                href="#"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 28px",
                  border: "1px solid rgba(185,28,28,0.5)",
                  borderRadius: "2px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  textDecoration: "none",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(185,28,28,0.2)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "#dc2626";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(185,28,28,0.5)";
                }}
              >
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "0.25em", color: "#f5f0eb", textTransform: "uppercase" }}>
                  Join a Retreat
                </span>
                <span style={{ color: "#dc2626" }}>→</span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {retreatOfferings.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="retreat-pill"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    padding: "20px 24px",
                    borderRadius: "4px",
                    background: "rgba(20,5,5,0.6)",
                    cursor: "default",
                  }}
                >
                  <span style={{ fontSize: "28px" }}>{item.icon}</span>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "18px",
                    fontWeight: 500,
                    color: "rgba(245,240,235,0.8)",
                  }}>
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2026 RETREAT EVENT ───────────────────────────────────────────── */}
      <section style={{
        padding: "120px 24px",
        background: "linear-gradient(135deg, #0f0202, #1a0404, #0f0202)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div className="section-divider" style={{ position: "absolute", top: 0, left: 0 }} />

        {/* Big decorative text */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(120px, 18vw, 280px)",
          fontWeight: 900,
          color: "rgba(185,28,28,0.04)",
          whiteSpace: "nowrap",
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "-0.05em",
        }}>
          2026
        </div>

        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          >
            <div style={{ fontSize: "48px", marginBottom: "24px" }}>🔔</div>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "0.35em", color: "#dc2626", textTransform: "uppercase", marginBottom: "16px" }}>
              December 8–24, 2026 · Jorpati, Kathmandu
            </p>
            <h2 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(22px, 3.5vw, 44px)",
              fontWeight: 700,
              color: "#f5f0eb",
              lineHeight: 1.15,
              marginBottom: "32px",
            }}>
              17 Days · 3rd International<br />Ngyungne Retreat &amp; 2nd Potala<br />World Peace Prayers
            </h2>
            <p style={{
              fontFamily: "'Crimson Text', serif",
              fontSize: "clamp(16px, 1.8vw, 20px)",
              color: "rgba(245,240,235,0.6)",
              lineHeight: 1.85,
              marginBottom: "24px",
            }}>
              Monks, nuns, spiritual masters, and lay practitioners from around the world will gather to practice the powerful Ngyungne fasting and purification retreat dedicated to Chenrezig — the Buddha of Compassion. Through intensive meditation, prayers, prostrations, and Dharma teachings, participants will have a rare opportunity to deepen their spiritual practice in a truly international environment.
            </p>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "6px 20px",
              background: "rgba(185,28,28,0.15)",
              border: "1px solid rgba(185,28,28,0.4)",
              borderRadius: "2px",
              marginBottom: "36px",
            }}>
              <span style={{ fontFamily: "'Crimson Text', serif", fontSize: "18px", color: "rgba(245,240,235,0.7)", fontStyle: "italic" }}>
                Free of cost · Voluntary donations basis
              </span>
            </div>

            {/* Register button */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <a
                href="#"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "16px 40px",
                  background: "linear-gradient(135deg, #991b1b, #dc2626)",
                  borderRadius: "3px",
                  fontFamily: "'Cinzel', serif",
                  fontSize: "12px",
                  letterSpacing: "0.3em",
                  color: "#fff",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  boxShadow: "0 8px 30px rgba(185,28,28,0.4), 0 0 60px rgba(185,28,28,0.1)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "linear-gradient(135deg, #7f1d1d, #b91c1c)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 12px 40px rgba(185,28,28,0.6), 0 0 80px rgba(185,28,28,0.2)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "linear-gradient(135deg, #991b1b, #dc2626)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(185,28,28,0.4), 0 0 60px rgba(185,28,28,0.1)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                }}
              >
                <span>Register for the Retreat</span>
                <span style={{ fontSize: "16px" }}>→</span>
              </a>
            </div>
          </motion.div>
        </div>
        <div className="section-divider" style={{ position: "absolute", bottom: 0, left: 0 }} />
      </section>

      {/* ── VISION ───────────────────────────────────────────────────────── */}
      <section style={{
        padding: "140px 24px",
        background: "radial-gradient(ellipse at 50% 50%, rgba(100,8,8,0.3) 0%, rgba(10,5,5,1) 70%)",
        position: "relative",
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Ornament */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", marginBottom: "40px" }}>
              <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, transparent, rgba(185,28,28,0.5))" }} />
              <span style={{ fontSize: "32px" }}>☸</span>
              <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, rgba(185,28,28,0.5), transparent)" }} />
            </div>

            <p style={{ fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "0.35em", color: "#dc2626", textTransform: "uppercase", marginBottom: "20px" }}>
              Our Vision
            </p>
            <blockquote style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(22px, 3.5vw, 42px)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "#f5f0eb",
              lineHeight: 1.5,
              marginBottom: "40px",
              letterSpacing: "0.01em",
            }}>
              "To create a world where individuals live in peace, compassion, and wisdom — a leading center for Buddhist education and spiritual growth, open to all who seek."
            </blockquote>
            <p style={{
              fontFamily: "'Crimson Text', serif",
              fontSize: "clamp(15px, 1.7vw, 18px)",
              color: "rgba(245,240,235,0.5)",
              lineHeight: 1.85,
            }}>
              Through teachings, pilgrimage tours, and community outreach, BTMC fosters a sense of global unity, understanding, and collective well-being — helping individuals cultivate inner transformation while contributing to the peace of all sentient beings.
            </p>

            {/* Bottom ornament */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", marginTop: "60px" }}>
              <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, transparent, rgba(185,28,28,0.3))" }} />
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "0.3em", color: "rgba(185,28,28,0.5)", textTransform: "uppercase" }}>BTMC · Est. 2003</span>
              <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, rgba(185,28,28,0.3), transparent)" }} />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}