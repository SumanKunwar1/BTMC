import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const SupportHero = () => {
  return (
    <section className="bg-gradient-to-r from-red-600 to-red-800 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-4">
          <Heart className="w-12 h-12 text-white" />
          <div>
            <motion.h1 
              className="text-4xl font-bold text-white mb-2"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Support Our Cause
            </motion.h1>
            <motion.p 
              className="text-red-100 text-lg"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Help us spread Buddhist teachings and support our community
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportHero;