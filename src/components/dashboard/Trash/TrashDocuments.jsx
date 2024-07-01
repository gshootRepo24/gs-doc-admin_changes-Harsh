import React, { useEffect, useState } from 'react';
import { Paper, Typography, CircularProgress, Box, Button } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { searchdocument } from '../../../api calls/getDocumentList';
import DocumentListView from '../Repository/DocumentListView';

const TrashDocuments = () => {
    const [deletedDocuments, setDeletedDocuments] = useState([]);
    const [orderBy, setOrderBy] = useState(1);
    const [sortOrder, setSortOrder] = useState('A');
    const [batchNumber, setBatchNumber] = useState(1);
    const [loading, setLoading] = useState(true);
    const [selectedItems, setSelectedItems] = useState([]); 
    const [selectAll, setSelectAll] = useState(false); 

    useEffect(() => {
        async function fetchDeletedDocuments() {
            try {
                setLoading(true);
                const data = await searchdocument(8, (batchNumber - 1) * 10 + 1, orderBy, sortOrder, "Y");
                setDeletedDocuments(data);
                setLoading(false);
            } catch (error) {
                console.error('Error while fetching the deleted documents', error);
            }
        }

        fetchDeletedDocuments();
    }, [batchNumber, orderBy, sortOrder]);

    const handleNextBatch = () => {
        setBatchNumber(prevBatchNumber => prevBatchNumber + 1);
    }

    const handlePreviousBatch = () => {
        setBatchNumber(prevBatchNumber => prevBatchNumber - 1);
    }

    const handleCheckboxChange = (id) => {
        const selectedIndex = selectedItems.indexOf(id);
        let newSelected = [...selectedItems];

        if (selectedIndex === -1) {
            newSelected.push(id);
        } else {
            newSelected.splice(selectedIndex, 1);
        }

        setSelectedItems(newSelected);
        setSelectAll(newSelected.length === deletedDocuments.searchResults.searchResult.length);
    };

    const handleSelectAll = () => {
        const checked = !selectAll;
        setSelectAll(checked);
        if (checked) {
            setSelectedItems(deletedDocuments.searchResults.searchResult.map(item => item.document[0].documentIndex));
        } else {
            setSelectedItems([]);
        }
    };

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Deleted Documents
            </Typography>
            <Box>
                <Button onClick={handlePreviousBatch} startIcon={<NavigateBeforeIcon />} disabled={batchNumber === 1}>
                </Button>
                <Button onClick={handleNextBatch} startIcon={<NavigateNextIcon />} disabled={!deletedDocuments || !deletedDocuments.searchResults || !deletedDocuments.searchResults.searchResult || deletedDocuments.searchResults.searchResult.length < 10}>
                </Button>
            </Box>
            {loading ? (
                <CircularProgress />
            ) : (
                <DocumentListView
                    data={deletedDocuments}
                    selectedItems={selectedItems}
                    handleCheckboxChange={handleCheckboxChange}
                    selectAll={selectAll}
                    handleSelectAll={handleSelectAll}
                    orderBy={orderBy}
                    setOrderBy={setOrderBy}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                />
            )}
        </div>
    );
};

export default TrashDocuments;
