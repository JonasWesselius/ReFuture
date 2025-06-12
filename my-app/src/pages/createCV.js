import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generatePDF } from '../services/pdfService';
import './createCV.css';
// Import template preview images
import modernPreview from '../assets/cvs/modern1.png';
import creativePreview from '../assets/cvs/creative1.png';
import minimalisticPreview from '../assets/cvs/minimalistic1.png';
import traditionalPreview from '../assets/cvs/traditional1.png';

function CreateCV() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    workExperience: '',
    skills: '',
    languages: '',
    selectedTemplate: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const templates = [
    {
      id: 1,
      name: 'Modern Professional',
      preview: modernPreview,
      description: 'Clean and professional design with modern typography'
    },
    {
      id: 2,
      name: 'Creative',
      preview: creativePreview,
      description: 'Bold and creative layout with accent colors'
    },
    {
      id: 3,
      name: 'Minimalist',
      preview: minimalisticPreview,
      description: 'Simple and elegant design focusing on content'
    },
    {
      id: 4,
      name: 'Traditional',
      preview: traditionalPreview,
      description: 'Classic layout with traditional formatting'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTemplateSelect = (templateId) => {
    setFormData(prev => ({
      ...prev,
      selectedTemplate: templateId
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Generate PDF
      const pdfBlob = await generatePDF(formData, formData.selectedTemplate);
      
      // Create a URL for the PDF blob
      const pdfUrl = URL.createObjectURL(pdfBlob);
      

      // Create a new CV object with a more unique ID
      const newCV = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: `${formData.fullName}'s CV`,
        createdDate: new Date().toLocaleDateString(),
        pdfUrl,
        templateId: formData.selectedTemplate
      };
      navigate('/cv', { state: { newCV } });
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating your CV. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-cv-page">
      <div className="create-cv-header">
        <h1>Create New CV</h1>
      </div>

      <form onSubmit={handleSubmit} className="cv-form">
        <div className="form-section">
          <h2>Personal Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Professional Information</h2>
          <div className="form-group">
            <label htmlFor="education">Education</label>
            <textarea
              id="education"
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              required
              rows="4"
              placeholder="Enter your education history..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="workExperience">Work Experience</label>
            <textarea
              id="workExperience"
              name="workExperience"
              value={formData.workExperience}
              onChange={handleInputChange}
              required
              rows="4"
              placeholder="Enter your work experience..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="skills">Skills</label>
            <textarea
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              required
              rows="3"
              placeholder="Enter your skills..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="languages">Languages</label>
            <textarea
              id="languages"
              name="languages"
              value={formData.languages}
              onChange={handleInputChange}
              required
              rows="2"
              placeholder="Enter languages you speak..."
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Choose Template</h2>
          <div className="templates-grid">
            {templates.map(template => (
              <div
                key={template.id}
                className={`template-card ${formData.selectedTemplate === template.id ? 'selected' : ''}`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <img src={template.preview} alt={template.name} />
                <h3>{template.name}</h3>
                <p>{template.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/cv')} className="cancel-btn">
            Cancel
          </button>
          <button 
            type="submit" 
            className="create-btn" 
            disabled={!formData.selectedTemplate || isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create CV'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCV; 