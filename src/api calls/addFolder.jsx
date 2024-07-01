import axios from 'axios';

const url = window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '');
const BASE_URL = url + '/folder/v1/addfolder';

export const addFolder= async(lookInFolder,name)=>{
    try {
        const body = {
            folder: {
                parentFolderIndex: lookInFolder,
                folderName: name,
                accessType: 'S',
                expiryDateTime: '2122-03-22 17:01:55',
                imageVolumeIndex: 1,
                folderType: 'G',
                location: 'G',
                ownerIndex: 1,
                comment: 'Policy Folder',
                duplicateName: 'N',
                enableFtsFlag: 'N'
            }
        };

        const response=await axios.post(BASE_URL,body);
        return response.data;
    } catch (error) {
        console.error('error while adding folder',error);
        throw error;
    }
}