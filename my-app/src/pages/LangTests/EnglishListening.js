import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTestScores } from '../../context/TestScoreContext';
import { useAuth } from '../../context/AuthContext';

function EnglishListening() {
  const navigate = useNavigate();
  const { updateScore } = useTestScores();
  const { isAuthenticated } = useAuth();
  const [answers, setAnswers] = useState({
    multipleChoice: Array(5).fill(''),
    trueFalse: Array(5).fill(''),
    gapFill: Array(5).fill('')
  });
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Correct answers
  const correctAnswers = {
    multipleChoice: ['B', 'B', 'B', 'B', 'B'],
    trueFalse: ['T', 'F', 'T', 'T', 'T'],
    gapFill: [
      'invoice and the payment terms',
      'cash flow problems',
      '30 days',
      'favour',
      'email confirmation'
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

  const handleAnswerChange = (taskType, index, value) => {
    setAnswers(prev => ({
      ...prev,
      [taskType]: prev[taskType].map((answer, i) => i === index ? value : answer)
    }));
  };

  const handleSubmitAndNext = () => {
    const newScore = calculateScore();
    
    if (isAuthenticated()) {
      // Update score in TestScoreContext
      updateScore('englishListening', newScore);
    } else {
      // If not authenticated, store both current and best scores in localStorage
    const currentBestScore = parseInt(localStorage.getItem('listeningBestScore') || '0');
    localStorage.setItem('listeningLastScore', newScore.toString());
    
      // Update best score if new score is higher
    if (newScore > currentBestScore) {
      localStorage.setItem('listeningBestScore', newScore.toString());
      }
    }

    // Navigate to next page
    navigate('/english-tests');
  };

  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
    mainAudioContainer: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '2rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: '2rem',
    },
    audioTitle: {
      fontSize: '1.2rem',
      color: '#333',
      marginBottom: '1rem',
    },
    audioInstructions: {
      fontSize: '1rem',
      color: '#555',
      lineHeight: '1.5',
      marginBottom: '1.5rem',
    },
    audioPlayerContainer: {
      backgroundColor: '#e0e0e0',
      borderRadius: '25px',
      padding: '0.75rem 1.25rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    playPauseButton: {
      backgroundColor: 'transparent',
      color: '#333',
      border: 'none',
      width: '40px',
      height: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      fontSize: '1.5rem',
      borderRadius: '50%',
      transition: 'background-color 0.2s',
    },
    timeDisplay: {
      fontSize: '0.9rem',
      color: '#555',
      minWidth: '70px',
      textAlign: 'center',
    },
    progressBar: {
      flexGrow: 1,
      height: '6px',
      backgroundColor: '#ccc',
      borderRadius: '3px',
      overflow: 'hidden',
      cursor: 'pointer',
    },
    progress: {
      height: '100%',
      width: `${(currentTime / duration) * 100}%`,
      backgroundColor: '#4285f4',
      borderRadius: '3px',
    },
    volumeControl: {
      color: '#555',
      fontSize: '1.2rem',
      cursor: 'pointer',
    },
    moreOptions: {
      color: '#555',
      fontSize: '1.2rem',
      cursor: 'pointer',
      marginLeft: '0.5rem',
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
    trueFalseOption: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    gapFillText: {
      fontSize: '1.1rem',
      color: '#333',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      flexWrap: 'wrap',
    },
    gapFillInput: {
      width: '150px',
      padding: '0.5rem',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontSize: '1rem',
      backgroundColor: 'white',
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
                  name={`question-${taskNumber}-${qIndex}`} 
                  value={option.charAt(0)} 
                  style={styles.radio}
                  checked={answers.multipleChoice[qIndex] === option.charAt(0)}
                  onChange={(e) => handleAnswerChange('multipleChoice', qIndex, option.charAt(0))}
                />
                {option}
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
          <p style={styles.questionText}>{sIndex + 1}. {statement}</p>
          <div style={styles.trueFalseContainer}>
            <label style={styles.trueFalseOption}>
              <input 
                type="radio" 
                name={`statement-${taskNumber}-${sIndex}`} 
                value="T" 
                style={styles.radio}
                checked={answers.trueFalse[sIndex] === 'T'}
                onChange={(e) => handleAnswerChange('trueFalse', sIndex, 'T')}
              />
              True
            </label>
            <label style={styles.trueFalseOption}>
              <input 
                type="radio" 
                name={`statement-${taskNumber}-${sIndex}`} 
                value="F" 
                style={styles.radio}
                checked={answers.trueFalse[sIndex] === 'F'}
                onChange={(e) => handleAnswerChange('trueFalse', sIndex, 'F')}
              />
              False
            </label>
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
            {sIndex === 0 && (
              <>
                <span>Andrea is calling about the </span>
                <input 
                  type="text" 
                  style={styles.gapFillInput}
                  defaultValue={answers.gapFill[sIndex]}
                  onBlur={(e) => handleAnswerChange('gapFill', sIndex, e.target.value)}
                />
                <span>.</span>
              </>
            )}
            {sIndex === 1 && (
              <>
                <span>Andrea needs an extension because of </span>
                <input 
                  type="text" 
                  style={styles.gapFillInput}
                  defaultValue={answers.gapFill[sIndex]}
                  onBlur={(e) => handleAnswerChange('gapFill', sIndex, e.target.value)}
                />
                <span>.</span>
              </>
            )}
            {sIndex === 2 && (
              <>
                <span>The usual payment terms are </span>
                <input 
                  type="text" 
                  style={styles.gapFillInput}
                  defaultValue={answers.gapFill[sIndex]}
                  onBlur={(e) => handleAnswerChange('gapFill', sIndex, e.target.value)}
                />
                <span>.</span>
              </>
            )}
            {sIndex === 3 && (
              <>
                <span>Junko says it is a </span>
                <input 
                  type="text" 
                  style={styles.gapFillInput}
                  defaultValue={answers.gapFill[sIndex]}
                  onBlur={(e) => handleAnswerChange('gapFill', sIndex, e.target.value)}
                />
                <span> for Andrea.</span>
              </>
            )}
            {sIndex === 4 && (
              <>
                <span>Junko will send a quick </span>
                <input 
                  type="text" 
                  style={styles.gapFillInput}
                  defaultValue={answers.gapFill[sIndex]}
                  onBlur={(e) => handleAnswerChange('gapFill', sIndex, e.target.value)}
                />
                <span> of the payment terms extension.</span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={styles.page}>
      <button onClick={() => navigate('/english-tests')} style={styles.backButton}>Back to English Tests</button>
      <h1 style={styles.mainTitle}>English Listening Test</h1>

      <div style={styles.mainAudioContainer}>
        <h2 style={styles.audioTitle}>Business Phone Call</h2>
        <p style={styles.audioInstructions}>
          Listen to the conversation between Andrea and Junko. You can play the audio twice.
        </p>
        <div style={styles.audioPlayerContainer}>
          <audio 
            ref={audioRef}
            src="https://learnenglish.britishcouncil.org/sites/podcasts/files/LE_listening_B1_A_phone_call_from_a_customer.mp3"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            preload="metadata"
          />
          <button style={styles.playPauseButton} onClick={togglePlayPause}>
            {isPlaying ? '⏸' : '▶'}
          </button>
          <span style={styles.timeDisplay}>{formatTime(currentTime)} / {formatTime(duration)}</span>
          <div style={styles.progressBar}>
            <div style={styles.progress}></div>
          </div>
          
        </div>
      </div>
      
      <MultipleChoiceTask
        taskNumber={1}
        taskTitle="Multiple Choice"
        instructions="For each question, choose the correct answer (A, B, or C)."
        questions={[
          {
            question: "Who is calling?",
            options: [
              "A) Junko",
              "B) Andrea",
              "C) The delivery driver"
            ]
          },
          {
            question: "What is the main reason for the call?",
            options: [
              "A) To complain about a delivery",
              "B) To ask for an extension on payment terms",
              "C) To cancel an order"
            ]
          },
          {
            question: "What are the usual payment terms?",
            options: [
              "A) 15 days",
              "B) 30 days",
              "C) 60 days"
            ]
          },
          {
            question: "Why does Andrea need an extension?",
            options: [
              "A) The order was damaged",
              "B) The company is having cash flow problems",
              "C) The invoice was lost"
            ]
          },
          {
            question: "What will Junko do at the end of the call?",
            options: [
              "A) Cancel the order",
              "B) Send an email confirmation",
              "C) Call the customer"
            ]
          }
        ]}
      />

      <TrueFalseTask
        taskNumber={2}
        taskTitle="True or False"
        instructions="Are these statements true (T) or false (F)?"
        statements={[
          "Andrea is calling from Red Band.",
          "Junko cannot help with the payment terms.",
          "Andrea is placing a new order in the call.",
          "Junko agrees to extend the payment terms to 60 days.",
          "Andrea will send an email with the new order details."
        ]}
      />

      <GapFillTask
        taskNumber={3}
        taskTitle="Gap Fill"
        instructions="Complete the sentences with the correct word or phrase."
        sentences={[
          { text: "Andrea is calling about the invoice and the payment terms." },
          { text: "Andrea needs an extension because of cash flow problems." },
          { text: "The usual payment terms are 30 days." },
          { text: "Junko says it is a favour for Andrea." },
          { text: "Junko will send a quick email confirmation of the payment terms extension." }
        ]}
      />

      <button 
        style={styles.nextButton} 
        onClick={handleSubmitAndNext}
      >
        Finish
      </button>
    </div>
  );
}

export default EnglishListening; 