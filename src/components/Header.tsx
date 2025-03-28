import { useState, useRef } from "react";
import { Menu, X, Palmtree, Heart, UserCircle } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PlanCounter from "./plan/PlanCounter";

const navigationItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About us" },
  { path: "/vacations", label: "Experiences" },
  { path: "/property", label: "Properties" },
  { path: "/healthcare", label: "Healthcare" },
  { path: "/insurance", label: "Insurance" },
  { path: "/events", label: "Community" },

  // { path: "/blog", label: "Blog" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const isActive = (path: string) => {
    return location.pathname === path
      ? "text-teal-600"
      : "text-gray-600 hover:text-teal-600";
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNavigation(user ? "/account" : "/login")}
                className="text-left py-2 text-gray-600 hover:text-teal-600"
              >
                {user ? "My Plan" : "Sign In"}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
