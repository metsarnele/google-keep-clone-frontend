import React from 'react';
import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  IconButton, 
  Chip,
  Box,
  Tooltip
} from '@mui/material';
import { 
  DeleteOutline, 
  PaletteOutlined
} from '@mui/icons-material';
import { useTags } from '../../context/TagContext';

const NoteCard = ({ 
  note, 
  onEdit, 
  onDelete
}) => {
  const { tags } = useTags();
  
  // Find tag names for the note
  const noteTags = tags.filter(tag => note.tags && note.tags.includes(tag.id));

  return (
    <Card 
      sx={{ 
        minWidth: 240, 
        maxWidth: 345, 
        m: 1, 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        '&:hover': {
          boxShadow: 3
        }
      }}
      onClick={() => onEdit && onEdit(note)}
    >
      <CardContent sx={{ flexGrow: 1, pb: 0 }}>
        {note.title && (
          <Typography variant="h6" component="div" gutterBottom>
            {note.title}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          {note.content}
        </Typography>
        
        {/* Tags */}
        {noteTags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
            {noteTags.map(tag => (
              <Chip 
                key={tag.id} 
                label={tag.name} 
                size="small" 
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle tag click if needed
                }}
              />
            ))}
          </Box>
        )}
        
        {/* Reminder */}
        {note.reminder && (
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Reminder: {new Date(note.reminder).toLocaleString()}
          </Typography>
        )}
      </CardContent>
      
      <CardActions disableSpacing>
        <Tooltip title="Change color">
          <IconButton 
            aria-label="change color" 
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              // Color change not supported by backend
            }}
          >
            <PaletteOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton 
            aria-label="delete" 
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onDelete && onDelete(note.id);
            }}
          >
            <DeleteOutline fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default NoteCard;
