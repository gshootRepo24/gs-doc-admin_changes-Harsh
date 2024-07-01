import React, { useEffect, useState, useCallback } from 'react';
import { Typography, Button, Menu, MenuItem, Box, CircularProgress, IconButton, Grid, Divider, useTheme, styled, Paper } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ListViewModified from './RepositoryListView';
import IconView from './IconView';
import FilterCard from './FilterCard';
import { searchFolder } from '../../../api calls/searchFolder';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { addFolder } from '../../../api calls/addFolder';
import ClearIcon from '@mui/icons-material/Clear';
const mockData = [
  { name: 'File 1', dataclass: 'Dataclass 1', owner: 'Owner 1', modifiedDate: '2024-03-28', isDeleted: false },
  { name: 'File 2', dataclass: 'Dataclass 2', owner: 'Owner 2', modifiedDate: '2024-03-29', isDeleted: true },
  { name: 'File 3', dataclass: 'Dataclass 3', owner: 'Owner 3', modifiedDate: '2024-03-30', isDeleted: false },
];
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
const Repository = (props) => {
  // State variables
  const [loading, setLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState([]);
  const [batchNumber, setBatchNumber] = useState(1);
  const [viewAnchorEl, setViewAnchorEl] = useState(null);
  const [viewType, setViewType] = useState('list');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    dataClass: '',
    owner: '',
    modifiedDate: ''
  });
  const [addFolderModalOpen, setAddModalModalOpen] = useState(false);
  const [addFolderName, setAddFolderName] = useState('');
  const [orderBy, setOrderBy] = useState(1);
  const [sortOrder, setSortOrder] = useState('A');
  const [numberOfFolders, setNumberOfFolders] = useState(1);
  const [listOfAddedFolders, setListOfAddedFolders] = useState([]);
  const theme = useTheme();
  useEffect(() => {
    setLoading(true);
  }, [props.lookInsideId, batchNumber, orderBy, sortOrder]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await searchFolder(props.lookInsideId, (batchNumber - 1) * 10 + 1, orderBy, sortOrder, "N", props.folderName, props.includeSubFolder, props.creationDateRange);
        setFetchedData(data);
        setLoading(false);
        if (data.folders.noOfRecordsFetched > 0)
          setNumberOfFolders(data.folders.folder.length);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [props.lookInsideId, batchNumber, orderBy, sortOrder]);
  // Translation hook
  const { t } = useTranslation();
  // Event handlers
  const handleNextBatch = () => {
    setBatchNumber(prevBatchNumber => prevBatchNumber + 1);
  };
  const handlePreviousBatch = () => {
    setBatchNumber(prevBatchNumber => prevBatchNumber - 1);
  };
  const handleViewClick = (event) => setViewAnchorEl(event.currentTarget);
  const handleViewClose = () => setViewAnchorEl(null);
  const handleViewTypeChange = (type) => {
    setViewType(type);
    setViewAnchorEl(null);
  };
  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    setSelectedItems(checked ? fetchedData.map(item => item.id) : []);
  };
  const handleCheckboxChange = (id) => {
    const selectedIndex = selectedItems.indexOf(id);
    const newSelected = [...selectedItems];
    if (selectedIndex === -1) {
      newSelected.push(id);
    } else {
      newSelected.splice(selectedIndex, 1);
    }
    setSelectedItems(newSelected);
    setSelectAll(newSelected.length === fetchedData.length);
  };
  const handleFilterOpen = () => setFilterModalOpen(true);
  const handleFilterClose = () => setFilterModalOpen(false);
  const handleFilterClear = () => setFilters({ name: '', dataClass: '', owner: '', modifiedDate: '' });
  const handleFilterApply = () => {
    console.log('Applied Filters:', filters);
    handleFilterClose();
  };
  const handleAddFolderOpenModal = () => {
    setAddModalModalOpen(true);
  };
  const handleAddFolderCloseModalAdd = async () => {
    // Include the addFolderName in listOfAddedFolders before proceeding
    const updatedFolders = [...listOfAddedFolders];
    if (addFolderName.trim()) {
      updatedFolders.push(addFolderName.trim());
    }
    try {
      // Add all folders from updatedFolders
      for (const folderName of updatedFolders) {
        await addFolder(props.lookInsideId, folderName);
      }
      // Clear the state after all folder additions
      setListOfAddedFolders([]);
      setAddFolderName('');
      setAddModalModalOpen(false);
      props.setReload((prev) => !prev);
      const updatedData = await searchFolder(
        props.lookInsideId,
        (batchNumber - 1) * 10 + 1,
        orderBy,
        sortOrder,
        "N"
      );
      setFetchedData(updatedData);
    } catch (error) {
      console.error('Failed to add folder', error);
    }
  };
  const handleAddFolderCloseModalCancel = () => {
    setAddFolderName('');
    setListOfAddedFolders([]);
    setAddModalModalOpen(false);
  };
  const handleNameInputChange = (event) => {
    setAddFolderName(event.target.value);
  };
  const handleAddMore = () => {
    if (addFolderName.trim()) {
      setListOfAddedFolders(prevList => [...prevList, addFolderName.trim()]);
      setAddFolderName('');
    }
  };
  const handleRemoveFolder = (indexToRemove) => {
    setListOfAddedFolders(prevFolders => prevFolders.filter((folder, index) => index !== indexToRemove));
  };
  // Component rendering
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </div>
    )
  }
  return (
    <div style={{ overflowX: 'auto', height: '80vh', overflowY: 'auto', scrollbarWidth: 'none', 'msOverflowStyle': 'none' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom>
          {t('repositoryLabel')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Existing buttons */}
          <Button startIcon={<FilterListIcon />} onClick={handleFilterOpen} />
          <Button startIcon={<AddIcon />} onClick={handleAddFolderOpenModal} />
          <Button onClick={handleViewClick} startIcon={viewType === 'list' ? <ViewListIcon /> : <ViewModuleIcon />}>
          </Button>
          <Menu anchorEl={viewAnchorEl} open={Boolean(viewAnchorEl)} onClose={handleViewClose}>
            <MenuItem onClick={() => handleViewTypeChange('list')}>
              <ViewListIcon />
              {t('listViewLabel')}
            </MenuItem>
            <MenuItem onClick={() => handleViewTypeChange('icon')}>
              <ViewModuleIcon />
              {t('iconViewLabel')}
            </MenuItem>
          </Menu>
          {/* New buttons for batching */}
          <Button onClick={handlePreviousBatch} disabled={batchNumber === 1}>
            <NavigateBeforeIcon />
          </Button>
          <Typography variant="body1">{batchNumber}</Typography>
          <Button onClick={handleNextBatch} disabled={!fetchedData || !fetchedData.folders || !fetchedData.folders.folder || fetchedData.folders.folder.length < 10}>
            <NavigateNextIcon />
          </Button>
        </Box>
      </Box>
      {viewType === 'list' && (
        <ListViewModified
          isFileOpen={props.isFileOpen}
          setFileOpen={props.setFileOpen}
          lookInsideId={props.lookInsideId}
          setLookInsideId={props.setLookInsideId}
          breadcrumbs={props.breadcrumbs}
          setBreadcrumbs={props.setBreadcrumbs}
          data={fetchedData}
          selectedItems={selectedItems}
          handleCheckboxChange={handleCheckboxChange}
          selectAll={selectAll}
          handleSelectAll={handleSelectAll}
          handleAddFolderOpenModal={handleAddFolderOpenModal}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          deletedFolders={props.deletedFolders}
          setDeletedFolders={props.setDeletedFolders}
          batchNumber={batchNumber}
          setBatchNumber={setBatchNumber}
          open={props.open}
          lookInFolderVolumeIdx={props.lookInFolderVolumeIdx}
          setLookInFolderVolumeIdx={props.setLookInFolderVolumeIdx}
        />
      )}
      {viewType === 'icon' && <IconView data={mockData} />}
      <FilterCard
        open={filterModalOpen}
        handleClose={handleFilterClose}
        filters={filters}
        setFilters={setFilters}
        handleFilterClear={handleFilterClear}
        handleFilterApply={handleFilterApply}
      />
      <StyledDialog open={addFolderModalOpen} onClose={handleAddFolderCloseModalCancel} fullWidth maxWidth="sm">
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
    </div>
  );
};
export default Repository;