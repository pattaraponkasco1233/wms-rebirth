// src/guard/interceptor/setupInterceptors.ts

import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { navigateAppName } from "../../utils/Utils"; 
import jwtDefaultConfig, { JwtConfig as ImportedJwtConfig } from "../../auth/jwt/jwtDefaultConfig"; 
// นำเข้า Class JwtService (ต้องมั่นใจว่าใช้ Class Export)
import JwtServiceClass from "../../auth/jwt/jwtService"; 
import { updateWmsStorage } from "../../utils/setServerHelper"; // ใช้สำหรับล้างข้อมูล

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  useApiKey?: boolean;
}

// 1. ประกาศตัวแปรเพื่อเก็บ Instance แบบ Singleton (แต่ยังไม่สร้าง)
let jwtServiceInstance: JwtServiceClass | null = null; 

// ฟังก์ชันสำหรับสร้างหรือเรียกคืน Singleton Instance
const getJwtServiceInstance = (instance: AxiosInstance): JwtServiceClass => { // 🛑 ต้องรับ instance
    if (jwtServiceInstance === null) {
        // 🛑 ส่ง instance ที่รับเข้ามาให้ Constructor
        jwtServiceInstance = new JwtServiceClass(instance); 
    }
    return jwtServiceInstance;
}
/**
 * ฟังก์ชันหลักในการตั้งค่า Axios Request และ Response Interceptors
 * @param instance Axios Instance ที่ต้องการตั้งค่า
 */
const setupInterceptors = (instance: AxiosInstance): void => {
    // 3. เรียกใช้ Instance ภายในฟังก์ชัน
    const jwtService = getJwtServiceInstance(instance); 
    const jwtConfig: ImportedJwtConfig = jwtService.jwtConfig; 
    
    // --- 1. Request interceptor ---
    instance.interceptors.request.use(
        (config: CustomAxiosRequestConfig) => {
            // ... (Logic การดึง accessToken เหมือนเดิม) ...
            const oneWms = JSON.parse(localStorage.getItem("wms") || "{}");
            const accessToken = oneWms.token; // ใช้ .token ตามที่เรากำหนดใน WmsData
            // ... (Logic การตั้งค่า Header เหมือนเดิม) ...
            if (config.useApiKey && accessToken) {
                config.headers.Authorization = `${jwtConfig.tokenType} ${accessToken}`;
                config.headers.api_key = jwtConfig.apiKey;
            } else if (config.useApiKey) {
                config.headers.api_key = jwtConfig.apiKey;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // --- 2. Response interceptor (ส่วนจัดการ Refresh Token) ---
    // ... (Logic จัดการ Error 401 เหมือนเดิม แต่ใช้ jwtService แทน JwtService) ...

    instance.interceptors.response.use(
        (response: AxiosResponse) => {
            return response;
        },
        async (error: AxiosError) => {
            const { config, response } = error;
            const originalRequest = config as CustomAxiosRequestConfig; 

            if (response && response.status === 401) {
                // ... (Logic การจัดการ Error Code 000000 และ 9xxxxxx) ...
                const errorCode = (response.data as any)?.code;

                switch (errorCode) {
                    case "000000": // Token หมดอายุ (ต้อง Refresh)
                        updateWmsStorage({ token: undefined, refreshToken: undefined }); // ล้างข้อมูลเก่า
                        
                        const refreshResponse = await jwtService.refreshToken(); 

                        if (refreshResponse.status === 401) {
                            window.location.href = navigateAppName("/401-not-authorized");
                        } else {
                            // ... (Logic บันทึก Token ใหม่และการ Retry Request) ...
                            const newAccessToken = refreshResponse.data.access_token.token;
                            const newRefreshToken = refreshResponse.data.refresh_token.token;

                            jwtService.setToken(newAccessToken); 
                            jwtService.setRefreshToken(newRefreshToken); 
                            jwtService.onAccessTokenFetched(newAccessToken); 
                            
                            const retryOriginalRequest = new Promise((resolve) => {
                                jwtService.addSubscriber((accessToken: string) => {
                                    originalRequest.headers.Authorization = `${jwtConfig.tokenType} ${accessToken}`;
                                    resolve(axios(originalRequest));
                                });
                            });
                            return retryOriginalRequest;
                        }
                        break;
                    
                    // ... (Case 900000, 999999 เหมือนเดิม) ...
                    case "900000": 
                    case "999999": 
                        updateWmsStorage({ token: undefined, refreshToken: undefined });
                        window.location.href = navigateAppName("/401-not-authorized");
                        break;
                    
                    default:
                        return Promise.reject(error);
                }
            }
            return Promise.reject(error);
        }
    );
};

export default setupInterceptors;