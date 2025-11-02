import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, Heart } from 'lucide-react';

const DonationSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1609619385002-f40f1df9b7eb?auto=format&fit=crop&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="text-white"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Support Our Mission</h2>
            <p className="text-lg mb-8">
              Your generous donation helps us maintain our facilities, support our teachers,
              and continue providing Buddhist education and meditation programs to our community.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: DollarSign, title: 'Transparent', text: 'Clear use of funds' },
                { icon: Users, title: 'Impactful', text: 'Helping thousands' },
                { icon: Heart, title: 'Meaningful', text: 'Supporting dharma' },
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: index * 0.1 }}
                >
                  <item.icon className="w-8 h-8 mx-auto mb-2 text-red-500" />
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="bg-white p-8 rounded-lg shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6">Make a Donation</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Donation Amount
                </label>
                <input
                  type="number"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                Donate Now
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;