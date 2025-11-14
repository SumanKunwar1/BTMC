import { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import FAQList from '../components/faq/FAQList';
import { faqs } from '../data/faqs';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        className="bg-gradient-to-r from-red-600 to-red-800 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-4">
            <HelpCircle className="w-12 h-12 text-white" />
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Frequently Asked Questions
              </h1>
              <p className="text-red-100">
                Find answers to common questions about BTMC Foundation
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <FAQList
          faqs={faqs}
          activeIndex={activeIndex}
          onToggle={handleToggle}
        />
      </div>
    </div>
  );
};

export default FAQ;