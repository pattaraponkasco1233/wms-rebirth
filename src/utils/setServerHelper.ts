// src/utils/setServerHelper.ts

import { wmsStorage, WMSData } from './wmsStorage';

// 1. กำหนด Interface สำหรับ WMS Data ที่คาดหวังจะเก็บไว้ใน secure storage
// NOTE: ใช้ WMSData จาก wmsStorage แทน
export interface WmsData extends WMSData {
  server?: string; // สำหรับเก็บค่า Plant/Server ที่เลือก
}

/**
 * ฟังก์ชันสำหรับอัปเดตข้อมูลใน secure storage ภายใต้ Key "wms"
 * @param newData ส่วนของข้อมูล WmsData ที่ต้องการอัปเดต
 */
export const updateWmsStorage = (newData: Partial<WmsData>): void => {
  try {
    wmsStorage.updateWMSData(newData);
  } catch (error) {
    console.error("Error updating WMS storage data:", error);
  }
};

/**
 * ฟังก์ชันสำหรับอ่านข้อมูลทั้งหมดจาก 'wms'
 */
export const getWmsStorage = (): WmsData => {
  try {
    return wmsStorage.getWMSData();
  } catch (error) {
    console.error("Error getting WMS storage data:", error);
    return {};
  }
};