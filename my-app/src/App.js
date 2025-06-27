// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LanguageProvider, TranslateWidget } from "./pages/translate";
import { TestScoreProvider } from "./context/TestScoreContext";
import MainContentWrapper from "./components/MainContentWrapper";

function Home() {
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guide" element={<Guide />} />
      </Routes>
    </Router>
  );
}

export default App;
