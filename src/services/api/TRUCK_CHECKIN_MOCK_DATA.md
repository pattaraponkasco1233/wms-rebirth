# Truck Check-in Mock Data Guide

## 📋 Overview

เอกสารนี้อธิบายการใช้งาน Mock Data สำหรับหน้า Truck Check-in

## 🎯 Mock Data Details

### ข้อมูล Mock ที่สร้างขึ้น

Mock Data ถูกสร้างใน `truckCheckinService.ts` โดยมีข้อมูลทั้งหมด **10 รายการ**

### โครงสร้างข้อมูล Mock

```typescript
{
  id: string; // รหัสเฉพาะ
  plant: string; // โรงงาน (ตาม PLANT_OPTIONS)
  carrier: string; // ผู้ขนส่ง (ตาม CARRIER_OPTIONS)
  vehicleType: string; // ประเภทรถ
  shipmentNo: string; // หมายเลขการจัดส่ง
  license: string; // ทะเบียนรถ
  driver: string; // ชื่อพนักงานขับรถ
  tel: string; // เบอร์โทรศัพท์
  checkin: string; // วันเวลาเช็คอิน
  status: TruckCheckinStatus; // สถานะ
  createdAt: string; // วันเวลาที่สร้าง
  updatedAt: string; // วันเวลาที่อัพเดท
}
```

## 🏭 Plant Options (โรงงาน)

ข้อมูล Plant ที่ใช้ในระบบ ตามที่กำหนดใน `PLANT_OPTIONS`:

- **SNK** - SNK (Max Capacity: 7)
- **GLX** - GLX (Max Capacity: 6)
- **SSI** - SSI (Max Capacity: 5)
- **SSF** - SSF (Max Capacity: 3)

## 🚚 Carrier Options (ผู้ขนส่ง)

ข้อมูล Carrier ที่ใช้ในระบบ ตามที่กำหนดใน `CARRIER_OPTIONS`:

- **Kerry Express**
- **Flash Express**
- **J&T Express**
- **Thailand Post**

## 📊 Sample Mock Data

| ID  | Plant | Carrier       | Vehicle Type | Shipment No | License | Driver         | Tel        | Status         |
| --- | ----- | ------------- | ------------ | ----------- | ------- | -------------- | ---------- | -------------- |
| 1   | SNK   | Kerry Express | รถ 6 ล้อ     | SHP-SNK-001 | กก-1234 | สมชาย ใจดี     | 0812345678 | CHECKED_IN     |
| 2   | GLX   | Flash Express | รถ 4 ล้อ     | SHP-GLX-002 | ขข-5678 | สมหญิง รักงาน  | 0823456789 | CHECKED_IN     |
| 3   | SSI   | J&T Express   | รถ 6 ล้อ     | SHP-SSI-003 | คค-9999 | สมศักดิ์ ขยัน  | 0834567890 | NOT_CHECKED_IN |
| 4   | SSF   | Thailand Post | รถ 4 ล้อ     | SHP-SSF-004 | งง-1111 | วิชัย มั่นคง   | 0845678901 | CHECKED_IN     |
| 5   | SNK   | Kerry Express | รถ 6 ล้อ     | SHP-SNK-005 | จจ-2222 | ประสิทธิ์ เร็ว | 0856789012 | PENDING        |
| 6   | GLX   | Flash Express | รถ 4 ล้อ     | SHP-GLX-006 | ฉฉ-3333 | อนุชา กล้าหาญ  | 0867890123 | CHECKED_IN     |
| 7   | SSI   | J&T Express   | รถ 6 ล้อ     | SHP-SSI-007 | ชช-4444 | พิทักษ์ รักษา  | 0878901234 | CHECKED_IN     |
| 8   | SSF   | Thailand Post | รถ 4 ล้อ     | SHP-SSF-008 | ซซ-5555 | วีระ สู้งาน    | 0889012345 | NOT_CHECKED_IN |
| 9   | SNK   | Kerry Express | รถ 6 ล้อ     | SHP-SNK-009 | ญญ-6666 | ธนา มีสติ      | 0890123456 | PENDING        |
| 10  | GLX   | Flash Express | รถ 4 ล้อ     | SHP-GLX-010 | ฎฎ-7777 | สุรชัย ทำงาน   | 0901234567 | CHECKED_IN     |

## 🔧 Features

### 1. API Service Functions

#### `getTruckCheckins(params)`

ดึงข้อมูล Truck Check-in พร้อมฟีเจอร์:

- ✅ Search (ค้นหาทะเบียนรถ, พนักงานขับรถ, Shipment No, Carrier)
- ✅ Filter by Plant
- ✅ Filter by Status
- ✅ Pagination (แบ่งหน้า)
- ✅ Mock delay 500ms

#### `getTruckCheckinById(id)`

ดึงข้อมูล Truck Check-in ตาม ID

#### `createTruckCheckin(data)`

สร้างข้อมูล Truck Check-in ใหม่

#### `updateTruckCheckin(id, data)`

อัพเดทข้อมูล Truck Check-in

#### `deleteTruckCheckin(id)`

ลบข้อมูล Truck Check-in

## 📝 Status Types

```typescript
enum TruckCheckinStatus {
  CHECKED_IN = "CHECKED_IN", // เช็คอินแล้ว
  NOT_CHECKED_IN = "NOT_CHECKED_IN", // ยังไม่ได้เช็คอิน
  PENDING = "PENDING", // รอดำเนินการ
}
```

## 🎨 Table Columns Order

ลำดับคอลัมน์ในตาราง:

1. **ลำดับ** (Run No.)
2. **โรงงาน** (Plant)
3. **ผู้ขนส่ง** (Carrier)
4. **ประเภทรถ** (Vehicle Type)
5. **ทะเบียนรถ** (License)
6. **หมายเลขการจัดส่ง** (Shipment No) ⭐ **เพิ่มใหม่**
7. **ชื่อพนักงานขับรถ** (Driver Name)
8. **เบอร์โทร** (Tel)
9. **วันเวลาเช็คอิน** (Check-in DateTime)
10. **สถานะ** (Status)
11. **จัดการ** (Action)

## 🔄 Search & Filter

### Search Bar

ค้นหาได้จาก:

- ทะเบียนรถ (License)
- ชื่อพนักงานขับรถ (Driver)
- หมายเลขการจัดส่ง (Shipment No)
- ผู้ขนส่ง (Carrier)

### Filter Options

- **Plant**: กรองตามโรงงาน (SNK, GLX, SSI, SSF)
- **Status**: กรองตามสถานะ
- **Date**: กรองตามวันที่เช็คอิน

## 💡 Usage Example

```typescript
// ดึงข้อมูลทั้งหมด
const response = await truckCheckinApi.getTruckCheckins();

// ดึงข้อมูลพร้อม Filter
const response = await truckCheckinApi.getTruckCheckins({
  search: "Kerry",
  plant: "SNK",
  page: 1,
  limit: 10,
});

// เพิ่มข้อมูลใหม่
const newTruck = await truckCheckinApi.createTruckCheckin({
  plant: "SNK",
  carrier: "Kerry Express",
  vehicleType: "รถ 6 ล้อ",
  shipmentNo: "SHP-SNK-011",
  license: "กก-8888",
  driver: "ทดสอบ ระบบ",
  tel: "0899999999",
  status: "PENDING",
});
```

## 🚀 How to Switch to Real API

เมื่อต้องการเปลี่ยนจาก Mock Data เป็น Real API:

1. แก้ไขไฟล์ `truckCheckinService.ts`
2. แทนที่ Mock function ด้วย API call ที่ใช้ `axiosInstance`
3. ลบ `mockTruckCheckinData` array

Example:

```typescript
// จาก Mock
getTruckCheckins: async (params) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  // ... mock logic
};

// เป็น Real API
getTruckCheckins: async (params) => {
  const response = await axiosInstance.get("/truck-checkin", { params });
  return response.data;
};
```

## ✅ Testing Checklist

- [x] Mock Data ตรงกับ PLANT_OPTIONS
- [x] Mock Data ตรงกับ CARRIER_OPTIONS
- [x] Search ทำงานได้ถูกต้อง
- [x] Filter by Plant ทำงานได้
- [x] Pagination ทำงานได้
- [x] Column Shipment No แสดงก่อน Driver
- [x] Create/Update/Delete ทำงานได้

## 📌 Notes

- Mock Data จะอยู่ใน memory เท่านั้น เมื่อ refresh หน้า ข้อมูลที่สร้างใหม่จะหายไป
- ใช้สำหรับการพัฒนาและทดสอบเท่านั้น
- เมื่อพร้อม deploy ควรเปลี่ยนเป็น Real API

---

**Last Updated**: January 28, 2026
**Version**: 1.0.0
