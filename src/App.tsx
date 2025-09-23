import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { usePageTracking } from './hooks/useAnalytics';
import { useEffect } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import AccountPage from './pages/AccountPage';
import VacationsPage from './pages/VacationsPage';
import PropertyPage from './pages/PropertyPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
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
import AdminPage from './pages/AdminPage';
import AdminLoginPage from './pages/AdminLoginPage';
import SelectionFlow from './pages/SelectionFlow';
import Footer from './components/Footer';
import ScrollToTop from './components/utils/ScrollToTop';
import ErrorBoundary from './components/ui/ErrorBoundary';
import ToastContainer from './components/ui/ToastContainer';

export default function App() {
  const { initialize } = useAuth();
  usePageTracking();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Routes>
            {/* Routes without header and footer */}
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/selection" element={<SelectionFlow />} />

            {/* Regular routes with header and footer */}
            <Route
              path="*"
              element={
                <>
                  <Header />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/signup" element={<SignupPage />} />
                      <Route path="/reset-password" element={<ResetPasswordPage />} />
                      <Route path="/account" element={<AccountPage />} />
                      <Route path="/vacations" element={<VacationsPage />} />
                      <Route path="/property" element={<PropertyPage />} />
                      <Route path="/property/:id" element={<PropertyDetailsPage />} />
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
                  </main>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
        <ToastContainer />
      </Router>
    </ErrorBoundary>
  );
}