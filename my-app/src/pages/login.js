import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './signup.css'; 

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      login(data.token, data.user);
      
      // Force a full page reload when navigating to profile
      window.location.href = '/profile';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="signup-page">
      <h2>Log In</h2>
      {error && <div className="error-message">{error}</div>}
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <button type="submit" className="create-account-btn" style={{marginBottom: '10px'}} disabled={loading}>
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </form>
      <div style={{ textAlign: 'center', marginTop: '8px' }}>
        <span>Don't have an account? </span>
        <button type="button" onClick={goToSignup} style={{ color: '#5fd3a6', background: 'none', border: 'none', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline', fontSize: '1rem' }} disabled={loading}>
          Create here
        </button>
      </div>
    </div>
  );
}

export default Login;
