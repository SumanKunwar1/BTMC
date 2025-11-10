import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Teachings from './pages/Teachings';
import CourseCategory from './pages/CourseCategory';
import CourseDetail from './pages/CourseDetail';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Tours from './pages/Tours';
import TourDetail from './pages/TourDetail';
import Support from './pages/Support';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Team from './pages/Team';
import Gallery from './pages/Gallery';
import Career from './pages/Career';
import FAQ from './pages/FAQ';
import ContactPage from './pages/Contact';

// Admin routes
import Login from './pages/admin/AdminLogin';
import Pages from './pages/admin/AdminPages';
import Courses from './pages/admin/AdminCourses';
import Dashboard from './pages/admin/AdminDashboard';
import Donations from './pages/admin/AdminDonations';
import AdminEvents from './pages/admin/AdminEvents';
import Settings from './pages/admin/AdminSettings';
import AdminTours from './pages/admin/AdminTours';
import Users from './pages/admin/AdminUsers';
import AdminSupportUser from './pages/admin/AdminSupportUser';
import AdminTourUsers from './pages/admin/AdminTourUsers';

// Authentication context
const AuthContext = React.createContext<{
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => React.useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
    const token = localStorage.getItem('adminToken');
    return !!token; // Simple check - token exists
  });

  const login = (token: string) => {
    localStorage.setItem('adminToken', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated && location.pathname === '/admin/login') {
    const from = location.state?.from?.pathname || '/admin/dashboard';
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};

// Layout component to conditionally show navbar and footer
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';

  if (isAdminRoute) {
    // Admin layout - no navbar and footer
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  // Public layout - with navbar and footer
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/teachings" element={<Teachings />} />
            <Route path="/teachings/:categoryId" element={<CourseCategory />} />
            <Route path="/teachings/:categoryId/:courseId" element={<CourseDetail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/tours/:id" element={<TourDetail />} />
            <Route path="/support" element={<Support />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/team" element={<Team />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/career" element={<Career />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Admin Routes */}
            <Route 
              path="/admin/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            
            {/* Protected Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/courses" 
              element={
                <ProtectedRoute>
                  <Courses />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/events" 
              element={
                <ProtectedRoute>
                  <AdminEvents />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/tours" 
              element={
                <ProtectedRoute>
                  <AdminTours />
                </ProtectedRoute>
              } 
            />
            <Route 
            path="/admin/support-users"
            element={<ProtectedRoute>
              <AdminSupportUser />
            </ProtectedRoute>
            }
            />

            <Route
              path="/admin/tour/users"
              element={<ProtectedRoute>
                <AdminTourUsers />
              </ProtectedRoute>
              }
              />
            <Route 
              path="/admin/donations" 
              element={
                <ProtectedRoute>
                  <Donations />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/pages" 
              element={
                <ProtectedRoute>
                  <Pages />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/settings" 
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } 
            />

            {/* Redirect to home for unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;