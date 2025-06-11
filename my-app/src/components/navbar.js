import React, { useState } from 'react';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', href: '/index', icon: '/homeicon.png', activeIcon: '/homeicon-blue.png' },
    { id: 'cv', label: 'My CV', href: '/my-cv', icon: '/texticon.png', activeIcon: '/texticon-blue.png' },
    { id: 'jobs', label: 'Jobs', href: '/jobs', icon: '/briefcaseicon.png', activeIcon: '/briefcaseicon-blue.png' },
    { id: 'guide', label: 'Guide', href: '/guide', icon: '/flagicon.png', activeIcon: '/flagicon-blue.png' },
    { id: 'test', label: 'Test', href: '/test', icon: '/bookicon.png', activeIcon: '/bookicon-blue.png' },
  ];

  return (
    <nav style={styles.nav}>
      <ul style={styles.navLinks}>
        {navItems.map((item) => (
          <li key={item.id} style={styles.navItem}>
            <a
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                setActiveItem(item.id);
              }}
              style={{
                ...styles.linkWrapper,
                ...(activeItem === item.id ? styles.active : {}),
              }}
            >
              <img
                src={activeItem === item.id ? item.activeIcon : item.icon}
                alt={`${item.label} icon`}
                style={styles.icon}
              />
              <span style={styles.linkText}>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: '1rem',
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
