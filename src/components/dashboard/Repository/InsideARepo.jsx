import React, { useState } from 'react';
import Repository from './Repository';
import { Card, CardContent, IconButton } from '@mui/material';
import DocumentsList from './DocumentsList';
import FolderProperties from './FolderProperties';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModalComponent from './ModalComponent'; 
import BasicBreadcrumbs from './Breadcrumbs/Breadcrumbs';

const InsideARepo = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleModalOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div style={{ overflowX: 'hidden', height: '100%', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', 'msOverflowStyle': 'none' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
        <IconButton>
          <DeleteIcon />
        </IconButton>
        <IconButton>
          <SettingsIcon />
        </IconButton>
        <IconButton>
          <PersonIcon />
        </IconButton>
        <IconButton onClick={handleModalOpen}>
          <MoreVertIcon />
        </IconButton>
        <ModalComponent modalOpen={modalOpen} handleModalClose={handleModalClose} anchorEl={anchorEl} />
      </div>
      <div>
        <BasicBreadcrumbs isFileOpen={props.isFileOpen} 
                          setFileOpen={props.setFileOpen} 
                          breadcrumbs={props.breadcrumbs} 
                          setBreadcrumbs={props.setBreadcrumbs}
                          lookInsideId={props.lookInsideId} 
                          setLookInsideId={props.setLookInsideId}/>
      </div>
      <div style={{ display: 'flex', height: '75vh',overflowX: 'auto'}}>
        <Card variant="outlined" style={{ flex: 3, overflowX: 'auto', borderRadius: 8, marginRight: 8 }}>
          <CardContent>
            <Repository isFileOpen={props.isFileOpen} 
                        setFileOpen={props.setFileOpen} 
                        lookInsideId={props.lookInsideId} 
                        setLookInsideId={props.setLookInsideId}
                        breadcrumbs={props.breadcrumbs} 
                        setBreadcrumbs={props.setBreadcrumbs}
                        reload={props.reload}
                        setReload={props.setReload}
                        lookInFolderVolumeIdx={props.lookInFolderVolumeIdx}
                        setLookInFolderVolumeIdx={props.setLookInFolderVolumeIdx}                                 />
          </CardContent>
        </Card>
        <div style={{ width: 10 }} />
        <Card variant="outlined" style={{ flex: 3, borderRadius: 8, marginRight: 8 }}>
          <DocumentsList lookInsideId={props.lookInsideId} 
                        setLookInsideId={props.setLookInsideId}
                        reload={props.reload}
                        setReload={props.setReload}
                        breadcrumbs={props.breadcrumbs} 
                        setBreadcrumbs={props.setBreadcrumbs}
                        isFileOpen={props.isFileOpen} 
                        setFileOpen={props.setFileOpen}
                        lookInFolderVolumeIdx={props.lookInFolderVolumeIdx}
                        setLookInFolderVolumeIdx={props.setLookInFolderVolumeIdx}
          ></DocumentsList>
        </Card>
        <div style={{ width: 10 }} /> 
        <Card variant="outlined" style={{ flex: 1, borderRadius: 8 }}>
          <FolderProperties lookInsideId={props.lookInsideId} 
                            setLookInsideId={props.setLookInsideId}
                            reload={props.reload}
                            setReload={props.setReload}
                            ></FolderProperties>
        </Card>
      </div>
    </div>
  );
};

export default InsideARepo;
