import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GetStartedButton() {
  return (
    <Link 
      to="/selection"
      className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
    >
      Start Your Journey
      <ArrowRight className="h-4 w-4 ml-2" />
    </Link>
  );
}