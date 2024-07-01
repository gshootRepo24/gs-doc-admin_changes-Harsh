import axios from 'axios';

const url = window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '');
const BASE_URL = url + '/folder/v1/searchfolder';

async function searchFolder(lookInFolder, startFrom, orderBy, sortOrder, includeInTrash , folderName ,includeSubFolder  ,creationDateRange) {
  try {
    const body = {
      lookInFolder,
      includeSubFolder:includeSubFolder ==undefined ?  "N" :includeSubFolder,
      name: folderName===undefined ? "": folderName,
      owner: "",
      creationDateRange: creationDateRange==undefined ? "" : creationDateRange,
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
      includeTrashFlag: includeInTrash
    };

    const response = await axios.post(BASE_URL, body);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export {searchFolder}
