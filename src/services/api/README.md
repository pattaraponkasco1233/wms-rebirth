# API Integration Guide - Dashboard Car

## 📚 ภาพรวม

เอกสารนี้อธิบายวิธีการยิง API สำหรับหน้า Dashboard Car ซึ่งใช้เป็นตัวอย่างในการพัฒนาหน้าอื่นๆ

## 🏗️ โครงสร้าง

```
src/
├── services/
│   └── api/
│       ├── axiosInstance.ts          # Axios Configuration
│       ├── dashboardCarService.ts    # Dashboard Car API Service
│       └── index.ts                  # Export ทั้งหมด
└── pages/
    └── dashboard/
        └── car.tsx                   # Dashboard Car Page
```

## 🔧 1. Axios Instance Configuration

### ไฟล์: `src/services/api/axiosInstance.ts`

```typescript
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor - แนบ Token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - จัดการ Error
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
```

## 🎯 2. Service Layer - Dashboard Car API

### ไฟล์: `src/services/api/dashboardCarService.ts`

#### Interface Definitions

```typescript
// Filter Parameters
export interface DashboardCarFilter {
  startDate?: string;
  endDate?: string;
  vehicleType?: string;
  status?: string;
  destination?: string;
}

// Statistics Response
export interface DashboardCarStatistics {
  totalBookings: number;
  pendingBookings: number;
  inTransitBookings: number;
  completedBookings: number;
  totalVehicles: number;
  availableVehicles: number;
  inUseVehicles: number;
  maintenanceVehicles: number;
}

// Dashboard Response
export interface DashboardCarResponse {
  statistics: DashboardCarStatistics;
  dailyBookings: DailyBookingData[];
  vehicleUsage: VehicleUsageData[];
  popularRoutes: PopularRoute[];
  recentBookings: RecentBooking[];
}
```

#### API Methods

```typescript
export const dashboardCarApi = {
  // GET /dashboard/car/filter
  getDashboardData: async (
    filter?: DashboardCarFilter
  ): Promise<DashboardCarResponse> => {
    const response = await axiosInstance.get("/dashboard/car/filter", {
      params: filter,
    });
    return response.data;
  },

  // GET /dashboard/car/statistics
  getStatistics: async (
    filter?: DashboardCarFilter
  ): Promise<DashboardCarStatistics> => {
    const response = await axiosInstance.get("/dashboard/car/statistics", {
      params: filter,
    });
    return response.data;
  },

  // GET /dashboard/car/export
  exportToExcel: async (filter?: DashboardCarFilter): Promise<Blob> => {
    const response = await axiosInstance.get("/dashboard/car/export", {
      params: filter,
      responseType: "blob",
    });
    return response.data;
  },
};
```

## 🖥️ 3. การใช้งานใน Component

### ไฟล์: `src/pages/dashboard/car.tsx`

#### Import Service

```typescript
import {
  dashboardCarApi,
  DashboardCarFilter,
  DashboardCarResponse,
} from "../../services/api/dashboardCarService";
```

#### State Management

```typescript
const [loading, setLoading] = useState(false);
const [dashboardData, setDashboardData] = useState<DashboardCarResponse | null>(
  null
);
const [filterVehicleType, setFilterVehicleType] = useState<string | undefined>(
  undefined
);
const [filterStatus, setFilterStatus] = useState<string | undefined>(undefined);
```

#### Fetch Dashboard Data

```typescript
const fetchDashboardData = async (customFilter?: DashboardCarFilter) => {
  try {
    setLoading(true);

    // สร้าง Filter Object
    const filter: DashboardCarFilter = customFilter || {
      vehicleType: filterVehicleType,
      status: filterStatus,
      startDate: filterDateRange?.[0]?.format("YYYY-MM-DD"),
      endDate: filterDateRange?.[1]?.format("YYYY-MM-DD"),
    };

    // ยิง API
    const data = await dashboardCarApi.getDashboardData(filter);
    setDashboardData(data);
  } catch (error: any) {
    console.error("Error fetching dashboard data:", error);
    message.error(
      error.response?.data?.message || "เกิดข้อผิดพลาดในการดึงข้อมูล Dashboard"
    );
  } finally {
    setLoading(false);
  }
};
```

#### Load Data on Mount

```typescript
useEffect(() => {
  fetchDashboardData();
}, []);
```

#### Handle Filter Changes

```typescript
const handleApplyFilter = () => {
  fetchDashboardData();
};

const handleResetFilter = () => {
  setFilterVehicleType(undefined);
  setFilterStatus(undefined);
  setFilterDateRange(null);
  fetchDashboardData({});
};
```

#### Export to Excel

```typescript
const handleExport = async () => {
  try {
    message.loading("กำลังสร้างไฟล์...", 0);

    const filter: DashboardCarFilter = {
      vehicleType: filterVehicleType,
      status: filterStatus,
      startDate: filterDateRange?.[0]?.format("YYYY-MM-DD"),
      endDate: filterDateRange?.[1]?.format("YYYY-MM-DD"),
    };

    const blob = await dashboardCarApi.exportToExcel(filter);

    // สร้าง Download Link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dashboard-car-${dayjs().format("YYYY-MM-DD")}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    message.destroy();
    message.success("Export สำเร็จ!");
  } catch (error: any) {
    message.destroy();
    message.error("เกิดข้อผิดพลาดในการ Export ข้อมูล");
  }
};
```

## 🌐 4. API Endpoints

### Base URL

```
http://localhost:3000/api
```

### Available Endpoints

#### 1. Get Dashboard Data with Filter

```http
GET /dashboard/car/filter

Query Parameters:
- startDate: string (YYYY-MM-DD)
- endDate: string (YYYY-MM-DD)
- vehicleType: string
- status: string
- destination: string

Response: DashboardCarResponse
```

#### 2. Get Statistics

```http
GET /dashboard/car/statistics

Query Parameters: (same as above)

Response: DashboardCarStatistics
```

#### 3. Get Daily Bookings

```http
GET /dashboard/car/daily-bookings

Query Parameters: (same as above)

Response: DailyBookingData[]
```

#### 4. Get Vehicle Usage

```http
GET /dashboard/car/vehicle-usage

Query Parameters: (same as above)

Response: VehicleUsageData[]
```

#### 5. Get Popular Routes

```http
GET /dashboard/car/popular-routes

Query Parameters: (same as above)

Response: PopularRoute[]
```

#### 6. Get Recent Bookings

```http
GET /dashboard/car/recent-bookings

Query Parameters: (same as above)

Response: RecentBooking[]
```

#### 7. Export to Excel

```http
GET /dashboard/car/export

Query Parameters: (same as above)

Response: Blob (Excel file)
```

## 📝 5. ตัวอย่าง Request/Response

### Request Example

```typescript
// Filter ด้วย Vehicle Type และ Date Range
const filter: DashboardCarFilter = {
  vehicleType: "รถ 6 ล้อ",
  startDate: "2026-01-01",
  endDate: "2026-01-31",
  status: "completed",
};

const data = await dashboardCarApi.getDashboardData(filter);
```

### Response Example

```json
{
  "statistics": {
    "totalBookings": 125,
    "pendingBookings": 25,
    "inTransitBookings": 45,
    "completedBookings": 55,
    "totalVehicles": 80,
    "availableVehicles": 25,
    "inUseVehicles": 45,
    "maintenanceVehicles": 8
  },
  "dailyBookings": [
    { "date": "2026-01-01", "count": 15 },
    { "date": "2026-01-02", "count": 18 }
  ],
  "vehicleUsage": [
    { "vehicleType": "รถกระบะ", "count": 30, "percentage": 37.5 }
  ],
  "popularRoutes": [
    { "destination": "กรุงเทพฯ", "count": 35, "percentage": 28 }
  ],
  "recentBookings": [
    {
      "id": "1",
      "orderNumber": "ORD-2026-156",
      "vehicleType": "รถ 6 ล้อ",
      "licensePlate": "กข-1234",
      "driverName": "สมชาย ใจดี",
      "destination": "กรุงเทพฯ",
      "bookingDate": "2026-01-06",
      "status": "in-transit",
      "createdAt": "2026-01-06T10:30:00Z"
    }
  ]
}
```

## ⚠️ 6. Error Handling

### จัดการ Error แบบ Global (Interceptor)

```typescript
// 401 Unauthorized - Auto redirect to login
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
```

### จัดการ Error ใน Component

```typescript
try {
  const data = await dashboardCarApi.getDashboardData(filter);
  setDashboardData(data);
} catch (error: any) {
  // Log error
  console.error("Error:", error);

  // แสดง Error Message
  if (error.response?.status === 404) {
    message.error("ไม่พบข้อมูล");
  } else if (error.response?.status === 500) {
    message.error("เกิดข้อผิดพลาดจากเซิร์ฟเวอร์");
  } else {
    message.error(error.response?.data?.message || "เกิดข้อผิดพลาด");
  }
}
```

## 🚀 7. Best Practices

### 1. TypeScript Interfaces

- ✅ กำหนด Interface ทุก Request/Response
- ✅ ใช้ Type-safe ในทุกที่

### 2. Loading States

- ✅ แสดง Loading ขณะยิง API
- ✅ Disable buttons ขณะ Loading

### 3. Error Handling

- ✅ ใช้ try-catch ทุกครั้ง
- ✅ แสดง Error Message ที่เข้าใจง่าย
- ✅ Log error สำหรับ Debug

### 4. Code Organization

- ✅ แยก Service Layer ออกจาก Component
- ✅ ใช้ Axios Instance สำหรับ Global Config
- ✅ ใช้ Interceptor จัดการ Token และ Error

### 5. Performance

- ✅ ใช้ useEffect สำหรับ Initial Load
- ✅ Debounce filter changes
- ✅ Cache data ถ้าจำเป็น

## 📋 8. สรุป Flow การทำงาน

```
1. Component Mount
   ↓
2. useEffect(() => fetchDashboardData())
   ↓
3. dashboardCarApi.getDashboardData(filter)
   ↓
4. axiosInstance.get('/dashboard/car/filter', { params: filter })
   ↓
5. Request Interceptor: แนบ Token
   ↓
6. Backend API
   ↓
7. Response Interceptor: Check Error
   ↓
8. Return Data
   ↓
9. setDashboardData(data)
   ↓
10. UI Update
```

## 🔗 เส้นทางที่เกี่ยวข้อง

- Dashboard Car: `/dashboard/car`
- API Base URL: กำหนดใน `axiosInstance.ts`
- Service: `src/services/api/dashboardCarService.ts`
- Component: `src/pages/dashboard/car.tsx`
