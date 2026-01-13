// src/guard/router/Router.tsx

import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AppRoutes } from "./routers"; // นำเข้า Routes ที่รวมไว้ทั้งหมด
import AuthGuard from "../AuthGuard"; // นำเข้า AuthGuard
import { getWmsStorage, updateWmsStorage } from "../../utils/setServerHelper";
import { isTokenExpired } from "../../utils/jwtHelper";

const basename = process.env.REACT_APP_BASENAME || "/";

// Component สำหรับการจัดการ Guard และ Layout
const RouteWrapper: React.FC<any> = ({
  element,
  isProtected,
  layout: LayoutComponent,
}) => {
  // 1. จัดการ Guard
  const content = isProtected ? <AuthGuard>{element}</AuthGuard> : element;

  // 2. จัดการ Layout
  if (LayoutComponent) {
    return <LayoutComponent>{content}</LayoutComponent>;
  }

  // ไม่มี Layout
  return content;
};

// Component สำหรับตรวจสอบ Token เมื่อเข้าเว็บ
const TokenChecker: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // ตรวจสอบ Token เมื่อเข้าเว็บครั้งแรกหรือเปลี่ยน route
    const { token } = getWmsStorage();

    // ถ้าอยู่หน้า login ไม่ต้องตรวจสอบ
    if (location.pathname === "/login") {
      return;
    }

    // ถ้าไม่มี token หรือ token หมดอายุ
    if (token && isTokenExpired(token)) {
      // ล้าง token และ redirect ไปหน้า login
      updateWmsStorage({
        token: undefined,
        refreshToken: undefined,
      });
      navigate("/login", { replace: true });
    }
  }, [navigate, location.pathname]);

  return null;
};

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter basename={basename}>
      <TokenChecker />
      <Routes>
        {AppRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <RouteWrapper
                element={route.element}
                isProtected={route.isProtected}
                layout={route.layout}
              />
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
