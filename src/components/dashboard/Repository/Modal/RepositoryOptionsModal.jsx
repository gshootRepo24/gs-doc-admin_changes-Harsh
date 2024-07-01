import React, { useState } from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import ForwardIcon from '@mui/icons-material/Forward';
import AlarmIcon from '@mui/icons-material/Alarm';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import VersionsIcon from '@mui/icons-material/History';
import CheckInIcon from '@mui/icons-material/CheckCircleOutline';
import CheckOutIcon from '@mui/icons-material/HighlightOff';
import DeleteIcon from '@mui/icons-material/Delete';
import MoveIcon from '@mui/icons-material/OpenWith';
import DuplicateIcon from '@mui/icons-material/FileCopy';
import MoveFolderModal from './MoveFolderModal';
import CopyFolderModal from './CopyFolderModal';
import copyFolder from '../../../../api calls/dulpicateFolder';

const OptionsModal = ({ modalOpen, handleModalClose, anchorEl, parentFolder, folderIndex }) => {
  const [copyModalOpen, setCopyModalOpen] = useState(false);
  const [moveFolderModalOpen, setMoveFolderModalOpen] = useState(false);

  const handleCopyClick = () => {
    setCopyModalOpen(true);
    handleModalClose();
  };

  const handleCopyModalClose = () => {
    setCopyModalOpen(false);
  };

  const handleMoveClick = () => {
    setMoveFolderModalOpen(true);
    handleModalClose();
  };

  const handleMoveFolderModalClose = () => {
    setMoveFolderModalOpen(false);
  };

  const handleDuplicateClick = async () => {
    try {
      await copyFolder(folderIndex, parentFolder, parentFolder);
      console.log('Document duplicated successfully');
      handleModalClose();
    } catch (error) {
      console.error('Error duplicating document:', error);
    }
  };

  const getPosition = () => {
    if (anchorEl) {
      const { bottom, top, left } = anchorEl.getBoundingClientRect();
      const modalHeight = 400; // Estimate the modal height
      const windowHeight = window.innerHeight;
      const modalWidth = 200; // Set the modal width
      const windowWidth = window.innerWidth;

      let calculatedTop, calculatedLeft;

      // Check if there's enough space at the bottom
      if (windowHeight - bottom < modalHeight) {
        calculatedTop = top - modalHeight; // Place above
        // Ensure modal does not overflow at the top
        if (calculatedTop < 0) {
          calculatedTop = 0;
        }
      } else {
        calculatedTop = bottom; // Place below
      }

      // Calculate horizontal position to ensure it does not overflow
      calculatedLeft = left - 100; // Adjust as needed
      if (calculatedLeft + modalWidth > windowWidth) {
        calculatedLeft = windowWidth - modalWidth;
      } else if (calculatedLeft < 0) {
        calculatedLeft = 0;
      }

      return { top: calculatedTop, left: calculatedLeft };
    }
    return { top: 0, left: 0 };
  };

  const { top, left } = getPosition();

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        BackdropProps={{ style: { backgroundColor: 'transparent' } }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: top,
            left: left,
            transform: 'translate(-50%, 0)',
            width: 200,
            maxHeight: 400,
            overflowY: 'auto',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 2,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
              borderRadius: '4px',
              border: '2px solid transparent',
              backgroundClip: 'padding-box',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#555',
            },
            '-ms-overflow-style': 'none', // Hide scrollbar for IE and Edge
            'scrollbar-width': 'thin', // Hide scrollbar for Firefox
            'scrollbar-color': '#888 transparent', // For Firefox
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Options
          </Typography>
          <Divider />
          <List>
            <ListItem button aria-label="Forward">
              <ForwardIcon sx={{ mr: 1 }} />
              <ListItemText primary="Forward" />
            </ListItem>
            <ListItem button aria-label="Alarms">
              <AlarmIcon sx={{ mr: 1 }} />
              <ListItemText primary="Alarms" />
            </ListItem>
            <ListItem button aria-label="Print">
              <PrintIcon sx={{ mr: 1 }} />
              <ListItemText primary="Print" />
            </ListItem>
            <ListItem button aria-label="Share">
              <ShareIcon sx={{ mr: 1 }} />
              <ListItemText primary="Share" />
            </ListItem>
            <ListItem button aria-label="Download">
              <DownloadIcon sx={{ mr: 1 }} />
              <ListItemText primary="Download" />
            </ListItem>
            <Divider />
            <ListItem button aria-label="Versions">
              <VersionsIcon sx={{ mr: 1 }} />
              <ListItemText primary="Versions" />
            </ListItem>
            <ListItem button aria-label="Check In">
              <CheckInIcon sx={{ mr: 1 }} />
              <ListItemText primary="Check In" />
            </ListItem>
            <ListItem button aria-label="Check Out">
              <CheckOutIcon sx={{ mr: 1 }} />
              <ListItemText primary="Check Out" />
            </ListItem>
            <Divider />
            <ListItem button aria-label="Delete">
              <DeleteIcon sx={{ mr: 1 }} />
              <ListItemText primary="Delete" />
            </ListItem>
            <ListItem button aria-label="Move" onClick={handleMoveClick}>
              <MoveIcon sx={{ mr: 1 }} />
              <ListItemText primary="Move" />
            </ListItem>
            <ListItem button aria-label="Copy" onClick={handleCopyClick}>
              <DuplicateIcon sx={{ mr: 1 }} />
              <ListItemText primary="Copy" />
            </ListItem>
            <ListItem button aria-label="Duplicate" onClick={handleDuplicateClick}>
              <DuplicateIcon sx={{ mr: 1 }} />
              <ListItemText primary="Duplicate" />
            </ListItem>
          </List>
        </Box>
      </Modal>
      <CopyFolderModal
        modalOpen={copyModalOpen}
        handleModalClose={handleCopyModalClose}
        parentFolder={parentFolder}
        folderIndex={folderIndex}
      />
      <MoveFolderModal
        modalOpen={moveFolderModalOpen}
        handleModalClose={handleMoveFolderModalClose}
        parentFolder={parentFolder}
        folderIndex={folderIndex}
      />
    </>
  );
};

export default OptionsModal;
