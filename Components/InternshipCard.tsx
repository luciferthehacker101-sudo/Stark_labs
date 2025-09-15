import React from 'react';
import { Internship } from '../types';
import { useLocalization } from '../context/LocalizationContext';

interface InternshipCardProps {
  internship: Internship;
  isRecommended?: boolean;
  onPreview: (internship: Internship) => void;
  onFeedback: (internshipId: number, feedback: string) => void;
  feedbackGiven?: string;
}

const DeadlineCounter: React.FC<{ deadline: string }> = ({ deadline }) => {
  const { t } = useLocalization();
  const calculateDaysLeft = () => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    // Reset time part to compare dates only
    today.setHours(0, 0, 0, 0);
    deadlineDate.setHours(0, 0, 0, 0);
    
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = calculateDaysLeft();

  if (daysLeft < 0) {
    return <span className="text-sm font-medium text-red-600">{t('deadlinePassed')}</span>;
  }
  
  const colorClass = daysLeft <= 7 ? 'text-olive-medium' : 'text-olive-light';

  return (
    <span className={`text-sm font-medium ${colorClass}`}>
      ⏳ {daysLeft} {t('daysLeft')}
    </span>
  );
};

export const InternshipCard: React.FC<InternshipCardProps> = ({ internship, isRecommended, onPreview, onFeedback, feedbackGiven }) => {
  const { t } = useLocalization();
  const emojis = ['😊', '😐', '😟'];

  return (
    <div className={`bg-white shadow-md rounded-xl p-6 border-l-4 ${isRecommended ? 'border-olive-medium' : 'border-khaki-medium'} transition-all duration-300 hover:shadow-lg hover:border-olive-light flex flex-col`}>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          {isRecommended && (
            <div className="text-sm font-bold text-olive-medium mb-2 tracking-wide uppercase">{t('recommendedTag')}</div>
          )}
          <DeadlineCounter deadline={internship.deadline} />
        </div>
        <h3 className="text-lg font-bold text-green-dark">{internship.title}</h3>
        <p className="text-md text-green-dark font-medium mt-1">{internship.company}</p>
        <p className="text-sm text-olive-medium mt-1">{internship.location}</p>
        <p className="text-sm text-green-dark mt-4">{internship.description}</p>
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-green-dark mb-2">{t('skillsRequiredLabel')}</h4>
          <div className="flex flex-wrap gap-2">
            {internship.requiredSkills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-khaki-light text-green-dark text-xs font-medium rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-khaki-medium">
        <div className="flex items-center justify-between gap-2 mb-4">
          <button onClick={() => onPreview(internship)} className="w-full text-center bg-khaki-medium text-green-dark font-semibold py-2 px-3 rounded-lg hover:bg-olive-light transition text-sm">{t('preview')}</button>
          <a href="#" onClick={(e) => e.preventDefault()} className="w-full text-center bg-green-primary text-white font-semibold py-2 px-3 rounded-lg hover:bg-green-dark transition text-sm">{t('applyNow')}</a>
        </div>
        <div className="text-center">
            <p className="text-xs text-olive-medium mb-2">{t('feedbackPrompt')}</p>
            {feedbackGiven ? (
                 <p className="text-sm font-medium text-green-600">{t('feedbackThanks')}</p>
            ) : (
                <div className="flex justify-center space-x-4">
                    {emojis.map(emoji => (
                        <button key={emoji} onClick={() => onFeedback(internship.id, emoji)} className="text-2xl transform hover:scale-125 transition-transform">
                            {emoji}
                        </button>
                    ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
