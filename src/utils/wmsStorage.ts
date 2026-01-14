/**
 * WMS Storage Helper
 * 
 * Helper functions สำหรับจัดการข้อมูล WMS ใน secure storage
 * ใช้ร่วมกับ secureStorage utility
 */

import { secureStorage } from './secureStorage';

/**
 * Interface สำหรับข้อมูล WMS ที่เก็บใน storage
 */
export interface WMSData {
    token?: string;
    serverHost?: string;
    serverPort?: string;
    protocol?: string;
    refreshToken?: string;
    expiresAt?: number;
    user?: {
        id?: string;
        username?: string;
        email?: string;
        role?: string;
        [key: string]: any;
    };
    [key: string]: any;
}

/**
 * Storage Keys Constants
 */
export const STORAGE_KEYS = {
    WMS: 'wms',
    TOKEN: 'token',
    USER: 'user',
    REFRESH_TOKEN: 'refreshToken',
    SERVER_CONFIG: 'serverConfig',
    APP_VERSION: 'app_version',
    LANGUAGE: 'language',
} as const;

/**
 * WMS Storage Manager
 * Wrapper สำหรับจัดการข้อมูล WMS แบบ type-safe
 */
class WMSStorageManager {
    /**
     * บันทึกข้อมูล WMS ทั้งหมด
     */
    setWMSData(data: WMSData): void {
        secureStorage.set<WMSData>(STORAGE_KEYS.WMS, data);
    }

    /**
     * อ่านข้อมูล WMS ทั้งหมด
     */
    getWMSData(): WMSData {
        const data = secureStorage.get<WMSData>(STORAGE_KEYS.WMS);
        return data || {};
    }

    /**
     * อัพเดทข้อมูล WMS บางส่วน
     */
    updateWMSData(partialData: Partial<WMSData>): void {
        const currentData = this.getWMSData();
        const updatedData = { ...currentData, ...partialData };
        this.setWMSData(updatedData);
    }

    /**
     * บันทึก Token
     */
    setToken(token: string, expiresAt?: number): void {
        const currentData = this.getWMSData();
        this.setWMSData({
            ...currentData,
            token,
            expiresAt: expiresAt || Date.now() + 24 * 60 * 60 * 1000, // Default 24 hours
        });
    }

    /**
     * อ่าน Token
     */
    getToken(): string | null {
        const data = this.getWMSData();

        // ตรวจสอบว่า token หมดอายุหรือไม่
        if (data.token && data.expiresAt) {
            if (Date.now() > data.expiresAt) {
                console.warn('[WMSStorage] Token expired');
                this.clearToken();
                return null;
            }
        }

        return data.token || null;
    }

    /**
     * ลบ Token
     */
    clearToken(): void {
        const currentData = this.getWMSData();
        delete currentData.token;
        delete currentData.expiresAt;
        delete currentData.refreshToken;
        this.setWMSData(currentData);
    }

    /**
     * บันทึกข้อมูล User
     */
    setUser(user: WMSData['user']): void {
        this.updateWMSData({ user });
    }

    /**
     * อ่านข้อมูล User
     */
    getUser(): WMSData['user'] | null {
        const data = this.getWMSData();
        return data.user || null;
    }

    /**
     * บันทึก Server Configuration
     */
    setServerConfig(config: { serverHost: string; serverPort: string; protocol: string }): void {
        this.updateWMSData({
            serverHost: config.serverHost,
            serverPort: config.serverPort,
            protocol: config.protocol,
        });
    }

    /**
     * อ่าน Server Configuration
     */
    getServerConfig(): { serverHost?: string; serverPort?: string; protocol?: string } {
        const data = this.getWMSData();
        return {
            serverHost: data.serverHost,
            serverPort: data.serverPort,
            protocol: data.protocol,
        };
    }

    /**
     * ล้างข้อมูล WMS ทั้งหมด
     */
    clearWMSData(): void {
        secureStorage.remove(STORAGE_KEYS.WMS);
    }

    /**
     * ล้างข้อมูลทั้งหมดใน secure storage
     */
    clearAll(): void {
        secureStorage.clear();
    }

    /**
     * ตรวจสอบว่ามี Token หรือไม่
     */
    hasToken(): boolean {
        return this.getToken() !== null;
    }

    /**
     * ตรวจสอบว่า User login อยู่หรือไม่
     */
    isAuthenticated(): boolean {
        return this.hasToken();
    }

    /**
     * บันทึกภาษา
     */
    setLanguage(language: string): void {
        secureStorage.set(STORAGE_KEYS.LANGUAGE, language);
    }

    /**
     * อ่านภาษา
     */
    getLanguage(): string | null {
        return secureStorage.get<string>(STORAGE_KEYS.LANGUAGE);
    }

    /**
     * ย้ายข้อมูลเก่าจาก localStorage แบบเดิม
     * เรียกใช้ครั้งเดียวตอน app start
     */
    migrateOldData(): void {
        console.log('[WMSStorage] Starting migration...');

        // ย้ายข้อมูล WMS
        const migrated = secureStorage.migrate<WMSData>('wms', STORAGE_KEYS.WMS);
        if (migrated) {
            console.log('[WMSStorage] ✅ Migrated WMS data');
        }

        // ย้ายข้อมูลอื่นๆ ถ้ามี
        const otherKeys = ['token', 'user', 'language', 'app_version'];
        otherKeys.forEach(key => {
            const oldValue = localStorage.getItem(key);
            if (oldValue) {
                try {
                    secureStorage.set(key, JSON.parse(oldValue));
                    localStorage.removeItem(key);
                    console.log(`[WMSStorage] ✅ Migrated ${key}`);
                } catch {
                    secureStorage.set(key, oldValue);
                    localStorage.removeItem(key);
                    console.log(`[WMSStorage] ✅ Migrated ${key} (as string)`);
                }
            }
        });

        console.log('[WMSStorage] Migration completed');
    }

    /**
     * Debug: แสดงข้อมูลทั้งหมด (ใช้ใน development เท่านั้น)
     */
    debug(): void {
        if (process.env.NODE_ENV === 'development') {
            console.log('[WMSStorage] Debug Info:');
            console.log('- Environment:', secureStorage.getEnvironment());
            console.log('- Encryption:', secureStorage.isEncryptionEnabled() ? '🔐 ENABLED' : '🔓 DISABLED');
            console.log('- Keys:', secureStorage.keys());
            console.log('- WMS Data:', this.getWMSData());
            console.log('- Token exists:', this.hasToken());
            console.log('- User:', this.getUser());
            console.log('- Server Config:', this.getServerConfig());
        }
    }
}

// Export singleton instance
export const wmsStorage = new WMSStorageManager();

// Export types
export type { WMSStorageManager };
