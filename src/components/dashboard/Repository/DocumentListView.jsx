import React, { useState } from 'react';
import {
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  ButtonBase,
  Box,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropUp';
import StarButton from '../../../shared/StarCheckBox';
import OptionsModal from './Modal/DocumentOperationModal';
import './DocumentListView.scss';
import getDocumentBuffer from '../../../api calls/getDocument';
import DocumentListViewTest from './DocumentListViewTest.json';
import FileViewerModal from './Modal/FileViewerModal';

const TruncatedText = ({ text }) => (
  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
    {text.length > 15 ? `${text.slice(0, 15)}...` : text}
  </span>
);

const getIcon = (fileType) => {
  const iconPath = `/${fileType}.svg`;
  return <img className='margin-document-name' src={iconPath} alt={`${fileType} icon`} style={{ width: '24px', height: '24px' }} />;
};

const base64ToBlob = (base64, fileType) => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: fileType });
};

const DocumentListView = ({
  data,
  selectedItems,
  handleCheckboxChange,
  selectAll,
  handleSelectAll,
  orderBy,
  setOrderBy,
  sortOrder,
  setSortOrder,
  batchNumber,
  setBatchNumber,
  breadcrumbs,
  setBreadcrumbs,
  lookInsideId,
  setLookInsideId,
  lookInFolderVolumeIdx,
  setLookInFolderVolumeIdx,
  reload,
  setReload,
}) => {
  const [arrowDirections, setArrowDirections] = useState({
    name: 'up',
    owner: 'up',
    modifiedDate: 'up',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [documentIndex, setDocumentIndex] = useState(0);
  const [fileUrl, setFileUrl] = useState('');
  const [fileType, setFileType] = useState('');
  const [fileModalOpen, setFileModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleArrowDirection = (column) => {
    setBatchNumber(1);
    setArrowDirections((prevDirections) => ({
      ...prevDirections,
      [column]: prevDirections[column] === 'up' ? 'down' : 'up',
    }));

    switch (column) {
      case 'name':
        setOrderBy(2);
        break;
      case 'owner':
        setOrderBy(3);
        break;
      case 'modifiedDate':
        setOrderBy(5);
        break;
      default:
        break;
    }
    setSortOrder((prev) => (prev === 'A' ? 'D' : 'A'));
  };

  const handleMoreVertClick = (event, documentIdx) => {
    setAnchorEl(event.currentTarget);
    setDocumentIndex(documentIdx);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setAnchorEl(null);
  };

  const handleFileModalClose = () => {
    setFileModalOpen(false);
    setFileUrl('');
    setFileType('');
  };

  const handleNextFile = () => {
    if (currentIndex < data.searchResults.searchResult.length - 1) {
      const nextIndex = currentIndex + 1;
      const nextFile = data.searchResults.searchResult[nextIndex];
      handleDocumentClick(nextFile.document[0].isindex, nextFile.document[0].createdByAppName, nextIndex);
    }
  };

  const handlePrevFile = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      const prevFile = data.searchResults.searchResult[prevIndex];
      handleDocumentClick(prevFile.document[0].isindex, prevFile.document[0].createdByAppName, prevIndex);
    }
  };

  const handleDocumentClick = async (isindex, fileExtension, index) => {
    try {
      let imageIndex = typeof isindex === 'string' ? isindex.split("#")[0] : '';
      const siteId = '1';
  
      let response = await getDocumentBuffer(lookInFolderVolumeIdx, siteId, imageIndex);
      console.log('Document buffer data:', response);
  
      // const test = true;
      // if (test) response = DocumentListViewTest;
  
      const stream = response.documentStream;
      const mimeType = getMimeType(fileExtension);
      setFileType(mimeType);
  
      const blob = base64ToBlob(stream, mimeType);
      const fileUrl = URL.createObjectURL(blob);
      console.log('Generated file URL:', fileUrl);
  
      setFileUrl(fileUrl);
      setFileModalOpen(true);
      setCurrentIndex(index);
    } catch (error) {
      console.error('Error fetching document buffer:', error);
    }
  };

  const getMimeType = (fileExtension) => {
    switch (fileExtension.toLowerCase()) {
      case 'pdf':
        return 'application/pdf';
      case 'doc':
      case 'docx':
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      case 'ppt':
      case 'pptx':
        return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
      case 'xls':
      case 'xlsx':
        return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'gif':
        return 'image/gif';
      case 'txt':
        return 'text/plain';
      default:
        return 'application/octet-stream';
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: '80vh', overflowY: 'auto', border: '1px solid #e0e0e0' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ padding: '4px', minWidth: '150px' }}>
                <Checkbox checked={selectAll} onChange={handleSelectAll} />
              </TableCell>
              <TableCell sx={{ padding: '4px', minWidth: '150px' }}>
                <Box display="flex" alignItems="center">
                  <IconButton onClick={() => toggleArrowDirection('name')}>
                    {arrowDirections.name === 'up' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </IconButton>
                  Name
                </Box>
              </TableCell>
              <TableCell sx={{ padding: '4px', minWidth: '150px' }}>
                <Box display="flex" alignItems="center">
                  <IconButton onClick={() => toggleArrowDirection('owner')}>
                    {arrowDirections.owner === 'up' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </IconButton>
                  Owner
                </Box>
              </TableCell>
              <TableCell sx={{ padding: '4px', minWidth: '150px', whiteSpace: 'nowrap' }}>
                <Box display="flex" alignItems="center">
                  <IconButton onClick={() => toggleArrowDirection('modifiedDate')}>
                    {arrowDirections.modifiedDate === 'up' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </IconButton>
                  Modified Date
                </Box>
              </TableCell>
              <TableCell sx={{ padding: '4px' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.searchResults?.searchResult?.map((item, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedItems.indexOf(item.document[0].documentIndex) !== -1}
                    onChange={() => handleCheckboxChange(item.document[0].documentIndex)}
                  />
                </TableCell>
                <TableCell sx={{ padding: '4px' }}>
                  <Box display="flex" alignItems="center">
                    <StarButton />
                    <ButtonBase
                      sx={{ display: 'flex', alignItems: 'center', ml: 1 }}
                      onClick={() => handleDocumentClick(item.document[0].isindex, item.document[0].createdByAppName, index)}
                    >
                      {getIcon(item.document[0].createdByAppName)}
                      <Tooltip title={item.document[0].documentName} arrow>
                        <TruncatedText text={item.document[0].documentName} />
                      </Tooltip>
                    </ButtonBase>
                  </Box>
                </TableCell>
                <TableCell sx={{ padding: '4px' }}>
                  <Tooltip title={item.document[0].owner} arrow>
                    <TruncatedText text={item.document[0].owner} />
                  </Tooltip>
                </TableCell>
                <TableCell sx={{ padding: '4px', whiteSpace: 'nowrap' }}>
                  {item.document[0].revisedDateTime}
                </TableCell>
                <TableCell sx={{ padding: '4px', textAlign: 'right' }}>
                  <IconButton onClick={(event) => { handleMoreVertClick(event, item.document[0].documentIndex) }}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <OptionsModal 
        modalOpen={modalOpen} 
        handleModalClose={handleModalClose} 
        anchorEl={anchorEl}
        parentFolder={lookInsideId} 
        documentIndex={documentIndex}
        reload={reload}
        setReload={setReload}
      />
      <FileViewerModal 
      open={fileModalOpen} 
      onClose={handleFileModalClose} 
      fileUrl={fileUrl} 
      fileType={fileType}
      onNextFile={handleNextFile}
      onPrevFile={handlePrevFile}
      hasNextFile={currentIndex < data.searchResults.searchResult.length - 1}
      hasPrevFile={currentIndex > 0}
    />
    </>
  );
};

export default DocumentListView;
