// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LanguageProvider } from "./pages/translate";
import MainContentWrapper from "./components/MainContentWrapper";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <MainContentWrapper />
      </Router>
    </LanguageProvider>
  );
}

export default App;
