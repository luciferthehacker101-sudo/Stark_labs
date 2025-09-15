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
import { InternshipModal } from './components/InternshipModal';
import { useLocalization } from './context/LocalizationContext';

type AppStep = 'language' | 'personal_profile' | 'internship_profile' | 'results';
type FeedbackState = Record<number, string>;

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
  const [isBestMatchOnly, setIsBestMatchOnly] = useState(false);
  const [showAllOthers, setShowAllOthers] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState>({});
  const { t } = useLocalization();

  const handleLanguageSelected = () => {
    setStep('personal_profile');
  };
  
  const handlePersonalProfileSubmit = (profile: PersonalProfile) => {
    setPersonalProfile(profile);
    setStep('internship_profile');
  };

  const handleInternshipProfileSubmit = useCallback(async (profile: UserProfile, isBestMatch: boolean) => {
    setUserProfile(profile);
    setIsLoading(true);
    setError(null);
    setIsBestMatchOnly(isBestMatch);
    setStep('results');
    try {
      const recommendedIds = await getInternshipRecommendations(profile, allInternships);
      if (recommendedIds.length > 0) {
        const recommended = recommendedIds.map(id => allInternships.find(i => i.id === id)).filter((i): i is Internship => i !== undefined);
        const others = allInternships.filter(i => !recommendedIds.includes(i.id));
        setRecommendedInternships(recommended);
        setOtherInternships(others);
      } else {
        setRecommendedInternships([]);
        setOtherInternships(allInternships);
        setError(t('recommendationError'));
      }
    } catch (e) {
      console.error(e);
      setError(t('recommendationError'));
      setRecommendedInternships([]);
      setOtherInternships(allInternships);
    } finally {
      setIsLoading(false);
    }
  }, [t]);
  
  const handleFeedback = (internshipId: number, feedbackValue: string) => {
    setFeedback(prev => ({ ...prev, [internshipId]: feedbackValue }));
    alert(t('feedbackThanks'));
  };

  const resetApp = () => {
    setStep('internship_profile');
    setRecommendedInternships([]);
    setOtherInternships([]);
    setError(null);
    setFeedback({});
    setIsBestMatchOnly(false);
    setShowAllOthers(false);
  };
  
  const renderResults = () => {
    if (isLoading) return <LoadingSpinner />;

    const displayedRecommendations = isBestMatchOnly ? recommendedInternships.slice(0, 1) : recommendedInternships;

    return (
      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-green-dark">{t('internshipMatchesTitle')}</h2>
          <button
            onClick={resetApp}
            className="bg-khaki-medium text-green-dark font-semibold py-2 px-4 rounded-lg hover:bg-olive-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive-light transition"
          >
            {t('editProfileButton')}
          </button>
        </div>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">{error}</div>}
        
        {displayedRecommendations.length > 0 && (
          <>
            <h3 className="text-2xl font-semibold text-green-dark mb-6 border-b-2 border-olive-medium pb-2">{t('recommendedSectionTitle')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {displayedRecommendations.map(internship => 
                <InternshipCard 
                  key={internship.id} 
                  internship={internship} 
                  isRecommended={true} 
                  onPreview={setSelectedInternship}
                  onFeedback={handleFeedback}
                  feedbackGiven={feedback[internship.id]}
                />)}
            </div>
          </>
        )}

        {!isBestMatchOnly && otherInternships.length > 0 && (
          <>
            <h3 className="text-2xl font-semibold text-green-dark mb-6 border-b border-khaki-medium pb-2">{t('otherSectionTitle')}</h3>
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${!showAllOthers && 'max-h-96 overflow-hidden'}`}>
              {otherInternships.slice(0, showAllOthers ? otherInternships.length : 3).map(internship => 
                <InternshipCard 
                  key={internship.id} 
                  internship={internship}
                  onPreview={setSelectedInternship}
                  onFeedback={handleFeedback}
                  feedbackGiven={feedback[internship.id]}
                />)}
            </div>
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllOthers(!showAllOthers)}
                className="bg-khaki-medium text-green-dark font-semibold py-2 px-6 rounded-full hover:bg-olive-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive-light transition"
              >
                {showAllOthers ? t('seeLess') : t('seeMore')}
              </button>
            </div>
          </>
        )}
      </div>
    );
  };


  const renderContent = () => {
    switch (step) {
      case 'language':
        return <LanguageSelector onSelectLanguage={handleLanguageSelected} />;
      case 'personal_profile':
        return (
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center text-green-dark mb-2">{t('personalProfileTitle')}</h2>
            <p className="text-center text-olive-medium mb-8">{t('personalProfileSubtitle')}</p>
            <ProfileForm onSubmit={handlePersonalProfileSubmit} />
          </div>
        );
      case 'internship_profile':
        return (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-green-dark mb-2">{t('internshipProfileTitle')}</h2>
            <p className="text-center text-olive-medium mb-8">{t('internshipProfileSubtitle')}</p>
            <InternshipForm initialProfile={userProfile} onSubmit={handleInternshipProfileSubmit} isLoading={isLoading} />
          </div>
        );
      case 'results':
        return renderResults();
    }
  };

  return (
    <div className="bg-khaki-light min-h-screen">
      {step !== 'language' && <Header />}
      <main className="container mx-auto px-4 py-8 sm:py-12">
        {renderContent()}
      </main>
      {selectedInternship && (
        <InternshipModal internship={selectedInternship} onClose={() => setSelectedInternship(null)} />
      )}
    </div>
  );
};

export default App;
