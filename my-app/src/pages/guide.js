import React, { useState, useEffect } from 'react';
import ProgressGuide from './progressguide';
import GuideCard from './guidecard';
import TranslateWidget, { getTranslation } from './translate';

const Guide = () => {
  const defaultCards = [
    {
      title: getTranslation('Getting a BSN'),
      status: getTranslation('Done'),
      description: getTranslation('Starting point'),
      steps: ['Step 1', 'Step 2', 'Step 3'],
    },
    {
      title: getTranslation('Getting a Bank Account'),
      status: getTranslation('In Progress'),
      description: getTranslation('Required to be able to work'),
      condition: 'Must have a BSN',
      steps: ['Step 1', 'Step 2', 'Step 3'],
    },
    {
      title: getTranslation('Becoming a Statusholder'),
      status: getTranslation('In Progress'),
      description: '',
      steps: ['Step 1', 'Step 2', 'Step 3'],
    },
  ];

  const [cards, setCards] = useState(() => {
    try {
      const stored = localStorage.getItem('guide-cards');
      return stored ? JSON.parse(stored) : defaultCards;
    } catch (e) {
      console.error('Failed to load from localStorage:', e);
      return defaultCards;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('guide-cards', JSON.stringify(cards));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [cards]);

  const toggleStatus = (index) => {
    setCards((prevCards) =>
      prevCards.map((card, i) =>
        i === index
          ? {
              ...card,
              status: card.status === 'Done' ? 'In Progress' : 'Done',
            }
          : card
      )
    );
  };

  const doneCount = cards.filter((card) => card.status === 'Done').length;
  const progress = Math.round((doneCount / cards.length) * 100);

  return (
    <>
      <TranslateWidget />
      <div style={styles.page}>
        <h2 style={styles.header}>{getTranslation('Integration Guide')}</h2>
        <p style={styles.progressText}>
          {getTranslation('Progress')}: {progress}%
        </p>
        <ProgressGuide progress={progress} />
        {cards.map((card, i) => (
          <GuideCard
            key={i}
            {...card}
            index={i}
            toggleStatus={toggleStatus}
          />
        ))}
      </div>
    </>
  );
};

const styles = {
  page: {
    padding: '1rem',
    paddingBottom: '5rem',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '500px',
    margin: 'auto',
  },
  header: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
  },
  progressText: {
    fontSize: '0.9rem',
    marginBottom: '0.25rem',
  },
};

export default Guide;