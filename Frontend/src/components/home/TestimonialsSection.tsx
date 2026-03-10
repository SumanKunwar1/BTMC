import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    quote: "The meditation retreat at BTMC transformed my life. The serene environment and insightful teachings are unlike anything I have experienced.",
    author: "Sarah Chen",
    role: "Meditation Practitioner",
    country: "USA",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
  },
  {
    quote: "The pilgrimage tour was incredibly well organized. The teachings at each sacred site added profound depth and meaning to our entire journey.",
    author: "John Smith",
    role: "Pilgrimage Participant",
    country: "UK",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
  },
  {
    quote: "BTMC's Buddhist philosophy courses gave me a completely new perspective on life and helped me find lasting inner peace and clarity.",
    author: "Raj Sharma",
    role: "Philosophy Student",
    country: "India",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
  },
  {
    quote: "The weekly free retreats are a true gift to the community. Venerable Khen Rinpoche's teachings are gentle, deep, and transformative.",
    author: "Yuki Tanaka",
    role: "Retreat Participant",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
  },
];

const TestimonialsSection = () => {
  return (
    <section style={{
      background: 'linear-gradient(180deg, rgba(15,5,5,1) 0%, rgba(10,5,5,1) 100%)',
      padding: '100px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,300;1,400&family=Crimson+Text:ital,wght@0,400;1,400&display=swap');

        .testi-card {
          background: linear-gradient(160deg, rgba(20,5,5,0.97) 0%, rgba(28,8,8,0.92) 100%);
          border: 1px solid rgba(185,28,28,0.18);
          border-radius: 5px;
          padding: 32px 28px;
          height: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 20px;
          transition: border-color 0.3s ease;
        }
        .testi-card:hover { border-color: rgba(220,38,38,0.4); }

        .swiper-pagination-bullet {
          background: rgba(185,28,28,0.4) !important;
        }
        .swiper-pagination-bullet-active {
          background: #dc2626 !important;
          width: 20px !important;
          border-radius: 2px !important;
        }

        .section-line { height: 1px; background: linear-gradient(90deg, transparent, rgba(185,28,28,0.5), rgba(245,166,35,0.3), rgba(185,28,28,0.5), transparent); }
      `}</style>

      <div className="section-line" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '16px' }}>
            <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg, transparent, rgba(185,28,28,0.6))' }} />
            <span style={{ fontSize: '18px' }}>💬</span>
            <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg, rgba(185,28,28,0.6), transparent)' }} />
          </div>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '0.4em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '12px' }}>
            Voices of Practice
          </p>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(24px, 3.5vw, 42px)', fontWeight: 700, color: '#f5f0eb' }}>
            What Our Students Say
          </h2>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          style={{ paddingBottom: '48px' }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i} style={{ height: 'auto' }}>
              <div className="testi-card">
                {/* Quote mark */}
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '64px', fontWeight: 700,
                  color: 'rgba(185,28,28,0.25)',
                  lineHeight: 0.7,
                  userSelect: 'none',
                }}>
                  "
                </div>

                <p style={{
                  fontFamily: "'Crimson Text', serif",
                  fontSize: '18px',
                  fontStyle: 'italic',
                  color: 'rgba(245,240,235,0.65)',
                  lineHeight: 1.8,
                  flex: 1,
                }}>
                  {t.quote}
                </p>

                <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(185,28,28,0.3), transparent)' }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <img
                    src={t.image}
                    alt={t.author}
                    style={{
                      width: '44px', height: '44px',
                      borderRadius: '50%', objectFit: 'cover',
                      border: '2px solid rgba(185,28,28,0.35)',
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: '11px', fontWeight: 600, color: '#f5f0eb', letterSpacing: '0.06em' }}>
                      {t.author}
                    </div>
                    <div style={{ fontFamily: "'Crimson Text', serif", fontSize: '13px', color: 'rgba(245,240,235,0.4)', fontStyle: 'italic' }}>
                      {t.role} · {t.country}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="section-line" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
    </section>
  );
};

export default TestimonialsSection;