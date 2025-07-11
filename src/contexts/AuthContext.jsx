import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if token is valid
  const validateToken = async (token) => {
    try {
      const response = await fetch("http://localhost:5001/api/users/current", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    // Check if user is authenticated on app load
    const token = localStorage.getItem('token');
    if (token) {
      // Validate the token
      validateToken(token).then(isValid => {
        if (isValid) {
          setIsAuthenticated(true);
        } else {
          // Token is invalid, clean up
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          sessionStorage.clear();
          setIsAuthenticated(false);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Clean up any old user data
    // Clear any other potential user-related data
    sessionStorage.clear(); // Clear session storage
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 