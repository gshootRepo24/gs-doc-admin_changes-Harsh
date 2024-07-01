import React from 'react';
import { Grid, Typography, Grow } from '@mui/material';

const Description = () => {
    return (
        /* <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{ backgroundImage: 'url(/background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>*/ 
        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
            {/* Logo */}
            <Grid item sx={{
                paddingTop: { xs: '10%', md: '5%' }, 
                width: { xs: '80%', sm: '60%' }, 
                paddingBottom: '0',
            }}>
                <Grow in={true}>
                    <img src="image.png" alt="Logo" style={{ width: '100%', height: 'auto' }} />
                </Grow>
            </Grid>
            {/* Tagline */}
            <Grid item sx={{ width: { xs: '80%', sm: '60%' } }}>
                <Grow in={true} timeout={1000}>
                    <Typography variant="h4" align="center">
                        Your Product Tagline
                    </Typography>
                </Grow>
            </Grid>
            {/* Description */}
            <Grid item sx={{ width: { xs: '80%', sm: '60%' } }}>
                <Grow in={true} timeout={1000}>
                    <Typography variant="body1" align="center">
                        Brief description of your product or service.
                    </Typography>
                </Grow>
            </Grid>
        </Grid>
    );
};

export default Description;
