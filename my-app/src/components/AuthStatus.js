import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthStatus.css';
import './AuthButtons.css';
import { useAuth } from '../context/AuthContext';
import { TranslateWidget } from '../pages/translate';

function AuthStatus({ modalOnly, showModal, setShowModal }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    setShowModal && setShowModal(false);
    logout();
    navigate('/login');
  };

  const toggleModal = () => {
    setShowModal && setShowModal((prev) => !prev);
  };

  const handleSignIn = () => {
    setShowModal && setShowModal(false);
    navigate('/login');
  };

  const handleSignUp = () => {
    setShowModal && setShowModal(false);
    navigate('/signup');
  };

  const handleViewProfile = () => {
    setShowModal && setShowModal(false);
    navigate('/profile');
  };

  // If used as modal content, only render the buttons
  if (modalOnly) {
    return (
      <>
        {user ? (
          <>
            <button className="login-btn" onClick={handleViewProfile}>View Profile</button>
            <button className="signup-btn" onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <>
            <button className="login-btn" onClick={handleSignIn}>Sign In</button>
            <button className="signup-btn" onClick={handleSignUp}>Sign Up</button>
          </>
        )}
      </>
    );
  }

  // Otherwise, render the user icon and TranslateWidget
  return (
    <div className="auth-status-top-right auth-buttons">
      <TranslateWidget />
      <div className="user-icon" onClick={toggleModal}>
        <img src={user ? '/user.png' : '/user-question.jpeg'} alt="User Icon" style={{ width: '40px', height: '40px' }} />
      </div>
    </div>
  );
}

export default AuthStatus; 