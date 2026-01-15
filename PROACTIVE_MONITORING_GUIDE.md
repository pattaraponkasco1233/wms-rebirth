# Pro-active Monitoring - Quick Start Guide

## 📋 สรุปสิ่งที่สร้างขึ้น

ได้สร้าง Tab Pro-active Monitoring ที่ประกอบด้วย:

### 1. Filter Section (บรรทัดแรก)

✅ วันที่ (Default: วันที่ปัจจุบัน)
✅ Plant
✅ Carrier
✅ Route
✅ Vehicle Type
✅ Shipment No
✅ Job Number
✅ Operation Date
✅ ปุ่มค้นหา

### 2. Summary Table (บรรทัดที่สอง)

✅ Plant Load Time (จาก LIST_TIEM_SLOTS)
✅ Check In Yes
✅ Check In No
✅ คอลัมน์ Status ทั้งหมดจาก STATUS_OPTIONS (001-009)
✅ Total
✅ Grand Total ท้ายตาราง

### 3. Detail Table (บรรทัดที่สาม)

✅ Shipment No
✅ Shipment Type
✅ Plant
✅ Pick Seq
✅ Job Number
✅ Plant Load Date
✅ Operation Date
✅ Carrier
✅ Shipment Status
✅ Check In
✅ Time Remaining
✅ Vehicle Type
✅ Vehicle License
✅ คอลัมน์วันที่สำหรับแต่ละ Status (Loading Scheduler, Booked, Start Pick, ฯลฯ)

## 📁 ไฟล์ที่สร้างขึ้น

```
src/
├── models/
│   └── proactive-monitor/
│       └── index.ts                        ✅ Data models
│
├── services/
│   └── api/
│       └── proactiveMonitor.service.ts     ✅ API service (mock data)
│
├── components/
│   └── proactive-monitor/
│       ├── ProactiveMonitorFilter.tsx      ✅ Filter component
│       ├── ProactiveMonitorSummary.tsx     ✅ Summary table
│       ├── ProactiveMonitorDetail.tsx      ✅ Detail table
│       ├── index.ts                        ✅ Exports
│       └── README.md                       ✅ Documentation
│
└── pages/
    └── proactive-monitor/
        ├── ProactiveMonitoring.tsx         ✅ Standalone page
        ├── ProactiveMonitoringTab.tsx      ✅ Updated tab
        └── index.ts                        ✅ Updated exports
```

## 🚀 วิธีใช้งาน

### ใน ProactiveMonitorCockpit (Tab)

ระบบจะแสดงอัตโนมัติเมื่อเลือก Tab "Pro-active Monitoring"

```typescript
// ไฟล์ ProactiveMonitoringTab.tsx ถูกอัพเดทแล้ว
// ไม่ต้องทำอะไรเพิ่มเติม
```

### ใช้เป็นหน้าเดี่ยว (Standalone)

```typescript
import { ProactiveMonitoring } from "@/pages/proactive-monitor";

<Route path="/proactive-monitoring" element={<ProactiveMonitoring />} />;
```

## 🎯 Features

### Auto-load Data

- โหลดข้อมูลอัตโนมัติเมื่อเข้าหน้า
- Default วันที่เป็นวันปัจจุบัน

### Responsive Design

- รองรับทุกขนาดหน้าจอ
- Horizontal scroll สำหรับตารางกว้าง
- Fixed columns สำหรับการดูข้อมูลที่สะดวก

### User-friendly

- Loading state
- Success/Error messages
- Clear data presentation
- Tag colors สำหรับ status

## 📊 Mock Data

ตอนนี้ระบบใช้ mock data ที่อยู่ใน:

```typescript
src / services / api / proactiveMonitor.service.ts;
```

### ข้อมูล Mock ประกอบด้วย:

- **Summary:** 5 time slots (08:00-13:00)
- **Details:** 5 shipments ตัวอย่าง
- **Grand Total:** สรุปยอดรวมทั้งหมด

## 🔧 การเชื่อมต่อ API จริง

เมื่อพร้อมเชื่อมต่อ API จริง ให้แก้ไขไฟล์:

```typescript
// src/services/api/proactiveMonitor.service.ts

export const fetchProactiveMonitorData = async (
  filter: Partial<ProactiveMonitorFilter>
): Promise<ProactiveMonitorResponse> => {
  // ลบ mock code เดิม
  // await new Promise(resolve => setTimeout(resolve, 500));
  // return mockProactiveMonitorData;

  // เพิ่ม API call จริง
  const response = await axiosInstance.get("/api/proactive-monitor", {
    params: filter,
  });
  return response.data;
};
```

## 📝 Data Structure ที่ API ควร Return

```typescript
{
    "summary": [
        {
            "plantLoadTime": "08:00 - 09:00",
            "checkInYes": 5,
            "checkInNo": 2,
            "status001": 1,
            "status002": 2,
            // ... status003-009
            "total": 7
        }
    ],
    "details": [
        {
            "shipmentNo": "SHP001",
            "shipmentType": "Regular",
            "plant": "SNK",
            "pickSeq": "001",
            "jobNumber": "JOB001",
            "plantLoadDate": "2026-01-15",
            "operationDate": "2026-01-15",
            "carrier": "KERRY_EXPRESS",
            "shipmentStatus": "002",
            "checkIn": true,
            "timeRemaining": "01:30:00",
            "vehicleType": "4_WHEEL",
            "vehicleLicense": "กก-1234",
            "loadingScheduler": "2026-01-15 08:00:00",
            "booked": "2026-01-15 08:15:00",
            // ... status อื่นๆ (optional)
        }
    ],
    "grandTotal": {
        "checkInYes": 26,
        "checkInNo": 9,
        "status001": 5,
        // ... status002-009
        "total": 35
    }
}
```

## 🎨 Customization

### เปลี่ยนสีของ Status Tags

แก้ไขใน `ProactiveMonitorDetail.tsx`:

```typescript
render: (value: string) => {
  const status = STATUS_OPTIONS.find((s) => s.value === value);
  return status ? <Tag color="blue">{status.label}</Tag> : value;
  //                      ^^^^^^ เปลี่ยนสีตรงนี้
};
```

### เพิ่ม/ลด Columns

แก้ไข `columns` array ในแต่ละ component

### ปรับ Pagination

แก้ไขใน `ProactiveMonitorDetail.tsx`:

```typescript
pagination={{
    defaultPageSize: 10,  // เปลี่ยนจำนวนต่อหน้า
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
}}
```

## ✅ Checklist การตรวจสอบ

- [x] Filter ครบทุกฟิลด์
- [x] วันที่ default เป็นวันปัจจุบัน
- [x] Summary table แสดง time slots จาก LIST_TIEM_SLOTS
- [x] Summary table แสดงทุก status จาก STATUS_OPTIONS
- [x] Grand Total แสดงถูกต้อง
- [x] Detail table ครบทุก column ตามที่ต้องการ
- [x] วันที่แต่ละ status แสดงถูกต้อง
- [x] Responsive design
- [x] Loading state
- [x] Error handling
- [x] Mock data พร้อมใช้งาน

## 🐛 Troubleshooting

### ถ้า Component ไม่แสดง

1. ตรวจสอบ import path ว่าถูกต้อง
2. ตรวจสอบว่า models และ constants ถูก export

### ถ้าข้อมูลไม่โหลด

1. เปิด Console ดู error
2. ตรวจสอบ mock service ว่าทำงานถูกต้อง
3. ตรวจสอบ filter ที่ส่งไป

### ถ้าตารางแสดงผิดพลาด

1. ตรวจสอบ data structure ที่ return จาก API
2. ตรวจสอบว่า rowKey unique
3. ตรวจสอบ column dataIndex

## 📚 เอกสารเพิ่มเติม

- [Full Documentation](./src/components/proactive-monitor/README.md)
- [Ant Design Table](https://ant.design/components/table)
- [dayjs Documentation](https://day.js.org/)

## 🎉 สำเร็จแล้ว!

Tab Pro-active Monitoring พร้อมใช้งานแล้ว ลองเข้าไปดูได้เลย! 🚀
