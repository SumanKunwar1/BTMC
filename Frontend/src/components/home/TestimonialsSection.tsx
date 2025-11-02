import { Link, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    quote: "The meditation retreat at BTMC transformed my life. The serene environment and insightful teachings are unmatched.",
    author: "Sarah Chen",
    role: "Meditation Practitioner",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80"
  },
  {
    quote: "The pilgrimage tour was incredibly well organized. The teachings at each sacred site added deep meaning to our journey.",
    author: "John Smith",
    role: "Pilgrimage Participant",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80"
  },
  {
    quote: "BTMC's Buddhist philosophy courses have given me a new perspective on life and helped me find inner peace.",
    author: "Raj Sharma",
    role: "Philosophy Student",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          className="pb-12"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-6 rounded-lg shadow-lg h-full">
                <Quote className="w-8 h-8 text-red-600 mb-4" />
                <p className="text-gray-700 mb-6">{testimonial.quote}</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="text-center mt-8">
          <Link
            to="/testimonials"
            className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold"
          >
            View All Testimonials
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;