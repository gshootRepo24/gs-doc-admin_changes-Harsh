import React, { useState, useRef } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button,
  TextField, Box, Typography, IconButton, Grid, Snackbar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BasicBreadcrumbs from '../Breadcrumbs/Breadcrumbs';
import FileDropzone from './FileDropzone';
import UploadStatusPopover from './UploadStatusPopover';
import { uploadDocument } from '../../../../api calls/addDocument';
import { mapDocumentInDB } from '../../../../api calls/mapDocumentInDB';
import './AddDocumentModal.scss'; // Ensure you have the correct path to your custom styles

const AddDocumentModal = (props) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadStatusOpen, setUploadStatusOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [successFiles, setSuccessFiles] = useState([]);
  const [failedFiles, setFailedFiles] = useState([]);
  const [duplicateFiles, setDuplicateFiles] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const fileInputRef = useRef();

  const handleFileChange = (files) => {
    const filesWithProgress = files.map(file => ({ file, progress: 0 }));
    setSelectedFiles([...selectedFiles, ...filesWithProgress]);
  };

  const handleUpload = async (closeAfterUpload) => {
    setSuccessFiles([]);
    setFailedFiles([]);
    setDuplicateFiles([]);

    let newSuccessFiles = [];
    let newFailedFiles = [];

    for (const fileObj of selectedFiles) {
      try {
        const response = await uploadDocument(props.lookInFolderVolumeIdx, fileObj.file);
        if (response.status === 200) {
          newSuccessFiles.push(fileObj);
          if (response.data.status === 0) {
            const documentIndex = response.data.documentIndex;
            const volumeIndex = props.lookInFolderVolumeIdx;
            const index = `${documentIndex}#${volumeIndex}#`;
            const fileExtension = fileObj.file.name.split('.').pop();

            await mapDocumentInDB(
              props.lookInsideId,
              '1',
              'I',
              fileObj.file.name,
              'I',
              fileObj.file.size,
              fileExtension,
              index,
              'Y'
            );
            if(closeAfterUpload)
              props.setReload(prev => !prev);
          }
        } else {
          newFailedFiles.push(fileObj);
          if(closeAfterUpload)
            props.setReload(prev => !prev);
        }
      } catch (error) {
        console.error('Upload error:', error);
        newFailedFiles.push(fileObj);
        if(closeAfterUpload)
          props.setReload(prev => !prev);
      }
    }

    setSuccessFiles(newSuccessFiles);
    setFailedFiles(newFailedFiles);

    const message = newSuccessFiles.length > 0
      ? `${newSuccessFiles.length} files uploaded successfully`
      : 'File upload failed';
    setSnackbarMessage(message);
    setSnackbarOpen(true);

    setUploadStatusOpen(true);

    if (closeAfterUpload && newSuccessFiles.length > 0) {
      props.onClose();
      setSelectedFiles([]);
    } else {
      setSelectedFiles([]);
    }
  };

  const handleUploadStatusClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUploadStatusClose = () => {
    setAnchorEl(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'upload-status-popover' : undefined;

  return (
    <>
      <Dialog open={props.open} onClose={props.onClose} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ backgroundColor: '#1976d2', color: '#fff', py: 2, px: 3 }}>
          Add Documents
          <IconButton
            edge="end"
            color="inherit"
            onClick={props.onClose}
            aria-label="close"
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          {selectedFiles.length > 0 && (
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleUploadStatusClick}
              sx={{ position: 'absolute', right: 180, top: 8 }}
            >
              Upload Status
            </Button>
          )}
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => fileInputRef.current.click()}
            sx={{ position: 'absolute', right: 60, top: 8 }}
          >
            Browse
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            style={{ display: 'none' }}
            onChange={(e) => handleFileChange(Array.from(e.target.files))}
          />
        </DialogTitle>
        <DialogContent className="invisible-scrollbar" sx={{ overflow: 'auto', p: 3, backgroundColor: '#f5f5f5' }}>
          <Box display="flex" alignItems="center" mb={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>Add Document to:</Typography>
            <BasicBreadcrumbs
              isFileOpen={props.isFileOpen}
              setFileOpen={props.setFileOpen}
              breadcrumbs={props.breadcrumbs}
              setBreadcrumbs={props.setBreadcrumbs}
              lookInsideId={props.lookInsideId}
              setLookInsideId={props.setLookInsideId}
            />
          </Box>
          <Typography variant="body2" gutterBottom sx={{ color: '#666' }}>
            Click save and upload to upload documents with different DataClass
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={8}>
              <FileDropzone
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>Data Association</Typography>
              <Box mt={2}>
                <Typography variant="body2" sx={{ color: '#666' }}>Keywords</Typography>
                <Box display="flex" alignItems="center">
                  <TextField
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    placeholder="Enter keywords"
                    sx={{ bgcolor: '#fff', borderRadius: 1 }}
                  />
                  <IconButton color="secondary" aria-label="remove" sx={{ ml: 1 }}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Typography variant="body2" mt={2} sx={{ color: '#666' }}>DataClass</Typography>
                <TextField
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  placeholder="Enter DataClass"
                  sx={{ bgcolor: '#fff', borderRadius: 1 }}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
          <Button onClick={props.onClose} color="secondary">Cancel</Button>
          <Button variant="contained" color="primary" onClick={() => handleUpload(false)}>
            Save and Upload More
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleUpload(true)}>
            Save and Close
          </Button>
        </DialogActions>
      </Dialog>

      <UploadStatusPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleUploadStatusClose}
        successFiles={successFiles}
        failedFiles={failedFiles}
        duplicateFiles={duplicateFiles}
      />

      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      />
    </>
  );
};

export default AddDocumentModal;
