// src/models/kpi-on-time/types.ts

/**
 * Interface สำหรับ Filter Parameters
 */
export interface KpiOnTimeFilterParams {
    startDate: string;
    endDate: string;
}

/**
 * Interface สำหรับข้อมูล Detail แต่ละแถว
 */
export interface KpiOnTimeDetailData {
    sapShipment: string;
    route: string;
    job: string;
    orderSequence: string; // เช่น "08:00 - 12:00"
    operationDate: string;
    loadDate: string;
    cutLoad: string;
    truckLicense: string;
    truckType: string;

    // Total columns
    totalDN: number;
    totalItem: number;
    totalBox: number;

    // PICK
    pick: string;

    // WH Status
    whStatus: string;
    whStatusHK: string;
    whStatusNKIE: string;
    whStatusNK: string;
    whStatusKRW: string;

    // พาเรท (In Gate)
    inGate: string;

    // รอบยื่น
    submitRound: string;

    // รถพร้อม
    truckReady: string;

    // สถานะรถ
    truckStatusHK: string;
    truckStatusNKIE: string;
    truckStatusNK: string;
    truckStatusKRW: string;

    // ลำดับการเข้ารับสินค้า
    pickupSequenceHK: string;
    pickupSequenceNKIE: string;
    pickupSequenceNK: string;
    pickupSequenceKRW: string;

    // For summary calculation
    checkInCondition?: string; // จาก ListConditionKPI
    readyToShipCondition?: string; // จาก ListConditionKPI
}

/**
 * Interface สำหรับข้อมูล Summary Table
 */
export interface KpiOnTimeSummaryData {
    checkInCondition: string; // Row header จาก ListConditionKPI
    [key: string]: number | string; // Column headers จาก ListConditionKPI + ค่า count
}

/**
 * Interface สำหรับ API Response
 */
export interface KpiOnTimeResponse {
    success: boolean;
    data: {
        summary: KpiOnTimeSummaryData[];
        detail: KpiOnTimeDetailData[];
    };
    message?: string;
}

/**
 * Interface สำหรับ Table State
 */
export interface KpiOnTimeTableState {
    loading: boolean;
    summary: KpiOnTimeSummaryData[];
    detail: KpiOnTimeDetailData[];
    pagination: {
        current: number;
        pageSize: number;
        total: number;
    };
}

/**
 * Interface สำหรับข้อมูล KPI Percent ในแต่ละวัน
 */
export interface KpiPercentDailyData {
    date: string; // วันที่ในรูปแบบ YYYY-MM-DD
    driverCheckIn: {
        target: number; // เป็น % เช่น 90 = 90%
        actual: number;
        diff: number; // คำนวณจาก actual - target
    };
    readyToShip: {
        target: number;
        actual: number;
        diff: number;
    };
    multiPick: {
        target: number;
        actual: number;
        diff: number;
    };
}

/**
 * Interface สำหรับ KPI Percent Response
 */
export interface KpiPercentData {
    dailyData: KpiPercentDailyData[];
}
