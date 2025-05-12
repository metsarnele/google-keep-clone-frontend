import api from './api';

const NoteService = {
  // Get all notes
  getNotes: async () => {
    try {
      const response = await api.get('/notes');
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      throw error;
    }
  },

  // Create a new note
  createNote: async (noteData) => {
    try {
      const response = await api.post('/notes', noteData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update a note
  updateNote: async (noteId, noteData) => {
    try {
      const response = await api.patch(`/notes/${noteId}`, noteData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete a note
  deleteNote: async (noteId) => {
    try {
      await api.delete(`/notes/${noteId}`);
      return true;
    } catch (error) {
      throw error;
    }
  }
};

export default NoteService;
