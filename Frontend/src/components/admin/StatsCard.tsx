import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon: Icon, color }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm p-6"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="mt-4">
        <span className="text-sm text-green-600">{change}</span>
        <span className="text-sm text-gray-500 ml-2">vs last month</span>
      </div>
    </motion.div>
  );
};

export default StatsCard;