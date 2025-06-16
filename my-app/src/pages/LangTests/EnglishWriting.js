import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTestScores } from '../../context/TestScoreContext';
import { useAuth } from '../../context/AuthContext';

function EnglishWriting() {
  const navigate = useNavigate();
  const { updateScore } = useTestScores();
  const { isAuthenticated } = useAuth();
  const [answers, setAnswers] = useState({
    essay: '',
    email: '',
    story: ''
  });
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

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setAnswers({ ...answers, essay: newText });
    const words = newText.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  };

  const handleSubmitAndNext = () => {
    const newScore = calculateScore();
    
    if (isAuthenticated()) {
      // Update score in TestScoreContext
      updateScore('englishWriting', newScore);
    } else {
      // If not authenticated, store both current and best scores in localStorage
      const currentBestScore = parseInt(localStorage.getItem('englishWritingBestScore') || '0');
      localStorage.setItem('englishWritingLastScore', newScore.toString());
      
      // Update best score if new score is higher
      if (newScore > currentBestScore) {
        localStorage.setItem('englishWritingBestScore', newScore.toString());
      }
    }

    // Navigate to next page
    navigate('/english-tests');
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
      backgroundColor: '#666',
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
      <button onClick={() => navigate('/english-tests')} style={styles.backButton}>Back to English Tests</button>
      <h1 style={styles.mainTitle}>English Writing Test</h1>
      <div style={styles.taskCard}>
        <h2 style={styles.taskTitle}>Task 1: Write a Message to Your Boss</h2>
        <p style={styles.taskInstructions}>
          You finished work early and want to ask if you can leave at 3:30 instead of 5:00. Write a polite message to your boss. Include:
          <ul>
            <li>Why you finished early</li>
            <li>Request to leave early</li>
            <li>Offer to complete anything if needed</li>
          </ul>
        </p>
        <textarea 
          style={styles.textArea} 
          placeholder="Write your message here..."
          value={answers.essay}
          onChange={handleTextChange}
        ></textarea>
        <div style={styles.wordCountDisplay}>
          Words: {wordCount}/{MIN_WORDS}-{MAX_WORDS}
        </div>
      </div>
      <button 
        style={{ ...styles.nextButton, ...(wordCount < MIN_WORDS || wordCount > MAX_WORDS ? styles.disabledButton : {}) }}
        onClick={handleSubmitAndNext}
        disabled={wordCount < MIN_WORDS || wordCount > MAX_WORDS}
      >
        Next
      </button>
    </div>
  );
}

export default EnglishWriting; 