import axios from "axios";


const url = window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '');
const BASE_URL = url + '/document/v1/searchdocument';

export const searchdocument = async (folderIndex,startingPosition, orderBy, sortOrder)=>{
    try {
        const response = await axios.post(BASE_URL,{
            searchText: "",
            lookInFolder: [folderIndex],
            includeSubFolder: "N",
            name: "",
            owner: "",
            referenceFlag: "B",
            sortOrder: sortOrder,
            startFrom: startingPosition,
            noOfRecordsToFetch: 10,
            orderBy: orderBy,
            checkOutStatus: "",
            checkOutByUser: "",
            dataAlsoFlag: "N",
            createdByAppName: "",
            author: "",
            annotationFlag: "N",
            linkDocFlag: "N",
            includeSystemFolder: "NN",
            includeTrashFlag: "N",
            thumbNailAlsoFlag: "N"
        });

        return response.data;
    } catch (error) {
        console.error("Error getting document list", error);
    }
}