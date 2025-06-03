import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './cv.css';

function CV() {
  const navigate = useNavigate();
  const location = useLocation();

  const [cvs, setCVs] = useState(() => {
    // Load CVs from localStorage on initial render
    const savedCVs = localStorage.getItem('cvs');
    return savedCVs ? JSON.parse(savedCVs) : [];
  });
  const [activeMenu, setActiveMenu] = useState(null);

  // Save CVs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cvs', JSON.stringify(cvs));
  }, [cvs]);

  useEffect(() => {
    // Check if we have a new CV from the create page
    if (location.state?.newCV) {

      setCVs(prev => {
        // Check if CV with this ID already exists
        const exists = prev.some(cv => cv.id === location.state.newCV.id);
        if (!exists) {
          return [...prev, location.state.newCV];
        }
        return prev;
      });
      // Clear the state to prevent adding the same CV multiple times
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeMenu && !event.target.closest('.cv-menu')) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeMenu]);

  const handleCreateCV = () => {
    navigate('/create-cv');
  };

  const handleViewCV = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };

  const handleDownloadCV = (pdfUrl) => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'cv.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteCV = (cvId) => {
    if (window.confirm('Are you sure you want to delete this CV?')) {
      setCVs(prev => prev.filter(cv => cv.id !== cvId));
      setActiveMenu(null);
    }
  };

  const toggleMenu = (cvId) => {
    setActiveMenu(activeMenu === cvId ? null : cvId);
  };

  // Sort CVs by date (newest first)
  const sortedCVs = [...cvs].sort((a, b) => {
    const dateA = new Date(a.createdDate);
    const dateB = new Date(b.createdDate);
    return dateA - dateB;  // Changed to put newest first
  }).reverse();  // Reverse to put newest at top

  const getTemplatePreview = (templateId) => {
    switch (templateId) {
      case 1:
        return '/templates/modern.png';
      case 2:
        return '/templates/creative.png';
      case 3:
        return '/templates/minimalist.png';
      case 4:
        return '/templates/traditional.png';
      default:
        return '/templates/modern.png';
    }
  };

  return (
    <div className="cv-page">
      <div className="cv-header">
        <h1>My CVs</h1>
        <button className="create-cv-btn" onClick={handleCreateCV}>
          +
          <span>Create</span>
        </button>
      </div>
      
      <div className="cv-grid">

        {sortedCVs.length === 0 ? (

          <div className="no-cvs">
            <p>You haven't created any CVs yet.</p>
            <p>Click the "Create New CV" button to get started!</p>
          </div>
        ) : (
          sortedCVs.map((cv, index) => (
            <div key={cv.id} className="cv-card">
              <div className="cv-menu">
                <button 
                  className="menu-button" 
                  onClick={() => toggleMenu(cv.id)}
                >
                  ⋮
                </button>
                <div className={`menu-dropdown ${activeMenu === cv.id ? 'show' : ''}`}>
                  <div className="menu-item" onClick={() => handleViewCV(cv.pdfUrl)}>
                    View
                  </div>
                  <div className="menu-item" onClick={() => handleDownloadCV(cv.pdfUrl)}>
                    Download
                  </div>
                  <div className="menu-item delete" onClick={() => handleDeleteCV(cv.id)}>
                    Delete
                  </div>
                </div>
              </div>
              <div className="cv-preview">
                <object
                  data={cv.pdfUrl}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                >
                  <div className="pdf-placeholder">
                    <p>Preview not available</p>
                    <button onClick={() => handleViewCV(cv.pdfUrl)}>View PDF</button>
                  </div>
                </object>
              </div>
              <div className="cv-info">
                <div className="cv-header-info">
                  <h3>{cv.title}</h3>
                  <span className="cv-number">#{sortedCVs.length - index}</span>
                </div>
                <p>Created: {cv.createdDate}</p>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CV;    