import React from 'react';
import { BookOpen, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutContent = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
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
              <BookOpen className="w-12 h-12 text-red-600" />
            </motion.div>
            <motion.h2
              className="text-3xl font-bold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Welcome to BTMC Foundation
            </motion.h2>
            <motion.p
              className="text-lg text-gray-700"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              We are delighted to welcome all well-wishers, donors, supporters, practitioners, and 
              students to join us on a journey toward peace, wisdom, and enlightenment through 
              Buddhist teachings and meditation practices.
            </motion.p>
            <motion.p
              className="text-lg text-gray-700"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              BTMC Foundation is a non-profit organization that offers various educational programs, 
              training courses, and meditation practices rooted in Buddhist philosophy. We are committed 
              to providing support to all those who wish to deepen their understanding of Buddhist 
              teachings, improve their mental well-being, and contribute to society with compassion 
              and wisdom.
            </motion.p>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1609619385002-f40f1df9b7eb?auto=format&fit=crop&q=80"
              alt="Buddhist Temple"
              className="rounded-lg shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute -bottom-6 -right-6 bg-red-600 text-white p-6 rounded-lg shadow-lg"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Heart className="w-8 h-8 mb-2" />
              <p className="text-lg font-semibold">Established in 2003</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutContent;