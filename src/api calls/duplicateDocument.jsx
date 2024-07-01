import axios from 'axios';

const copyDocument = async (destFolderIndex, parentFolderIndex, documentIndex) => {

  const url = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;
  const BASE_URL = `${url}/document/v1/copydocument`;
  //const url = 'http://107.22.128.192:8084/documentservice-0.0.1-SNAPSHOT/document/GSDocs/v1/copydocument?cabinetName=gscabinet';

  const body = {
    destFolderIndex: parseInt(destFolderIndex, 10),
    dataAlsoFlag: "N",
    documents: {
      document: [
        {
          documentIndex: parseInt(documentIndex, 10), 
          parentFolderIndex: parseInt(parentFolderIndex, 10)
        }
      ]
    },
    versionsAlso: "N"
  };

  const headers = {
    userDBId: '-1228510595'
  };

  try {
    const response = await axios.post(BASE_URL, body, { headers });
    return response.data;
  } catch (error) {
    console.error('Error copying document:', error);
    throw error;
  }
};

export default copyDocument;
