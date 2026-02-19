import axios from 'axios';

// Create a custom Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api', // Backend API base URL
  timeout: 10000, // Request timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
