import axios from 'axios';
export const getGroupList = async (userIndex, groupType, orderBy, sortOrder, previousIndex, noOfRecordsToFetch, lastSortField) => {
  const url = window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '');
 const BASE_URL = url + '/userservice/v1/getgrouplist';

  const params = {
      "userIndex":1,
      "groupType":"B",
      "orderBy":2,
      "sortOrder":"",
      "previousIndex":"1",
      "noOfRecordsToFetch":"100"  ,
      "lastSortField" : ""
  };
  try {
    const response = await axios.post(BASE_URL, params);
    return response.data;
  } catch (error) {
    console.error('Error fetching records:', error);
    throw error;
  }
};
export default getGroupList;