// src/guard/router/routers/BookingCar.tsx

import React from "react";
import { RouteProps } from "react-router-dom";

// นำเข้า Components
import BookingCarPage from "../../../pages/booking-car/index";
import MainLayout from "../../../components/layout/MainLayout";

// Interface
export type CustomRouteProps = RouteProps & {
  element: React.ReactNode;
  path: string;
  isProtected?: boolean;
  layout?: React.ElementType;
};

// Array ของ Routes สำหรับ Booking Car
export const BookingCarRoutes: CustomRouteProps[] = [
  {
    path: "/booking-car",
    element: <BookingCarPage />,
    isProtected: true, // ป้องกันด้วย Authentication
    layout: MainLayout, // ใช้ Layout หลักที่มี Navbar/Sidebar
  },
];
