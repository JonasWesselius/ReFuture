import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTestScores } from '../../context/TestScoreContext';
import { useAuth } from '../../context/AuthContext';

function EnglishReading() {
  const navigate = useNavigate();
  const { updateScore } = useTestScores();
  const { isAuthenticated } = useAuth();
  const [answers, setAnswers] = useState({
    task1: Array(3).fill(''),
    task2: Array(3).fill(''),
    task3: Array(3).fill('')
  });

  const correctAnswers = {
    task1: ['B', 'C', 'C'],
    task2: ['A', 'B', 'D'], // Assuming 'B' for 'side' entrance as per prompt
    task3: ['A', 'B', 'C'],
  };

  const calculateScore = () => {
    let totalScore = 0;

    // Task 1: Multiple Choice (10 points each)
    answers.task1.forEach((answer, index) => {
      if (answer === correctAnswers.task1[index]) {
        totalScore += 10;
      }
    });

    // Task 2: Gap Fill (10 points each)
    answers.task2.forEach((answer, index) => {
      if (answer === correctAnswers.task2[index]) {
        totalScore += 10;
      }
    });

    // Task 3: Schedule Reading (10 points each)
    answers.task3.forEach((answer, index) => {
      if (answer === correctAnswers.task3[index]) {
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
      updateScore('englishReading', newScore);
    } else {
      // If not authenticated, store both current and best scores in localStorage
      const currentBestScore = parseInt(localStorage.getItem('readingBestScore') || '0');
      localStorage.setItem('readingLastScore', newScore.toString());
      
      // Update best score if new score is higher
      if (newScore > currentBestScore) {
        localStorage.setItem('readingBestScore', newScore.toString());
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
                  onChange={(event) => handleAnswerChange(`task${taskNumber}`, qIndex, option.charAt(0), event)}
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
      {notices.map((notice, nIndex) => (
        <div key={nIndex} style={styles.gapFillContainer}>
          <p style={styles.gapFillText}>{notice.text}</p>
          <div style={styles.textOptionsContainer}>
            {notice.options.map((option, oIndex) => (
              <p key={oIndex} style={styles.optionText}>{option}</p>
            ))}
          </div>
          <div style={styles.radioButtonsRow}>
            {notice.options.map((option, oIndex) => (
              <div key={oIndex} style={styles.individualRadioButtonGroup}>
                <span style={styles.radioCharacterLabel}>{option.charAt(0)}</span>
                <input 
                  type="radio" 
                  name={`notice-${taskNumber}-${nIndex}`} 
                  value={option.charAt(0)} 
                  style={styles.radio}
                  checked={answers[`task${taskNumber}`][nIndex] === option.charAt(0)}
                  onChange={(event) => handleAnswerChange(`task${taskNumber}`, nIndex, option.charAt(0), event)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const ScheduleReadingTask = ({ taskNumber, taskTitle, schedule, questions }) => (
    <div style={styles.content}>
      <h2 style={styles.title}>Task {taskNumber}: {taskTitle}</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={styles.scheduleTable}>
          <thead>
            <tr>
              {schedule.headers.map((header, hIndex) => (
                <th key={hIndex} style={styles.tableHeader}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {schedule.rows.map((row, rIndex) => (
              <tr key={rIndex}>
                {row.map((cell, cIndex) => (
                  <td key={cIndex} style={styles.tableCell}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
                  onChange={(event) => handleAnswerChange(`task${taskNumber}`, qIndex, option.charAt(0), event)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <button 
          style={styles.backButton}
          onClick={() => navigate('/english-tests')}
        >
          Back to English Tests
        </button>
      </div>
      <h1 style={styles.mainTitle}>English Reading Test</h1>
      <MultipleChoiceTask
        taskNumber={1}
        taskTitle="Read a Work Email (Multiple Choice)"
        content={{
          subject: "Subject: Staff Meeting on Friday",
          body: `Dear Team,

We will have a short meeting this Friday at 9:00 AM in the break room. We will talk about the new schedule and safety updates. If you cannot come, please tell your supervisor before Thursday at 5:00 PM.
Best,
Clara – HR Department`
        }}
        questions={[
          {
            question: "What is the purpose of the email?",
            options: [
              "A) To tell workers about a party",
              "B) To inform about a meeting",
              "C) To change everyone's schedule",
              "D) To ask for safety feedback",
            ],
          },
          {
            question: "What should an employee do if they can't come?",
            options: [
              "A) Email Clara on Friday",
              "B) Go to the break room at 10:00 AM",
              "C) Inform their supervisor before Thursday",
              "D) Do nothing",
            ],
          },
          {
            question: "Where will the meeting take place?",
            options: [
              "A) In the main office",
              "B) In the HR office",
              "C) In the break room",
              "D) Online",
            ],
          },
        ]}
      />
      <GapFillTask
        taskNumber={2}
        taskTitle="Workplace Notices (Gap Fill)"
        notices={[
          {
            text: '"All visitors must ___ in at the front desk."',
            options: [
              'A) check',
              'B) look',
              'C) clock',
              'D) show',
            ],
          },
          {
            text: '"Please use the ___ entrance after 6 PM."',
            options: [
              'A) main',
              'B) side',
              'C) upper',
              'D) big',
            ],
          },
          {
            text: '"Team leaders will give ___ instructions before the task begins."',
            options: [
              'A) useful',
              'B) full',
              'C) safe',
              'D) clear',
            ],
          },
        ]}
      />
      <ScheduleReadingTask
        taskNumber={3}
        taskTitle="Reading a Weekly Schedule"
        schedule={{
          headers: ['Name', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
          rows: [
            ['David', '9-5', '9-5', 'Off', '12-8', '12-8'],
            ['Maria', '12-8', '12-8', '9-5', 'Off', '9-5'],
            ['Ahmed', '9-5', 'Off', '9-5', '9-5', 'Off'],
          ],
        }}
        questions={[
          {
            question: "How many days does Maria work this week?",
            options: [
              "A) 3",
              "B) 4",
              "C) 5",
              "D) 2",
            ],
          },
          {
            question: "Who is working on Wednesday from 9 to 5?",
            options: [
              "A) David",
              "B) Ahmed",
              "C) Maria",
              "D) No one",
            ],
          },
          {
            question: "When does David start his shift on Thursday?",
            options: [
              "A) 9 AM",
              "B) 10 AM",
              "C) 12 PM",
              "D) 8 AM",
            ],
          },
        ]}
      />
      <button style={styles.nextButton} onClick={handleSubmitAndNext}>
        Next
      </button>
    </div>
  );
}

export default EnglishReading; 