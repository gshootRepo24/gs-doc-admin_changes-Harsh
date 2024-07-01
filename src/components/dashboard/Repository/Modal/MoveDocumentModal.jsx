import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Box, Typography, IconButton,
  Divider, CircularProgress,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import {
  Search as SearchIcon, Folder as FolderIcon, Close as CloseIcon, History as HistoryIcon,
  Star as StarIcon, MoreHoriz as MoreHorizIcon, MoveToInbox as MoveToInboxIcon, NavigateBefore as NavigateBeforeIcon, NavigateNext as NavigateNextIcon
} from '@mui/icons-material';
import BasicBreadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { searchFolder } from '../../../../api calls/searchFolder';
import ListViewModified from '../RepositoryListView';
import moveDocument from '../../../../api calls/moveDocument';

const MoveDocumentModal = ({ modalOpen, handleModalClose, parentFolder, documentIndex , reload,setReload}) => {
  // State variables
  const [breadcrumbs, setBreadcrumbs] = useState([{ name: "Documents", index: 0 }]);
  const [lookInsideId, setLookInsideId] = useState(0);
  const [isFileOpen, setFileOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState([]);
  const [batchNumber, setBatchNumber] = useState(1);
  const [orderBy, setOrderBy] = useState(1);
  const [sortOrder, setSortOrder] = useState('A');
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [deletedData, setDeletedData] = useState(null);
  const [lookInFolderVolumeIdx, setLookInFolderVolumeIdx] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await searchFolder(lookInsideId, (batchNumber - 1) * 10 + 1, orderBy, sortOrder, "N");
        setFetchedData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [lookInsideId, batchNumber, orderBy, sortOrder]);

  const handleCheckboxChange = (index) => {
    setSelectedItems(prevSelected =>
      prevSelected.includes(index)
        ? prevSelected.filter(i => i !== index)
        : [...prevSelected, index]
    );
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedItems(selectAll ? [] : fetchedData.folders.folder.map(item => item.folderIndex));
  };

  const handleOpenFile = (folderIndex) => {
    setFileOpen(!isFileOpen);
    setLookInsideId(folderIndex);
  };

  const handleAddFolderOpenModal = () => {
    // Logic to handle opening the add folder modal
  };

  const handleMoveHere = async () => {
    try {
      await moveDocument(lookInsideId, parentFolder, documentIndex);
      setReload(prev => !prev);
      handleModalClose();
    } catch (error) {
      console.error('Error copying document:', error);
    }
  };

  const handleNextBatch = () => {
    setBatchNumber(prevBatchNumber => prevBatchNumber + 1);
  };

  const handlePreviousBatch = () => {
    setBatchNumber(prevBatchNumber => prevBatchNumber - 1);
  };

  return (
    <Dialog open={modalOpen} onClose={handleModalClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ backgroundColor: '#1976d2', color: '#fff', py: 2, px: 3 }}>
        Move Document
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
                setFileOpen={setFileOpen}
                breadcrumbs={breadcrumbs}
                setBreadcrumbs={setBreadcrumbs}
                lookInsideId={lookInsideId}
                setLookInsideId={setLookInsideId}
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
                setFileOpen={setFileOpen}
                lookInsideId={lookInsideId}
                setLookInsideId={setLookInsideId}
                breadcrumbs={breadcrumbs}
                setBreadcrumbs={setBreadcrumbs}
                data={fetchedData || { folders: { folder: [] } }} // Ensure data structure is consistent
                selectedItems={selectedItems}
                handleCheckboxChange={handleCheckboxChange}
                selectAll={selectAll}
                handleSelectAll={handleSelectAll}
                handleOpenFile={handleOpenFile}
                handleAddFolderOpenModal={handleAddFolderOpenModal}
                orderBy={orderBy}
                setOrderBy={setOrderBy}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                batchNumber={batchNumber}
                setBatchNumber={setBatchNumber}
                deletedData={deletedData}
                setDeletedData={setDeletedData}
                lookInFolderVolumeIdx={lookInFolderVolumeIdx}
                setLookInFolderVolumeIdx={setLookInFolderVolumeIdx}
              />
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, backgroundColor: '#f5f5f5', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<MoveToInboxIcon />}
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

export default MoveDocumentModal;
