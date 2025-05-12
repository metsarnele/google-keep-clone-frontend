import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';

const drawerWidth = 240;

const Layout = ({ darkMode, toggleDarkMode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { currentUser } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header 
        toggleSidebar={toggleSidebar} 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
      />
      
      {currentUser?.isAuthenticated && (
        <Sidebar open={sidebarOpen} drawerWidth={drawerWidth} />
      )}
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${sidebarOpen && currentUser?.isAuthenticated ? drawerWidth : 0}px)` },
          ml: { sm: sidebarOpen && currentUser?.isAuthenticated ? `${drawerWidth}px` : 0 },
          transition: theme => theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar /> {/* This adds space below the app bar */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
