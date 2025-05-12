import api from './api';

const AuthService = {
  // Register a new user
  register: async (username, password) => {
    try {
      const response = await api.post('/users', { username, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Login user
  login: async (username, password) => {
    try {
      const response = await api.post('/sessions', { username, password });
      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    try {
      await api.delete('/sessions');
      // Remove token from localStorage
      localStorage.removeItem('token');
      return true;
    } catch (error) {
      throw error;
    }
  },

  // Update user details
  updateUser: async (userId, userData) => {
    try {
      const response = await api.patch(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete user account
  deleteUser: async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      // Remove token from localStorage
      localStorage.removeItem('token');
      return true;
    } catch (error) {
      throw error;
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default AuthService;
