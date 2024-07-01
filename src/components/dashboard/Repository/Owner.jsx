import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';

const columns = [
  
  { field: 'firstName', headerName: 'Name', width: 130 },
  { field: 'lastName', headerName: 'Data Class', width: 130 },
  { field: 'Owner', headerName: 'Owner', width: 130 },
  { field: 'modifiedDate', headerName: 'Modified Date', width: 160 },
  
];

const rows = [
  { id: 1, lastName: 'None', firstName: 'test',Owner:'Supervisor',modifiedDate:'23/02/2024 22:09'},
  { id: 2, lastName: 'None', firstName: 'Document',Owner:'Supervisor',modifiedDate:'23/02/2024 21:52'},
];

export default function DataTable() {
  return (
    <>
    <div className='head'>
    <h1>Cabinet</h1>
    <div className="structure ">
    <CreateNewFolderOutlinedIcon className='ham' />
    <AccessAlarmsIcon className='ham' />
    <FilterAltOutlinedIcon className='ham' />
        <div className='ham'>
        <MenuOutlinedIcon />
        <GridViewOutlinedIcon />
        
        </div>
    </div>
    </div>
    
    <div style={{ height: 400, width: '100%' }}>
       <div>
         <StarOutlineIcon/>
         <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        
        checkboxSelection
      />
        </div>
    </div>
  </>
  );
}
