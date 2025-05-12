import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Divider, 
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import AuthService from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const handleUpdateUsername = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    if (!username.trim()) {
      setError('Username cannot be empty');
      return;
    }
    
    try {
      setLoading(true);
      await AuthService.updateUser(currentUser.id, { username });
      setMessage('Username updated successfully');
      setUsername('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update username');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All password fields are required');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    try {
      setLoading(true);
      await AuthService.updateUser(currentUser.id, { 
        currentPassword, 
        password: newPassword 
      });
      setMessage('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setDeleteConfirmText('');
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      setError('Please type DELETE to confirm account deletion');
      return;
    }
    
    try {
      setLoading(true);
      await AuthService.deleteUser(currentUser.id);
      await logout();
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete account');
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Account Settings
        </Typography>
        
        {message && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {message}
          </Alert>
        )}
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {/* Update Username */}
        <Box component="form" onSubmit={handleUpdateUsername} sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Update Username
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            label="New Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button 
            type="submit" 
            variant="contained" 
            sx={{ mt: 2 }}
            disabled={loading}
          >
            Update Username
          </Button>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        {/* Update Password */}
        <Box component="form" onSubmit={handleUpdatePassword} sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Change Password
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button 
            type="submit" 
            variant="contained" 
            sx={{ mt: 2 }}
            disabled={loading}
          >
            Update Password
          </Button>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        {/* Delete Account */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom color="error">
            Danger Zone
          </Typography>
          <Typography variant="body2" gutterBottom>
            Once you delete your account, there is no going back. Please be certain.
          </Typography>
          <Button 
            variant="outlined" 
            color="error" 
            onClick={handleOpenDeleteDialog}
            disabled={loading}
          >
            Delete Account
          </Button>
        </Box>
      </Paper>
      
      {/* Delete Account Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. All your notes and data will be permanently deleted.
            To confirm, please type DELETE in the field below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            value={deleteConfirmText}
            onChange={(e) => setDeleteConfirmText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteAccount} color="error">
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;
