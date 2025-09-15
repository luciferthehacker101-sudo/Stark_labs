import React from 'react';
import { useLocalization } from '../context/LocalizationContext';

interface LanguageSelectorProps {
  onSelectLanguage: () => void;
}

const Logo = () => {
    const { t } = useLocalization();
    return (
      <div className="flex flex-col items-center mb-12">
        <svg width="80" height="80" viewBox="0 0 100 100" className="text-brown-700" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M50 10 C20 40, 20 70, 50 90 C80 70, 80 40, 50 10 Z" />
          <path d="M50 90 C40 65, 60 65, 50 40" />
        </svg>
        <h1 className="text-6xl font-extrabold tracking-wider text-brown-800 mt-2">VETAN</h1>
        <p className="text-xs font-medium text-brown-700 tracking-widest mt-1">{t('vetanFullName')}</p>
      </div>
    );
};

const languages = [
  { name: 'Hindi', code: 'hi' },
  { name: 'English', code: 'en' },
  { name: 'Tamil', code: 'ta' },
  { name: 'Telugu', code: 'te' },
  { name: 'Marathi', code: 'mr' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelectLanguage }) => {
  const { setLanguage } = useLocalization();
  
  const handleSelect = (langCode: string) => {
    setLanguage(langCode);
    onSelectLanguage();
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center p-4">
      {/* Custom styles to match the brown color from the logo */}
      <style>{`
        .text-brown-700 { color: #6d4c41; }
        .text-brown-800 { color: #4e342e; }
      `}</style>
      
      <div className="w-full max-w-xs text-center">
        <Logo />
        <div className="space-y-4">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className="w-full bg-gray-100 text-gray-800 font-semibold py-3 px-6 rounded-full shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all duration-200 ease-in-out"
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};