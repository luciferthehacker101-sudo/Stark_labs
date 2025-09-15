import React from 'react';
import { useLocalization } from '../context/LocalizationContext';

export const Header: React.FC = () => {
  const { t } = useLocalization();
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <style>{`
        .text-brown-800 { color: #4e342e; }
      `}</style>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-brown-800 tracking-wider">
          VETAN
        </div>
        <div className="text-sm font-medium text-slate-500">
          {t('pmInternshipScheme')}
        </div>
      </div>
    </header>
  );
};