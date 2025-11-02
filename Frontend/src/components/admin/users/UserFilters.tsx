import React from 'react';
import { Filter } from 'lucide-react';

const UserFilters = () => {
  return (
    <div className="flex items-center space-x-4">
      <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
        <option value="">All Roles</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
        <option value="moderator">Moderator</option>
      </select>

      <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="pending">Pending</option>
      </select>

      <button className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
        <Filter className="w-5 h-5 mr-2" />
        More Filters
      </button>
    </div>
  );
};

export default UserFilters;