import React from 'react';
import AuthButtons from '../components/AuthButtons';
import './home.css';

function Home() {
  return (
    <div className="home-page">
      <h1>Welcome to ReFuture</h1>
      <p>Your career development platform.</p>
      <AuthButtons />
    </div>
  );
}

export default Home;