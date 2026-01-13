// Truck Check-in Models

export interface TruckCheckin {
    id: string;
    plant?: string;
    carrier?: string;
    vehicleType?: string;
    license: string;
    driver?: string;
    tel?: string;
    checkin: string;
    status: TruckCheckinStatus;
    remark?: string;
    createdAt?: string;
    updatedAt?: string;
}

export enum TruckCheckinStatus {
    CHECKED_IN = 'CHECKED_IN',
    NOT_CHECKED_IN = 'NOT_CHECKED_IN',
    PENDING = 'PENDING'
}

export interface TruckCheckinSearchParams {
    search?: string;
    plant?: string;
    checkinDate?: string;
    status?: TruckCheckinStatus;
    page?: number;
    limit?: number;
}

export interface TruckCheckinResponse {
    data: TruckCheckin[];
    total: number;
    page: number;
    limit: number;
}

export interface UpdateTruckCheckinRequest {
    license?: string;
    driver?: string;
    checkin?: string;
    status?: TruckCheckinStatus;
    remark?: string;
}
