import React from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import Home from "../pages/home";
import CV from "../pages/cv";
import CreateCV from "../pages/createCV";
import Jobs from "../pages/jobs";
import Guide from "../pages/guide";
import Tests from "../pages/tests";
import ProfilePage from "../pages/ProfilePage";
import Navbar from "./navbar";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Background from "./Background";
import LogoHeader from './LogoHeader';
import EnglishTests from "../pages/LangTests/englishTests";
import DutchTests from "../pages/LangTests/dutchTests";
import DutchListening from "../pages/LangTests/DutchListening";
import DutchReading from "../pages/LangTests/DutchReading";
import DutchWriting from "../pages/LangTests/DutchWriting";
import EnglishListening from "../pages/LangTests/EnglishListening";
import EnglishReading from "../pages/LangTests/EnglishReading";
import EnglishWriting from "../pages/LangTests/EnglishWriting";

function MainContentWrapper() {
  const location = useLocation();
  const hideHeaderAndNavbar = location.pathname === '/profile';

  return (
    <>
      <Background />
      {!hideHeaderAndNavbar && <LogoHeader />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/create-cv" element={<CreateCV />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* Language Test Routes */}
        <Route path="/english-tests" element={<EnglishTests />} />
        <Route path="/dutch-tests" element={<DutchTests />} />
        <Route path="/english-tests/listening" element={<EnglishListening />} />
        <Route path="/english-tests/reading" element={<EnglishReading />} />
        <Route path="/english-tests/writing" element={<EnglishWriting />} />
        <Route path="/dutch-tests/listening" element={<DutchListening />} />
        <Route path="/dutch-tests/reading" element={<DutchReading />} />
        <Route path="/dutch-tests/writing" element={<DutchWriting />} />
      </Routes>
      <Navbar />
    </>
  );
}

export default MainContentWrapper; 