import React, { useState } from 'react';
import { TranslatedText } from './translate';

const GuideCard = ({ title, status, description, description2, description3, description4, description5, description6, description7, description8, description9, previewText, condition, toggleStatus, index }) => {
  const [showModal, setShowModal] = useState(false);

  const getStatusColor = () => {
    if (status === 'Done') return '#4caf50';
    if (status === 'In Progress') return '#1e3a8a';
    return '#9e9e9e';
  };

  const StatusButton = ({ onClick }) => (
    <div
      onClick={onClick}
      style={{
        ...styles.status,
        backgroundColor: getStatusColor(),
      }}
    >
      <TranslatedText text={status.toString()} />
    </div>
  );

  return (
    <>
      <div style={styles.card} onClick={() => setShowModal(true)}>
        <div style={styles.cardHeader}>
          <h3 style={styles.title}><TranslatedText text={title} /></h3>
          <StatusButton onClick={(e) => {
            e.stopPropagation();
            toggleStatus(index);
          }} />
        </div>
        <p style={styles.description}><TranslatedText text={previewText || description} /></p>
        {condition && <p style={styles.condition}>
          <TranslatedText text={`Condition: ${condition}`} />
        </p>}
        <p style={styles.more}><TranslatedText text="More" />...</p>
      </div>

      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}><TranslatedText text={title} /></h2>
              <StatusButton onClick={() => toggleStatus(index)} />
            </div>
            <p style={styles.modalDescription}><TranslatedText text={description} /></p>
            {description2 && (
              <p style={styles.modalDescription}><TranslatedText text={description2} /></p>
            )}
            {description3 && (
              <p style={styles.modalDescription}><TranslatedText text={description3} /></p>
            )}
            {description4 && (
              <p style={styles.modalDescription}><TranslatedText text={description4} /></p>
            )}
            {description5 && (
              <p style={styles.modalDescription}><TranslatedText text={description5} /></p>
            )}
            {description6 && (
              <p style={styles.modalDescription}><TranslatedText text={description6} /></p>
            )}
            {description7 && (
              <p style={styles.modalDescription}><TranslatedText text={description7} /></p>
            )}
            {description8 && (
              <p style={styles.modalDescription}><TranslatedText text={description8} /></p>
            )}
            {description9 && (
              <p style={styles.modalDescription}><TranslatedText text={description9} /></p>
            )}
            {condition && <p><strong>
              <TranslatedText text={`Condition: ${condition}`} />
            </strong></p>}
            <button style={styles.closeButton} onClick={() => setShowModal(false)}>
              <TranslatedText text="Close" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: '1rem',
    marginBottom: '1rem',
    cursor: 'pointer',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    margin: 0,
    fontSize: '1.1rem',
    fontWeight: 'bold',
  },
  status: {
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  description: {
    margin: '0.5rem 0 0.25rem',
    fontSize: '0.9rem',
    whiteSpace: 'pre-line',
  },
  condition: {
    fontSize: '0.8rem',
    fontStyle: 'italic',
    color: '#555',
  },
  more: {
    color: '#1e3a8a',
    fontSize: '0.85rem',
    fontWeight: 'bold',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    zIndex: 1000,
    overflowY: 'auto',
    paddingTop: '5rem',
    paddingBottom: '5rem',
  },
  modal: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '10px',
    maxWidth: '500px',
    width: '90%',
    margin: '0 auto',
    position: 'relative',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  modalTitle: {
    margin: 0,
    fontSize: '1.5rem',
  },
  modalDescription: {
    marginBottom: '1.5rem',
    whiteSpace: 'pre-line',
  },
  closeButton: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#1e3a8a',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default GuideCard;
