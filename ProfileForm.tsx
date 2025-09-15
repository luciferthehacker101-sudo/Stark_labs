
import React, { useState } from 'react';
import { PersonalProfile } from '../types';
import { useLocalization } from '../context/LocalizationContext';

interface ProfileFormProps {
  onSubmit: (profile: PersonalProfile) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit }) => {
  const [profile, setProfile] = useState<PersonalProfile>({
    fullName: '',
    dob: '',
    contactNumber: '',
    address: '',
    gender: '',
  });
  const [ageError, setAgeError] = useState<string | null>(null);
  const { t } = useLocalization();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const birthDate = new Date(profile.dob);
    if (isNaN(birthDate.getTime())) {
      setAgeError("Please enter a valid date of birth."); // Should be translated in a real app
      return;
    }
    
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 21) {
        setAgeError(t('ageValidationError'));
        return;
    }
    
    setAgeError(null);
    onSubmit(profile);
  };

  const renderInputIcon = (type: string) => {
    const iconClass = "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400";
    switch(type) {
      case 'name': return <div className={iconClass}><span className="font-mono text-sm border border-slate-400 px-1 rounded-sm">AB</span></div>;
      case 'dob': return <div className={iconClass}><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg></div>;
      case 'phone': return <div className={iconClass}><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg></div>;
      case 'address': return <div className="absolute top-3 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg></div>;
      case 'gender': return <div className={iconClass}><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg></div>;
      default: return null;
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative">
        <label htmlFor="fullName" className="block text-sm font-medium text-slate-600 mb-1">{t('fullNameLabel')}</label>
        {renderInputIcon('name')}
        <input
          type="text"
          name="fullName"
          id="fullName"
          value={profile.fullName}
          onChange={handleChange}
          placeholder={t('fullNamePlaceholder')}
          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
          required
          aria-required="true"
        />
      </div>

      <div className="relative">
        <label htmlFor="dob" className="block text-sm font-medium text-slate-600 mb-1">{t('dobLabel')}</label>
        {renderInputIcon('dob')}
        <input
          type="date"
          name="dob"
          id="dob"
          value={profile.dob}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
          required
          aria-required="true"
        />
      </div>
      
      <div className="relative">
        <label htmlFor="contactNumber" className="block text-sm font-medium text-slate-600 mb-1">{t('contactNumberLabel')}</label>
        {renderInputIcon('phone')}
        <input
          type="tel"
          name="contactNumber"
          id="contactNumber"
          value={profile.contactNumber}
          onChange={handleChange}
          placeholder={t('contactNumberPlaceholder')}
          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
          required
          aria-required="true"
        />
      </div>

      <div className="relative">
        <label htmlFor="address" className="block text-sm font-medium text-slate-600 mb-1">{t('addressLabel')}</label>
        {renderInputIcon('address')}
        <textarea
          name="address"
          id="address"
          rows={3}
          value={profile.address}
          onChange={handleChange}
          placeholder={t('addressPlaceholder')}
          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
          required
          aria-required="true"
        />
      </div>
      
      <div className="relative">
          <label htmlFor="gender" className="block text-sm font-medium text-slate-600 mb-1">{t('genderLabel')}</label>
          {renderInputIcon('gender')}
          <select
            name="gender"
            id="gender"
            value={profile.gender}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition appearance-none"
            required
            aria-required="true"
          >
            <option value="" disabled>{t('genderSelectPlaceholder')}</option>
            <option value="male">{t('genderMale')}</option>
            <option value="female">{t('genderFemale')}</option>
            <option value="other">{t('genderOther')}</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
      </div>

      {ageError && (
        <div className="text-sm text-red-600 text-center" role="alert">
          {ageError}
        </div>
      )}

      <div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
        >
          {t('nextButton')}
        </button>
      </div>
    </form>
  );
};