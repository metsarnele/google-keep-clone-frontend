import React from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import NoteList from '../components/notes/NoteList';
import { useTags } from '../context/TagContext';

const TagNotes = () => {
  const { tagId } = useParams();
  const { tags } = useTags();
  
  // Find the tag name
  const tag = tags.find(t => t.id === tagId);
  
  // Filter function to only show notes with this tag
  const filterNotesByTag = (note) => note.tags && note.tags.includes(tagId);

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        {tag ? `Tag: ${tag.name}` : 'Tag Notes'}
      </Typography>
      <NoteList filter={filterNotesByTag} />
    </Box>
  );
};

export default TagNotes;
