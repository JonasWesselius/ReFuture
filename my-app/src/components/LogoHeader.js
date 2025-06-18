import React, { useState, useEffect } from 'react';
import './LogoHeader.css';
import AuthStatus from './AuthStatus';

function LogoHeader() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Static placeholder to prevent content overlap */}
      <div className="logo-header-placeholder"></div>
      {/* Fixed header that shows/hides on scroll */}
      <div className={`logo-header ${isVisible ? 'visible' : 'hidden'}`}>
        <span>Refuture</span>
        <AuthStatus showModal={showModal} setShowModal={setShowModal} />
      </div>
      {/* Modal rendered as sibling, not child, of header */}
      {showModal && (
        <div className="auth-modal">
          <div className="auth-modal-content">
            <button className="close-btn" onClick={() => setShowModal(false)}>X</button>
            {/* AuthStatus will handle which buttons to show based on auth */}
            <AuthStatus modalOnly setShowModal={setShowModal} />
          </div>
        </div>
      )}
    </>
  );
}

export default LogoHeader;