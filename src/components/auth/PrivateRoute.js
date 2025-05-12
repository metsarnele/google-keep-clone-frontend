import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = () => {
  const { currentUser, loading } = useAuth();

  // Show loading indicator while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if not authenticated
  return currentUser?.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
