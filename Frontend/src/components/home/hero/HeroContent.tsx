import { motion } from 'framer-motion';
import HeroButtons from './HeroButtons';

const HeroContent = () => {
  return (
    <div className="text-white max-w-2xl">
      <motion.h1 
        className="text-4xl md:text-5xl font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Promoting Peace, Wisdom, and Compassion
      </motion.h1>
      <motion.p 
        className="text-xl mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        Through Buddhist Teachings and Meditation
      </motion.p>
      <HeroButtons />
    </div>
  );
};

export default HeroContent;