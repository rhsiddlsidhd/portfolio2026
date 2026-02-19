import { AxiosInstance, AxiosError } from "axios";

// Centralized error handling logic
const handleError = (error: AxiosError) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error("API Error Response:", error.response.data);
    console.error("Status:", error.response.status);
    console.error("Headers:", error.response.headers);
    // You can implement custom logic here, e.g., show a toast message
    // alert(`Error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
  } else if (error.request) {
    // The request was made but no response was received
    console.error("API Error Request:", error.request);
    // alert('Error: No response received from server. Please check your network connection.');
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error("API Error Message:", error.message);
    // alert(`Error: ${error.message}`);
  }
  return Promise.reject(error);
};

// Function to apply interceptors
export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  // Request interceptor (optional, for adding auth tokens, etc.)
  axiosInstance.interceptors.request.use(
    (config) => {
      // Example: Add an authorization token
      // const token = localStorage.getItem('token');
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  // Response interceptor for error handling
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    handleError, // Use the centralized error handler
  );
};
