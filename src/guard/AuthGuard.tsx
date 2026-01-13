import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../shares/hooks/useAuth";
import { getWmsStorage } from "../utils/setServerHelper";
import { isTokenExpired } from "../utils/jwtHelper";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // ตรวจสอบ JWT Token ว่าหมดอายุหรือไม่
    const checkTokenExpiration = () => {
      const { token } = getWmsStorage();

      // ถ้าไม่มี token หรือ token หมดอายุ
      if (!token || isTokenExpired(token)) {
        // ทำการ logout และเด้งไปหน้า login
        logout();
        navigate("/login", { replace: true });
        return false;
      }

      return true;
    };

    // ตรวจสอบทันทีที่ component mount
    checkTokenExpiration();

    // ตั้ง interval ให้ตรวจสอบทุก 60 วินาที
    const intervalId = setInterval(checkTokenExpiration, 60000);

    // Clean up interval เมื่อ component unmount
    return () => clearInterval(intervalId);
  }, [navigate, logout]);

  // ตรวจสอบสถานะการเข้าสู่ระบบ
  if (!isAuthenticated) {
    navigate("/login", { replace: true });
    return null;
  }

  // ถ้าเข้าสู่ระบบแล้วและ token ยังไม่หมดอายุ: อนุญาตให้เข้าถึง Component ลูก
  return <>{children}</>;
};

export default AuthGuard;
