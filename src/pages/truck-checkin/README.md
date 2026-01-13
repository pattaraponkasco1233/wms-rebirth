# Truck Check-in Feature

## คำอธิบาย

หน้า Truck Check-in เป็นหน้าสำหรับจัดการข้อมูลการ Check-in ของรถบรรทุก ประกอบด้วยฟีเจอร์หลักดังนี้:

## ฟีเจอร์

### 1. ค้นหาและกรอง

- **ช่องค้นหาทั่วไป**: ค้นหาจากทะเบียนรถหรือชื่อคนขับ
- **วันที่ Check In**: กรองตามวันที่ที่รถ Check-in
- **ปุ่มค้นหา**: ดำเนินการค้นหาตามเงื่อนไข
- **ปุ่มล้างค่า**: รีเซ็ตค่าการค้นหาทั้งหมด

### 2. ตารางแสดงข้อมูล

แสดงรายละเอียดรถที่ Check-in ประกอบด้วย:

- **ลำดับ**: เลขลำดับ
- **ทะเบียนรถ**: หมายเลขทะเบียนรถบรรทุก
- **ชื่อคนขับ**: ชื่อผู้ขับรถ
- **วันที่ Check In**: วันที่ทำการ Check-in
- **เวลา Check In**: เวลาที่ทำการ Check-in
- **สถานะ**: สถานะการ Check-in (Check In แล้ว / ยังไม่ Check In / รอดำเนินการ)
- **หมายเหตุ**: ข้อมูลเพิ่มเติม
- **จัดการ**: ปุ่มแก้ไขข้อมูล

### 3. สถานะการ Check-in

- 🟢 **CHECKED_IN** (Check In แล้ว): รถได้ทำการ Check-in เรียบร้อยแล้ว
- 🔴 **NOT_CHECKED_IN** (ยังไม่ Check In): รถยังไม่ได้ทำการ Check-in
- 🟡 **PENDING** (รอดำเนินการ): รออนุมัติหรือดำเนินการ

### 4. Popup แก้ไขข้อมูล

เมื่อกดปุ่มแก้ไข (ไอคอนดินสอ) จะเปิด Modal สำหรับแก้ไขข้อมูล:

- ทะเบียนรถ
- ชื่อคนขับ
- วันที่ Check In
- เวลา Check In
- สถานะ
- หมายเหตุ

## การใช้งาน

### เข้าถึงหน้า Truck Check-in

```
URL: /truck-checkin
```

### การค้นหา

1. กรอกคำค้นหาในช่อง "ค้นหาทะเบียนรถ, ชื่อคนขับ..."
2. เลือกวันที่ Check In (ถ้าต้องการกรอง)
3. คลิกปุ่ม "ค้นหา"

### การแก้ไขข้อมูล

1. คลิกปุ่ม "แก้ไข" ในแถวที่ต้องการแก้ไข
2. แก้ไขข้อมูลใน Popup
3. คลิก "บันทึก" เพื่อบันทึกการเปลี่ยนแปลง

## ไฟล์ที่เกี่ยวข้อง

### Models

- `src/models/truck-checkin/truck-checkin.model.ts` - ประกาศ Type และ Interface

### Services

- `src/services/api/truckCheckinService.ts` - API Service สำหรับเรียกข้อมูล

### Pages

- `src/pages/truck-checkin/index.tsx` - หน้าจอ Truck Check-in

### Routers

- `src/guard/router/routers/TruckCheckin.tsx` - Route configuration
- `src/guard/router/routers/index.tsx` - Export routes

## API Endpoints (ต้องเตรียมใน Backend)

```typescript
GET    /truck-checkin                 // ดึงรายการ Truck Check-in
GET    /truck-checkin/:id             // ดึงข้อมูล Truck Check-in ตาม ID
POST   /truck-checkin                 // สร้าง Truck Check-in ใหม่
PUT    /truck-checkin/:id             // อัพเดท Truck Check-in
DELETE /truck-checkin/:id             // ลบ Truck Check-in
```

## Query Parameters

```typescript
{
  search?: string;          // ค้นหาทะเบียนรถหรือชื่อคนขับ
  checkinDate?: string;     // กรองตามวันที่ (YYYY-MM-DD)
  status?: TruckCheckinStatus; // กรองตามสถานะ
  page?: number;            // หน้าที่
  limit?: number;           // จำนวนรายการต่อหน้า
}
```

## หมายเหตุ

- ปัจจุบันใช้ Mock Data สำหรับการ Demo
- เมื่อ Backend API พร้อม ระบบจะทำงานโดยอัตโนมัติ
- ต้องมีการ Login ก่อนเข้าใช้งานหน้านี้ (Protected Route)
