# KPI On Time Page

## Overview

หน้า KPI On Time ใช้สำหรับติดตามและวิเคราะห์ประสิทธิภาพการทำงานตามเวลาที่กำหนด โดยแสดงข้อมูลในรูปแบบตารางสรุปและตารางรายละเอียด

## Features

### 1. Filter Section

- **ช่วงวันที่**: เลือกช่วงเวลาที่ต้องการดูข้อมูล (Default: เดือนปัจุบัน)
- **ปุ่มค้นหา**: กดเพื่อดึงข้อมูลตามเงื่อนไขที่เลือก

### 2. Summary Table (ตารางสรุป)

- แสดงข้อมูลสรุปในรูปแบบ Matrix
- **Row**: ใช้ ListConditionKPI เป็น Check-in Condition
- **Column**: ใช้ ListConditionKPI เป็น Ready to Ship Condition
- แสดงจำนวน count ที่นับจากตาราง Detail
- มี Total row และ Total column สำหรับสรุปยอดรวม

### 3. Detail Table (ตารางรายละเอียด)

แสดงข้อมูลรายละเอียดของแต่ละ Shipment ประกอบด้วย:

#### Basic Information

1. **SAP Shipment**: รหัส Shipment ของ SAP
2. **Route**: เส้นทาง
3. **Job**: งาน
4. **ลำดับจัดสินค้า**: เวลาจัดสินค้า (เช่น 08:00 - 12:00)
5. **Operation Date**: วันที่ดำเนินการ
6. **Load Date**: วันที่บรรทุกสินค้า
7. **Cut Load**: เวลาตัดรอบบรรทุก
8. **Truck License**: ทะเบียนรถ
9. **Truck Type**: ประเภทรถ

#### Total Section

10. **Total**: แบ่งเป็น 3 คอลัมน์
    - DN: จำนวน Delivery Note
    - ITEM: จำนวนรายการสินค้า
    - BOX: จำนวนกล่อง

#### Warehouse Information

11. **PICK**: สถานะการ Pick
12. **WH Status**: แบ่งเป็น 5 คอลัมน์
    - Status: สถานะทั่วไป
    - HK: สถานะ HK
    - NKIE: สถานะ NKIE
    - NK: สถานะ NK
    - KRW: สถานะ KRW

#### Gate & Truck Information

13. **พาเรท (In Gate)**: เวลาเข้าประตู
14. **รอบยื่น**: รอบการยื่นเอกสาร
15. **รถพร้อม**: เวลารถพร้อม

#### Truck Status & Sequence

16. **สถานะรถ**: แบ่งเป็น 4 คอลัมน์
    - HK, NKIE, NK, KRW
17. **ลำดับการเข้ารับสินค้า**: แบ่งเป็น 4 คอลัมน์
    - HK, NKIE, NK, KRW

## Files Structure

```
src/
├── models/
│   └── kpi-on-time/
│       ├── index.ts
│       └── types.ts
├── components/
│   └── kpi-on-time/
│       ├── index.ts
│       ├── KpiOnTimeFilter.tsx
│       ├── KpiOnTimeSummary.tsx
│       └── KpiOnTimeDetail.tsx
└── pages/
    └── kpi-on-time/
        └── index.tsx
```

## Usage

### การเข้าถึงหน้า

- URL: `/kpi-on-time`
- จาก Sidebar: คลิกที่ "KPI On Time"

### การใช้งาน

1. เลือกช่วงวันที่ที่ต้องการดูข้อมูล
2. กดปุ่ม "ค้นหา" เพื่อดึงข้อมูล
3. ดูข้อมูลสรุปใน Summary Table
4. ดูข้อมูลรายละเอียดใน Detail Table
5. สามารถ Export ข้อมูลได้ (ในอนาคต)

## Data Flow

```
User Action → Filter → API Call → Process Data → Display Tables
                                        ↓
                          Summary Calculation ← Detail Data
```

## Notes

- ปัจจุบันใช้ Mock Data สำหรับทดสอบ
- ต้อง implement API endpoint สำหรับดึงข้อมูลจริง
- Summary Table คำนวณอัตโนมัติจาก Detail Data
- ข้อมูล ListConditionKPI อยู่ใน `src/constant/constants.ts`

## TODO

- [ ] Implement API endpoint สำหรับดึงข้อมูล KPI On Time
- [ ] เพิ่มฟีเจอร์ Export to Excel
- [ ] เพิ่มฟีเจอร์กรองข้อมูลเพิ่มเติม (Route, Plant, etc.)
- [ ] เพิ่ม Chart visualization
- [ ] เพิ่ม Real-time data refresh
