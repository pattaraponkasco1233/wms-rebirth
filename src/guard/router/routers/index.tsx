import { CustomRouteProps, PageRoutes } from "./Pages";
import { DashboardRoutes } from "./Dashboard";
import { BookingCarRoutes } from "./BookingCar";
import { TruckCheckinRoutes } from "./TruckCheckin";

// รวม Array ของ Routes ทั้งหมด
export const AppRoutes: CustomRouteProps[] = [
  ...PageRoutes,
  ...DashboardRoutes,
  ...BookingCarRoutes,
  ...TruckCheckinRoutes,
];
