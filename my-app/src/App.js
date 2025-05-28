// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/home";
import CV from "./pages/cv";
import CreateCV from "./pages/createCV";
import Jobs from "./pages/jobs";
import Guide from "./pages/guide";
import Tests from "./pages/tests";
import Navbar from "./components/navbar";


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cv" element={<CV />} />
      <Route path="/create-cv" element={<CreateCV />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/guide" element={<Guide />} />
      <Route path="/tests" element={<Tests />} />
    </Routes>
    <Navbar />
</Router>
  );
}

export default App;
