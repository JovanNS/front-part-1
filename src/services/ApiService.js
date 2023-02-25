import axios from 'axios'
import { useAuth } from '@/stores/useAuth'

const apiClient = axios.create({
  baseURL: 'http://localhost:80/api/v1/'
})

apiClient.interceptors.request.use(
  function(config) {
    const auth = useAuth();
    if (auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default apiClient
