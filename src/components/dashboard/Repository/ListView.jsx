import React from 'react';
import { Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, ButtonBase } from '@mui/material';
// import FolderIcon from '@mui/icons-material/Folder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import StarButton from '../../../shared/StarCheckBox';
import  FolderIcon  from "./../../../assets/folder.svg";


const ListView = ({ data, selectedItems, handleCheckboxChange, selectAll, handleSelectAll, handleOpenFile }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>
              {/* Checkbox for selecting all */}
              <Checkbox checked={selectAll} onChange={handleSelectAll} />
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Data Class</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>Modified Date</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                {/* Individual checkboxes */}
                <Checkbox
                  checked={selectedItems.indexOf(item.id) !== -1}
                  onChange={() => handleCheckboxChange(item.id)}
                />
              </TableCell>
              <TableCell>
                <StarButton></StarButton>
                <ButtonBase onClick={handleOpenFile}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* <FolderIcon sx={{ ml: 1, mr: 1}} /> */}
                    <img src={FolderIcon} alt="Logo" className='folder-icon' />
                  </div>
                </ButtonBase>
              </TableCell>
              <TableCell>
                <ButtonBase onClick={handleOpenFile}>
                  {item.name}
                </ButtonBase>
              </TableCell>
              <TableCell>{item.dataclass}</TableCell>
              <TableCell>{item.owner}</TableCell>
              <TableCell>{item.modifiedDate}</TableCell>
              <TableCell>
                <IconButton onClick={handleOpenFile}>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListView;
