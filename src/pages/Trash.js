import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { RestoreFromTrash, DeleteForever } from '@mui/icons-material';
import NoteList from '../components/notes/NoteList';
import { useNotes } from '../context/NoteContext';

const Trash = () => {
  const { notes, updateNote, deleteNote } = useNotes();
  
  // Filter function to only show trashed notes
  const filterTrashedNotes = (note) => note.trashed === true;
  
  // Get all trashed notes
  const trashedNotes = notes.filter(filterTrashedNotes);

  // Handle restoring a note from trash
  const handleRestore = async (noteId) => {
    try {
      await updateNote(noteId, { trashed: false });
    } catch (error) {
      console.error('Error restoring note:', error);
    }
  };

  // Handle permanently deleting a note
  const handlePermanentDelete = async (noteId) => {
    try {
      await deleteNote(noteId);
    } catch (error) {
      console.error('Error permanently deleting note:', error);
    }
  };

  // Handle emptying the trash (delete all trashed notes)
  const handleEmptyTrash = async () => {
    try {
      // Delete all trashed notes one by one
      const deletePromises = trashedNotes.map(note => deleteNote(note.id));
      await Promise.all(deletePromises);
    } catch (error) {
      console.error('Error emptying trash:', error);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">
          Trash
        </Typography>
        {trashedNotes.length > 0 && (
          <Button 
            variant="outlined" 
            color="error" 
            startIcon={<DeleteForever />}
            onClick={handleEmptyTrash}
          >
            Empty Trash
          </Button>
        )}
      </Box>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Notes in trash will be permanently deleted after 7 days. 
        You can restore notes from trash or delete them permanently.
      </Typography>
      
      <NoteList 
        filter={filterTrashedNotes} 
        onRestore={handleRestore}
        onPermanentDelete={handlePermanentDelete}
      />
    </Box>
  );
};

export default Trash;
