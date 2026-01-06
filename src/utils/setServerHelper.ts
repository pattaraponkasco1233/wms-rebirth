// src/utils/storage.ts (หรือ src/utils/setServerHelper.ts)

// 1. กำหนด Interface สำหรับ WMS Data ที่คาดหวังจะเก็บไว้ใน localStorage
export interface WmsData {
  token?: string;
  refreshToken?: string;
  server?: string; // สำหรับเก็บค่า Plant/Server ที่เลือก
  // เพิ่ม properties อื่นๆ ที่เกี่ยวข้องกับผู้ใช้ เช่น username, role
  [key: string]: any; 
}

/**
 * ฟังก์ชันสำหรับอัปเดตข้อมูลใน localStorage ภายใต้ Key "wms"
 * @param newData ส่วนของข้อมูล WmsData ที่ต้องการอัปเดต
 */
export const updateWmsStorage = (newData: Partial<WmsData>): void => {
  const existingItem = localStorage.getItem("wms");
  
  let existing: WmsData = {};
  try {
    existing = existingItem ? (JSON.parse(existingItem) as WmsData) : {};
  } catch (e) {
    console.error("Error parsing existing WMS storage data:", e);
    existing = {};
  }
  
  const updated: WmsData = { ...existing, ...newData };
  localStorage.setItem("wms", JSON.stringify(updated));
};

/**
 * ฟังก์ชันสำหรับอ่านข้อมูลทั้งหมดจาก 'wms'
 */
export const getWmsStorage = (): WmsData => {
  const existingItem = localStorage.getItem("wms");
  try {
    return existingItem ? (JSON.parse(existingItem) as WmsData) : {};
  } catch (e) {
    console.error("Error parsing WMS storage data:", e);
    return {};
  }
};