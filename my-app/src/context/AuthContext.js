import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Function to verify token on load
  const verifyToken = async () => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        const response = await fetch('http://localhost:5000/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${storedToken}`
          }
        });

        if (!response.ok) {
          console.log('Token verification failed, logging out');
          logout();
          return;
        }

        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error verifying token:', error);
        logout();
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const login = (newToken, newUser) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Set new data
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    // Update state synchronously
    setToken(newToken);
    setUser(newUser);
    
    // Force a state update
    setRefreshTrigger(Date.now());
  };

  const logout = () => {
    // Clear auth data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Clear any cached data
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          caches.delete(cacheName);
        });
      });
    }
    
    // Update state synchronously
    setToken(null);
    setUser(null);
    
    // Force a state update
    setRefreshTrigger(Date.now());

    // Clear test scores for the current user
    if (user && user.id) {
      localStorage.removeItem(`testScores_${user.id}`);
    }
  };

  const isAuthenticated = () => {
    return !!token && !!user;
  };

  useEffect(() => {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const [resource, config] = args;
      
      if (token) {
        config.headers = {
          ...config.headers,
          'Authorization': `Bearer ${token}`
        };
      }

      try {
        const response = await originalFetch(resource, config);
        if (response.status === 401) {
          const data = await response.json();
          console.log('Received 401 response:', data);
          if (data.message === 'Server was restarted. Please log in again.') {
            console.log('Server was restarted, logging out...');
            logout();
            if (window.location.pathname !== '/') {
              window.location.href = '/';
            }
          }
        }
        return response;
      } catch (error) {
        console.error('Fetch error:', error);
        throw error;
      }
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      loading, 
      login, 
      logout, 
      isAuthenticated,
      refreshTrigger 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 