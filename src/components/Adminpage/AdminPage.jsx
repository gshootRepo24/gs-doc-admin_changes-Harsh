import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Paper, List, ListItem } from '@mui/material';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './AdminPage.css';
import AdminSetting from './AdminSetting';

const linksData = {
  firstContainer: [
    { name: "Cabinet Details", url: '/setting' },
    { name: "Applications", url: '/setting' },
    { name: "Folders", url: '/setting' },
    { name: "Users", url: '/setting' },
    { name: "Groups", url: '/setting' },
    { name: "Roles", url: '/setting' },
    { name: "Mail Server Configurations", url: '/setting' },
    { name: "DataClasses", url: '/setting' },
    { name: "Global Indexes", url: '/setting' },
    { name: "Keyword", url: '/setting' },
    { name: "Sites", url: '/setting' },
    { name: "Volumes", url: '/setting' },
    { name: "Manage Audit Logs", url: '/setting' }
  ],
  secondContainer: [
    { name: "OmniProcess", url: '/setting' },
    { name: "Web API", url: '/setting' },
    { name: "Third Party Registration", url: '/setting' },
    { name: "Search", url: '/setting' },
    { name: "Dashboard", url: '/setting' }
  ],
  thirdContainer: [
    { name: "Color and Accessibility", url: '/admin/setting' },
    { name: "Repository View", url: '/admin/setting' },
    { name: "Custom Operation", url: '/admin/setting' },
    { name: "Landing Page Configuration", url: '/admin/setting' },
    { name: "Tool Bar", url: '/admin/setting' },
    { name: "Custom Panel", url: '/admin/setting' }
  ],
  fourthContainer: [
    { name: "Report Management", url: '/admin/setting' },
    { name: "License Management", url: '/admin/setting' },
    { name: "Storage Transaction Management", url: '/admin/setting' },
    { name: "Service Management", url: '/admin/setting' },
    { name: "Trash Management", url: '/admin/setting' }
  ]
};

const AdminPage = () => {
  const [tileView, setTileView] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");

  const handleIncludeSubFolder = (titleValue ,nameValue ) => {
    setTitle(titleValue);
    setName(nameValue);
    setTileView(!tileView)
  }
  
  // setUsername(e.target.value);

  const renderLinks = (title , links) => {

    const half = Math.ceil(links.length / 2);
    const firstHalf = links.slice(0, half);
    const secondHalf = links.slice(half);

    return (
      <Grid container spacing={2} className="admin-links-grid">
        <Grid item xs={6}>
          <List className="admin-list">
            {firstHalf.map((link, index) => (
              <ListItem key={index} className="admin-list-item" onClick={() => handleIncludeSubFolder(title , link.name) }>
                <Link  className="admin-link">{link.name}</Link>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={6}>
          <List className="admin-list">
            {secondHalf.map((link, index) => (
               <ListItem key={index} className="admin-list-item" onClick={() => handleIncludeSubFolder(title , link.name) }>
               <Link  className="admin-link">{link.name}</Link>
             </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    );

  };

  const renderContainer = (title, links, svgPath) => (
    <Paper className="admin-paper">
      <Typography variant="h6" gutterBottom>
        <img src={svgPath} alt={`${title} icon`} className="icon" />
        {title}
      </Typography>
      {renderLinks(title , links)}
    </Paper>
  );

  return (
    <>
      { 
      tileView ?<div>  
         <AdminSetting
      container={title}
      tab={ name}
      ></AdminSetting> 
       </div>  
      :   
      <div>  
        <AppBar position="static" className="admin-appbar">
        <Toolbar>
          <Typography variant="h6">
            GrowShoot Admin Page
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className="admin-container">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {renderContainer("administration", linksData.firstContainer, '/public/Icon1.svg')}
          </Grid>
          <Grid item xs={12} md={6}>
            {renderContainer("configuration", linksData.secondContainer, '/public/Icon2.svg')}
          </Grid>
          <Grid item xs={12} md={6}>
            {renderContainer("personalize", linksData.thirdContainer, '/public/Icon3.svg')}
          </Grid>
          <Grid item xs={12} md={6}>
            {renderContainer("management", linksData.fourthContainer, '/public/Icon4.svg')}
          </Grid>
        </Grid>
      </Container>
      </div>
      }

    </>
  );
};

export default AdminPage;
