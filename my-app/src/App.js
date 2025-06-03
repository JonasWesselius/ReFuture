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
import Login from "./pages/login";
import Signup from "./pages/signup";
import Background from "./components/Background";
import LogoHeader from './components/LogoHeader';

function App() {
  return (
    <Router>
      <Background />
      <LogoHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/create-cv" element={<CreateCV />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Navbar />
    </Router>
  );
}

export default App;
