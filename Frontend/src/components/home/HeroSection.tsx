import { motion } from 'framer-motion';
import HeroContent from './hero/HeroContent';

const HeroSection = () => {
  return (
    <section className="relative h-[600px]">
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src="https://res.cloudinary.com/dihev9qxc/image/upload/v1762414567/a-cinematic-wide-angle-photograph-of-a-m_CEoy2EDiQumPNWzhdw5_uw_I_igCA0-S7CF5gMT-vWVEA_wftgth.jpg"
          alt="BTMC Foundation"
          className="w-full h-full object-cover"
        />
        <motion.div 
          className="absolute inset-0 bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        ></motion.div>
      </motion.div>
      <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
        <HeroContent />
      </div>
    </section>
  );
};

export default HeroSection;