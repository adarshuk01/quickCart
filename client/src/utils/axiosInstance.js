// utils/axiosInstance.js
import axios from "axios";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // 🔹 Replace with your backend base URL
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token (optional)
      localStorage.removeItem("token");

      // Redirect to login
      window.location.href = "/#/login"; 
      // 🔹 Using window.location ensures redirect even outside React hooks
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
