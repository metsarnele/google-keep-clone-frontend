import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  TextField,
  Typography,
  Box,
  Divider
} from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';
import { useTags } from '../../context/TagContext';

const TagManager = ({ open, onClose }) => {
  const { tags, createTag, updateTag, deleteTag } = useTags();
  const [newTagName, setNewTagName] = useState('');
  const [editingTag, setEditingTag] = useState(null);
  const [editTagName, setEditTagName] = useState('');
  const [error, setError] = useState('');

  const handleCreateTag = async () => {
    if (!newTagName.trim()) {
      setError('Tag name cannot be empty');
      return;
    }

    try {
      await createTag(newTagName);
      setNewTagName('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create tag');
    }
  };

  const handleStartEdit = (tag) => {
    setEditingTag(tag);
    setEditTagName(tag.name);
  };

  const handleCancelEdit = () => {
    setEditingTag(null);
    setEditTagName('');
  };

  const handleSaveEdit = async () => {
    if (!editTagName.trim()) {
      setError('Tag name cannot be empty');
      return;
    }

    try {
      await updateTag(editingTag.id, editTagName);
      setEditingTag(null);
      setEditTagName('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update tag');
    }
  };

  const handleDeleteTag = async (tagId) => {
    try {
      await deleteTag(tagId);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete tag');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Manage Tags</DialogTitle>
      <DialogContent>
        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {/* Create new tag */}
        <Box sx={{ display: 'flex', mb: 2 }}>
          <TextField
            fullWidth
            size="small"
            label="New Tag"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCreateTag()}
          />
          <IconButton color="primary" onClick={handleCreateTag}>
            <Add />
          </IconButton>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Tag list */}
        <List>
          {tags.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              No tags created yet
            </Typography>
          ) : (
            tags.map((tag) => (
              <ListItem
                key={tag.id}
                secondaryAction={
                  <>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleStartEdit(tag)}>
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTag(tag.id)}>
                      <Delete />
                    </IconButton>
                  </>
                }
              >
                <ListItemText primary={tag.name} />
              </ListItem>
            ))
          )}
        </List>

        {/* Edit tag dialog */}
        <Dialog open={!!editingTag} onClose={handleCancelEdit}>
          <DialogTitle>Edit Tag</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Tag Name"
              fullWidth
              value={editTagName}
              onChange={(e) => setEditTagName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelEdit}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save</Button>
          </DialogActions>
        </Dialog>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TagManager;
