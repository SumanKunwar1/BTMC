import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Calendar, MapPin, Users, Edit, Trash2, Eye, X } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import Modal from '../../components/shared/Modal';

// Types
interface TicketType {
  type: string;
  price: number;
  benefits: string[];
  available: number;
}

interface Event {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  date: string;
  time: string;
  venue: string;
  ticketTypes: TicketType[];
  gallery: string[];
  status: 'active' | 'inactive';
}

interface EventFormData {
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  date: string;
  time: string;
  venue: string;
  ticketTypes: TicketType[];
  gallery: string[];
}

interface EventFormProps {
  event?: Event;
  onSubmit: (eventData: EventFormData) => void;
  onCancel: () => void;
}

interface EventDetailsProps {
  event: Event;
  onClose: () => void;
}

// Mock data - in real app, this would come from API
const initialEvents: Event[] = [
  {
    id: '1',
    title: 'Meditation Retreat',
    shortDescription: 'Weekend meditation and mindfulness retreat',
    fullDescription: 'Join us for a transformative weekend of deep meditation, mindfulness practices, and spiritual guidance. This retreat is designed for both beginners and experienced practitioners looking to deepen their practice.',
    image: '/api/placeholder/800/400',
    date: '2024-04-15',
    time: '9:00 AM - 5:00 PM',
    venue: 'BTMC Main Hall',
    ticketTypes: [
      {
        type: 'Standard',
        price: 1000,
        benefits: ['Access to all sessions', 'Lunch included', 'Meditation materials'],
        available: 50
      },
      {
        type: 'VIP',
        price: 2000,
        benefits: ['Front row seating', 'Private session with teacher', 'Gift package'],
        available: 10
      }
    ],
    gallery: ['/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300'],
    status: 'active'
  },
  {
    id: '2',
    title: 'Buddhist Philosophy Class',
    shortDescription: 'Introduction to core Buddhist teachings',
    fullDescription: 'Learn the fundamental principles of Buddhist philosophy in this comprehensive 8-week course. Perfect for beginners and those looking to refresh their knowledge.',
    image: '/api/placeholder/800/400',
    date: '2024-04-20',
    time: '6:00 PM - 8:00 PM',
    venue: 'BTMC Library',
    ticketTypes: [
      {
        type: 'General',
        price: 500,
        benefits: ['8 weekly sessions', 'Course materials', 'Certificate of completion'],
        available: 30
      }
    ],
    gallery: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    status: 'active'
  }
];

const AdminEvents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [viewingEvent, setViewingEvent] = useState<Event | null>(null);

  // Filter events based on search term
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateEvent = (eventData: EventFormData) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      status: 'active'
    };
    setEvents([...events, newEvent]);
    setIsFormOpen(false);
  };

  const handleEditEvent = (eventData: EventFormData) => {
    if (editingEvent) {
      setEvents(events.map(event => 
        event.id === editingEvent.id ? { ...eventData, id: event.id, status: event.status } : event
      ));
      setEditingEvent(null);
    }
  };

  const handleDeleteEvent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    setEvents(events.map(event =>
      event.id === id 
        ? { ...event, status: event.status === 'active' ? 'inactive' : 'active' }
        : event
    ));
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
            Events Management
          </motion.h1>
          <motion.button
            onClick={() => setIsFormOpen(true)}
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
                placeholder="Search events by title, venue, or description..."
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
                  <th className="pb-3 font-semibold text-gray-600">Tickets</th>
                  <th className="pb-3 font-semibold text-gray-600">Status</th>
                  <th className="pb-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event) => (
                  <tr key={event.id} className="border-b hover:bg-gray-50">
                    <td className="py-4">
                      <div className="flex items-center">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-12 h-12 rounded-lg object-cover mr-3"
                        />
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-gray-500 line-clamp-1">{event.shortDescription}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <div>
                          <span className="block">{event.date}</span>
                          <span className="text-sm text-gray-500">{event.time}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{event.venue}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="text-gray-600">
                        <div className="flex items-center mb-1">
                          <Users className="w-4 h-4 mr-2" />
                          <span>{event.ticketTypes.reduce((sum, ticket) => sum + ticket.available, 0)} total</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {event.ticketTypes.length} ticket type(s)
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <button
                        onClick={() => handleToggleStatus(event.id)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          event.status === 'active' 
                            ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {event.status === 'active' ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setViewingEvent(event)}
                          className="text-blue-600 hover:text-blue-700 p-1"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingEvent(event)}
                          className="text-green-600 hover:text-green-700 p-1"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredEvents.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No events found. {searchTerm && 'Try adjusting your search.'}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Create/Edit Event Modal */}
      <Modal
        isOpen={isFormOpen || !!editingEvent}
        onClose={() => {
          setIsFormOpen(false);
          setEditingEvent(null);
        }}
        title={editingEvent ? 'Edit Event' : 'Create New Event'}
      >
        <EventForm
          event={editingEvent || undefined}
          onSubmit={editingEvent ? handleEditEvent : handleCreateEvent}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingEvent(null);
          }}
        />
      </Modal>

      {/* View Event Details Modal */}
      <Modal
        isOpen={!!viewingEvent}
        onClose={() => setViewingEvent(null)}
        title="Event Details"
      >
        {viewingEvent && (
          <EventDetails event={viewingEvent} onClose={() => setViewingEvent(null)} />
        )}
      </Modal>
    </AdminLayout>
  );
};

// Event Form Component
const EventForm: React.FC<EventFormProps> = ({ event, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<EventFormData>({
    title: event?.title || '',
    shortDescription: event?.shortDescription || '',
    fullDescription: event?.fullDescription || '',
    image: event?.image || '',
    date: event?.date || '',
    time: event?.time || '',
    venue: event?.venue || '',
    ticketTypes: event?.ticketTypes || [
      { type: 'Standard', price: 0, benefits: [''], available: 0 }
    ],
    gallery: event?.gallery || []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleTicketChange = (index: number, field: keyof TicketType, value: string | number) => {
    const updatedTickets = [...formData.ticketTypes];
    updatedTickets[index] = { ...updatedTickets[index], [field]: value };
    setFormData({ ...formData, ticketTypes: updatedTickets });
  };

  const addTicketType = () => {
    setFormData({
      ...formData,
      ticketTypes: [
        ...formData.ticketTypes,
        { type: '', price: 0, benefits: [''], available: 0 }
      ]
    });
  };

  const removeTicketType = (index: number) => {
    const updatedTickets = formData.ticketTypes.filter((_, i) => i !== index);
    setFormData({ ...formData, ticketTypes: updatedTickets });
  };

  const handleBenefitChange = (ticketIndex: number, benefitIndex: number, value: string) => {
    const updatedTickets = [...formData.ticketTypes];
    const updatedBenefits = [...updatedTickets[ticketIndex].benefits];
    updatedBenefits[benefitIndex] = value;
    updatedTickets[ticketIndex].benefits = updatedBenefits;
    setFormData({ ...formData, ticketTypes: updatedTickets });
  };

  const addBenefit = (ticketIndex: number) => {
    const updatedTickets = [...formData.ticketTypes];
    updatedTickets[ticketIndex].benefits.push('');
    setFormData({ ...formData, ticketTypes: updatedTickets });
  };

  const removeBenefit = (ticketIndex: number, benefitIndex: number) => {
    const updatedTickets = [...formData.ticketTypes];
    updatedTickets[ticketIndex].benefits = updatedTickets[ticketIndex].benefits.filter((_, i) => i !== benefitIndex);
    setFormData({ ...formData, ticketTypes: updatedTickets });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
          <textarea
            required
            rows={4}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            value={formData.fullDescription}
            onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input
              type="text"
              required
              placeholder="e.g., 9:00 AM - 5:00 PM"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            value={formData.venue}
            onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="url"
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
        </div>
      </div>

      {/* Ticket Types */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-medium text-gray-700">Ticket Types</label>
          <button
            type="button"
            onClick={addTicketType}
            className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded"
          >
            Add Ticket Type
          </button>
        </div>

        <div className="space-y-4">
          {formData.ticketTypes.map((ticket, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">Ticket Type {index + 1}</h4>
                {formData.ticketTypes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTicketType(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Type Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    value={ticket.type}
                    onChange={(e) => handleTicketChange(index, 'type', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Price (Rs.)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    value={ticket.price}
                    onChange={(e) => handleTicketChange(index, 'price', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-xs text-gray-600 mb-1">Available Tickets</label>
                <input
                  type="number"
                  required
                  min="0"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={ticket.available}
                  onChange={(e) => handleTicketChange(index, 'available', parseInt(e.target.value))}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs text-gray-600">Benefits</label>
                  <button
                    type="button"
                    onClick={() => addBenefit(index)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
                  >
                    Add Benefit
                  </button>
                </div>
                <div className="space-y-2">
                  {ticket.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex gap-2">
                      <input
                        type="text"
                        required
                        className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        value={benefit}
                        onChange={(e) => handleBenefitChange(index, benefitIndex, e.target.value)}
                        placeholder="Benefit description"
                      />
                      {ticket.benefits.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeBenefit(index, benefitIndex)}
                          className="text-red-600 hover:text-red-700 px-2"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          {event ? 'Update Event' : 'Create Event'}
        </button>
      </div>
    </form>
  );
};

// Event Details Component
const EventDetails: React.FC<EventDetailsProps> = ({ event, onClose }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-4">
        <img
          src={event.image}
          alt={event.title}
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{event.title}</h3>
          <p className="text-gray-600">{event.shortDescription}</p>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">Full Description</h4>
        <p className="text-gray-700">{event.fullDescription}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2">Date & Time</h4>
          <p className="text-gray-600">{event.date} • {event.time}</p>
        </div>
        <div>
          <h4 className="font-medium mb-2">Venue</h4>
          <p className="text-gray-600">{event.venue}</p>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Ticket Types</h4>
        <div className="space-y-3">
          {event.ticketTypes.map((ticket: TicketType, index: number) => (
            <div key={index} className="border rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{ticket.type}</span>
                <span className="text-red-600 font-bold">Rs. {ticket.price}</span>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                <strong>Available:</strong> {ticket.available} tickets
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                {ticket.benefits.map((benefit: string, benefitIndex: number) => (
                  <li key={benefitIndex}>• {benefit}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AdminEvents;