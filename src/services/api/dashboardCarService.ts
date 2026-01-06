// src/services/api/dashboardCarService.ts

import axiosInstance from './axiosInstance';

// Interface สำหรับ Filter Parameters
export interface DashboardCarFilter {
    startDate?: string;
    endDate?: string;
    vehicleType?: string;
    status?: string;
    destination?: string;
}

// Interface สำหรับ Statistics Response
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

// Interface สำหรับ Daily Booking Data
export interface DailyBookingData {
    date: string;
    count: number;
    revenue?: number;
}

// Interface สำหรับ Vehicle Usage Data
export interface VehicleUsageData {
    vehicleType: string;
    count: number;
    percentage: number;
}

// Interface สำหรับ Popular Routes
export interface PopularRoute {
    destination: string;
    count: number;
    percentage: number;
}

// Interface สำหรับ Recent Booking
export interface RecentBooking {
    id: string;
    orderNumber: string;
    vehicleType: string;
    licensePlate: string;
    driverName: string;
    destination: string;
    bookingDate: string;
    status: 'pending' | 'confirmed' | 'in-transit' | 'completed' | 'cancelled';
    createdAt: string;
}

// Interface สำหรับ Dashboard Response
export interface DashboardCarResponse {
    statistics: DashboardCarStatistics;
    dailyBookings: DailyBookingData[];
    vehicleUsage: VehicleUsageData[];
    popularRoutes: PopularRoute[];
    recentBookings: RecentBooking[];
}

// Dashboard Car API Service
export const dashboardCarApi = {
    // ดึงข้อมูล Dashboard พร้อม Filter
    getDashboardData: async (
        filter?: DashboardCarFilter
    ): Promise<DashboardCarResponse> => {
        const response = await axiosInstance.get<DashboardCarResponse>(
            '/dashboard/car/filter',
            {
                params: filter,
            }
        );
        return response.data;
    },

    // ดึงเฉพาะ Statistics
    getStatistics: async (
        filter?: DashboardCarFilter
    ): Promise<DashboardCarStatistics> => {
        const response = await axiosInstance.get<DashboardCarStatistics>(
            '/dashboard/car/statistics',
            {
                params: filter,
            }
        );
        return response.data;
    },

    // ดึงข้อมูลการจองรายวัน
    getDailyBookings: async (
        filter?: DashboardCarFilter
    ): Promise<DailyBookingData[]> => {
        const response = await axiosInstance.get<DailyBookingData[]>(
            '/dashboard/car/daily-bookings',
            {
                params: filter,
            }
        );
        return response.data;
    },

    // ดึงข้อมูลการใช้งานรถ
    getVehicleUsage: async (
        filter?: DashboardCarFilter
    ): Promise<VehicleUsageData[]> => {
        const response = await axiosInstance.get<VehicleUsageData[]>(
            '/dashboard/car/vehicle-usage',
            {
                params: filter,
            }
        );
        return response.data;
    },

    // ดึงข้อมูลเส้นทางยอดนิยม
    getPopularRoutes: async (
        filter?: DashboardCarFilter
    ): Promise<PopularRoute[]> => {
        const response = await axiosInstance.get<PopularRoute[]>(
            '/dashboard/car/popular-routes',
            {
                params: filter,
            }
        );
        return response.data;
    },

    // ดึงข้อมูลการจองล่าสุด
    getRecentBookings: async (
        filter?: DashboardCarFilter
    ): Promise<RecentBooking[]> => {
        const response = await axiosInstance.get<RecentBooking[]>(
            '/dashboard/car/recent-bookings',
            {
                params: filter,
            }
        );
        return response.data;
    },

    // Export ข้อมูลเป็น Excel
    exportToExcel: async (filter?: DashboardCarFilter): Promise<Blob> => {
        const response = await axiosInstance.get('/dashboard/car/export', {
            params: filter,
            responseType: 'blob',
        });
        return response.data;
    },
};
