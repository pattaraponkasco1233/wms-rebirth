// src/services/api/kpiOnTime.service.ts

import axiosInstance from './axiosInstance';
import type {
    KpiOnTimeFilterParams,
    KpiOnTimeResponse,
    KpiOnTimeDetailData,
    KpiPercentDailyData,
} from '../../models/kpi-on-time';
import dayjs from 'dayjs';

/**
 * Mock Data for KPI On Time
 */
const MOCK_KPI_ON_TIME_DATA: KpiOnTimeDetailData[] = [
    {
        sapShipment: "SHP001",
        route: "BKK North",
        job: "J001",
        orderSequence: "08:00 - 12:00",
        operationDate: "2026-01-22",
        loadDate: "2026-01-22",
        cutLoad: "12:00",
        truckLicense: "กก-1234",
        truckType: "6 ล้อ",
        totalDN: 10,
        totalItem: 50,
        totalBox: 100,
        pick: "Y",
        whStatus: "Ready",
        whStatusHK: "OK",
        whStatusNKIE: "OK",
        whStatusNK: "OK",
        whStatusKRW: "OK",
        inGate: "08:30",
        submitRound: "1",
        truckReady: "09:00",
        truckStatusHK: "Ready",
        truckStatusNKIE: "Ready",
        truckStatusNK: "Ready",
        truckStatusKRW: "Ready",
        pickupSequenceHK: "1",
        pickupSequenceNKIE: "2",
        pickupSequenceNK: "3",
        pickupSequenceKRW: "4",
        checkInCondition: "Before 1 - 2 Hours",
        readyToShipCondition: "0 - 30 Mins",
    },
    {
        sapShipment: "SHP002",
        route: "BKK South",
        job: "J002",
        orderSequence: "13:00 - 17:00",
        operationDate: "2026-01-22",
        loadDate: "2026-01-22",
        cutLoad: "17:00",
        truckLicense: "ขข-5678",
        truckType: "4 ล้อ",
        totalDN: 8,
        totalItem: 40,
        totalBox: 80,
        pick: "Y",
        whStatus: "Pending",
        whStatusHK: "Pending",
        whStatusNKIE: "OK",
        whStatusNK: "OK",
        whStatusKRW: "Pending",
        inGate: "13:15",
        submitRound: "2",
        truckReady: "14:00",
        truckStatusHK: "Waiting",
        truckStatusNKIE: "Ready",
        truckStatusNK: "Ready",
        truckStatusKRW: "Waiting",
        pickupSequenceHK: "5",
        pickupSequenceNKIE: "6",
        pickupSequenceNK: "7",
        pickupSequenceKRW: "8",
        checkInCondition: "Before 30 - 60 Mins",
        readyToShipCondition: "1 - 2 Hours",
    },
    {
        sapShipment: "SHP003",
        route: "BKK East",
        job: "J003",
        orderSequence: "20:00 - 08:00",
        operationDate: "2026-01-22",
        loadDate: "2026-01-23",
        cutLoad: "08:00",
        truckLicense: "คค-9999",
        truckType: "6 ล้อ",
        totalDN: 15,
        totalItem: 75,
        totalBox: 150,
        pick: "Y",
        whStatus: "Ready",
        whStatusHK: "OK",
        whStatusNKIE: "Pending",
        whStatusNK: "OK",
        whStatusKRW: "OK",
        inGate: "20:30",
        submitRound: "3",
        truckReady: "21:00",
        truckStatusHK: "Ready",
        truckStatusNKIE: "Waiting",
        truckStatusNK: "Ready",
        truckStatusKRW: "Ready",
        pickupSequenceHK: "9",
        pickupSequenceNKIE: "10",
        pickupSequenceNK: "11",
        pickupSequenceKRW: "12",
        checkInCondition: "Before 2 - 3 Hours",
        readyToShipCondition: "30 - 60 Mins",
    },
    {
        sapShipment: "SHP004",
        route: "Central",
        job: "J004",
        orderSequence: "08:00 - 12:00",
        operationDate: "2026-01-22",
        loadDate: "2026-01-22",
        cutLoad: "12:00",
        truckLicense: "งง-3456",
        truckType: "4 ล้อ",
        totalDN: 5,
        totalItem: 25,
        totalBox: 50,
        pick: "Y",
        whStatus: "Ready",
        whStatusHK: "OK",
        whStatusNKIE: "OK",
        whStatusNK: "OK",
        whStatusKRW: "OK",
        inGate: "07:45",
        submitRound: "1",
        truckReady: "08:15",
        truckStatusHK: "Ready",
        truckStatusNKIE: "Ready",
        truckStatusNK: "Ready",
        truckStatusKRW: "Ready",
        pickupSequenceHK: "13",
        pickupSequenceNKIE: "14",
        pickupSequenceNK: "15",
        pickupSequenceKRW: "16",
        checkInCondition: "Before 0 - 30 Mins",
        readyToShipCondition: "Before 0 - 30 Mins",
    },
    {
        sapShipment: "SHP005",
        route: "Northeast",
        job: "J005",
        orderSequence: "13:00 - 17:00",
        operationDate: "2026-01-22",
        loadDate: "2026-01-22",
        cutLoad: "17:00",
        truckLicense: "จจ-7890",
        truckType: "6 ล้อ",
        totalDN: 12,
        totalItem: 60,
        totalBox: 120,
        pick: "N",
        whStatus: "Pending",
        whStatusHK: "Pending",
        whStatusNKIE: "Pending",
        whStatusNK: "OK",
        whStatusKRW: "Pending",
        inGate: "14:00",
        submitRound: "2",
        truckReady: "15:30",
        truckStatusHK: "Waiting",
        truckStatusNKIE: "Waiting",
        truckStatusNK: "Ready",
        truckStatusKRW: "Waiting",
        pickupSequenceHK: "17",
        pickupSequenceNKIE: "18",
        pickupSequenceNK: "19",
        pickupSequenceKRW: "20",
        checkInCondition: "1 - 2 Hours",
        readyToShipCondition: "2 - 3 Hours",
    },
];

/**
 * API Service สำหรับ KPI On Time
 */
export const kpiOnTimeApi = {
    /**
     * ดึงข้อมูล KPI On Time ตาม Filter
     */
    getKpiOnTimeData: async (filter: KpiOnTimeFilterParams): Promise<KpiOnTimeResponse> => {
        try {
            // TODO: แทนที่ด้วย API endpoint จริง
            // const response = await axiosInstance.post('/api/kpi-on-time/data', filter);
            // return response.data;

            // Mock response - Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 800));

            return {
                success: true,
                data: {
                    summary: [], // Summary จะถูกคำนวณจาก detail data ที่ component
                    detail: MOCK_KPI_ON_TIME_DATA,
                },
                message: 'ดึงข้อมูล KPI On Time สำเร็จ',
            };
        } catch (error) {
            console.error('Error fetching KPI On Time data:', error);
            throw error;
        }
    },

    /**
     * ดึงข้อมูล KPI Percent ตาม Filter
     */
    getKpiPercentData: async (filter: KpiOnTimeFilterParams): Promise<KpiPercentDailyData[]> => {
        try {
            // TODO: แทนที่ด้วย API endpoint จริง
            // const response = await axiosInstance.post('/api/kpi-on-time/percent', filter);
            // return response.data;

            // Mock response - Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            // สร้าง mock data สำหรับแต่ละวันในช่วงที่เลือก
            const startDate = dayjs(filter.startDate);
            const endDate = dayjs(filter.endDate);
            const mockData: KpiPercentDailyData[] = [];

            let currentDate = startDate;
            while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
                // สุ่มค่า percent สำหรับแต่ละวัน
                const driverTarget = 90;
                const driverActual = Math.floor(Math.random() * 30) + 70; // 70-100

                const readyTarget = 85;
                const readyActual = Math.floor(Math.random() * 30) + 65; // 65-95

                const multiTarget = 80;
                const multiActual = Math.floor(Math.random() * 30) + 60; // 60-90

                mockData.push({
                    date: currentDate.format('YYYY-MM-DD'),
                    driverCheckIn: {
                        target: driverTarget,
                        actual: driverActual,
                        diff: driverActual - driverTarget,
                    },
                    readyToShip: {
                        target: readyTarget,
                        actual: readyActual,
                        diff: readyActual - readyTarget,
                    },
                    multiPick: {
                        target: multiTarget,
                        actual: multiActual,
                        diff: multiActual - multiTarget,
                    },
                });

                currentDate = currentDate.add(1, 'day');
            }

            return mockData;
        } catch (error) {
            console.error('Error fetching KPI Percent data:', error);
            throw error;
        }
    },
};
