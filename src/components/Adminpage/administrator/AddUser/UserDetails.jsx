import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Switch,
  Grid,
  Paper,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@mui/material";
import "./UserDetails.scss";
import { addUser } from "../../../../api calls/addUser";

const UserDetails = ({ 
  isUserSelected,
  tabValue,
  setTabValue,
  groupName,
  setGroupName,
  associatedUsers,
  setAssociatedUsers,
  users,
  setUsers,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  error,
  setError,
  neverExpires,
  setNeverExpires,
  expiryDate,
  setExpiryDate,
  roles,
  setRoles,
  assignedRoles,
  setAssignedRoles,
  isDomainUser,
  setIsDomainUser,
  isGeneratePassword,
  setIsGeneratePassword,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  comment,
  setComment }) => {
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleConfirmPasswordChange = (event) =>
    setConfirmPassword(event.target.value);
  const handleFirstNameChange = (event) => setFirstName(event.target.value);
  const handleLastNameChange = (event) => setLastName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleCommentChange = (event) => setComment(event.target.value);
  const handleExpiryDateChange = (event) => setExpiryDate(event.target.value);
  const handleChangenever = (event) => setNeverExpires(event.target.checked);

  const handleDomainUserChange = (event) => {
    setIsDomainUser(event.target.checked);
  };

  const handleGeneratePasswordChange = (event) => {
    setIsGeneratePassword(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const userDetails = {
      user: {
        parentGroupIndex: "1",
        password,
        fax: "",
        name: firstName,
        personalName: "",
        familyName: lastName,
        comment,
        mailId: email,
        passwordNeverExpire: neverExpires ? "Y" : "N",
        domainUser: isDomainUser ? "Y" : "N",
        limitCount: "1000",
        privileges: "11111111111111",
        groupIndex: "2",
        dataDefination: {
          field: [
            {
              indexId: "1019",
              indexType: "I",
              indexValue: "9954",
            },
          ],
        },
      },
    };

    try {
      const response = await addUser(userDetails);
      if (response.status === 0) {
        alert("User added successfully!");
      } else {
        alert("User adding failed!");
      }
    } catch (error) {
      alert("User adding failed!");
    }
  };

  return (
    <Box component={Paper} elevation={3} p={4} borderRadius={2} className="container">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              User Details
            </Typography>
          </Grid>

          {/* Primary Details Section */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Primary Details
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography>Domain user</Typography>
            <Switch checked={isDomainUser} onChange={handleDomainUserChange} />
          </Grid>

          <Grid item xs={6}>
            <Typography>Generate Password</Typography>
            <Switch
              checked={isGeneratePassword}
              onChange={handleGeneratePasswordChange}
            />
          </Grid>

          <Grid item xs={6}>
            <Typography>Password</Typography>
            <TextField
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter Password"
              fullWidth
              variant="outlined"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <Typography>Confirm Password</Typography>
            <TextField
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm Password"
              fullWidth
              variant="outlined"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <Typography>Password Never Expires</Typography>
            <Switch checked={neverExpires} onChange={handleChangenever} />
          </Grid>

          <Grid item xs={12}>
            <RadioGroup
              row
              value={neverExpires ? "never" : "expiry"}
              onChange={handleChangenever}
            >
              <FormControlLabel
                value="expiry"
                control={<Radio />}
                label="Password Expiry Date"
              />
              <FormControlLabel
                value="days"
                control={<Radio />}
                label="Password Expiry Days"
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={6}>
            <Typography>Password Expiry Date</Typography>
            <TextField
              type="date"
              value={neverExpires ? "" : expiryDate}
              onChange={handleExpiryDateChange}
              disabled={neverExpires}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>

          {/* Other Details Section */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Other Details
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="First Name"
              value={firstName}
              onChange={handleFirstNameChange}
              fullWidth
              variant="outlined"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Last Name"
              value={lastName}
              onChange={handleLastNameChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Email Id"
              value={email}
              onChange={handleEmailChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Comment"
              value={comment}
              onChange={handleCommentChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {error && (
            <Grid item xs={12}>
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            </Grid>
          )}

          <Grid item xs={12}>
            {!isUserSelected && (
              <Box display="flex" justifyContent="flex-end" mt={3}>
                <Button variant="contained" color="primary" type="submit">
                  Create
                </Button>
              </Box>
            )}
          </Grid>

          {/* Space below the button */}
          <Grid item xs={12}>
            <Box mt={3} />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default UserDetails;
