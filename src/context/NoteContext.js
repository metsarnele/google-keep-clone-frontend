import React, { createContext, useState, useEffect, useContext } from 'react';
import NoteService from '../services/noteService';
import { useAuth } from './AuthContext';

// Create the context
const NoteContext = createContext();

// Create a provider component
export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  // Fetch notes when the user is authenticated
  useEffect(() => {
    const fetchNotes = async () => {
      if (!currentUser?.isAuthenticated) {
        setNotes([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await NoteService.getNotes();
        setNotes(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch notes');
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [currentUser]);

  // Create a new note
  const createNote = async (noteData) => {
    try {
      setLoading(true);
      const result = await NoteService.createNote(noteData);
      setNotes([...notes, result.note]);
      return result;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create note');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update a note
  const updateNote = async (noteId, noteData) => {
    try {
      setLoading(true);
      await NoteService.updateNote(noteId, noteData);
      setNotes(notes.map(note => note.id === noteId ? { ...note, ...noteData } : note));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update note');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a note
  const deleteNote = async (noteId) => {
    try {
      setLoading(true);
      await NoteService.deleteNote(noteId);
      setNotes(notes.filter(note => note.id !== noteId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete note');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Clear any errors
  const clearError = () => {
    setError(null);
  };

  // Context value
  const value = {
    notes,
    loading,
    error,
    createNote,
    updateNote,
    deleteNote,
    clearError
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};

// Custom hook to use the note context
export const useNotes = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error('useNotes must be used within a NoteProvider');
  }
  return context;
};

export default NoteContext;
