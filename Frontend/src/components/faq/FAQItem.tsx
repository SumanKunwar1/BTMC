import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FAQ } from '../../types/faq';

interface FAQItemProps {
  faq: FAQ;
  isActive: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq, isActive, onToggle }) => {
  return (
    <div className="border-t border-gray-300 rounded-lg overflow-hidden">
      <div
        className={`flex items-center justify-between px-6 py-4 cursor-pointer transition-all ${
          isActive ? 'bg-red-800' : 'bg-red-600 hover:bg-red-700'
        }`}
        onClick={onToggle}
      >
        <h4 className="text-lg font-semibold text-white">{faq.question}</h4>
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-white" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 py-4 bg-gray-100"
          >
            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQItem;