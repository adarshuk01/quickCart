// src/utils/axiosInstance.js
import axios from 'axios';

// If you're outside React components, use window.location to redirect
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
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

// 🔁 Redirect to login on 401 Unauthorized
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('adminToken'); // optional: clear invalid token
      window.location.href = '/admin/login'; // redirect to login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
