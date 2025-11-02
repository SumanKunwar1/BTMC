import React from 'react';
import { Menu, X, Flower2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { NavItems } from '../config/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  return (
    <nav className="bg-gradient-to-r from-white via-red-50 to-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
            >
              <Flower2 className="h-12 w-12 text-red-600" />
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold gradient-text">
                  BTMC
                </span>
                <span className="text-sm text-gray-600 font-medium">
                  Foundation
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {NavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-md font-bold text-base transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/support"
              className="ml-4 px-6 py-2 bg-red-600 text-white rounded-md font-bold hover:bg-red-700 transition-colors"
            >
              Support Us
            </Link>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-red-50 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {NavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${
                  location.pathname === item.path
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                } block px-3 py-2 rounded-md text-base font-bold`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/support"
              className="block px-3 py-2 bg-red-600 text-white rounded-md font-bold hover:bg-red-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Support Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;