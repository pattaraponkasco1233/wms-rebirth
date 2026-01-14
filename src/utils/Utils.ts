

const BASENAME = process.env.REACT_APP_BASENAME || '/';

/**
 * ฟังก์ชันสร้าง Full Path โดยรวม Base Path ของแอปพลิเคชันไว้ด้วย
 * เช่น: navigateAppName('/dashboard') จะคืนค่าเป็น '/one-wms/dashboard'
 * * @param pathName Path ที่ต้องการ (ต้องขึ้นต้นด้วย '/')
 * @returns Full Path ที่รวม Base Name แล้ว
 */

export const navigateAppName = (pathName: string): string => {
  // 1. ลบเครื่องหมาย '/' ที่อาจซ้ำซ้อน
  const cleanBasename = BASENAME.replace(/\/$/, ''); // ลบ '/' ท้ายสุดของ basename
  const cleanPathName = pathName.replace(/^\//, ''); // ลบ '/' หน้าสุดของ pathName

  // 2. สร้าง Full Path
  return `${cleanBasename}/${cleanPathName}`;
};

/**
 * ตัวอย่างการใช้งานเมื่อคุณต้องการระบุ Path ในการ Redirect ภายนอก (Native Redirect)
 * หรือใช้ในการตั้งค่า Ant Design Menu Items ที่ต้องการ Full Path
 * * ใช้: window.location.href = navigateAppName('/login');
 */

export const currentDateNow = () => new Date();

export const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

export const formatDDMMYYYY = (value: string): string => {
  if (!value) return "";
  // Format from DDMMYYYY to DD/MM/YYYY
  if (value.length === 8) {
    const day = value.substring(0, 2);
    const month = value.substring(2, 4);
    const year = value.substring(4, 8);
    return `${day}/${month}/${year}`;
  }
  return value;
}