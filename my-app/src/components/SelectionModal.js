import React, { useState, useEffect } from 'react';
import './SelectionModal.css';

const SelectionModal = ({ isOpen, onClose, type, onSave, onRemove, existingItems = [] }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  // Predefined languages for easy selection
  const predefinedLanguages = [
    'English', 'Spanish', 'French', 'German', 'Italian',  
    'Dutch',  'Chinese', 'Japanese', 'Korean', 'Arabic', 
     'Turkish', 'Polish'
  ];

  // Initialize selectedItems when modal opens or existingItems change
  useEffect(() => {
    if (isOpen && existingItems) {
      console.log('Initializing modal with existingItems:', existingItems);
      setSelectedItems(existingItems);
    }
  }, [isOpen, existingItems]);

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

  const handleSelectPredefinedLanguage = (languageName) => {
    setLanguageDetails(prev => ({ ...prev, name: languageName }));
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
          <h2>
            {type.startsWith('edit') ? 'Edit ' : 'Add '}
            {type.includes('experience') ? 'Experience' :
             type.includes('languages') ? 'Languages' :
             type.includes('testScores') ? 'Test Scores' :
             type.includes('cvs') ? 'CVs' : ''}
          </h2>
          <button type="button" className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {!type.startsWith('edit') && type === 'experience' && (
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
                  className="modal-input modern-select"
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
              <button type="button" className="modern-add-button" onClick={handleAddItem}>
                <span className="add-icon">+</span>
                Add Experience
              </button>
            </div>
          )}

          {!type.startsWith('edit') && type === 'languages' && (
            <div className="language-form">
              <div className="predefined-languages">
                <label>Quick Select:</label>
                <div className="language-bubbles">
                  {predefinedLanguages.map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      className={`language-bubble ${languageDetails.name === lang ? 'selected' : ''}`}
                      onClick={() => handleSelectPredefinedLanguage(lang)}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="custom-language-section">
                <div className="modal-group">
                  <label htmlFor="languageName">Custom Language (or modify selection above)</label>
                  <input
                    type="text"
                    id="languageName"
                    className="modal-input"
                    value={languageDetails.name}
                    onChange={(e) => setLanguageDetails(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter custom language or use bubbles above"
                  />
                </div>
                <div className="modal-group">
                  <label htmlFor="languageProficiency">Proficiency Level</label>
                  <select
                    id="languageProficiency"
                    className="modal-input modern-select"
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
                <button type="button" className="modern-add-button" onClick={handleAddItem}>
                  <span className="add-icon">+</span>
                  Add Language
                </button>
              </div>
            </div>
          )}

          {!type.startsWith('edit') && type === 'testScores' && (
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
              <button type="button" className="modern-add-button" onClick={handleAddItem}>
                <span className="add-icon">+</span>
                Add Test Score
              </button>
            </div>
          )}

          {selectedItems.length > 0 && (
            <div className="selected-items">
              <h3>{type.startsWith('edit') ? 'Current Items' : 'Added Items'}</h3>
              {selectedItems.map((item, index) => {
                console.log(`Rendering item ${index}:`, item); 
                console.log('Type is:', type); 
                let displayItem = '';
                const typeLC = type.toLowerCase(); 
                if (typeLC.includes('experience')) {
                  displayItem = `${item.title || 'No title'} at ${item.company || 'No company'}`;
                  console.log('Set experience displayItem:', displayItem);
                } else if (typeLC.includes('languages')) {
                  console.log('INSIDE LANGUAGES CONDITION');
                  console.log('Language item details:', {
                    name: item.name,
                    proficiency: item.proficiency,
                    isLearning: item.isLearning,
                    fullItem: item
                  });
                  
                  // Simplified display logic
                  const name = item.name && item.name.trim() ? item.name.trim() : 'Unnamed Language';
                  const prof = item.proficiency && item.proficiency.trim() ? item.proficiency.trim() : 'Unknown';
                  displayItem = `${name} - ${prof}`;
                  
                  console.log('Final displayItem:', `"${displayItem}"`);
                } else if (typeLC.includes('testscores')) {
                  displayItem = `${item.language || 'Unknown'}: ${item.score || 0}/${item.maxScore || 100}`;
                  console.log('Set testScores displayItem:', displayItem);
                } else if (typeLC.includes('cvs')) {
                  displayItem = item.name || 'Unnamed CV';
                  console.log('Set cvs displayItem:', displayItem);
                } else {
                  console.log('NO TYPE MATCH - type is:', type);
                }
                
                console.log('Final displayItem before render:', `"${displayItem}"`);

                return (
                  <div key={index} className="selected-item">
                    <span 
                      title={`Item ${index}: ${JSON.stringify(item)}`}
                      style={{color: '#333', fontSize: '14px', display: 'block', minWidth: '100px'}}
                    >
                      {displayItem || `TEST ITEM ${index}`}
                    </span>
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => handleRemoveItem(index)}
                    >
                      <img src="/delete-icon.svg" alt="Remove Item" className="remove-icon-image" />
                    </button>
                  </div>
                );
              })}
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