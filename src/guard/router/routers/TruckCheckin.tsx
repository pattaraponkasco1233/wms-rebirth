// src/guard/router/routers/TruckCheckin.tsx

import { CustomRouteProps } from "./Pages";
import TruckCheckinPage from "../../../pages/truck-checkin";
import MainLayout from "../../../components/layout/MainLayout";

// Routes สำหรับ Truck Check-in
export const TruckCheckinRoutes: CustomRouteProps[] = [
  {
    path: "/truck-checkin",
    element: <TruckCheckinPage />,
    isProtected: true,
    layout: MainLayout, // ใช้ Layout หลักที่มี Navbar/Sidebar
  },
];
