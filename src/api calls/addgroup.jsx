import axios from 'axios';


const BASE_URL = 'http://107.22.128.192:8084/auth/v1/addgroup';

export const addGroup = async (lookInGroup, name) => {
    try {
        const body = {
            group: {
                groupName: "Home Loan",
                privileges: "",
                comment: "Home Loan",
                groupType: "G",
                ownerIndex: "21"
            }
        };

        const response = await axios.post(BASE_URL, body);
        return response.data;
    } catch (error) {
        console.error('Error while adding group', error);
        throw error;
    }
};


