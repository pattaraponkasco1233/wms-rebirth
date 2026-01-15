# Proactive Monitoring Module

## Overview

โมดูล Proactive Monitoring ใช้สำหรับติดตามและแสดงข้อมูลการจัดส่งแบบเรียลไทม์ ประกอบด้วย 3 ส่วนหลัก:

1. **Filter Section** - ส่วนกรองข้อมูล
2. **Summary Table** - ตารางสรุปข้อมูลตามช่วงเวลา
3. **Detail Table** - ตารางรายละเอียดแต่ละ Shipment

## File Structure

```
src/
├── models/
│   └── proactive-monitor/
│       └── index.ts                 # Data models และ interfaces
├── services/
│   └── api/
│       └── proactiveMonitor.service.ts  # API service (ตอนนี้ใช้ mock data)
├── components/
│   └── proactive-monitor/
│       ├── ProactiveMonitorFilter.tsx   # Filter component
│       ├── ProactiveMonitorSummary.tsx  # Summary table component
│       ├── ProactiveMonitorDetail.tsx   # Detail table component
│       └── index.ts                     # Export components
└── pages/
    └── proactive-monitor/
        ├── ProactiveMonitoring.tsx      # Main page
        └── index.ts                     # Export page
```

## Components

### 1. ProactiveMonitorFilter

**ไฟล์:** `src/components/proactive-monitor/ProactiveMonitorFilter.tsx`

**คำอธิบาย:** ส่วนกรองข้อมูลด้านบนของหน้า

**Props:**

- `filter: ProactiveMonitorFilter` - ค่า filter ปัจจุบัน
- `onFilterChange: (filter: ProactiveMonitorFilter) => void` - Callback เมื่อมีการเปลี่ยนแปลง filter
- `onSearch: () => void` - Callback เมื่อกดปุ่มค้นหา

**Fields:**

1. วันที่ (Date) - Default: วันที่ปัจจุบัน
2. Plant - ตัวเลือกจาก `PLANT_OPTIONS`
3. Carrier - ตัวเลือกจาก `CARRIER_OPTIONS`
4. Route - ระบุเส้นทาง
5. Vehicle Type - ตัวเลือกจาก `VEHICLE_TYPE_OPTIONS`
6. Shipment No - ระบุหมายเลข Shipment
7. Job Number - ระบุหมายเลข Job
8. Operation Date - วันที่ดำเนินการ

### 2. ProactiveMonitorSummary

**ไฟล์:** `src/components/proactive-monitor/ProactiveMonitorSummary.tsx`

**คำอธิบาย:** ตารางสรุปข้อมูลตามช่วงเวลา Plant Load Time

**Props:**

- `data: ProactiveMonitorSummary[]` - ข้อมูลสรุป
- `grandTotal: GrandTotalType` - ยอดรวมทั้งหมด

**Columns:**

1. Plant Load Time - ช่วงเวลาจาก `LIST_TIEM_SLOTS`
2. Check In Yes - จำนวนรถที่เช็คอินแล้ว
3. Check In No - จำนวนรถที่ยังไม่เช็คอิน
4. Status Columns - คอลัมน์ตาม `STATUS_OPTIONS`:
   - Loading Scheduler (001)
   - Booked (002)
   - Start Pick (003)
   - End Pick (004)
   - RTS (005)
   - Assign Bay (006)
   - Start Load (007)
   - End Load (008)
   - Check Out (009)
5. Total - ยอดรวม

**Features:**

- แสดง Grand Total ท้ายตาราง
- Horizontal scroll สำหรับหน้าจอเล็ก
- Fixed left column (Plant Load Time)
- Fixed right column (Total)

### 3. ProactiveMonitorDetail

**ไฟล์:** `src/components/proactive-monitor/ProactiveMonitorDetail.tsx`

**คำอธิบาย:** ตารางรายละเอียดแต่ละ Shipment

**Props:**

- `data: ProactiveMonitorDetail[]` - ข้อมูลรายละเอียด
- `loading?: boolean` - สถานะ loading

**Columns:**

1. Shipment No - หมายเลข Shipment
2. Shipment Type - ประเภท Shipment
3. Plant - โรงงาน
4. Pick Seq - ลำดับการ Pick
5. Job Number - หมายเลข Job
6. Plant Load Date - วันที่โหลดที่โรงงาน
7. Operation Date - วันที่ดำเนินการ
8. Carrier - ผู้ขนส่ง
9. Shipment Status - สถานะ Shipment (แสดงเป็น Tag)
10. Check In - สถานะเช็คอิน (Yes/No Tag)
11. Time Remaining - เวลาที่เหลือ
12. Vehicle Type - ประเภทรถ
13. Vehicle License - ทะเบียนรถ
    14-22. Status Timeline - วันที่อัพเดทแต่ละ Status: - Loading Scheduler - Booked - Start Pick - End Pick - RTS - Assign Bay - Start Load - End Load - Check Out

**Features:**

- Pagination (10, 20, 50, 100 รายการต่อหน้า)
- Show total records
- Horizontal scroll
- Fixed left column (Shipment No)
- Date formatting (DD/MM/YYYY HH:mm)

## Main Page

### ProactiveMonitoring

**ไฟล์:** `src/pages/proactive-monitor/ProactiveMonitoring.tsx`

**คำอธิบาย:** หน้าหลักของ Proactive Monitoring

**Features:**

- Auto-load data เมื่อเข้าหน้า
- Default date เป็นวันที่ปัจจุบัน
- แสดง loading state ขณะดึงข้อมูล
- แสดง success/error message

**State Management:**

```typescript
const [loading, setLoading] = useState(false);
const [filter, setFilter] = useState<FilterType>({...});
const [data, setData] = useState<ProactiveMonitorResponse>({...});
```

## Data Models

### ProactiveMonitorFilter

```typescript
interface ProactiveMonitorFilter {
  date: string;
  plant: string;
  carrier: string;
  route: string;
  vehicleType: string;
  shipmentNo: string;
  jobNumber: string;
  operationDate: string;
}
```

### ProactiveMonitorSummary

```typescript
interface ProactiveMonitorSummary {
  plantLoadTime: string;
  checkInYes: number;
  checkInNo: number;
  status001: number; // Loading Scheduler
  status002: number; // Booked
  status003: number; // Start Pick
  status004: number; // End Pick
  status005: number; // RTS
  status006: number; // Assign Bay
  status007: number; // Start Load
  status008: number; // End Load
  status009: number; // Check Out
  total: number;
}
```

### ProactiveMonitorDetail

```typescript
interface ProactiveMonitorDetail {
  shipmentNo: string;
  shipmentType: string;
  plant: string;
  pickSeq: string;
  jobNumber: string;
  plantLoadDate: string;
  operationDate: string;
  carrier: string;
  shipmentStatus: string;
  checkIn: boolean;
  timeRemaining: string;
  vehicleType: string;
  vehicleLicense: string;
  loadingScheduler?: string;
  booked?: string;
  startPick?: string;
  endPick?: string;
  rts?: string;
  assignBay?: string;
  startLoad?: string;
  endLoad?: string;
  checkOut?: string;
}
```

## API Service

**ไฟล์:** `src/services/api/proactiveMonitor.service.ts`

### fetchProactiveMonitorData()

```typescript
fetchProactiveMonitorData(filter: Partial<ProactiveMonitorFilter>): Promise<ProactiveMonitorResponse>
```

**คำอธิบาย:** ดึงข้อมูล Proactive Monitoring

**ปัจจุบัน:** ใช้ mock data (TODO: แทนที่ด้วย API จริง)

**การใช้งานจริง:**

```typescript
// เมื่อมี API แล้ว ให้แก้ไขใน service file
const response = await axiosInstance.get("/api/proactive-monitor", {
  params: filter,
});
return response.data;
```

## Constants Used

จาก `src/constant/constants.ts`:

1. **PLANT_OPTIONS** - ตัวเลือกโรงงาน (SNK, GLX, SSI, SSF)
2. **CARRIER_OPTIONS** - ตัวเลือกผู้ขนส่ง
3. **VEHICLE_TYPE_OPTIONS** - ตัวเลือกประเภทรถ
4. **STATUS_OPTIONS** - สถานะต่างๆ (001-009)
5. **LIST_TIEM_SLOTS** - ช่วงเวลา (08:00-05:00)

## Usage Example

```typescript
import { ProactiveMonitoring } from "@/pages/proactive-monitor";

// ใช้ในระบบ routing
<Route path="/proactive-monitoring" element={<ProactiveMonitoring />} />;
```

## Future Enhancements

1. **Real API Integration**

   - แทนที่ mock data ด้วย API จริง
   - เพิ่ม error handling ที่ดีขึ้น
   - เพิ่ม retry mechanism

2. **Export Features**

   - Export to Excel
   - Export to PDF
   - Print functionality

3. **Real-time Updates**

   - Auto-refresh ทุกๆ n นาที
   - WebSocket สำหรับ real-time data

4. **Advanced Filters**

   - Multi-select filters
   - Date range filter
   - Save filter presets

5. **Visualization**
   - เพิ่ม Charts/Graphs
   - Timeline view
   - Heatmap view

## Dependencies

- React 19.2.0
- Ant Design 6.0.1
- dayjs 1.11.19
- TypeScript 4.9.5

## Notes

- ตาราง Summary และ Detail ใช้ horizontal scroll เพื่อรองรับหน้าจอขนาดเล็ก
- วันที่ทั้งหมดแสดงในรูปแบบ DD/MM/YYYY (ยกเว้นใน Detail table ที่แสดงรวมเวลา HH:mm)
- Status แสดงเป็น Tag พร้อม color coding
- ข้อมูล mock ตัวอย่างมี 5 shipments ครอบคลุมทุก status
