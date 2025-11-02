import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Heart, Calendar, DollarSign } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { mockDonations } from '../../data/mockData';

const Donations = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <AdminLayout>
      <div className="p-6">
        <motion.h1 
          className="text-2xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Donations
        </motion.h1>

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
                placeholder="Search donations..."
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
                  <th className="pb-3 font-semibold text-gray-600">Donor</th>
                  <th className="pb-3 font-semibold text-gray-600">Amount</th>
                  <th className="pb-3 font-semibold text-gray-600">Type</th>
                  <th className="pb-3 font-semibold text-gray-600">Date</th>
                  <th className="pb-3 font-semibold text-gray-600">Status</th>
                  <th className="pb-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockDonations.map((donation) => (
                  <tr key={donation.id} className="border-b">
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className="bg-red-100 p-2 rounded-lg mr-3">
                          <Heart className="w-6 h-6 text-red-600" />
                        </div>
                        <span className="font-medium">{donation.donor}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span>{donation.amount}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-gray-600">{donation.type}</span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{donation.date}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-600">
                        {donation.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-700">View</button>
                        <button className="text-gray-600 hover:text-gray-700">Export</button>
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

export default Donations;