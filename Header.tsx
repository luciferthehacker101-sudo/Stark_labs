import React from 'react';
import { useLocalization } from '../context/LocalizationContext';

export const Header: React.FC = () => {
  const { t } = useLocalization();
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-slate-800 tracking-wider">
          VETAN
        </div>
        <div className="text-sm font-medium text-slate-500">
          {t('pmInternshipScheme')}
        </div>
      </div>
    </header>
  );
};
