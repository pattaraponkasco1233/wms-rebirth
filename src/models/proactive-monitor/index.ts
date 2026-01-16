// src/models/proactive-monitor/index.ts

/**
 * Proactive Monitoring Filter Model
 */
export interface ProactiveMonitorFilter {
    date: string;
    plant: string;
    carrier: string;
    route: string;
    vehicleType: string;
    shipmentNo: string;
    jobNumber: string;
    operationDate: string;
}

/**
 * Table Summary Row Model
 */
export interface ProactiveMonitorSummary {
    plantLoadTime: string;
    checkInYes: number;
    checkInNo: number;
    status001: number; // Loading Scheduler
    status002: number; // Booked
    status003: number; // Start Pick
    status004: number; // End Pick
    status005: number; // RTS
    status006: number; // Assign Bay
    status007: number; // Start Load
    status008: number; // End Load
    status009: number; // Check Out
    total: number;
}

/**
 * Table Detail Row Model
 */
export interface ProactiveMonitorDetail {
    shipmentNo: string;
    shipmentType: string;
    plant: string;
    pickSeq: string;
    jobNumber: string;
    plantLoadDate: string;
    operationDate: string;
    carrier: string;
    shipmentStatus: string;
    checkIn: boolean;
    timeRemaining: string;
    vehicleType: string;
    vehicleLicense: string;
    loadingScheduler?: string; // Status 001 date
    booked?: string; // Status 002 date
    startPick?: string; // Status 003 date
    endPick?: string; // Status 004 date
    rts?: string; // Status 005 date
    assignBay?: string; // Status 006 date
    startLoad?: string; // Status 007 date
    endLoad?: string; // Status 008 date
    checkOut?: string; // Status 009 date
}

/**
 * API Response Model
 */
export interface ProactiveMonitorResponse {
    target: {
        delivey_check_in: { target: number, actual: number, diff: number }

        ready_to_ship: { target: number, actual: number, diff: number }

        multipick: { target: number, actual: number, diff: number }
    };
    summary: ProactiveMonitorSummary[];
    details: ProactiveMonitorDetail[];
    grandTotal: {
        checkInYes: number;
        checkInNo: number;
        status001: number;
        status002: number;
        status003: number;
        status004: number;
        status005: number;
        status006: number;
        status007: number;
        status008: number;
        status009: number;
        total: number;
    };
}
