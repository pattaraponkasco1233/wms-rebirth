// src/models/logistics-planner/logistics-planner.model.ts

import { CARRIER_OPTIONS, VEHICLE_TYPE_OPTIONS, LIST_TIME_OPTIONS } from "../../constant/constants";

/**
 * Interface สำหรับข้อมูล Logistics Planner
 */
export interface LogisticsShipment {
    id: string;
    shipmentNo: string;
    plant: string;
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
    // Dynamic properties for carrier_vehicleType combinations
    [key: string]: any; // เช่น KERRY_EXPRESS_4_WHEEL: 5
}

/**
 * ตัวเลือกสำหรับ Vehicle Type (นำมาจาก constants)
 */
export const VEHICLE_TYPES = VEHICLE_TYPE_OPTIONS.map((option) => option.label);

/**
 * ตัวเลือกสำหรับ Carrier (นำมาจาก constants)
 */
export const CARRIERS = CARRIER_OPTIONS.map((option) => option.label);

/**
 * ตัวเลือกสำหรับ First Time (นำมาจาก constants)
 */
export const FIRST_TIME_OPTIONS = LIST_TIME_OPTIONS.map((time) => time.label);

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

    // Helper function to count shipments by carrier and vehicle type
    const countByCarrierAndVehicle = (
        slotShipments: LogisticsShipment[],
        carrierLabel: string,
        vehicleLabel: string
    ): number => {
        return slotShipments.filter(
            (shipment) =>
                shipment.carrier === carrierLabel &&
                shipment.vehicleType === vehicleLabel
        ).length;
    };

    // Convert to array with detailed counts
    return timeSlots.map((slot) => {
        const slotShipments = summaryMap.get(slot) || [];
        const summary: TimeSlotSummary = {
            timeSlot: slot,
            count: slotShipments.length,
            shipments: slotShipments,
        };

        // คำนวณจำนวนสำหรับแต่ละ carrier และ vehicle type
        CARRIER_OPTIONS.forEach((carrier) => {
            VEHICLE_TYPE_OPTIONS.forEach((vehicleType) => {
                const key = `${carrier.value}_${vehicleType.value}`;
                summary[key] = countByCarrierAndVehicle(
                    slotShipments,
                    carrier.label,
                    vehicleType.label
                );
            });
        });

        return summary;
    });
};
