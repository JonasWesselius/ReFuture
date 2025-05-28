// src/components/GuideCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const GuideCard = ({ title, status, description, condition, steps, toggleStatus, index }) => {
  const getStatusColor = () => {
    if (status === 'Done') return '#4caf50';
    if (status === 'In Progress') return '#1e3a8a';
    return '#9e9e9e';
  };

  const slug = title.toLowerCase().replace(/\s+/g, '-');

  return (
    <Link to={`/guide/${slug}`} style={styles.link}>
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h3 style={styles.title}>{title}</h3>
          <div
            onClick={(e) => {
              e.preventDefault(); // prevent card link from activating
              toggleStatus(index);
            }}
            style={{
              ...styles.status,
              backgroundColor: getStatusColor(),
            }}
          >
            {status}
          </div>
        </div>
        <p style={styles.description}>{description}</p>
        {condition && <p style={styles.condition}>Condition: {condition}</p>}
        <ul style={styles.steps}>
          {steps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ul>
        <p style={styles.more}>More...</p>
      </div>
    </Link>
  );
};

const styles = {
  link: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
  },
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
  },
  condition: {
    fontSize: '0.8rem',
    fontStyle: 'italic',
    color: '#555',
  },
  steps: {
    paddingLeft: '1.2rem',
    margin: '0.5rem 0',
    fontSize: '0.9rem',
  },
  more: {
    color: '#1e3a8a',
    fontSize: '0.85rem',
    fontWeight: 'bold',
  },
};

export default GuideCard;
