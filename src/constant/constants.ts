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
    { value: "PLANT_A", label: "Plant A" },
    { value: "PLANT_B", label: "Plant B" },
    { value: "PLANT_C", label: "Plant C" },
    { value: "PLANT_D", label: "Plant D" },
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
