import React, { useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import './Search.css';

const SideNavSearch = (props) => {

  const handleColumnClick = (option) => {
    props.setSearchOption(option);
  };

  return (
    <>
      <div className="main-container">
        <div className="container">
          <input id="outlined-search" placeholder="search" type="search" className="text" />
          <div className="search"><SearchIcon className="btn" /></div>
        </div>
        <div className="sidenav">
          <h2>System Defined</h2>
          <div className="hr"></div>
        </div>
      
        <div className="col1 col" onClick={() => handleColumnClick('Folder-Search')}>
          <CreateNewFolderIcon />Document Search
        </div>
      
        <div className="col2 col" onClick={() => handleColumnClick('SearchFolder')}>
          <CreateNewFolderIcon />Folder Search
        </div>
      
        {/* <div className="col3 col" onClick={() => handleColumnClick('FolderList')}>
          <CreateNewFolderIcon />FolderList
        </div> */}
    
        {/* <div className="col4 col" onClick={() => handleColumnClick('SearchDocument')}>
          <FindInPageIcon />Search Document
        </div> */}
      
        {/* <div className="col5 col" onClick={() => handleColumnClick('DocumentSearch')}>
          <FindInPageIcon />DocumentSearch
        </div> */}
    
        {/* <div className="col6 col" onClick={() => handleColumnClick('FilePlane-Search')}>
          <CreateNewFolderIcon />FilePlane Search
        </div> */}
  
        {/* <div className="col7 col" onClick={() => handleColumnClick('Record-Search')}>
          <FindInPageIcon />Record Search
        </div> */}

      </div>
    </>
  );
};

export default SideNavSearch;
