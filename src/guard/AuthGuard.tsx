import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../shares/hooks/useAuth";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // 1. ตรวจสอบสิทธิ์
  //   if (!isAuthenticated) {
  //     // 2. เรียก navigate
  //     navigate("/login", { replace: true });

  //     // 3. สำคัญ: ต้อง Return null หรือ Loading Component เพื่อหยุดการ Render Component ลูก
  //     // จนกว่าการ Redirect จะเกิดขึ้น
  //     return null; // หรือ <LoadingSpinner />
  //   }

  // ถ้าเข้าสู่ระบบแล้ว: อนุญาตให้เข้าถึง Component ลูก
  return <>{children}</>;
};

export default AuthGuard;
