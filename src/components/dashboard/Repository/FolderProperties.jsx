import React, { useEffect, useState } from 'react';
import { Typography, Box, IconButton, Divider, TextField, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { getFolderProperties } from '../../../api calls/getFolderProperties';
import { useTranslation } from 'react-i18next';

const FolderProperties = (props) => {
    const { t } = useTranslation();
    const [properties, setProperties] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getFolderProperties(props.lookInsideId);
                console.log('Data successfully fetched from the database:', data);
                setProperties(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch properties:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [props.lookInsideId]);

    useEffect(() => {
        console.log('Updated properties:', properties);
    }, [properties]);

    useEffect(() => {
        setLoading(true);
        setProperties(null);
    }, [props.lookInsideId, props.reload]);

    if (isLoading && properties === null) {
        return (
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Box display="flex" flexDirection="column" p={2} height="100%" overflow="auto">
            <Box display="flex" alignItems="center">
                <Typography variant="h6" gutterBottom>
                    {t('propertiesLabel')}
                </Typography>
                <IconButton size='small'>
                    <EditIcon fontSize='small'/>
                </IconButton>
                <IconButton size='small'>
                    <ClearIcon fontSize='small'/>
                </IconButton>
            </Box>
            <Divider />
            <Box mt={2} width="100%">
                <Typography variant="body2" gutterBottom>
                    {t('nameLabel')}:
                </Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    defaultValue={properties?.folder?.folderName || ''}
                    sx={{ bgcolor: '#E9ECEF' }}
                    disabled
                />
            </Box>
            <Box mt={1} width="100%">
                <Typography variant="body2" gutterBottom>
                    {t('ownerLabel')}:
                </Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    defaultValue={properties?.folder?.owner || ''}
                    sx={{ bgcolor: '#E9ECEF' }}
                    disabled
                />
            </Box>
            <Box mt={1} width="100%">
                <Typography variant="body2" gutterBottom>
                    {t('createdDateLabel')}:
                </Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    defaultValue={properties?.folder?.creationDateTime || ''}
                    sx={{ bgcolor: '#E9ECEF' }}
                    disabled
                />
            </Box>
            <Box mt={1} width="100%">
                <Typography variant="body2" gutterBottom>
                    {t('modifiedDateLabel')}:
                </Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    defaultValue={properties?.folder?.revisedDateTime || ''}
                    sx={{ bgcolor: '#E9ECEF' }}
                    disabled
                />
            </Box>
            <Box mt={1} width="100%">
                <Typography variant="body2" gutterBottom>
                    {t('descriptionLabel')}:
                </Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    defaultValue="Folder Description"
                    multiline
                    rows={3}
                    sx={{ bgcolor: '#E9ECEF' }}
                    disabled
                />
            </Box>
        </Box>
    );
}

export default FolderProperties;
