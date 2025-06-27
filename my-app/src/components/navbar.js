import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import { TranslatedText } from '../pages/translate';

const styles = {
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
    verticalAlign: 'middle',
  },
  linkText: {
    verticalAlign: 'middle',
  },
};

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
                    style={styles.icon}
                    alt=""
                  />
                  <span style={styles.linkText}>{item.label}</span>
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
