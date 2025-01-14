import { NavigationItem } from "../../types/navigation";

interface MobileMenuProps {
  items: NavigationItem[];
  isActive: (path: string) => string;
  onItemClick: (path: string) => void;
  onContactClick: () => void;
  isOpen: boolean;
}

export default function MobileMenu({
  items,
  isActive,
  onItemClick,
  onContactClick,
  isOpen,
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden mt-4 space-y-4">
      {items.map((item) => (
        <button
          key={item.path}
          onClick={() => onItemClick(item.path)}
          className={`block w-full text-left py-2 ${isActive(item.path)}`}
        >
          {item.label}
        </button>
      ))}
      <button
        onClick={onContactClick}
        className="block w-full text-left py-2 text-gray-600 hover:text-teal-600 transition-colors"
      >
        Contact
      </button>
    </div>
  );
}
