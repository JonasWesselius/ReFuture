import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  // Function to verify token on load
  useEffect(() => {
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

    verifyToken();
  }, []);

  const login = (newToken, newUser) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const isAuthenticated = () => {
    return !!token && !!user;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      loading, 
      login, 
      logout, 
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 