// src/guard/router/routers/TruckCheckin.tsx

import React from "react";
import { RouteProps } from "react-router-dom";

// นำเข้า Components
import TruckCheckinPage from "../../../pages/truck-checkin/index";
import MainLayout from "../../../components/layout/MainLayout";

// Interface
export type CustomRouteProps = RouteProps & {
  element: React.ReactNode;
  path: string;
  isProtected?: boolean;
  layout?: React.ElementType;
  pageTitle?: string; // ชื่อหน้าที่จะแสดงใน Header
};

// Routes สำหรับ Truck Check-in
export const TruckCheckinRoutes: CustomRouteProps[] = [
  {
    path: "/truck-checkin",
    element: <TruckCheckinPage />,
    isProtected: true,
    layout: MainLayout,
    pageTitle: "Truck Check-in",
  },
];
