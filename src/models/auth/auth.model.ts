// src/models/auth/auth.model.ts
// Models สำหรับ Authentication

/**
 * Interface สำหรับ Login Request
 */
export interface LoginRequest {
    username: string;
    password: string;
    plant?: string;
}

/**
 * Interface สำหรับ Login Response
 */
export interface LoginResponse {
    success: boolean;
    message: string;
    token?: string;
    refreshToken?: string;
    user?: User;
}

/**
 * Interface สำหรับ User Data
 */
export interface User {
    id: string;
    username: string;
    email?: string;
    fullName: string;
    role: UserRole;
    plant?: string;
    department?: string;
    permissions?: string[];
    avatar?: string;
    createdAt?: string;
    lastLogin?: string;
}

/**
 * User Role Types
 */
export type UserRole = 'admin' | 'manager' | 'user' | 'viewer';

/**
 * Interface สำหรับ Refresh Token Request
 */
export interface RefreshTokenRequest {
    refreshToken: string;
}

/**
 * Interface สำหรับ Refresh Token Response
 */
export interface RefreshTokenResponse {
    success: boolean;
    token?: string;
    refreshToken?: string;
}

/**
 * Interface สำหรับ Logout Response
 */
export interface LogoutResponse {
    success: boolean;
    message: string;
}

/**
 * Interface สำหรับ Change Password Request
 */
export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

/**
 * Interface สำหรับ Reset Password Request
 */
export interface ResetPasswordRequest {
    email: string;
}

/**
 * Interface สำหรับ Auth Context
 */
export interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginRequest) => Promise<void>;
    logout: () => Promise<void>;
    refreshToken: () => Promise<void>;
}

/**
 * Plant Options
 */
export const PLANT_OPTIONS = [
    { label: 'กรุงเทพฯ', value: 'BKK' },
    { label: 'ชลบุรี', value: 'CHB' },
    { label: 'ระยอง', value: 'RYG' },
    { label: 'สมุทรปราการ', value: 'SPK' },
] as const;
