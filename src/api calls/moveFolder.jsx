import axios from 'axios';

const moveFolder = async (folderIndex, destFolderIndex, parentFolderIndex) => {
  const url = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;
  const BASE_URL = `${url}/folder/v1/movefolder`;

  const body = {
    folderIndex: parseInt(folderIndex, 10),
    destFolderIndex: parseInt(destFolderIndex, 10),
    checkOutFlag: "N",
    lockFlag: "N",
    parentFolderIndex: parseInt(parentFolderIndex, 10)
  };

  const headers = {
    userDBId: '-1228510595' // Replace this with the appropriate userDBId if needed
  };

  try {
    const response = await axios.put(BASE_URL, body, { headers });
    return response.data;
  } catch (error) {
    console.error('Error moving folder:', error);
    throw error;
  }
};

export default moveFolder;
