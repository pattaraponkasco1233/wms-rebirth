// src/constant/api.base.ts

import { UAT_CONFIG } from './baseURL.uat';
import { PRD_CONFIG } from './baseURL.prd';

// 1. Interface หลักสำหรับ Base URL Config (Export โดยตรง)
// ไม่ต้องใช้ export ในบล็อกสุดท้ายซ้ำ
export interface BaseUrlConfig {
    [key: string]: any;
    local: string;
    server84: string;
    public: string;
    // uat_nkie: string;
    // uat_nk1: string;
    // uat_nk2: string;
    uat_hk: string;
    // uat_kr: string;
    // uat_ssi: string;
    // uat_ssf: string;
    useServer: string; 
    requiresApiKey: boolean;
}

// 2. Type Alias สำหรับ Record (Export โดยตรง)
// ไม่ต้องใช้ export ในบล็อกสุดท้ายซ้ำ
export type BaseConfigRecord = Record<string, Partial<BaseUrlConfig>>;

// 3. เลือก CONFIG หลักตาม Environment
const API_ENV = process.env.REACT_APP_ENV?.toUpperCase();

// 4. Merge Configs
const BASE_CONFIG: BaseConfigRecord = API_ENV === "PRODUCTION" 
    ? PRD_CONFIG as BaseConfigRecord
    : UAT_CONFIG as BaseConfigRecord;

// 5. Export Value (ต้องแยก Export Value ออกจากการ Export Type)
// ลบ: BaseUrlConfig, BaseConfigRecord ออกจากบล็อกนี้
export {
    BASE_CONFIG
};