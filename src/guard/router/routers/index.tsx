import { CustomRouteProps } from "./Pages";
import { PageRoutes } from "./Pages";
import { DashboardRoutes } from "./Dashboard";
import { BookingCarRoutes } from "./BookingCar";

// รวม Array ของ Routes ทั้งหมด
export const AppRoutes: CustomRouteProps[] = [
  ...PageRoutes,
  ...DashboardRoutes,
  ...BookingCarRoutes,
];
