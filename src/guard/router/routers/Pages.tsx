import React from "react";
import { RouteProps } from "react-router-dom";

// นำเข้า Components
import LoginPage from "../../../pages/authentication/Login"; // <<< นำเข้า LoginPage
import NotFoundPage from "../../../pages/misc/NotFound"; // <<< นำเข้า NotFoundPage';

/**
 * Interface สำหรับ Route ที่รวมคุณสมบัติเพิ่มเติม
 */
export type CustomRouteProps = RouteProps & {
  element: React.ReactNode;
  path: string;
  isProtected?: boolean; // false คือ Public, true คือ Protected
  layout?: React.ElementType; // ระบุ Component Layout
};

// Array ของ Routes สำหรับหน้าทั่วไป/สาธารณะ
export const PageRoutes: CustomRouteProps[] = [
  // 1. Login Route (UNPROTECTED)
  {
    path: "/login",
    element: <LoginPage />,
    isProtected: false,
  },
  {
    path: "/",
    element: <NotFoundPage />,
    isProtected: false,
  },
];
