import React from 'react';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';

const Content = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div>Header</div>
      <div>
        <Grid container spacing={2}>
          {/* First Row */}
          <Grid item xs={8}>
            <Card style={{ height: '40vh', borderTop: '2px solid #191970' }} elevation={4}>
              <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">{t('recentActivitiesLabel')}</Typography>
                <IconButton aria-label="refresh" color="primary">
                  <RefreshIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card style={{ height: '40vh', borderTop: '2px solid #191970' }} elevation={4}>
              <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">{t('recentDocumentsLabel')}</Typography>
                <IconButton aria-label="refresh" color="primary">
                  <RefreshIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>

          {/* Second Row */}
          <Grid item xs={4}>
            <Card style={{ height: '40vh', borderTop: '2px solid #191970' }} elevation={4}>
              <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">{t('recentFoldersLabel')}</Typography>
                <IconButton aria-label="refresh" color="primary">
                  <RefreshIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card style={{ height: '40vh', borderTop: '2px solid #191970' }} elevation={4}>
              <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">{t('searchLabel')}</Typography>
                <IconButton aria-label="refresh" color="primary">
                  <RefreshIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card style={{ height: '40vh', borderTop: '2px solid #191970' }} elevation={4}>
              <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">{t('alarmsLabel')} & {t('remindersLabel')}</Typography>
                <IconButton aria-label="refresh" color="primary">
                  <RefreshIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Content;
