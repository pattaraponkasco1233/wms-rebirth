// src/auth/jwt/useJwt.ts

import JwtService from './jwtService'; // นำเข้า Service Instance
import { JwtConfig } from "./jwtDefaultConfig"; // นำเข้า Type สำหรับ Config
import { axiosAuth } from '../../guard/interceptor/axios.instance';

// ใช้ Partial<JwtConfig> เพื่อระบุว่า argument เป็น optional และเป็น subset ของ JwtConfig
export default function useJwt(jwtOverrideConfig?: Partial<JwtConfig>) {
  // สร้าง Instance ใหม่พร้อมส่ง config เข้าไปใน Constructor
  const jwt = new JwtService(axiosAuth, jwtOverrideConfig);

  return {
    jwt
  };
}