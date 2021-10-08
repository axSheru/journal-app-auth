import axios from 'axios';

const journalApi = axios.create({
    baseURL: 'https://vue-demos-ee7c3-default-rtdb.firebaseio.com'
})

export default journalApi