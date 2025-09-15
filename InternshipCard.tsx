import React from 'react';
import { Internship } from '../types';
import { useLocalization } from '../context/LocalizationContext';

interface InternshipCardProps {
  internship: Internship;
  isRecommended?: boolean;
}

export const InternshipCard: React.FC<InternshipCardProps> = ({ internship, isRecommended }) => {
  const { t } = useLocalization();

  return (
    <div className={`bg-white shadow-md rounded-xl p-6 border-l-4 ${isRecommended ? 'border-indigo-500' : 'border-slate-300'} transition-all duration-300 hover:shadow-lg hover:border-indigo-400`}>
      {isRecommended && (
        <div className="text-sm font-bold text-indigo-600 mb-2 tracking-wide uppercase">{t('recommendedTag')}</div>
      )}
      <h3 className="text-lg font-bold text-slate-800">{internship.title}</h3>
      <p className="text-md text-slate-600 font-medium mt-1">{internship.company}</p>
      <p className="text-sm text-slate-500 mt-1">{internship.location}</p>
      <p className="text-sm text-slate-600 mt-4">{internship.description}</p>
      <div className="mt-4">
        <h4 className="text-sm font-semibold text-slate-700 mb-2">{t('skillsRequiredLabel')}</h4>
        <div className="flex flex-wrap gap-2">
          {internship.requiredSkills.map((skill, index) => (
            <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
