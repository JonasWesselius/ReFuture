import React from "react";
import "./ExperienceCard.css";

const ExperienceCard = () => (
  <div className="experience-card">
    <div className="card-icons">
      <span className="add-icon">➕</span>
      <span className="edit-icon">✏️</span>
    </div>
    <div className="card-title">Experience</div>
    <div className="job-title">Steelfactory work</div>
    <div className="company">Steelfactory Cairo</div>
    <div className="dates">Apr 2015 - Sep 2019</div>
    <div className="location">Cairo, Egypt</div>
    <div className="work-type">On-site</div>
  </div>
);

export default ExperienceCard;