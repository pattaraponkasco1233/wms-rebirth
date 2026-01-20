// src/services/api/index.ts
// Central API Service - รวม API services ทั้งหมดไว้ที่นี่

export { default as axiosInstance } from './axiosInstance';

// Auth APIs
export { authApi } from './authService';

// Warehouse Status APIs
export { warehouseStatusApi } from './warehouseStatus.service';

// Re-export types from models
export type {
    // Auth Types
    LoginRequest,
    LoginResponse,
    User,
    UserRole,
    AuthContextType,
} from '../../models/auth/auth.model';

export type {
    // Warehouse Status Types
    WarehouseStatusFilter,
    WarehouseStatusResponse,
    WarehouseStatusDetail,
    WarehouseStatusSummary,
    SummaryData,
} from '../../models/warehouse-status';
