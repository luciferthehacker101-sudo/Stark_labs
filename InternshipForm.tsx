import React, { useState } from 'react';
import { UserProfile } from '../types';
import { useLocalization } from '../context/LocalizationContext';

interface InternshipFormProps {
  initialProfile: UserProfile;
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
}

export const InternshipForm: React.FC<InternshipFormProps> = ({ initialProfile, onSubmit, isLoading }) => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const { t } = useLocalization();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="education" className="block text-sm font-medium text-slate-600 mb-1">{t('educationLabel')}</label>
          <input
            type="text"
            name="education"
            id="education"
            value={profile.education}
            onChange={handleChange}
            placeholder={t('educationPlaceholder')}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-slate-600 mb-1">{t('locationLabel')}</label>
          <input
            type="text"
            name="location"
            id="location"
            value={profile.location}
            onChange={handleChange}
            placeholder={t('locationPlaceholder')}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
            required
            aria-required="true"
          />
        </div>
      </div>
      <div>
        <label htmlFor="skills" className="block text-sm font-medium text-slate-600 mb-1">{t('skillsLabel')}</label>
        <textarea
          name="skills"
          id="skills"
          rows={3}
          value={profile.skills}
          onChange={handleChange}
          placeholder={t('skillsPlaceholder')}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
          required
          aria-required="true"
        />
      </div>
      <div>
        <label htmlFor="interests" className="block text-sm font-medium text-slate-600 mb-1">{t('interestsLabel')}</label>
        <textarea
          name="interests"
          id="interests"
          rows={3}
          value={profile.interests}
          onChange={handleChange}
          placeholder={t('interestsPlaceholder')}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
          required
          aria-required="true"
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center"
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
      </div>
    </form>
  );
};