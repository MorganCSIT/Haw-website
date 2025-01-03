import { Link } from 'react-router-dom';
import { NavigationItem } from '../../types/navigation';

interface NavigationProps {
  items: NavigationItem[];
  isActive: (path: string) => string;
  onItemClick?: () => void;
}

export default function Navigation({ items, isActive, onItemClick }: NavigationProps) {
  return (
    <div className="hidden md:flex space-x-8">
      {items.map((item) => (
        <Link 
          key={item.path}
          to={item.path}
          className={`transition-colors ${isActive(item.path)}`}
          onClick={onItemClick}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}