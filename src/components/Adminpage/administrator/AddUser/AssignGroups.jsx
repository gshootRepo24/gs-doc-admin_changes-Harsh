import React, { useState } from "react";
import { Box, TextField, Button, List, ListItem, ListItemText, Chip, Typography, Paper, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const AssignGroups = ({ users, associatedUsers, handleAssociateUser, handleDissociateUser }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [associatedSearchTerm, setAssociatedSearchTerm] = useState("");

  // Check if users data is available
  const userList = users && users.users && users.users.user ? users.users.user : [];

  const filteredUsers = userList.filter((user) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAssociatedUsers = associatedUsers.filter((user) =>
    user.userName.toLowerCase().includes(associatedSearchTerm.toLowerCase())
  );

  if (!users) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  if (userList.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Typography variant="h6">No users available</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="space-between" alignItems="flex-start" padding={2}>
      <Paper elevation={3} sx={{ width: '45%', padding: 2 }}>
        <TextField
          placeholder="Search Groups"
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <List>
          {filteredUsers.map((user) => (
            <ListItem key={user.userIndex} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ListItemText primary={user.userName} />
              <Button variant="contained" onClick={() => handleAssociateUser(user)}>
                Associate
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
      
      <Paper elevation={3} sx={{ width: '45%', padding: 2 }}>
        <TextField
          placeholder="Search Associated Groups"
          onChange={(e) => setAssociatedSearchTerm(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box display="flex" flexWrap="wrap" gap={1}>
          {filteredAssociatedUsers.map((user) => (
            <Chip
              key={user.userIndex}
              label={user.userName}
              onDelete={() => handleDissociateUser(user)}
              sx={{
                backgroundColor: '#1976d2',
                color: '#fff',
                '& .MuiChip-deleteIcon': {
                  color: '#fff',
                }
              }}
            />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default AssignGroups;
