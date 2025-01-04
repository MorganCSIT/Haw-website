import { Palmtree } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FooterLogo() {
  return (
    <div className="mb-8 md:mb-0">
      <Link to="/" className="flex items-center space-x-2">
        <Palmtree className="h-8 w-8 text-teal-500" />
        <span className="text-2xl font-semibold text-white">Serenity Haven</span>
      </Link>
      <p className="mt-4 text-gray-400 max-w-xs">
        Your trusted partner for retirement living and investment opportunities in Phuket, Thailand.
      </p>
    </div>
  );
}