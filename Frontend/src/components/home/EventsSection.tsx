import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { events } from '../../data/events';

const categoryColors: Record<string, string> = {
  'Retreat': '#16a34a',
  'International Retreat': '#dc2626',
  'World Peace Prayers': '#7c3aed',
};

const EventsSection = () => {
  const displayed = events.slice(0, 4);

  return (
    <section style={{
      background: 'linear-gradient(180deg, rgba(12,5,5,1) 0%, rgba(10,5,5,1) 100%)',
      padding: '100px 24px',
      position: 'relative',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700;900&family=Cormorant+Garamond:wght@400;500;600&family=Crimson+Text:wght@400;600&display=swap');
        .ev-card-home {
          background: linear-gradient(160deg, rgba(20,5,5,0.97) 0%, rgba(28,8,8,0.92) 100%);
          border: 1px solid rgba(185,28,28,0.18);
          border-radius: 5px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
          display: flex;
          flex-direction: column;
        }
        .ev-card-home:hover {
          border-color: rgba(220,38,38,0.55);
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(185,28,28,0.2), 0 0 30px rgba(185,28,28,0.08);
        }
        .ev-card-home-img { transition: transform 0.6s ease; width: 100%; height: 180px; object-fit: cover; display: block; }
        .ev-card-home:hover .ev-card-home-img { transform: scale(1.05); }
        .ev-more-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Cinzel', serif; font-size: 10px;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #dc2626; text-decoration: none;
          padding-bottom: 3px;
          border-bottom: 1px solid rgba(220,38,38,0.3);
          transition: all 0.25s ease;
        }
        .ev-more-link:hover { color: #f87171; border-bottom-color: #f87171; gap: 12px; }
        .ev-view-all {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Cinzel', serif; font-size: 11px;
          letter-spacing: 0.25em; text-transform: uppercase;
          color: #f5f0eb; text-decoration: none;
          padding: 13px 28px;
          border: 1px solid rgba(185,28,28,0.45);
          border-radius: 3px;
          transition: all 0.3s ease;
          background: transparent;
        }
        .ev-view-all:hover {
          background: rgba(185,28,28,0.15);
          border-color: #dc2626;
          gap: 14px;
        }
        .section-line { height: 1px; background: linear-gradient(90deg, transparent, rgba(185,28,28,0.5), rgba(245,166,35,0.3), rgba(185,28,28,0.5), transparent); }
      `}</style>

      <div className="section-line" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '16px' }}>
            <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg, transparent, rgba(185,28,28,0.6))' }} />
            <span style={{ fontSize: '18px' }}>🔔</span>
            <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg, rgba(185,28,28,0.6), transparent)' }} />
          </div>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '0.4em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '12px' }}>
            Sacred Gatherings
          </p>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(24px, 3.5vw, 44px)', fontWeight: 700, color: '#f5f0eb', lineHeight: 1.1 }}>
            Upcoming Events &amp; Retreats
          </h2>
        </motion.div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px', marginBottom: '56px' }}>
          {displayed.map((event, i) => (
            <motion.div
              key={event.id}
              className="ev-card-home"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
            >
              {/* Image */}
              <div style={{ overflow: 'hidden', position: 'relative' }}>
                <img src={event.image} alt={event.title} className="ev-card-home-img" />
                <div style={{
                  position: 'absolute', top: '10px', left: '10px',
                  display: 'flex', gap: '6px', flexWrap: 'wrap',
                }}>
                  <span style={{
                    fontFamily: "'Cinzel', serif", fontSize: '8px', letterSpacing: '0.12em',
                    background: categoryColors[event.category] || '#dc2626',
                    color: '#fff', padding: '3px 8px', borderRadius: '2px', textTransform: 'uppercase',
                  }}>
                    {event.category}
                  </span>
                  {event.isFree && (
                    <span style={{
                      fontFamily: "'Cinzel', serif", fontSize: '8px', letterSpacing: '0.12em',
                      background: '#15803d', color: '#fff', padding: '3px 8px', borderRadius: '2px', textTransform: 'uppercase',
                    }}>Free</span>
                  )}
                </div>
                {event.tag && (
                  <div style={{
                    position: 'absolute', bottom: '10px', right: '10px',
                    fontFamily: "'Cinzel', serif", fontSize: '8px', letterSpacing: '0.12em',
                    background: 'rgba(10,5,5,0.85)', border: `1px solid ${event.tagColor || '#dc2626'}`,
                    color: event.tagColor || '#dc2626', padding: '3px 8px', borderRadius: '2px',
                    textTransform: 'uppercase', backdropFilter: 'blur(4px)',
                  }}>
                    {event.tag}
                  </div>
                )}
              </div>

              {/* Body */}
              <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '13px', fontWeight: 700, color: '#f5f0eb', lineHeight: 1.35 }}>
                  {event.title}
                </h3>
                <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '15px', color: 'rgba(245,240,235,0.5)', lineHeight: 1.6, flex: 1 }}>
                  {event.shortDescription.length > 90 ? event.shortDescription.slice(0, 90) + '…' : event.shortDescription}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    <Calendar size={11} color="#dc2626" />
                    <span style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.1em', color: 'rgba(245,240,235,0.4)' }}>{event.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    <MapPin size={11} color="#dc2626" />
                    <span style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.1em', color: 'rgba(245,240,235,0.4)' }}>{event.venue}</span>
                  </div>
                </div>
                <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(185,28,28,0.3), transparent)' }} />
                <Link to={`/events/${event.id}`} className="ev-more-link">
                  View Details <ArrowRight size={11} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center' }}
        >
          <Link to="/events" className="ev-view-all">
            View All Events <ArrowRight size={13} />
          </Link>
        </motion.div>
      </div>

      <div className="section-line" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
    </section>
  );
};

export default EventsSection;