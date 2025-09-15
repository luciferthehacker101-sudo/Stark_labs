import React from 'react';
import { useLocalization } from '../context/LocalizationContext';

interface LanguageSelectorProps {
  onSelectLanguage: () => void;
}

const Logo = () => {
    const { t } = useLocalization();
    return (
      <div className="flex flex-col items-center mb-12">
        <svg width="80" height="80" viewBox="0 0 100 100" className="logo-color-primary" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M50 10 C20 40, 20 70, 50 90 C80 70, 80 40, 50 10 Z" />
          <path d="M50 90 C40 65, 60 65, 50 40" />
        </svg>
        <h1 className="text-6xl font-extrabold tracking-wider logo-color-primary mt-2">VETAN</h1>
        <p className="text-xs font-medium logo-color-primary tracking-widest mt-1">{t('vetanFullName')}</p>
      </div>
    );
};

const languages = [
  { name: 'Hindi', code: 'hi' },
  { name: 'English', code: 'en' },
  { name: 'Tamil', code: 'ta' },
  { name: 'Telugu', code: 'te' },
  { name: 'Marathi', code: 'mr' },
] as const;

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelectLanguage }) => {
  const { setLanguage } = useLocalization();
  
  // FIX: Correctly type `langCode` from the `languages` array.
  // With `languages` using `as const`, `typeof languages[number]['code']` resolves to the union of language codes,
  // which matches the `Language` type expected by `setLanguage`.
  const handleSelect = (langCode: typeof languages[number]['code']) => {
    setLanguage(langCode);
    onSelectLanguage();
  };

  return (
    <div className="bg-khaki-light min-h-screen flex flex-col items-center justify-center p-4">
      {/* Custom styles to match the new theme from the palette */}
      <style>{`
        .logo-color-primary { color: #4C8619; }
      `}</style>
      
      <div className="w-full max-w-xs text-center">
        <Logo />
        <div className="space-y-4">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className="w-full bg-khaki-medium text-green-dark font-semibold py-3 px-6 rounded-full shadow-md hover:bg-olive-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive-light transition-all duration-200 ease-in-out"
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
