import React, { createContext, useState, useEffect, useContext } from 'react';
import TagService from '../services/tagService';
import { useAuth } from './AuthContext';

// Create the context
const TagContext = createContext();

// Create a provider component
export const TagProvider = ({ children }) => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  // Fetch tags when the user is authenticated
  useEffect(() => {
    const fetchTags = async () => {
      if (!currentUser?.isAuthenticated) {
        setTags([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await TagService.getTags();
        setTags(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch tags');
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, [currentUser]);

  // Create a new tag
  const createTag = async (name) => {
    try {
      setLoading(true);
      const result = await TagService.createTag(name);
      setTags([...tags, result.tag]);
      return result;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create tag');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update a tag
  const updateTag = async (tagId, name) => {
    try {
      setLoading(true);
      await TagService.updateTag(tagId, name);
      setTags(tags.map(tag => tag.id === tagId ? { ...tag, name } : tag));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update tag');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a tag
  const deleteTag = async (tagId) => {
    try {
      setLoading(true);
      await TagService.deleteTag(tagId);
      setTags(tags.filter(tag => tag.id !== tagId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete tag');
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
    tags,
    loading,
    error,
    createTag,
    updateTag,
    deleteTag,
    clearError
  };

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
};

// Custom hook to use the tag context
export const useTags = () => {
  const context = useContext(TagContext);
  if (!context) {
    throw new Error('useTags must be used within a TagProvider');
  }
  return context;
};

export default TagContext;
