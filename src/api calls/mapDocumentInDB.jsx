import axios from 'axios';

const url = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;
const BASE_URL = `${url}/document/v1/adddocument`;

export const mapDocumentInDB = async (
  parentFolderIndex,
  noOfPages,
  accessType,
  documentName,
  documentType,
  documentSize,
  createdByAppName,
  isIndex,
  validateDocumentImage
) => {
  try {
    const documentData = {
      parentFolderIndex,
      noOfPages,
      accessType,
      documentName,
      documentType,
      documentSize,
      createdByAppName,
      isIndex,
      validateDocumentImage,
    };

    const response = await axios.post(BASE_URL, {
      document: documentData,
    });

    return response.data;
  } catch (error) {
    console.error('Error mapping document in DB:', error);
    throw error;
  }
};
