import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTestScores } from '../../context/TestScoreContext';
import { useAuth } from '../../context/AuthContext';

function DutchReading() {
  const navigate = useNavigate();
  const { updateScore } = useTestScores();
  const { isAuthenticated } = useAuth();
  const [answers, setAnswers] = useState({
    multipleChoice: Array(5).fill(''),
    trueFalse: Array(5).fill(''),
    gapFill: Array(5).fill('')
  });

  const correctAnswers = {
    task1: ['B', 'C', 'C'],
    task2: ['A', 'B', 'D'],
    task3: ['B', 'B', 'C'],
  };

  const calculateScore = () => {
    let totalScore = 0;

    // Task 1: Multiple Choice (10 points each)
    answers.task1.forEach((answer, index) => {
      if (answer.toLowerCase() === correctAnswers.task1[index].toLowerCase()) {
        totalScore += 10;
      }
    });

    // Task 2: Gap Fill (10 points each)
    answers.task2.forEach((answer, index) => {
      if (answer.toLowerCase() === correctAnswers.task2[index].toLowerCase()) {
        totalScore += 10;
      }
    });

    // Task 3: Schedule Reading (10 points each)
    answers.task3.forEach((answer, index) => {
      if (answer.toLowerCase() === correctAnswers.task3[index].toLowerCase()) {
        totalScore += 10;
      }
    });

    return totalScore;
  };

  const handleAnswerChange = (taskName, index, value, event) => {
    // Prevent default form submission behavior
    if (event) {
      event.preventDefault();
    }
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [taskName]: prevAnswers[taskName].map((ans, i) => 
        i === index ? value : ans
      )
    }));
  };

  const handleSubmitAndNext = () => {
    const newScore = calculateScore();
    
    if (isAuthenticated()) {
      // Update score in TestScoreContext
      updateScore('dutchReading', newScore);
    } else {
      // If not authenticated, store both current and best scores in localStorage
      const currentBestScore = parseInt(localStorage.getItem('dutchReadingBestScore') || '0');
      localStorage.setItem('dutchReadingLastScore', newScore.toString());
      
      // Update best score if new score is higher
      if (newScore > currentBestScore) {
        localStorage.setItem('dutchReadingBestScore', newScore.toString());
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
      marginBottom: '1rem',
    },
    content: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '2rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: '2rem',
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
    emailContent: {
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '2rem',
      fontSize: '1rem',
      lineHeight: '1.6',
    },
    emailSubject: {
      fontWeight: 'bold',
      marginBottom: '0.5rem',
    },
    emailBody: {
      whiteSpace: 'pre-wrap',
    },
    textOptionsContainer: {
      marginBottom: '1rem',
    },
    optionText: {
      fontSize: '1rem',
      color: '#555',
      marginBottom: '0.5rem',
    },
    radioButtonsRow: {
      display: 'flex',
      justifyContent: 'space-around',
      marginTop: '1rem',
    },
    individualRadioButtonGroup: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
    },
    radioCharacterLabel: {
      fontWeight: 'bold',
      fontSize: '1.1rem',
      color: '#333',
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
    scheduleTable: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '1.5rem',
    },
    tableHeader: {
      backgroundColor: '#e0e0e0',
      padding: '0.75rem',
      textAlign: 'left',
      borderBottom: '1px solid #ddd',
    },
    tableCell: {
      padding: '0.75rem',
      borderBottom: '1px solid #eee',
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

  const MultipleChoiceTask = ({ taskNumber, taskTitle, content, questions }) => (
    <div style={styles.content}>
      <h2 style={styles.title}>Task {taskNumber}: {taskTitle}</h2>
      {content && (
        <div style={styles.emailContent}>
          <div style={styles.emailSubject}>{content.subject}</div>
          <div style={styles.emailBody}>{content.body}</div>
        </div>
      )}
      {questions.map((q, qIndex) => (
        <div key={qIndex} style={styles.questionContainer}>
          <p style={styles.questionText}>{qIndex + 1}. {q.question}</p>
          <div style={styles.textOptionsContainer}>
            {q.options.map((option, oIndex) => (
              <p key={oIndex} style={styles.optionText}>{option}</p>
            ))}
          </div>
          <div style={styles.radioButtonsRow}>
            {q.options.map((option, oIndex) => (
              <div key={oIndex} style={styles.individualRadioButtonGroup}>
                <span style={styles.radioCharacterLabel}>{option.charAt(0)}</span>
                <input 
                  type="radio" 
                  name={`question-${taskNumber}-${qIndex}`} 
                  value={option.charAt(0)} 
                  style={styles.radio}
                  checked={answers[`task${taskNumber}`][qIndex] === option.charAt(0)}
                  onChange={(e) => handleAnswerChange(`task${taskNumber}`, qIndex, option.charAt(0), e)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const GapFillTask = ({ taskNumber, taskTitle, notices }) => (
    <div style={styles.content}>
      <h2 style={styles.title}>Task {taskNumber}: {taskTitle}</h2>
      <div style={styles.gapFillContainer}>
        <p style={styles.gapFillText}>
          {notices.map((notice, nIndex) => (
            <React.Fragment key={nIndex}>
              {notice.text}
              {notice.gap && (
                <input 
                  type="text" 
                  style={styles.gapFillInput}
                  defaultValue={answers[`task${taskNumber}`][notice.gapIndex]}
                  onBlur={(e) => handleAnswerChange(`task${taskNumber}`, notice.gapIndex, e.target.value)}
                />
              )}
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  );

  const ScheduleReadingTask = ({ taskNumber, taskTitle, schedule, questions }) => (
    <div style={styles.content}>
      <h2 style={styles.title}>Task {taskNumber}: {taskTitle}</h2>
      <table style={styles.scheduleTable}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Tijd</th>
            <th style={styles.tableHeader}>Activiteit</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((row, index) => (
            <tr key={index}>
              <td style={styles.tableCell}>{row.time}</td>
              <td style={styles.tableCell}>{row.activity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {questions.map((q, qIndex) => (
        <div key={qIndex} style={styles.questionContainer}>
          <p style={styles.questionText}>{qIndex + 1}. {q.question}</p>
          <div style={styles.optionsContainer}>
            {q.options.map((option, oIndex) => (
              <label key={oIndex} style={styles.option}>
                <input
                  type="radio"
                  name={`schedule-question-${taskNumber}-${qIndex}`}
                  value={option.value}
                  checked={answers[`task${taskNumber}`][qIndex] === option.value}
                  onChange={(e) => handleAnswerChange(`task${taskNumber}`, qIndex, option.value, e)}
                  style={styles.radio}
                />
                {option.text}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const task1Questions = [
    {
      question: 'Wat is het doel van deze e-mail?',
      options: [
        'A) Een feestje aankondigen',
        'B) Informatie geven over een vergadering',
        'C) Het rooster van iedereen veranderen',
        'D) Om feedback over veiligheid vragen'
      ],
    },
    {
      question: 'Wat moet een medewerker doen als hij niet kan komen?',
      options: [
        'A) Clara op vrijdag e-mailen',
        'B) Naar de kantine gaan om 10:00 uur',
        'C) Zijn leidinggevende vóór donderdag informeren',
        'D) Niets doen'
      ],
    },
    {
      question: 'Waar vindt de vergadering plaats?',
      options: [
        'A) In het hoofdkantoor',
        'B) In het HR-kantoor',
        'C) In de kantine',
        'D) Online'
      ],
    },
  ];

  const emailContent = {
    subject: 'Personeelsvergadering op vrijdag',
    body: `Beste team,

We houden een korte vergadering op vrijdag om 09:00 uur in de kantine. We bespreken het nieuwe rooster en de veiligheidsregels.
Als je niet kunt komen, laat het vóór donderdag 17:00 uur weten aan je leidinggevende.

Groet,
Clara – HR-afdeling`
  };

  const task2Notices = [
    { text: 'Alle bezoekers moeten zich ' }, { gap: true, gapIndex: 0 }, { text: ' bij de receptie.' },
    { text: 'Gebruik na 18:00 uur de ' }, { gap: true, gapIndex: 1 }, { text: ' ingang.' },
    { text: 'Teamleiders geven ' }, { gap: true, gapIndex: 2 }, { text: ' instructies vóór de taak begint.' },
  ];

  const task3Schedule = [
    { time: 'Ma', activity: 'David: 9-17, Maria: 12-20, Ahmed: 9-17' },
    { time: 'Di', activity: 'David: 9-17, Maria: 12-20, Ahmed: vrij' },
    { time: 'Wo', activity: 'David: vrij, Maria: 9-17, Ahmed: 9-17' },
    { time: 'Do', activity: 'David: 12-20, Maria: vrij, Ahmed: 9-17' },
    { time: 'Vr', activity: 'David: 12-20, Maria: 9-17, Ahmed: vrij' },
  ];

  const task3Questions = [
    {
      question: 'Hoeveel dagen werkt Maria deze week?',
      options: [
        { value: 'A', text: '3' },
        { value: 'B', text: '4' },
        { value: 'C', text: '5' },
        { value: 'D', text: '2' }
      ]
    },
    {
      question: 'Wie werkt er op woensdag van 9 tot 17 uur?',
      options: [
        { value: 'A', text: 'David' },
        { value: 'B', text: 'Ahmed' },
        { value: 'C', text: 'Maria' },
        { value: 'D', text: 'Niemand' }
      ]
    },
    {
      question: 'Hoe laat begint David op donderdag?',
      options: [
        { value: 'A', text: '9:00 uur' },
        { value: 'B', text: '10:00 uur' },
        { value: 'C', text: '12:00 uur' },
        { value: 'D', text: '8:00 uur' }
      ]
    },
  ];

  return (
    <div style={styles.page}>
      <button onClick={() => navigate('/dutch-tests')} style={styles.backButton}>Terug naar Nederlandse Tests</button>
      <h1 style={styles.mainTitle}>Nederlandse Leestoets</h1>
      <MultipleChoiceTask
        taskNumber={1}
        taskTitle="Lees een Werkmail"
        content={emailContent}
        questions={task1Questions}
      />
      <GapFillTask
        taskNumber={2}
        taskTitle="Werkplek Instructies"
        notices={task2Notices}
      />
      <ScheduleReadingTask
        taskNumber={3}
        taskTitle="Lees een Werkrooster"
        schedule={task3Schedule}
        questions={task3Questions}
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

export default DutchReading; 