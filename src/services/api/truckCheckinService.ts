// src/services/api/truckCheckinService.ts

import axiosInstance from './axiosInstance';
import type {
    TruckCheckin,
    TruckCheckinSearchParams,
    TruckCheckinResponse,
    UpdateTruckCheckinRequest,
} from '../../models/truck-checkin/truck-checkin.model';

// Mock Data สำหรับ Truck Check-in
const mockTruckCheckinData: TruckCheckin[] = [
    {
        id: "1",
        plant: "SNK",
        carrier: "Kerry Express",
        vehicleType: "รถ 6 ล้อ",
        shipmentNo: "SHP-SNK-001",
        license: "กก-1234",
        driver: "สมชาย ใจดี",
        tel: "0812345678",
        checkin: "28/01/2026 08:30",
        status: "CHECKED_IN",
        status_key: "1",
        createdAt: "2026-01-28T08:30:00",
        updatedAt: "2026-01-28T08:30:00",
    },
    {
        id: "2",
        plant: "GLX",
        carrier: "Flash Express",
        vehicleType: "รถ 4 ล้อ",
        shipmentNo: "SHP-GLX-002",
        license: "ขข-5678",
        driver: "สมหญิง รักงาน",
        tel: "0823456789",
        checkin: "28/01/2026 09:15",
        status: "CHECKED_IN",
        status_key: "1",
        createdAt: "2026-01-28T09:15:00",
        updatedAt: "2026-01-28T09:15:00",
    },
    {
        id: "3",
        plant: "SSI",
        carrier: "J&T Express",
        vehicleType: "รถ 6 ล้อ",
        shipmentNo: "SHP-SSI-003",
        license: "คค-9999",
        driver: "",
        tel: "",
        checkin: "",
        status: "NOT_CHECKED_IN",
        status_key: "0",
        createdAt: "",
        updatedAt: "",
    },
    {
        id: "4",
        plant: "SSF",
        carrier: "Thailand Post",
        vehicleType: "รถ 4 ล้อ",
        shipmentNo: "SHP-SSF-004",
        license: "งง-1111",
        driver: "วิชัย มั่นคง",
        tel: "0845678901",
        checkin: "28/01/2026 11:30",
        status: "CHECKED_IN",
        status_key: "1",
        createdAt: "2026-01-28T11:30:00",
        updatedAt: "2026-01-28T11:30:00",
    },
    {
        id: "5",
        plant: "SNK",
        carrier: "",
        vehicleType: "",
        shipmentNo: "SHP-SNK-005",
        license: "จจ-2222",
        driver: "",
        tel: "",
        checkin: "",
        status: "NOT_CHECKED_IN",
        status_key: "0",
        createdAt: "",
        updatedAt: "",
    },
    {
        id: "6",
        plant: "GLX",
        carrier: "Flash Express",
        vehicleType: "รถ 4 ล้อ",
        shipmentNo: "SHP-GLX-006",
        license: "ฉฉ-3333",
        driver: "อนุชา กล้าหาญ",
        tel: "0867890123",
        checkin: "28/01/2026 14:15",
        status: "CHECKED_IN",
        status_key: "1",
        createdAt: "2026-01-28T14:15:00",
        updatedAt: "2026-01-28T14:15:00",
    },
    {
        id: "7",
        plant: "SSI",
        carrier: "J&T Express",
        vehicleType: "รถ 6 ล้อ",
        shipmentNo: "SHP-SSI-007",
        license: "ชช-4444",
        driver: "พิทักษ์ รักษา",
        tel: "0878901234",
        checkin: "28/01/2026 15:45",
        status: "CHECKED_IN",
        status_key: "1",
        createdAt: "2026-01-28T15:45:00",
        updatedAt: "2026-01-28T15:45:00",
    },
    {
        id: "8",
        plant: "SSF",
        carrier: "Thailand Post",
        vehicleType: "รถ 4 ล้อ",
        shipmentNo: "SHP-SSF-008",
        license: "ซซ-5555",
        driver: "",
        tel: "",
        checkin: "",
        status: "NOT_CHECKED_IN",
        status_key: "0",
        createdAt: "",
        updatedAt: "",
    },
    {
        id: "9",
        plant: "SNK",
        carrier: "",
        vehicleType: "",
        shipmentNo: "SHP-SNK-009",
        license: "ญญ-6666",
        driver: "",
        tel: "",
        checkin: "",
        status: "NOT_CHECKED_IN",
        status_key: "0",
        createdAt: "",
        updatedAt: "",
    },
    {
        id: "10",
        plant: "GLX",
        carrier: "Flash Express",
        vehicleType: "รถ 4 ล้อ",
        shipmentNo: "SHP-GLX-010",
        license: "ฎฎ-7777",
        driver: "สุรชัย ทำงาน",
        tel: "0901234567",
        checkin: "27/01/2026 08:00",
        status: "CHECKED_IN",
        status_key: "1",
        createdAt: "2026-01-27T08:00:00",
        updatedAt: "2026-01-27T08:00:00",
    },
];

// Truck Check-in API Service
export const truckCheckinApi = {
    // ดึงรายการ Truck Check-in พร้อม Search และ Filter (Mock Data)
    getTruckCheckins: async (
        params?: TruckCheckinSearchParams
    ): Promise<TruckCheckinResponse> => {
        // Mock delay เพื่อจำลอง API call
        await new Promise(resolve => setTimeout(resolve, 500));

        // Filter data based on params
        let filteredData = [...mockTruckCheckinData];

        if (params?.search) {
            const searchLower = params.search.toLowerCase();
            filteredData = filteredData.filter(item =>
                item.license?.toLowerCase().includes(searchLower) ||
                item.driver?.toLowerCase().includes(searchLower) ||
                item.shipmentNo?.toLowerCase().includes(searchLower) ||
                item.carrier?.toLowerCase().includes(searchLower)
            );
        }

        if (params?.plant) {
            filteredData = filteredData.filter(item => item.plant === params.plant);
        }

        if (params?.status) {
            filteredData = filteredData.filter(item => item.status === params.status);
        }

        // Pagination
        const page = params?.page || 1;
        const limit = params?.limit || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedData = filteredData.slice(startIndex, endIndex);

        return {
            data: paginatedData,
            total: filteredData.length,
            page,
            limit,
        };
    },

    // ดึงข้อมูล Truck Check-in ตาม ID (Mock Data)
    getTruckCheckinById: async (id: string): Promise<TruckCheckin> => {
        await new Promise(resolve => setTimeout(resolve, 300));

        const found = mockTruckCheckinData.find(item => item.id === id);
        if (!found) {
            throw new Error(`Truck check-in with id ${id} not found`);
        }
        return found;
    },

    // สร้าง Truck Check-in ใหม่ (Mock Data)
    createTruckCheckin: async (
        data: UpdateTruckCheckinRequest
    ): Promise<TruckCheckin> => {
        await new Promise(resolve => setTimeout(resolve, 500));

        const newId = (mockTruckCheckinData.length + 1).toString();
        const newItem: TruckCheckin = {
            id: newId,
            license: data.license || '',
            plant: data.plant || '',
            carrier: data.carrier,
            vehicleType: data.vehicleType,
            shipmentNo: data.shipmentNo || '',
            driver: data.driver,
            tel: data.tel,
            checkin: new Date().toLocaleString("th-TH"),
            status: data.status || "CHECKED_IN",
            status_key: data.status === "CHECKED_IN" ? "1" : "0",
            remark: data.remark,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        mockTruckCheckinData.push(newItem);
        return newItem;
    },

    // อัพเดท Truck Check-in (Mock Data)
    updateTruckCheckin: async (
        id: string,
        data: UpdateTruckCheckinRequest
    ): Promise<TruckCheckin> => {
        await new Promise(resolve => setTimeout(resolve, 500));

        const index = mockTruckCheckinData.findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error(`Truck check-in with id ${id} not found`);
        }

        // อัพเดทข้อมูลและ status_key ถ้า status เป็น CHECKED_IN
        const updatedData = {
            ...mockTruckCheckinData[index],
            ...data,
            // ถ้า status เป็น CHECKED_IN ให้ set status_key เป็น "1"
            status_key: data.status === "CHECKED_IN" ? "1" : mockTruckCheckinData[index].status_key,
            updatedAt: new Date().toISOString(),
        };

        mockTruckCheckinData[index] = updatedData;

        return mockTruckCheckinData[index];
    },

    // ลบ Truck Check-in (Mock Data)
    deleteTruckCheckin: async (id: string): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 300));

        const index = mockTruckCheckinData.findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error(`Truck check-in with id ${id} not found`);
        }

        mockTruckCheckinData.splice(index, 1);
    },
};

export default truckCheckinApi;
