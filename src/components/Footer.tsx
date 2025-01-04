import FooterLogo from './footer/FooterLogo';
import FooterLinks from './footer/FooterLinks';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:justify-between md:space-x-8 mb-8">
          <FooterLogo />
          <FooterLinks />
        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Serenity Haven. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-teal-400">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-teal-400">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-teal-400">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}