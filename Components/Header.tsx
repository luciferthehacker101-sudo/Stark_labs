import React from 'react';
import { useLocalization } from '../context/LocalizationContext';

export const Header: React.FC = () => {
  const { t } = useLocalization();
  return (
    <header className="bg-green-dark shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-white tracking-wider">
          VETAN
        </div>
        <div className="text-sm font-medium text-khaki-light">
          {t('pmInternshipScheme')}
        </div>
      </div>
    </header>
  );
};
