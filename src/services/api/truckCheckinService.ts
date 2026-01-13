// src/services/api/truckCheckinService.ts

import axiosInstance from './axiosInstance';
import type {
    TruckCheckin,
    TruckCheckinSearchParams,
    TruckCheckinResponse,
    UpdateTruckCheckinRequest,
} from '../../models/truck-checkin/truck-checkin.model';

// Truck Check-in API Service
export const truckCheckinApi = {
    // ดึงรายการ Truck Check-in พร้อม Search และ Filter
    getTruckCheckins: async (
        params?: TruckCheckinSearchParams
    ): Promise<TruckCheckinResponse> => {
        const response = await axiosInstance.get<TruckCheckinResponse>(
            '/truck-checkin',
            {
                params,
            }
        );
        return response.data;
    },

    // ดึงข้อมูล Truck Check-in ตาม ID
    getTruckCheckinById: async (id: string): Promise<TruckCheckin> => {
        const response = await axiosInstance.get<TruckCheckin>(
            `/truck-checkin/${id}`
        );
        return response.data;
    },

    // สร้าง Truck Check-in ใหม่
    createTruckCheckin: async (
        data: UpdateTruckCheckinRequest
    ): Promise<TruckCheckin> => {
        const response = await axiosInstance.post<TruckCheckin>(
            '/truck-checkin',
            data
        );
        return response.data;
    },

    // อัพเดท Truck Check-in
    updateTruckCheckin: async (
        id: string,
        data: UpdateTruckCheckinRequest
    ): Promise<TruckCheckin> => {
        const response = await axiosInstance.put<TruckCheckin>(
            `/truck-checkin/${id}`,
            data
        );
        return response.data;
    },

    // ลบ Truck Check-in
    deleteTruckCheckin: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/truck-checkin/${id}`);
    },
};

export default truckCheckinApi;
