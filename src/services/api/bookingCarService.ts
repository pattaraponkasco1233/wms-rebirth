// src/services/api/bookingCarService.ts

import axiosInstance from './axiosInstance';
import type {
    BookingCar,
    BookingCarForm,
    BookingCarFilter,
    BookingCarResponse,
    BookingCarListResponse,
} from '../../models/booking-car/booking-car.model';

/**
 * Booking Car API Service
 */
export const bookingCarApi = {
    /**
     * ดึงรายการ Booking Car ทั้งหมด
     */
    getBookings: async (
        filter?: BookingCarFilter,
        page: number = 1,
        pageSize: number = 10
    ): Promise<BookingCarListResponse> => {
        const response = await axiosInstance.get<BookingCarListResponse>(
            '/booking-car',
            {
                params: {
                    ...filter,
                    page,
                    pageSize,
                },
            }
        );
        return response.data;
    },

    /**
     * ดึงข้อมูล Booking Car ตาม ID
     */
    getBookingById: async (id: string): Promise<BookingCar> => {
        const response = await axiosInstance.get<BookingCarResponse>(
            `/booking-car/${id}`
        );
        return response.data.data!;
    },

    /**
     * สร้าง Booking Car ใหม่
     */
    createBooking: async (data: BookingCarForm): Promise<BookingCar> => {
        const response = await axiosInstance.post<BookingCarResponse>(
            '/booking-car',
            data
        );
        return response.data.data!;
    },

    /**
     * แก้ไข Booking Car
     */
    updateBooking: async (
        id: string,
        data: Partial<BookingCarForm>
    ): Promise<BookingCar> => {
        const response = await axiosInstance.put<BookingCarResponse>(
            `/booking-car/${id}`,
            data
        );
        return response.data.data!;
    },

    /**
     * ลบ Booking Car
     */
    deleteBooking: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/booking-car/${id}`);
    },

    /**
     * ยกเลิก Booking Car
     */
    cancelBooking: async (id: string, reason?: string): Promise<BookingCar> => {
        const response = await axiosInstance.post<BookingCarResponse>(
            `/booking-car/${id}/cancel`,
            { reason }
        );
        return response.data.data!;
    },

    /**
     * ยืนยัน Booking Car
     */
    confirmBooking: async (id: string): Promise<BookingCar> => {
        const response = await axiosInstance.post<BookingCarResponse>(
            `/booking-car/${id}/confirm`
        );
        return response.data.data!;
    },

    /**
     * Export ข้อมูลเป็น Excel
     */
    exportToExcel: async (filter?: BookingCarFilter): Promise<Blob> => {
        const response = await axiosInstance.get('/booking-car/export', {
            params: filter,
            responseType: 'blob',
        });
        return response.data;
    },
};
