import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';
const axiosInstance = axios.create({
  
});

// Add an "app-id" header to all requests
axiosInstance.defaults.headers.common['app-id'] = process.env.REACT_APP_DUMMY_APP_ID;

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance, BASE_URL };
