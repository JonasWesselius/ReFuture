import React, { createContext, useContext, useState, useEffect } from 'react';

const TestScoreContext = createContext();

export const useTestScores = () => useContext(TestScoreContext);

export const TestScoreProvider = ({ children }) => {
  const [scores, setScores] = useState({});
  const [currentUserId, setCurrentUserId] = useState(null);

  // Load user ID from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUserId(user.id);
    }
  }, []);

  // Load scores from localStorage when user ID changes
  useEffect(() => {
    if (currentUserId) {
      const storedScores = localStorage.getItem(`testScores_${currentUserId}`);
      if (storedScores) {
        setScores(JSON.parse(storedScores));
      } else {
        // Initialize with empty scores
        setScores({
          englishListening: { current: 0, best: 0 },
          englishReading: { current: 0, best: 0 },
          englishWriting: { current: 0, best: 0 },
          dutchListening: { current: 0, best: 0 },
          dutchReading: { current: 0, best: 0 },
          dutchWriting: { current: 0, best: 0 }
        });
      }
    }
  }, [currentUserId]);

  // Save scores to localStorage whenever they change
  useEffect(() => {
    if (currentUserId) {
      localStorage.setItem(`testScores_${currentUserId}`, JSON.stringify(scores));
    }
  }, [scores, currentUserId]);

  const updateScore = (testId, score) => {
    setScores(prev => {
      const currentScore = prev[testId]?.current || 0;
      const bestScore = prev[testId]?.best || 0;
      
      return {
        ...prev,
        [testId]: {
          current: score,
          best: Math.max(score, bestScore)
        }
      };
    });
  };

  const clearScores = () => {
    const emptyScores = {
      englishListening: { current: 0, best: 0 },
      englishReading: { current: 0, best: 0 },
      englishWriting: { current: 0, best: 0 },
      dutchListening: { current: 0, best: 0 },
      dutchReading: { current: 0, best: 0 },
      dutchWriting: { current: 0, best: 0 }
    };
    setScores(emptyScores);
    if (currentUserId) {
      localStorage.setItem(`testScores_${currentUserId}`, JSON.stringify(emptyScores));
    }
  };

  const setUser = (userId) => {
    setCurrentUserId(userId);
  };

  const logout = () => {
    clearScores();
    setCurrentUserId(null);
  };

  return (
    <TestScoreContext.Provider value={{
      scores,
      updateScore,
      clearScores,
      setUser,
      logout,
      currentUserId
    }}>
      {children}
    </TestScoreContext.Provider>
  );
}; 