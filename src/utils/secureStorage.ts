/**
 * Secure Storage Utility
 * 
 * Features:
 * 1. Encrypt/Decrypt ข้อมูลก่อนเก็บลง localStorage
 * 2. Namespace เพื่อป้องกันการชนกันของตัวแปรใน domain เดียวกัน
 * 3. Type-safe storage operations
 * 
 * @example
 * ```typescript
 * // การใช้งาน
 * import { secureStorage } from '@/utils/secureStorage';
 * 
 * // บันทึกข้อมูล
 * secureStorage.set('token', 'my-token-value');
 * 
 * // อ่านข้อมูล
 * const token = secureStorage.get('token');
 * 
 * // ลบข้อมูล
 * secureStorage.remove('token');
 * 
 * // ล้างทั้งหมด
 * secureStorage.clear();
 * ```
 */

import { APP_VERSION } from '../config/version.config';

/**
 * ตรวจสอบว่าควรเปิด encryption หรือไม่
 * - development: ปิด encryption (เพื่อความสะดวกในการ debug)
 * - uat/production: เปิด encryption (เพื่อความปลอดภัย)
 */
const shouldEncrypt = (): boolean => {
    const env = process.env.REACT_APP_ENV || 'development';
    return env !== 'development';
};

/**
 * Configuration
 */
const CONFIG = {
    // Namespace prefix เพื่อป้องกันการชนกันกับ app อื่นใน domain เดียวกัน
    // ใช้ชื่อ app + version เป็น namespace
    namespace: `wms_rebirth_v${APP_VERSION.major}`,

    // Secret key สำหรับ encryption (ควรเก็บใน environment variable ในโปรเจค production)
    // NOTE: ใน production ควรใช้ process.env.REACT_APP_STORAGE_SECRET
    secretKey: process.env.REACT_APP_STORAGE_SECRET || 'wms-rebirth-secret-key-2026',

    // เปิด/ปิด encryption ตาม environment
    enableEncryption: shouldEncrypt(),
};

/**
 * Simple XOR-based encryption (สำหรับ obfuscation)
 * NOTE: นี่เป็น basic encryption เพื่อให้ไม่สามารถอ่านได้ง่าย
 * สำหรับความปลอดภัยสูง ควรใช้ crypto library เช่น crypto-js
 */
class SimpleEncryption {
    private key: string;

    constructor(key: string) {
        this.key = key;
    }

    /**
     * Encrypt string using XOR cipher with Base64 encoding
     */
    encrypt(text: string): string {
        try {
            const encrypted = this.xorCipher(text);
            return btoa(encrypted); // Base64 encode
        } catch (error) {
            console.error('[SecureStorage] Encryption error:', error);
            return text;
        }
    }

    /**
     * Decrypt string
     */
    decrypt(encryptedText: string): string {
        try {
            const decoded = atob(encryptedText); // Base64 decode
            return this.xorCipher(decoded);
        } catch (error) {
            console.error('[SecureStorage] Decryption error:', error);
            return encryptedText;
        }
    }

    /**
     * XOR cipher implementation
     */
    private xorCipher(text: string): string {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i) ^ this.key.charCodeAt(i % this.key.length);
            result += String.fromCharCode(charCode);
        }
        return result;
    }
}

/**
 * Secure Storage Manager
 */
class SecureStorageManager {
    private encryption: SimpleEncryption;
    private namespace: string;

    constructor() {
        this.encryption = new SimpleEncryption(CONFIG.secretKey);
        this.namespace = CONFIG.namespace;

        // Log encryption status
        const env = process.env.REACT_APP_ENV || 'development';
        if (process.env.NODE_ENV === 'development') {
            console.log(
                `[SecureStorage] Initialized with encryption: ${CONFIG.enableEncryption ? '🔐 ENABLED' : '🔓 DISABLED'} (env: ${env})`
            );
        }
    }

    /**
     * ตรวจสอบว่า encryption เปิดอยู่หรือไม่
     */
    isEncryptionEnabled(): boolean {
        return CONFIG.enableEncryption;
    }

    /**
     * ดู environment ปัจจุบัน
     */
    getEnvironment(): string {
        return process.env.REACT_APP_ENV || 'development';
    }

    /**
     * สร้าง key ที่มี namespace prefix
     */
    private getNamespacedKey(key: string): string {
        return `${this.namespace}__${key}`;
    }

    /**
     * บันทึกข้อมูลแบบ encrypted (ถ้าเปิดใช้งาน encryption)
     */
    set<T>(key: string, value: T): void {
        try {
            const jsonString = JSON.stringify(value);
            // ตรวจสอบว่าควร encrypt หรือไม่
            const dataToStore = CONFIG.enableEncryption
                ? this.encryption.encrypt(jsonString)
                : jsonString;
            const namespacedKey = this.getNamespacedKey(key);

            localStorage.setItem(namespacedKey, dataToStore);

            // เก็บ metadata สำหรับ debugging (optional)
            this.setMetadata(key);
        } catch (error) {
            console.error(`[SecureStorage] Error setting ${key}:`, error);
            throw new Error(`Failed to save ${key} to secure storage`);
        }
    }

    /**
     * อ่านข้อมูลแบบ decrypted (ถ้าเปิดใช้งาน encryption)
     */
    get<T>(key: string): T | null {
        try {
            const namespacedKey = this.getNamespacedKey(key);
            const storedData = localStorage.getItem(namespacedKey);

            if (!storedData) {
                return null;
            }

            // ตรวจสอบว่าควร decrypt หรือไม่
            const jsonString = CONFIG.enableEncryption
                ? this.encryption.decrypt(storedData)
                : storedData;

            return JSON.parse(jsonString) as T;
        } catch (error) {
            console.error(`[SecureStorage] Error getting ${key}:`, error);
            return null;
        }
    }

    /**
     * ลบข้อมูลเฉพาะ key
     */
    remove(key: string): void {
        try {
            const namespacedKey = this.getNamespacedKey(key);
            localStorage.removeItem(namespacedKey);
            this.removeMetadata(key);
        } catch (error) {
            console.error(`[SecureStorage] Error removing ${key}:`, error);
        }
    }

    /**
     * ล้างข้อมูลทั้งหมดของ namespace นี้
     */
    clear(): void {
        try {
            const keysToRemove: string[] = [];

            // หา keys ทั้งหมดที่มี namespace ของเรา
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(this.namespace)) {
                    keysToRemove.push(key);
                }
            }

            // ลบทีละ key
            keysToRemove.forEach(key => {
                localStorage.removeItem(key);
            });

            console.log(`[SecureStorage] Cleared ${keysToRemove.length} items`);
        } catch (error) {
            console.error('[SecureStorage] Error clearing storage:', error);
        }
    }

    /**
     * ตรวจสอบว่ามี key นี้อยู่หรือไม่
     */
    has(key: string): boolean {
        const namespacedKey = this.getNamespacedKey(key);
        return localStorage.getItem(namespacedKey) !== null;
    }

    /**
     * ดึงรายการ keys ทั้งหมดของ namespace นี้
     */
    keys(): string[] {
        const keys: string[] = [];
        const prefix = `${this.namespace}__`;

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(prefix)) {
                // ตัดส่วน namespace prefix ออก
                const originalKey = key.substring(prefix.length);
                if (!originalKey.startsWith('_meta_')) {
                    keys.push(originalKey);
                }
            }
        }

        return keys;
    }

    /**
     * เก็บ metadata สำหรับ debugging
     */
    private setMetadata(key: string): void {
        try {
            const metaKey = this.getNamespacedKey(`_meta_${key}`);
            const metadata = {
                key,
                timestamp: new Date().toISOString(),
                namespace: this.namespace,
            };
            localStorage.setItem(metaKey, JSON.stringify(metadata));
        } catch (error) {
            // Metadata is optional, don't throw
            console.warn('[SecureStorage] Failed to set metadata:', error);
        }
    }

    /**
     * ลบ metadata
     */
    private removeMetadata(key: string): void {
        try {
            const metaKey = this.getNamespacedKey(`_meta_${key}`);
            localStorage.removeItem(metaKey);
        } catch (error) {
            // Metadata is optional, don't throw
            console.warn('[SecureStorage] Failed to remove metadata:', error);
        }
    }

    /**
     * ดู metadata ของ key (สำหรับ debugging)
     */
    getMetadata(key: string): { key: string; timestamp: string; namespace: string } | null {
        try {
            const metaKey = this.getNamespacedKey(`_meta_${key}`);
            const metaStr = localStorage.getItem(metaKey);
            return metaStr ? JSON.parse(metaStr) : null;
        } catch (error) {
            return null;
        }
    }

    /**
     * ย้ายข้อมูลเก่าที่ไม่มี namespace มาใช้ secure storage
     * @param oldKey - key เก่าที่ไม่มี namespace
     * @param newKey - key ใหม่ที่จะใช้ (optional, default ใช้ชื่อเดิม)
     */
    migrate<T>(oldKey: string, newKey?: string): boolean {
        try {
            const oldValue = localStorage.getItem(oldKey);
            if (!oldValue) {
                return false;
            }

            // Parse ข้อมูลเก่า (ถ้าเป็น JSON)
            let parsedValue: T;
            try {
                parsedValue = JSON.parse(oldValue) as T;
            } catch {
                // ถ้า parse ไม่ได้ ใช้เป็น string
                parsedValue = oldValue as T;
            }

            // บันทึกด้วย secure storage
            const targetKey = newKey || oldKey;
            this.set(targetKey, parsedValue);

            // ลบข้อมูลเก่า
            localStorage.removeItem(oldKey);

            console.log(`[SecureStorage] Migrated ${oldKey} → ${targetKey}`);
            return true;
        } catch (error) {
            console.error(`[SecureStorage] Migration failed for ${oldKey}:`, error);
            return false;
        }
    }
}

// Export singleton instance
export const secureStorage = new SecureStorageManager();

// Export types สำหรับ TypeScript
export type { SecureStorageManager };
