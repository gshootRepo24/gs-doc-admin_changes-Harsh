import React from "react";
import "./AddUser.css";
import { Box, TextField, Button, List, ListItem, ListItemText } from "@mui/material";

const Application = ({ roles, assignedRoles, handleSearchRoles, handleSearchAssignedRoles }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      <TextField placeholder="Search Roles" onChange={handleSearchRoles} sx={{ marginBottom: 2 }} />
      <List>
        {roles.map((role) => (
          <ListItem key={role}>
            <ListItemText primary={role} />
            <Button variant="contained" onClick={() => handleAssociateUser(role)}>
              Assign
            </Button>
          </ListItem>
        ))}
      </List>
      <TextField placeholder="Search Assigned Roles" onChange={handleSearchAssignedRoles} sx={{ marginBottom: 2 }} />
      <List>
        {assignedRoles.map((role) => (
          <ListItem key={role}>
            <ListItemText primary={role} />
            <Button variant="contained" onClick={() => handleDissociateUser(role)}>
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Application;
