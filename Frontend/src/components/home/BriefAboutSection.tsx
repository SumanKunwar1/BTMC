import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const BriefAboutSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1609619385002-f40f1df9b7eb?auto=format&fit=crop&q=80"
              alt="Buddhist Temple"
              className="w-full h-[400px] object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <BookOpen className="w-12 h-12 text-red-600 mb-6" />
            </motion.div>
            <motion.h2 
              className="text-3xl font-bold mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              About BTMC Foundation
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-700 mb-6 text-justify"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.4 }} 
            >
 Established in <strong>2003</strong> under the compassionate guidance of <em>Venerable Khen Rinpoche Sonam Gyurme</em>, 
  <strong> BTMC Foundation</strong> stands as a beacon of wisdom and compassion, devoted to 
  <strong> Buddhist education, meditation, and public welfare</strong>. Rooted in the timeless teachings of the Buddha, 
  our mission is to <strong>preserve and share authentic Dharma</strong>, nurturing a peaceful and supportive environment 
  where individuals can deepen their understanding, cultivate mindfulness, and grow spiritually for the benefit of all beings.            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link
                to="/about"
                className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold group"
              >
                Learn More About Us
                <motion.svg 
                  className="w-5 h-5 ml-2"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BriefAboutSection;