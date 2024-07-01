import React, { useState } from 'react';
import Repository from './Repository';
import InsideARepo from './InsideARepo';


const RepositoryHome = (props) => {
    const [isFileOpen, setFileOpen] = useState(true);
    const [lookInsideId,setLookInsideId]= useState(0);
    const [lookInFolderVolumeIdx,setLookInFolderVolumeIdx]= useState(0);
    const [breadcrumbs, setBreadcrumbs] = useState([{ name: "Cabinet", index: 0 }]);
    const [reload,setReload] = useState(true);

    return (
        <div>
            {isFileOpen ? <Repository  isFileOpen={isFileOpen} 
                                    setFileOpen={setFileOpen} 
                                    lookInsideId={lookInsideId}
                                    setLookInsideId={setLookInsideId}
                                    breadcrumbs={breadcrumbs}
                                    setBreadcrumbs={setBreadcrumbs}
                                    reload={reload}
                                    setReload={setReload}
                                    deletedFolders={props.deletedFolders}
                                    setDeletedFolders={props.setDeletedFolders}
                                    open={props.open}
                                    lookInFolderVolumeIdx={lookInFolderVolumeIdx}
                                    setLookInFolderVolumeIdx={setLookInFolderVolumeIdx}
                                    /> : 
                        <InsideARepo  isFileOpen={isFileOpen} 
                                    setFileOpen={setFileOpen} 
                                    lookInsideId={lookInsideId} 
                                    setLookInsideId={setLookInsideId}
                                    breadcrumbs={breadcrumbs}
                                    setBreadcrumbs={setBreadcrumbs}
                                    reload={reload}
                                    setReload={setReload}
                                    deletedFolders={props.deletedFolders}
                                    setDeletedFolders={props.setDeletedFolders}
                                    lookInFolderVolumeIdx={lookInFolderVolumeIdx}
                                    setLookInFolderVolumeIdx={setLookInFolderVolumeIdx}
                                    />
            }
        </div>
    );
}

export default RepositoryHome;

