import React from 'react';
import { NavLink } from 'react-router-dom';
<<<<<<< Updated upstream
import './navbar.css';
=======
import { TranslatedText } from '../pages/translate';
>>>>>>> Stashed changes

const Navbar = () => {
  const navItems = [
    { id: 'home', label: <TranslatedText text="Home" />, path: '/', icon: '/homeicon.png', activeIcon: '/homeicon-blue.png' },
    { id: 'cv', label: <TranslatedText text="My CV" />, path: '/cv', icon: '/texticon.png', activeIcon: '/texticon-blue.png' },
    { id: 'jobs', label: <TranslatedText text="Jobs" />, path: '/jobs', icon: '/briefcaseicon.png', activeIcon: '/briefcaseicon-blue.png' },
    { id: 'guide', label: <TranslatedText text="Guide" />, path: '/guide', icon: '/flagicon.png', activeIcon: '/flagicon-blue.png' },
    { id: 'tests', label: <TranslatedText text="Tests" />, path: '/tests', icon: '/bookicon.png', activeIcon: '/bookicon-blue.png' },
  ];

  return (
    <nav className="navbar">
      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.id} className="nav-item">
            <NavLink
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {({ isActive }) => (
                <>
                  <img
                    src={isActive ? item.activeIcon : item.icon}
                    alt={`${item.label} icon`}
                    className="nav-icon"
                  />
                  <span className="nav-text">{item.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
