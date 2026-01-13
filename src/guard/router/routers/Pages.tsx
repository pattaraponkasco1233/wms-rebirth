import React from "react";
import { RouteProps } from "react-router-dom";

// นำเข้า Components
import LoginPage from "../../../pages/authentication/Login"; // <<< นำเข้า LoginPage
import RootRedirect from "../../../pages/misc/RootRedirect"; // <<< นำเข้า RootRedirect

/**
 * Interface สำหรับ Route ที่รวมคุณสมบัติเพิ่มเติม
 */
export type CustomRouteProps = RouteProps & {
  element: React.ReactNode;
  path: string;
  isProtected?: boolean; // false คือ Public, true คือ Protected
  layout?: React.ElementType; // ระบุ Component Layout
  pageTitle?: string; // ชื่อหน้าที่จะแสดงใน Header
};

// Array ของ Routes สำหรับหน้าทั่วไป/สาธารณะ
export const PageRoutes: CustomRouteProps[] = [
  // 1. Root Route - Redirect ตาม Token
  {
    path: "/",
    element: <RootRedirect />,
    isProtected: false,
    pageTitle: "หน้าหลัก",
  },
  // 2. Login Route (UNPROTECTED)
  {
    path: "/login",
    element: <LoginPage />,
    isProtected: false,
    pageTitle: "เข้าสู่ระบบ",
  },
];
