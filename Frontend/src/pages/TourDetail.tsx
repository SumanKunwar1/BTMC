import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, MapPin, CheckCircle, Calendar } from 'lucide-react';
import { tours } from '../data/tours';
import BookingForm from '../components/tours/BookingForm';
import TourCard from '../components/tours/TourCard';
import { BookingFormData } from '../types/tour';

const TourDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const tour = tours.find((t) => t.id === id);
  const relatedTours = tours.filter((t) => t.id !== id).slice(0, 3);

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Tour Not Found</h2>
          <Link to="/tours" className="text-red-600 hover:text-red-700">
            Back to Tours
          </Link>
        </div>
      </div>
    );
  }

  const handleBooking = (data: BookingFormData) => {
    console.log('Booking data:', data);
    setIsBookingOpen(false);
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
          src={tour.image}
          alt={tour.title}
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
              {tour.title}
            </motion.h1>
            <motion.div
              className="flex items-center gap-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{tour.days} Days</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>Multiple Locations</span>
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
              <h2 className="text-2xl font-bold mb-4">Tour Overview</h2>
              <p className="text-gray-700">{tour.description}</p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4">Tour Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tour.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2 text-gray-700"
                  >
                    <CheckCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-4">Itinerary</h2>
              <div className="space-y-4">
                {tour.itinerary.map((item) => (
                  <div
                    key={item.day}
                    className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow-sm"
                  >
                    <Calendar className="w-5 h-5 text-red-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Day {item.day}</h3>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg sticky top-24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h3 className="text-xl font-bold mb-4">Book This Tour</h3>
              <div className="space-y-4 mb-6">
                <h4 className="font-semibold">Inclusions:</h4>
                <ul className="space-y-2">
                  {tour.inclusions.map((inclusion, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-red-600" />
                      <span className="text-gray-700">{inclusion}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                Book Now
              </button>
            </motion.div>
          </div>
        </div>

        <motion.section
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-8">Related Tours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </motion.section>
      </div>

      <BookingForm
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onSubmit={handleBooking}
        tourTitle={tour.title}
      />

      {showThankYou && (
        <motion.div
          className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          Thank you for your booking! We'll contact you soon.
        </motion.div>
      )}
    </div>
  );
};

export default TourDetail;