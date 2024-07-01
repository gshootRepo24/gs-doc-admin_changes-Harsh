import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from '@mui/material';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
const participantsData = [
  { id: 1, name: 'Suman Kumar', avatar: '' },
  { id: 2, name: 'Sonu Kumar', avatar: '' },
  { id: 3, name: 'Vikash Kumar', avatar: '' },
  { id: 4, name: 'Rohit Pandey', avatar: '' },
  { id: 5, name: 'Raushan Kumar', avatar: '' },
  { id: 6, name: 'Saurav Kumar', avatar: '' },
  // Add more participant data as needed
];

const Demo = () => {
  return (
    <div>
      <Typography variant="h5"></Typography>
      <List>
        {participantsData.map((participant) => (
          <ListItem key={participant.id} style={{borderBottom:"1px solid black",width:"700px",gap:"20px"}}>
            <ListItemAvatar>
              <Avatar alt={participant.name} src={participant.avatar} />
            </ListItemAvatar>
            <ListItemText primary={participant.name} />
            <MoreVertOutlinedIcon  />
            <MicNoneOutlinedIcon />

          </ListItem>
            
        ))}
      </List>
    </div>
  );
};

export default Demo;
