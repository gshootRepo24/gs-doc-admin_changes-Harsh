import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Administration from './Administration';
import Configuration from './Configuration';
import Personalize from './Personalize';
import Management from './Management';
import './AdminSetting.css';

const AdminSetting = (props) => {
  console.log(props)
  return (
      <div className="adminSetting">
        <Sidebar 
         container={props.container}
         tab={props.tab}
        />
        <div className="main-content">
          <Navbar
          container={props.container}
          tab={props.tab}
          />
          {/* <Routes> */}
          {/* <Administration />
          <Configuration />
          <Personalize />
          <Management /> */}

        </div>
      </div>
  );
};

export default AdminSetting;
