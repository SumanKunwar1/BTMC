import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, BookOpen, Map } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import StatsCard from '../../components/admin/StatsCard';
import RecentActivities from '../../components/admin/RecentActivities';
import UpcomingEvents from '../../components/admin/UpcomingEvents';

const stats = [
  { 
    title: 'Total Students',
    value: '5,234',
    change: '+12%',
    icon: Users,
    color: 'bg-blue-500'
  },
  {
    title: 'Active Events',
    value: '23',
    change: '+5%',
    icon: Calendar,
    color: 'bg-red-500'
  },
  {
    title: 'Course Enrollments',
    value: '1,432',
    change: '+18%',
    icon: BookOpen,
    color: 'bg-green-500'
  },
  {
    title: 'Tour Bookings',
    value: '342',
    change: '+8%',
    icon: Map,
    color: 'bg-purple-500'
  }
];

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <motion.h1 
          className="text-2xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Dashboard
        </motion.h1>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivities />
          <UpcomingEvents />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;