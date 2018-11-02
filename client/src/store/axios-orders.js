import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://biorhythmics.firebaseio.com/'
});

export default instance;
