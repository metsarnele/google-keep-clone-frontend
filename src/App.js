import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { NoteProvider } from './context/NoteContext';
import { TagProvider } from './context/TagContext';

// Layout
import Layout from './components/layout/Layout';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/auth/PrivateRoute';

// Pages
import Home from './pages/Home';
import TagNotes from './pages/TagNotes';
import Profile from './pages/Profile';

function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  // Create theme based on dark mode preference
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: darkMode ? '#bb86fc' : '#ffc107',
          },
          secondary: {
            main: darkMode ? '#03dac6' : '#ff5722',
          },
          background: {
            default: darkMode ? '#121212' : '#f5f5f5',
            paper: darkMode ? '#1e1e1e' : '#ffffff',
          },
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: darkMode ? '#1e1e1e' : '#ffc107',
              },
            },
          },
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <NoteProvider>
          <TagProvider>
            <Router>
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected routes */}
                <Route element={<Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}>
                  <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/tags/:tagId" element={<TagNotes />} />
                    <Route path="/profile" element={<Profile />} />
                  </Route>
                </Route>
                
                {/* Redirect any unknown routes to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
          </TagProvider>
        </NoteProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
