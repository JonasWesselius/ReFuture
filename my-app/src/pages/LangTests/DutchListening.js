import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTestScores } from '../../context/TestScoreContext';
import { useAuth } from '../../context/AuthContext';

function DutchListening() {
  const navigate = useNavigate();
  const { updateScore } = useTestScores();
  const { isAuthenticated } = useAuth();
  const [answers, setAnswers] = useState({
    multipleChoice: Array(5).fill(''),
    trueFalse: Array(5).fill(''),
    gapFill: Array(5).fill('')
  });

  // Correct answers (placeholders for now)
  const correctAnswers = {
    multipleChoice: ['B', 'B', 'B', 'B', 'C'],
    trueFalse: ['W', 'W', 'W', 'N', 'W'],
    gapFill: [
      'levering',
      'evenement',
      'weer',
      'spoed',
      'offerte'
    ]
  };

  const calculateScore = () => {
    let totalScore = 10; // Base score

    // Multiple Choice (6 points each)
    answers.multipleChoice.forEach((answer, index) => {
      if (answer === correctAnswers.multipleChoice[index]) {
        totalScore += 6;
      }
    });

    // True/False (6 points each)
    answers.trueFalse.forEach((answer, index) => {
      if (answer === correctAnswers.trueFalse[index]) {
        totalScore += 6;
      }
    });

    // Gap Fill (6 points each)
    answers.gapFill.forEach((answer, index) => {
      if (answer.toLowerCase().trim() === correctAnswers.gapFill[index].toLowerCase().trim()) {
        totalScore += 6;
      }
    });

    return totalScore;
  };

  const handleAnswerChange = (taskType, index, value, event) => {
    // Prevent default form submission behavior
    if (event) {
      event.preventDefault();
    }
    setAnswers(prev => ({
      ...prev,
      [taskType]: prev[taskType].map((answer, i) => i === index ? value : answer)
    }));
  };

  const handleSubmitAndNext = () => {
    const newScore = calculateScore();
    
    if (isAuthenticated()) {
      // Update score in TestScoreContext
      updateScore('dutchListening', newScore);
    } else {
      // If not authenticated, store both current and best scores in localStorage
      const currentBestScore = parseInt(localStorage.getItem('dutchListeningBestScore') || '0');
      localStorage.setItem('dutchListeningLastScore', newScore.toString());
      
      // Update best score if new score is higher
      if (newScore > currentBestScore) {
        localStorage.setItem('dutchListeningBestScore', newScore.toString());
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
    questionContainer: {
      marginBottom: '1.5rem',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      padding: '1.5rem',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    },
    questionText: {
      fontSize: '1.1rem',
      color: '#333',
      marginBottom: '1rem',
    },
    optionsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
    },
    option: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '1rem',
      color: '#555',
    },
    radio: {
      marginRight: '0.5rem',
      width: '20px',
      height: '20px',
      accentColor: 'black',
    },
    trueFalseContainer: {
      display: 'flex',
      gap: '1rem',
      marginTop: '0.5rem',
    },
    trueFalseButton: {
      padding: '0.5rem 1rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
      backgroundColor: '#f0f0f0',
      cursor: 'pointer',
      fontSize: '0.9rem',
      transition: 'background-color 0.2s',
    },
    trueFalseButtonActive: {
      backgroundColor: '#0066cc',
      color: 'white',
      borderColor: '#0066cc',
    },
    gapFillContainer: {
      marginBottom: '1.5rem',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      padding: '1.5rem',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    },
    gapFillText: {
      fontSize: '1.1rem',
      color: '#333',
      marginBottom: '1rem',
    },
    gapFillInput: {
      width: '150px',
      padding: '0.5rem',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontSize: '1rem',
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
  };

  const MultipleChoiceTask = ({ taskNumber, taskTitle, instructions, questions }) => (
    <div style={styles.taskCard}>
      <h2 style={styles.taskTitle}>Task {taskNumber}: {taskTitle}</h2>
      <p style={styles.taskInstructions}>{instructions}</p>
      {questions.map((q, qIndex) => (
        <div key={qIndex} style={styles.questionContainer}>
          <p style={styles.questionText}>{qIndex + 1}. {q.question}</p>
          <div style={styles.optionsContainer}>
            {q.options.map((option, oIndex) => (
              <label key={oIndex} style={styles.option}>
                <input 
                  type="radio" 
                  name={`mc-question-${taskNumber}-${qIndex}`} 
                  value={option.value} 
                  style={styles.radio}
                  checked={answers.multipleChoice[qIndex] === option.value}
                  onChange={(e) => handleAnswerChange('multipleChoice', qIndex, option.value, e)}
                />
                {option.text}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const TrueFalseTask = ({ taskNumber, taskTitle, instructions, statements }) => (
    <div style={styles.taskCard}>
      <h2 style={styles.taskTitle}>Task {taskNumber}: {taskTitle}</h2>
      <p style={styles.taskInstructions}>{instructions}</p>
      {statements.map((statement, sIndex) => (
        <div key={sIndex} style={styles.questionContainer}>
          <p style={styles.questionText}>{sIndex + 1}. {statement.text}</p>
          <div style={styles.trueFalseContainer}>
            <button
              style={{ ...styles.trueFalseButton, ...(answers.trueFalse[sIndex] === 'W' ? styles.trueFalseButtonActive : {}) }}
              onClick={(e) => handleAnswerChange('trueFalse', sIndex, 'W', e)}
            >
              Waar
            </button>
            <button
              style={{ ...styles.trueFalseButton, ...(answers.trueFalse[sIndex] === 'N' ? styles.trueFalseButtonActive : {}) }}
              onClick={(e) => handleAnswerChange('trueFalse', sIndex, 'N', e)}
            >
              Niet waar
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const GapFillTask = ({ taskNumber, taskTitle, instructions, sentences }) => (
    <div style={styles.taskCard}>
      <h2 style={styles.taskTitle}>Task {taskNumber}: {taskTitle}</h2>
      <p style={styles.taskInstructions}>{instructions}</p>
      {sentences.map((sentence, sIndex) => (
        <div key={sIndex} style={styles.questionContainer}>
          <div style={styles.gapFillText}>
            <span>{sIndex + 1}. </span>
            {sentence.parts.map((part, pIndex) => (
              <React.Fragment key={pIndex}>
                {part.text}
                {part.gap && (
                  <input 
                    type="text" 
                    style={styles.gapFillInput}
                    defaultValue={answers.gapFill[sIndex]}
                    onBlur={(e) => handleAnswerChange('gapFill', sIndex, e.target.value)}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  // Task data (placeholders, will need actual Dutch content)
  const multipleChoiceQuestions = [
    {
      question: 'Wie belt er naar Pieter?',
      options: [
        { value: 'A', text: 'De koerier' },
        { value: 'B', text: 'Sanne' },
        { value: 'C', text: 'De magazijnmedewerker' },
      ],
    },
    {
      question: 'Waarom belt Sanne?',
      options: [
        { value: 'A', text: 'Om een nieuwe bestelling te plaatsen' },
        { value: 'B', text: 'Om een betaling te bespreken' },
        { value: 'C', text: 'Om een leveringsprobleem te melden' },
      ],
    },
    {
      question: 'Wat is er met de vorige levering aan de hand?',
      options: [
        { value: 'A', text: 'Alles is goed geleverd' },
        { value: 'B', text: 'De helft van de dozen ontbreekt' },
        { value: 'C', text: 'De dozen zijn beschadigd' },
      ],
    },
    {
      question: 'Wat wil Sanne dat Pieter regelt?',
      options: [
        { value: 'A', text: 'Een korting op de bestelling' },
        { value: 'B', text: 'Een spoedlevering van de rest' },
        { value: 'C', text: 'Een terugbetaling' },
      ],
    },
    {
      question: 'Wat vraagt Sanne aan het einde van het gesprek?',
      options: [
        { value: 'A', text: 'Of Pieter een offerte wil sturen' },
        { value: 'B', text: 'Of Pieter de bestelling annuleert' },
        { value: 'C', text: 'Of Pieter de dozen zelf komt brengen' },
      ],
    },
  ];

  const trueFalseStatements = [
    { text: 'Sanne werkt bij GreenSupply.' },
    { text: 'De helft van de bestelling is nog niet geleverd.' },
    { text: 'Pieter wil geen extra kosten maken.' },
    { text: 'Sanne accepteert de extra kosten voor de spoedlevering.' },
    { text: 'Pieter belooft de offerte direct te sturen.' },
  ];

  const gapFillSentences = [
    { parts: [{ text: 'Sanne belt over een probleem met de' }, { gap: true }, { text: '.' }] },
    { parts: [{ text: 'De dozen zijn belangrijk voor een' }, { gap: true }, { text: ' dit weekend.' }] },
    { parts: [{ text: 'Pieter zegt dat de vertraging komt door het' }, { gap: true }, { text: '.' }] },
    { parts: [{ text: 'Sanne vraagt om een' }, { gap: true }, { text: ' levering.' }] },
    { parts: [{ text: 'Pieter zegt dat hij ook een' }, { gap: true }, { text: ' zal maken voor de nieuwe bestelling.' }] },
  ];

  return (
    <div style={styles.page}>
      <button onClick={() => navigate('/dutch-tests')} style={styles.backButton}>Terug naar Nederlandse Tests</button>
      <h1 style={styles.mainTitle}>Nederlandse Luistertoets</h1>

      {/* Murf.ai Embed Player */}
      <div style={{ marginBottom: '2rem' }}>
        <iframe class="murf-embed" width="560" height="102" src="https://murf.ai/embeds/index.html?embedId=mbthcruv" allowfullscreen title="Murf Embed Player" style={{ border: 'none', width: '100%' }}></iframe>
        <script src="https://murf.ai/embeds/widget.js"></script>
      </div>

      {/* Task 1: Multiple Choice */}
      <MultipleChoiceTask
        taskNumber={1}
        taskTitle="Meerkeuzevragen"
        instructions="Kies het beste antwoord."
        questions={multipleChoiceQuestions}
      />

      {/* Task 2: True/False */}
      <TrueFalseTask
        taskNumber={2}
        taskTitle="Waar of Niet waar"
        instructions="Geef aan of de volgende uitspraken waar of niet waar zijn."
        statements={trueFalseStatements}
      />

      {/* Task 3: Gap Fill */}
      <GapFillTask
        taskNumber={3}
        taskTitle="Vul de gaten aan"
        instructions="Vul de ontbrekende woorden of zinnen in."
        sentences={gapFillSentences}
      />

      <button
        style={styles.nextButton}
        onClick={handleSubmitAndNext}
      >
        Test Afronden
      </button>
    </div>
  );
}

export default DutchListening; 