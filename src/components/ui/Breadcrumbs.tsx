import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { generateBreadcrumbs } from '../../utils/seo';

export default function Breadcrumbs() {
  const location = useLocation();
  const breadcrumbs = generateBreadcrumbs(location.pathname);

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.path} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
          {index === 0 ? (
            <Link to={crumb.path} className="flex items-center hover:text-teal-600">
              <Home className="h-4 w-4" />
            </Link>
          ) : index === breadcrumbs.length - 1 ? (
            <span className="text-gray-900 font-medium">{crumb.label}</span>
          ) : (
            <Link to={crumb.path} className="hover:text-teal-600">
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}