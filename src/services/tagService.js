import api from './api';

const TagService = {
  // Get all tags
  getTags: async () => {
    try {
      const response = await api.get('/tags');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create a new tag
  createTag: async (name) => {
    try {
      const response = await api.post('/tags', { name });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update a tag
  updateTag: async (tagId, name) => {
    try {
      const response = await api.patch(`/tags/${tagId}`, { name });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete a tag
  deleteTag: async (tagId) => {
    try {
      await api.delete(`/tags/${tagId}`);
      return true;
    } catch (error) {
      throw error;
    }
  }
};

export default TagService;
