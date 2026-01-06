// src/services/api/axiosInstance.ts

import axios from 'axios';
import { API_CONFIG } from '../../config/api.config';

const axiosInstance = axios.create({
    baseURL: API_CONFIG.baseURL,
    timeout: API_CONFIG.timeout,
    headers: API_CONFIG.headers,
});

// Request Interceptor - แนบ Token ทุกครั้งที่ยิง API
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor - จัดการ Error
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token หมดอายุ - redirect ไป login
            localStorage.removeItem('token');
            globalThis.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
