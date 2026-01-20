# Warehouse Status Monitor

## ภาพรวม

หน้า Warehouse Status Monitor เป็นหน้าสำหรับตรวจสอบและติดตามสถานะของคลังสินค้าแบบเรียลไทม์

## โครงสร้างหน้า

### 1. Filter Section

- **Route** (Dropdown): เลือก Route จาก ROUTE_OPTIONS
- **Shipment** (Input): ค้นหาด้วยหมายเลข Shipment
- **Date Range** (Date Picker): เลือกช่วงวันที่ (Default: 1 เดือนปัจจุบัน)
- **ปุ่มค้นหา**: ทำการค้นหาข้อมูลตาม Filter ที่เลือก

### 2. Summary Table (ตารางสรุป)

แสดงข้อมูลสรุปแบบ Matrix โดย:

- **Column แรก**: Status (มาจาก STATUS_OPTIONS)
- **Columns ต่อไป**: แต่ละ Plant (SNK, GLX, SSI, SSF) แบ่งเป็น 4 Sub-columns:
  - SM (Shipment Count)
  - DN (Delivery Note Count)
  - ITEMS (จำนวน Items)
  - BOX (จำนวน Box)

ข้อมูลใน Summary Table จะ Count มาจากตาราง Detail

### 3. Detail Table (ตารางรายละเอียด)

แสดงข้อมูลรายละเอียดแต่ละ Shipment ประกอบด้วย:

| Column        | Type     | Description                           |
| ------------- | -------- | ------------------------------------- |
| Plant         | Select   | โรงงาน (SNK, GLX, SSI, SSF)           |
| SAP Shipment  | String   | หมายเลข SAP Shipment                  |
| Shipment No   | String   | หมายเลข Shipment                      |
| WH Status     | Select   | สถานะคลัง (มาจาก STATUS_OPTIONS)      |
| Route         | String   | เส้นทาง                               |
| Delivery No   | String   | หมายเลข Delivery                      |
| Ready to Ship | DateTime | วันเวลาที่พร้อมส่ง (DD/MM/YYYY HH:mm) |
| Load Date     | Date     | วันที่โหลด (DD/MM/YYYY)               |
| Cut Load      | Time     | เวลา Cut Load (HH:mm)                 |
| Truck Ready   | Time     | เวลา Truck พร้อม (HH:mm)              |

## Components

### Components ที่สร้าง

```
src/components/warehouse-status/
├── WarehouseStatusFilter.tsx    # Filter Component
├── WarehouseStatusSummary.tsx   # Summary Table Component
├── WarehouseStatusDetail.tsx    # Detail Table Component
└── index.ts                     # Export file
```

### Models

```
src/models/warehouse-status/
├── warehouse-status.model.ts    # Data Models
└── index.ts                     # Export file
```

### Pages

```
src/pages/warehouse-status/
└── index.tsx                    # Main Page Component with Mock Data
```

## Mock Data

ปัจจุบันหน้านี้ใช้ Mock Data ที่ถูก Generate แบบ Random โดย:

- Summary Data: Generate ข้อมูลสรุปสำหรับทุก Status และ Plant
- Detail Data: Generate 50 รายการตัวอย่าง

## การใช้งาน

### เข้าถึงหน้า

- URL: `/warehouse-status`
- จาก Sidebar: คลิกที่ "Warehouse Status Monitor"

### การค้นหา

1. เลือก Filter ที่ต้องการ (Route, Shipment, Date Range)
2. คลิกปุ่ม "ค้นหา"
3. ระบบจะแสดงผลลัพธ์ใน Summary และ Detail Table

## การเชื่อมต่อ API (ต่อไปในอนาคต)

เมื่อต้องการเชื่อมต่อกับ API จริง:

1. แทนที่ฟังก์ชัน `generateMockData()` ด้วยการเรียก API Service
2. ส่ง Filter Parameters ไปยัง API
3. รับข้อมูล Response และ Map เข้า Model ที่กำหนดไว้

### API Endpoint (ตัวอย่าง)

```typescript
// GET /api/warehouse-status
// Query Parameters:
// - route?: string
// - shipment?: string
// - dateFrom: string (YYYY-MM-DD)
// - dateTo: string (YYYY-MM-DD)

// Response: WarehouseStatusResponse
{
  summary: WarehouseStatusSummary[],
  details: WarehouseStatusDetail[]
}
```

## Constants ที่ใช้

### PLANT_OPTIONS

- SNK
- GLX
- SSI
- SSF

### STATUS_OPTIONS

- 001: Loading Scheduler
- 002: Booked
- 003: Start Pick
- 004: End Pick
- 005: RTS
- 006: Assign Bay
- 007: Start Load
- 008: End Load
- 009: Check Out

### ROUTE_OPTIONS (ใหม่)

- BKK_NORTH: BKK North
- BKK_SOUTH: BKK South
- BKK_EAST: BKK East
- BKK_WEST: BKK West
- CENTRAL: Central
- NORTHEAST: Northeast
- NORTH: North
- SOUTH: South

## การพัฒนาต่อ

### ฟีเจอร์ที่แนะนำ

1. Export ข้อมูลเป็น Excel
2. Refresh อัตโนมัติทุก X นาที
3. Filter เพิ่มเติม (Plant, Status)
4. Sorting และ Filtering ใน Table
5. Detail View สำหรับแต่ละ Shipment
6. Real-time Update ด้วย WebSocket
