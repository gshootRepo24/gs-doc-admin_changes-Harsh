import React from 'react'
import './DocumentSearch.css'
import PushPinIcon from '@mui/icons-material/PushPin';
import InfoIcon from '@mui/icons-material/Info';
const DocumentSearch = () => {
  return (
   <>
   <div className="doc-search">
    <div className="cen">
    <div className="up">
    <p className='type'>Type</p>
    <h3>Document Search</h3>
  </div>
  <div className="icon">
     <PushPinIcon style={{color:'blue'}} />
  <p className='pin'>Pin search</p>
  </div>
   </div>
   <div className="down">
    <p className='type'>Search In</p>
    <div className="input-box">
    <input type="text" className='input' placeholder='Search Here' />
    <button className='btn'>Browse</button>
    </div>
    <label >
    <input type="checkbox" className='c-box'/>Include Sub Folder
    </label>
   </div>
   </div>
   <div className="general">
    <div className="gen">
      <p className='type'>General<span className="line"></span></p>

    </div>
    <div className="d-name">
      <p className='type'>
        Document Name
      </p>
      
    <input type="text" className='input side'  />
    </div>

    <p className='type'>Full Text Search<span className="line2"></span></p>
    <div className="radio">
      <div className="fst">

      <input type="radio" name='card' />Wild Card Search<InfoIcon fontSize='small' />
      <input type="radio" name='card' />Conditional Search<InfoIcon fontSize='small' />
      </div>
    </div>
    <p className='type'>Full Text Search</p>
   
    <input type="text" className='input side ' placeholder='Enter Text for Wild Card FTS Search'  />
    <div className="buton">
      <button className='btn1'>Clear All</button>
      <button className='btn2'>Search</button>
    </div>
   </div>
   </>
  )
}

export default DocumentSearch
