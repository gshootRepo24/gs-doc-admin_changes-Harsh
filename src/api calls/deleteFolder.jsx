import axios from "axios";

const url = window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '');
const BASE_URL = url + '/folder/v1/searchfolder';

export const deleteFolder=async(lookInFolder, startFrom, orderBy, sortOrder)=>{
    try {
        const response = await axios.post(BASE_URL,{
            lookInFolder,
            includeSubFolder: "N",
            name: "",
            owner: "",
            creationDateRange: "",
            expiryDateRange: "",
            accessDateRange: "",
            revisedDateRange: "",
            referenceFlag: "B",
            startFrom, 
            reportFlag: "N",
            reportType: "xls",
            noOfRecordsToFetch: 10, 
            orderBy: orderBy,
            sortOrder: sortOrder,
            folderType: "G",
            dataAlsoFlag: "Y",
            includeTrashFlag: "Y"
        })

        return response.data;
    } catch (error) {
        console.error('error while deleting the folder',error);
        throw error;
    }
}