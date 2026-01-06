// src/config/version.config.ts

/**
 * Version Configuration
 * 
 * รูปแบบ Version: MAJOR.MINOR.PATCH
 * - MAJOR: เปลี่ยนเมื่อมีการเปลี่ยนแปลงใหญ่ที่ไม่ backward compatible
 * - MINOR: เพิ่มฟีเจอร์ใหม่แบบ backward compatible
 * - PATCH: แก้ไข bug หรือปรับปรุงเล็กน้อย
 */

export const APP_VERSION = {
    major: 1,
    minor: 0,
    patch: 0,
};

// รวม version เป็น string
export const getVersionString = (): string => {
    return `${APP_VERSION.major}.${APP_VERSION.minor}.${APP_VERSION.patch}`;
};

// Build number (optional) - อัตโนมัติจากเวลา build
export const getBuildNumber = (): string => {
    const env = process.env.REACT_APP_ENV || 'development';
    const buildDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    return `${env}-${buildDate}`;
};

// Full version string
export const getFullVersion = (): string => {
    return `v${getVersionString()} (${getBuildNumber()})`;
};

// Environment-specific version suffix
export const getVersionWithEnv = (): string => {
    const env = process.env.REACT_APP_ENV || 'dev';
    const envSuffix = {
        development: 'DEV',
        uat: 'UAT',
        production: '',
    };

    const suffix = envSuffix[env as keyof typeof envSuffix] || 'DEV';
    return suffix ? `${getVersionString()}-${suffix}` : getVersionString();
};

// Version info object
export const VERSION_INFO = {
    version: getVersionString(),
    fullVersion: getFullVersion(),
    versionWithEnv: getVersionWithEnv(),
    buildDate: new Date().toISOString(),
    environment: process.env.REACT_APP_ENV || 'development',
};

// Display version in console (development only)
if (process.env.REACT_APP_ENV === 'development') {
    console.log('📦 App Version:', VERSION_INFO.versionWithEnv);
    console.log('🌍 Environment:', VERSION_INFO.environment);
    console.log('📅 Build Date:', VERSION_INFO.buildDate);
}

export default VERSION_INFO;
