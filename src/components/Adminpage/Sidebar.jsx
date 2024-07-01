import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import './Sidebar.css';
import  GrowshootLogo  from "./../../assets/growshoot_logo-icon.svg";
import { Group } from '@mui/icons-material';


const Sidebar = (props) => {

  console.log(props)

  const [openMenu, setOpenMenu] = useState({
    administration: false,
    configuration: false,
    personalize: false,
    management: false,
  });

  const [tab, setTab] = useState({
    group: false,
    users: false,
  });



  useEffect(() => {
    let manu= openMenu; 
    manu[props.container]=true ; 
    setOpenMenu(manu)

    handleTabClick(props.tab)
}, [props.container , props.tab]);

  const handleClick = (menu) => {
    setOpenMenu((prevOpenMenu) => ({
      ...prevOpenMenu,
      [menu]: !prevOpenMenu[menu]
        }));
  };

  const handleTabClick = (tab) => {
    setOpenMenu((prevOpenTab) => ({
      ...prevOpenTab,
      [tab]: !prevOpenTab[tab],    }));
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
      <img className="logo-icon-top" src={GrowshootLogo}  alt="Logo"/>
      </div>
      <List>
        <ListItem  onClick={() => handleClick('administration')}>
          <ListItemText primary="Administration" />
          {openMenu.administration ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openMenu.administration} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem  component={Link} to="/administration/#">
              <ListItemText primary="Cabinet Details" />
            </ListItem>
            <ListItem  component={Link} to="/administration/#">
              <ListItemText primary="Applications" />
            </ListItem>
            <ListItem  component={Link} to="/administration/#">
              <ListItemText primary="Folders" />
            </ListItem>
            <ListItem  component={Link} to="/administration/#">
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem  component={Link} >
              <ListItemText primary="Group" />        
            </ListItem>
            <ListItem  component={Link} to="/administration/#">
              <ListItemText primary="Roles" />
            </ListItem>
            <ListItem  component={Link} to="/administration/#">
              <ListItemText primary="Mail Server Configurations" />
            </ListItem>
            <ListItem  component={Link} to="/administration/#">
              <ListItemText primary="Data Classes" />
            </ListItem>
            <ListItem  component={Link} to="/administration/#">
              <ListItemText primary="Global Indexes" />
            </ListItem>
            <ListItem  component={Link} to="/administration/#">
              <ListItemText primary="Keyword" />
            </ListItem>
            <ListItem  component={Link} to="/administration/#">
              <ListItemText primary="Sites" />
            </ListItem>
            <ListItem  component={Link} to="/administration/#">
              <ListItemText primary="Volume" />
            </ListItem>
            <ListItem  component={Link} to="/administration/#">
              <ListItemText primary="Manage Audit Logs" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem  onClick={() => handleClick('configuration')}>
          <ListItemText primary="Configuration" />
          {openMenu.configuration ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openMenu.configuration} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem  component={Link} to="/configuration/#">
              <ListItemText primary="Omni Process" />
            </ListItem>
            <ListItem  component={Link} to="/configuration/#">
              <ListItemText primary="Web API" />
            </ListItem>
            <ListItem  component={Link} to="/configuration/#">
              <ListItemText primary="Third Party Application" />
            </ListItem>
            <ListItem  component={Link} to="/configuration/#">
              <ListItemText primary="Search" />
            </ListItem>
            <ListItem  component={Link} to="/configuration/#">
              <ListItemText primary="Dashboard" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem  onClick={() => handleClick('personalize')}>
          <ListItemText primary="Personalize" />
          {openMenu.personalize ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openMenu.personalize} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem  component={Link} to="/personalize/#">
              <ListItemText primary="Color And Accessibility" />
            </ListItem>
            <ListItem  component={Link} to="/personalize/#">
              <ListItemText primary="Repository View" />
            </ListItem>
            <ListItem  component={Link} to="/personalize/#">
              <ListItemText primary="Landing Page Configuration" />
            </ListItem>
            <ListItem  component={Link} to="/personalize/#">
              <ListItemText primary="Tool Bar" />
            </ListItem>
            <ListItem  component={Link} to="/personalize/#">
              <ListItemText primary="Custom Operation" />
            </ListItem>
            <ListItem  component={Link} to="/personalize/#">
              <ListItemText primary="Custom Panel" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem  onClick={() => handleClick('management')}>
          <ListItemText primary="Management" />
          {openMenu.management ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openMenu.management} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem  component={Link} to="/management/#">
              <ListItemText primary="Report Management" />
            </ListItem>
            <ListItem  component={Link} to="/management/#">
              <ListItemText primary="Lisence Management" />
            </ListItem>
            <ListItem  component={Link} to="/management/#">
              <ListItemText primary="Trash Management" />
            </ListItem>
            <ListItem  component={Link} to="/management/#">
              <ListItemText primary="Service Management" />
            </ListItem>
            <ListItem  component={Link} to="/management/#">
              <ListItemText primary="Storage Transaction Management" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export default Sidebar;
