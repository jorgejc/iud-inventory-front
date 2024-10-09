import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:4000/' 
    baseURL: 'https://iud-inventory-app.onrender.com/'
});

export {
    axiosInstance
}