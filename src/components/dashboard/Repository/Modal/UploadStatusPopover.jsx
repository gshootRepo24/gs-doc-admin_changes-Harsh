import React from 'react';
import { Box, Typography, Divider, Popover } from '@mui/material';

const UploadStatusPopover = ({ id, open, anchorEl, onClose, successFiles, failedFiles, duplicateFiles }) => {
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Box sx={{ p: 3, minWidth: 250, backgroundColor: '#f9f9f9' }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#1976d2' }}>Upload Status</Typography>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'green', mr: 1 }}></Box>
            <Typography variant="body1">Success: {successFiles.length}</Typography>
          </Box>
          {successFiles.length > 0 && (
            <Typography variant="body2" sx={{ color: '#666', ml: 3 }}>{successFiles.map(fileObj => fileObj.file.name).join(', ')}</Typography>
          )}
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'red', mr: 1 }}></Box>
            <Typography variant="body1">Failed: {failedFiles.length}</Typography>
          </Box>
          {failedFiles.length > 0 && (
            <Typography variant="body2" sx={{ color: '#666', ml: 3 }}>{failedFiles.map(fileObj => fileObj.file.name).join(', ')}</Typography>
          )}
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'yellow', mr: 1 }}></Box>
            <Typography variant="body1">Duplicate: {duplicateFiles.length}</Typography>
          </Box>
          {duplicateFiles.length > 0 && (
            <Typography variant="body2" sx={{ color: '#666', ml: 3 }}>{duplicateFiles.map(fileObj => fileObj.file.name).join(', ')}</Typography>
          )}
        </Box>
      </Box>
    </Popover>
  );
};

export default UploadStatusPopover;
