import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, BookOpen, Clock, Users } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { mockCourses } from '../../data/mockData';

const Courses = () => {
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
            Courses
          </motion.h1>
          <motion.button
            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Course
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
                placeholder="Search courses..."
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
                  <th className="pb-3 font-semibold text-gray-600">Course</th>
                  <th className="pb-3 font-semibold text-gray-600">Instructor</th>
                  <th className="pb-3 font-semibold text-gray-600">Duration</th>
                  <th className="pb-3 font-semibold text-gray-600">Enrolled</th>
                  <th className="pb-3 font-semibold text-gray-600">Rating</th>
                  <th className="pb-3 font-semibold text-gray-600">Status</th>
                  <th className="pb-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockCourses.map((course) => (
                  <tr key={course.id} className="border-b">
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className="bg-red-100 p-2 rounded-lg mr-3">
                          <BookOpen className="w-6 h-6 text-red-600" />
                        </div>
                        <span className="font-medium">{course.title}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-gray-600">{course.instructor}</span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{course.duration}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{course.enrolled}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-yellow-500">★</span>
                      <span className="text-gray-600 ml-1">{course.rating}</span>
                    </td>
                    <td className="py-4">
                      <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-600">
                        {course.status}
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

export default Courses;