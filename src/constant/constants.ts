// src/constant/constants.ts
// ไฟล์ Constants กลางสำหรับทั้งระบบ

export const TABLE = {
    pageSizeDefault: 10,
    pageSizeOptions: [10, 20, 50, 100],
} as const;

export const PATTERN = {
    licensePlate: /^[ก-ฮ]{1,3}-\d{1,4}$/, // ตัวอย่างรูปแบบทะเบียนรถยนต์ไทย
    telephone: /^\d{9,10}$/, // ตัวอย่างรูปแบบหมายเลขโทรศัพท์ไทย
} as const;

/**
 * ========================================
 * TRUCK CHECK-IN CONSTANTS
 * ========================================
 */

/**
 * Plant options for Truck Check-in
 */
export const PLANT_OPTIONS = [
    { value: "snk", label: "SNK" },
    { value: "glx", label: "GLX" },
    { value: "ssi", label: "SSI" },
    { value: "ssf", label: "SSF" },
] as const;

/**
 * Carrier options
 */
export const CARRIER_OPTIONS = [
    { value: "KERRY_EXPRESS", label: "Kerry Express" },
    { value: "FLASH_EXPRESS", label: "Flash Express" },
    { value: "JT_EXPRESS", label: "J&T Express" },
    { value: "THAILAND_POST", label: "Thailand Post" },
] as const;

/**
 * Vehicle Type options
 */
export const VEHICLE_TYPE_OPTIONS = [
    { value: "4_WHEEL", label: "รถ 4 ล้อ" },
    { value: "6_WHEEL", label: "รถ 6 ล้อ" },
] as const;

/**
 * Region Data options
 */
export const REGION_OPTIONS = [
    { value: "NORTH", label: "เหนือ" },
    { value: "NORTHEAST", label: "อีสาน" },
    { value: "CENTRAL", label: "นครหลวง" },
    { value: "EAST", label: "ตะวันออก" },
    { value: "WEST", label: "ตะวันตก" },
] as const;

/**
 * Status Data options
 */
export const STATUS_OPTIONS = [
    { value: '001', label: 'Loading Scheduler' },
    { value: '002', label: 'Booked' },
    { value: '003', label: 'Start Pick' },
    { value: '004', label: 'End Pick' },
    { value: '005', label: 'RTS' },
    { value: '006', label: 'Assign Bay' },
    { value: '007', label: 'Start Load' },
    { value: '008', label: 'End Load' },
    { value: '009', label: 'Check Out' },
] as const;

/**
 * Route options for Warehouse Status Monitor
 */
export const ROUTE_OPTIONS = [
    { value: "BKK_NORTH", label: "BKK North" },
    { value: "BKK_SOUTH", label: "BKK South" },
    { value: "BKK_EAST", label: "BKK East" },
    { value: "BKK_WEST", label: "BKK West" },
    { value: "CENTRAL", label: "Central" },
    { value: "NORTHEAST", label: "Northeast" },
    { value: "NORTH", label: "North" },
    { value: "SOUTH", label: "South" },
] as const;



/**
 * List time options  ไว้สำหรับเลือกเวลาเช็คอินรถบรรทุก รูปแบบ HHMMSS 8 โมงเช้า - ตี 5
 */

export const LIST_TIME_OPTIONS = [
    { value: "080000", label: "08:00" },
    { value: "083000", label: "08:30" },
    { value: "090000", label: "09:00" },
    { value: "093000", label: "09:30" },
    { value: "100000", label: "10:00" },
    { value: "103000", label: "10:30" },
    { value: "110000", label: "11:00" },
    { value: "113000", label: "11:30" },
    { value: "120000", label: "12:00" },
    { value: "123000", label: "12:30" },
    { value: "130000", label: "13:00" },
    { value: "133000", label: "13:30" },
    { value: "140000", label: "14:00" },
    { value: "143000", label: "14:30" },
    { value: "150000", label: "15:00" },
    { value: "153000", label: "15:30" },
    { value: "160000", label: "16:00" },
    { value: "163000", label: "16:30" },
    { value: "170000", label: "17:00" },
    { value: "173000", label: "17:30" },
    { value: "180000", label: "18:00" },
    { value: "183000", label: "18:30" },
    { value: "190000", label: "19:00" },
    { value: "193000", label: "19:30" },
    { value: "200000", label: "20:00" },
    { value: "203000", label: "20:30" },
    { value: "210000", label: "21:00" },
    { value: "213000", label: "21:30" },
    { value: "220000", label: "22:00" },
    { value: "223000", label: "22:30" },
    { value: "230000", label: "23:00" },
    { value: "233000", label: "23:30" },
    { value: "000000", label: "00:00" },
    { value: "003000", label: "00:30" },
    { value: "010000", label: "01:00" },
    { value: "013000", label: "01:30" },
    { value: "020000", label: "02:00" },
    { value: "023000", label: "02:30" },
    { value: "030000", label: "03:00" },
    { value: "033000", label: "03:30" },
    { value: "040000", label: "04:00" },
    { value: "043000", label: "04:30" },
    { value: "050000", label: "05:00" }
] as const;

export const LIST_TIEM_SLOTS = [
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
    "18:00 - 19:00",
    "19:00 - 20:00",
    "20:00 - 21:00",
    "21:00 - 22:00",
    "22:00 - 23:00",
    "23:00 - 00:00",
    "00:00 - 01:00",
    "01:00 - 02:00",
    "02:00 - 03:00",
    "03:00 - 04:00",
    "04:00 - 05:00",
]

/**
 * Truck Check-in Status options with translation keys
 */
export const TRUCK_CHECKIN_STATUS_OPTIONS = [
    { value: "CHECKED_IN", labelKey: "truckCheckin.statusCheckedIn" },
    { value: "NOT_CHECKED_IN", labelKey: "truckCheckin.statusNotCheckedIn" },
] as const;

// Truck Check-in Types
export type PlantValue = typeof PLANT_OPTIONS[number]["value"];
export type CarrierValue = typeof CARRIER_OPTIONS[number]["value"];
export type VehicleTypeValue = typeof VEHICLE_TYPE_OPTIONS[number]["value"];
export type TruckCheckinStatusValue = typeof TRUCK_CHECKIN_STATUS_OPTIONS[number]["value"];
export type ListTimeValue = typeof LIST_TIME_OPTIONS[number]["value"];


/**
 * ========================================
 * COMMON CONSTANTS
 * ========================================
 */

/**
 * Common Status options (สำหรับใช้ทั่วไป)
 */
export const COMMON_STATUS_OPTIONS = [
    { value: "ACTIVE", labelKey: "common.statusActive" },
    { value: "INACTIVE", labelKey: "common.statusInactive" },
] as const;

/**
 * Date Format Constants
 */
export const DATE_FORMATS = {
    DISPLAY: "DD/MM/YYYY",
    DISPLAY_WITH_TIME: "DD/MM/YYYY HH:mm",
    API: "YYYY-MM-DD",
    API_WITH_TIME: "YYYY-MM-DD HH:mm:ss",
} as const;

/**
 * Pagination Constants
 */
export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

// Common Types
export type CommonStatusValue = typeof COMMON_STATUS_OPTIONS[number]["value"];

/**
 * ========================================
 * CHART STYLES
 * ========================================
 */

/**
 * Style สำหรับ Label ในกราฟ (recharts LabelList)
 */
export const CHART_LABEL_STYLE = {
    fill: "#333",
    fontWeight: "bold" as const,
    fontSize: 12,
} as const;
