/**
 * Proactive Monitor API Service
 * จัดการ API calls สำหรับ Proactive Monitoring
 * 
 * วิธีการใช้งาน:
 * 1. ปัจจุบันใช้ Mock Response ที่จำลองข้อมูลจาก API
 * 2. เมื่อต้องการต่อ API จริง:
 *    - แก้ไข fetchShipmentData() ให้เรียกใช้ axios หรือ fetch
 *    - ส่งวันที่เป็น parameter ไปยัง API
 *    - API endpoint: GET /api/proactive-monitor/shipments?date=YYYY-MM-DD
 *    - Response ควรเป็น ShipmentApiResponse[]
 */

import { Dayjs } from "dayjs";

/**
 * Interface สำหรับข้อมูล Shipment ที่ได้จาก API
 */
export interface ShipmentApiResponse {
    shipmentNo: string;
    plant: string;
    carrier: string;
    shipmentStatus: string;
    region: string;
    loadingScheduled: string;
    timeSlot: string;
}

/**
 * Mock API response - จำลองข้อมูลที่ได้จากการยิง API
 * @param date - วันที่ที่ต้องการดึงข้อมูล
 * @returns Promise<ShipmentApiResponse[]>
 */
const getMockApiResponse = (date: Dayjs): ShipmentApiResponse[] => {
    // จำลองข้อมูลที่ได้จาก API โดยอาจมีข้อมูลแตกต่างกันตามวันที่
    const dayOfWeek = date.day(); // 0 = Sunday, 1 = Monday, ...

    // ตัวอย่าง: วันจันทร์-ศุกร์ มีข้อมูลมากกว่าเสาร์-อาทิตย์
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        // Weekend - ข้อมูลน้อยกว่า
        return [
            {
                shipmentNo: "SH000001",
                plant: "snk",
                carrier: "KERRY_EXPRESS",
                shipmentStatus: "001",
                region: "CENTRAL",
                loadingScheduled: "080000",
                timeSlot: "08:00 - 09:00",
            },
            {
                shipmentNo: "SH000002",
                plant: "glx",
                carrier: "FLASH_EXPRESS",
                shipmentStatus: "002",
                region: "EAST",
                loadingScheduled: "093000",
                timeSlot: "09:00 - 10:00",
            },
            {
                shipmentNo: "SH000003",
                plant: "ssi",
                carrier: "JT_EXPRESS",
                shipmentStatus: "005",
                region: "NORTHEAST",
                loadingScheduled: "100000",
                timeSlot: "10:00 - 11:00",
            },
        ];
    }

    // Weekday - ข้อมูลปกติ
    return [
        {
            shipmentNo: "SH000001",
            plant: "snk",
            carrier: "KERRY_EXPRESS",
            shipmentStatus: "001",
            region: "CENTRAL",
            loadingScheduled: "080000",
            timeSlot: "08:00 - 09:00",
        },
        {
            shipmentNo: "SH000002",
            plant: "glx",
            carrier: "FLASH_EXPRESS",
            shipmentStatus: "002",
            region: "EAST",
            loadingScheduled: "093000",
            timeSlot: "09:00 - 10:00",
        },
        {
            shipmentNo: "SH000003",
            plant: "ssi",
            carrier: "JT_EXPRESS",
            shipmentStatus: "002",
            region: "NORTHEAST",
            loadingScheduled: "100000",
            timeSlot: "10:00 - 11:00",
        },
        {
            shipmentNo: "SH000004",
            plant: "snk",
            carrier: "THAILAND_POST",
            shipmentStatus: "005",
            region: "NORTH",
            loadingScheduled: "113000",
            timeSlot: "11:00 - 12:00",
        },
        {
            shipmentNo: "SH000005",
            plant: "ssf",
            carrier: "KERRY_EXPRESS",
            shipmentStatus: "005",
            region: "WEST",
            loadingScheduled: "140000",
            timeSlot: "14:00 - 15:00",
        },
        {
            shipmentNo: "SH000006",
            plant: "snk",
            carrier: "FLASH_EXPRESS",
            shipmentStatus: "005",
            region: "CENTRAL",
            loadingScheduled: "153000",
            timeSlot: "15:00 - 16:00",
        },
        {
            shipmentNo: "SH000007",
            plant: "glx",
            carrier: "JT_EXPRESS",
            shipmentStatus: "005",
            region: "SOUTH",
            loadingScheduled: "160000",
            timeSlot: "16:00 - 17:00",
        },
        {
            shipmentNo: "SH000008",
            plant: "ssi",
            carrier: "KERRY_EXPRESS",
            shipmentStatus: "008",
            region: "EAST",
            loadingScheduled: "083000",
            timeSlot: "08:00 - 09:00",
        },
    ];
};

/**
 * ยิง API เพื่อดึงข้อมูล Shipment ตามวันที่
 * @param date - วันที่ที่ต้องการดึงข้อมูล
 * @returns Promise<ShipmentApiResponse[]>
 */
export const fetchShipmentData = async (
    date: Dayjs
): Promise<ShipmentApiResponse[]> => {
    // จำลองการเรียก API
    return new Promise((resolve) => {
        // Mock delay 500ms เหมือนเรียก API จริง
        setTimeout(() => {
            const mockData = getMockApiResponse(date);
            console.log("📡 API Called - fetchShipmentData:", {
                date: date.format("YYYY-MM-DD"),
                recordCount: mockData.length,
            });
            resolve(mockData);
        }, 500);
    });
};
