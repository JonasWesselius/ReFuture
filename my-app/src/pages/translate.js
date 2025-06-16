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
  const [showLanguages, setShowLanguages] = useState(false);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    setShowLanguages(false);
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
    
    if (!response.ok) throw new Error('Translation failed');
    
    const data = await response.json();
    console.log('Translation response:', data);
    return data.responseData.translatedText;
  } catch (error) {
    console.error('Translation error:', error);
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

function TranslateWidget() {
  const { language, changeLanguage } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div style={{ position: 'absolute', top: '20px', right: '275px', zIndex: 1000 }}>
      <button 
        onClick={() => setShowDropdown(!showDropdown)}
        style={{
          padding: 0,
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          width: '40px',
          height: '40px'
        }}
      >
        <img src={translationIcon} alt="language" width="100%" height="100%" />
      </button>
      
      {showDropdown && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '5px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginTop: '5px'
        }}>
          {Object.entries(languages).map(([code, name]) => (
            <button
              key={code}
              onClick={() => {
                changeLanguage(code);
                setShowDropdown(false);
              }}
              style={{
                display: 'block',
                width: '100%',
                padding: '8px 16px',
                border: 'none',
                background: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                color: code === language ? '#007bff' : 'black'
              }}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default TranslateWidget;
