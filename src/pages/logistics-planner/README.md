# Logistics Planner Cockpit

หน้าสำหรับการวางแผนและจัดการเส้นทางขนส่งสินค้า

## คุณสมบัติหลัก

### Tab 1: สรุปตามช่วงเวลา (Time Summary)

- แสดงตารางสรุปจำนวนรอบขนส่งตามช่วงเวลา
- ช่วงเวลา: 8:00 - 9:00 ถึง 04:00 - 05:00 (ทุก 1 ชั่วโมง)
- แสดงจำนวนรอบขนส่งในแต่ละช่วงเวลา
- แสดงรายละเอียดของแต่ละรอบขนส่ง (Shipment No และ Route)
- ข้อมูลจะถูกคำนวณอัตโนมัติจาก First Time ใน Tab 2

### Tab 2: ตารางข้อมูล (Data Table)

- แสดงตารางข้อมูลรายละเอียดการขนส่งทั้งหมด
- ระบบกรองข้อมูล (Filter):
  - Plant / Route
  - License (ทะเบียนรถ)
  - Shipment No
- คอลัมน์ในตาราง:
  - **Shipment No**: เลขที่การขนส่ง
  - **Route**: เส้นทาง
  - **Load Date**: วันที่โหลดสินค้า
  - **Job Number**: หมายเลขงาน
  - **Pick Sequence**: ลำดับการรับสินค้า (แก้ไขได้)
  - **Truck License**: ทะเบียนรถ (แก้ไขได้)
  - **Vehicle Type**: ประเภทรถ (Dropdown: รถกระบะ, รถ 4 ล้อ, รถ 6 ล้อ, รถ 10 ล้อ, รถพ่วง, รถตู้)
  - **First Time**: เวลาเริ่มต้น (Dropdown: 8:00, 8:30, 9:00, ...)
  - **Carrier**: ผู้ขนส่ง (Dropdown: Kerry Express, Flash Express, J&T Express, Thailand Post, SCG Logistics, Nim See Seng)
  - **Generator**: ระบบสร้าง (Dropdown: auto, manual)
  - **1, 2, 3, 4**: ฟิลด์เพิ่มเติม
  - **Action**: ปุ่ม Edit/Submit

## การใช้งาน

### การแก้ไขข้อมูล

1. คลิกปุ่ม "Edit" ในแถวที่ต้องการแก้ไข
2. แก้ไขข้อมูลในช่องที่สามารถแก้ไขได้
3. คลิกปุ่ม "Submit" เพื่อบันทึกการแก้ไข
4. หรือคลิก "Cancel" เพื่อยกเลิกการแก้ไข

### การกรองข้อมูล

1. กรอกข้อมูลในช่องกรองที่ต้องการ (Plant/Route, License, Shipment No)
2. ตารางจะแสดงเฉพาะข้อมูลที่ตรงกับการกรอง
3. คลิกปุ่ม "รีเซ็ตฟิลเตอร์" เพื่อล้างการกรองทั้งหมด

### การดูสรุปตามช่วงเวลา

1. คลิกแท็บ "สรุปตามช่วงเวลา"
2. ตารางจะแสดงจำนวนรอบขนส่งในแต่ละช่วงเวลา
3. คลิกที่แต่ละช่วงเวลาเพื่อดูรายละเอียด

## ไฟล์ที่เกี่ยวข้อง

- `src/pages/logistics-planner/index.tsx` - Component หลัก
- `src/pages/logistics-planner/TimeSummaryTab.tsx` - Tab สรุปตามช่วงเวลา
- `src/pages/logistics-planner/DataTableTab.tsx` - Tab ตารางข้อมูล
- `src/models/logistics-planner/logistics-planner.model.ts` - Data models และ utilities

## การเข้าถึง

- URL: `/logistics-planner`
- เมนู: Logistics Planner (ในแถบเมนูด้านซ้าย)
- ต้อง Login ก่อนเข้าใช้งาน (Protected Route)

## Mock Data

ระบบมีข้อมูลตัวอย่างสำหรับการทดสอบ 5 รายการ สามารถแก้ไขได้ในไฟล์ `index.tsx`

## การพัฒนาต่อ

เมื่อต้องการเชื่อมต่อกับ API จริง:

1. สร้าง Service สำหรับดึงข้อมูล Logistics Planner ใน `src/services/api/`
2. แทนที่ Mock Data ด้วยการเรียก API
3. เพิ่มฟังก์ชัน Create, Update, Delete ที่เชื่อมต่อกับ Backend
4. เพิ่มการจัดการ Loading State และ Error Handling
