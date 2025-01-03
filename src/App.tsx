import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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
import Footer from './components/Footer';
import ScrollToTop from './components/utils/ScrollToTop';

function ScrollToContact() {
  const location = useLocation();

  useEffect(() => {
    if (location.search.includes('contact=true')) {
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <Header />
        <ScrollToContact />
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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}