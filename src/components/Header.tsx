import { useState, useRef, useEffect } from "react";
import { Menu, X, Palmtree, Heart, UserCircle, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PlanCounter from "./plan/PlanCounter";

const navigationItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About us" },
  {
    label: "Services",
    children: [
      { path: "/vacations", label: "Experiences" },
      { path: "/property", label: "Properties" },
      { path: "/healthcare", label: "Healthcare" },
      { path: "/insurance", label: "Insurance" },
      { path: "/events", label: "Community" },
    ],
  },
  
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Add this new effect to handle route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  }, [location.pathname]);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const isActive = (path: string) => {
    return location.pathname === path
      ? "text-teal-600"
      : "text-gray-600 hover:text-teal-600";
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const ServicesDropdown = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div ref={dropdownRef} className={`${isMobile ? 'w-full' : 'relative'}`}>
      <button
        className={`flex items-center ${
          isMobile 
            ? 'justify-between w-full py-2' 
            : 'space-x-1'
        } text-gray-600 hover:text-teal-600`}
        onClick={() => setIsServicesOpen(!isServicesOpen)}
        type="button"
      >
        <span>Services</span>
        <ChevronDown 
          className={`h-4 w-4 transition-transform duration-200 ${
            isServicesOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>
      {isServicesOpen && (
        <div 
          className={`${
            isMobile
              ? 'flex flex-col w-full bg-white border border-gray-100 rounded-md mt-1'
              : 'absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2'
          } z-50`}
        >
          {navigationItems
            .find(item => item.label === "Services")
            ?.children?.map((child) => (
              <Link
                key={child.path}
                to={child.path}
                className={`block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-teal-600 ${
                  location.pathname === child.path ? 'text-teal-600' : ''
                }`}
                onClick={() => {
                  setIsServicesOpen(false);
                  setIsMenuOpen(false);
                }}
              >
                {child.label}
              </Link>
            ))}
        </div>
      )}
    </div>
  );

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <Palmtree className="h-8 w-8 text-teal-600" />
            <div className="flex flex-col">
              <span className="text-2xl font-semibold text-gray-800">
                Serenity Haven
              </span>
              {user && (
                <span className="text-xs italic text-gray-400 -mt-1">
                  {user.email}
                </span>
              )}
            </div>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link to="/" className={`transition-colors ${isActive("/")}`}>
              Home
            </Link>
            <Link to="/about" className={`transition-colors ${isActive("/about")}`}>
              About us
            </Link>
            <ServicesDropdown isMobile={false} />
          </div>

          <div className="flex items-center space-x-6">
            <Link
              to={user ? "/account" : "/login"}
              className="flex items-center space-x-2 text-gray-600 hover:text-teal-600"
            >
              {user ? (
                <div className="relative">
                  <Heart className="h-6 w-6" />
                  <PlanCounter />
                </div>
              ) : (
                <UserCircle className="h-6 w-6" />
              )}
              <span className="hidden md:inline">
                {user ? "My Plan" : "Sign In"}
              </span>
            </Link>
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={handleMenuToggle}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div ref={menuRef} className="md:hidden mt-4 py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`block py-2 ${isActive("/")}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`block py-2 ${isActive("/about")}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About us
              </Link>
              <ServicesDropdown isMobile={true} />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
