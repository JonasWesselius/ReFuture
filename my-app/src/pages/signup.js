import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // signup logic here
    alert('Account created!');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="signup-page">
      <h2>Your Information</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        <div className="terms-checkbox">
          <input
            type="checkbox"
            name="terms"
            id="terms"
            checked={form.terms}
            onChange={handleChange}
            required
          />
          <label htmlFor="terms">
          By checking this box, you agree to our <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>. Please read them carefully before proceeding. Your use of this service constitutes acceptance of these terms.
          </label>
        </div>
        <button type="submit" className="create-account-btn">Create account</button>
      </form>
      <div style={{ textAlign: 'center', marginTop: '8px' }}>
        <span>Already have an account? </span>
        <button
          type="button"
          onClick={goToLogin}
          style={{
            color: '#5fd3a6',
            background: 'none',
            border: 'none',
            fontWeight: 700,
            cursor: 'pointer',
            textDecoration: 'underline',
            fontSize: '1rem'
          }}
        >
          Log in here
        </button>
      </div>
    </div>
  );
}

export default Signup;
