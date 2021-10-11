import axios from 'axios';

const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params: {
        key: 'AIzaSyC6VmQ0O0lIpUg4DMhB3L6uhAm5xYWo3AM'
    }
})

export default authApi