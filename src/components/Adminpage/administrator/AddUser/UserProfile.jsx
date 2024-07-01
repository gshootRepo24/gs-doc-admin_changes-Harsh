// UserProfile.js
import React from 'react';
import { Box, IconButton, Avatar, Typography, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserProfile = ({ selectedUserName, selectedComment }) => {
  return (
    <Box display="flex" alignItems="center" p={2} borderBottom={1} borderColor="divider">
      <Box position="relative" display="inline-block">
        <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main' }}>
          <AccountCircleIcon sx={{ width: 64, height: 64 }} />
        </Avatar>
        <IconButton
          size="small"
          sx={{ position: 'absolute', top: -5, right: -5, bgcolor: 'background.paper', borderRadius: '50%' }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box ml={2}>
        <Typography variant="h6">
          {selectedUserName || "Enter the user name"}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {selectedComment || "Add your description here"}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserProfile;
