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
  Typography,
  ButtonBase,
  Box,
  Button,
  Tooltip,
  styled
} from '@mui/material';
// import FolderIcon from '@mui/icons-material/Folder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import StarButton from '../../../shared/StarCheckBox';
import { useTranslation } from 'react-i18next';
import './RepositoryListView.scss';
import OptionsModal from './Modal/RepositoryOptionsModal';
import  FolderIcon  from "./../../../assets/folder.svg";

const TruncatedText = styled('div')({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '100px',
});

const ListViewModified = ({
  isFileOpen,
  setFileOpen,
  lookInsideId,
  setLookInsideId,
  breadcrumbs,
  setBreadcrumbs,
  data,
  selectedItems,
  handleCheckboxChange,
  selectAll,
  handleSelectAll,
  handleOpenFile,
  handleAddFolderOpenModal,
  orderBy,
  setOrderBy,
  sortOrder,
  setSortOrder,
  deletedData,
  setDeletedData,
  batchNumber,
  setBatchNumber,
  open,
  lookInFolderVolumeIdx,
  setLookInFolderVolumeIdx
}) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [arrowDirection, setArrowDirection] = useState('up');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFolderIndex, setSelectedFolderIndex] = useState(null);

  const folders = data?.folders?.folder || [];

  if (!data || !data.folders || !data.folders.folder || data.folders.folder.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Box flexGrow={1} display="flex" justifyContent="center" alignItems="center" textAlign="center" flexDirection="column">
          <Typography variant="h6" gutterBottom>
            <strong>No Folder Present</strong>
          </Typography>
          <Typography variant="body2" align="center" gutterBottom>
            {t('instructionIfFolderIsEmptyLabel')}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleAddFolderOpenModal}>
            + | Add Folder
          </Button>
        </Box>
      </div>
    );
  }

  const handleFolderClick = (item) => {
    setFileOpen(false);
    setLookInsideId(item.folderIndex);
    setLookInFolderVolumeIdx(item.imageVolumeIndex);
    setBreadcrumbs([...breadcrumbs, { name: item.folderName, index: item.folderIndex }]);
  };

  const toggleArrowDirection = (orderByIdx) => {
    setArrowDirection((prevDirection) => (prevDirection === 'up' ? 'down' : 'up'));
    setOrderBy(orderByIdx);
    setSortOrder((prev) => (prev === 'A' ? 'D' : 'A'));
    setBatchNumber(1);
  };

  const handleMenuOpen = (event, folderIndex) => {
    setAnchorEl(event.currentTarget);
    setSelectedFolderIndex(folderIndex);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setAnchorEl(null);
  };

  return (
    <>
      <OptionsModal
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        anchorEl={anchorEl}
        parentFolder={lookInsideId}
        folderIndex={selectedFolderIndex}

      />
      <TableContainer component={Paper} sx={{ maxHeight: '80vh', overflowY: 'auto', border: '1px solid #e0e0e0' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell padding="checkbox">
                <Checkbox checked={selectAll} onChange={handleSelectAll} />
              </TableCell>
              <TableCell sx={{ padding: '4px', minWidth: '150px' }}>
                <Box display="flex" alignItems="center">
                  <IconButton onClick={() => toggleArrowDirection(2)}>
                    {arrowDirection === 'up' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </IconButton>
                  {t('nameLabel')}
                </Box>
              </TableCell>
              <TableCell sx={{ padding: '4px', minWidth: '100px' }}>
                <Box display="flex" alignItems="center">
                  <IconButton onClick={() => toggleArrowDirection(3)}>
                    {arrowDirection === 'up' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </IconButton>
                  {t('ownerLabel')}
                </Box>
              </TableCell>
              <TableCell sx={{ padding: '4px', minWidth: '150px' }}>
                <Box display="flex" alignItems="center">
                  <IconButton onClick={() => toggleArrowDirection(5)}>
                    {arrowDirection === 'up' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </IconButton>
                  {t('modifiedDateLabel')}
                </Box>
              </TableCell>
              {isFileOpen ? (
                <TableCell sx={{ padding: '4px', minWidth: open ? '50vw' : '60vw' }}></TableCell>
              ) : (
                <TableCell sx={{ padding: '4px' }}></TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {folders.map((item, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:hover': {
                    backgroundColor: '#f5f5f5'
                  }
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedItems.indexOf(item.folderIndex) !== -1}
                    onChange={() => handleCheckboxChange(item.folderIndex)}
                  />
                </TableCell>
                <TableCell sx={{ padding: '4px' }}>
                  <Box display="flex" alignItems="center">
                    <StarButton />
                    <ButtonBase
                      onClick={() => handleFolderClick(item)}
                      sx={{ display: 'flex', alignItems: 'center', ml: 1 }}
                    >
                    <img src={FolderIcon} alt="Logo" className='margin-folder-name' />
                    <Tooltip title={item.folderName} arrow>
                        <TruncatedText>
                          {item.folderName.length > 15
                            ? `${item.folderName.slice(0, 15)}...`
                            : item.folderName}
                        </TruncatedText>
                      </Tooltip>
                    </ButtonBase>
                  </Box>
                </TableCell>
                <TableCell sx={{ padding: '4px' }}>
                  <Tooltip title={item.owner} arrow>
                    <TruncatedText>
                      {item.owner.length > 15 ? `${item.owner.slice(0, 15)}...` : item.owner}
                    </TruncatedText>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{ padding: '4px' }}>{item.revisedDateTime}</TableCell>
                <TableCell className="last-column" sx={{ padding: '4px', textAlign: 'right' }}>
                  <IconButton onClick={(event) => handleMenuOpen(event, item.folderIndex)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ListViewModified;
