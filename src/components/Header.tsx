import { useState, useRef } from 'react';
import { Menu, X, Palmtree, Heart, UserCircle } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import InterestCounter from './interests/InterestCounter';
import LanguageSelector from './LanguageSelector';

const navigationItems = [
  { path: '/', key: 'home' },
  { path: '/healthcare', key: 'healthcare' },
  { path: '/insurance', key: 'insurance' },
  { path: '/vacations', key: 'vacations' },
  { path: '/property', key: 'property' },
  { path: '/events', key: 'community' },
  { path: '/blog', key: 'blog' }
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { t } = useTranslation();

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
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
              <Palmtree className="h-8 w-8 text-teal-600" />
              <div className="flex flex-col">
                <span className="text-2xl font-semibold text-gray-800">{t('common.brandName')}</span>
                {user && (
                  <span className="text-xs italic text-gray-400 -mt-1">
                    {user.email}
                  </span>
                )}
              </div>
            </Link>
            <LanguageSelector />
          </div>
          
          <div className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`transition-colors ${isActive(item.path)}`}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </div>

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
              <span className="hidden md:inline">
                {user ? t('nav.myInterests') : t('nav.signIn')}
              </span>
            </Link>
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div 
            ref={menuRef}
            className="md:hidden mt-4 py-4 border-t border-gray-100"
          >
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`text-left py-2 ${isActive(item.path)}`}
                >
                  {t(`nav.${item.key}`)}
                </button>
              ))}
              <button
                onClick={() => handleNavigation(user ? '/account' : '/login')}
                className="text-left py-2 text-gray-600 hover:text-teal-600"
              >
                {user ? t('nav.myInterests') : t('nav.signIn')}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}