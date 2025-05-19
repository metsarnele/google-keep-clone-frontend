import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Autocomplete,
  Chip,
  Box,
  IconButton
} from '@mui/material';
import { Close, PushPin, PushPinOutlined } from '@mui/icons-material';
import { useTags } from '../../context/TagContext';

const NoteEditor = ({ open, note, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [reminder, setReminder] = useState('');
  const [pinned, setPinned] = useState(false);
  const { tags } = useTags();

  // Initialize form when note changes
  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setContent(note.content || '');
      setPinned(note.pinned || false);
      
      // Set selected tags
      if (note.tags && note.tags.length > 0) {
        const noteTags = tags.filter(tag => note.tags.includes(tag.id));
        setSelectedTags(noteTags);
      } else {
        setSelectedTags([]);
      }
      
      // Set reminder if exists
      if (note.reminder) {
        // Format date for datetime-local input
        const reminderDate = new Date(note.reminder);
        const formattedDate = reminderDate.toISOString().slice(0, 16);
        setReminder(formattedDate);
      } else {
        setReminder('');
      }
    } else {
      // Clear form for new note
      setTitle('');
      setContent('');
      setSelectedTags([]);
      setReminder('');
      setPinned(false);
    }
  }, [note, tags]);

  const handleSave = () => {
    // Trim input values
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    
    // Don't save empty notes
    if (!trimmedTitle && !trimmedContent) {
      onClose();
      return;
    }

    const updatedNote = {
      ...(note || {}),
      title: trimmedTitle,
      content: trimmedContent,
      tags: selectedTags.map(tag => tag.id),
      reminder: reminder ? new Date(reminder).toISOString() : null,
      pinned
    };

    onSave(updatedNote);
    onClose();
  };

  const togglePin = () => {
    setPinned(!pinned);
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 1
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 0 }}>
        <Box sx={{ visibility: 'hidden' }}>Placeholder</Box>
        <IconButton onClick={togglePin} sx={{ ml: 'auto' }}>
          {pinned ? <PushPin /> : <PushPinOutlined />}
        </IconButton>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          placeholder="Title"
          fullWidth
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          InputProps={{ disableUnderline: true }}
          sx={{ mb: 2 }}
        />
        
        <TextField
          placeholder="Take a note..."
          fullWidth
          multiline
          rows={4}
          variant="standard"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          InputProps={{ disableUnderline: true }}
        />
        
        <Box sx={{ mt: 2 }}>
          <Autocomplete
            multiple
            id="tags-standard"
            options={tags}
            getOptionLabel={(option) => option.name}
            value={selectedTags}
            onChange={(event, newValue) => {
              setSelectedTags(newValue);
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option.name}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Tags"
                placeholder="Add tags"
              />
            )}
          />
        </Box>
        
        <TextField
          margin="dense"
          id="reminder"
          label="Reminder"
          type="datetime-local"
          fullWidth
          variant="standard"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteEditor;
