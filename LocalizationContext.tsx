import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type Language = 'en' | 'hi' | 'ta' | 'te' | 'mr';

const translations: Record<Language, Record<string, string>> = {
  en: {
    vetanFullName: 'Vocational Education and Training Assistance Network',
    pmInternshipScheme: 'PM Internship Scheme for Rural Youth',
    // Language Selector
    // Profile Form
    fullNameLabel: 'Full Name',
    fullNamePlaceholder: 'e.g., Ramesh Kumar',
    dobLabel: 'Date of Birth',
    contactNumberLabel: 'Contact Number',
    contactNumberPlaceholder: 'e.g., 9876543210',
    addressLabel: 'Full Address',
    addressPlaceholder: 'Village, Post, District, State',
    genderLabel: 'Gender',
    genderSelectPlaceholder: 'Select your gender',
    genderMale: 'Male',
    genderFemale: 'Female',
    genderOther: 'Other',
    ageValidationError: 'You must be at least 21 years old to apply.',
    nextButton: 'Next',
    // Internship Form
    educationLabel: 'Highest Education',
    educationPlaceholder: 'e.g., 12th Pass, ITI, Diploma',
    locationLabel: 'Current Location',
    locationPlaceholder: 'e.g., Jaipur, Rajasthan',
    skillsLabel: 'Your Skills',
    skillsPlaceholder: 'e.g., Basic computer, Spoken English, Driving',
    interestsLabel: 'Your Interests',
    interestsPlaceholder: 'e.g., Farming, teaching children, healthcare',
    submitButton: 'Find Internships',
    submitButtonLoading: 'Finding...',
    // Results Page
    personalProfileTitle: 'Tell Us About Yourself',
    personalProfileSubtitle: 'This information helps us verify your eligibility.',
    internshipProfileTitle: 'What are you looking for?',
    internshipProfileSubtitle: 'This helps us find the best internship matches for you.',
    internshipMatchesTitle: 'Your Internship Matches',
    editProfileButton: 'Edit Profile',
    recommendedSectionTitle: 'Top Recommendations For You',
    otherSectionTitle: 'Other Available Internships',
    recommendationError: 'Could not fetch recommendations at this time. Showing all available internships.',
    // Loading Spinner
    loadingTitle: 'Finding the best matches...',
    loadingSubtitle: 'Our AI is analyzing your profile to find internships just for you. Please wait a moment.',
    // Internship Card
    recommendedTag: 'Recommended',
    skillsRequiredLabel: 'Skills Required',
  },
  hi: {
    vetanFullName: 'व्यावसायिक शिक्षा और प्रशिक्षण सहायता नेटवर्क',
    pmInternshipScheme: 'ग्रामीण युवाओं के लिए पीएम इंटर्नशिप योजना',
    // Language Selector
    // Profile Form
    fullNameLabel: 'पूरा नाम',
    fullNamePlaceholder: 'उदा., रमेश कुमार',
    dobLabel: 'जन्म तिथि',
    contactNumberLabel: 'संपर्क नंबर',
    contactNumberPlaceholder: 'उदा., 9876543210',
    addressLabel: 'पूरा पता',
    addressPlaceholder: 'गाँव, पोस्ट, जिला, राज्य',
    genderLabel: 'लिंग',
    genderSelectPlaceholder: 'अपना लिंग चुनें',
    genderMale: 'पुरुष',
    genderFemale: 'महिला',
    genderOther: 'अन्य',
    ageValidationError: 'आवेदन करने के लिए आपकी आयु कम से कम 21 वर्ष होनी चाहिए।',
    nextButton: 'अगला',
    // Internship Form
    educationLabel: 'उच्चतम शिक्षा',
    educationPlaceholder: 'उदा., 12वीं पास, आईटीआई, डिप्लोमा',
    locationLabel: 'वर्तमान स्थान',
    locationPlaceholder: 'उदा., जयपुर, राजस्थान',
    skillsLabel: 'आपके कौशल',
    skillsPlaceholder: 'उदा., बेसिक कंप्यूटर, स्पोकन इंग्लिश, ड्राइविंग',
    interestsLabel: 'आपकी रुचियां',
    interestsPlaceholder: 'उदा., खेती, बच्चों को पढ़ाना, स्वास्थ्य सेवा',
    submitButton: 'इंटर्नशिप खोजें',
    submitButtonLoading: 'खोज रहे हैं...',
    // Results Page
    personalProfileTitle: 'हमें अपने बारे में बताएं',
    personalProfileSubtitle: 'यह जानकारी हमें आपकी पात्रता सत्यापित करने में मदद करती है।',
    internshipProfileTitle: 'आप क्या ढूंढ रहे हैं?',
    internshipProfileSubtitle: 'यह हमें आपके लिए सर्वश्रेष्ठ इंटर्नशिप मैच खोजने में मदद करता है।',
    internshipMatchesTitle: 'आपके इंटर्नशिप मैच',
    editProfileButton: 'प्रोफ़ाइल संपादित करें',
    recommendedSectionTitle: 'आपके लिए शीर्ष सिफारिशें',
    otherSectionTitle: 'अन्य उपलब्ध इंटर्नशिप',
    recommendationError: 'इस समय सिफारिशें प्राप्त नहीं हो सकीं। सभी उपलब्ध इंटर्नशिप दिखा रहे हैं।',
    // Loading Spinner
    loadingTitle: 'सर्वश्रेष्ठ मैच खोज रहे हैं...',
    loadingSubtitle: 'हमारा AI सिर्फ आपके लिए इंटर्नशिप खोजने के लिए आपकी प्रोफ़ाइल का विश्लेषण कर रहा है। कृपया प्रतीक्षा करें।',
    // Internship Card
    recommendedTag: 'अनुशंसित',
    skillsRequiredLabel: 'आवश्यक कौशल',
  },
  // NOTE: Other languages are not fully translated and will fallback to English keys.
  ta: { ...translations.en, pmInternshipScheme: 'Grand Youth PM Internship Program (Tamil)' },
  te: { ...translations.en, pmInternshipScheme: 'Grand Youth PM Internship Program (Telugu)' },
  mr: { ...translations.en, pmInternshipScheme: 'Grand Youth PM Internship Program (Marathi)' },
};


interface LocalizationContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = useCallback((key: string): string => {
    return translations[language][key] || key;
  }, [language]);

  const value = { language, setLanguage: (lang: string) => setLanguage(lang as Language), t };

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = (): LocalizationContextType => {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};
