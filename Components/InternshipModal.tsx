import React from 'react';
import { Internship } from '../types';
import { useLocalization } from '../context/LocalizationContext';

interface InternshipModalProps {
  internship: Internship;
  onClose: () => void;
}

export const InternshipModal: React.FC<InternshipModalProps> = ({ internship, onClose }) => {
  const { t } = useLocalization();

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full relative transform transition-all"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-olive-medium hover:text-green-dark"
          aria-label={t('closeButton')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-green-dark">{internship.title}</h2>
        <p className="text-lg text-green-dark font-medium mt-1">{internship.company}</p>
        <p className="text-md text-olive-medium mt-1">{internship.location}</p>
        
        <div className="mt-6 pt-4 border-t border-khaki-medium">
          <p className="text-green-dark">{internship.description}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-md font-semibold text-green-dark mb-2">{t('skillsRequiredLabel')}</h3>
          <div className="flex flex-wrap gap-2">
            {internship.requiredSkills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-khaki-light text-green-dark text-sm font-medium rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-md font-semibold text-green-dark">{t('deadlineLabel')}</h3>
          <p className="text-green-dark">{new Date(internship.deadline).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="mt-8 text-right">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onClose(); }} 
              className="bg-green-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-green-dark transition"
            >
              {t('applyNow')}
            </a>
        </div>
      </div>
    </div>
  );
};
