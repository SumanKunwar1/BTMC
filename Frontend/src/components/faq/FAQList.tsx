import React from 'react';
import { motion } from 'framer-motion';
import FAQItem from './FAQItem';
import { FAQ } from '../../types/faq';

interface FAQListProps {
  faqs: FAQ[];
  activeIndex: number | null;
  onToggle: (index: number) => void;
}

const FAQList: React.FC<FAQListProps> = ({ faqs, activeIndex, onToggle }) => {
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {faqs.map((faq, index) => (
        <FAQItem
          key={faq.id}
          faq={faq}
          isActive={activeIndex === index}
          onToggle={() => onToggle(index)}
        />
      ))}
    </motion.div>
  );
};

export default FAQList;