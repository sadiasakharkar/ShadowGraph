import axios from 'axios';
import { getStoredToken } from '../context/AuthContext';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: 8000
});

apiClient.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      const from = `${window.location.pathname}${window.location.search}`;
      window.dispatchEvent(new CustomEvent('shadowgraph:unauthorized', { detail: { from } }));
    }
    return Promise.reject(error);
  }
);
