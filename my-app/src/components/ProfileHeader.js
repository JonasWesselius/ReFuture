import React from "react";
import "./ProfileHeader.css";
import settingsIcon from "../assets/settings.png";

const ProfileHeader = () => (
  <div className="profile-header">
    <div className="header-top">
      <div className="back-button">
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>John Doe</span>
      </div>
      <div className="settings-icon">
        <img src={settingsIcon} alt="Settings" />
      </div>
    </div>
    <div className="avatar">
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </div>
    <h2>John Doe</h2>
    <div className="origin">Country of origin: Egypt</div>
    <div className="location">Eindhoven, North Brabant, Netherlands</div>
    <div className="connections">123 Connections</div>
  </div>
);

export default ProfileHeader;
