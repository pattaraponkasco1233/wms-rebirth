// src/services/api/authService.ts

import axiosInstance from './axiosInstance';
import type {
    LoginRequest,
    LoginResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
    LogoutResponse,
    ChangePasswordRequest,
    ResetPasswordRequest,
    User,
} from '../../models/auth/auth.model';

/**
 * Authentication API Service
 */
export const authApi = {
    /**
     * Login
     */
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        const response = await axiosInstance.post<LoginResponse>(
            '/auth/login',
            credentials
        );
        return response.data;
    },

    /**
     * Logout
     */
    logout: async (): Promise<LogoutResponse> => {
        const response = await axiosInstance.post<LogoutResponse>(
            '/auth/logout'
        );
        return response.data;
    },

    /**
     * Refresh Token
     */
    refreshToken: async (
        data: RefreshTokenRequest
    ): Promise<RefreshTokenResponse> => {
        const response = await axiosInstance.post<RefreshTokenResponse>(
            '/auth/refresh-token',
            data
        );
        return response.data;
    },

    /**
     * Get Current User Profile
     */
    getCurrentUser: async (): Promise<User> => {
        const response = await axiosInstance.get<{ data: User }>(
            '/auth/me'
        );
        return response.data.data;
    },

    /**
     * Change Password
     */
    changePassword: async (
        data: ChangePasswordRequest
    ): Promise<{ success: boolean; message: string }> => {
        const response = await axiosInstance.post(
            '/auth/change-password',
            data
        );
        return response.data;
    },

    /**
     * Request Password Reset
     */
    requestPasswordReset: async (
        data: ResetPasswordRequest
    ): Promise<{ success: boolean; message: string }> => {
        const response = await axiosInstance.post(
            '/auth/reset-password',
            data
        );
        return response.data;
    },

    /**
     * Verify Token
     */
    verifyToken: async (): Promise<boolean> => {
        try {
            await axiosInstance.get('/auth/verify');
            return true;
        } catch {
            return false;
        }
    },
};
