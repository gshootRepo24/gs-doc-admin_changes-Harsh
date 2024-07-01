import React, { useState, useEffect } from 'react';
import { Paper, Box, Menu, MenuItem, IconButton, InputBase, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Add as AddIcon, MoreVert as MoreVertIcon, Search as SearchIcon, Person as PersonIcon } from '@mui/icons-material';

const UserPanel = ({ data, onUserClick , setIsUserSelected, setSelectedUserIndex, setSelectedUserName, setSelectedComment}) => {
  const [viewAnchorEl, setViewAnchorEl] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data && data.status === 0 && data.users && Array.isArray(data.users.user)) {
      setUsers(data.users.user);
      setError(null);
    } else {
      setError('Error fetching user data');
      setUsers([]);
    }
  }, [data]);

  const handleClick = (event) => {
    setViewAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setViewAnchorEl(null);
  };

  const handleAddUser=(event)=>{
    setIsUserSelected(false);
    setSelectedUserName("");
    setSelectedComment("");
    setSelectedUserIndex(null);
  }

  return (
    <Paper sx={{ height: '100%', padding: 2, display: 'flex', flexDirection: 'column', boxShadow: 3, borderRadius: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Users</Box>
        <Box>
          <IconButton color="primary" onClick={handleAddUser}>
            <AddIcon />
          </IconButton>
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={viewAnchorEl}
            open={Boolean(viewAnchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Password policy</MenuItem>
            <MenuItem onClick={handleClose}>Name Display Style</MenuItem>
          </Menu>
        </Box>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', alignItems: 'center', padding: '2px 4px', marginBottom: 2, backgroundColor: '#f1f1f1', borderRadius: 1 }}>
        <SearchIcon sx={{ color: 'gray' }} />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search User"
          inputProps={{ 'aria-label': 'search user' }}
        />
      </Box>
      {error ? (
        <Typography color="error" sx={{ textAlign: 'center', marginTop: 2 }}>
          {error}
        </Typography>
      ) : (
        <List sx={{ overflowY: 'auto' }}>
          {users.length > 0 ? (
            users.map((user) => (
              <ListItem 
                key={user.userIndex} 
                sx={{ borderRadius: 1, '&:hover': { backgroundColor: '#f1f1f1' } }}
                onClick={() => onUserClick(user)}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={user.userName || user.personalName || user.familyName || 'Unknown'} 
                  secondary={user.mailId} 
                />
              </ListItem>
            ))
          ) : (
            <Typography sx={{ textAlign: 'center', marginTop: 2 }}>
              No users found.
            </Typography>
          )}
        </List>
      )}
    </Paper>
  );
};

export default UserPanel;
