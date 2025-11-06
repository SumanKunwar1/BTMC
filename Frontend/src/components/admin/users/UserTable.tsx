import { Mail, Phone, MoreVertical } from 'lucide-react';
import { mockUsers } from '../../../data/mockData';

const UserTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="pb-3 font-semibold text-gray-600">User</th>
            <th className="pb-3 font-semibold text-gray-600">Contact</th>
            <th className="pb-3 font-semibold text-gray-600">Role</th>
            <th className="pb-3 font-semibold text-gray-600">Status</th>
            <th className="pb-3 font-semibold text-gray-600">Joined Date</th>
            <th className="pb-3 font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockUsers.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="py-4">
                <div className="flex items-center">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.username}</p>
                  </div>
                </div>
              </td>
              <td className="py-4">
                <div className="space-y-1">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{user.phone}</span>
                  </div>
                </div>
              </td>
              <td className="py-4">
                <span className="text-gray-600">{user.role}</span>
              </td>
              <td className="py-4">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  user.status === 'Active'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {user.status}
                </span>
              </td>
              <td className="py-4">
                <span className="text-gray-600">{user.joinedDate}</span>
              </td>
              <td className="py-4">
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;