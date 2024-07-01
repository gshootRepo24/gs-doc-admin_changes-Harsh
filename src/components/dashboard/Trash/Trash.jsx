import React, { useEffect, useState } from 'react';
import { Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Menu, MenuItem, IconButton, Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { searchFolder } from '../../../api calls/searchFolder';
import TrashRepository from './TrashRepository';
import TrashDocuments from './TrashDocuments';

const Trash = (props) => {
  const { t } = useTranslation();

  return (
    <div style={{ overflowX: 'auto', height: '100%', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', 'msOverflowStyle': 'none' }} >
      <div style={{ display: 'flex', height: '75vh',overflowX: 'auto'}}>
        <Card variant="outlined" style={{ flex: 1, overflowX: 'auto', borderRadius: 8, marginRight: 8 }}>
        <CardContent>
          <TrashRepository />
        </CardContent>
        </Card>
        <Card variant="outlined" style={{ flex: 1, overflowX: 'auto', borderRadius: 8, marginRight: 8 }}>
        <CardContent>
          <TrashDocuments />
        </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Trash;
