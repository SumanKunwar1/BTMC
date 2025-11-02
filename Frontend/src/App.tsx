import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import ContactPage from './pages/contact';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
