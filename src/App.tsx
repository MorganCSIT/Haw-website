import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import VacationsPage from './pages/VacationsPage';
import PropertyPage from './pages/PropertyPage';
import HealthcarePage from './pages/HealthcarePage';
import InsurancePage from './pages/InsurancePage';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vacations" element={<VacationsPage />} />
          <Route path="/property" element={<PropertyPage />} />
          <Route path="/healthcare" element={<HealthcarePage />} />
          <Route path="/insurance" element={<InsurancePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;