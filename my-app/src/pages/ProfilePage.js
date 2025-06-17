import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SelectionModal from '../components/SelectionModal';
import './ProfilePage.css';

// Profile Edit Modal Component
function ProfileEditModal({ profile, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    countryOfOrigin: profile?.countryOfOrigin || '',
    location: {
      city: profile?.location?.city || '',
      region: profile?.location?.region || '',
      country: profile?.location?.country || ''
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('location.')) {
      const locationField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="profile-edit-modal" onClick={onClose}>
      <div className="profile-edit-content" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Profile Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="countryOfOrigin">Country of Origin:</label>
            <input
              type="text"
              id="countryOfOrigin"
              name="countryOfOrigin"
              value={formData.countryOfOrigin}
              onChange={handleInputChange}
              placeholder="Not specified"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="location.city"
              value={formData.location.city}
              onChange={handleInputChange}
              placeholder="City"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="region">Region/State:</label>
            <input
              type="text"
              id="region"
              name="location.region"
              value={formData.location.region}
              onChange={handleInputChange}
              placeholder="Region or State"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              name="location.country"
              value={formData.location.country}
              onChange={handleInputChange}
              placeholder="Country"
            />
          </div>
          
          <div className="modal-buttons">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ProfilePage() {
  const navigate = useNavigate();
  const { token, user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [editDropdownOpen, setEditDropdownOpen] = useState(false);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: '',
    title: '',
    existingItems: []
  });

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editDropdownOpen && !event.target.closest('.edit-button-container')) {
        setEditDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editDropdownOpen]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleProfilePictureUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append('profilePicture', file);

      const response = await fetch('http://localhost:5000/api/auth/upload-profile-picture', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload image');
      }

      setProfile(prev => ({
        ...prev,
        profilePicture: data.profilePicture
      }));

      console.log('Profile picture uploaded successfully');
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      alert('Failed to upload profile picture: ' + error.message);
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSettingsClose = () => {
    setSettingsModalOpen(false);
  };

  const handleEditButtonClick = () => {
    setEditDropdownOpen(!editDropdownOpen);
  };

  const handleEditPicture = () => {
    setEditDropdownOpen(false);
    fileInputRef.current?.click();
  };

  const handleEditProfileInfo = () => {
    setEditDropdownOpen(false);
    setEditProfileModalOpen(true);
  };

  const handleProfileInfoSave = async (updatedInfo) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedInfo)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error updating profile');
      }

      setProfile(prev => ({
        ...prev,
        ...updatedInfo
      }));

      setEditProfileModalOpen(false);
    } catch (error) {
      console.error('Profile update error:', error);
      alert(error.message);
    }
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
          const selectedItem = selectedItems[0];
          if (!selectedItem) {
            throw new Error('No experience item selected');
          }

          const experienceItem = {
            title: selectedItem.title || '',
            company: selectedItem.company || '',
            startDate: selectedItem.startDate || new Date().toISOString(),
            endDate: selectedItem.endDate || null,
            location: selectedItem.location || '',
            type: selectedItem.type || 'Full-time',
            description: selectedItem.description || ''
          };

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
        <button className="settings-button" onClick={() => setSettingsModalOpen(true)}>⚙️</button>
      </header>

      <div className="profile-content">
        {/* Profile Info */}
        <div className="profile-info-box">
          <div 
            className="profile-icon-placeholder" 
            style={{
              backgroundImage: profile.profilePicture 
                ? `url(http://localhost:5000${profile.profilePicture})` 
                : 'url(/user.png)'
            }}
          >
            {uploadingImage && (
              <div className="upload-overlay">
                <div className="upload-spinner"></div>
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleProfilePictureUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <div className="edit-button-container">
            <button className="edit-button" onClick={handleEditButtonClick}>
              <img src="/edit-icon.png" alt="Edit" style={{ width: '20px', height: '20px' }} />
            </button>
            {editDropdownOpen && (
              <div className="edit-dropdown">
                <button onClick={handleEditPicture}>Edit Picture</button>
                <button onClick={handleEditProfileInfo}>Edit Profile Info</button>
              </div>
            )}
          </div>
          <h2>{profile.name}</h2>
          <p>Country of origin: {profile.countryOfOrigin || 'Not specified'}</p>
          <p>{profile.location ? `${profile.location.city}, ${profile.location.region}, ${profile.location.country}` : 'Location not specified'}</p>
          <p>{profile.connections} Connections</p>
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

      {settingsModalOpen && (
        <div className="settings-modal" onClick={handleSettingsClose}>
          <div className="settings-content" onClick={(e) => e.stopPropagation()}>
            <h2>Settings</h2>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleSettingsClose}>Close</button>
          </div>
        </div>
      )}

      {editProfileModalOpen && (
        <ProfileEditModal
          profile={profile}
          onSave={handleProfileInfoSave}
          onClose={() => setEditProfileModalOpen(false)}
        />
      )}
    </div>
  );
}

export default ProfilePage; 