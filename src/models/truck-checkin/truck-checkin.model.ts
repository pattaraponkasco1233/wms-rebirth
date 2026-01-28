// Truck Check-in Models

export interface TruckCheckin {
    id: string;
    plant: string;
    carrier?: string;
    vehicleType?: string;
    shipmentNo: string;
    license: string;
    driver?: string;
    tel?: string;
    checkin: string;
    status: string;
    status_key?: string;
    remark?: string;
    createdAt?: string;
    updatedAt?: string;
}


export interface TruckCheckinSearchParams {
    search?: string;
    plant?: string;
    checkinDate?: string;
    status?: string;
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
    carrier?: string;
    vehicleType?: string;
    shipmentNo?: string;
    plant?: string;
    driver?: string;
    tel?: string;
    checkin?: string;
    status?: string;
    remark?: string;
}
