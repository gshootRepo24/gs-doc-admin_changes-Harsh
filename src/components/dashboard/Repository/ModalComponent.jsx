import React from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import OpenWithOutlinedIcon from '@mui/icons-material/OpenWithOutlined';
import AlarmIcon from '@mui/icons-material/Alarm';
import EventNoteIcon from '@mui/icons-material/EventNote';
import MailIcon from '@mui/icons-material/Mail';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import PostAddIcon from '@mui/icons-material/PostAdd';
const ModalComponent = ({ modalOpen, handleModalClose, anchorEl }) => {
  return (
    <Modal open={modalOpen} onClose={handleModalClose}>
      <Box
        sx={{
          position: 'absolute',
          top: anchorEl ? anchorEl.getBoundingClientRect().bottom : 0,
          left: anchorEl ? anchorEl.getBoundingClientRect().left - 100 : 0,
          transform: 'translate(-50%, 0)',
          width: 200,
          bgcolor: 'background.paper',
          borderRadius: 8,
          boxShadow: 24,
          p: 2,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Options
        </Typography>
        <Divider />
        <List>
          <ListItem button>
            <OpenWithOutlinedIcon /> {/* Icon for Move/Copy */}
            <ListItemText primary=" Move/Copy" />
          </ListItem>
          <ListItem button>
            <AlarmIcon /> {/* Icon for Alarms/Reminders */}
            <ListItemText primary=" Alarms/Reminders" />
          </ListItem>
          <ListItem button>
            <EventNoteIcon /> {/* Icon for Audit Log */}
            <ListItemText primary=" Audit Log" />
          </ListItem>
          <ListItem button>
            <MailIcon /> {/* Icon for Mail */}
            <ListItemText primary=" Mail" />
          </ListItem>
          <Divider />
          <ListItem button>
            <CreateNewFolderIcon /> {/* Icon for Add Folder */}
            <ListItemText primary=" Add Folder" />
          </ListItem>
          <ListItem button>
            <PostAddIcon /> {/* Icon for Add Documents */}
            <ListItemText primary=" Add Docs" />
          </ListItem>
        </List>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
