import axios from 'axios';

const moveDocument = async (destFolderIndex, parentFolderIndex, folderIndex) => {
  const url = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;
  const BASE_URL = `${url}/document/v1/movedocument`;

  const body = {
    destFolderIndex: parseInt(destFolderIndex, 10),
    deleteReferenceAlsoFlag: "Y",
    documents: {
      document: [
        {
          documentIndex: parseInt(folderIndex, 10),
          parentFolderIndex: parseInt(parentFolderIndex, 10)
        }
      ]
    }
  };

  const headers = {
    userDBId: '-1228510595'
  };

  try {
    const response = await axios.post(BASE_URL, body, { headers });
    return response.data;
  } catch (error) {
    console.error('Error moving document:', error);
    throw error;
  }
};

export default moveDocument;
