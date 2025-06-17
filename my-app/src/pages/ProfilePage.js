import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SelectionModal from '../components/SelectionModal';
import './ProfilePage.css';

function ProfilePage() {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: '',
    title: '',
    existingItems: []
  });

  // Memoize profile data arrays to prevent unnecessary re-renders of SelectionModal
  const memoizedLanguages = useMemo(() => profile?.languages || [], [profile]);
  const memoizedExperience = useMemo(() => profile?.experience || [], [profile]);
  const memoizedTestScores = useMemo(() => profile?.testScores || [], [profile]);
  const memoizedCvs = useMemo(() => profile?.cvs || [], [profile]);

  useEffect(() => {
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

        // Only update profile state if the data has actually changed
        if (JSON.stringify(profile) !== JSON.stringify(data)) {
          setProfile(data);
          console.log('Fetched profile data:', data);
          console.log('Languages in profile:', data.languages);
        }
      } catch (err) {
        setError(err.message);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const openModal = (type) => {
    console.log(`Attempting to open modal for type: ${type}`);
    let title = '';
    let existingItems = [];

    switch (type) {
      case 'languages':
        title = 'Add Languages';
        existingItems = [];
        break;
      case 'editLanguages':
        title = 'Edit Languages';
        existingItems = memoizedLanguages;
        break;
      case 'experience':
        title = 'Add Experience';
        existingItems = [];
        break;
      case 'editExperience':
        title = 'Edit Experience';
        existingItems = memoizedExperience;
        break;
      case 'testScores':
        title = 'Add Test Scores';
        existingItems = [];
        break;
      case 'editTestScores':
        title = 'Edit Test Scores';
        existingItems = memoizedTestScores;
        break;
      case 'cvs':
        title = 'Add CVs';
        existingItems = [];
        break;
      case 'editCVs':
        title = 'Edit CVs';
        existingItems = memoizedCvs;
        break;
      default:
        console.warn(`Unknown modal type: ${type}`);
        return;
    }

    setModalConfig({
      isOpen: true,
      type,
      title,
      existingItems
    });
    console.log('Modal config after update:', { isOpen: true, type, title, existingItems });
  };

  const handleModalSave = async (selectedItems) => {
    try {
      console.log('Selected items:', selectedItems);
      let updateData = {};

      switch (modalConfig.type) {
        case 'experience':
          // Only take the first selected item
          const selectedItem = selectedItems[0];
          if (!selectedItem) {
            throw new Error('No experience item selected');
          }

          // Create a properly formatted experience object
          const experienceItem = {
            title: selectedItem.title || '',
            company: selectedItem.company || '',
            startDate: selectedItem.startDate || new Date().toISOString(),
            endDate: selectedItem.endDate || null,
            location: selectedItem.location || '',
            type: selectedItem.type || 'Full-time',
            description: selectedItem.description || ''
          };

          // Send just the new experience item - backend will handle appending
          updateData = { experience: [experienceItem] };
          break;

        case 'editExperience':
          updateData = { experience: selectedItems };
          break;

        case 'languages':
          const formattedLanguages = selectedItems.map(lang => ({
            name: lang.name,
            proficiency: lang.proficiency || 'Intermediate',
            isLearning: lang.isLearning || false
          }));
          
          // Append to existing languages array
          const currentLanguages = profile.languages || [];
          updateData = { languages: [...currentLanguages, ...formattedLanguages] };
          break;

        case 'editLanguages':
          updateData = { languages: selectedItems };
          break;

        case 'testScores':
          const formattedTestScores = selectedItems.map(score => ({
            language: score.language || score.name,
            score: Number(score.score) || 0,
            maxScore: Number(score.maxScore) || 100,
            stars: Number(score.stars) || 0,
            date: score.date || new Date().toISOString()
          }));
          
          // Append to existing test scores array
          const currentTestScores = profile.testScores || [];
          updateData = { testScores: [...currentTestScores, ...formattedTestScores] };
          break;

        case 'editTestScores':
          updateData = { testScores: selectedItems };
          break;

        case 'cvs':
          updateData = { cvs: selectedItems }; 
          break;

        case 'editCVs':
          updateData = { cvs: selectedItems };
          break;

        default:
          throw new Error(`Invalid modal type: ${modalConfig.type}`);
      }

      console.log('Sending update data:', JSON.stringify(updateData, null, 2));

      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Error updating profile');
      }

      // Update local state with the new data
      setProfile(prev => ({
        ...prev,
        ...updateData
      }));

      setModalConfig(prev => ({ ...prev, isOpen: false }));
    } catch (error) {
      console.error('Profile update error:', error);
      console.error('Error details:', error.message);
      alert(error.message);
    }
  };

  const handleModalRemove = async (itemToRemove) => {
    console.log('Remove function called but not used - SelectionModal handles removal internally');
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
          <div className="section-header">
            <h3>Experience</h3>
            <div className="section-buttons">
              <button className="edit-button" onClick={() => openModal('editExperience')}>
                <img src="/edit-icon.png" alt="Edit" style={{ width: '20px', height: '20px' }} />
              </button>
              <button className="add-button" onClick={() => openModal('experience')}>
                <img src="/add-icon.png" alt="Add" style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
          </div>
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
          <div className="section-header">
            <h3>Languages</h3>
            <div className="section-buttons">
              <button className="edit-button" onClick={() => openModal('editLanguages')}>
                <img src="/edit-icon.png" alt="Edit" style={{ width: '20px', height: '20px' }} />
              </button>
              <button className="add-button" onClick={() => openModal('languages')}>
                <img src="/add-icon.png" alt="Add" style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
          </div>
          {profile.languages && profile.languages.map((lang, index) => (
            <div key={index} className="language-item">
              <p>{lang.name} {lang.isLearning ? '(Learning)' : ''}</p>
              <p>Proficiency: {lang.proficiency}</p>
            </div>
          ))}
        </div>

        {/* Test Scores Section */}
        <div className="profile-section">
          <div className="section-header">
            <h3>Test Scores</h3>
            <div className="section-buttons">
              <button className="edit-button" onClick={() => openModal('editTestScores')}>
                <img src="/edit-icon.png" alt="Edit" style={{ width: '20px', height: '20px' }} />
              </button>
              <button className="add-button" onClick={() => openModal('testScores')}>
                <img src="/add-icon.png" alt="Add" style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
          </div>
          {profile.testScores && profile.testScores.map((score, index) => (
            <div key={index} className="test-score-item">
              <p>{score.language}: {score.score}/{score.maxScore} ({'⭐'.repeat(score.stars)}{'☆'.repeat(5-score.stars)})</p>
              <p>Date: {new Date(score.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>

        {/* CVs Section */}
        <div className="profile-section">
          <div className="section-header">
            <h3>CVs</h3>
            <div className="section-buttons">
              <button className="edit-button" onClick={() => openModal('editCVs')}>
                <img src="/edit-icon.png" alt="Edit" style={{ width: '20px', height: '20px' }} />
              </button>
              <button className="add-button" onClick={() => openModal('cvs')}>
                <img src="/add-icon.png" alt="Add" style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
          </div>
          {profile.cvs && profile.cvs.map((cv, index) => (
            <div key={index} className="cv-item">
              <p>{cv.name}</p>
              <p>{cv.description}</p>
              <p>Last updated: {new Date(cv.updatedAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>

      {modalConfig.isOpen && (
        <SelectionModal
          isOpen={modalConfig.isOpen}
          title={modalConfig.title}
          type={modalConfig.type}
          existingItems={modalConfig.existingItems}
          onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
          onSave={handleModalSave}
          onRemove={handleModalRemove}
        />
      )}
    </div>
  );
}

export default ProfilePage; 