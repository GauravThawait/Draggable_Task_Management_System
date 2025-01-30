import axios from "axios";

const token = localStorage.getItem("token"); 

const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
