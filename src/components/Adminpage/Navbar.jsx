import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import './Navbar.css';
import AddUser from './administrator/AddUser/AddUser';
import SitesPage from './administrator/SitesPage';
import PendingPage from './administrator/PendingPage';
import GroupManagement from './administrator/GroupPage';

const Navbar = (props) => {
  const [tab, setTab] = useState({
    Groups: false,
    Users: false,
    Sites: false ,
    PendingPage : false 
  });




  useEffect(() => {
    let tabs= setAllFalse(tab) ; 
  
    if( tabs[props.tab]!==undefined){
      tabs[props.tab]=true ;
      setTab(tabs)
    }

}, [ props.tab]);

const setAllFalse = (ArraySet) => {
  return Object.fromEntries(
    Object.keys(ArraySet).map(key => [key, false])
  );
};


  return (
    <>
        <AppBar position="static" className="navbar">
      <Toolbar>
        <Typography variant="h6" className="navbar-title">
          Home
        </Typography>
      </Toolbar>
    </AppBar>
    {tab.Groups && <GroupManagement  />}
      {tab.Users && <AddUser />}
      {tab.Sites && <SitesPage />}
      {tab.PendingPage && <PendingPage/>}
      
    
    </>

  );
};

export default Navbar;
