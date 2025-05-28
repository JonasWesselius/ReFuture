// src/components/navbar.js
import React from 'react';
import { NavLink } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/cv">My CV</NavLink></li>
        <li><NavLink to="/jobs">Jobs</NavLink></li>
        <li><NavLink to="/guide">Guide</NavLink></li>
        <li><NavLink to="/tests">Tests</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;
