// src/components/navbar.js
import React from 'react';
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { TranslatedText } from '../pages/translate';

function Navbar() {
  const navItems = [
    { to: "/", text: "Home" },
    { to: "/cv", text: "My CV" },
    { to: "/jobs", text: "Jobs" },
    { to: "/guide", text: "Guide" },
    { to: "/tests", text: "Tests" }
  ];

  return (
    <nav className="navbar">
      <ul className="nav-links">
        {navItems.map(item => (
          <li key={item.to}>
            <NavLink to={item.to}>
              <TranslatedText text={item.text} />
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
