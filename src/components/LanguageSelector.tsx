import { useState, useRef } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage, type Language } from '../store/useLanguage';
import { useClickAway } from '../hooks/useClickAway';

const languages: { code: Language; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'fr', label: 'French', native: 'Français' }
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const ref = useClickAway<HTMLDivElement>(() => setIsOpen(false));

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-600 hover:text-teal-600 transition-colors"
        aria-label="Select language"
      >
        <Globe className="h-5 w-5" />
        <span className="text-sm font-medium">{currentLanguage?.native}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                language === lang.code 
                  ? 'text-teal-600 bg-teal-50/50' 
                  : 'text-gray-700'
              }`}
            >
              <span className="font-medium">{lang.native}</span>
              <span className="text-sm text-gray-500 ml-2">{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}