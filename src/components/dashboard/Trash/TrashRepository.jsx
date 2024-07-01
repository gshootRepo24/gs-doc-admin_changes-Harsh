import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress, Box, Button } from '@mui/material';
import { searchFolder } from '../../../api calls/searchFolder';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ListViewModified from '../Repository/RepositoryListView';

const TrashRepository = () => {
    const [deletedFolders, setDeletedFolders] = useState([]);
    const [orderBy, setOrderBy] = useState(1);
    const [sortOrder, setSortOrder] = useState('A');
    const [batchNumber, setBatchNumber] = useState(1);
    const [loading, setLoading] = useState(true);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [isFileOpen, setFileOpen] = useState(false);
    const [lookInsideId, setLookInsideId] = useState(0);
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const [deletedData, setDeletedData] = useState({});

    useEffect(() => {
        async function fetchDeletedFolders() {
            try {
                setLoading(true);
                const data = await searchFolder(8, (batchNumber - 1) * 10 + 1, orderBy, sortOrder, "Y");
                setDeletedFolders(data);
                setLoading(false);
            } catch (error) {
                console.error('Error while fetching the deleted repositories', error);
            }
        }

        fetchDeletedFolders();
    }, [batchNumber, orderBy, sortOrder]);

    const handleNextBatch = () => {
        setBatchNumber(prevBatchNumber => prevBatchNumber + 1);
    }

    const handlePreviousBatch = () => {
        setBatchNumber(prevBatchNumber => prevBatchNumber - 1);
    }

    const handleCheckboxChange = (id) => {
        const selectedIndex = selectedItems.indexOf(id);
        const newSelected = [...selectedItems];
        if (selectedIndex === -1) {
            newSelected.push(id);
        } else {
            newSelected.splice(selectedIndex, 1);
        }
        setSelectedItems(newSelected);
        setSelectAll(newSelected.length === deletedFolders.length);
    };

    const handleSelectAll = (event) => {
        const checked = event.target.checked;
        setSelectAll(checked);
        setSelectedItems(checked ? deletedFolders.map(item => item.id) : []);
    };

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Deleted Repositories
            </Typography>
            <Box>
                <Button onClick={handlePreviousBatch} startIcon={<NavigateBeforeIcon/>} disabled={batchNumber === 1}>
                </Button>
                <Button onClick={handleNextBatch} startIcon={<NavigateNextIcon />} disabled={!deletedFolders  || !deletedFolders.folders || !deletedFolders.folders.folder || deletedFolders.folders.folder.length < 10}>
                </Button>
            </Box>
            {loading ? (
                <CircularProgress />
            ) : (
                <ListViewModified
                    data={deletedFolders} 
                    orderBy={orderBy} 
                    setOrderBy={setOrderBy} 
                    sortOrder={sortOrder} 
                    setSortOrder={setSortOrder} 
                    handleCheckboxChange={handleCheckboxChange} 
                    selectAll={selectAll} 
                    handleSelectAll={handleSelectAll} 
                    isFileOpen={isFileOpen} 
                    setFileOpen={setFileOpen} 
                    lookInsideId={lookInsideId} 
                    setLookInsideId={setLookInsideId} 
                    breadcrumbs={breadcrumbs} 
                    setBreadcrumbs={setBreadcrumbs} 
                    selectedItems={selectedItems} 
                    handleOpenFile={() => {}} 
                    handleAddFolderOpenModal={() => {}} 
                    deletedData={deletedData} 
                    setDeletedData={setDeletedData} 
                    batchNumber={batchNumber}
                    setBatchNumber={setBatchNumber} 
                />

            )}
        </div>
    );
};

export default TrashRepository;
