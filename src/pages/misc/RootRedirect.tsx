// src/pages/misc/RootRedirect.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getWmsStorage } from "../../utils/setServerHelper";
import { isTokenExpired } from "../../utils/jwtHelper";

/**
 * Component สำหรับจัดการ Redirect จากหน้า Root (/)
 * - ถ้าไม่มี token หรือ token หมดอายุ -> ไปหน้า login
 * - ถ้ามี token ที่ valid -> ไปหน้า proactive-monitor
 */
const RootRedirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { token } = getWmsStorage();

    // ตรวจสอบว่ามี token และยังไม่หมดอายุ
    if (token && !isTokenExpired(token)) {
      // มี token ที่ valid -> ไปหน้า proactive-monitor
      navigate("/proactive-monitor", { replace: true });
    } else {
      // ไม่มี token หรือ token หมดอายุ -> ไปหน้า login
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // แสดง loading หรือไม่แสดงอะไรเลยในขณะที่กำลัง redirect
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "1.2rem",
        color: "#666",
      }}
    >
      กำลังโหลด...
    </div>
  );
};

export default RootRedirect;
