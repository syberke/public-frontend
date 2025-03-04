import axios from 'axios';
import { tokenUser } from '../stores/tokenStorage'; 

export const apiClient = axios.create({
  baseURL: 'https://book-store-backend-production-9682.up.railway.app/api/v1',
  headers: {
    "Content-Type": "application/json",
  },
});

// Gunakan interceptor untuk memperbarui token di setiap request
apiClient.interceptors.request.use((config) => {
  if (tokenUser.value) {
    config.headers.Authorization = `Bearer ${tokenUser.value}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
