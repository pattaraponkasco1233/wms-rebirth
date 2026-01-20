// src/services/api/warehouseStatus.service.ts

import axiosInstance from './axiosInstance';
import type {
    WarehouseStatusFilter,
    WarehouseStatusResponse,
} from '../../models/warehouse-status';

/**
 * Mock Data for Warehouse Status Monitor
 * Summary data คำนวณจาก Detail data ที่มี
 */
const MOCK_WAREHOUSE_STATUS_DATA: WarehouseStatusResponse = {
    summary: [
        {
            status: "009",
            statusLabel: "Check Out",
            plants: {
                snk: { sm: 1, dn: 1, items: 48, box: 130 },
                glx: { sm: 0, dn: 0, items: 0, box: 0 },
                ssi: { sm: 0, dn: 0, items: 0, box: 0 },
                ssf: { sm: 0, dn: 0, items: 0, box: 0 },
            },
        },
        {
            status: "008",
            statusLabel: "End Load",
            plants: {
                snk: { sm: 0, dn: 0, items: 0, box: 0 },
                glx: { sm: 0, dn: 0, items: 0, box: 0 },
                ssi: { sm: 0, dn: 0, items: 0, box: 0 },
                ssf: { sm: 0, dn: 0, items: 0, box: 0 },
            },
        },
        {
            status: "007",
            statusLabel: "Start Load",
            plants: {
                snk: { sm: 0, dn: 0, items: 0, box: 0 },
                glx: { sm: 0, dn: 0, items: 0, box: 0 },
                ssi: { sm: 1, dn: 1, items: 42, box: 110 },
                ssf: { sm: 0, dn: 0, items: 0, box: 0 },
            },
        },
        {
            status: "006",
            statusLabel: "Assign Bay",
            plants: {
                snk: { sm: 0, dn: 0, items: 0, box: 0 },
                glx: { sm: 0, dn: 0, items: 0, box: 0 },
                ssi: { sm: 0, dn: 0, items: 0, box: 0 },
                ssf: { sm: 0, dn: 0, items: 0, box: 0 },
            },
        },
        {
            status: "005",
            statusLabel: "RTS",
            plants: {
                snk: { sm: 1, dn: 1, items: 52, box: 140 },
                glx: { sm: 0, dn: 0, items: 0, box: 0 },
                ssi: { sm: 0, dn: 0, items: 0, box: 0 },
                ssf: { sm: 0, dn: 0, items: 0, box: 0 },
            },
        },
        {
            status: "004",
            statusLabel: "End Pick",
            plants: {
                snk: { sm: 0, dn: 0, items: 0, box: 0 },
                glx: { sm: 0, dn: 0, items: 0, box: 0 },
                ssi: { sm: 0, dn: 0, items: 0, box: 0 },
                ssf: { sm: 0, dn: 0, items: 0, box: 0 },
            },
        },
        {
            status: "003",
            statusLabel: "Start Pick",
            plants: {
                snk: { sm: 0, dn: 0, items: 0, box: 0 },
                glx: { sm: 1, dn: 1, items: 38, box: 95 },
                ssi: { sm: 0, dn: 0, items: 0, box: 0 },
                ssf: { sm: 0, dn: 0, items: 0, box: 0 },
            },
        },
        {
            status: "002",
            statusLabel: "Booked",
            plants: {
                snk: { sm: 0, dn: 0, items: 0, box: 0 },
                glx: { sm: 0, dn: 0, items: 0, box: 0 },
                ssi: { sm: 0, dn: 0, items: 0, box: 0 },
                ssf: { sm: 1, dn: 1, items: 45, box: 120 },
            },
        },
        {
            status: "001",
            statusLabel: "Loading Scheduler",
            plants: {
                snk: { sm: 0, dn: 0, items: 0, box: 0 },
                glx: { sm: 0, dn: 0, items: 0, box: 0 },
                ssi: { sm: 0, dn: 0, items: 0, box: 0 },
                ssf: { sm: 0, dn: 0, items: 0, box: 0 },
            },
        },
    ],
    details: [
        {
            plant: "snk",
            sapShipment: "SAP000001",
            shipmentNo: "SH00000001",
            whStatus: "005",
            route: "BKK_NORTH",
            deliveryNo: "DN00000001",
            readyToShip: "2026-01-18 14:30:00",
            loadDate: "2026-01-18",
            cutLoad: "08:30",
            truckReady: "09:15",
        },
        {
            plant: "glx",
            sapShipment: "SAP000002",
            shipmentNo: "SH00000002",
            whStatus: "003",
            route: "BKK_SOUTH",
            deliveryNo: "DN00000002",
            readyToShip: "2026-01-19 10:45:00",
            loadDate: "2026-01-19",
            cutLoad: "10:00",
            truckReady: "10:45",
        },
        {
            plant: "ssi",
            sapShipment: "SAP000003",
            shipmentNo: "SH00000003",
            whStatus: "007",
            route: "CENTRAL",
            deliveryNo: "DN00000003",
            readyToShip: "2026-01-20 08:15:00",
            loadDate: "2026-01-20",
            cutLoad: "13:30",
            truckReady: "14:00",
        },
        {
            plant: "ssf",
            sapShipment: "SAP000004",
            shipmentNo: "SH00000004",
            whStatus: "002",
            route: "NORTHEAST",
            deliveryNo: "DN00000004",
            readyToShip: "2026-01-17 16:20:00",
            loadDate: "2026-01-17",
            cutLoad: "15:00",
            truckReady: "15:30",
        },
        {
            plant: "snk",
            sapShipment: "SAP000005",
            shipmentNo: "SH00000005",
            whStatus: "009",
            route: "BKK_EAST",
            deliveryNo: "DN00000005",
            readyToShip: "2026-01-16 11:30:00",
            loadDate: "2026-01-16",
            cutLoad: "11:30",
            truckReady: "12:00",
        },
    ],
};

/**
 * Warehouse Status API Service
 */
export const warehouseStatusApi = {
    /**
     * ดึงข้อมูล Warehouse Status พร้อม Filter
     * @param filter - ตัวกรองข้อมูล (route, shipment, dateFrom, dateTo)
     * @returns WarehouseStatusResponse - ข้อมูล summary และ details
     */
    getWarehouseStatus: async (
        filter?: WarehouseStatusFilter
    ): Promise<WarehouseStatusResponse> => {
        // TODO: เมื่อพร้อมใช้งาน API จริง ให้ uncomment บรรทัดด้านล่าง
        // const response = await axiosInstance.get<WarehouseStatusResponse>(
        //     '/warehouse-status',
        //     { params: filter }
        // );
        // return response.data;

        // ===== Mock Data Response =====
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Filter mock data ตาม parameters (optional)
        let filteredDetails = [...MOCK_WAREHOUSE_STATUS_DATA.details];

        if (filter?.route) {
            filteredDetails = filteredDetails.filter(
                (item) => item.route === filter.route
            );
        }

        if (filter?.shipment) {
            filteredDetails = filteredDetails.filter(
                (item) =>
                    item.shipmentNo.toLowerCase().includes(filter.shipment!.toLowerCase()) ||
                    item.sapShipment.toLowerCase().includes(filter.shipment!.toLowerCase())
            );
        }

        // Return filtered data
        return {
            summary: MOCK_WAREHOUSE_STATUS_DATA.summary,
            details: filteredDetails,
        };
    },
};

export default warehouseStatusApi;
