import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTestScores } from '../context/TestScoreContext';
import { useAuth } from '../context/AuthContext';
import { TranslatedText } from './translate';

function Tests() {
  const navigate = useNavigate();
  const { scores } = useTestScores();
  const { isAuthenticated } = useAuth();

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
  const [dutchScores, setDutchScores] = useState({
    lastScore: 0,
    bestScore: 0
  });
  const [averageScores, setAverageScores] = useState({
    lastAverage: 0,
    bestAverage: 0
  });

  useEffect(() => {
    if (isAuthenticated()) {
      // Load scores from TestScoreContext
      const englishListening = scores.englishListening || { current: 0, best: 0 };
      const englishReading = scores.englishReading || { current: 0, best: 0 };
      const englishWriting = scores.englishWriting || { current: 0, best: 0 };
      const dutchListening = scores.dutchListening || { current: 0, best: 0 };
      const dutchReading = scores.dutchReading || { current: 0, best: 0 };
      const dutchWriting = scores.dutchWriting || { current: 0, best: 0 };

      setListeningScores({ 
        lastScore: englishListening.current, 
        bestScore: englishListening.best 
      });
      setReadingScores({ 
        lastScore: englishReading.current, 
        bestScore: englishReading.best 
      });
      setWritingScores({ 
        lastScore: englishWriting.current, 
        bestScore: englishWriting.best 
      });

      // Calculate Dutch averages
      const dutchLastAverage = Math.round((
        dutchListening.current + 
        dutchReading.current + 
        dutchWriting.current
      ) / 3);
      const dutchBestAverage = Math.round((
        dutchListening.best + 
        dutchReading.best + 
        dutchWriting.best
      ) / 3);
      setDutchScores({ 
        lastScore: dutchLastAverage, 
        bestScore: dutchBestAverage 
      });

      // Calculate English test averages
      const englishLastScore = Math.round((
        englishListening.current + 
        englishReading.current + 
        englishWriting.current
      ) / 2.3);
      const englishBestScore = Math.round((
        englishListening.best + 
        englishReading.best + 
        englishWriting.best
      ) / 2.3);

      // Calculate overall averages
      const averageLastScore = Math.round((englishLastScore + dutchLastAverage) / 2);
      const averageBestScore = Math.round((englishBestScore + dutchBestAverage) / 2);
      setAverageScores({ 
        lastAverage: averageLastScore, 
        bestAverage: averageBestScore 
      });
    } else {
      // Load scores from localStorage for non-authenticated users
      const lastListeningScore = parseInt(localStorage.getItem('listeningLastScore') || '0');
      const bestListeningScore = parseInt(localStorage.getItem('listeningBestScore') || '0');
      const lastReadingScore = parseInt(localStorage.getItem('readingLastScore') || '0');
      const bestReadingScore = parseInt(localStorage.getItem('readingBestScore') || '0');
      const lastWritingScore = parseInt(localStorage.getItem('writingLastScore') || '0');
      const bestWritingScore = parseInt(localStorage.getItem('writingBestScore') || '0');
      const lastDutchListeningScore = parseInt(localStorage.getItem('dutchListeningLastScore') || '0');
      const bestDutchListeningScore = parseInt(localStorage.getItem('dutchListeningBestScore') || '0');
      const lastDutchReadingScore = parseInt(localStorage.getItem('dutchReadingLastScore') || '0');
      const bestDutchReadingScore = parseInt(localStorage.getItem('dutchReadingBestScore') || '0');
      const lastDutchWritingScore = parseInt(localStorage.getItem('dutchWritingLastScore') || '0');
      const bestDutchWritingScore = parseInt(localStorage.getItem('dutchWritingBestScore') || '0');

      setListeningScores({ lastScore: lastListeningScore, bestScore: bestListeningScore });
      setReadingScores({ lastScore: lastReadingScore, bestScore: bestReadingScore });
      setWritingScores({ lastScore: lastWritingScore, bestScore: bestWritingScore });

      // Calculate Dutch averages
      const dutchLastAverage = Math.round((lastDutchListeningScore + lastDutchReadingScore + lastDutchWritingScore) / 3);
      const dutchBestAverage = Math.round((bestDutchListeningScore + bestDutchReadingScore + bestDutchWritingScore) / 3);
      setDutchScores({ lastScore: dutchLastAverage, bestScore: dutchBestAverage });

      // Calculate English test averages
      const englishLastScore = Math.round((lastListeningScore + lastReadingScore + lastWritingScore) / 2.3);
      const englishBestScore = Math.round((bestListeningScore + bestReadingScore + bestWritingScore) / 2.3);

      // Calculate overall averages
      const averageLastScore = Math.round((englishLastScore + dutchLastAverage) / 2);
      const averageBestScore = Math.round((englishBestScore + dutchBestAverage) / 2);
      setAverageScores({ lastAverage: averageLastScore, bestAverage: averageBestScore });
    }
  }, [scores, isAuthenticated]);

  const styles = {
    page: {
      padding: 'var(--mobile-padding)',
      paddingBottom: 'calc(var(--mobile-padding) + 400px)',
      maxWidth: '100%',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box',
      overflowX: 'hidden',
      position: 'relative',
    },
    cardsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      alignItems: 'center',
      marginTop: '2rem',
      marginBottom: '0',
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
      position: 'relative',
      display: 'flex',
      gap: '0.25rem',
      marginTop: '0.5rem',
      height: '3.6rem',
    },
    starsBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'flex',
      gap: '0.25rem',
      zIndex: 1,
    },
    starsForeground: {
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'flex',
      gap: '0.25rem',
      overflow: 'hidden',
      zIndex: 2,
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
    overallScoreCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      width: '300px',
      marginTop: '2rem',
      border: '2px solid #0066cc',
      textAlign: 'center',
    },
    overallScoreTitle: {
      fontSize: '1.5rem',
      color: '#0066cc',
      marginBottom: '1rem',
    }
  };

  const renderStars = (score) => {
    const maxStars = 5;
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

  return (
    <div style={styles.page}>
      <h1 style={styles.mainTitle}><TranslatedText text="Language Tests" /></h1>
      <div style={styles.cardsContainer}>
        <div style={styles.overallScoreCard}>
          <h2 style={styles.overallScoreTitle}>
            <TranslatedText text="Overall Average Score" />
          </h2>
          <h2 style={styles.overallScoreTitle}>
            <TranslatedText text="Overall Average Score" />
          </h2>
          <div style={styles.scoreContainer}>
            <p style={styles.scoreText}>
              <TranslatedText text="Previous score:" /> {averageScores.lastAverage}
            </p>
            <p style={styles.scoreText}>
              <TranslatedText text="Best score:" /> {averageScores.bestAverage}
            </p>
            <p style={styles.scoreText}>
              <TranslatedText text="Previous score:" /> {averageScores.lastAverage}
            </p>
            <p style={styles.scoreText}>
              <TranslatedText text="Best score:" /> {averageScores.bestAverage}
            </p>
            {renderStars(averageScores.bestAverage)}
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.header}>
            <h2 style={styles.title}><TranslatedText text="English Tests" /></h2>
            <h2 style={styles.title}><TranslatedText text="English Tests" /></h2>
            <button 
              style={styles.button}
              onClick={() => { 
                navigate('/english-tests');
              }}
            >
              <TranslatedText text="Start Test" />
              <TranslatedText text="Start Test" />
            </button>
          </div>
          <div style={styles.scoreContainer}>
            <p style={styles.scoreText}>
              <TranslatedText text="Previous score:" /> {Math.round((readingScores.lastScore + writingScores.lastScore + listeningScores.lastScore) / 2.3)}
            </p>
            <p style={styles.scoreText}>
              <TranslatedText text="Best score:" /> {Math.round((readingScores.bestScore + writingScores.bestScore + listeningScores.bestScore) / 2.3)}
            </p>
            <p style={styles.scoreText}>
              <TranslatedText text="Previous score:" /> {Math.round((readingScores.lastScore + writingScores.lastScore + listeningScores.lastScore) / 2.3)}
            </p>
            <p style={styles.scoreText}>
              <TranslatedText text="Best score:" /> {Math.round((readingScores.bestScore + writingScores.bestScore + listeningScores.bestScore) / 2.3)}
            </p>
            {renderStars(Math.round((readingScores.bestScore + writingScores.bestScore + listeningScores.bestScore) / 2.3))}
          </div>
        </div>
        <div style={{
          ...styles.card,
          marginBottom: '100px'
        }}>
          <div style={styles.header}>
            <h2 style={styles.title}><TranslatedText text="Dutch Tests" /></h2>
            <h2 style={styles.title}><TranslatedText text="Dutch Tests" /></h2>
            <button 
              style={styles.button}
              onClick={() => { 
                navigate('/dutch-tests');
              }}
            >
              <TranslatedText text="Start Test" />
              <TranslatedText text="Start Test" />
            </button>
          </div>
          <div style={styles.scoreContainer}>
            <p style={styles.scoreText}>
              <TranslatedText text="Previous score:" /> {dutchScores.lastScore}
            </p>
            <p style={styles.scoreText}>
              <TranslatedText text="Best score:" /> {dutchScores.bestScore}
            </p>
            <p style={styles.scoreText}>
              <TranslatedText text="Previous score:" /> {dutchScores.lastScore}
            </p>
            <p style={styles.scoreText}>
              <TranslatedText text="Best score:" /> {dutchScores.bestScore}
            </p>
            {renderStars(dutchScores.bestScore)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tests;
export default Tests;