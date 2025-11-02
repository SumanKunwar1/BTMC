import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10 items-start">
          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-red-500" />
              <span>Mhepi, Kathmandu, Nepal</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-red-500" />
              <span>+977-9818123174</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-red-500" />
              <span>info@btmcfoundation.org</span>
            </div>
          </div>

          {/* Quick Links 1 */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-1">
              <li><a href="/about" className="hover:text-red-500 transition-colors">About Us</a></li>
              <li><a href="/teachings" className="hover:text-red-500 transition-colors">Teachings</a></li>
              <li><a href="/events" className="hover:text-red-500 transition-colors">Events</a></li>
              <li><a href="/support" className="hover:text-red-500 transition-colors">Support Us</a></li>
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold mb-3">Resources</h3>
            <ul className="space-y-1">
              <li><a href="/blog" className="hover:text-red-500 transition-colors">Blogs</a></li>
              <li><a href="/team" className="hover:text-red-500 transition-colors">Our Team</a></li>
              <li><a href="/gallery" className="hover:text-red-500 transition-colors">Gallery</a></li>
              <li><a href="/career" className="hover:text-red-500 transition-colors">Career</a></li>
              <li><a href="/faq" className="hover:text-red-500 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold mb-3">Newsletter</h3>
            <p className="text-sm text-gray-300">
              Subscribe to receive updates about our activities and events.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} BTMC Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
