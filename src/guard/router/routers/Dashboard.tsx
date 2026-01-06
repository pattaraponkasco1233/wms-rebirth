// สมมติว่าไฟล์นี้คือ src/guard/router/DashboardRoutes.ts หรือ Inbound.ts

import React from "react";
import { RouteProps } from "react-router-dom";

// นำเข้า Components ที่จำเป็น
import Dashboard from "../../../pages/dashboard/index";
import DashboardBookingCar from "../../../pages/dashboard/booking-car";
import DashboardCar from "../../../pages/dashboard/car";
import MainLayout from "../../../components/layout/MainLayout"; // <<< ต้อง Import Layout

// Interface ถูกแล้ว (CustomRouteProps)
export type CustomRouteProps = RouteProps & {
  element: React.ReactNode;
  path: string;
  isProtected?: boolean;
  layout?: React.ElementType;
};

// Array ของ Routes สำหรับ Dashboard
export const DashboardRoutes: CustomRouteProps[] = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    isProtected: true, // <<< แก้ไข: ต้องมี Guard ป้องกัน
    layout: MainLayout, // <<< เพิ่ม: ให้ใช้ Layout ที่มี Navbar/Sidebar
  },
  {
    path: "/dashboard/booking-car",
    element: <DashboardBookingCar />,
    isProtected: true,
    layout: MainLayout,
  },
  {
    path: "/dashboard/car",
    element: <DashboardCar />,
    isProtected: true,
    layout: MainLayout,
  },
];
