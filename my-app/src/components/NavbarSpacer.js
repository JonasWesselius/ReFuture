import React from 'react';
import './navbar.css';

const NavbarSpacer = () => {
  const navItems = [
    { id: 'home', label: 'Home', icon: '/homeicon.png' },
    { id: 'cv', label: 'My CV', icon: '/texticon.png' },
    { id: 'jobs', label: 'Jobs', icon: '/briefcaseicon.png' },
    { id: 'guide', label: 'Guide', icon: '/flagicon.png' },
    { id: 'tests', label: 'Tests', icon: '/bookicon.png' },
  ];

  return (
    <nav className="navbar-spacer">
      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.id} className="nav-item">
            <div className="nav-link">
              <img
                src={item.icon}
                alt={`${item.label} icon`}
                className="nav-icon"
                style={{ opacity: 0.3 }}
              />
              <span className="nav-text" style={{ opacity: 0.3 }}>{item.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavbarSpacer; 