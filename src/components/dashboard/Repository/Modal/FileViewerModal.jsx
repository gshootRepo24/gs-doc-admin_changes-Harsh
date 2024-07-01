import React, { useState } from 'react';
import { Modal, Box, Typography, IconButton, ButtonGroup, useTheme } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const FileViewerModal = ({ open, onClose, fileUrl, fileType, onPrevFile, onNextFile, hasPrevFile, hasNextFile }) => {
  const [zoom, setZoom] = useState(1);
  const theme = useTheme();

  const handleZoomIn = () => setZoom(prevZoom => Math.min(prevZoom + 0.1, 3));
  const handleZoomOut = () => setZoom(prevZoom => Math.max(prevZoom - 0.1, 0.5));
  const handleResetZoom = () => setZoom(1);

  const renderFileContent = () => {
    if (fileType.startsWith('image/')) {
      return <img src={fileUrl} alt="Document" style={{ width: `${zoom * 100}%`, height: 'auto' }} />;
    } else if (fileType === 'application/pdf') {
      return (
        <object data={fileUrl} type={fileType} width="100%" height="600px" style={{ zoom }}>
          <p>It appears you don't have a PDF plugin for this browser. No biggie... you can <a href={fileUrl}>click here to download the PDF file.</a></p>
        </object>
      );
    } else if (fileType.startsWith('text/')) {
      return (
        <iframe src={fileUrl} title="Document" style={{ width: '100%', height: '600px', border: 'none', zoom }}>
          Your browser does not support iframes. <a href={fileUrl}>Click here to download the document.</a>
        </iframe>
      );
    } else {
      return (
        <Typography id="file-modal-description" sx={{ mt: 2 }}>
          Unable to display the document. <a href={fileUrl} target="_blank" rel="noopener noreferrer">Click here to download.</a>
        </Typography>
      );
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="file-modal-title"
      aria-describedby="file-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          bgcolor: 'background.paper',
          boxShadow: theme.shadows[24],
          p: 4,
          maxHeight: '80vh',
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <Typography id="file-modal-title" variant="h6" component="h2" mb={2}>
          Document Viewer
        </Typography>
        <ButtonGroup variant="outlined" aria-label="zoom controls" sx={{ mb: 2, justifyContent: 'center', width: '100%' }}>
          <IconButton onClick={handleZoomIn} aria-label="zoom in" sx={{ mx: 1 }}>
            <ZoomInIcon />
          </IconButton>
          <IconButton onClick={handleZoomOut} aria-label="zoom out" sx={{ mx: 1 }}>
            <ZoomOutIcon />
          </IconButton>
          <IconButton onClick={handleResetZoom} aria-label="reset zoom" sx={{ mx: 1 }}>
            <RefreshIcon />
          </IconButton>
          <IconButton
            component="a"
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="download"
            sx={{ mx: 1 }}
          >
            <DownloadIcon />
          </IconButton>
        </ButtonGroup>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'auto',
            border: '1px solid #ddd',
            borderRadius: 1,
            padding: 2,
            maxHeight: 'calc(80vh - 100px)', // Adjust the height based on padding and other elements
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
          }}
        >
          <IconButton onClick={onPrevFile} aria-label="previous file" disabled={!hasPrevFile} sx={{ mx: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
            {renderFileContent()}
          </Box>
          <IconButton onClick={onNextFile} aria-label="next file" disabled={!hasNextFile} sx={{ mx: 1 }}>
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default FileViewerModal;
