import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  IconButton,
  DialogActions,
  Button,
  Typography,
  Divider,
  Paper,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/system';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogTitle-root': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
}));

const FolderBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const AddFolderDialog = ({
  open,
  onClose,
  handleNameInputChange,
  handleAddFolderCloseModalCancel,
  handleAddFolderCloseModalAdd,
  handleAddMore,
  addFolderName,
  listOfAddedFolders,
  handleRemoveFolder,
}) => {
  return (
    <StyledDialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Folder</DialogTitle>
      <DialogContent dividers>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          value={addFolderName}
          onChange={handleNameInputChange}
          InputLabelProps={{ shrink: true }}
        />
        <Box mt={3}>
          <Typography variant="subtitle1" gutterBottom>
            Added Folders
          </Typography>
          <Divider />
          {listOfAddedFolders.length > 0 ? (
            listOfAddedFolders.map((folder, index) => (
              <FolderBox key={index} elevation={2}>
                <Typography variant="body1">{folder}</Typography>
                <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFolder(index)}>
                  <ClearIcon />
                </IconButton>
              </FolderBox>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary" mt={2}>
              No folders added
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddFolderCloseModalCancel} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleAddFolderCloseModalAdd} color="primary" variant="contained" startIcon={<AddIcon />}>
          Add
        </Button>
        <Button onClick={handleAddMore} color="primary" variant="outlined">
          Add More
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default AddFolderDialog;
