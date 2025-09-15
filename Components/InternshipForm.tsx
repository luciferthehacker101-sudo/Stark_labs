import React, { useState } from 'react';
import { UserProfile } from '../types';
import { useLocalization } from '../context/LocalizationContext';

interface InternshipFormProps {
  initialProfile: UserProfile;
  onSubmit: (profile: UserProfile, isBestMatch: boolean) => void;
  isLoading: boolean;
}

const educationLevels = [
  '10th Pass',
  '12th Pass',
  'Diploma',
  'Graduate',
  'Post Graduate'
];

const skillSets = [
  'MS Office', 'MS Excel', 'Communication', 'Interpersonal Skills', 'Patience', 
  'Hard work', 'Interest in Agriculture', 'Local Language Skills', 'Basic Computer Skills', 
  'Data Entry', 'Typing', 'Basic Math', 'Social Media Management', 'Content Writing', 
  'Canva', 'Attention to Detail', 'Storytelling', 'Customer Service', 'Problem Solving', 
  'Computer Hardware', 'Organization Skills', 'Field Work', 'Data Collection', 'Surveying', 
  'Listening Skills', 'Digital Marketing', 'SEO Basics', 'Love for animals', 'Teamwork', 
  'Data Analysis', 'Public Speaking', 'Presentation Skills', 'Video Editing', 'HTML/CSS', 
  'Logical Thinking'
];

export const InternshipForm: React.FC<InternshipFormProps> = ({ initialProfile, onSubmit, isLoading }) => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const { t } = useLocalization();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setProfile(prevProfile => ({
      ...prevProfile,
      skills: selectedOptions.join(', ')
    }));
  };

  const handleSubmit = (e: React.FormEvent, isBestMatch: boolean = false) => {
    e.preventDefault();
    onSubmit(profile, isBestMatch);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="education" className="block text-sm font-medium text-green-dark mb-1">{t('educationLabel')}</label>
          <select
            name="education"
            id="education"
            value={profile.education}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-khaki-medium rounded-lg focus:ring-olive-medium focus:border-olive-medium transition bg-white"
            required
            aria-required="true"
          >
            {educationLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-green-dark mb-1">{t('locationLabel')}</label>
          <input
            type="text"
            name="location"
            id="location"
            value={profile.location}
            onChange={handleChange}
            placeholder={t('locationPlaceholder')}
            className="w-full px-4 py-2 border border-khaki-medium rounded-lg focus:ring-olive-medium focus:border-olive-medium transition bg-white"
            required
            aria-required="true"
          />
        </div>
      </div>
      <div>
        <label htmlFor="skills" className="block text-sm font-medium text-green-dark mb-1">{t('skillsLabel')}</label>
        <select
          name="skills"
          id="skills"
          multiple
          value={profile.skills.split(', ')}
          onChange={handleSkillsChange}
          className="w-full px-4 py-2 border border-khaki-medium rounded-lg focus:ring-olive-medium focus:border-olive-medium transition h-48 bg-white"
          required
          aria-required="true"
        >
          {skillSets.map(skill => (
            <option key={skill} value={skill}>{skill}</option>
          ))}
        </select>
         <p className="text-xs text-olive-medium mt-1">Hold Ctrl (or Cmd on Mac) to select multiple skills.</p>
      </div>
      <div>
        <label htmlFor="interests" className="block text-sm font-medium text-green-dark mb-1">{t('interestsLabel')}</label>
        <textarea
          name="interests"
          id="interests"
          rows={3}
          value={profile.interests}
          onChange={handleChange}
          placeholder={t('interestsPlaceholder')}
          className="w-full px-4 py-2 border border-khaki-medium rounded-lg focus:ring-olive-medium focus:border-olive-medium transition bg-white"
          required
          aria-required="true"
        />
      </div>
      <div className="space-y-4 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-primary disabled:bg-olive-light disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center"
          aria-live="polite"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('submitButtonLoading')}
            </>
          ) : t('submitButton')}
        </button>
        <button
          type="button"
          onClick={(e) => handleSubmit(e, true)}
          disabled={isLoading}
          className="w-full bg-olive-medium text-white font-bold py-3 px-4 rounded-lg hover:bg-green-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-primary disabled:bg-olive-light disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center text-lg"
        >
          {t('bestMatchButton')}
        </button>
      </div>
    </form>
  );
};
