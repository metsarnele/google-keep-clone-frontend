import React, { useState } from 'react';
import { Box, Fab, Tooltip } from '@mui/material';
import { Add, Label } from '@mui/icons-material';
import NoteList from '../components/notes/NoteList';
import NoteEditor from '../components/notes/NoteEditor';
import TagManager from '../components/tags/TagManager';
import { useNotes } from '../context/NoteContext';

const Home = () => {
  const { createNote } = useNotes();
  const [newNoteOpen, setNewNoteOpen] = useState(false);
  const [tagManagerOpen, setTagManagerOpen] = useState(false);

  const handleNewNote = () => {
    setNewNoteOpen(true);
  };

  const handleCloseNewNote = () => {
    setNewNoteOpen(false);
  };

  const handleSaveNewNote = async (noteData) => {
    try {
      await createNote(noteData);
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const handleOpenTagManager = () => {
    setTagManagerOpen(true);
  };

  const handleCloseTagManager = () => {
    setTagManagerOpen(false);
  };

  return (
    <Box sx={{ position: 'relative', minHeight: 'calc(100vh - 64px)' }}>
      <NoteList />
      
      {/* Floating action buttons */}
      <Box sx={{ position: 'fixed', bottom: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Tooltip title="Manage Tags" placement="left">
          <Fab color="secondary" aria-label="manage tags" onClick={handleOpenTagManager}>
            <Label />
          </Fab>
        </Tooltip>
        
        <Tooltip title="Add Note" placement="left">
          <Fab color="primary" aria-label="add note" onClick={handleNewNote}>
            <Add />
          </Fab>
        </Tooltip>
      </Box>
      
      {/* New Note Dialog */}
      <NoteEditor
        open={newNoteOpen}
        note={null}
        onClose={handleCloseNewNote}
        onSave={handleSaveNewNote}
      />
      
      {/* Tag Manager Dialog */}
      <TagManager
        open={tagManagerOpen}
        onClose={handleCloseTagManager}
      />
    </Box>
  );
};

export default Home;
