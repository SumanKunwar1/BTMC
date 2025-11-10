import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, Trash2, Eye, User } from 'lucide-react';
import { BookingFormData } from '../../types/tour';

interface TourBooking extends BookingFormData {
  id: string;
  tourTitle: string;
  bookingDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

const AdminTourUsers: React.FC = () => {
  const [bookings, setBookings] = useState<TourBooking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);

  // Load bookings from localStorage on component mount
  useEffect(() => {
    const savedBookings = localStorage.getItem('tourBookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  // Filter bookings based on search term and status
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.tourTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleDeleteBooking = (id: string) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      const updatedBookings = bookings.filter(booking => booking.id !== id);
      setBookings(updatedBookings);
      localStorage.setItem('tourBookings', JSON.stringify(updatedBookings));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedBookings.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedBookings.length} selected booking(s)?`)) {
      const updatedBookings = bookings.filter(booking => !selectedBookings.includes(booking.id));
      setBookings(updatedBookings);
      setSelectedBookings([]);
      localStorage.setItem('tourBookings', JSON.stringify(updatedBookings));
    }
  };

  const handleStatusChange = (id: string, newStatus: TourBooking['status']) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === id ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('tourBookings', JSON.stringify(updatedBookings));
  };

  const exportToExcel = () => {
    // Create CSV content
    const headers = ['ID', 'Tour Title', 'Full Name', 'Email', 'Phone', 'Participants', 'Special Requests', 'Booking Date', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredBookings.map(booking => [
        booking.id,
        `"${booking.tourTitle}"`,
        `"${booking.fullName}"`,
        booking.email,
        booking.phone,
        booking.participants,
        `"${booking.specialRequests}"`,
        booking.bookingDate,
        booking.status
      ].join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `tour-bookings-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleSelectBooking = (id: string) => {
    setSelectedBookings(prev =>
      prev.includes(id) ? prev.filter(bookingId => bookingId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedBookings.length === filteredBookings.length) {
      setSelectedBookings([]);
    } else {
      setSelectedBookings(filteredBookings.map(booking => booking.id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="bg-white rounded-lg shadow-sm p-6 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center mb-4 lg:mb-0">
              <User className="w-8 h-8 text-red-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Tour Bookings Management</h1>
                <p className="text-gray-600">Manage and export tour bookings</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={exportToExcel}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Export to Excel
              </button>
              {selectedBookings.length > 0 && (
                <button
                  onClick={handleDeleteSelected}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Selected ({selectedBookings.length})
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="bg-white rounded-lg shadow-sm p-6 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, email, or tour..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div className="text-sm text-gray-600 flex items-center">
              Total: {filteredBookings.length} booking(s)
            </div>
          </div>
        </motion.div>

        {/* Bookings Table */}
        <motion.div
          className="bg-white rounded-lg shadow-sm overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No bookings found</h3>
              <p className="text-gray-500">No tour bookings match your current filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <input
                        type="checkbox"
                        checked={selectedBookings.length === filteredBookings.length && filteredBookings.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tour & Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Contact Info</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Participants</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Booking Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedBookings.includes(booking.id)}
                          onChange={() => toggleSelectBooking(booking.id)}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-gray-900">{booking.tourTitle}</div>
                          <div className="text-sm text-gray-600">{booking.fullName}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="text-gray-900">{booking.email}</div>
                          <div className="text-gray-600">{booking.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {booking.participants} person(s)
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {new Date(booking.bookingDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={booking.status}
                          onChange={(e) => handleStatusChange(booking.id, e.target.value as TourBooking['status'])}
                          className={`text-xs font-medium py-1 px-2 rounded-full border-0 ${getStatusColor(booking.status)} focus:ring-2 focus:ring-red-500`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleDeleteBooking(booking.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Delete booking"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          {booking.specialRequests && (
                            <button
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                              title="View special requests"
                              onClick={() => alert(`Special Requests:\n\n${booking.specialRequests}`)}
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminTourUsers;