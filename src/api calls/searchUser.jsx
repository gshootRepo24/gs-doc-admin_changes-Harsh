import axios from 'axios';

// Define the URL and the request body
const url = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;
const BASE_URL = `${url}/userservice/v1/searchuser`;

// Function to perform the POST request
const searchUsers = async () => {
  const requestBody = {
    userDBId: '2078803942',
    groupIndex: null,
    userName: '',
    personalName: '',
    familyName: '',
    expiryDateTime: '',
    sortOrder: 'A',
    noOfRecordsToFetch: '100',
    startFrom: '1',
    creationDateTime: ''
  };

  const headers = {
    'tenantId': '60379039920c82760cbf9bee',
    'userId': '61c033f82e781506b8c09342'
  };

  try {
    const response = await axios.post(BASE_URL, requestBody, { headers });
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error; 
  }
};

export default searchUsers;
