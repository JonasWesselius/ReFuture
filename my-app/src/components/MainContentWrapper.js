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
      </Routes>
      <Navbar />
    </>
  );
}

export default MainContentWrapper; 