import React, { useState, useEffect } from "react";
import { Container, Paper, Box, Typography, Button, TextField, Tab, Tabs, Switch, TextareaAutosize, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
// import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
 import { getGroupList } from './../../../api calls/getGroupList';  
import { addGroup } from './../../../api calls/addgroup';  
import "./GroupPage.css"

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const GroupManagement = () => {
  const [tabValue, setTabValue] = useState(0);
  const [owner, setOwner] = useState('');
  const [parentGroup, setParentGroup] = useState('');
  const [groupName, setGroupName] = useState('');
  const [associatedUsers, setAssociatedUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [privileges, setPrivileges] = useState({
    "Create User/Group/Role": false,
    "Modify User/Group/Role": false,
    "Assign User to Group": false,
    "Image Server Operations": false,
    "Create/Modify DataClass": false,
    "Create/Modify Global Index": false,
    "Assign Rights": false,
    "Manage Audit Log": false,
    "Manage Data Security": false,
    "View Data Security": false,
  });

  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    const fetchGroupList = async () => {
      try {
        const data = await getGroupList();
        setGroupList(data.groups.group);
      } catch (error) {
        console.error('Error fetching group list:', error);
      }
    };

    fetchGroupList();
  }, []);
  

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOwnerChange = (event) => {
    setOwner(event.target.value);
  };

  const handleParentGroupChange = (event) => {
    setParentGroup(event.target.value);
  };

  const handlePrivilegeChange = (name) => (event) => {
    setPrivileges({ ...privileges, [name]: event.target.checked });
  };

  const handleAssociatedUsers = (event) => {
    setAssociatedUsers(event.target.value);
  };

  const handleRoles = (event) => {
    setRoles(event.target.value);
  };

  const handleSave = () => {
    const data = {
      groupName: groupName,
      privileges: Object.keys(privileges).filter(privilege => privileges[privilege]).join(', '),
      comment: groupName,
      groupType: 'G',
      ownerIndex: owner,
      parentGroup: parentGroup,
      associatedUsers: associatedUsers.join(', '),
      roles: roles.join(', '),
    };

    addGroup(data)
      .then(response => {
        console.log(response);
  
      })
      .catch(error => {
        console.error(error);
      
      });
  };

  const handleGroupClick = (groupName) => {
    console.log(`Clicked on group: ${groupName}`);
    setGroupName(`${groupName}`);
    setOwner(`${ownerName}`);
    //setParentGroup(`${}`);
    setPrivileges(`${privileges  }`);
  };

  return (
    <>
    <Container maxWidth="lg" style={{ display: 'flex', justifyContent: 'flex-start', marginRight: '10px', height: '100vh' }}>
      <Box sx={{ width: '25%', marginRight: '1px' }}>
        <Paper style={{ paddingTop: '20px', height: '100%' }}>
          <Typography variant="h5">Group</Typography>
          <Box marginTop="20px">
            <TextField variant="outlined" placeholder="Search..." fullWidth />
          </Box>
          <Box marginTop="20px" style={{ overflowY: 'auto', height: 'calc(100% - 64px)' }}>
            <Typography variant="h6">Group List</Typography>
            <List>
                {Array.isArray(groupList) && groupList.map((group, index) => (
                  <ListItem key={index} onClick={() => handleGroupClick(group.groupName)}>
                    <ListItemIcon>
                      <GroupIcon />
                    </ListItemIcon>
                    <ListItemText primary={group.groupName} />
                  </ListItem>
                ))}
              </List>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ width: '50%' }}>
        <Paper style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', overflowY: 'auto' }}>
          <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <TextareaAutosize
                aria-label="empty textarea"
                placeholder="Enter group name"
                style={{ width: '200px', marginRight: '10px' }}
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <Button variant="contained" color="primary">Create +</Button>
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Group Details" />
                <Tab label="Assign Users" />
                <Tab label="Roles" />
                <Tab label="Privileges" />
              </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="subtitle1">Primary Details</Typography>
                <TextField label="Owner" value={owner} onChange={handleOwnerChange} fullWidth margin="normal" />
                <TextField label="Parent Group" value={parentGroup} onChange={handleParentGroupChange} fullWidth margin="normal" />
              </Box>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="subtitle1">Assign Users</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                  <TextField
                    placeholder="Assign users"
                    value={associatedUsers}
                    fullWidth
                    onChange={handleAssociatedUsers}
                    variant="outlined"
                  />
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="subtitle1">Roles</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Typography>Associated User(s)</Typography>
                  <TextField
                    placeholder="Search users to associate roles"
                    value={associatedUsers}
                    fullWidth
                    onChange={handleAssociatedUsers}
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Typography>Roles</Typography>
                  <TextField
                    placeholder="Search roles"
                    value={roles}
                    fullWidth
                    onChange={handleRoles}
                    variant="outlined"
                  />
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="subtitle1">Privileges</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography>Create User/Group/Role</Typography>
                  <Switch
                    checked={privileges["Create User/Group/Role"]}
                    onChange={handlePrivilegeChange("Create User/Group/Role")}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography>Modify User/Group/Role</Typography>
                  <Switch
                    checked={privileges["Modify User/Group/Role"]}
                    onChange={handlePrivilegeChange("Modify User/Group/Role")}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography>Assign User to Group</Typography>
                  <Switch
                    checked={privileges["Assign User to Group"]}
                    onChange={handlePrivilegeChange("Assign User to Group")}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography>Image Server Operations</Typography>
                  <Switch
                    checked={privileges["Image Server Operations"]}
                    onChange={handlePrivilegeChange("Image Server Operations")}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography>Create/Modify DataClass</Typography>
                  <Switch
                    checked={privileges["Create/Modify DataClass"]}
                    onChange={handlePrivilegeChange("Create/Modify DataClass")}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography>Create/Modify Global Index</Typography>
                  <Switch
                    checked={privileges["Create/Modify Global Index"]}
                    onChange={handlePrivilegeChange("Create/Modify Global Index")}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography>Assign Rights</Typography>
                  <Switch
                    checked={privileges["Assign Rights"]}
                    onChange={handlePrivilegeChange("Assign Rights")}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography>Manage Audit Log</Typography>
                  <Switch
                    checked={privileges["Manage Audit Log"]}
                    onChange={handlePrivilegeChange("Manage Audit Log")}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography>Manage Data Security</Typography>
                  <Switch
                    checked={privileges["Manage Data Security"]}
                    onChange={handlePrivilegeChange("Manage Data Security")}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography>View Data Security</Typography>
                  <Switch
                    checked={privileges["View Data Security"]}
                    onChange={handlePrivilegeChange("View Data Security")}
                  />
                </Box>
              </Box>
            </TabPanel>
          </Box>
          
        </Paper>
      </Box>
    </Container>
    <Box display="flex" justifyContent="flex-end" mt={2}>
    <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
  </Box>
  </>
  );
};

export default GroupManagement;
