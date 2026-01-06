// src/config/api.config.ts

// Environment-specific URLs
export const API_URLS = {
    development: 'http://localhost:3000/api',
    uat: 'https://uat-api.your-domain.com/api',
    production: 'https://api.your-domain.com/api',
};

// เลือก URL ตาม Environment
export const getApiUrl = (): string => {
    // ใช้ REACT_APP_ENV ที่ตั้งค่าใน package.json scripts
    const env = process.env.REACT_APP_ENV || 'development';
    return API_URLS[env as keyof typeof API_URLS] || API_URLS.development;
};

// API Configuration
export const API_CONFIG = {
    // Base URL สำหรับ API - เลือกอัตโนมัติตาม environment
    baseURL: getApiUrl(),

    // Timeout สำหรับ Request (milliseconds)
    timeout: 30000,

    // Headers เริ่มต้น
    headers: {
        'Content-Type': 'application/json',
    },
};

// Export current environment
export const getCurrentEnv = (): string => {
    return process.env.REACT_APP_ENV || 'development';
};

// Debug: แสดง environment ปัจจุบัน (เฉพาะ development)
if (process.env.REACT_APP_ENV === 'development') {
    console.log('🌍 Current Environment:', getCurrentEnv());
    console.log('🔗 API Base URL:', API_CONFIG.baseURL);
}
