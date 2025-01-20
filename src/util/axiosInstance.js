import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL_PROD,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptor to include token in Authorization header
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken'); // Get token from localStorage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

export default api;