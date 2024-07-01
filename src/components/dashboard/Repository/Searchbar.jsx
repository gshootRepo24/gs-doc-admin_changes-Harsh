import SearchIcon from '@mui/icons-material/Search';
import './Search.css'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FindInPageIcon from '@mui/icons-material/FindInPage';

const Searchbar = () => {
  return (
    <>
      <div className="main-container">
      <div className="container">
            <input id="outlined-search" placeholder="search" type="search"  className="text"/>
            <div className="search"><SearchIcon className="btn"/></div>
       </div>
       <div className="sidenav">
          <h2>System Defined </h2>
        </div>
        
          <div className="col1 col"><CreateNewFolderIcon/><h3>Folder Search</h3></div>
          <div className="col2 col"><CreateNewFolderIcon/><h3>SearchFolder</h3></div>
          <div className="col3 col"><CreateNewFolderIcon/><h3>FolderList</h3></div>
          <div className="col4 col"><FindInPageIcon/><h3>SearchDocument</h3></div>
          <div className="col5 col"><FindInPageIcon/><h3>DocumentSearch</h3></div>
          <div className="col6 col"><CreateNewFolderIcon/><h3>FilePlane Search</h3></div>
          <div className="col7 col"><FindInPageIcon/><h3>Record Search</h3></div>
      
       </div>
       
       
    </>
  )
}

export default Searchbar
