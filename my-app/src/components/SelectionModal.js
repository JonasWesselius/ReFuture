import React, { useState, useEffect } from 'react';
import './SelectionModal.css';

const SelectionModal = ({ isOpen, onClose, type, onSave, selectedItems: initialSelectedItems = [] }) => {
  const [selectedItems, setSelectedItems] = useState(initialSelectedItems);
  const [experienceDetails, setExperienceDetails] = useState({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    type: ''
  });
  const [languageDetails, setLanguageDetails] = useState({
    name: '',
    proficiency: ''
  });
  const [testScoreDetails, setTestScoreDetails] = useState({
    name: '',
    score: '',
    date: ''
  });

  useEffect(() => {
    setSelectedItems(initialSelectedItems);
  }, [initialSelectedItems]);

  const handleAddItem = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (type === 'experience') {
      if (experienceDetails.title && experienceDetails.company) {
        setSelectedItems([...selectedItems, { ...experienceDetails }]);
        setExperienceDetails({
          title: '',
          company: '',
          startDate: '',
          endDate: '',
          type: ''
        });
      } else {
        alert('Please fill in Job Title and Company Name for experience.');
      }
    } else if (type === 'languages') {
      if (languageDetails.name && languageDetails.proficiency) {
        setSelectedItems([...selectedItems, { ...languageDetails }]);
        setLanguageDetails({
          name: '',
          proficiency: ''
        });
      } else {
        alert('Please fill in Language and Proficiency for languages.');
      }
    } else if (type === 'testScores') {
      if (testScoreDetails.name && testScoreDetails.score) {
        setSelectedItems([...selectedItems, { ...testScoreDetails }]);
        setTestScoreDetails({
          name: '',
          score: '',
          date: '',
        });
      } else {
        alert('Please fill in Test Name and Score for test scores.');
      }
    }
  };

  const handleRemoveItem = (index) => {
    const newItems = [...selectedItems];
    newItems.splice(index, 1);
    setSelectedItems(newItems);
  };

  const handleSave = () => {
    onSave(selectedItems);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add {type === 'experience' ? 'Experience' : type === 'languages' ? 'Languages' : 'Test Scores'}</h2>
          <button type="button" className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {type === 'experience' && (
            <div className="experience-form">
              <div className="modal-group">
                <label htmlFor="jobTitle">Job Title</label>
                <input
                  type="text"
                  id="jobTitle"
                  className="modal-input"
                  value={experienceDetails.title}
                  onChange={(e) => setExperienceDetails(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter job title"
                />
              </div>
              <div className="modal-group">
                <label htmlFor="companyName">Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  className="modal-input"
                  value={experienceDetails.company}
                  onChange={(e) => setExperienceDetails(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Enter company name"
                />
              </div>
              <div className="form-row">
                <div className="modal-group half">
                  <label htmlFor="startDate">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    className="modal-input date-input"
                    value={experienceDetails.startDate}
                    onChange={(e) => setExperienceDetails(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                <div className="modal-group half">
                  <label htmlFor="endDate">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    className="modal-input date-input"
                    value={experienceDetails.endDate}
                    onChange={(e) => setExperienceDetails(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>
              <div className="modal-group">
                <label htmlFor="employmentType">Employment Type</label>
                <select
                  id="employmentType"
                  className="modal-input"
                  value={experienceDetails.type}
                  onChange={(e) => setExperienceDetails(prev => ({ ...prev, type: e.target.value }))}
                >
                  <option value="">Select type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <button type="button" className="add-item-button" onClick={handleAddItem}>Add Experience</button>
            </div>
          )}

          {type === 'languages' && (
            <div className="language-form">
              <div className="modal-group">
                <label htmlFor="languageName">Language</label>
                <input
                  type="text"
                  id="languageName"
                  className="modal-input"
                  value={languageDetails.name}
                  onChange={(e) => setLanguageDetails(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter language"
                />
              </div>
              <div className="modal-group">
                <label htmlFor="languageProficiency">Proficiency</label>
                <select
                  id="languageProficiency"
                  className="modal-input"
                  value={languageDetails.proficiency}
                  onChange={(e) => setLanguageDetails(prev => ({ ...prev, proficiency: e.target.value }))}
                >
                  <option value="">Select proficiency</option>
                  <option value="Native">Native</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Basic">Basic</option>
                </select>
              </div>
              <button type="button" className="add-item-button" onClick={handleAddItem}>Add Language</button>
            </div>
          )}

          {type === 'testScores' && (
            <div className="test-score-form">
              <div className="modal-group">
                <label htmlFor="testName">Test Name</label>
                <input
                  type="text"
                  id="testName"
                  className="modal-input"
                  value={testScoreDetails.name}
                  onChange={(e) => setTestScoreDetails(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter test name"
                />
              </div>
              <div className="modal-group">
                <label htmlFor="testScore">Score</label>
                <input
                  type="text"
                  id="testScore"
                  className="modal-input"
                  value={testScoreDetails.score}
                  onChange={(e) => setTestScoreDetails(prev => ({ ...prev, score: e.target.value }))}
                  placeholder="Enter score"
                />
              </div>
              <div className="modal-group">
                <label htmlFor="testDate">Date</label>
                <input
                  type="date"
                  id="testDate"
                  className="modal-input date-input"
                  value={testScoreDetails.date}
                  onChange={(e) => setTestScoreDetails(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <button type="button" className="add-item-button" onClick={handleAddItem}>Add Test Score</button>
            </div>
          )}

          {selectedItems.length > 0 && (
            <div className="selected-items">
              <h3>Added Items</h3>
              {selectedItems.map((item, index) => (
                <div key={index} className="selected-item">
                  <span>{item.name || item.title || item.score}</span>
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => handleRemoveItem(index)}
                  >
                    <img src={process.env.PUBLIC_URL + '/edit-icon.png'} alt="Remove Item" className="remove-icon-image" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
          <button type="button" className="save-button" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default SelectionModal; 