import axios from 'axios';

const url = window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '');
const BASE_URL = url + '/folder/v1/searchfolder';

export const fetchFolderList = async (folderIndex) => {
  folderIndex=  folderIndex==undefined ? "0" : folderIndex
  try {
    const response = await axios.post(BASE_URL, {
      folderIndex,
      previousIndex: 1,
      noOfRecordsToFetch: 10,
      orderBy: 1,
      sortOrder: 'A',
      lastSortField: '',
      dataAlsoFlag: 'N',
      accessType: 'S',
      folderType: 'G'
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
