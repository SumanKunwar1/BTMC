"use client"

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Calendar, Users, Edit, Trash2, X, Save, Upload } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

// Define Tour type
interface Tour {
  id: string;
  title: string;
  description: string;
  image: string;
  days: number;
  duration: string;
  startDate: string;
  participants: number;
  status: 'active' | 'inactive' | 'upcoming';
  highlights: string[];
  itinerary: Array<{
    day: number;
    description: string;
  }>;
  inclusions: string[];
  price?: number;
  location: string;
}

// Mock data - in real app, this would come from API
const initialTours: Tour[] = [
  {
    id: '1',
    title: 'Lumbini Pilgrimage',
    description: 'Visit the birthplace of Lord Buddha and explore ancient monasteries',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80',
    days: 5,
    duration: '5 Days',
    startDate: '2024-03-15',
    participants: 12,
    status: 'active',
    highlights: [
      'Maya Devi Temple',
      'World Peace Pagoda',
      'Monastery Tour',
      'Meditation Sessions'
    ],
    itinerary: [
      { day: 1, description: 'Arrival and orientation at Lumbini' },
      { day: 2, description: 'Visit Maya Devi Temple and peace pagoda' },
      { day: 3, description: 'Monastery tour and meditation' },
      { day: 4, description: 'Cultural activities and teachings' },
      { day: 5, description: 'Departure' }
    ],
    inclusions: [
      'Accommodation',
      'All meals',
      'Transportation',
      'English speaking guide',
      'Entrance fees'
    ],
    price: 899,
    location: 'Lumbini, Nepal'
  },
  {
    id: '2',
    title: 'Bodh Gaya Spiritual Journey',
    description: 'Experience enlightenment at the Mahabodhi Temple',
    image: 'https://images.unsplash.com/photo-1587132135056-b6d3c6d45bc5?auto=format&fit=crop&q=80',
    days: 7,
    duration: '7 Days',
    startDate: '2024-04-10',
    participants: 15,
    status: 'upcoming',
    highlights: [
      'Mahabodhi Temple',
      'Bodhi Tree',
      'Great Buddha Statue',
      'Vipassana Meditation'
    ],
    itinerary: [
      { day: 1, description: 'Arrival in Bodh Gaya' },
      { day: 2, description: 'Mahabodhi Temple and Bodhi Tree' },
      { day: 3, description: 'Meditation and teachings' },
      { day: 4, description: 'Visit surrounding monasteries' },
      { day: 5, description: 'Vipassana practice' },
      { day: 6, description: 'Cultural immersion' },
      { day: 7, description: 'Departure' }
    ],
    inclusions: [
      'Hotel accommodation',
      'Vegetarian meals',
      'Local transportation',
      'Meditation guide',
      'All entrance fees'
    ],
    price: 1299,
    location: 'Bodh Gaya, India'
  }
];

const AdminTours = () => {
  const [tours, setTours] = useState<Tour[]>(initialTours);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [formData, setFormData] = useState<Partial<Tour>>({
    title: '',
    description: '',
    image: '',
    days: 1,
    duration: '',
    startDate: '',
    participants: 1,
    status: 'active',
    highlights: [''],
    itinerary: [{ day: 1, description: '' }],
    inclusions: [''],
    price: 0,
    location: ''
  });
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter tours based on search
  const filteredTours = tours.filter(tour =>
    tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tour.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate unique ID
  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setUploadedImage(file);
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setFormData(prev => ({ ...prev, image: previewUrl }));
    }
  };

  // Handle URL input change
  const handleImageUrlChange = (url: string) => {
    setUploadedImage(null);
    setImagePreview('');
    setFormData(prev => ({ ...prev, image: url }));
  };

  // Reset form when opening modal
  const openAddModal = () => {
    setEditingTour(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      days: 1,
      duration: '',
      startDate: '',
      participants: 1,
      status: 'active',
      highlights: [''],
      itinerary: [{ day: 1, description: '' }],
      inclusions: [''],
      price: 0,
      location: ''
    });
    setUploadedImage(null);
    setImagePreview('');
    setIsModalOpen(true);
  };

  const openEditModal = (tour: Tour) => {
    setEditingTour(tour);
    setFormData({ ...tour });
    setUploadedImage(null);
    setImagePreview(tour.image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTour(null);
    setUploadedImage(null);
    setImagePreview('');
    
    // Clean up preview URL
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: 'highlights' | 'inclusions', index: number, value: string) => {
    const newArray = [...(formData[field] || [])];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: 'highlights' | 'inclusions') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), '']
    }));
  };

  const removeArrayItem = (field: 'highlights' | 'inclusions', index: number) => {
    const newArray = [...(formData[field] || [])];
    newArray.splice(index, 1);
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const handleItineraryChange = (index: number, field: 'day' | 'description', value: string | number) => {
    const newItinerary = [...(formData.itinerary || [])];
    newItinerary[index] = { ...newItinerary[index], [field]: value };
    setFormData(prev => ({ ...prev, itinerary: newItinerary }));
  };

  const addItineraryItem = () => {
    const newItinerary = [...(formData.itinerary || [])];
    const lastDay = newItinerary.length > 0 ? Math.max(...newItinerary.map(item => item.day)) : 0;
    newItinerary.push({ day: lastDay + 1, description: '' });
    setFormData(prev => ({ ...prev, itinerary: newItinerary }));
  };

  const removeItineraryItem = (index: number) => {
    const newItinerary = [...(formData.itinerary || [])];
    newItinerary.splice(index, 1);
    // Re-number days
    newItinerary.forEach((item, idx) => {
      item.day = idx + 1;
    });
    setFormData(prev => ({ ...prev, itinerary: newItinerary }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if image is provided
    if (!formData.image) {
      alert('Please provide a tour image either by uploading or entering a URL');
      return;
    }
    
    // Filter out empty highlights, inclusions, and itinerary items
    const filteredHighlights = (formData.highlights || []).filter(item => item.trim() !== '');
    const filteredInclusions = (formData.inclusions || []).filter(item => item.trim() !== '');
    const filteredItinerary = (formData.itinerary || []).filter(item => item.description.trim() !== '');
    
    if (editingTour) {
      // Update existing tour
      const updatedTour = {
        ...editingTour,
        ...formData,
        highlights: filteredHighlights,
        inclusions: filteredInclusions,
        itinerary: filteredItinerary,
        duration: `${formData.days} Days`
      };
      
      setTours(prev => prev.map(tour => 
        tour.id === editingTour.id ? updatedTour : tour
      ));
    } else {
      // Add new tour
      const newTour: Tour = {
        id: generateId(),
        title: formData.title || '',
        description: formData.description || '',
        image: formData.image || '',
        days: formData.days || 1,
        duration: `${formData.days} Days`,
        startDate: formData.startDate || '',
        participants: formData.participants || 1,
        status: formData.status || 'active',
        highlights: filteredHighlights,
        itinerary: filteredItinerary,
        inclusions: filteredInclusions,
        price: formData.price || 0,
        location: formData.location || ''
      };
      setTours(prev => [...prev, newTour]);
    }
    
    // Clean up preview URL if it was from an uploaded file
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    
    closeModal();
  };

  const handleDelete = (tourId: string) => {
    if (confirm('Are you sure you want to delete this tour?')) {
      setTours(prev => prev.filter(tour => tour.id !== tourId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-600';
      case 'inactive': return 'bg-red-100 text-red-600';
      case 'upcoming': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <motion.h1 
            className="text-2xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Tours Management
          </motion.h1>
          <motion.button
            onClick={openAddModal}
            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-red-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Tour
          </motion.button>
        </div>

        <motion.div 
          className="bg-white rounded-lg shadow-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tours by title or location..."
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
                  <th className="pb-3 font-semibold text-gray-600">Tour</th>
                  <th className="pb-3 font-semibold text-gray-600">Duration</th>
                  <th className="pb-3 font-semibold text-gray-600">Location</th>
                  <th className="pb-3 font-semibold text-gray-600">Start Date</th>
                  <th className="pb-3 font-semibold text-gray-600">Participants</th>
                  <th className="pb-3 font-semibold text-gray-600">Price</th>
                  <th className="pb-3 font-semibold text-gray-600">Status</th>
                  <th className="pb-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTours.map((tour) => (
                  <tr key={tour.id} className="border-b hover:bg-gray-50">
                    <td className="py-4">
                      <div className="flex items-center">
                        <img 
                          src={tour.image} 
                          alt={tour.title}
                          className="w-12 h-12 rounded-lg object-cover mr-3"
                        />
                        <div>
                          <div className="font-medium">{tour.title}</div>
                          <div className="text-sm text-gray-500 line-clamp-1">{tour.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-gray-600">{tour.duration}</span>
                    </td>
                    <td className="py-4">
                      <span className="text-gray-600">{tour.location}</span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{tour.startDate}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{tour.participants}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-gray-600">${tour.price}</span>
                    </td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(tour.status)}`}>
                        {tour.status.charAt(0).toUpperCase() + tour.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => openEditModal(tour)}
                          className="text-blue-600 hover:text-blue-700 flex items-center"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(tour.id)}
                          className="text-red-600 hover:text-red-700 flex items-center"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredTours.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                {searchTerm ? 'No tours found matching your search.' : 'No tours available.'}
              </div>
            )}
          </div>
        </motion.div>

        {/* Add/Edit Tour Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-semibold">
                    {editingTour ? 'Edit Tour' : 'Add New Tour'}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Image Upload Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tour Image *
                    </label>
                    
                    {/* Image Preview */}
                    {(formData.image || imagePreview) && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Preview:</p>
                        <img 
                          src={formData.image || imagePreview} 
                          alt="Tour preview" 
                          className="w-full h-48 object-cover rounded-lg border"
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Upload from device */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Upload from device
                        </label>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:border-red-500 transition-colors"
                        >
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-600">Click to upload image</span>
                          <span className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG (max 5MB)</span>
                        </button>
                        {uploadedImage && (
                          <p className="text-sm text-green-600 mt-2">
                            ✓ {uploadedImage.name}
                          </p>
                        )}
                      </div>

                      {/* Or use URL */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Or enter image URL
                        </label>
                        <input
                          type="url"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          value={formData.image && !imagePreview.startsWith('blob:') ? formData.image : ''}
                          onChange={(e) => handleImageUrlChange(e.target.value)}
                          placeholder="https://example.com/image.jpg"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          Enter a direct image URL
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tour Title *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        value={formData.title || ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        value={formData.location || ''}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration (Days) *
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        value={formData.days || 1}
                        onChange={(e) => {
                          handleInputChange('days', parseInt(e.target.value));
                          handleInputChange('duration', `${e.target.value} Days`);
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        value={formData.price || 0}
                        onChange={(e) => handleInputChange('price', parseInt(e.target.value))}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date *
                      </label>
                      <input
                        type="date"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        value={formData.startDate || ''}
                        onChange={(e) => handleInputChange('startDate', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Participants *
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        value={formData.participants || 1}
                        onChange={(e) => handleInputChange('participants', parseInt(e.target.value))}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status *
                      </label>
                      <select
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        value={formData.status || 'active'}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="upcoming">Upcoming</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      value={formData.description || ''}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Describe the tour experience..."
                    />
                  </div>

                  {/* Highlights */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Highlights *
                      </label>
                      <button
                        type="button"
                        onClick={() => addArrayItem('highlights')}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        + Add Highlight
                      </button>
                    </div>
                    <div className="space-y-2">
                      {(formData.highlights || []).map((highlight, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            required
                            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            value={highlight}
                            onChange={(e) => handleArrayChange('highlights', index, e.target.value)}
                            placeholder={`Highlight ${index + 1}`}
                          />
                          {(formData.highlights || []).length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeArrayItem('highlights', index)}
                              className="px-3 text-red-600 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Inclusions */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Inclusions *
                      </label>
                      <button
                        type="button"
                        onClick={() => addArrayItem('inclusions')}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        + Add Inclusion
                      </button>
                    </div>
                    <div className="space-y-2">
                      {(formData.inclusions || []).map((inclusion, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            required
                            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            value={inclusion}
                            onChange={(e) => handleArrayChange('inclusions', index, e.target.value)}
                            placeholder={`Inclusion ${index + 1}`}
                          />
                          {(formData.inclusions || []).length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeArrayItem('inclusions', index)}
                              className="px-3 text-red-600 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Itinerary */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Itinerary *
                      </label>
                      <button
                        type="button"
                        onClick={addItineraryItem}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        + Add Day
                      </button>
                    </div>
                    <div className="space-y-3">
                      {(formData.itinerary || []).map((item, index) => (
                        <div key={index} className="flex gap-2 items-start">
                          <input
                            type="number"
                            min="1"
                            className="w-20 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            value={item.day}
                            onChange={(e) => handleItineraryChange(index, 'day', parseInt(e.target.value))}
                          />
                          <input
                            type="text"
                            required
                            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            value={item.description}
                            onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
                            placeholder={`Description for day ${item.day}`}
                          />
                          {(formData.itinerary || []).length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeItineraryItem(index)}
                              className="px-3 text-red-600 hover:text-red-700 mt-2"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-6 border-t">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {editingTour ? 'Update Tour' : 'Create Tour'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminTours;