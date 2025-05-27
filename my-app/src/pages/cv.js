import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './cv.css';

function CV() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cvs, setCVs] = useState([]);

  useEffect(() => {
    // Check if we have a new CV from the create page
    if (location.state?.newCV) {
      setCVs(prev => [...prev, location.state.newCV]);
      // Clear the state to prevent adding the same CV multiple times
      window.history.replaceState({}, document.title);
    }
  }, [location]);

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

  return (
    <div className="cv-page">
      <div className="cv-header">
        <h1>My CVs</h1>
        <button className="create-cv-btn" onClick={handleCreateCV}>
          Create New CV
        </button>
      </div>
      
      <div className="cv-grid">
        {cvs.length === 0 ? (
          <div className="no-cvs">
            <p>You haven't created any CVs yet.</p>
            <p>Click the "Create New CV" button to get started!</p>
          </div>
        ) : (
          cvs.map((cv) => (
            <div key={cv.id} className="cv-card">
              <div className="cv-preview">
                <iframe
                  src={cv.pdfUrl}
                  title={`Preview of ${cv.title}`}
                  width="100%"
                  height="100%"
                />
              </div>
              <div className="cv-info">
                <h3>{cv.title}</h3>
                <p>Created: {cv.createdDate}</p>
                <div className="cv-actions">
                  <button onClick={() => handleViewCV(cv.pdfUrl)}>View</button>
                  <button onClick={() => handleDownloadCV(cv.pdfUrl)}>Download</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CV;    