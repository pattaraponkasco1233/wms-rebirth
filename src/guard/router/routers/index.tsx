import React from "react";
import { RouteProps } from "react-router-dom";

// นำเข้า Components
import LoginPage from "../../../pages/login/Login";
import RootRedirect from "../../../pages/misc/RootRedirect";
import TruckCheckinPage from "../../../pages/truck-checkin/index";
import LogisticsPlannerCockpit from "../../../pages/logistics-planner/index";
import { ProactiveMonitorCockpit } from "../../../pages/proactive-monitor";
import WarehouseStatusMonitor from "../../../pages/warehouse-status/index";
import KpiOnTimePage from "../../../pages/kpi-on-time/index";
import MainLayout from "../../../components/layout/MainLayout";

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

// รวม Array ของ Routes ทั้งหมด
export const AppRoutes: CustomRouteProps[] = [
  // ==================== Public Routes ====================
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

  // ==================== Truck Check-in Routes ====================
  {
    path: "/truck-checkin",
    element: <TruckCheckinPage />,
    isProtected: true,
    layout: MainLayout,
    pageTitle: "Truck Check-in",
  },

  // ==================== Logistics Planner Routes ====================
  {
    path: "/logistics-planner",
    element: <LogisticsPlannerCockpit />,
    isProtected: true,
    layout: MainLayout,
    pageTitle: "Logistics Planner Cockpit",
  },

  // ==================== Proactive Monitor Routes ====================
  {
    path: "/proactive-monitor",
    element: <ProactiveMonitorCockpit />,
    isProtected: true,
    layout: MainLayout,
    pageTitle: "Pro-active Monitor Cockpit",
  },

  // ==================== Warehouse Status Monitor Routes ====================
  {
    path: "/warehouse-status",
    element: <WarehouseStatusMonitor />,
    isProtected: true,
    layout: MainLayout,
    pageTitle: "Warehouse Status Monitor",
  },

  // ==================== KPI On Time Routes ====================
  {
    path: "/kpi-on-time",
    element: <KpiOnTimePage />,
    isProtected: true,
    layout: MainLayout,
    pageTitle: "KPI On Time",
  },
];
