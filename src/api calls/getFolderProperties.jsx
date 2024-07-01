import axios from "axios";


const url = window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '');
const BASE_URL = url + '/folder/v1/getfolderproperty';

export const getFolderProperties = async (lookInsideId)=>{
    try {
        const body ={
            "folderIndex":lookInsideId,
            "dataAlsoFlag": "N"
        }
        const response = await axios.post(BASE_URL,body);
        console.log('folder properties feteched successfully');
        return response.data;
    } catch (error) {
        console.error('error fetching folder properties',error);
        throw error;
    }
}