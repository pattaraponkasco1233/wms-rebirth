// src/services/api/dashboardCarService.ts

import axiosInstance from './axiosInstance';
import type {
    DashboardCarFilter,
    DashboardCarResponse,
    DashboardCarStatistics,
    DailyBookingData,
    VehicleUsageData,
    PopularRoute,
    RecentBooking,
} from '../../models/dashboard/car.model';

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
