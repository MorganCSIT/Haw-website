import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import VacationsPage from './pages/VacationsPage';
import PropertyPage from './pages/PropertyPage';
import HealthcarePage from './pages/HealthcarePage';
import InsurancePage from './pages/InsurancePage';
import BlogPage from './pages/BlogPage';
import BlogPost from './components/blog/BlogPost';
import EventsPage from './pages/EventsPage';
import EventDetails from './components/events/EventDetails';
import ContactPage from './pages/ContactPage';
import CareersPage from './pages/CareersPage';
import NewsletterPage from './pages/NewsletterPage';
import AboutPage from './pages/AboutPage';
import Footer from './components/Footer';
import ScrollToTop from './components/utils/ScrollToTop';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vacations" element={<VacationsPage />} />
          <Route path="/property" element={<PropertyPage />} />
          <Route path="/healthcare" element={<HealthcarePage />} />
          <Route path="/insurance" element={<InsurancePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}