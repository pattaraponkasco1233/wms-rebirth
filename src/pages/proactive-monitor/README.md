# Pro-active Monitor Cockpit

## 📋 Overview

หน้า Pro-active Monitor Cockpit เป็นระบบแดชบอร์ดสำหรับติดตามและแสดงข้อมูลสรุปการจัดการโลจิสติกส์แบบเรียลไทม์

## 🗂️ โครงสร้างไฟล์

```
src/pages/proactive-monitor/
├── ProactiveMonitorCockpit.tsx    # หน้าหลัก
├── OverallMonitoringTab.tsx       # TAB 1: Overall Monitoring
├── ProactiveMonitoringTab.tsx     # TAB 2: Pro-active Monitoring (Mock)
├── index.ts                       # Export components
└── README.md                      # เอกสารนี้
```

## 🎯 Features

### TAB 1: Overall Monitoring

- แสดงตารางสรุปการโหลดสินค้า (Plant Load Summary)
- จัดกลุ่มข้อมูลตามช่วงเวลา (LIST_TIEM_SLOTS)
- แสดงจำนวนการส่งของแต่ละ Carrier (CARRIER_OPTIONS)
  - Kerry Express
  - Flash Express
  - J&T Express
  - Thailand Post
- คำนวณยอดรวม (Total) ของแต่ละช่วงเวลา
- แสดง Grand Total ของทุกช่วงเวลา

**Columns:**

1. **Plant Load Time**: ช่วงเวลาโหลดสินค้า (08:00-05:00)
2. **Plant** (Parent Column):
   - Kerry Express
   - Flash Express
   - J&T Express
   - Thailand Post
   - Total
3. **Total**: ยอดรวมทั้งหมด

### TAB 2: Pro-active Monitoring

- หน้า Mock (Coming Soon)
- เตรียมไว้สำหรับพัฒนาในอนาคต
- จะเป็นระบบแจ้งเตือนเชิงรุกสำหรับการจัดการโลจิสติกส์

## 📊 Data Structure

### PlantLoadData Interface

```typescript
interface PlantLoadData {
  timeSlot: string; // ช่วงเวลา
  KERRY_EXPRESS?: number; // จำนวน Kerry Express
  FLASH_EXPRESS?: number; // จำนวน Flash Express
  JT_EXPRESS?: number; // จำนวน J&T Express
  THAILAND_POST?: number; // จำนวน Thailand Post
  total: number; // ยอดรวม
}
```

## 🎨 UI Components ที่ใช้

- **Tabs**: สำหรับสลับระหว่าง TAB
- **Card**: แสดงข้อมูลหลัก
- **Table**: แสดงตารางข้อมูล
- **Empty**: แสดงเมื่อไม่มีข้อมูล (TAB 2)

## 🔧 การใช้งาน

### Import Component

```typescript
import { ProactiveMonitorCockpit } from "@/pages/proactive-monitor";
```

### ใช้ใน Router

```typescript
<Route path="/proactive-monitor" element={<ProactiveMonitorCockpit />} />
```

## 📝 ข้อมูลที่ใช้

### Constants

- `LIST_TIEM_SLOTS`: ช่วงเวลาโหลดสินค้า (21 ช่วง)
- `CARRIER_OPTIONS`: รายการผู้ให้บริการขนส่ง (4 ราย)
- `TABLE.pageSizeDefault`: จำนวนแถวต่อหน้า (10)

### ข้อมูล Mock

- ปัจจุบันใช้ข้อมูล Mock สุ่มจำนวน 0-10 สำหรับแต่ละ Carrier
- สามารถแทนที่ด้วยข้อมูลจริงจาก API ได้ในอนาคต

## 🚀 การพัฒนาต่อ

### TAB 1: Overall Monitoring

- [ ] เชื่อมต่อกับ API จริง
- [ ] เพิ่มฟีเจอร์กรองข้อมูลตามวันที่
- [ ] เพิ่ม Export ข้อมูลเป็น Excel/PDF
- [ ] เพิ่มกราฟแสดงภาพรวม

### TAB 2: Pro-active Monitoring

- [ ] ออกแบบ UI/UX สำหรับการแจ้งเตือน
- [ ] พัฒนาระบบแจ้งเตือนแบบเรียลไทม์
- [ ] เพิ่มการตั้งค่า Alert Rules
- [ ] เพิ่มประวัติการแจ้งเตือน

## 🎨 Styling

### สีที่ใช้

- **Primary**: `#1890ff` (สีน้ำเงิน)
- **Success**: `var(--color-success)`
- **Disabled**: `var(--color-text-disabled)`
- **Background**: `#f0f5ff`

### Font Weights

- Normal: 400
- Medium: 500
- Semibold: 600
- Bold: 700

## 📦 Dependencies

- React
- Ant Design (antd)
- TypeScript

## 👥 Author

Created for WMS Rebirth Project

## 📅 Version

- Initial Version: 1.0.0
- Last Updated: January 2026
