import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  BookOpen, 
  Map, 
  Heart, 
  Settings,
  LogOut 
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Events', href: '/admin/events', icon: Calendar },
  { name: 'Courses', href: '/admin/courses', icon: BookOpen },
  { name: 'Tours', href: '/admin/tours', icon: Map },
  { name: 'Donations', href: '/admin/donations', icon: Heart },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 bg-red-600">
            <Link to="/admin" className="text-white text-xl font-bold">
              BTMC Admin
            </Link>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-red-50 text-red-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t">
            <button className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64">
        <header className="h-16 bg-white shadow-sm">
          <div className="flex items-center justify-end h-full px-6">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Admin User</span>
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                alt="Admin"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;