# Proactive Monitor API Integration Guide

## 📋 Overview

ไฟล์ `proactiveMonitorApi.ts` จัดการการเรียกใช้ API สำหรับหน้า Overall Monitoring Tab ปัจจุบันใช้ **Mock Response** จำลองข้อมูล

## 🔧 Current Implementation (Mock)

### API Function

```typescript
fetchShipmentData(date: Dayjs): Promise<ShipmentApiResponse[]>
```

### Features

- ✅ รับ parameter วันที่เป็น `Dayjs`
- ✅ Mock delay 500ms เพื่อจำลองการเรียก API จริง
- ✅ ข้อมูลแตกต่างกันตามวันในสัปดาห์ (Weekend มีน้อยกว่า Weekday)
- ✅ Console log เพื่อ debug

### Mock Data Logic

- **Weekday (จันทร์-ศุกร์)**: 8 shipments
- **Weekend (เสาร์-อาทิตย์)**: 3 shipments

## 🚀 How to Connect Real API

### Step 1: Install axios (ถ้ายังไม่มี)

```bash
npm install axios
```

### Step 2: สร้าง axios instance (ถ้ายังไม่มี)

```typescript
// src/config/axios.config.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000,
});

export default axiosInstance;
```

### Step 3: แก้ไข fetchShipmentData()

แทนที่ function ใน `proactiveMonitorApi.ts`:

```typescript
import axiosInstance from "../../config/axios.config";

export const fetchShipmentData = async (
  date: Dayjs
): Promise<ShipmentApiResponse[]> => {
  try {
    const response = await axiosInstance.get(
      "/api/proactive-monitor/shipments",
      {
        params: {
          date: date.format("YYYY-MM-DD"),
        },
      }
    );

    console.log("📡 API Called - fetchShipmentData:", {
      date: date.format("YYYY-MM-DD"),
      recordCount: response.data.length,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching shipment data:", error);
    throw error;
  }
};
```

## 📊 API Response Format

### Expected Response

```json
[
  {
    "shipmentNo": "SH000001",
    "plant": "snk",
    "carrier": "KERRY_EXPRESS",
    "shipmentStatus": "001",
    "region": "CENTRAL",
    "loadingScheduled": "080000",
    "timeSlot": "08:00 - 09:00"
  },
  ...
]
```

### Field Mapping

| Field              | Type   | Description                                  | Example                          |
| ------------------ | ------ | -------------------------------------------- | -------------------------------- |
| `shipmentNo`       | string | หมายเลข Shipment                             | "SH000001"                       |
| `plant`            | string | รหัส Plant (ใช้ value จาก PLANT_OPTIONS)     | "snk", "glx", "ssi", "ssf"       |
| `carrier`          | string | รหัส Carrier (ใช้ value จาก CARRIER_OPTIONS) | "KERRY_EXPRESS", "FLASH_EXPRESS" |
| `shipmentStatus`   | string | รหัส Status (ใช้ value จาก STATUS_OPTIONS)   | "001", "002", ... "009"          |
| `region`           | string | รหัสภาค (ใช้ value จาก REGION_OPTIONS)       | "NORTH", "CENTRAL", "SOUTH"      |
| `loadingScheduled` | string | เวลาที่กำหนด format: HHMMSS                  | "080000", "093000"               |
| `timeSlot`         | string | ช่วงเวลา                                     | "08:00 - 09:00"                  |

## 🎯 Constants Reference

ค่าที่ API ต้องส่งกลับมาต้องตรงกับ Constants ที่กำหนดไว้:

### Plant Options

```typescript
PLANT_OPTIONS = [
  { value: "snk", label: "SNK - Salaya Nakhonchaisri" },
  { value: "glx", label: "GLX - Galaxy" },
  { value: "ssi", label: "SSI - Saraburi" },
  { value: "ssf", label: "SSF - Srisamrong" },
];
```

### Carrier Options

```typescript
CARRIER_OPTIONS = [
  { value: "KERRY_EXPRESS", label: "Kerry Express" },
  { value: "FLASH_EXPRESS", label: "Flash Express" },
  { value: "JT_EXPRESS", label: "J&T Express" },
  { value: "THAILAND_POST", label: "Thailand Post" },
];
```

### Status Options (001-009)

- 001: Loading Scheduler
- 002: Booked
- 003: Start Pick
- 004: End Pick
- 005: RTS
- 006: Check Quality
- 007: Wrap & Labeling
- 008: Ready to load
- 009: Shipment Out

### Region Options

```typescript
REGION_OPTIONS = [
  { value: "NORTH", label: "เหนือ" },
  { value: "NORTHEAST", label: "อีสาน" },
  { value: "CENTRAL", label: "นครหลวง" },
  { value: "EAST", label: "ตะวันออก" },
  { value: "WEST", label: "ตะวันตก" },
  { value: "SOUTH", label: "ใต้" },
];
```

## 🔍 Testing

### ทดสอบ Mock API

1. เปิดหน้า Overall Monitoring Tab
2. เปลี่ยนวันที่ในตัวเลือก DatePicker
3. ดู Console log จะแสดง:

```
📡 API Called - fetchShipmentData: {
  date: "2026-01-15",
  recordCount: 8
}
```

4. ข้อมูลจะโหลดหลังจาก 500ms

### ทดสอบ Real API

1. แก้ไข fetchShipmentData() ตาม Step 3
2. ตั้งค่า environment variable `REACT_APP_API_BASE_URL`
3. Restart development server
4. ทดสอบเหมือน Mock API

## ⚠️ Error Handling

Component มี error handling แล้ว:

- แสดง loading spinner ขณะโหลดข้อมูล
- ถ้า API error จะ set ข้อมูลเป็น array ว่าง
- Console.error แสดง error message

## 📝 Notes

- ⚡ Mock delay = 500ms (ปรับได้ตามต้องการ)
- 🔄 Component จะเรียก API ใหม่ทุกครั้งที่เปลี่ยนวันที่
- 💾 ข้อมูลจาก API จะถูก transform ใน component เพิ่ม `plantLoadDate` และ `booked`
- 🎨 Component ใช้ formatter functions แปลง value เป็น label สำหรับแสดงผล
