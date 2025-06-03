// src/components/ProgressGuide.js
import React from 'react';

const ProgressGuide = ({ progress }) => {
  return (
    <div style={styles.container}>
      <div style={{ ...styles.bar, width: `${progress}%` }} />
    </div>
  );
};

const styles = {
  container: {
    height: '6px',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    overflow: 'hidden',
    marginBottom: '1rem',
  },
  bar: {
    height: '100%',
    backgroundColor: '#4caf50',
    transition: 'width 0.4s ease',
  },
};

export default ProgressGuide;
