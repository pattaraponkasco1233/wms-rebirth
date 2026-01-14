/**
 * Storage Initialization
 * 
 * ไฟล์นี้จะถูกเรียกตอน App start เพื่อ:
 * 1. Migrate ข้อมูลเก่าจาก localStorage แบบเดิมมาเป็น secure storage
 * 2. ตั้งค่าเริ่มต้นที่จำเป็น
 */

import { wmsStorage } from '../utils/wmsStorage';
import { secureStorage } from '../utils/secureStorage';

/**
 * Initialize storage และทำการ migrate ข้อมูลเก่า
 * เรียกใช้ครั้งเดียวตอน app start
 */
export const initializeStorage = (): void => {
    try {
        console.log('[Storage Init] Starting initialization...');

        // ตรวจสอบว่าเคย migrate แล้วหรือยัง
        const migrationKey = '_migration_completed';
        const hasMigrated = secureStorage.has(migrationKey);

        if (!hasMigrated) {
            console.log('[Storage Init] First time - migrating old data...');

            // ทำการ migrate ข้อมูลเก่า
            wmsStorage.migrateOldData();

            // เก็บ flag ว่า migrate แล้ว
            secureStorage.set(migrationKey, {
                completed: true,
                timestamp: new Date().toISOString(),
                version: '1.0.0',
            });

            console.log('[Storage Init] ✅ Migration completed');
        } else {
            console.log('[Storage Init] Already migrated, skipping...');
        }

        // แสดงข้อมูล debug ใน development
        if (process.env.NODE_ENV === 'development') {
            console.log('[Storage Init] Debug info:');
            console.log('- Storage keys:', secureStorage.keys());
            console.log('- Has token:', wmsStorage.hasToken());
            console.log('- Is authenticated:', wmsStorage.isAuthenticated());
        }

        console.log('[Storage Init] ✅ Initialization completed');
    } catch (error) {
        console.error('[Storage Init] ❌ Error during initialization:', error);
        // ไม่ throw error เพื่อไม่ให้ app crash
    }
};

/**
 * ล้างข้อมูลทั้งหมดและ reset migration flag
 * ใช้เมื่อต้องการ reset app เหมือนติดตั้งใหม่
 */
export const resetStorage = (): void => {
    try {
        console.log('[Storage Init] Resetting all storage...');

        // ล้างข้อมูลทั้งหมดใน secure storage
        secureStorage.clear();

        // ล้าง localStorage แบบเดิมด้วย (ถ้ามีข้อมูลค้างอยู่)
        // const keysToCheck = ['wms', 'token', 'user', 'language', 'app_version'];
        // keysToCheck.forEach(key => {
        //     if (localStorage.getItem(key)) {
        //         localStorage.removeItem(key);
        //         console.log(`[Storage Init] Removed old key: ${key}`);
        //     }
        // });

        console.log('[Storage Init] ✅ Storage reset completed');
    } catch (error) {
        console.error('[Storage Init] ❌ Error during reset:', error);
    }
};

/**
 * ตรวจสอบสุขภาพของ storage
 * @returns true ถ้า storage ทำงานปกติ
 */
export const checkStorageHealth = (): boolean => {
    try {
        // ทดสอบ write/read
        const testKey = '_health_check';
        const testValue = { timestamp: Date.now() };

        secureStorage.set(testKey, testValue);
        const readValue = secureStorage.get(testKey);
        secureStorage.remove(testKey);

        return readValue !== null;
    } catch (error) {
        console.error('[Storage Init] Storage health check failed:', error);
        return false;
    }
};
