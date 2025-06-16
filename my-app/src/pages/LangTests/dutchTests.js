import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TranslatedText } from '../translate';

function DutchTests() {
  const navigate = useNavigate();
  const [listeningScores, setListeningScores] = useState({
    lastScore: 0,
    bestScore: 0
  });
  const [readingScores, setReadingScores] = useState({
    lastScore: 0,
    bestScore: 0
  });
  const [writingScores, setWritingScores] = useState({
    lastScore: 0,
    bestScore: 0
  });

  useEffect(() => {
    // Load listening scores from localStorage
    const lastListeningScore = parseInt(localStorage.getItem('dutchListeningLastScore') || '0');
    const bestListeningScore = parseInt(localStorage.getItem('dutchListeningBestScore') || '0');
    setListeningScores({ lastScore: lastListeningScore, bestScore: bestListeningScore });

    // Load reading scores from localStorage
    const lastReadingScore = parseInt(localStorage.getItem('dutchReadingLastScore') || '0');
    const bestReadingScore = parseInt(localStorage.getItem('dutchReadingBestScore') || '0');
    setReadingScores({ lastScore: lastReadingScore, bestScore: bestReadingScore });

    // Load writing scores from localStorage
    const lastWritingScore = parseInt(localStorage.getItem('dutchWritingLastScore') || '0');
    const bestWritingScore = parseInt(localStorage.getItem('dutchWritingBestScore') || '0');
    setWritingScores({ lastScore: lastWritingScore, bestScore: bestWritingScore });
  }, []);

  const styles = {
    page: {
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
    },
    cardsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      alignItems: 'center',
      marginTop: '2rem',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '1.5rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      width: '300px',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
    },
    title: {
      fontSize: '1.2rem',
      color: '#333',
      margin: 0,
    },
    mainTitle: {
      textAlign: 'center',
      marginBottom: '2rem',
      color: '#333',
    },
    button: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      transition: 'background-color 0.3s',
    },
    scoreContainer: {
      marginTop: '1rem',
    },
    scoreText: {
      fontSize: '0.9rem',
      color: '#666',
      margin: '0.5rem 0',
    },
    starsContainer: {
      display: 'flex',
      gap: '0.25rem',
      marginTop: '0.5rem',
    },
    star: {
      color: 'transparent',
      WebkitTextStroke: '1px black',
      fontSize: '3.6rem',
    },
    filledStar: {
      color: '#0066cc',
      WebkitTextStroke: '1px black',
      fontSize: '3.6rem',
    },
    backButton: {
      backgroundColor: '#808080',
      color: 'white',
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      transition: 'background-color 0.3s',
      marginBottom: '1rem',
    }
  };

  const renderStars = (score) => {
    const maxStars = 5;
    // For all individual tests, max score is 100, so 20 points per star
    const pointsPerStar = 20; 
    const filledStars = Math.floor(score / pointsPerStar);

    return (
      <div style={styles.starsContainer}>
        {[...Array(maxStars)].map((_, i) => (
          <span 
            key={i} 
            style={i < filledStars ? styles.filledStar : styles.star}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const handleBack = () => {
    navigate('/tests');
  };

  return (
    <div style={styles.page}>
      <button onClick={handleBack} style={styles.backButton}>
        <TranslatedText text="Back to Main Tests" />
      </button>
      <h1 style={styles.mainTitle}><TranslatedText text="Dutch Tests" /></h1>
      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          <div style={styles.header}>
            <h2 style={styles.title}><TranslatedText text="Reading" /></h2>
           
            <button 
              style={styles.button}
              onClick={() => navigate('/dutch-tests/reading')}
            >
              <TranslatedText text="Start Test" />
              
            </button>
          </div>
          <div style={styles.scoreContainer}>
            
            <p style={styles.scoreText}>
              <TranslatedText text="Previous score:" /> {readingScores.lastScore}
            </p>
            <p style={styles.scoreText}>
              <TranslatedText text="Best score:" /> {readingScores.bestScore}
            </p>
            {renderStars(readingScores.bestScore)}
          </div>
        </div>
        <div style={styles.card}>
          <div style={styles.header}>
            <h2 style={styles.title}><TranslatedText text="Writing" /></h2>
            
            <button 
              style={styles.button}
              onClick={() => navigate('/dutch-tests/writing')}
            >
              <TranslatedText text="Start Test" />
              
            </button>
          </div>
          <div style={styles.scoreContainer}>
            
            <p style={styles.scoreText}>
              <TranslatedText text="Previous score:" /> {writingScores.lastScore}
            </p>
            <p style={styles.scoreText}>
              <TranslatedText text="Best score:" /> {writingScores.bestScore}
            </p>
            {renderStars(writingScores.bestScore)}
          </div>
        </div>
        <div style={styles.card}>
          <div style={styles.header}>
            <h2 style={styles.title}><TranslatedText text="Listening" /></h2>
            <button 
              style={styles.button}
              onClick={() => navigate('/dutch-tests/listening')}
            >
              <TranslatedText text="Start Test" />
            </button>
          </div>
          <div style={styles.scoreContainer}>
            <p style={styles.scoreText}>
              <TranslatedText text="Previous score:" /> {listeningScores.lastScore}
            </p>
            <p style={styles.scoreText}>
              <TranslatedText text="Best score:" /> {listeningScores.bestScore}
            </p>
            {renderStars(listeningScores.bestScore)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DutchTests;