import React, { useState } from 'react'
import './FolderSearch.css'
import Repository from '../../Repository/Repository';

const FolderSearch = (props) => {
  const [isFileOpen, setFileOpen] = useState(true);
  const [lookInsideId,setLookInsideId]= useState(0);
  const [breadcrumbs, setBreadcrumbs] = useState([{ name: "Cabinet", index: 0 }]);
  const [reload,setReload] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [includeSubFolder, setiIncludeSubFolder] = useState("N");
  
  const [creationDateFrom, setCreationDateFrom] = useState('');
  const [creationDateTo, setCreationDateTo] = useState('');
  const [creationDateRange, setCreationDateRange] = useState('');
  const [creationDateToIsVisiable, setCreationDateToIsVisiable]= useState(false );

  
  const  searchFolder  = () => {
      // Between,2022-08-19 00:00:00,2022-08-19 23:59:00
    let finalCreationDate="";
    if(creationDateFrom!='' && creationDateTo!=''){
      finalCreationDate="Between,"+creationDateFrom+" 00:00:00,"+creationDateTo+" 23:59:00";
    }else if(creationDateFrom=='' && creationDateTo==''){
      finalCreationDate="";
    }else if(creationDateTo==''){
      finalCreationDate="Between,"+creationDateFrom+" 00:00:00,"+creationDateFrom+" 23:59:00";
    }else if(creationDateFrom==''){
      finalCreationDate="Between,"+creationDateTo +" 00:00:00,"+creationDateTo+" 23:59:00";
    }
    setCreationDateRange(finalCreationDate);
    setIsVisible(!isVisible);
  } 
  
  const handleFolderName = (e) => {
    setFolderName(e.target.value);
}
const handleIncludeSubFolder = (e) => {
  setiIncludeSubFolder(includeSubFolder=="N" ? "Y" : "N");
}

const handleCreationDateFrom = (e) => {
  setCreationDateFrom(e.target.value);

}
const handleCreationDateTo = (e) => {
  setCreationDateTo(e.target.value);

}
const handleCreationDateOptionChange =(e) =>{
  
  if(creationDateToIsVisiable)
    setCreationDateTo("");
  setCreationDateToIsVisiable(!creationDateToIsVisiable);

}

  return (
   <>
   {isVisible 
    ?
    
   <Repository  isFileOpen={isFileOpen} 
                                    setFileOpen={setFileOpen} 
                                    lookInsideId={lookInsideId}
                                    setLookInsideId={setLookInsideId}
                                    breadcrumbs={breadcrumbs}
                                    setBreadcrumbs={setBreadcrumbs}
                                    reload={reload}
                                    setReload={setReload}
                                    deletedFolders={props.deletedFolders}
                                    setDeletedFolders={props.setDeletedFolders}

                                    folderName={folderName}
                                    includeSubFolder={includeSubFolder}
                                    creationDateRange={creationDateRange}

                                    />
    
  :
    <div>
   <div className="doc">
    <div className="cen">
    <div className="up">
    <p className='type'>Type</p>
    <h3>Folder Search</h3>
  </div>
   </div>
   <div className="down">
    <p className='type'>Search In</p>
    <div className="input-box">
    <input type="text" className='input' placeholder='Search Here' />
    <button className='btn'>Browse</button>
    </div>
    <label >
    <input type="checkbox" className='c-box' value={includeSubFolder} onChange={handleIncludeSubFolder}/>Include Sub Folder
    </label>
   </div>
   </div>
   <div className="general">
    <div className="gen">
      <p className='type'>General<span className="line"></span></p>

    </div>
    
    < div className="d-name">
      <div className="f-name">
        <p>Folder Name</p>
        <input type="text" className='srch' value={folderName}   onChange={handleFolderName} />
      </div>
      <div className="owner">
        <p>Owner</p>
        <input type="text" className='own' placeholder='Select or type group' />
        <input type="text" className='own' placeholder='Select or type user'/>
      </div>
      
    </div>
    <div className="date">
      <div className="create">
        <p>Created Date</p>
        <div className="box">
          <select className='equal' onChange={handleCreationDateOptionChange} >
            <option value="Equals">Equals</option>
            <option value="Between">Between</option>
          </select>
          <input type="date" className='dat' value={creationDateFrom} onChange={handleCreationDateFrom}/>
          
          { creationDateToIsVisiable && <input type="date" className='dat' value={creationDateTo} onChange={handleCreationDateTo}/>  }
          
           

        </div>
      </div>
      <div className="modify">
        <p>Modified Date</p>
        <div className="box">
          <select className='equal'>
          <option value="Equals">Equals</option>
            <option value="Betweeen">Between</option>
          </select>
          <input type="date" className='dat' />
          <input type="date" className='dat' />
          

        </div>
      </div>
    </div>

    <p className='type'>Data Class<span className="line2"></span></p>
    
    <p className='type'>Set data class</p>
   
    <input type="text" className='input side ' placeholder='select or type'  />
    <div className="buton">
      <button className='btn1'>Clear All</button>
      <button className='btn2'  onClick={() => searchFolder()}  >Search</button>
    </div>
   </div>
   </div>
      }
   </>
  )
}

export default FolderSearch