import React, { useState, createContext, useContext, useEffect } from 'react';

const LanguageContext = createContext();

const languages = {
  en: 'English',
  nl: 'Nederlands',
  ar: 'العربية',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español'
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

    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
    
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
          padding: '10px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        {languages[language]}
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
                color: code === language ? '#007bff' : 'black',
                ':hover': {
                  backgroundColor: '#f0f0f0'
                }
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
