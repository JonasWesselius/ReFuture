// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LanguageProvider, TranslateWidget } from "./pages/translate";
import { TestScoreProvider } from "./context/TestScoreContext";
import MainContentWrapper from "./components/MainContentWrapper";

function App() {
  return (
    <LanguageProvider>
      <TestScoreProvider>
      <Router>
        <MainContentWrapper />
      </Router>
      <TranslateWidget />
      </TestScoreProvider>
    </LanguageProvider>
  );
}

export default App;
