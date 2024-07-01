import axios from 'axios';
    const url = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;
    const BASE_URL = `${url}/imageservice/v1/getdocumentbuffer`;
const getDocumentBuffer = async (volumeId, siteId, documentIndex) => {
  try {
    const response = await axios.post(BASE_URL, {
      volumeId,
      siteId,
      documentIndex,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching document buffer:', error);
    throw error;
  }
};

export default getDocumentBuffer;
