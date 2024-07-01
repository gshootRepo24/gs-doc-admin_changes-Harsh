import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Box, Typography, IconButton,
  Divider, CircularProgress, List, ListItem, ListItemText, Menu, MenuItem
} from '@mui/material';
import {
  Search as SearchIcon, Folder as FolderIcon, Close as CloseIcon, History as HistoryIcon,
  Star as StarIcon, MoreHoriz as MoreHorizIcon, OpenWith as MoveIcon, NavigateBefore as NavigateBeforeIcon, NavigateNext as NavigateNextIcon
} from '@mui/icons-material';
import BasicBreadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { searchFolder } from '../../../../api calls/searchFolder';
import ListViewModified from '../RepositoryListView';
import moveFolder from '../../../../api calls/moveFolder';

const MoveFolderModal = ({ modalOpen, handleModalClose, parentFolder, folderIndex }) => {
  const [state, setState] = useState({
    breadcrumbs: [{ name: "Cabinet", index: 0 }],
    lookInsideId: 0,
    isFileOpen: true,
    loading: true,
    fetchedData: [],
    batchNumber: 1,
    orderBy: 1,
    sortOrder: 'A',
    selectedItems: [],
    selectAll: false,
    deletedData: null,
    lookInFolderVolumeIdx: 0
  });

  const {
    breadcrumbs, lookInsideId, isFileOpen, loading, fetchedData, batchNumber, orderBy, sortOrder,
    selectedItems, selectAll, deletedData, lookInFolderVolumeIdx
  } = state;

  useEffect(() => {
    const fetchData = async () => {
      setState(prevState => ({ ...prevState, loading: true }));
      try {
        const data = await searchFolder(lookInsideId, (batchNumber - 1) * 10 + 1, orderBy, sortOrder, "N");
        setState(prevState => ({ ...prevState, fetchedData: data, loading: false }));
      } catch (error) {
        console.error('Error fetching data:', error);
        setState(prevState => ({ ...prevState, loading: false }));
      }
    };
    fetchData();
  }, [lookInsideId, batchNumber, orderBy, sortOrder]);

  const handleCheckboxChange = (index) => {
    setState(prevState => ({
      ...prevState,
      selectedItems: prevState.selectedItems.includes(index)
        ? prevState.selectedItems.filter(i => i !== index)
        : [...prevState.selectedItems, index]
    }));
  };

  const handleSelectAll = () => {
    setState(prevState => ({
      ...prevState,
      selectAll: !prevState.selectAll,
      selectedItems: !prevState.selectAll ? fetchedData.folders.folder.map(item => item.folderIndex) : []
    }));
  };

  const handleOpenFile = (folderIndex) => {
    setState(prevState => ({
      ...prevState,
      isFileOpen: !prevState.isFileOpen,
      lookInsideId: folderIndex
    }));
  };

  const handleMoveHere = async () => {
    try {
      await moveFolder(lookInsideId, parentFolder, folderIndex);
      handleModalClose();
    } catch (error) {
      console.error('Error moving folder:', error);
    }
  };

  const handleNextBatch = () => {
    setState(prevState => ({ ...prevState, batchNumber: prevState.batchNumber + 1 }));
  };

  const handlePreviousBatch = () => {
    setState(prevState => ({ ...prevState, batchNumber: prevState.batchNumber - 1 }));
  };

  return (
    <Dialog open={modalOpen} onClose={handleModalClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ backgroundColor: '#1976d2', color: '#fff', py: 2, px: 3 }}>
        Move Folder
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleModalClose}
          aria-label="close"
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ overflowY: 'auto', overflowX: 'hidden', p: 3, backgroundColor: '#f5f5f5' }}>
        <Box display="flex" flexDirection="column" mb={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>Search</Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search"
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
            }}
            sx={{ flexGrow: 1, mb: 3 }}
          />
        </Box>
        <Divider sx={{ mb: 2 }} />

        <Box display="flex" flexGrow={1}>
          <Box sx={{ width: '25%', borderRight: '1px solid #e0e0e0', pr: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, color: '#333' }}>Quick Access</Typography>
            <List>
              <ListItem button>
                <HistoryIcon sx={{ mr: 1 }} />
                <ListItemText primary="Recent" />
              </ListItem>
              <ListItem button>
                <StarIcon sx={{ mr: 1 }} />
                <ListItemText primary="Favourite" />
              </ListItem>
              <ListItem button>
                <MoreHorizIcon sx={{ mr: 1 }} />
                <ListItemText primary="More Places" />
              </ListItem>
            </List>
          </Box>

          <Box sx={{ width: '75%', pl: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <BasicBreadcrumbs
                isFileOpen={isFileOpen}
                setFileOpen={(value) => setState(prevState => ({ ...prevState, isFileOpen: value }))}
                breadcrumbs={breadcrumbs}
                setBreadcrumbs={(value) => setState(prevState => ({ ...prevState, breadcrumbs: value }))}
                lookInsideId={lookInsideId}
                setLookInsideId={(value) => setState(prevState => ({ ...prevState, lookInsideId: value }))}
              />
              <Box display="flex" alignItems="center">
                <Button variant="outlined" startIcon={<FolderIcon />} sx={{ mr: 2 }}>Add Folder</Button>
                <Button onClick={handlePreviousBatch} disabled={batchNumber === 1} sx={{ mr: 1 }}>
                  <NavigateBeforeIcon />
                </Button>
                <Typography variant="body1">{batchNumber}</Typography>
                <Button onClick={handleNextBatch} disabled={!fetchedData || !fetchedData.folders || !fetchedData.folders.folder || fetchedData.folders.folder.length < 10} sx={{ ml: 1 }}>
                  <NavigateNextIcon />
                </Button>
              </Box>
            </Box>
            <Divider sx={{ mb: 2 }} />
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
              </Box>
            ) : (
              <ListViewModified
                isFileOpen={isFileOpen}
                setFileOpen={(value) => setState(prevState => ({ ...prevState, isFileOpen: value }))}
                lookInsideId={lookInsideId}
                setLookInsideId={(value) => setState(prevState => ({ ...prevState, lookInsideId: value }))}
                breadcrumbs={breadcrumbs}
                setBreadcrumbs={(value) => setState(prevState => ({ ...prevState, breadcrumbs: value }))}
                data={fetchedData || { folders: { folder: [] } }}
                selectedItems={selectedItems}
                handleCheckboxChange={handleCheckboxChange}
                selectAll={selectAll}
                handleSelectAll={handleSelectAll}
                handleOpenFile={handleOpenFile}
                orderBy={orderBy}
                setOrderBy={(value) => setState(prevState => ({ ...prevState, orderBy: value }))}
                sortOrder={sortOrder}
                setSortOrder={(value) => setState(prevState => ({ ...prevState, sortOrder: value }))}
                batchNumber={batchNumber}
                setBatchNumber={(value) => setState(prevState => ({ ...prevState, batchNumber: value }))}
                deletedData={deletedData}
                setDeletedData={(value) => setState(prevState => ({ ...prevState, deletedData: value }))}
                lookInFolderVolumeIdx={lookInFolderVolumeIdx}
                setLookInFolderVolumeIdx={(value) => setState(prevState => ({ ...prevState, lookInFolderVolumeIdx: value }))}
              />
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, backgroundColor: '#f5f5f5', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<MoveIcon />}
          sx={{ mr: 2 }}
          onClick={handleMoveHere}
        >
          Move here
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleModalClose}
          startIcon={<CloseIcon />}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MoveFolderModal;
