import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowLeft, ChevronDown, Check } from 'lucide-react';
import { events } from '../data/events';
import EventRegistrationForm from '../components/events/EventRegistrationForm';

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [activeCourse, setActiveCourse] = useState<string | null>(null);

  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0505',
          fontFamily: "'Cinzel', serif",
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'rgba(245,240,235,0.4)', marginBottom: '16px' }}>Event not found</p>
          <Link to="/events" style={{ color: '#dc2626', textDecoration: 'none', fontSize: '13px', letterSpacing: '0.2em' }}>
            ← Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const handleRegistration = (data: any) => {
    console.log('Registration data:', data);
    setIsRegistrationOpen(false);
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 4000);
  };

  return (
    <div
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        backgroundColor: '#0a0505',
        color: '#f5f0eb',
        minHeight: '100vh',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

        .ed-back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(245,240,235,0.45);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .ed-back-link:hover { color: #dc2626; }

        .ed-highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(185,28,28,0.1);
        }

        .ed-course-card {
          border: 1px solid rgba(185,28,28,0.2);
          border-radius: 4px;
          overflow: hidden;
          transition: border-color 0.3s ease;
          cursor: pointer;
        }
        .ed-course-card:hover { border-color: rgba(220,38,38,0.5); }
        .ed-course-card.open { border-color: #dc2626; }

        .ed-register-btn {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #991b1b, #dc2626);
          color: #fff;
          border: none;
          border-radius: 3px;
          font-family: 'Cinzel', serif;
          font-size: 12px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(185,28,28,0.4);
          transition: all 0.3s ease;
        }
        .ed-register-btn:hover {
          background: linear-gradient(135deg, #7f1d1d, #b91c1c);
          box-shadow: 0 8px 28px rgba(185,28,28,0.55);
          transform: translateY(-1px);
        }

        .ed-gallery-img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 4px;
          border: 1px solid rgba(185,28,28,0.15);
          transition: all 0.3s ease;
        }
        .ed-gallery-img:hover {
          border-color: rgba(220,38,38,0.5);
          transform: scale(1.02);
        }

        .section-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(185,28,28,0.4), rgba(245,166,35,0.2), rgba(185,28,28,0.4), transparent);
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ position: 'relative', height: 'clamp(320px, 50vh, 520px)', overflow: 'hidden' }}
      >
        <img
          src={event.image}
          alt={event.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* Dark gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,5,5,0.3) 0%, rgba(10,5,5,0.85) 100%)',
        }} />
        {/* Noise texture */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }} />

        {/* Hero content */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(24px, 4vw, 60px)',
          maxWidth: '1200px', margin: '0 auto', width: '100%',
          left: '50%', transform: 'translateX(-50%)',
        }}>
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.2em',
                background: 'rgba(185,28,28,0.75)', color: '#fff',
                padding: '4px 12px', borderRadius: '2px', textTransform: 'uppercase',
                backdropFilter: 'blur(4px)',
              }}>
                {event.category}
              </span>
              {event.isFree && (
                <span style={{
                  fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.2em',
                  background: 'rgba(22,163,74,0.8)', color: '#fff',
                  padding: '4px 12px', borderRadius: '2px', textTransform: 'uppercase',
                  backdropFilter: 'blur(4px)',
                }}>
                  Free
                </span>
              )}
            </div>

            <h1 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(20px, 3.5vw, 46px)',
              fontWeight: 900,
              color: '#f5f0eb',
              lineHeight: 1.15,
              marginBottom: '20px',
              textShadow: '0 2px 20px rgba(0,0,0,0.5)',
              maxWidth: '800px',
            }}>
              {event.title}
            </h1>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {[
                { icon: Calendar, text: event.date },
                { icon: Clock, text: event.time },
                { icon: MapPin, text: event.venue },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <Icon size={14} color="#dc2626" />
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '0.12em', color: 'rgba(245,240,235,0.75)' }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── CONTENT ──────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px 100px' }}>
        {/* Back link */}
        <Link to="/events" className="ed-back-link" style={{ marginBottom: '40px', display: 'inline-flex' }}>
          <ArrowLeft size={13} /> Back to Events
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '60px', marginTop: '32px' }}>

          {/* ── LEFT: Main content ── */}
          <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '48px' }}>

            {/* About */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '0.35em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '12px' }}>
                About This Event
              </p>
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(18px, 2.5vw, 28px)', fontWeight: 700, color: '#f5f0eb', marginBottom: '20px' }}>
                Overview
              </h2>
              <p style={{ fontFamily: "'Crimson Text', serif", fontSize: 'clamp(16px, 1.8vw, 19px)', color: 'rgba(245,240,235,0.65)', lineHeight: 1.85 }}>
                {event.fullDescription}
              </p>
            </motion.section>

            <div className="section-line" />

            {/* Highlights */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '0.35em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '12px' }}>
                What's Included
              </p>
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(16px, 2vw, 24px)', fontWeight: 700, color: '#f5f0eb', marginBottom: '20px' }}>
                Program Highlights
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {event.highlights.map((h, i) => (
                  <motion.div
                    key={i}
                    className="ed-highlight-item"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.06 }}
                  >
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '50%',
                      background: 'rgba(185,28,28,0.15)',
                      border: '1px solid rgba(185,28,28,0.4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, marginTop: '2px',
                    }}>
                      <Check size={10} color="#dc2626" />
                    </div>
                    <span style={{ fontFamily: "'Crimson Text', serif", fontSize: '17px', color: 'rgba(245,240,235,0.7)', lineHeight: 1.5 }}>
                      {h}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Courses (only for weekly retreat) */}
            {event.courses && event.courses.length > 0 && (
              <>
                <div className="section-line" />
                <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '0.35em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '12px' }}>
                    Choose Your Practice
                  </p>
                  <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(16px, 2vw, 24px)', fontWeight: 700, color: '#f5f0eb', marginBottom: '24px' }}>
                    Weekend Course Options
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {event.courses.map((course) => (
                      <div
                        key={course.id}
                        className={`ed-course-card${activeCourse === course.id ? ' open' : ''}`}
                        onClick={() => setActiveCourse(activeCourse === course.id ? null : course.id)}
                      >
                        {/* Course header */}
                        <div style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '16px 20px',
                          background: activeCourse === course.id ? 'rgba(40,8,8,0.9)' : 'rgba(20,5,5,0.8)',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <span style={{ fontSize: '24px' }}>{course.icon}</span>
                            <div>
                              <div style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '0.15em', color: '#dc2626', textTransform: 'uppercase' }}>
                                {course.title}
                              </div>
                              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', fontWeight: 600, color: '#f5f0eb' }}>
                                {course.subtitle}
                              </div>
                            </div>
                          </div>
                          <ChevronDown
                            size={18}
                            color="rgba(245,240,235,0.4)"
                            style={{ transform: activeCourse === course.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease', flexShrink: 0 }}
                          />
                        </div>

                        {/* Course body */}
                        <AnimatePresence>
                          {activeCourse === course.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              style={{ overflow: 'hidden' }}
                            >
                              <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', borderTop: '1px solid rgba(185,28,28,0.15)' }}>
                                {/* Day 1 */}
                                <div>
                                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '0.18em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '12px' }}>
                                    {course.day1Title}
                                  </p>
                                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '7px', listStyle: 'none', padding: 0 }}>
                                    {course.day1Items.map((item, i) => (
                                      <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                        <span style={{ color: '#dc2626', flexShrink: 0, marginTop: '2px' }}>·</span>
                                        <span style={{ fontFamily: "'Crimson Text', serif", fontSize: '15px', color: 'rgba(245,240,235,0.6)', lineHeight: 1.5 }}>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                {/* Day 2 */}
                                <div>
                                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '0.18em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '12px' }}>
                                    {course.day2Title}
                                  </p>
                                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '7px', listStyle: 'none', padding: 0 }}>
                                    {course.day2Items.map((item, i) => (
                                      <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                        <span style={{ color: '#dc2626', flexShrink: 0, marginTop: '2px' }}>·</span>
                                        <span style={{ fontFamily: "'Crimson Text', serif", fontSize: '15px', color: 'rgba(245,240,235,0.6)', lineHeight: 1.5 }}>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              {/* Benefits */}
                              <div style={{ padding: '12px 20px 20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {course.benefits.map((b) => (
                                  <span key={b} style={{
                                    fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.12em',
                                    padding: '4px 12px', border: '1px solid rgba(22,163,74,0.4)',
                                    color: 'rgba(134,239,172,0.8)', borderRadius: '2px', textTransform: 'uppercase',
                                  }}>
                                    ✔ {b}
                                  </span>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.section>
              </>
            )}

            {/* Gallery */}
            <div className="section-line" />
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '0.35em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '12px' }}>
                Gallery
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
                {event.gallery.map((img, i) => (
                  <img key={i} src={img} alt={`Gallery ${i + 1}`} className="ed-gallery-img" />
                ))}
              </div>
            </motion.section>
          </div>

          {/* ── RIGHT: Sticky registration card ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              position: 'sticky',
              top: '100px',
              alignSelf: 'start',
              gridColumn: 'span 1',
            }}
          >
            <div style={{
              background: 'linear-gradient(160deg, rgba(20,5,5,0.98) 0%, rgba(30,8,8,0.95) 100%)',
              border: '1px solid rgba(185,28,28,0.3)',
              borderRadius: '6px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            }}>
              {/* Card header */}
              <div style={{
                padding: '20px 24px',
                background: 'linear-gradient(135deg, rgba(120,10,10,0.4), rgba(185,28,28,0.2))',
                borderBottom: '1px solid rgba(185,28,28,0.2)',
              }}>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '0.3em', color: 'rgba(245,240,235,0.45)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Registration
                </p>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: '22px', fontWeight: 700, color: '#f5f0eb' }}>
                  {event.isFree ? 'Free Entry' : event.price}
                </p>
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Location */}
                <div>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.2em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Location
                  </p>
                  <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '16px', color: 'rgba(245,240,235,0.65)', lineHeight: 1.5 }}>
                    {event.location}
                  </p>
                </div>

                <div style={{ height: '1px', background: 'rgba(185,28,28,0.15)' }} />

                {/* Ticket types */}
                <div>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.2em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '12px' }}>
                    Participation Options
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {event.ticketTypes.map((ticket) => (
                      <div key={ticket.type} style={{
                        padding: '14px',
                        border: '1px solid rgba(185,28,28,0.2)',
                        borderRadius: '3px',
                        background: 'rgba(10,5,5,0.5)',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontFamily: "'Cinzel', serif", fontSize: '11px', fontWeight: 600, color: '#f5f0eb' }}>
                            {ticket.type}
                          </span>
                          <span style={{ fontFamily: "'Cinzel', serif", fontSize: '12px', fontWeight: 700, color: '#16a34a' }}>
                            {ticket.price === 0 ? 'Free' : `Rs. ${ticket.price}`}
                          </span>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {ticket.benefits.map((b, i) => (
                            <li key={i} style={{ display: 'flex', gap: '7px', alignItems: 'flex-start' }}>
                              <Check size={11} color="#16a34a" style={{ marginTop: '3px', flexShrink: 0 }} />
                              <span style={{ fontFamily: "'Crimson Text', serif", fontSize: '14px', color: 'rgba(245,240,235,0.5)' }}>{b}</span>
                            </li>
                          ))}
                        </ul>
                        <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.1em', color: 'rgba(245,240,235,0.25)', marginTop: '8px' }}>
                          {ticket.available} spots available
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Registration note */}
                {event.registrationNote && (
                  <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '14px', color: 'rgba(245,240,235,0.35)', fontStyle: 'italic', lineHeight: 1.6 }}>
                    {event.registrationNote}
                  </p>
                )}

                <button className="ed-register-btn" onClick={() => setIsRegistrationOpen(true)}>
                  Register Now
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Registration Form */}
      <EventRegistrationForm
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        onSubmit={handleRegistration}
        event={event}
      />

      {/* Thank you toast */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60 }}
            style={{
              position: 'fixed', bottom: '32px', right: '32px',
              background: 'linear-gradient(135deg, #15803d, #16a34a)',
              color: '#fff', padding: '16px 24px', borderRadius: '4px',
              boxShadow: '0 10px 30px rgba(22,163,74,0.4)',
              fontFamily: "'Cinzel', serif", fontSize: '11px',
              letterSpacing: '0.15em', zIndex: 9999,
              display: 'flex', alignItems: 'center', gap: '10px',
            }}
          >
            <Check size={16} /> Registration received — we'll contact you soon!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}