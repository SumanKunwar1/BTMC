import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, CheckCircle, Calendar, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { tours } from '../data/tours';
import BookingForm from '../components/tours/BookingForm';
import TourCard from '../components/tours/TourCard';
import { BookingFormData } from '../types/tour';

const TourDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [expandedDays, setExpandedDays] = useState<number[]>([]);

  const tour = tours.find((t) => t.id === id);
  const relatedTours = tours.filter((t) => t.id !== id).slice(0, 3);

  if (!tour) {
    return (
      <div style={{ background: '#0a0505', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: '24px', color: '#f5f0eb', marginBottom: '16px' }}>Tour Not Found</p>
          <Link to="/tours" style={{ fontFamily: "'Cinzel', serif", fontSize: '11px', letterSpacing: '0.2em', color: '#dc2626', textDecoration: 'none' }}>← Back to Tours</Link>
        </div>
      </div>
    );
  }

  const handleBooking = (data: BookingFormData) => {
    setIsBookingOpen(false);
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);
  };

  const toggleDay = (day: number) => {
    setExpandedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  return (
    <div style={{ background: '#0a0505', minHeight: '100vh', color: '#f5f0eb' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Crimson+Text:wght@400;600&display=swap');
        .section-line { height: 1px; background: linear-gradient(90deg, transparent, rgba(185,28,28,0.5), rgba(245,166,35,0.3), rgba(185,28,28,0.5), transparent); }
        .itinerary-item {
          background: linear-gradient(160deg, rgba(20,5,5,0.97), rgba(28,8,8,0.92));
          border: 1px solid rgba(185,28,28,0.15);
          border-radius: 4px;
          overflow: hidden;
          transition: border-color 0.3s ease;
        }
        .itinerary-item:hover { border-color: rgba(220,38,38,0.35); }
        .itinerary-btn {
          width: 100%; background: none; border: none; cursor: pointer;
          padding: 18px 20px; display: flex; align-items: center;
          justify-content: space-between; text-align: left;
        }
        .book-btn {
          width: 100%; padding: 15px;
          background: linear-gradient(135deg, #991b1b, #dc2626);
          color: #fff; border: none; border-radius: 3px;
          font-family: 'Cinzel', serif; font-size: 11px;
          letter-spacing: 0.25em; text-transform: uppercase; font-weight: 700;
          cursor: pointer; transition: all 0.3s ease;
          box-shadow: 0 6px 20px rgba(185,28,28,0.35);
        }
        .book-btn:hover {
          background: linear-gradient(135deg, #7f1d1d, #b91c1c);
          box-shadow: 0 8px 28px rgba(185,28,28,0.55);
          transform: translateY(-1px);
        }
        .back-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Cinzel', serif; font-size: 9px;
          letter-spacing: 0.2em; color: rgba(245,240,235,0.45);
          text-decoration: none; text-transform: uppercase;
          transition: color 0.2s ease;
        }
        .back-link:hover { color: #dc2626; }
      `}</style>

      {/* Hero */}
      <motion.div
        style={{ position: 'relative', height: '60vh', minHeight: '400px', overflow: 'hidden' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
      >
        <img src={tour.image} alt={tour.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,5,5,0.85) 0%, rgba(80,10,10,0.5) 50%, rgba(10,5,5,0.75) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', background: 'linear-gradient(to bottom, transparent, #0a0505)' }} />

        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '40px', maxWidth: '1200px', margin: '0 auto', left: 0, right: 0 }}>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.4em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '12px' }}
          >
            Sacred Pilgrimage
          </motion.p>
          <motion.h1
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(24px, 4vw, 52px)', fontWeight: 900, color: '#f5f0eb', lineHeight: 1.1, marginBottom: '16px', textShadow: '0 2px 30px rgba(0,0,0,0.6)' }}
          >
            {tour.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}
          >
            {[
              { icon: <Clock size={13} color="#dc2626" />, text: `${tour.days} Days` },
              { icon: <MapPin size={13} color="#dc2626" />, text: 'Multiple Locations' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                {item.icon}
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(245,240,235,0.65)' }}>{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Back link */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 24px 0' }}>
        <Link to="/tours" className="back-link">
          <ArrowLeft size={12} /> Back to Tours
        </Link>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '48px', alignItems: 'start' }}>

          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>

            {/* Overview */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.35em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '10px' }}>Overview</p>
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(18px, 2vw, 26px)', fontWeight: 700, color: '#f5f0eb', marginBottom: '18px' }}>Tour Overview</h2>
              <div style={{ width: '50px', height: '2px', background: 'linear-gradient(90deg, #dc2626, transparent)', marginBottom: '18px' }} />
              <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '18px', color: 'rgba(245,240,235,0.6)', lineHeight: 1.85 }}>{tour.description}</p>
            </motion.section>

            {/* Highlights */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.35em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '10px' }}>Highlights</p>
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(18px, 2vw, 26px)', fontWeight: 700, color: '#f5f0eb', marginBottom: '18px' }}>Tour Highlights</h2>
              <div style={{ width: '50px', height: '2px', background: 'linear-gradient(90deg, #dc2626, transparent)', marginBottom: '24px' }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
                {tour.highlights.map((highlight, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle size={16} color="#dc2626" style={{ marginTop: '3px', flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Crimson Text', serif", fontSize: '17px', color: 'rgba(245,240,235,0.6)', lineHeight: 1.6 }}>{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Itinerary */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.35em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '10px' }}>Day by Day</p>
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(18px, 2vw, 26px)', fontWeight: 700, color: '#f5f0eb', marginBottom: '18px' }}>Itinerary</h2>
              <div style={{ width: '50px', height: '2px', background: 'linear-gradient(90deg, #dc2626, transparent)', marginBottom: '24px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {tour.itinerary.map((item) => (
                  <div key={item.day} className="itinerary-item">
                    <button className="itinerary-btn" onClick={() => toggleDay(item.day)}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                        <div style={{
                          width: '36px', height: '36px', borderRadius: '50%',
                          background: 'rgba(185,28,28,0.12)',
                          border: '1px solid rgba(185,28,28,0.3)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          <Calendar size={14} color="#dc2626" />
                        </div>
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ fontFamily: "'Cinzel', serif", fontSize: '11px', letterSpacing: '0.15em', color: '#f5f0eb', fontWeight: 600 }}>Day {item.day}</div>
                          {!expandedDays.includes(item.day) && (
                            <div style={{ fontFamily: "'Crimson Text', serif", fontSize: '15px', color: 'rgba(245,240,235,0.4)', marginTop: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '400px' }}>
                              {item.description.substring(0, 80)}…
                            </div>
                          )}
                        </div>
                      </div>
                      {expandedDays.includes(item.day)
                        ? <ChevronUp size={16} color="rgba(245,240,235,0.35)" />
                        : <ChevronDown size={16} color="rgba(245,240,235,0.35)" />
                      }
                    </button>
                    <AnimatePresence>
                      {expandedDays.includes(item.day) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ padding: '0 20px 18px 70px' }}
                        >
                          <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '17px', color: 'rgba(245,240,235,0.55)', lineHeight: 1.85 }}>
                            {item.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sticky sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}
            style={{ position: 'sticky', top: '100px' }}
          >
            <div style={{
              background: 'linear-gradient(160deg, rgba(20,5,5,0.97), rgba(28,8,8,0.92))',
              border: '1px solid rgba(185,28,28,0.25)',
              borderRadius: '5px',
              overflow: 'hidden',
            }}>
              {/* Sidebar header */}
              <div style={{
                padding: '20px',
                background: 'linear-gradient(135deg, rgba(185,28,28,0.12), rgba(185,28,28,0.05))',
                borderBottom: '1px solid rgba(185,28,28,0.15)',
              }}>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.3em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Ready to Join?
                </p>
                <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '16px', fontWeight: 700, color: '#f5f0eb' }}>
                  Book This Tour
                </h3>
              </div>

              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.25em', color: 'rgba(245,240,235,0.35)', textTransform: 'uppercase', marginBottom: '12px' }}>
                    What's Included
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {tour.inclusions.map((inclusion, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <CheckCircle size={13} color="#16a34a" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span style={{ fontFamily: "'Crimson Text', serif", fontSize: '15px', color: 'rgba(245,240,235,0.55)', lineHeight: 1.5 }}>{inclusion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(185,28,28,0.3), transparent)' }} />

                <button className="book-btn" onClick={() => setIsBookingOpen(true)}>
                  Book Now →
                </button>

                <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '13px', color: 'rgba(245,240,235,0.25)', textAlign: 'center', fontStyle: 'italic' }}>
                  We'll contact you within 24 hours
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Tours */}
        {relatedTours.length > 0 && (
          <motion.section
            style={{ marginTop: '80px' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
          >
            <div className="section-line" style={{ marginBottom: '48px' }} />
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.4em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '10px' }}>More Journeys</p>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 700, color: '#f5f0eb', marginBottom: '32px' }}>Related Tours</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              {relatedTours.map((t) => <TourCard key={t.id} tour={t} />)}
            </div>
          </motion.section>
        )}
      </div>

      <BookingForm isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} onSubmit={handleBooking} tourTitle={tour.title} />

      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
            style={{
              position: 'fixed', bottom: '32px', right: '32px', zIndex: 100,
              background: 'linear-gradient(135deg, #14532d, #16a34a)',
              border: '1px solid rgba(22,163,74,0.4)',
              borderRadius: '4px', padding: '16px 24px',
              fontFamily: "'Cinzel', serif", fontSize: '11px',
              letterSpacing: '0.15em', color: '#fff',
              boxShadow: '0 10px 30px rgba(22,163,74,0.3)',
            }}
          >
            ✓ Booking received — we'll contact you soon!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TourDetail;