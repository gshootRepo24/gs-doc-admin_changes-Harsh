// api.js
import axios from "axios";

const url = window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '');
const BASE_URL = url + '/userservice/v1/adduser';

const addUser = async (userDetails) => {
  try {
    const response = await axios.post(BASE_URL, userDetails);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export { addUser };
