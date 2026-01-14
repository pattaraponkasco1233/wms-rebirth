// src/services/api/index.ts
// Central API Service - รวม API services ทั้งหมดไว้ที่นี่

export { default as axiosInstance } from './axiosInstance';

// Dashboard APIs
export { dashboardCarApi } from './dashboardCarService';


// Auth APIs
export { authApi } from './authService';

// Re-export types from models
export type {
    // Dashboard Car Types
    DashboardCarFilter,
    DashboardCarResponse,
    DashboardCarStatistics,
    DailyBookingData,
    VehicleUsageData,
    PopularRoute,
    RecentBooking,
} from '../../models/dashboard/car.model';



export type {
    // Auth Types
    LoginRequest,
    LoginResponse,
    User,
    UserRole,
    AuthContextType,
} from '../../models/auth/auth.model';
