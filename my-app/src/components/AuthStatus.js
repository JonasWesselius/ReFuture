import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthStatus.css';
import './AuthButtons.css';
import { useAuth } from '../context/AuthContext';

function AuthStatus() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(false);
    logout();
    navigate('/login');
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSignIn = () => {
    setShowModal(false);
    navigate('/login');
  };

  const handleSignUp = () => {
    setShowModal(false);
    navigate('/signup');
  };

  const handleViewProfile = () => {
    setShowModal(false);
    navigate('/profile');
  };

  return (
    <div className="auth-status-top-right auth-buttons">
      <div className="user-icon" onClick={toggleModal}>
        <img src={user ? '/user.png' : '/user-question.jpeg'} alt="User Icon" style={{ width: '40px', height: '40px' }} />
      </div>
      {showModal && (
        <div className="auth-modal">
          <div className="auth-modal-content">
            <button className="close-btn" onClick={toggleModal}>X</button>
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
          </div>
        </div>
      )}
    </div>
  );
}

export default AuthStatus; 