// src/models/booking-car/booking-car.model.ts
// Models สำหรับหน้า Booking Car Management

/**
 * Booking Car Status Types
 */
export type BookingCarStatus = 'pending' | 'confirmed' | 'in-transit' | 'completed' | 'cancelled';

/**
 * Vehicle Types
 */
export type VehicleType = 'truck-4w' | 'truck-6w' | 'truck-10w' | 'container-20ft' | 'container-40ft' | 'van';

/**
 * Interface สำหรับ Booking Car Data
 */
export interface BookingCar {
    key: string;
    id: string;
    orderNumber: string;
    vehicleType: VehicleType;
    vehicleTypeName: string;
    licensePlate: string;
    driverName: string;
    driverPhone: string;
    origin: string;
    destination: string;
    bookingDate: string;
    deliveryDate: string;
    status: BookingCarStatus;
    statusText: string;
    weight?: number;
    volume?: number;
    distance?: number;
    cost?: number;
    notes?: string;
    createdAt: string;
    updatedAt?: string;
    createdBy?: string;
}

/**
 * Interface สำหรับ Booking Car Form
 */
export interface BookingCarForm {
    orderNumber: string;
    vehicleType: VehicleType;
    licensePlate: string;
    driverName: string;
    driverPhone: string;
    origin: string;
    destination: string;
    bookingDate: string;
    deliveryDate: string;
    weight?: number;
    volume?: number;
    notes?: string;
}

/**
 * Interface สำหรับ Filter Parameters
 */
export interface BookingCarFilter {
    orderNumber?: string;
    vehicleType?: VehicleType;
    status?: BookingCarStatus;
    startDate?: string;
    endDate?: string;
    destination?: string;
}

/**
 * Interface สำหรับ Create/Update Response
 */
export interface BookingCarResponse {
    success: boolean;
    message: string;
    data?: BookingCar;
}

/**
 * Interface สำหรับ List Response
 */
export interface BookingCarListResponse {
    success: boolean;
    data: BookingCar[];
    total: number;
    page: number;
    pageSize: number;
}

/**
 * Vehicle Type Options
 */
export const VEHICLE_TYPE_OPTIONS = [
    { label: 'รถกระบะ 4 ล้อ', value: 'truck-4w' },
    { label: 'รถกระบะ 6 ล้อ', value: 'truck-6w' },
    { label: 'รถกระบะ 10 ล้อ', value: 'truck-10w' },
    { label: 'ตู้คอนเทนเนอร์ 20 ฟุต', value: 'container-20ft' },
    { label: 'ตู้คอนเทนเนอร์ 40 ฟุต', value: 'container-40ft' },
    { label: 'รถตู้', value: 'van' },
] as const;

/**
 * Status Options
 */
export const STATUS_OPTIONS = [
    { label: 'รอดำเนินการ', value: 'pending', color: 'orange' },
    { label: 'ยืนยันแล้ว', value: 'confirmed', color: 'blue' },
    { label: 'กำลังขนส่ง', value: 'in-transit', color: 'cyan' },
    { label: 'เสร็จสิ้น', value: 'completed', color: 'green' },
    { label: 'ยกเลิก', value: 'cancelled', color: 'red' },
] as const;
