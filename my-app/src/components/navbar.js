import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const navItems = [
    { id: 'home', label: 'Home', path: '/', icon: '/homeicon.png', activeIcon: '/homeicon-blue.png' },
    { id: 'cv', label: 'My CV', path: '/cv', icon: '/texticon.png', activeIcon: '/texticon-blue.png' },
    { id: 'jobs', label: 'Jobs', path: '/jobs', icon: '/briefcaseicon.png', activeIcon: '/briefcaseicon-blue.png' },
    { id: 'guide', label: 'Guide', path: '/guide', icon: '/flagicon.png', activeIcon: '/flagicon-blue.png' },
    { id: 'tests', label: 'Tests', path: '/tests', icon: '/bookicon.png', activeIcon: '/bookicon-blue.png' },
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
