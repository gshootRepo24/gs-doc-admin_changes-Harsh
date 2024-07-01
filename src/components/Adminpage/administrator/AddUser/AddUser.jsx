import React, { useState, useEffect } from 'react';
import {
  Container, Paper, Box, Tabs, Tab, Button, Grid, TextareaAutosize, CircularProgress
} from '@mui/material';
import TabPanel from './TabPanel';
import Privileges from './Privileges';
import UserDetails from './UserDetails';
import AssignGroups from './AssignGroups';
import UserPanel from './UserPanel';
import searchUsers from '../../../../api calls/searchUser';
import UserProfile from './UserProfile';
import { changeUserProperty } from '../../../../api calls/changeUserProperties';

const AddUser = () => {
  const [tabValue, setTabValue] = useState(0);
  const [groupName, setGroupName] = useState("");
  const [associatedUsers, setAssociatedUsers] = useState([]);
  const [users, setUsers] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [neverExpires, setNeverExpires] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");
  const [roles, setRoles] = useState([]);
  const [assignedRoles, setAssignedRoles] = useState([]);
  const [isDomainUser, setIsDomainUser] = useState(false);
  const [isGeneratePassword, setIsGeneratePassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

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
    "Assign User to Application": false,
  });

  const [binaryString, setBinaryString] = useState("000000000000000");

  const [isUserSelected, setIsUserSelected] = useState(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [selectedComment, setSelectedComment] = useState("");
  const [currUserPrivilege, setCurrUserPrivilege] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userList = await searchUsers(); 
        setUsers(userList); 
      } catch (error) {
        console.error('Error fetching user list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  useEffect(() => {
    console.log("Updated binary string:", binaryString);
  }, [binaryString]);

  useEffect(() => {
    console.log("user id is", selectedUserIndex);
    console.log("user name is", selectedUserName);
    console.log("user comment is", selectedComment);
  }, [selectedUserIndex, selectedUserName, selectedComment]);

  useEffect(() => {
    if (currUserPrivilege) {
      const updatedPrivileges = { ...privileges };
      for (const key in currUserPrivilege) {
        if (updatedPrivileges.hasOwnProperty(key)) {
          updatedPrivileges[key] = currUserPrivilege[key];
        }
      }
      setPrivileges(updatedPrivileges);
    }
  }, [currUserPrivilege]);

  const updateBinaryString = (privileges) => {
    let binaryString = '';
    const privilegeOrder = [
      "Create User/Group/Role",
      "Modify User/Group/Role",
      "Assign User to Group",
      "Image Server Operations",
      "Create/Modify DataClass",
      "Create/Modify Global Index",
      "Assign Rights",
      null, 
      null, 
      null, 
      null, 
      "Manage Audit Log",
      "Manage Data Security",
      "View Data Security",
      "Assign User to Application"
    ];

    for (const privilege of privilegeOrder) {
      if (privilege) {
        binaryString += privileges[privilege] ? '1' : '0';
      } else {
        binaryString += '0';
      }
    }

    setBinaryString(binaryString);
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handlePrivilegeChange = (name) => (event) => {
    const updatedPrivileges = { ...privileges, [name]: event.target.checked };
    setPrivileges(updatedPrivileges);
    updateBinaryString(updatedPrivileges);
  };

  const handleAssociateUser = (user) => {
    setAssociatedUsers([...associatedUsers, user]);
    const updatedUsers = { ...users };
    updatedUsers.users.user = updatedUsers.users.user.filter((u) => u.userIndex !== user.userIndex);
    setUsers(updatedUsers);
  };

  const handleDissociateUser = (user) => {
    const updatedUsers = { ...users };
    updatedUsers.users.user = [...updatedUsers.users.user, user];
    setUsers(updatedUsers);
    setAssociatedUsers(associatedUsers.filter((u) => u.userIndex !== user.userIndex));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    console.log("Passwords match:", password);
  };

  const handleChangenever = () => {
    setNeverExpires(!neverExpires);
  };

  const handleChangeexpiry = (event) => {
    setExpiryDate(event.target.value);
  };

  const handleSave = async () => {
    if (selectedUserIndex === null) {
      alert("Please select a user first");
      return;
    }

    try {
      const response = await changeUserProperty(selectedUserIndex, binaryString,password,firstName, expiryDate,comment, email);
      console.log("Details saved with binary string:", binaryString);
      console.log("API response:", response);
      alert("User details have been updated successfully");
    } catch (error) {
      console.error("Error saving user details:", error);
    }
  };

  const handleUserClick = (user) => {
    setIsUserSelected(true);
    setSelectedUserIndex(user.userIndex);
    setSelectedUserName(user.userName);
    setSelectedComment(user.comment);
    setCurrUserPrivilege(user.privileges);
  };

  return (
    <Container maxWidth="lg" sx={{ height: "100vh", paddingTop: 4 }}>
      <Grid container spacing={2} sx={{ height: "100%" }}>
        {loading ? (
          <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Grid>
        ) : (
          <>
            <Grid item xs={12} md={3}>
              <UserPanel data={users} onUserClick={handleUserClick} setIsUserSelected={setIsUserSelected} setSelectedUserIndex={setSelectedUserIndex} setSelectedUserName={setSelectedUserName} setSelectedComment={setSelectedComment}/>
            </Grid>
            <Grid item xs={12} md={9}>
              <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                  <UserProfile selectedUserName={selectedUserName} selectedComment={selectedComment} />
                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} mb={2}>
                    <TextareaAutosize
                      aria-label="empty textarea"
                      placeholder="Enter group name"
                      style={{ width: "200px", marginRight: "10px" }}
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                    />
                  </Box>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                      <Tab label="User Details" />
                      <Tab label="Assign Groups" disabled={!isUserSelected} />
                      <Tab label="Privileges" disabled={!isUserSelected} />
                    </Tabs>
                  </Box>
                  <TabPanel value={tabValue} index={0}>
                  <UserDetails
                  isUserSelected={isUserSelected}
                  tabValue={tabValue}
                  groupName={groupName}
                  associatedUsers={associatedUsers}
                  users={users}
                  password={password}
                  confirmPassword={confirmPassword}
                  error={error}
                  neverExpires={neverExpires}
                  expiryDate={expiryDate}
                  roles={roles}
                  assignedRoles={assignedRoles}
                  isDomainUser={isDomainUser}
                  isGeneratePassword={isGeneratePassword}
                  firstName={firstName}
                  lastName={lastName}
                  email={email}
                  comment={comment}
                  setTabValue={setTabValue}
                  setGroupName={setGroupName}
                  setAssociatedUsers={setAssociatedUsers}
                  setUsers={setUsers}
                  setPassword={setPassword}
                  setConfirmPassword={setConfirmPassword}
                  setError={setError}
                  setNeverExpires={setNeverExpires}
                  setExpiryDate={setExpiryDate}
                  setRoles={setRoles}
                  setAssignedRoles={setAssignedRoles}
                  setIsDomainUser={setIsDomainUser}
                  setIsGeneratePassword={setIsGeneratePassword}
                  setFirstName={setFirstName}
                  setLastName={setLastName}
                  setEmail={setEmail}
                  setComment={setComment}
                />
                  </TabPanel>
                  <TabPanel value={tabValue} index={1}>
                    <AssignGroups
                      users={users}
                      associatedUsers={associatedUsers}
                      handleAssociateUser={handleAssociateUser}
                      handleDissociateUser={handleDissociateUser}
                    />
                  </TabPanel>
                  <TabPanel value={tabValue} index={2}>
                    <Privileges privileges={privileges} handlePrivilegeChange={handlePrivilegeChange} binaryString={binaryString} />
                  </TabPanel>
                </Box>
                {isUserSelected && (
                  <Box display="flex" justifyContent="flex-end" mt={1}>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                      Save
                    </Button>
                  </Box>
                )}
              </Paper>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default AddUser;
