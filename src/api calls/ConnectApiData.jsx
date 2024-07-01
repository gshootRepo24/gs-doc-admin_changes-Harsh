import axios from 'axios';

const url = window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '');
const BASE_URL = url + '/auth/v1/connect';

async function login(username, password) {
    const loginUrl = `${BASE_URL}?cabinetName=growsite`;
    const body = {
        "userExist": "N",
        "userType": "U",
        "locale": "en-US",
        "applicationInfo": "GS",
        "applicationName": "GS",
        "userPassword": password,
        "listSysFolder": "N",
        "encrFlag": "N",
        "passAlgoType": "0"
    };

    try {
        const response = await axios.post(loginUrl, body, {
            headers: {
                'Content-Type': 'application/json',
                'U-Name': username
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Login failed');
        }
    } catch (error) {
        throw new Error('Error occurred while logging in: ' + error.message);
    }
}

export { login };
