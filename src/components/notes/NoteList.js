import React, { useState } from 'react';
import { Box, Grid, Typography, Paper, TextField } from '@mui/material';
import NoteCard from './NoteCard';
import NoteEditor from './NoteEditor';
import { useNotes } from '../../context/NoteContext';

const NoteList = ({ filter = null }) => {
  const { notes, updateNote, deleteNote, createNote } = useNotes();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [newNoteOpen, setNewNoteOpen] = useState(false);

  // Filter notes based on search term and any other filters
  const filteredNotes = notes.filter(note => {
    // Apply search filter
    const matchesSearch = 
      !searchTerm || 
      note.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      note.content?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply custom filter if provided
    const passesCustomFilter = !filter || filter(note);
    
    return matchesSearch && passesCustomFilter;
  });

  const handleEditNote = (note) => {
    setSelectedNote(note);
    setEditorOpen(true);
  };

  const handleNewNote = () => {
    setSelectedNote(null);
    setNewNoteOpen(true);
  };

  const handleCloseEditor = () => {
    setEditorOpen(false);
    setNewNoteOpen(false);
  };

  const handleSaveNote = async (updatedNote) => {
    try {
      if (updatedNote.id) {
        // Update existing note
        await updateNote(updatedNote.id, updatedNote);
      } else {
        // Create new note
        await createNote(updatedNote);
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Search Box */}
      <Box sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ 
            backgroundColor: 'background.paper',
            borderRadius: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2
            }
          }}
        />
      </Box>

      {/* Create Note Box */}
      <Box sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
        <Paper 
          elevation={1}
          sx={{ 
            p: 2, 
            borderRadius: 2,
            cursor: 'pointer',
            '&:hover': { boxShadow: 3 }
          }}
          onClick={handleNewNote}
        >
          <Typography variant="body1" color="text.secondary">
            Take a note...
          </Typography>
        </Paper>
      </Box>

      {/* Notes Grid */}
      <Grid container spacing={2}>
        {filteredNotes.map(note => (
          <Grid item key={note.id} xs={12} sm={6} md={4} lg={3}>
            <NoteCard
              note={note}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
            />
          </Grid>
        ))}
      </Grid>

      {/* Empty state */}
      {filteredNotes.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No notes found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {searchTerm ? 'Try a different search term' : 'Create your first note!'}
          </Typography>
        </Box>
      )}

      {/* Note Editor Dialog */}
      <NoteEditor
        open={editorOpen}
        note={selectedNote}
        onClose={handleCloseEditor}
        onSave={handleSaveNote}
      />

      {/* New Note Dialog */}
      <NoteEditor
        open={newNoteOpen}
        note={null}
        onClose={handleCloseEditor}
        onSave={handleSaveNote}
      />
    </Box>
  );
};

export default NoteList;
