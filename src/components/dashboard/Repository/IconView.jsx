import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';

const IconView = ({ data }) => {
  return (
    <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Paper elevation={3} style={{ padding: '10px', textAlign: 'center' }}>
              <div style={{ marginBottom: '5px' }}>
                <FolderIcon style={{ fontSize: '50px' }} />
              </div>
              <Typography variant="subtitle1">{item.name}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default IconView;
