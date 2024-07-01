import axios from "axios";

const url = window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '');
const BASE_URL = url + '/userservice/v1/changeuserproperty';

async function changeUserProperty(userIndex,binaryString, password, firstName, expiryDate, comment, email) {
  
  try {
    const body = {
        userDBId: "123",
        user: {
          oldPassword: "",
          password: password,
          userIndex: userIndex,
          name: firstName,
          personalName: "",
          familyName: "",
          expiryDateTime: expiryDate,
          privileges: binaryString, 
          userAlive: "Y",
          comment: comment,
          mailId: email,
          fax: "", 
          parentGroupIndex: "1",     
          userType: "U"   
        }
      };
    
        const response=await axios.post(BASE_URL,body);
        return response.data;
  } catch (error) {
    console.error(error);
  }
}

export {changeUserProperty}