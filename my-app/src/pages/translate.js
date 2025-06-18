import React, { useState, createContext, useContext, useEffect } from 'react';
import translationIcon from '../assets/translation.svg';

const LanguageContext = createContext();

const languages = {
  en: 'English',
  nl: 'Nederlands',
  ar: 'العربية',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español',
  fa: 'فارسی'
};

const manualTranslations = {
  nl: {
    "You haven't created any CVs yet." : "Je hebt nog geen CV aangemaakt.",
    "Don't have an account? " : "Heeft u nog geen account? ",
    "Create here" : "Hier aanmaken",
    "Full Name" : "Voor- en achternaam",
    "Available Jobs" : "Beschikbare banen",
    "Tests" : "Toetsen",
    "Welcome to the Tests page." : "Welkom op de pagina Toetsen.",
    "Condition": "Voorwaarde",
    "Job Type": "Type baan",
    "Location": "Locatie",
    "Status": "Status",
    "Saved": "Opgeslagen",
    "Applied": "Sollicitaties",
    "All": "Alle",
    "Full-time": "Voltijd",
    "Part-time": "Deeltijd",
    "New": "Nieuw",
    "Not Interested": "Niet geïnteresseerd",
    "Show more": "Meer weergeven",
    "Job Description": "Functieomschrijving",
    "Requirements": "Vereisten",
    "Benefits": "Voordelen",
    "How to Apply": "Hoe te solliciteren",
    "Apply Now": "Nu solliciteren",
    "Unsave": "Verwijderen",
    "Save": "Opslaan",
    "Remove Application": "Sollicitatie intrekken",
    "Mark as Interested": "Interesse tonen",
    "No previous experience required": "Geen ervaring vereist",
    "Basic English language skills": "Basis Engels",
    "Willingness to learn": "Bereid om te leren",
    "Reliable and punctual": "Betrouwbaar en punctueel",
    "To apply for this position, click the button below. We'll guide you through the application process.": "Klik op de knop hieronder om te solliciteren. We begeleiden je door het sollicitatieproces.",
    "Language Tests": "Taaltoetsen",
    "Overall Average Score": "Gemiddelde Score",
    "Previous score:": "Vorige score:",
    "Best score:": "Beste score:",
    "English Tests": "Engelse Toetsen",
    "Dutch Tests": "Nederlandse Toetsen",
    "Start Test": "Start Toets",
    "Previous Average:": "Vorig Gemiddelde:",
    "Best Average:": "Beste Gemiddelde:",
    "Next Question": "Volgende Vraag",
    "Previous Question": "Vorige Vraag",
    "Submit Test": "Toets Inleveren",
    "Correct": "Correct",
    "Incorrect": "Incorrect",
    "Your Score": "Jouw Score",
    "Review Answers": "Antwoorden Bekijken",
    "Try Again": "Opnieuw Proberen",
    "Back to Main Tests": "Terug naar Hoofdtoetsen",
    "Reading": "Lezen",
    "Writing": "Schrijven",
    "Listening": "Luisteren",
    "Start by writing your post..": "Begin met het schrijven van je bericht..",
    "Like": "Vind ik leuk",
    "Comment": "Reageer",
    "Repost": "Delen",
    "Share": "Delen",
    "Show translation": "Vertaling weergeven",
    "...more": "...meer",
    "2,321 Followers • 1w • Edited": "2.321 Volgers • 1w • Bewerkt",
    "523 Followers • 3w • Edited": "523 Volgers • 3w • Bewerkt",
    "4,741 Followers • 4w • Edited": "4.741 Volgers • 4w • Bewerkt",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.": "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  fr: {

  },
    ar: {

  },
    de: {
      "Create here" : "Erstellen Sie hier ein Konto",
      "Guide" : "Führung",
      "Tests" : "Testen",
      "Your career development platform." : "Ihre Karriere Entwicklungsplattform.",
      "You haven't created any CVs yet." : "Sie haben noch keinen Lebenslauf erstellt.",
      "Available Jobs" : "Offene Stellen",
  },
    es: {

  },
  fa: {
    
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en');

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);

export async function translateText(text, targetLang) {
  try {
    if (manualTranslations[targetLang]?.[text]) {
      return manualTranslations[targetLang][text];
    }

    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}&de=538452@student.fontys.nl`);
    
    const data = await response.json();

    if (data.responseStatus !== 200) {
        console.error('translateText: API returned non-200 status:', data.responseStatus, 'Details:', data.responseDetails);
        return text;
    }

    if (data.responseData && data.responseData.translatedText && data.responseData.translatedText !== 'PLEASE SELECT TWO DISTINCT LANGUAGES') {
      return data.responseData.translatedText;
    } else if (data.responseDetails && data.responseDetails !== 'PLEASE SELECT TWO DISTINCT LANGUAGES') {
      console.warn('translateText: API returned an error detail, but status was 200:', data.responseDetails);
      return data.responseDetails;
    } else {
      console.warn('translateText: API returned an irrelevant or error message (even with 200 status). Falling back to original text.', data);
      return text;
    }
  } catch (error) {
    console.error('translateText: Translation error caught:', error);
    return text;
  }
}

export function TranslatedText({ text }) {
  const { language } = useTranslation();
  const [translated, setTranslated] = useState(text);

  useEffect(() => {
    if (!text) return;
    
    const doTranslation = async () => {
      if (language !== 'en') {
        try {
          const result = await translateText(text, language);
          setTranslated(result);
        } catch (error) {
          console.error('Translation failed:', error);
          setTranslated(text);
        }
      } else {
        setTranslated(text);
      }
    };

    doTranslation();
  }, [text, language]);

  return translated || text;
}

export const TranslateWidget = () => {
  const { language, changeLanguage } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div style={{ 
      position: 'fixed', 
      top: '20px', 
      right: '80px', 
      zIndex: 1001 
    }}>
      <button 
        onClick={() => setShowDropdown(!showDropdown)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '70px',
          zIndex: 1001,
          cursor: 'pointer',
          background: 'none',
          border: 'none',
        }}
      >
        <img src={translationIcon} alt="language" style={{ width: '30px', height: '30px' }} />
      </button>
      {showDropdown && (
        <div style={{
          position: 'fixed',
          top: '70px',
          right: '20px',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '10px',
          zIndex: 1001
        }}>
          {Object.entries(languages).map(([code, name]) => (
            <div
              key={code}
              onClick={() => {
                changeLanguage(code);
                setShowDropdown(false);
              }}
              style={{
                padding: '5px 10px',
                cursor: 'pointer',
                backgroundColor: language === code ? '#f0f0f0' : 'transparent'
              }}
            >
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
