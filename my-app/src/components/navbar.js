
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const navItems = [
    { id: 'home', label: 'Home', path: '/', icon: '/homeicon.png', activeIcon: '/homeicon-blue.png' },
    { id: 'cv', label: 'My CV', path: '/cv', icon: '/texticon.png', activeIcon: '/texticon-blue.png' },
    { id: 'jobs', label: 'Jobs', path: '/jobs', icon: '/briefcaseicon.png', activeIcon: '/briefcaseicon-blue.png' },
    { id: 'guide', label: 'Guide', path: '/guide', icon: '/flagicon.png', activeIcon: '/flagicon-blue.png' },
    { id: 'tests', label: 'Tests', path: '/tests', icon: '/bookicon.png', activeIcon: '/bookicon-blue.png' },
  ];

  return (
    <nav style={styles.nav}>
      <ul style={styles.navLinks}>
        {navItems.map((item) => (
          <li key={item.id} style={styles.navItem}>
            <NavLink
              to={item.path}
              style={({ isActive }) => ({
                ...styles.linkWrapper,
                ...(isActive ? styles.active : {}),
              })}
            >
              {({ isActive }) => (
                <>
                  <img
                    src={isActive ? item.activeIcon : item.icon}
                    alt={`${item.label} icon`}
                    style={styles.icon}
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

const styles = {
  nav: {

    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: '1rem',
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  },
  navLinks: {
    display: 'flex',
    gap: '2rem',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  navItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  linkWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#000',
    transition: 'color 0.3s',
  },
  icon: {
    width: '24px',
    height: '24px',
    marginBottom: '0.3rem',
  },
  linkText: {
    fontSize: '0.9rem',
  },
  active: {
    color: '#007BFF',
    fontWeight: 'bold',
  }
};


export default Navbar;
