import { useState } from 'react';
import { Menu, X, Palmtree } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useClickAway } from '../hooks/useClickAway';

const navigationItems = [
  { path: '/', label: 'Home' },
  { path: '/healthcare', label: 'Healthcare' },
  { path: '/insurance', label: 'Insurance & Legal' },
  { path: '/vacations', label: 'Assisted Vacations' },
  { path: '/property', label: 'Property Investment' },
  { path: '/events', label: 'Community' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' }
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuRef = useClickAway(() => {
    setIsMenuOpen(false);
  });

  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-teal-600' : 'text-gray-600 hover:text-teal-600';
  };

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
            <Palmtree className="h-8 w-8 text-teal-600" />
            <span className="text-2xl font-semibold text-gray-800">Serenity Haven</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`transition-colors ${isActive(item.path)}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div ref={menuRef} className="md:hidden mt-4 space-y-4">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`block w-full text-left py-2 ${isActive(item.path)}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}