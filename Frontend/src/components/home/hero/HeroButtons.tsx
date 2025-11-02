import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroButtons = () => {
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.9 + (custom * 0.1)
      }
    })
  };

  return (
    <div className="flex flex-wrap gap-4">
      <motion.div
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <Link
          to="/courses"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Enroll in a Course
        </Link>
      </motion.div>
      <motion.div
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        <Link
          to="/pilgrimage"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Join Pilgrimage Tour
        </Link>
      </motion.div>
      <motion.div
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        custom={2}
      >
        <Link
          to="/support"
          className="bg-white text-red-600 hover:bg-red-50 px-6 py-3 rounded-lg transition-colors"
        >
          Donate Now
        </Link>
      </motion.div>
    </div>
  );
};

export default HeroButtons;