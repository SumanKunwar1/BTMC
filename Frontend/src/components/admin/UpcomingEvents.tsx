import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Live Music Concert',
    date: 'March 30, 2024',
    time: '6:00 PM',
    registrations: 145,
    status: 'Active'
  },
  {
    id: 2,
    title: 'Buddhist Philosophy Workshop',
    date: 'April 5, 2024',
    time: '10:00 AM',
    registrations: 89,
    status: 'Active'
  },
  {
    id: 3,
    title: 'Meditation Retreat',
    date: 'April 15, 2024',
    time: '7:00 AM',
    registrations: 56,
    status: 'Upcoming'
  }
];

const UpcomingEvents = () => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex items-start space-x-4">
            <div className="bg-red-100 text-red-600 p-2 rounded-lg">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">{event.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  event.status === 'Active' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {event.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {event.date} at {event.time}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {event.registrations} registrations
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 text-sm text-red-600 hover:text-red-700">
        View all events →
      </button>
    </motion.div>
  );
};

export default UpcomingEvents;