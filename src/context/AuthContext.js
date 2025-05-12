import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthService from '../services/authService';

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (AuthService.isAuthenticated()) {
          // In a real app, you'd fetch user details here
          setCurrentUser({ isAuthenticated: true });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Register a new user
  const register = async (username, password) => {
    try {
      setLoading(true);
      const result = await AuthService.register(username, password);
      return result;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (username, password) => {
    try {
      setLoading(true);
      const result = await AuthService.login(username, password);
      
      // Extract user info from token if available
      if (result.token) {
        try {
          // Decode JWT token to get user info (without verification)
          const base64Url = result.token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          
          const payload = JSON.parse(jsonPayload);
          setCurrentUser({
            isAuthenticated: true,
            id: payload.id,
            username: payload.username
          });
        } catch (decodeError) {
          // If token decoding fails, just set as authenticated
          setCurrentUser({ isAuthenticated: true });
        }
      } else {
        setCurrentUser({ isAuthenticated: true });
      }
      
      return result;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      setLoading(true);
      await AuthService.logout();
      setCurrentUser(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Logout failed');
    } finally {
      setLoading(false);
    }
  };

  // Clear any errors
  const clearError = () => {
    setError(null);
  };

  // Context value
  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
