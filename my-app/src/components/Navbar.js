import React from 'react';
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className="nav-link"><span>Home</span></NavLink>
      <NavLink to="/cv" className="nav-link"><span>My CV</span></NavLink>
      <NavLink to="/jobs" className="nav-link"><span>Jobs</span></NavLink>
      <NavLink to="/guide" className="nav-link"><span>Guide</span></NavLink>
      <NavLink to="/test" className="nav-link"><span>Tests</span></NavLink>
    </nav>
  );
}

export default Navbar;
