import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { EventRegistrationData, Event } from '../../types/event';

interface EventRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EventRegistrationData) => void;
  event: Event;
}

const EventRegistrationForm: React.FC<EventRegistrationFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  event,
}) => {
  const [formData, setFormData] = useState<EventRegistrationData>({
    fullName: '',
    email: '',
    phone: '',
    ticketType: 'Regular',
    quantity: 1,
    specialRequirements: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const selectedTicket = event.ticketTypes.find(t => t.type === formData.ticketType);
  const totalPrice = selectedTicket ? selectedTicket.price * formData.quantity : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold">Book Tickets</h3>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {event.ticketTypes.map((ticket) => (
                  <div
                    key={ticket.type}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.ticketType === ticket.type
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                    onClick={() => setFormData({ ...formData, ticketType: ticket.type })}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-lg font-semibold">{ticket.type}</h4>
                      <span className="text-red-600 font-bold">Rs. {ticket.price}</span>
                    </div>
                    <ul className="space-y-2">
                      {ticket.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                          <Check className="w-4 h-4 text-green-500 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-gray-500 mt-2">
                      {ticket.available} tickets available
                    </p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max={selectedTicket?.available || 1}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          quantity: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Requirements (Optional)
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    rows={3}
                    value={formData.specialRequirements}
                    onChange={(e) =>
                      setFormData({ ...formData, specialRequirements: e.target.value })
                    }
                  />
                </div>

                <div className="border-t pt-4 mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total Amount:</span>
                    <span className="text-2xl font-bold text-red-600">
                      Rs. {totalPrice}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventRegistrationForm;