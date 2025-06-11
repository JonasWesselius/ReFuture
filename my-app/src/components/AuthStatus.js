import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthStatus.css';
import './AuthButtons.css';
import { useAuth } from '../context/AuthContext';

function AuthStatus() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="auth-status-top-right auth-buttons">
      {user ? (
        <div className="logged-in-status">
          <span className="logged-in-text">Logged in</span>
          <button className="auth-logout-btn" onClick={handleLogout}>Log out</button>
        </div>
      ) : (
        <>
          <button className="login-btn" onClick={() => navigate('/login')}>LOG IN</button>
          <button className="signup-btn" onClick={() => navigate('/signup')}>SIGN UP</button>
        </>
      )}
    </div>
  );
}

export default AuthStatus; 