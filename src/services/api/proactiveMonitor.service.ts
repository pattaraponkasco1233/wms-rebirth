// src/services/api/proactiveMonitor.service.ts

import { ProactiveMonitorResponse, ProactiveMonitorFilter } from '@/models/proactive-monitor';

/**
 * Mock Data for Proactive Monitoring
 */
const mockProactiveMonitorData: ProactiveMonitorResponse = {
    summary: [
        {
            plantLoadTime: "08:00 - 09:00",
            checkInYes: 5,
            checkInNo: 2,
            status001: 1,
            status002: 2,
            status003: 1,
            status004: 1,
            status005: 0,
            status006: 1,
            status007: 0,
            status008: 1,
            status009: 0,
            total: 7
        },
        {
            plantLoadTime: "09:00 - 10:00",
            checkInYes: 8,
            checkInNo: 3,
            status001: 2,
            status002: 3,
            status003: 2,
            status004: 1,
            status005: 1,
            status006: 1,
            status007: 1,
            status008: 1,
            status009: 0,
            total: 11
        },
        {
            plantLoadTime: "10:00 - 11:00",
            checkInYes: 6,
            checkInNo: 1,
            status001: 1,
            status002: 2,
            status003: 1,
            status004: 1,
            status005: 0,
            status006: 1,
            status007: 0,
            status008: 1,
            status009: 0,
            total: 7
        },
        {
            plantLoadTime: "11:00 - 12:00",
            checkInYes: 4,
            checkInNo: 2,
            status001: 0,
            status002: 2,
            status003: 1,
            status004: 1,
            status005: 1,
            status006: 0,
            status007: 1,
            status008: 0,
            status009: 0,
            total: 6
        },
        {
            plantLoadTime: "12:00 - 13:00",
            checkInYes: 3,
            checkInNo: 1,
            status001: 1,
            status002: 1,
            status003: 0,
            status004: 1,
            status005: 0,
            status006: 1,
            status007: 0,
            status008: 0,
            status009: 0,
            total: 4
        }
    ],
    details: [
        {
            shipmentNo: "SHP001",
            shipmentType: "Regular",
            plant: "SNK",
            pickSeq: "001",
            jobNumber: "JOB001",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "KERRY_EXPRESS",
            shipmentStatus: "002",
            checkIn: true,
            timeRemaining: "01:30:00",
            vehicleType: "4_WHEEL",
            vehicleLicense: "กก-1234",
            loadingScheduler: "2026-01-15 08:00:00",
            booked: "2026-01-15 08:15:00"
        },
        {
            shipmentNo: "SHP002",
            shipmentType: "Express",
            plant: "GLX",
            pickSeq: "002",
            jobNumber: "JOB002",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "FLASH_EXPRESS",
            shipmentStatus: "003",
            checkIn: true,
            timeRemaining: "00:45:00",
            vehicleType: "6_WHEEL",
            vehicleLicense: "ขข-5678",
            loadingScheduler: "2026-01-15 08:30:00",
            booked: "2026-01-15 08:45:00",
            startPick: "2026-01-15 09:00:00"
        },
        {
            shipmentNo: "SHP003",
            shipmentType: "Regular",
            plant: "SSI",
            pickSeq: "003",
            jobNumber: "JOB003",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "JT_EXPRESS",
            shipmentStatus: "001",
            checkIn: false,
            timeRemaining: "02:15:00",
            vehicleType: "4_WHEEL",
            vehicleLicense: "คค-9012",
            loadingScheduler: "2026-01-15 09:00:00"
        },
        {
            shipmentNo: "SHP004",
            shipmentType: "Express",
            plant: "SNK",
            pickSeq: "004",
            jobNumber: "JOB004",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "THAILAND_POST",
            shipmentStatus: "006",
            checkIn: true,
            timeRemaining: "00:20:00",
            vehicleType: "6_WHEEL",
            vehicleLicense: "งง-3456",
            loadingScheduler: "2026-01-15 09:30:00",
            booked: "2026-01-15 09:45:00",
            startPick: "2026-01-15 10:00:00",
            endPick: "2026-01-15 10:30:00",
            rts: "2026-01-15 10:45:00",
            assignBay: "2026-01-15 11:00:00"
        },
        {
            shipmentNo: "SHP005",
            shipmentType: "Regular",
            plant: "SSF",
            pickSeq: "005",
            jobNumber: "JOB005",
            plantLoadDate: "2026-01-15",
            operationDate: "2026-01-15",
            carrier: "KERRY_EXPRESS",
            shipmentStatus: "008",
            checkIn: true,
            timeRemaining: "00:00:00",
            vehicleType: "4_WHEEL",
            vehicleLicense: "จจ-7890",
            loadingScheduler: "2026-01-15 10:00:00",
            booked: "2026-01-15 10:15:00",
            startPick: "2026-01-15 10:30:00",
            endPick: "2026-01-15 11:00:00",
            rts: "2026-01-15 11:15:00",
            assignBay: "2026-01-15 11:30:00",
            startLoad: "2026-01-15 11:45:00",
            endLoad: "2026-01-15 12:00:00"
        }
    ],
    grandTotal: {
        checkInYes: 26,
        checkInNo: 9,
        status001: 5,
        status002: 10,
        status003: 5,
        status004: 5,
        status005: 2,
        status006: 4,
        status007: 2,
        status008: 2,
        status009: 0,
        total: 35
    }
};

/**
 * Fetch Proactive Monitoring Data
 */
export const fetchProactiveMonitorData = async (
    filter: Partial<ProactiveMonitorFilter>
): Promise<ProactiveMonitorResponse> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // TODO: Replace with actual API call
    // const response = await axiosInstance.get('/api/proactive-monitor', { params: filter });
    // return response.data;

    return mockProactiveMonitorData;
};
