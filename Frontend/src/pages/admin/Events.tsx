import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Calendar, MapPin, Users } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { events } from '../../data/events';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <motion.h1 
            className="text-2xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Events
          </motion.h1>
          <motion.button
            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Event
          </motion.button>
        </div>

        <motion.div 
          className="bg-white rounded-lg shadow-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3 font-semibold text-gray-600">Event</th>
                  <th className="pb-3 font-semibold text-gray-600">Date & Time</th>
                  <th className="pb-3 font-semibold text-gray-600">Location</th>
                  <th className="pb-3 font-semibold text-gray-600">Registrations</th>
                  <th className="pb-3 font-semibold text-gray-600">Status</th>
                  <th className="pb-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id} className="border-b">
                    <td className="py-4">
                      <div className="flex items-center">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-10 h-10 rounded-lg object-cover mr-3"
                        />
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-gray-500">{event.shortDescription}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{event.date}<br/>{event.time}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{event.venue}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span>123</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-600">
                        Active
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-700">Edit</button>
                        <button className="text-red-600 hover:text-red-700">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default Events;