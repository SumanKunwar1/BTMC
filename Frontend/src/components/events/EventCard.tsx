import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Event } from '../../types/event';

interface EventCardProps {
  event: Event;
}

const categoryColors: Record<string, string> = {
  'Retreat': '#16a34a',
  'International Retreat': '#dc2626',
  'World Peace Prayers': '#7c3aed',
};

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35 }}
      style={{
        background: 'linear-gradient(160deg, rgba(20,5,5,0.95) 0%, rgba(28,8,8,0.9) 100%)',
        border: '1px solid rgba(185,28,28,0.18)',
        borderRadius: '6px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700&family=Crimson+Text:wght@400;600&display=swap');
        .ec-img { transition: transform 0.5s ease; }
        .ec-wrap:hover .ec-img { transform: scale(1.05); }
        .ec-learn { display: inline-flex; align-items: center; gap: 6px; font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: #dc2626; text-decoration: none; padding: 6px 0; border-bottom: 1px solid rgba(220,38,38,0.25); transition: all 0.2s ease; }
        .ec-learn:hover { color: #f87171; gap: 10px; border-bottom-color: #f87171; }
      `}</style>

      <div className="ec-wrap" style={{ overflow: 'hidden', position: 'relative' }}>
        <img
          src={event.image}
          alt={event.title}
          className="ec-img"
          style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
        />
        <div style={{
          position: 'absolute', top: '12px', left: '12px',
          display: 'flex', gap: '6px', flexWrap: 'wrap',
        }}>
          <span style={{
            fontFamily: "'Cinzel', serif", fontSize: '8px', letterSpacing: '0.15em',
            textTransform: 'uppercase', padding: '3px 9px', borderRadius: '2px',
            background: categoryColors[event.category] || '#dc2626', color: '#fff', fontWeight: 600,
          }}>
            {event.category}
          </span>
          {event.isFree && (
            <span style={{
              fontFamily: "'Cinzel', serif", fontSize: '8px', letterSpacing: '0.15em',
              textTransform: 'uppercase', padding: '3px 9px', borderRadius: '2px',
              background: '#15803d', color: '#fff', fontWeight: 600,
            }}>
              Free
            </span>
          )}
        </div>
        {event.tag && (
          <div style={{
            position: 'absolute', bottom: '12px', right: '12px',
            fontFamily: "'Cinzel', serif", fontSize: '8px', letterSpacing: '0.13em',
            background: 'rgba(10,5,5,0.85)', border: `1px solid ${event.tagColor || '#dc2626'}`,
            color: event.tagColor || '#dc2626', padding: '3px 9px', borderRadius: '2px',
            textTransform: 'uppercase', backdropFilter: 'blur(4px)',
          }}>
            {event.tag}
          </div>
        )}
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        <h3 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 'clamp(13px, 1.4vw, 16px)',
          fontWeight: 700, color: '#f5f0eb', lineHeight: 1.3,
        }}>
          {event.title}
        </h3>

        <p style={{
          fontFamily: "'Crimson Text', serif",
          fontSize: '15px', color: 'rgba(245,240,235,0.5)',
          lineHeight: 1.6, flex: 1,
        }}>
          {event.shortDescription.length > 110 ? event.shortDescription.slice(0, 110) + '...' : event.shortDescription}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <Calendar size={12} color="#dc2626" />
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.1em', color: 'rgba(245,240,235,0.4)' }}>
              {event.date}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <MapPin size={12} color="#dc2626" />
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.1em', color: 'rgba(245,240,235,0.4)' }}>
              {event.venue}
            </span>
          </div>
        </div>

        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(185,28,28,0.3), transparent)', margin: '6px 0' }} />

        <Link to={`/events/${event.id}`} className="ec-learn">
          View Details <ArrowRight size={11} />
        </Link>
      </div>
    </motion.div>
  );
};

export default EventCard;