import React from 'react';
import { Modal, Box, Typography, CardContent, TextField, Button } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTranslation } from 'react-i18next';

const FilterCard = ({ open, handleClose, filters, setFilters, handleFilterClear, handleFilterApply }) => {
  const { t } = useTranslation();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="filter-modal-title"
      aria-describedby="filter-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 4,
      }}>
        <Typography id="filter-modal-title" variant="h6" component="h2">
          Filter
        </Typography>
        <CardContent>
          <TextField
            label={t('nameLabel')}
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label={t('dataClassLabel')}
            value={filters.dataClass}
            onChange={(e) => setFilters({ ...filters, dataClass: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label={t('ownerLabel')}
            value={filters.owner}
            onChange={(e) => setFilters({ ...filters, owner: e.target.value })}
            fullWidth
            margin="normal"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker 
              label={t('modifiedDateLabel')}
              //value={filters.modifiedDate} 
              //onChange={(date) => setFilters({ ...filters, modifiedDate: date })} 
              fullWidth 
              margin="normal" 
            />
          </DemoContainer>
          </LocalizationProvider>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleFilterClear} variant="contained">{t('clearAllLabel')}</Button>
          <Box sx={{ marginLeft: 2 }}> 
            <Button onClick={handleFilterApply} variant="contained" >{t('applyLabel')}</Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default FilterCard;
