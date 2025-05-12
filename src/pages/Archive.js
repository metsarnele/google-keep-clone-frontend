import React from 'react';
import { Box, Typography } from '@mui/material';
import NoteList from '../components/notes/NoteList';
import { useNotes } from '../context/NoteContext';

const Archive = () => {
  const { updateNote } = useNotes();
  
  // Filter function to only show archived notes
  const filterArchivedNotes = (note) => note.archived === true;

  // Handle unarchiving a note
  const handleUnarchive = async (noteId) => {
    try {
      await updateNote(noteId, { archived: false });
    } catch (error) {
      console.error('Error unarchiving note:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Archive
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Notes in archive are stored here. They are not visible in your main notes view.
      </Typography>
      <NoteList 
        filter={filterArchivedNotes} 
        onUnarchive={handleUnarchive}
      />
    </Box>
  );
};

export default Archive;
