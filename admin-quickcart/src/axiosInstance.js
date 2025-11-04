// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://quick-cart-hxvlrx3py-adarshuk01s-projects.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Authorization token if exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Redirect to login on 401 Unauthorized
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401 || error.response.status === 403 ) {
      localStorage.removeItem('adminToken'); // clear invalid token
      window.location.href = '/login'; // force redirect
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
