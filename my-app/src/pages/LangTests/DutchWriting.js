import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTestScores } from '../../context/TestScoreContext';
import { useAuth } from '../../context/AuthContext';

function DutchWriting() {
  const navigate = useNavigate();
  const { updateScore } = useTestScores();
  const { isAuthenticated } = useAuth();
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const MIN_WORDS = 40;
  const MAX_WORDS = 60;

  const calculateScore = (errors) => {
    const maxScore = 100;
    const penaltyPerTwoMistakes = 5;
    const numberOfDeductionUnits = Math.floor(errors.length / 2);
    const deductions = numberOfDeductionUnits * penaltyPerTwoMistakes;
    return Math.max(maxScore - deductions, 0);
  };

  const checkTextForScore = async () => {
    const language = "nl-NL"; // Changed language to Dutch
    const params = new URLSearchParams({
      text,
      language,
    });

    try {
      const res = await fetch("https://api.languagetool.org/v2/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      return calculateScore(data.matches);
    } catch (error) {
      console.error("Error checking text for score:", error);
      return 0; // Return 0 on error, or handle as appropriate
    }
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    const words = newText.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  };

  const handleSubmitAndNext = () => {
    const newScore = calculateScore();
    
    if (isAuthenticated()) {
      // Update score in TestScoreContext
      updateScore('dutchWriting', newScore);
    } else {
      // If not authenticated, store both current and best scores in localStorage
      const currentBestScore = parseInt(localStorage.getItem('dutchWritingBestScore') || '0');
      localStorage.setItem('dutchWritingLastScore', newScore.toString());
      
      // Update best score if new score is higher
      if (newScore > currentBestScore) {
        localStorage.setItem('dutchWritingBestScore', newScore.toString());
      }
    }

    // Navigate to next page
    navigate('/dutch-tests');
  };

  const styles = {
    page: {
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
    },
    mainTitle: {
      textAlign: 'center',
      marginBottom: '2rem',
      color: '#333',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
    },
    title: {
      fontSize: '1.5rem',
      color: '#333',
      margin: 0,
    },
    backButton: {
      backgroundColor: '#808080',
      color: 'white',
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.9rem',
    },
    content: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '2rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    taskCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '1.5rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: '2rem',
    },
    taskTitle: {
      fontSize: '1.2rem',
      color: '#333',
      marginBottom: '0.5rem',
    },
    taskInstructions: {
      fontSize: '1rem',
      color: '#555',
      lineHeight: '1.5',
      marginBottom: '1.5rem',
    },
    textArea: {
      width: '100%',
      minHeight: '200px',
      padding: '1rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '1rem',
      lineHeight: '1.5',
      boxSizing: 'border-box',
      resize: 'vertical',
    },
    nextButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1.1rem',
      marginTop: '2rem',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      transition: 'background-color 0.3s',
    },
    disabledButton: {
      backgroundColor: '#ccc',
      cursor: 'not-allowed',
    },
    wordCountDisplay: {
      fontSize: '0.9rem',
      color: '#555',
      textAlign: 'right',
      marginTop: '0.5rem',
    }
  };

  return (
    <div style={styles.page}>
      <button onClick={() => navigate('/dutch-tests')} style={styles.backButton}>Terug naar Nederlandse Tests</button>
      <h1 style={styles.mainTitle}>Dutch Writing Test</h1>
      <div style={styles.taskCard}>
        <h2 style={styles.taskTitle}>Taak 1: Schrijf een bericht</h2>
        <p style={styles.taskInstructions}>
          Je hebt vandaag je werk eerder af. Je wilt vragen of je om 15:30 uur naar huis mag in plaats van om 17:00 uur.
          Schrijf een korte en beleefde boodschap aan je leidinggevende.
        </p>
        <p style={styles.taskInstructions}>
          Gebruik ongeveer 40 tot 60 woorden.
          Zorg dat je schrijft over:
          <br />- Waarom je eerder klaar bent
          <br />- Of je eerder naar huis mag
          <br />- Of er nog iets is dat je moet afmaken
        </p>
        <textarea 
          style={styles.textArea} 
          placeholder="Begin hier met schrijven..."
          value={text}
          onChange={handleTextChange}
        ></textarea>
        <div style={styles.wordCountDisplay}>
          Woorden: {wordCount}/{MIN_WORDS}-{MAX_WORDS}
        </div>
      </div>
      <button 
        style={{ ...styles.nextButton, ...(wordCount < MIN_WORDS || wordCount > MAX_WORDS ? styles.disabledButton : {}) }}
        onClick={handleSubmitAndNext}
        disabled={wordCount < MIN_WORDS || wordCount > MAX_WORDS}
      >
        Test Afronden
      </button>
    </div>
  );
}

export default DutchWriting; 