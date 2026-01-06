# Dashboard Car - API Integration Example

## 🎯 ภาพรวม

หน้า Dashboard Car เป็นตัวอย่างการยิง API แบบสมบูรณ์ ประกอบด้วย:

- ✅ การดึงข้อมูล Dashboard พร้อม Filter
- ✅ การจัดการ Loading State
- ✅ การจัดการ Error
- ✅ การ Export ข้อมูลเป็น Excel
- ✅ Real-time Filter และ Refresh

## 📁 ไฟล์ที่สร้างขึ้น

```
src/
├── services/api/
│   ├── axiosInstance.ts              # ✅ Axios Configuration
│   ├── dashboardCarService.ts        # ✅ Dashboard Car API Service
│   ├── index.ts                      # ✅ Export Service
│   └── README.md                     # ✅ Documentation
├── pages/dashboard/
│   └── car.tsx                       # ✅ Dashboard Car Page
├── vite-env.d.ts                     # ✅ TypeScript Environment
├── .env.example                      # ✅ Environment Example
└── .env.local                        # ✅ Local Environment
```

## 🚀 วิธีใช้งาน

### 1. ตั้งค่า Environment Variables

สร้างไฟล์ `.env.local` (ถ้ายังไม่มี):

```env
VITE_API_URL=http://localhost:3000/api
```

### 2. เข้าถึงหน้า Dashboard Car

```
URL: /dashboard/car
เมนู: Dashboard รถขนส่ง
```

### 3. ใช้งาน Filter

```typescript
// Filter ด้วย Period
- วันนี้
- สัปดาห์นี้
- เดือนนี้
- ปีนี้

// Filter ด้วยเงื่อนไข
- ประเภทรถ (รถกระบะ, รถ 6 ล้อ, รถ 10 ล้อ, รถพ่วง)
- สถานะ (รอดำเนินการ, ยืนยันแล้ว, กำลังขนส่ง, เสร็จสิ้น)
- ช่วงวันที่ (Date Range Picker)
```

### 4. Export ข้อมูล

คลิกปุ่ม "Export" เพื่อดาวน์โหลดไฟล์ Excel

## 🔌 API Endpoints

### GET /dashboard/car/filter

ดึงข้อมูล Dashboard ทั้งหมดพร้อม Filter

**Query Parameters:**

```typescript
{
  startDate?: string;      // "2026-01-01"
  endDate?: string;        // "2026-01-31"
  vehicleType?: string;    // "รถ 6 ล้อ"
  status?: string;         // "completed"
  destination?: string;    // "กรุงเทพฯ"
}
```

**Response:**

```typescript
{
  statistics: {
    totalBookings: number;
    pendingBookings: number;
    inTransitBookings: number;
    completedBookings: number;
    totalVehicles: number;
    availableVehicles: number;
    inUseVehicles: number;
    maintenanceVehicles: number;
  },
  dailyBookings: [...],
  vehicleUsage: [...],
  popularRoutes: [...],
  recentBookings: [...]
}
```

## 💡 ตัวอย่างโค้ด

### การยิง API แบบง่าย

```typescript
import { dashboardCarApi } from "@/services/api";

// ดึงข้อมูลทั้งหมด
const data = await dashboardCarApi.getDashboardData();

// ดึงข้อมูลพร้อม Filter
const filteredData = await dashboardCarApi.getDashboardData({
  vehicleType: "รถ 6 ล้อ",
  status: "completed",
  startDate: "2026-01-01",
  endDate: "2026-01-31",
});
```

### การจัดการ Loading และ Error

```typescript
const [loading, setLoading] = useState(false);
const [data, setData] = useState(null);

const fetchData = async () => {
  try {
    setLoading(true);
    const result = await dashboardCarApi.getDashboardData(filter);
    setData(result);
  } catch (error) {
    message.error("เกิดข้อผิดพลาด: " + error.message);
  } finally {
    setLoading(false);
  }
};
```

### การ Export ข้อมูล

```typescript
const handleExport = async () => {
  try {
    const blob = await dashboardCarApi.exportToExcel(filter);

    // สร้าง Download Link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `export-${Date.now()}.xlsx`;
    link.click();
    URL.revokeObjectURL(url);

    message.success("Export สำเร็จ!");
  } catch (error) {
    message.error("เกิดข้อผิดพลาด");
  }
};
```

## 🔐 Authentication

Token จะถูกแนบอัตโนมัติทุก Request ผ่าน Axios Interceptor:

```typescript
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## ⚠️ Error Handling

### Global Error Handler

```typescript
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Auto logout on 401
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
```

### Component Level Error

```typescript
try {
  const data = await dashboardCarApi.getDashboardData(filter);
  setData(data);
} catch (error: any) {
  if (error.response?.status === 404) {
    message.error("ไม่พบข้อมูล");
  } else if (error.response?.status === 500) {
    message.error("เกิดข้อผิดพลาดจากเซิร์ฟเวอร์");
  } else {
    message.error(error.response?.data?.message || "เกิดข้อผิดพลาด");
  }
}
```

## 📊 Features

### 1. Statistics Cards

- จองรถทั้งหมด
- รอดำเนินการ
- กำลังขนส่ง
- เสร็จสิ้น

### 2. Charts

- การจองรถรายวัน (7 วันล่าสุด)
- การใช้งานรถแต่ละประเภท
- เส้นทางยอดนิยม

### 3. Recent Activities

- กิจกรรมการจองล่าสุด 5 รายการ

### 4. Filters

- Period Selection (วันนี้, สัปดาห์, เดือน, ปี)
- Vehicle Type Filter
- Status Filter
- Date Range Filter
- Reset Filter
- Apply Filter

### 5. Export

- Export to Excel

## 🎨 UI Components

ใช้ Reusable Components:

- ✅ StatisticCard - แสดงตัวเลขสถิติ
- ✅ ChartCard - Container สำหรับกราฟ
- ✅ SimpleBarChart - กราฟแท่ง
- ✅ RecentActivityList - รายการกิจกรรม

## 🔄 Data Flow

```
1. User เข้าหน้า /dashboard/car
   ↓
2. useEffect → fetchDashboardData()
   ↓
3. dashboardCarApi.getDashboardData(filter)
   ↓
4. axios.get('/dashboard/car/filter', { params: filter })
   ↓
5. Request Interceptor → แนบ Authorization Header
   ↓
6. Backend API
   ↓
7. Response Interceptor → Check Error
   ↓
8. setDashboardData(data)
   ↓
9. UI Update
```

## 🛠️ การขยายผล

### สร้าง Service ใหม่

```typescript
// src/services/api/myNewService.ts
import axiosInstance from "./axiosInstance";

export const myNewApi = {
  getData: async () => {
    const response = await axiosInstance.get("/my-endpoint");
    return response.data;
  },
};
```

### สร้างหน้าใหม่ที่ใช้ API

```typescript
// src/pages/my-page/index.tsx
import { myNewApi } from "@/services/api/myNewService";

const MyPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await myNewApi.getData();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return <div>{/* Your UI */}</div>;
};
```

## 📝 Checklist สำหรับการสร้างหน้าใหม่

- [ ] สร้าง Interface สำหรับ Request/Response
- [ ] สร้าง Service ใน `src/services/api/`
- [ ] Import Service ใน Component
- [ ] สร้าง State สำหรับ data, loading, error
- [ ] สร้างฟังก์ชัน fetch data ด้วย try-catch
- [ ] เรียก fetch ใน useEffect
- [ ] จัดการ Loading State
- [ ] จัดการ Error State
- [ ] แสดงข้อมูลใน UI
- [ ] เพิ่ม Filter (ถ้าจำเป็น)
- [ ] เพิ่ม Export (ถ้าจำเป็น)

## 🎯 สรุป

หน้า Dashboard Car เป็นตัวอย่างที่สมบูรณ์สำหรับ:

- ✅ การยิง API แบบมี Filter
- ✅ การจัดการ State อย่างถูกต้อง
- ✅ การจัดการ Error แบบ Best Practice
- ✅ การใช้ TypeScript อย่างเต็มรูปแบบ
- ✅ Code Organization ที่ดี

สามารถนำไปประยุกต์ใช้กับหน้าอื่นๆ ได้ทันที! 🚀
