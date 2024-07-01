import axios from 'axios';

const copyFolder = async (folderIndex, destFolderIndex, parentFolderIndex) => {
  const url = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;
  const BASE_URL = `${url}/folder/v1/copyfolder`;

  const body = {
    folderIndex: parseInt(folderIndex, 10),
    destFolderIndex: parseInt(destFolderIndex, 10),
    parentFolderIndex: parseInt(parentFolderIndex, 10),
    dataAlsoFlag: "Y"
  };

  const headers = {
    userDBId: '-1228510595' 
  };

  try {
    const response = await axios.post(BASE_URL, body, { headers });
    return response.data;
  } catch (error) {
    console.error('Error copying folder:', error);
    throw error;
  }
};

export default copyFolder;
