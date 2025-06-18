import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TranslatedText, TranslateWidget } from './translate';
import './signup.css';
import { useAuth } from '../context/AuthContext';

function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from AuthContext

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError(''); // Clear error when user types
  };

  const validateForm = () => {
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (!form.terms) {
      setError('You must accept the terms and conditions');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Use the login function from context instead of localStorage
      login(data.token, data.user);

      // Redirect to home page or dashboard
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="signup-page">
      <TranslateWidget />
      <h2><TranslatedText text="Your Information" /></h2>
      {error && <div className="error-message">{error}</div>}
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          type="email"
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <div className="terms-checkbox">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={form.terms}
            onChange={handleChange}
            required
          />
          <label htmlFor="terms">
            By checking this box, you agree to our <span onClick={() => alert('Navigate to Terms and Conditions')} style={{ color: '#5fd3a6', cursor: 'pointer', textDecoration: 'underline' }}>Terms and Conditions</span> and <span onClick={() => alert('Navigate to Privacy Policy')} style={{ color: '#5fd3a6', cursor: 'pointer', textDecoration: 'underline' }}>Privacy Policy</span>. Please read them carefully before proceeding. Your use of this service constitutes acceptance of these terms.
          </label>
        </div>
        <button type="submit" className="create-account-btn" disabled={loading}>
          {loading ? 'Creating Account...' : 'Create account'}
        </button>
      </form>
      <div style={{ textAlign: 'center', marginTop: '8px' }}>
        <span>Already have an account? </span>
        <button 
          type="button" 
          onClick={goToLogin} 
          style={{ color: '#5fd3a6', background: 'none', border: 'none', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline', fontSize: '1rem' }} 
          disabled={loading}
        >
          <TranslatedText text="Log in here" />
        </button>
      </div>
    </div>
  );
}

export default Signup;
