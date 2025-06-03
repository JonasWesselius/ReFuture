import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    alert('Logged in!');
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="signup-page">
      <h2>Your Information</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email address/Username"
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
        <button type="submit" className="create-account-btn" style={{marginBottom: '10px'}}>Log in</button>
      </form>
      <div style={{ textAlign: 'center', marginTop: '8px' }}>
        <span>Don't have an account? </span>
        <button type="button" onClick={goToSignup} style={{ color: '#5fd3a6', background: 'none', border: 'none', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline', fontSize: '1rem' }}>
          Create here
        </button>
      </div>
    </div>
  );
}

export default Login;
