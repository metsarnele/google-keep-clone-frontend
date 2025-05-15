import React from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Toolbar,
  Divider
} from '@mui/material';
import { 
  LightbulbOutlined
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTags } from '../../context/TagContext';

const Sidebar = ({ open, drawerWidth }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tags } = useTags();

  const mainMenuItems = [
    { text: 'Notes', icon: <LightbulbOutlined />, path: '/' }
  ];

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <List>
        {mainMenuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      
      <Divider />
      
      <List>
        {tags.map((tag) => (
          <ListItem 
            button 
            key={tag.id} 
            onClick={() => navigate(`/tags/${tag.id}`)}
            selected={location.pathname === `/tags/${tag.id}`}
            sx={{ pl: 4 }}
          >
            <ListItemText primary={tag.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
