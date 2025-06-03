import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthButtons.css';

function AuthButtons() {
  const navigate = useNavigate();

  return (
    <div className="auth-buttons">
      <button className="login-btn" onClick={() => navigate('/login')}>LOG IN</button>
      <button className="signup-btn" onClick={() => navigate('/signup')}>SIGN UP</button>
    </div>
  );
}

export default AuthButtons;
