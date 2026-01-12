// src/models/dashboard/car.model.ts
// Models สำหรับหน้า Dashboard Car

/**
 * Interface สำหรับ Filter Parameters
 */
export interface DashboardCarFilter {
    startDate?: string;
    endDate?: string;
    vehicleType?: string;
    status?: string;
    destination?: string;
}

/**
 * Interface สำหรับ Statistics Response
 */
export interface DashboardCarStatistics {
    totalBookings: number;
    pendingBookings: number;
    inTransitBookings: number;
    completedBookings: number;
    totalVehicles: number;
    availableVehicles: number;
    inUseVehicles: number;
    maintenanceVehicles: number;
}

/**
 * Interface สำหรับ Daily Booking Data
 */
export interface DailyBookingData {
    date: string;
    count: number;
    revenue?: number;
}

/**
 * Interface สำหรับ Vehicle Usage Data
 */
export interface VehicleUsageData {
    vehicleType: string;
    count: number;
    percentage: number;
}

/**
 * Interface สำหรับ Popular Routes
 */
export interface PopularRoute {
    destination: string;
    count: number;
    percentage: number;
}

/**
 * Booking Status Types
 */
export type BookingStatus = 'pending' | 'confirmed' | 'in-transit' | 'completed' | 'cancelled';

/**
 * Interface สำหรับ Recent Booking
 */
export interface RecentBooking {
    id: string;
    orderNumber: string;
    vehicleType: string;
    licensePlate: string;
    driverName: string;
    destination: string;
    bookingDate: string;
    status: BookingStatus;
    createdAt: string;
}

/**
 * Interface สำหรับ Dashboard Response
 */
export interface DashboardCarResponse {
    statistics: DashboardCarStatistics;
    dailyBookings: DailyBookingData[];
    vehicleUsage: VehicleUsageData[];
    popularRoutes: PopularRoute[];
    recentBookings: RecentBooking[];
}
