import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css'; 

function ProfilePage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className="profile-page">
      <header className="profile-header">
        <button onClick={handleGoBack} className="back-button">←</button>
        <span className="profile-title">Profile</span>
        <button className="settings-button">⚙️</button>
      </header>

      <div className="profile-content">
        {/* Placeholder for Profile Info */}
        <div className="profile-info-box">
          <div className="profile-icon-placeholder"></div>
          <h2>John Doe</h2>
          <p>Country of origin: Egypt</p>
          <p>Eindhoven, North Brabant, Netherlands</p>
          <p>123 Connections</p>
          <button className="edit-button"><img src="/edit-icon.png" alt="Edit" style={{ width: '20px', height: '20px' }} /></button>
        </div>

        {/* Experience Section */}
        <div className="profile-section">
          <h3>Experience</h3>
          {/* Add/Edit buttons */}
          <button className="add-button"><img src="/add-icon.png" alt="Add" style={{ width: '20px', height: '20px' }} /></button>
          <button className="edit-button"><img src="/edit-icon.png" alt="Edit" style={{ width: '20px', height: '20px' }} /></button>
          {/* Example experience item */}
          <p>Steelfactory work</p>
          <p>Steelfactory Cairo</p>
          <p>Apr 2015 - Sep 2019</p>
          <p>Cairo, Egypt</p>
          <p>On-site</p>
        </div>

        {/* Languages Section */}
        <div className="profile-section">
          <h3>Languages</h3>
          {/* Add/Edit buttons */}
          <button className="add-button"><img src="/add-icon.png" alt="Add" style={{ width: '20px', height: '20px' }} /></button>
          <button className="edit-button"><img src="/edit-icon.png" alt="Edit" style={{ width: '20px', height: '20px' }} /></button>
          <p>Arabic</p>
          <p>English</p>
          <p>Dutch (Learning)</p>
        </div>

        {/* Test Scores Section */}
        <div className="profile-section">
          <h3>Test Scores</h3>
          {/* Add/Edit buttons */}
          <button className="add-button"><img src="/add-icon.png" alt="Add" style={{ width: '20px', height: '20px' }} /></button>
          <button className="edit-button"><img src="/edit-icon.png" alt="Edit" style={{ width: '20px', height: '20px' }} /></button>
          <p>English: 87/100 (⭐⭐⭐⭐⭐)</p>
          <p>Dutch (Learning): 32/100 (⭐⭐⭐☆☆)</p>
        </div>

        {/* CVs Section */}
        <div className="profile-section">
          <h3>CVs</h3>
          {/* Add/Edit buttons */}
          <button className="add-button"><img src="/add-icon.png" alt="Add" style={{ width: '20px', height: '20px' }} /></button>
          <button className="edit-button"><img src="/edit-icon.png" alt="Edit" style={{ width: '20px', height: '20px' }} /></button>
          {/* Example CV item */}
          <p>CV 04-25</p>
          <p>Made for new job applications</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage; 