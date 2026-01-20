// src/shares/hooks/useAuth.ts

import { useState, useCallback } from "react";
import { AxiosError } from "axios";
// สมมติว่าไฟล์เหล่านี้อยู่ที่ Path ที่ถูกต้อง
import JwtService from "../../auth/jwt/jwtService";
import { getWmsStorage, updateWmsStorage } from "../../utils/setServerHelper";
import { axiosAuth } from "../../guard/interceptor/axios.instance";
// สร้าง Instance ของ JwtService สำหรับใช้ใน Hook นี้
const jwtService = new JwtService(axiosAuth);

/**
 * Hook สำหรับจัดการสถานะการเข้าสู่ระบบและเชื่อมต่อกับ JWT API
 */
const useAuth = () => {
  // 1. ตรวจสอบสถานะการเข้าสู่ระบบ: โดยการดูว่ามี Access Token ใน Storage หรือไม่
  const initialAuthStatus = !!getWmsStorage().token;
  const [isAuthenticated, setIsAuthenticated] =
    useState<boolean>(initialAuthStatus);

  /**
   * ดำเนินการล็อกอินด้วย Username และ Password
   * @param username ชื่อผู้ใช้
   * @param password รหัสผ่าน
   * @param plant รหัส Plant/Server ที่เลือก
   * @returns Promise<boolean> true หากล็อกอินสำเร็จ
   */
  const login = useCallback(
    async (username: string, password: string, plant?: string): Promise<boolean> => {
      try {
        // 2. เรียกใช้ Method login จาก JwtService (เชื่อมต่อกับ API จริง)
        const response = await jwtService.login({
          user_name: username,
          password: password,
          warehouse_id: plant,
          ip: "00.000.00.00",
          login_web: 1
        });



        // ตรวจสอบสถานะ Response ที่สำเร็จ (ปกติคือ 200 หรือ 201)
        if (response.status === 200 || response.status === 201) {
          const { data } = response;

          // 3. บันทึก Access Token และ Refresh Token
          // สมมติว่า API คืนค่า Tokens ภายใต้ key: access_token.token และ refresh_token.token
          const accessToken = data.access_token?.token || data.access_token;
          const refreshToken = data.refresh_token?.token || data.refresh_token;

          if (accessToken && refreshToken) {
            // อัปเดต Tokens และสถานะการล็อกอินใน Storage
            updateWmsStorage({
              token: accessToken,
              refreshToken: refreshToken,
            });

            // อัปเดต State ใน Hook
            setIsAuthenticated(true);
            return true;
          }
        }

        // ถ้า Response status ไม่ใช่ 200/201 หรือไม่มี Token
        return false;
      } catch (error) {
        const axiosError = error as AxiosError;

        // 4. จัดการข้อผิดพลาด (เช่น รหัสผ่านผิด, Server error)
        if (axiosError.response && axiosError.response.status === 401) {
          // Unauthorized (ชื่อผู้ใช้/รหัสผ่านผิด)
          return false;
        }

        console.error("Login API Error:", error);
        return false;
      }
    },
    []
  );

  /**
   * ดำเนินการ Logout
   */
  const logout = useCallback(() => {
    // คุณอาจเพิ่ม logic การเรียก API logout ที่นี่ด้วยก็ได้

    // ลบ Tokens และสถานะการล็อกอินออกจาก Storage
    updateWmsStorage({
      token: undefined,
      refreshToken: undefined,
      server: undefined,
    });

    // ล้างสถานะใน State
    setIsAuthenticated(false);
    // ไม่ต้องใช้ localStorage.removeItem('wms') อีกต่อไป เพราะเราใช้ updateWmsStorage
  }, []);

  return {
    isAuthenticated,
    login,
    logout,
    // อาจเพิ่มฟังก์ชันสำหรับตรวจสอบสิทธิ์ (checkPermission) ที่นี่
  };
};

export default useAuth;
