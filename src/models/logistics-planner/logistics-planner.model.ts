// src/models/logistics-planner/logistics-planner.model.ts

/**
 * Interface สำหรับข้อมูล Logistics Planner
 */
export interface LogisticsShipment {
    id: string;
    shipmentNo: string;
    route: string;
    loadDate: string;
    jobNumber: string;
    pickSequence: number;
    truckLicense: string;
    vehicleType: string;
    firstTime: string;
    carrier: string;
    generator: "auto" | "manual";
    field1: string;
    field2: string;
    field3: string;
    field4: string;
}

/**
 * Interface สำหรับข้อมูลสรุปตามช่วงเวลา (Tab 1)
 */
export interface TimeSlotSummary {
    timeSlot: string; // เช่น "8:00 - 9:00"
    count: number;
    shipments: LogisticsShipment[];
}

/**
 * ตัวเลือกสำหรับ Vehicle Type
 */
export const VEHICLE_TYPES = [
    "รถกระบะ",
    "รถ 4 ล้อ",
    "รถ 6 ล้อ",
    "รถ 10 ล้อ",
    "รถพ่วง",
    "รถตู้",
];

/**
 * ตัวเลือกสำหรับ Carrier
 */
export const CARRIERS = [
    "Kerry Express",
    "Flash Express",
    "J&T Express",
    "Thailand Post",
    "SCG Logistics",
    "Nim See Seng",
];

/**
 * ตัวเลือกสำหรับ First Time
 */
export const FIRST_TIME_OPTIONS = [
    "8:00",
    "8:30",
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
];

/**
 * สร้างช่วงเวลาสำหรับ Tab 1 (8:00 - 9:00 ถึง 04:00 - 05:00)
 */
export const generateTimeSlots = (): string[] => {
    const slots: string[] = [];
    for (let hour = 8; hour < 24; hour++) {
        const startTime = hour.toString().padStart(2, "0") + ":00";
        const endTime = (hour + 1).toString().padStart(2, "0") + ":00";
        slots.push(`${startTime} - ${endTime}`);
    }
    // เพิ่มช่วงเวลาตี 1 - ตี 5
    for (let hour = 0; hour < 5; hour++) {
        const startTime = hour.toString().padStart(2, "0") + ":00";
        const endTime = (hour + 1).toString().padStart(2, "0") + ":00";
        slots.push(`${startTime} - ${endTime}`);
    }
    return slots;
};

/**
 * ฟังก์ชันสำหรับคำนวณข้อมูลสรุปตามช่วงเวลา
 */
export const calculateTimeSlotSummary = (
    shipments: LogisticsShipment[]
): TimeSlotSummary[] => {
    const timeSlots = generateTimeSlots();
    const summaryMap = new Map<string, LogisticsShipment[]>();

    // Initialize map
    timeSlots.forEach((slot) => {
        summaryMap.set(slot, []);
    });

    // Group shipments by time slot
    shipments.forEach((shipment) => {
        const firstTime = shipment.firstTime;
        if (!firstTime) return;

        // แปลงเวลาเป็นชั่วโมง
        const [hourStr] = firstTime.split(":");
        const hour = Number.parseInt(hourStr, 10);

        // หาช่วงเวลาที่ตรงกัน
        const startTime = hour.toString().padStart(2, "0") + ":00";
        const endTime = (hour + 1).toString().padStart(2, "0") + ":00";
        const targetSlot = `${startTime} - ${endTime}`;

        const currentShipments = summaryMap.get(targetSlot) || [];
        summaryMap.set(targetSlot, [...currentShipments, shipment]);
    });

    // Convert to array
    return timeSlots.map((slot) => ({
        timeSlot: slot,
        count: summaryMap.get(slot)?.length || 0,
        shipments: summaryMap.get(slot) || [],
    }));
};
