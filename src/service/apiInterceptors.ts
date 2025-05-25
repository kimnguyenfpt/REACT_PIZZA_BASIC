import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { refreshToken, logout } from '../redux/slices/authSlice';
import User from '../models/User.model';

// Cấu hình API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Tạo instance axios
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor cho request
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Thêm interceptor cho response
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    // Nếu lỗi 401 và chưa thử refresh token
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Thử refresh token
        const newToken = await refreshToken();
        
        // Cập nhật token trong header
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        
        // Thử lại request
        return api(originalRequest);
      } catch (refreshError) {
        // Nếu refresh token thất bại, logout user
        logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api; 