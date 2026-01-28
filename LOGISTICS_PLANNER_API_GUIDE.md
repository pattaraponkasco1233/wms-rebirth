# Logistics Planner API Guide

## Overview

API Service สำหรับจัดการข้อมูล Logistics Planner Shipments พร้อม Filter และ CRUD operations

## Files Structure

```
src/
├── services/
│   └── api/
│       ├── logisticsPlanner.service.ts  # API Service และ Mock Data
│       └── index.ts                      # Export ทั้งหมด
├── components/
│   └── logistics-planner/
│       └── TimeSummaryTab.tsx            # Component สำหรับแสดงสรุปและ Filter
└── pages/
    └── logistics-planner/
        └── index.tsx                     # Main page ที่เชื่อมต่อ API
```

## API Endpoints (Mock)

### 1. Get Shipments with Filters

```typescript
mockLogisticsPlannerApi.getShipments(params?: LogisticsFilterParams)
```

**Filter Parameters:**

```typescript
interface LogisticsFilterParams {
  plant?: string; // Filter โดย Plant (SNK, GLX, SSI, SSF)
  truckLicense?: string; // Filter โดยทะเบียนรถ
  shipmentNo?: string; // Filter โดย Shipment Number
  route?: string; // Filter โดยเส้นทาง
  loadDate?: string; // Format: DDMMYYYY (เช่น "28012026")
  firstTime?: string; // Format: HHMMSS (เช่น "080000")
  carrier?: string; // Filter โดย Carrier
  vehicleType?: string; // Filter โดยประเภทรถ
}
```

**Response:**

```typescript
interface LogisticsShipmentsResponse {
  data: LogisticsShipment[];
  total: number;
  page?: number;
  pageSize?: number;
}
```

**Example Usage:**

```typescript
import { mockLogisticsPlannerApi } from "../../services/api";

// ดึงข้อมูลทั้งหมด
const response = await mockLogisticsPlannerApi.getShipments();

// ดึงข้อมูลด้วย Filter
const filteredResponse = await mockLogisticsPlannerApi.getShipments({
  plant: "SNK",
  loadDate: "28012026",
  firstTime: "080000",
});
```

### 2. Get Shipment by ID

```typescript
mockLogisticsPlannerApi.getShipmentById(id: string)
```

**Example:**

```typescript
const shipment = await mockLogisticsPlannerApi.getShipmentById("1");
```

### 3. Create Shipment

```typescript
mockLogisticsPlannerApi.createShipment(data: Omit<LogisticsShipment, 'id'>)
```

**Example:**

```typescript
const newShipment = await mockLogisticsPlannerApi.createShipment({
  plant: "SNK",
  shipmentNo: "SHP-2026-011",
  route: "BKK-CNX",
  loadDate: "28012026",
  jobNumber: "JOB-011",
  pickSequence: 11,
  truckLicense: "กข-9999",
  vehicleType: "รถ 6 ล้อ",
  firstTime: "080000",
  carrier: "KERRY_EXPRESS",
  generator: "auto",
  field1: "A",
  field2: "B",
  field3: "C",
  field4: "D",
});
```

### 4. Update Shipment

```typescript
mockLogisticsPlannerApi.updateShipment(id: string, data: Partial<LogisticsShipment>)
```

**Example:**

```typescript
const updated = await mockLogisticsPlannerApi.updateShipment("1", {
  firstTime: "090000",
  route: "BKK-HDY",
});
```

### 5. Delete Shipment

```typescript
mockLogisticsPlannerApi.deleteShipment(id: string)
```

**Example:**

```typescript
await mockLogisticsPlannerApi.deleteShipment("1");
```

## Mock Data

Mock data มี 10 shipments พร้อมความหลากหลาย:

- **Plants:** SNK, GLX, SSI, SSF
- **Carriers:** KERRY_EXPRESS, FLASH_EXPRESS, JT_EXPRESS, THAILAND_POST
- **Vehicle Types:** รถ 4 ล้อ, รถ 6 ล้อ
- **Time Slots:** 08:00 - 14:00
- **Load Dates:** 28012026, 29012026

## Integration in Components

### TimeSummaryTab Component

Component นี้รับ callback `onSearch` เพื่อส่ง filter parameters ไปยัง parent component

```typescript
interface TimeSummaryTabProps {
  shipments: LogisticsShipment[];
  onFilterChange: (filteredShipments: LogisticsShipment[]) => void;
  onSearch: (filters: {
    plant?: string;
    license?: string;
    shipmentNo?: string;
    route?: string;
    date?: string;
    time?: string;
  }) => void;
}
```

### Main Page Integration

ใน `src/pages/logistics-planner/index.tsx`:

```typescript
// Import API Service
import {
  mockLogisticsPlannerApi,
  LogisticsFilterParams,
} from "../../services/api/logisticsPlanner.service";

// State
const [shipments, setShipments] = useState<LogisticsShipment[]>([]);
const [loading, setLoading] = useState<boolean>(false);

// Fetch Function
const fetchShipments = useCallback(
  async (filters?: LogisticsFilterParams) => {
    try {
      setLoading(true);
      const response = await mockLogisticsPlannerApi.getShipments(filters);
      setShipments(response.data);
      message.success(`ดึงข้อมูลสำเร็จ ${response.total} รายการ`);
    } catch (error) {
      console.error("Error fetching shipments:", error);
      message.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
    } finally {
      setLoading(false);
    }
  },
  []
);

// Search Handler
const handleSearch = useCallback(
  (filters: {
    plant?: string;
    license?: string;
    shipmentNo?: string;
    route?: string;
    date?: string;
    time?: string;
  }) => {
    const apiFilters: LogisticsFilterParams = {
      plant: filters.plant,
      truckLicense: filters.license,
      shipmentNo: filters.shipmentNo,
      route: filters.route,
      loadDate: filters.date,
      firstTime: filters.time,
    };
    fetchShipments(apiFilters);
  },
  [fetchShipments]
);

// Usage in JSX
<TimeSummaryTab
  shipments={shipments}
  onFilterChange={setFilteredShipments}
  onSearch={handleSearch}
/>
```

## Switching to Real API

เมื่อ Backend API พร้อมใช้งาน ให้เปลี่ยนจาก `mockLogisticsPlannerApi` เป็น `logisticsPlannerApi`:

```typescript
// Before (Mock API)
import { mockLogisticsPlannerApi } from "../../services/api/logisticsPlanner.service";
const response = await mockLogisticsPlannerApi.getShipments(filters);

// After (Real API)
import { logisticsPlannerApi } from "../../services/api/logisticsPlanner.service";
const response = await logisticsPlannerApi.getShipments(filters);
```

## API Endpoint URLs (Real API)

เมื่อเชื่อมต่อ Backend จริง API จะเรียกไปที่:

- GET `/logistics-planner/shipments` - Get all shipments with filters
- GET `/logistics-planner/shipments/:id` - Get shipment by ID
- POST `/logistics-planner/shipments` - Create new shipment
- PUT `/logistics-planner/shipments/:id` - Update shipment
- DELETE `/logistics-planner/shipments/:id` - Delete shipment

## Features

✅ **Filter Support:**

- Plant (SNK, GLX, SSI, SSF)
- Truck License
- Shipment Number
- Route
- Load Date
- First Time
- Carrier
- Vehicle Type

✅ **CRUD Operations:**

- Create new shipment
- Read/List shipments with filters
- Update existing shipment
- Delete shipment

✅ **UI Features:**

- Loading state with Spinner
- Success/Error messages
- Filter reset functionality
- Auto-calculation of time slot summaries

✅ **Mock Data:**

- 10 pre-configured shipments
- Realistic data for testing
- Simulated API delay (500ms)

## Testing

1. **Load Data:** เปิดหน้า Logistics Planner จะโหลดข้อมูลทั้งหมด 10 รายการ
2. **Filter by Plant:** เลือก Plant ใน dropdown และกด Search
3. **Filter by Date:** เลือกวันที่และกด Search
4. **Multiple Filters:** ใช้หลาย filters พร้อมกันได้
5. **Reset:** กดปุ่ม Clear Filter เพื่อรีเซ็ตและโหลดข้อมูลทั้งหมดอีกครั้ง

## Notes

- Mock API มี delay 500ms เพื่อจำลองการเรียก API จริง
- ข้อมูล Mock จะ reset เมื่อ refresh หน้า
- Filter ทำงานแบบ case-insensitive
- สามารถใช้ partial match สำหรับ string filters
