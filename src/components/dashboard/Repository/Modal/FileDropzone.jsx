import React, { useRef } from 'react';
//import { useDropzone } from 'react-dropzone';
import { Paper, Box, Typography, Button, Checkbox, LinearProgress, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const FileDropzone = ({ selectedFiles, setSelectedFiles, setSelectAll, selectAll }) => {
  const fileInputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const filesWithProgress = acceptedFiles.map(file => ({ file, progress: 0, selected: false }));
    setSelectedFiles([...selectedFiles, ...filesWithProgress]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: selectedFiles.length > 0,
    noKeyboard: selectedFiles.length > 0,
  });

  const handleFileSelect = (index) => {
    const newFiles = [...selectedFiles];
    newFiles[index].selected = !newFiles[index].selected;
    setSelectedFiles(newFiles);
  };

  const handleFileRemove = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    const newFiles = selectedFiles.map(fileObj => ({ ...fileObj, selected: newSelectAll }));
    setSelectedFiles(newFiles);
    setSelectAll(newSelectAll);
  };

  const getIconForFile = (fileName) => {
    const ext = fileName.split('.').pop();
    return `/${ext}.svg`;
  };

  return (
    <Paper
      {...getRootProps()}
      elevation={3}
      sx={{
        p: 2,
        textAlign: 'center',
        border: '2px dashed #1976d2',
        borderRadius: 2,
        backgroundColor: '#e3f2fd',
        minHeight: '300px',
        maxHeight: '500px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: selectedFiles.length === 0 ? 'center' : 'flex-start',
        alignItems: 'center',
      }}
    >
      <input {...getInputProps()} />
      {selectedFiles.length === 0 ? (
        <Box display="flex" flexDirection="column" alignItems="center">
          <AddIcon fontSize="large" color="primary" />
          <Typography variant="body2" mt={1} sx={{ color: '#1976d2' }}>Drag and drop here or</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => fileInputRef.current.click()}
            sx={{ mt: 2 }}
          >
            Browse
          </Button>
        </Box>
      ) : (
        <>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={1} width="100%">
            <Checkbox checked={selectAll} onChange={handleSelectAll} />
            <Typography variant="body2" sx={{ color: '#1976d2', fontWeight: 'bold' }}>Select All</Typography>
          </Box>
          {selectedFiles.map((fileObj, index) => (
            <Box key={index} display="flex" alignItems="center" justifyContent="space-between" mb={1} width="100%">
              <Checkbox checked={fileObj.selected || false} onChange={() => handleFileSelect(index)} />
              <img src={getIconForFile(fileObj.file.name)} alt={fileObj.file.name} style={{ width: '24px', height: '24px', marginRight: '8px' }} />
              <Typography variant="body2" sx={{ flexGrow: 1 }}>{fileObj.file.name}</Typography>
              <Typography variant="body2" sx={{ mx: 2 }}>{(fileObj.file.size / 1024).toFixed(2)} KB</Typography>
              <LinearProgress variant="determinate" value={fileObj.progress} sx={{ width: '100px', mr: 2 }} />
              <IconButton color="secondary" onClick={() => handleFileRemove(index)}>
                <CloseIcon />
              </IconButton>
            </Box>
          ))}
        </>
      )}
    </Paper>
  );
};

export default FileDropzone;
