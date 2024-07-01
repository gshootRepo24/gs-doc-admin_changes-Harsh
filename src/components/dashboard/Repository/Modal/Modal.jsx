import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import './Modal.css';
import Demo from './Demo';

const Modal = () => {
  return (
    <>
    <div className='bar'>
    <TextField
      size='small'
      className='field'
      variant="outlined"
      placeholder="Search Participant..."
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon fontSize='large' />
          </InputAdornment>
        ),
      }}
    />
    <SortByAlphaIcon fontSize='large' className='sort' />
    <FilterAltOutlinedIcon fontSize='large' className='sort' />
    </div>
    <Demo/>
    </>
  );
  
};

export default Modal;
