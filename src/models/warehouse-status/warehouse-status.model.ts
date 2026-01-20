// src/models/warehouse-status/warehouse-status.model.ts

/**
 * Filter model for Warehouse Status Monitor
 */
export interface WarehouseStatusFilter {
    route?: string;
    shipment?: string;
    dateFrom?: string;
    dateTo?: string;
}

/**
 * Detail record model
 */
export interface WarehouseStatusDetail {
    plant: string;
    sapShipment: string;
    shipmentNo: string;
    whStatus: string;
    route: string;
    deliveryNo: string;
    readyToShip: string; // datetime format
    loadDate: string; // date format
    cutLoad: string; // time format HH:mm
    truckReady: string; // time format HH:mm
}

/**
 * Summary data for each plant and status
 */
export interface SummaryData {
    sm: number;
    dn: number;
    items: number;
    box: number;
}

/**
 * Summary record by status
 */
export interface WarehouseStatusSummary {
    status: string;
    statusLabel: string;
    plants: {
        [plantCode: string]: SummaryData;
    };
}

/**
 * API Response model
 */
export interface WarehouseStatusResponse {
    summary: WarehouseStatusSummary[];
    details: WarehouseStatusDetail[];
}
