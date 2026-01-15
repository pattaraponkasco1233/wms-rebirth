/**
 * Mock Data สำหรับ Overall Monitoring Tab
 * ใช้สำหรับ development และ testing
 */

export interface MockShipmentData {
    shipmentNo: string;
    plant: string;
    carrier: string;
    shipmentStatus: string;
    region: string;
    loadingScheduled: string;
    timeSlot: string;
}

/**
 * ข้อมูล Shipment ตัวอย่าง (ใช้ value จาก Constants)
 * ในอนาคตจะแทนที่ด้วยข้อมูลจาก API
 */
export const MOCK_SHIPMENT_DATA: MockShipmentData[] = [
    {
        shipmentNo: "SH000001",
        plant: "snk", // PLANT_OPTIONS[0].value
        carrier: "KERRY_EXPRESS", // CARRIER_OPTIONS[0].value
        shipmentStatus: "001", // STATUS_OPTIONS[0].value - Loading Scheduler
        region: "CENTRAL", // REGION_OPTIONS[2].value - นครหลวง
        loadingScheduled: "080000", // LIST_TIME_OPTIONS[0].value
        timeSlot: "08:00 - 09:00",
    },
    {
        shipmentNo: "SH000002",
        plant: "glx", // PLANT_OPTIONS[1].value
        carrier: "FLASH_EXPRESS", // CARRIER_OPTIONS[1].value
        shipmentStatus: "002", // STATUS_OPTIONS[1].value - Booked
        region: "EAST", // REGION_OPTIONS[3].value - ตะวันออก
        loadingScheduled: "093000", // LIST_TIME_OPTIONS[3].value
        timeSlot: "09:00 - 10:00",
    },
    {
        shipmentNo: "SH000003",
        plant: "ssi", // PLANT_OPTIONS[2].value
        carrier: "JT_EXPRESS", // CARRIER_OPTIONS[2].value
        shipmentStatus: "003", // STATUS_OPTIONS[2].value - Start Pick
        region: "NORTHEAST", // REGION_OPTIONS[1].value - อีสาน
        loadingScheduled: "100000", // LIST_TIME_OPTIONS[4].value
        timeSlot: "10:00 - 11:00",
    },
    {
        shipmentNo: "SH000004",
        plant: "snk", // PLANT_OPTIONS[0].value
        carrier: "THAILAND_POST", // CARRIER_OPTIONS[3].value
        shipmentStatus: "004", // STATUS_OPTIONS[3].value - End Pick
        region: "NORTH", // REGION_OPTIONS[0].value - เหนือ
        loadingScheduled: "113000", // LIST_TIME_OPTIONS[7].value
        timeSlot: "11:00 - 12:00",
    },
    {
        shipmentNo: "SH000005",
        plant: "snk", // PLANT_OPTIONS[0].value
        carrier: "KERRY_EXPRESS", // CARRIER_OPTIONS[0].value
        shipmentStatus: "005", // STATUS_OPTIONS[4].value - RTS
        region: "WEST", // REGION_OPTIONS[4].value - ตะวันตก
        loadingScheduled: "140000", // LIST_TIME_OPTIONS[12].value
        timeSlot: "14:00 - 15:00",
    },
];
