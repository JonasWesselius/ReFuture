import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ProfilePage.css';

function ProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    if (!token) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      setProfile(data);
    } catch (err) {
      setError(err.message);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch profile on mount and when URL changes
  useEffect(() => {
    fetchProfile();
  }, [location.pathname]); 

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <div className="profile-page">Loading...</div>;
  }

  if (error) {
    return <div className="profile-page">Error: {error}</div>;
  }

  if (!profile) {
    return <div className="profile-page">No profile data available</div>;
  }

  return (
    <div className="profile-page">
      <header className="profile-header">
        <button onClick={handleGoBack} className="back-button">←</button>
        <span className="profile-title">Profile</span>
        <button className="settings-button">⚙️</button>
      </header>

      <div className="profile-content">
        {/* Profile Info */}
        <div className="profile-info-box">
          <div className="profile-icon-placeholder"></div>
          <h2>{profile.name}</h2>
          <p>Country of origin: {profile.countryOfOrigin || 'Not specified'}</p>
          <p>{profile.location ? `${profile.location.city}, ${profile.location.region}, ${profile.location.country}` : 'Location not specified'}</p>
          <p>{profile.connections} Connections</p>
          <button className="edit-button"><img src="/edit-icon.png" alt="Edit" style={{ width: '20px', height: '20px' }} /></button>
        </div>

        {/* Experience Section */}
        <div className="profile-section">
          <h3>Experience</h3>
          <button className="add-button"><img src="/add-icon.png" alt="Add" style={{ width: '20px', height: '20px' }} /></button>
          <button className="edit-button"><img src="/edit-icon.png" alt="Edit" style={{ width: '20px', height: '20px' }} /></button>
          {profile.experience && profile.experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <p>{exp.title}</p>
              <p>{exp.company}</p>
              <p>{new Date(exp.startDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}</p>
              <p>{exp.location}</p>
              <p>{exp.type}</p>
            </div>
          ))}
        </div>

        {/* Languages Section */}
        <div className="profile-section">
          <h3>Languages</h3>
          <button className="add-button"><img src="/add-icon.png" alt="Add" style={{ width: '20px', height: '20px' }} /></button>
          <button className="edit-button"><img src="/edit-icon.png" alt="Edit" style={{ width: '20px', height: '20px' }} /></button>
          {profile.languages && profile.languages.map((lang, index) => (
            <div key={index} className="language-item">
              <p>{lang.name} {lang.isLearning ? '(Learning)' : ''}</p>
              <p>Proficiency: {lang.proficiency}</p>
            </div>
          ))}
        </div>

        {/* Test Scores Section */}
        <div className="profile-section">
          <h3>Test Scores</h3>
          <button className="add-button"><img src="/add-icon.png" alt="Add" style={{ width: '20px', height: '20px' }} /></button>
          <button className="edit-button"><img src="/edit-icon.png" alt="Edit" style={{ width: '20px', height: '20px' }} /></button>
          {profile.testScores && profile.testScores.map((score, index) => (
            <div key={index} className="test-score-item">
              <p>{score.language}: {score.score}/{score.maxScore} ({'⭐'.repeat(score.stars)}{'☆'.repeat(5-score.stars)})</p>
              <p>Date: {new Date(score.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>

        {/* CVs Section */}
        <div className="profile-section">
          <h3>CVs</h3>
          <button className="add-button"><img src="/add-icon.png" alt="Add" style={{ width: '20px', height: '20px' }} /></button>
          <button className="edit-button"><img src="/edit-icon.png" alt="Edit" style={{ width: '20px', height: '20px' }} /></button>
          {profile.cvs && profile.cvs.map((cv, index) => (
            <div key={index} className="cv-item">
              <p>{cv.name}</p>
              <p>{cv.description}</p>
              <p>Last updated: {new Date(cv.updatedAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage; 