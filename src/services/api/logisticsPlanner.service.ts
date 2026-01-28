// src/services/api/logisticsPlanner.service.ts

import axiosInstance from './axiosInstance';
import type { LogisticsShipment } from '../../models/logistics-planner/logistics-planner.model';

/**
 * Interface สำหรับ Filter Parameters
 */
export interface LogisticsFilterParams {
    plant?: string;
    truckLicense?: string;
    shipmentNo?: string;
    route?: string;
    loadDate?: string; // Format: DDMMYYYY
    firstTime?: string; // Format: HHMMSS
    carrier?: string;
    vehicleType?: string;
}

/**
 * Interface สำหรับ Response
 */
export interface LogisticsShipmentsResponse {
    data: LogisticsShipment[];
    total: number;
    page?: number;
    pageSize?: number;
}

/**
 * Logistics Planner API Service
 */
export const logisticsPlannerApi = {
    /**
     * ดึงรายการ Shipments พร้อม Filter
     */
    getShipments: async (
        params?: LogisticsFilterParams
    ): Promise<LogisticsShipmentsResponse> => {
        const response = await axiosInstance.get<LogisticsShipmentsResponse>(
            '/logistics-planner/shipments',
            { params }
        );
        return response.data;
    },

    /**
     * ดึงข้อมูล Shipment ตาม ID
     */
    getShipmentById: async (id: string): Promise<LogisticsShipment> => {
        const response = await axiosInstance.get<LogisticsShipment>(
            `/logistics-planner/shipments/${id}`
        );
        return response.data;
    },

    /**
     * สร้าง Shipment ใหม่
     */
    createShipment: async (
        data: Omit<LogisticsShipment, 'id'>
    ): Promise<LogisticsShipment> => {
        const response = await axiosInstance.post<LogisticsShipment>(
            '/logistics-planner/shipments',
            data
        );
        return response.data;
    },

    /**
     * อัพเดท Shipment
     */
    updateShipment: async (
        id: string,
        data: Partial<LogisticsShipment>
    ): Promise<LogisticsShipment> => {
        const response = await axiosInstance.put<LogisticsShipment>(
            `/logistics-planner/shipments/${id}`,
            data
        );
        return response.data;
    },

    /**
     * ลบ Shipment
     */
    deleteShipment: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/logistics-planner/shipments/${id}`);
    },
};

/**
 * Mock Data สำหรับทดสอบ (ใช้เมื่อ API ยังไม่พร้อม)
 * ครอบคลุม:
 * - Plants: SNK, GLX, SSI, SSF (ครบทุก Plant)
 * - Vehicle Types: รถ 4 ล้อ, รถ 6 ล้อ (ครบทั้ง 2 ประเภท)
 * - Carriers: KERRY_EXPRESS, FLASH_EXPRESS, JT_EXPRESS, THAILAND_POST
 * - Time Slots: 08:00 - 14:00
 * - Status: 001 (Pending), 002 (Assigned), 003 (Interface)
 * 
 * รวม 16 รายการ ครอบคลุมทุก combination ของ Plant x Vehicle Type
 */
export const mockLogisticsShipments: LogisticsShipment[] = [
    {
        id: "1",
        plant: "SNK",
        shipmentNo: "SHP-2026-001",
        route: "BKK-CNX",
        loadDate: "28012026",
        jobNumber: "JOB-001",
        pickSequence: 1,
        truckLicense: "กข-1234",
        vehicleType: "รถ 6 ล้อ",
        vehicleType_key: "6_WHEEL",
        firstTime: "080000",
        carrier: "KERRY_EXPRESS",
        carrier_name: "Kerry Express",
        generator: "auto",
        status_name: "pending",
        status: "001",
        field1: "A",
        field2: "B",
        field3: "C",
        field4: "D",
    },
    {
        id: "2",
        plant: "GLX",
        shipmentNo: "SHP-2026-002",
        route: "BKK-HDY",
        loadDate: "28012026",
        jobNumber: "JOB-002",
        pickSequence: 2,
        truckLicense: "คง-5678",
        vehicleType: "รถ 4 ล้อ",
        vehicleType_key: "4_WHEEL",
        firstTime: "080000",
        carrier: "FLASH_EXPRESS",
        carrier_name: "Flash Express",
        generator: "manual",
        status_name: "assigned",
        status: "002",
        field1: "E",
        field2: "F",
        field3: "G",
        field4: "H",
    },
    {
        id: "3",
        plant: "SNK",
        shipmentNo: "SHP-2026-003",
        route: "BKK-PKT",
        loadDate: "28012026",
        jobNumber: "JOB-003",
        pickSequence: 3,
        truckLicense: "ขค-9999",
        vehicleType: "รถ 6 ล้อ",
        vehicleType_key: "6_WHEEL",
        firstTime: "090000",
        carrier: "JT_EXPRESS",
        carrier_name: "J&T Express",
        generator: "auto",
        status_name: "assigned",
        status: "002",
        field1: "I",
        field2: "J",
        field3: "K",
        field4: "L",
    },
    {
        id: "4",
        plant: "SSI",
        shipmentNo: "SHP-2026-004",
        route: "BKK-CMI",
        loadDate: "28012026",
        jobNumber: "JOB-004",
        pickSequence: 4,
        truckLicense: "งจ-7777",
        vehicleType: "รถ 4 ล้อ",
        vehicleType_key: "4_WHEEL",
        firstTime: "083000",
        carrier: "THAILAND_POST",
        carrier_name: "Thailand Post",
        generator: "manual",
        status_name: "interface",
        status: "003",
        field1: "M",
        field2: "N",
        field3: "O",
        field4: "P",
    },
    {
        id: "5",
        plant: "GLX",
        shipmentNo: "SHP-2026-005",
        route: "BKK-UBN",
        loadDate: "28012026",
        jobNumber: "JOB-005",
        pickSequence: 5,
        truckLicense: "ฉช-3333",
        vehicleType: "รถ 6 ล้อ",
        vehicleType_key: "6_WHEEL",
        firstTime: "140000",
        carrier: "KERRY_EXPRESS",
        carrier_name: "Kerry Express",
        generator: "auto",
        status_name: "assigned",
        status: "002",
        field1: "Q",
        field2: "R",
        field3: "S",
        field4: "T",
    },
    {
        id: "6",
        plant: "SNK",
        shipmentNo: "SHP-2026-006",
        route: "BKK-NMA",
        loadDate: "28012026",
        jobNumber: "JOB-006",
        pickSequence: 6,
        truckLicense: "ซฌ-4444",
        vehicleType: "รถ 4 ล้อ",
        vehicleType_key: "4_WHEEL",
        firstTime: "100000",
        carrier: "FLASH_EXPRESS",
        carrier_name: "Flash Express",
        generator: "auto",
        status_name: "interface",
        status: "003",
        field1: "U",
        field2: "V",
        field3: "W",
        field4: "X",
    },
    {
        id: "7",
        plant: "SSF",
        shipmentNo: "SHP-2026-007",
        route: "BKK-SKA",
        loadDate: "28012026",
        jobNumber: "JOB-007",
        pickSequence: 7,
        truckLicense: "ญฎ-5555",
        vehicleType: "รถ 6 ล้อ",
        vehicleType_key: "6_WHEEL",
        firstTime: "103000",
        carrier: "JT_EXPRESS",
        carrier_name: "J&T Express",
        generator: "manual",
        status_name: "interface",
        status: "003",
        field1: "Y",
        field2: "Z",
        field3: "AA",
        field4: "AB",
    },
    {
        id: "8",
        plant: "SNK",
        shipmentNo: "SHP-2026-008",
        route: "BKK-UDN",
        loadDate: "28012026",
        jobNumber: "JOB-008",
        pickSequence: 8,
        truckLicense: "ฏฐ-6666",
        vehicleType: "รถ 4 ล้อ",
        vehicleType_key: "4_WHEEL",
        firstTime: "110000",
        carrier: "THAILAND_POST",
        carrier_name: "Thailand Post",
        generator: "auto",
        status_name: "interface",
        status: "003",
        field1: "AC",
        field2: "AD",
        field3: "AE",
        field4: "AF",
    },
    {
        id: "9",
        plant: "GLX",
        shipmentNo: "SHP-2026-009",
        route: "BKK-ROI",
        loadDate: "29012026",
        jobNumber: "JOB-009",
        pickSequence: 9,
        truckLicense: "ฑฒ-7777",
        vehicleType: "รถ 6 ล้อ",
        vehicleType_key: "6_WHEEL",
        firstTime: "120000",
        carrier: "KERRY_EXPRESS",
        carrier_name: "Kerry Express",
        generator: "manual",
        status_name: "interface",
        status: "003",
        field1: "AG",
        field2: "AH",
        field3: "AI",
        field4: "AJ",
    },
    {
        id: "10",
        plant: "SSI",
        shipmentNo: "SHP-2026-010",
        route: "BKK-KKN",
        loadDate: "29012026",
        jobNumber: "JOB-010",
        pickSequence: 10,
        truckLicense: "ณด-8888",
        vehicleType: "รถ 4 ล้อ",
        vehicleType_key: "4_WHEEL",
        firstTime: "130000",
        carrier: "FLASH_EXPRESS",
        carrier_name: "Flash Express",
        generator: "auto",
        status_name: "assigned",
        status: "001",
        field1: "AK",
        field2: "AL",
        field3: "AM",
        field4: "AN",
    },
    // เพิ่มข้อมูลเพื่อให้ครบทุก Plant และทุก Vehicle Type
    // SSI Plant - รถ 6 ล้อ
    {
        id: "11",
        plant: "SSI",
        shipmentNo: "SHP-2026-011",
        route: "BKK-NKP",
        loadDate: "28012026",
        jobNumber: "JOB-011",
        pickSequence: 11,
        truckLicense: "บป-1111",
        vehicleType: "รถ 6 ล้อ",
        vehicleType_key: "6_WHEEL",
        firstTime: "080000",
        carrier: "JT_EXPRESS",
        carrier_name: "J&T Express",
        generator: "auto",
        status_name: "assigned",
        status: "001",
        field1: "AS",
        field2: "AT",
        field3: "AU",
        field4: "AV",
    },
    {
        id: "12",
        plant: "SSI",
        shipmentNo: "SHP-2026-012",
        route: "BKK-BRM",
        loadDate: "28012026",
        jobNumber: "JOB-012",
        pickSequence: 12,
        truckLicense: "ผฝ-9988",
        vehicleType: "รถ 6 ล้อ",
        vehicleType_key: "6_WHEEL",
        firstTime: "110000",
        carrier: "THAILAND_POST",
        carrier_name: "Thailand Post",
        generator: "manual",
        status_name: "assigned",
        status: "001",
        field1: "AW",
        field2: "AX",
        field3: "AY",
        field4: "AZ",
    },
    // SSF Plant - รถ 4 ล้อ
    {
        id: "13",
        plant: "SSF",
        shipmentNo: "SHP-2026-013",
        route: "BKK-UBN",
        loadDate: "28012026",
        jobNumber: "JOB-013",
        pickSequence: 13,
        truckLicense: "พฟ-3344",
        vehicleType: "รถ 4 ล้อ",
        vehicleType_key: "4_WHEEL",
        firstTime: "090000",
        carrier: "KERRY_EXPRESS",
        carrier_name: "Kerry Express",
        generator: "auto",
        status_name: "assigned",
        status: "001",
        field1: "BA",
        field2: "BB",
        field3: "BC",
        field4: "BD",
    },
    {
        id: "14",
        plant: "SSF",
        shipmentNo: "SHP-2026-014",
        route: "BKK-CNX",
        loadDate: "28012026",
        jobNumber: "JOB-014",
        pickSequence: 14,
        truckLicense: "ภม-5566",
        vehicleType: "รถ 4 ล้อ",
        vehicleType_key: "4_WHEEL",
        firstTime: "080000",
        carrier: "FLASH_EXPRESS",
        carrier_name: "Flash Express",
        generator: "manual",

        status_name: "assigned",
        status: "001",
        field1: "BE",
        field2: "BF",
        field3: "BG",
        field4: "BH",
    },
    // SNK Plant - รถ 4 ล้อ (เพิ่มเติม)
    {
        id: "15",
        plant: "SNK",
        shipmentNo: "SHP-2026-015",
        route: "BKK-HDY",
        loadDate: "28012026",
        jobNumber: "JOB-015",
        pickSequence: 15,
        truckLicense: "ลว-9900",
        vehicleType: "รถ 4 ล้อ",
        vehicleType_key: "4_WHEEL",
        firstTime: "093000",
        carrier: "KERRY_EXPRESS",
        carrier_name: "Kerry Express",
        generator: "auto",
        status_name: "assigned",
        status: "001",
        field1: "BI",
        field2: "BJ",
        field3: "BK",
        field4: "BL",
    },
    // GLX Plant - รถ 4 ล้อ (เพิ่มเติม)
    {
        id: "16",
        plant: "GLX",
        shipmentNo: "SHP-2026-016",
        route: "BKK-PKT",
        loadDate: "28012026",
        jobNumber: "JOB-016",
        pickSequence: 16,
        truckLicense: "ศษ-1122",
        vehicleType: "รถ 4 ล้อ",
        vehicleType_key: "4_WHEEL",
        firstTime: "103000",
        carrier: "JT_EXPRESS",
        carrier_name: "J&T Express",
        generator: "manual",
        status_name: "assigned",
        status: "001",
        field1: "BM",
        field2: "BN",
        field3: "BO",
        field4: "BP",
    },
];

/**
 * Mock API Service สำหรับทดสอบ (ใช้เมื่อ Backend ยังไม่พร้อม)
 */
export const mockLogisticsPlannerApi = {
    getShipments: async (
        params?: LogisticsFilterParams
    ): Promise<LogisticsShipmentsResponse> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        let filteredData = [...mockLogisticsShipments];

        // Apply filters
        if (params) {
            if (params.plant) {
                filteredData = filteredData.filter(item =>
                    item.plant.toLowerCase().includes(params.plant!.toLowerCase())
                );
            }
            if (params.truckLicense) {
                filteredData = filteredData.filter(item =>
                    item.truckLicense.toLowerCase().includes(params.truckLicense!.toLowerCase())
                );
            }
            if (params.shipmentNo) {
                filteredData = filteredData.filter(item =>
                    item.shipmentNo.toLowerCase().includes(params.shipmentNo!.toLowerCase())
                );
            }
            if (params.route) {
                filteredData = filteredData.filter(item =>
                    item.route.toLowerCase().includes(params.route!.toLowerCase())
                );
            }
            if (params.loadDate) {
                filteredData = filteredData.filter(item =>
                    item.loadDate === params.loadDate
                );
            }
            if (params.firstTime) {
                filteredData = filteredData.filter(item =>
                    item.firstTime === params.firstTime
                );
            }
            if (params.carrier) {
                filteredData = filteredData.filter(item =>
                    item.carrier === params.carrier
                );
            }
            if (params.vehicleType) {
                filteredData = filteredData.filter(item =>
                    item.vehicleType === params.vehicleType
                );
            }
        }

        return {
            data: filteredData,
            total: filteredData.length,
        };
    },

    getShipmentById: async (id: string): Promise<LogisticsShipment> => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const shipment = mockLogisticsShipments.find(s => s.id === id);
        if (!shipment) {
            throw new Error('Shipment not found');
        }
        return shipment;
    },

    createShipment: async (
        data: Omit<LogisticsShipment, 'id'>
    ): Promise<LogisticsShipment> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const newShipment: LogisticsShipment = {
            ...data,
            id: String(mockLogisticsShipments.length + 1),
        };
        mockLogisticsShipments.push(newShipment);
        return newShipment;
    },

    updateShipment: async (
        id: string,
        data: Partial<LogisticsShipment>
    ): Promise<LogisticsShipment> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const index = mockLogisticsShipments.findIndex(s => s.id === id);
        if (index === -1) {
            throw new Error('Shipment not found');
        }
        mockLogisticsShipments[index] = {
            ...mockLogisticsShipments[index],
            ...data,
        };
        return mockLogisticsShipments[index];
    },

    deleteShipment: async (id: string): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const index = mockLogisticsShipments.findIndex(s => s.id === id);
        if (index === -1) {
            throw new Error('Shipment not found');
        }
        mockLogisticsShipments.splice(index, 1);
    },
};


