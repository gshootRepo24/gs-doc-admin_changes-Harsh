import React, { useEffect, useState } from 'react';
import { Typography, Box, Button, Menu, MenuItem, CircularProgress } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ListView from './ListView';
import IconView from './IconView';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import { searchdocument } from '../../../api calls/getDocumentList';
import DocumentListView from './DocumentListView';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddDocumentModal from './Modal/AddDocumentModal';
const mockData = [
  { name: 'File 1', dataclass: 'Dataclass 1', owner: 'Owner 1', modifiedDate: '2024-03-28', isDeleted: false },
  { name: 'File 2', dataclass: 'Dataclass 2', owner: 'Owner 2', modifiedDate: '2024-03-29', isDeleted: true },
  { name: 'File 3', dataclass: 'Dataclass 3', owner: 'Owner 3', modifiedDate: '2024-03-30', isDeleted: false },
];

const DocumentsList = (props) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [viewType, setViewType] = useState('list');
  const [viewAnchorEl, setViewAnchorEl] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState();
  const [batchNumber, setBatchNumber] = useState(1);
  const [orderBy, setOrderBy] = useState(1);
  const [sortOrder, setSortOrder] = useState('A');
  const [numberOfDocs, setNumberOfDocs] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const data = await searchdocument(props.lookInsideId, (batchNumber - 1) * 10 + 1, orderBy, sortOrder);
        setFetchedData(data);
        setLoading(false);
        setNumberOfDocs(data.searchResults.searchResult.length)
        console.log("documents fetched successfully", data);
      } catch (error) {
        console.error("Failed to fetch document", error);
        setLoading(false);
      }
    }
    fetchDocuments();
  }, [props.lookInsideId, batchNumber, props.reload, orderBy, sortOrder]);

  const handleNextBatch = () => {
    setBatchNumber(prevBatchNumber => prevBatchNumber + 1);
  }
  const handlePreviousBatch = () => {
    setBatchNumber(prevBatchNumber => prevBatchNumber - 1);
  }

  const handleViewClick = (event) => {
    setViewAnchorEl(event.currentTarget);
  };

  const handleViewClose = () => {
    setViewAnchorEl(null);
  };

  const handleViewTypeChange = (type) => {
    setViewType(type);
    setViewAnchorEl(null);
  };

  const handleCheckboxChange = (id) => {
    const selectedIndex = selectedItems.indexOf(id);
    let newSelected = [...selectedItems];

    if (selectedIndex === -1) {
      newSelected.push(id);
    } else {
      newSelected.splice(selectedIndex, 1);
    }

    setSelectedItems(newSelected);
    setSelectAll(newSelected.length === mockData.length);
  };

  const handleSelectAll = () => {
    const checked = !selectAll;
    setSelectAll(checked);
    if (checked) {
      setSelectedItems(mockData.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const filesPresent = fetchedData && fetchedData.searchResults && fetchedData.searchResults.searchResult && fetchedData.searchResults.searchResult.length > 0 && !isLoading;

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Box display="flex" justifyContent="flex-start" alignItems="flex-start" flexDirection="column" p={2} height="100%" overflow="auto">
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', width: '100%' }}>
    <Typography variant="h6" gutterBottom>Documents</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Button startIcon={<FilterListIcon />} onClick={() => {}} />
      <Button startIcon={<AddIcon />} onClick={() => setModalOpen(true)} />
      <Button onClick={handleViewClick} startIcon={viewType === 'list' ? <ViewListIcon /> : <ViewModuleIcon />} />
      <Menu
        anchorEl={viewAnchorEl}
        open={Boolean(viewAnchorEl)}
        onClose={handleViewClose}
      >
        <MenuItem onClick={() => handleViewTypeChange('list')}>
          <ViewListIcon />
          List View
        </MenuItem>
        <MenuItem onClick={() => handleViewTypeChange('icon')}>
          <ViewModuleIcon />
          Icon View
        </MenuItem>
      </Menu>
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        <Button onClick={handlePreviousBatch} startIcon={<NavigateBeforeIcon />} disabled={batchNumber === 1}></Button>
        <Typography variant="body1" style={{ marginLeft: '8px', marginRight: '8px' }}>{batchNumber}</Typography>
        <Button onClick={handleNextBatch} startIcon={<NavigateNextIcon />} disabled={!filesPresent || !fetchedData?.searchResults || !fetchedData.searchResults.searchResult || fetchedData.searchResults.searchResult.length < 10}></Button>
      </Box>
    </Box>
  </Box>
  
      {filesPresent && viewType === 'list' && (
        <DocumentListView
          data={fetchedData}
          selectedItems={selectedItems}
          handleCheckboxChange={handleCheckboxChange}
          selectAll={selectAll}
          handleSelectAll={handleSelectAll}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          batchNumber={batchNumber}
          setBatchNumber={setBatchNumber}
          breadcrumbs={props.breadcrumbs} 
          setBreadcrumbs={props.setBreadcrumbs}
          isFileOpen={props.isFileOpen} 
          setFileOpen={props.setFileOpen}
          lookInsideId={props.lookInsideId} 
          setLookInsideId={props.setLookInsideId}
          lookInFolderVolumeIdx={props.lookInFolderVolumeIdx}
          setLookInFolderVolumeIdx={props.setLookInFolderVolumeIdx}
          reload={props.reload}
          setReload={props.setReload}
        />
      )}
      {filesPresent && viewType === 'icon' && <IconView data={mockData} />}
      {!filesPresent && (
        <Box flexGrow={1} display="flex" justifyContent="center" alignItems="center" textAlign="center" flexDirection="column">
          <Typography variant="h6" gutterBottom>
            <strong>No Document Present</strong>
          </Typography>
          <Typography variant="body2" align="center" gutterBottom>
            Please click the Add Document button below to add a document.
          </Typography>
          <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
            + | Add Document
          </Button>
        </Box>
      )}

      <AddDocumentModal 
          open={modalOpen} 
          onClose={() => setModalOpen(false)} 
          isFileOpen={props.isFileOpen} 
          setFileOpen={props.setFileOpen} 
          breadcrumbs={props.breadcrumbs} 
          setBreadcrumbs={props.setBreadcrumbs}
          lookInsideId={props.lookInsideId} 
          setLookInsideId={props.setLookInsideId}
          lookInFolderVolumeIdx={props.lookInFolderVolumeIdx}
          setLookInFolderVolumeIdx={props.setLookInFolderVolumeIdx}
          reload={props.reload}
          setReload={props.setReload}
      />

    </Box>
  );
};

export default DocumentsList;
