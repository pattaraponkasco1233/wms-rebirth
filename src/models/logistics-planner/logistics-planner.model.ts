// src/models/logistics-planner/logistics-planner.model.ts

import { PLANT_OPTIONS, VEHICLE_TYPE_OPTIONS, LIST_TIME_OPTIONS, LIST_TIEM_SLOTS } from "../../constant/constants";

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
    vehicleType_key: string;
    firstTime: string;
    carrier: string;
    carrier_name: string;
    generator: "auto" | "manual";
    status_name: string;
    status: string;
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
    // Dynamic properties for plant_vehicleType combinations
    [key: string]: any; // เช่น snk_4_WHEEL: 5, glx_6_WHEEL: 3
}

/**
 * ตัวเลือกสำหรับ Vehicle Type (นำมาจาก constants)
 */
export const VEHICLE_TYPES = VEHICLE_TYPE_OPTIONS.map((option) => option.label);

/**
 * ตัวเลือกสำหรับ Plant (นำมาจาก constants)
 */
export const PLANTS = PLANT_OPTIONS.map((option) => option.label);

/**
 * ตัวเลือกสำหรับ First Time (นำมาจาก constants)
 */
export const FIRST_TIME_OPTIONS = LIST_TIME_OPTIONS.map((time) => time.label);

/**
 * ฟังก์ชันสำหรับคำนวณข้อมูลสรุปตามช่วงเวลา
 */
export const calculateTimeSlotSummary = (
    shipments: LogisticsShipment[]
): TimeSlotSummary[] => {
    const timeSlots = LIST_TIEM_SLOTS  //generateTimeSlots();
    const summaryMap = new Map<string, LogisticsShipment[]>();

    // Initialize map
    timeSlots.forEach((slot) => {
        summaryMap.set(slot, []);
    });

    // Group shipments by time slot
    shipments.forEach((shipment) => {

        const time = shipment.firstTime;
        if (!time) return;

        // แปลงเวลาเป็นชั่วโมง ไม่จำเป็นต้องสนใจนาทีและวินาที เพราะ ช่วงเวลาที่เราสนใจคือแบบชั่วโมงเต็ม
        const hours = time.substring(0, 2);

        const hour = Number.parseInt(hours, 10);

        // หาช่วงเวลาที่ตรงกัน
        const startTime = hour.toString().padStart(2, "0") + ":00";
        const endTime = (hour + 1).toString().padStart(2, "0") + ":00";
        const targetSlot = `${startTime} - ${endTime}`;

        const currentShipments = summaryMap.get(targetSlot) || [];
        summaryMap.set(targetSlot, [...currentShipments, shipment]);
    });

    // Helper function to count shipments by plant and vehicle type
    const countByPlantAndVehicle = (
        slotShipments: LogisticsShipment[],
        plantValue: string,
        vehicleTypeValue: string
    ): number => {
        return slotShipments.filter(
            (shipment) =>
                shipment.plant.toLowerCase() === plantValue.toLowerCase() &&
                shipment.vehicleType_key === vehicleTypeValue
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

        // คำนวณจำนวนสำหรับแต่ละ plant และ vehicle type
        PLANT_OPTIONS.forEach((plant) => {
            VEHICLE_TYPE_OPTIONS.forEach((vehicleType) => {
                const key = `${plant.value}_${vehicleType.value}`;
                summary[key] = countByPlantAndVehicle(
                    slotShipments,
                    plant.value,
                    vehicleType.value
                );
            });
        });

        return summary;
    });
};
