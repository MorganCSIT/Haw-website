import { useState, useRef, useEffect } from 'react';
import { Menu, X, Palmtree, Heart, UserCircle, ChevronDown } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import InterestCounter from './interests/InterestCounter';

const navigationItems = [
  { path: '/', label: 'Home' },
  {
    label: 'About Us',
    path: '/about',
  },
  {
    label: 'Services',
    children: [
      { path: '/healthcare', label: 'Healthcare' },
      { path: '/insurance', label: 'Insurance' },
      { path: '/property', label: 'Visa & Property' }
    ]
  },
  {
    label: 'Experiences',
    children: [
      { path: '/vacations', label: 'Activities' },
      { path: '/events', label: 'Community' },
    ]
  }
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-teal-600' : 'text-gray-600 hover:text-teal-600';
  };

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Palmtree className="h-8 w-8 text-teal-600" />
            <span className="text-2xl font-semibold text-gray-800">Serenity Haven</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.path || item.label} className="relative">
                {item.children ? (
                  <div className="relative">
                    <button
                      onClick={() => handleDropdownToggle(item.label)}
                      className="flex items-center space-x-1 text-gray-600 hover:text-teal-600"
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`transition-colors ${isActive(item.path)}`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-6">
            <Link
              to={user ? '/account' : '/login'}
              className="flex items-center space-x-2 text-gray-600 hover:text-teal-600"
            >
              {user ? (
                <div className="relative">
                  <Heart className="h-6 w-6" />
                  <InterestCounter />
                </div>
              ) : (
                <UserCircle className="h-6 w-6" />
              )}
              <span className="hidden md:inline">{user ? 'My Interests' : 'Sign In'}</span>
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div ref={menuRef} className="md:hidden mt-4 py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <div key={item.path || item.label}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => handleDropdownToggle(item.label)}
                        className="flex items-center justify-between w-full py-2 text-gray-600"
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                      </button>
                      {openDropdown === item.label && (
                        <div className="pl-4 mt-2 space-y-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className="block py-2 text-gray-600 hover:text-teal-600"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`block py-2 ${isActive(item.path)}`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}