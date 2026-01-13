// src/constant/constants.ts
// ไฟล์ Constants กลางสำหรับทั้งระบบ

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
 * Vehicle Type options
 */
export const VEHICLE_TYPE_OPTIONS = [
    { value: "4_WHEEL", labelKey: "truckCheckin.vehicleType4Wheel" },
    { value: "6_WHEEL", labelKey: "truckCheckin.vehicleType6Wheel" },
    { value: "8_WHEEL", labelKey: "truckCheckin.vehicleType8Wheel" },
    { value: "10_WHEEL", labelKey: "truckCheckin.vehicleType10Wheel" },
] as const;

/**
 * Truck Check-in Status options with translation keys
 */
export const TRUCK_CHECKIN_STATUS_OPTIONS = [
    { value: "CHECKED_IN", labelKey: "truckCheckin.statusCheckedIn" },
    { value: "NOT_CHECKED_IN", labelKey: "truckCheckin.statusNotCheckedIn" },
    { value: "PENDING", labelKey: "truckCheckin.statusPending" },
] as const;

// Truck Check-in Types
export type PlantValue = typeof PLANT_OPTIONS[number]["value"];
export type VehicleTypeValue = typeof VEHICLE_TYPE_OPTIONS[number]["value"];
export type TruckCheckinStatusValue = typeof TRUCK_CHECKIN_STATUS_OPTIONS[number]["value"];

/**
 * ========================================
 * BOOKING CAR CONSTANTS
 * ========================================
 */

/**
 * Booking Car Status options
 */
export const BOOKING_CAR_STATUS_OPTIONS = [
    { value: "PENDING", labelKey: "bookingCar.statusPending" },
    { value: "CONFIRMED", labelKey: "bookingCar.statusConfirmed" },
    { value: "CANCELLED", labelKey: "bookingCar.statusCancelled" },
    { value: "COMPLETED", labelKey: "bookingCar.statusCompleted" },
] as const;

// Booking Car Types
export type BookingCarStatusValue = typeof BOOKING_CAR_STATUS_OPTIONS[number]["value"];

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
