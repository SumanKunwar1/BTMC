import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { events } from '../data/events';
import EventRegistrationForm from '../components/events/EventRegistrationForm';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const event = events.find(e => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
          <Link to="/events" className="text-red-600 hover:text-red-700">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const handleRegistration = (data: any) => {
    console.log('Registration data:', data);
    setIsRegistrationOpen(false);
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        className="relative h-[60vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 text-white">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {event.title}
            </motion.h1>
            <motion.div
              className="flex flex-wrap gap-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{event.venue}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-4">About the Event</h2>
              <p className="text-gray-700">{event.fullDescription}</p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4">Event Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {event.gallery.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${event.title} - Image ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            </motion.section>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg sticky top-24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-6">Ticket Information</h3>
              <div className="space-y-4">
                {event.ticketTypes.map((ticket) => (
                  <div
                    key={ticket.type}
                    className="p-4 border rounded-lg hover:border-red-500 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">{ticket.type}</h4>
                      <span className="text-red-600 font-bold">Rs. {ticket.price}</span>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1 mb-2">
                      {ticket.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-red-500">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-gray-500">
                      {ticket.available} tickets available
                    </p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setIsRegistrationOpen(true)}
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors mt-6"
              >
                Book Now
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <EventRegistrationForm
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        onSubmit={handleRegistration}
        event={event}
      />

      {showThankYou && (
        <motion.div
          className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          Thank you for registering! We'll contact you soon.
        </motion.div>
      )}
    </div>
  );
};

export default EventDetail;