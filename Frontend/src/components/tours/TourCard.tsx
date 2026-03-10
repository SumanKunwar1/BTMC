import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import { Tour } from '../../types/tour';

interface TourCardProps {
  tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  return (
    <div style={{
      background: 'linear-gradient(160deg, rgba(20,5,5,0.97) 0%, rgba(28,8,8,0.92) 100%)',
      border: '1px solid rgba(185,28,28,0.18)',
      borderRadius: '5px',
      overflow: 'hidden',
      transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)',
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)';
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(220,38,38,0.5)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 50px rgba(185,28,28,0.2)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(185,28,28,0.18)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      <Link to={`/tours/${tour.id}`} style={{ textDecoration: 'none', display: 'block' }}>
        {/* Image */}
        <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
          <img
            src={tour.image}
            alt={tour.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
            onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)'}
            onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'}
          />
          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(10,5,5,0.85) 0%, rgba(10,5,5,0.1) 50%, transparent 100%)',
          }} />
          {/* Duration badge */}
          <div style={{
            position: 'absolute', top: '14px', right: '14px',
            background: 'linear-gradient(135deg, #991b1b, #dc2626)',
            padding: '5px 12px', borderRadius: '2px',
            fontFamily: "'Cinzel', serif", fontSize: '9px',
            letterSpacing: '0.18em', color: '#fff', textTransform: 'uppercase',
            boxShadow: '0 4px 12px rgba(185,28,28,0.4)',
          }}>
            {tour.days} Days
          </div>
          {/* Bottom info bar */}
          <div style={{
            position: 'absolute', bottom: '14px', left: '14px',
            display: 'flex', alignItems: 'center', gap: '14px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <MapPin size={11} color="rgba(245,240,235,0.7)" />
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.1em', color: 'rgba(245,240,235,0.7)' }}>
                Multiple Locations
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Clock size={11} color="rgba(245,240,235,0.7)" />
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.1em', color: 'rgba(245,240,235,0.7)' }}>
                {tour.days} Days
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h3 style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '14px', fontWeight: 700,
            color: '#f5f0eb', lineHeight: 1.3,
            letterSpacing: '0.03em',
          }}>
            {tour.title}
          </h3>
          <div style={{ width: '36px', height: '1px', background: 'linear-gradient(90deg, #dc2626, transparent)' }} />
          <p style={{
            fontFamily: "'Crimson Text', serif",
            fontSize: '16px', color: 'rgba(245,240,235,0.5)',
            lineHeight: 1.7,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical' as const,
            overflow: 'hidden',
          }}>
            {tour.description}
          </p>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '7px',
            fontFamily: "'Cinzel', serif", fontSize: '9.5px',
            letterSpacing: '0.2em', color: '#dc2626',
            textTransform: 'uppercase', marginTop: '4px',
          }}>
            View Details <ArrowRight size={12} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TourCard;