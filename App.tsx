import React, { useState, useCallback } from 'react';
import { PersonalProfile, UserProfile, Internship } from './types';
import { internships as allInternships } from './data/internships';
import { getInternshipRecommendations } from './services/geminiService';
import { LanguageSelector } from './components/LanguageSelector';
import { ProfileForm } from './components/ProfileForm';
import { InternshipForm } from './components/InternshipForm';
import { InternshipCard } from './components/InternshipCard';
import { Header } from './components/Header';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useLocalization } from './context/LocalizationContext';

type AppStep = 'language' | 'personal_profile' | 'internship_profile' | 'results';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('language');
  const [personalProfile, setPersonalProfile] = useState<PersonalProfile | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    education: '12th Pass',
    location: 'Rural Rajasthan',
    skills: 'Basic computer skills, good communication',
    interests: 'Working with communities, teaching'
  });
  const [recommendedInternships, setRecommendedInternships] = useState<Internship[]>([]);
  const [otherInternships, setOtherInternships] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLocalization();

  const handleLanguageSelected = () => {
    setStep('personal_profile');
  };
  
  const handlePersonalProfileSubmit = (profile: PersonalProfile) => {
    setPersonalProfile(profile);
    setStep('internship_profile');
  };

  const handleInternshipProfileSubmit = useCallback(async (profile: UserProfile) => {
    setUserProfile(profile);
    setIsLoading(true);
    setError(null);
    setStep('results');
    try {
      const recommendedIds = await getInternshipRecommendations(profile, allInternships);
      if (recommendedIds.length > 0) {
        const recommended = recommendedIds.map(id => allInternships.find(i => i.id === id)).filter((i): i is Internship => i !== undefined);
        const others = allInternships.filter(i => !recommendedIds.includes(i.id));
        setRecommendedInternships(recommended);
        setOtherInternships(others);
      } else {
         // Fallback if API returns no IDs
        setRecommendedInternships([]);
        setOtherInternships(allInternships);
        setError(t('recommendationError'));
      }
    } catch (e) {
      console.error(e);
      setError(t('recommendationError'));
      // Fallback: show all internships if API fails
      setRecommendedInternships([]);
      setOtherInternships(allInternships);
    } finally {
      setIsLoading(false);
    }
  }, [t]);
  
  const resetApp = () => {
    setStep('internship_profile');
    setRecommendedInternships([]);
    setOtherInternships([]);
    setError(null);
  };

  const renderContent = () => {
    switch (step) {
      case 'language':
        return <LanguageSelector onSelectLanguage={handleLanguageSelected} />;
      case 'personal_profile':
        return (
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">{t('personalProfileTitle')}</h2>
            <p className="text-center text-slate-500 mb-8">{t('personalProfileSubtitle')}</p>
            <ProfileForm onSubmit={handlePersonalProfileSubmit} />
          </div>
        );
      case 'internship_profile':
        return (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">{t('internshipProfileTitle')}</h2>
            <p className="text-center text-slate-500 mb-8">{t('internshipProfileSubtitle')}</p>
            <InternshipForm initialProfile={userProfile} onSubmit={handleInternshipProfileSubmit} isLoading={isLoading} />
          </div>
        );
      case 'results':
        if (isLoading) {
          return <LoadingSpinner />;
        }
        return (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800">{t('internshipMatchesTitle')}</h2>
              <button
                onClick={resetApp}
                className="bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 transition"
              >
                {t('editProfileButton')}
              </button>
            </div>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">{error}</div>}
            
            {recommendedInternships.length > 0 && (
              <>
                <h3 className="text-2xl font-semibold text-slate-700 mb-6 border-b-2 border-indigo-500 pb-2">{t('recommendedSectionTitle')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {recommendedInternships.map(internship => <InternshipCard key={internship.id} internship={internship} isRecommended={true} />)}
                </div>
              </>
            )}

            {otherInternships.length > 0 && (
              <>
                <h3 className="text-2xl font-semibold text-slate-700 mb-6 border-b border-slate-300 pb-2">{t('otherSectionTitle')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherInternships.map(internship => <InternshipCard key={internship.id} internship={internship} />)}
                </div>
              </>
            )}
          </div>
        );
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {step !== 'language' && <Header />}
      <main className="container mx-auto px-4 py-8 sm:py-12">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
