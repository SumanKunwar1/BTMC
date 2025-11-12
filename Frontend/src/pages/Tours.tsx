import { motion } from 'framer-motion';
import TourCard from '../components/tours/TourCard';
import { tours } from '../data/tours';

const Tours = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        className="bg-gradient-to-r from-red-600 to-red-800 py-12 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h1
            className="text-4xl font-bold text-white mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Pilgrimage Tours
          </motion.h1>
          <motion.p
            className="text-red-100 text-lg"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Explore sacred Buddhist sites and experience spiritual journeys
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tours;