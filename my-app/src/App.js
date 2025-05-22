import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/home";
import CreateCV from "./pages/createCV";
import CV from "./pages/cv";
import Jobs from "./pages/jobs";
import Guide from "./pages/guide";
import Tests from "./pages/test";
import Navbar from "./components/Navbar";


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cv" element={<CV />} />
          <Route path="/createcv" element={<CreateCV />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/tests" element={<Tests />} />
        </Routes>
        <Navbar />
    </Router>
  );
}

export default App;
