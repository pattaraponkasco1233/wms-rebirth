# API Services & Models Architecture Guide

## 📁 โครงสร้าง Folder ใหม่

```
src/
├── models/                      ← Folder กลางสำหรับ Models
│   ├── index.ts                 (Export ทั้งหมด)
│   ├── dashboard/
│   │   └── car.model.ts         (Dashboard Car Models)
│   └── auth/
│       └── auth.model.ts        (Authentication Models)
│
├── services/
│   └── api/                     ← Folder กลางสำหรับ API Services
│       ├── index.ts             (Export ทั้งหมด)
│       ├── axiosInstance.ts     (Axios Config)
│       ├── dashboardCarService.ts
│       └── authService.ts
│
└── pages/
    ├── dashboard/
    │   └── car.tsx              (ใช้ dashboardCarApi)
    └── authentication/
        └── Login.tsx            (ใช้ authApi)
```

---

## 🎯 Concept

### 1. **Models (Folder กลาง - แยกตามหน้า)**

- เก็บ **Interfaces, Types, Constants** ทั้งหมด
- **แยกตาม Feature** (dashboard, auth)
- ไม่มีโค้ด logic, เป็นแค่ type definitions

### 2. **API Services (Folder กลาง - รวมทุกหน้า)**

- เก็บ **API calls** ทั้งหมดไว้ที่เดียว
- **Import models** จาก `/models`
- Return type ตาม models

---

## 📝 วิธีใช้งาน

### ✅ แบบเดิม (ไม่แนะนำ)

```typescript
// ❌ Import แยกๆ จาก service
import { DashboardCarFilter } from "@/services/api/dashboardCarService";
import { dashboardCarApi } from "@/services/api/dashboardCarService";
```

### ✅ แบบใหม่ (แนะนำ)

#### 1️⃣ Import API Service

```typescript
// ใช้หน้า Dashboard Car
import { dashboardCarApi } from "@/services/api";

// หรือ
import { dashboardCarApi, bookingCarApi, authApi } from "@/services/api";
```

#### 2️⃣ Import Models/Types

```typescript
// Import จาก models
import type {
  DashboardCarFilter,
  DashboardCarResponse,
  DashboardCarStatistics,
} from "@/models/dashboard/car.model";

// หรือ import จาก index
import type { DashboardCarFilter, BookingCar, User } from "@/models";
```

#### 3️⃣ ใช้ร่วมกัน

```typescript
import { dashboardCarApi } from "@/services/api";
import type { DashboardCarFilter } from "@/models/dashboard/car.model";

const DashboardCar = () => {
  const fetchData = async () => {
    const filter: DashboardCarFilter = {
      startDate: "2026-01-01",
      endDate: "2026-01-31",
    };

    const data = await dashboardCarApi.getDashboardData(filter);
    console.log(data);
  };

  return <div>...</div>;
};
```

---

## 🚀 ตัวอย่างการใช้งาน

### 1. Dashboard Car Page

```typescript
// src/pages/dashboard/car.tsx
import { useState, useEffect } from "react";
import { message } from "antd";
import { dashboardCarApi } from "@/services/api";
import type {
  DashboardCarFilter,
  DashboardCarResponse,
} from "@/models/dashboard/car.model";

const DashboardCar = () => {
  const [data, setData] = useState<DashboardCarResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async (filter?: DashboardCarFilter) => {
    setLoading(true);
    try {
      const result = await dashboardCarApi.getDashboardData(filter);
      setData(result);
    } catch (error) {
      message.error("เกิดข้อผิดพลาดในการโหลดข้อมูล");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return <div>...</div>;
};
```

### 3. Login Page

```typescript
// src/pages/authentication/Login.tsx
import { Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/services/api";
import type { LoginRequest } from "@/models/auth/auth.model";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleLogin = async (values: LoginRequest) => {
    try {
      const result = await authApi.login(values);

      if (result.success && result.token) {
        // บันทึก token
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        message.success("เข้าสู่ระบบสำเร็จ");
        navigate("/dashboard");
      } else {
        message.error(result.message || "เข้าสู่ระบบไม่สำเร็จ");
      }
    } catch (error) {
      message.error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    }
  };

  return (
    <Form form={form} onFinish={handleLogin}>
      ...
    </Form>
  );
};
```

---

## 🔧 เพิ่ม API Service ใหม่

### ขั้นตอนที่ 1: สร้าง Model

```typescript
// src/models/warehouse/warehouse.model.ts
export interface Warehouse {
  id: string;
  code: string;
  name: string;
  location: string;
}

export interface WarehouseFilter {
  code?: string;
  name?: string;
}
```

### ขั้นตอนที่ 2: สร้าง API Service

```typescript
// src/services/api/warehouseService.ts
import axiosInstance from "./axiosInstance";
import type {
  Warehouse,
  WarehouseFilter,
} from "@/models/warehouse/warehouse.model";

export const warehouseApi = {
  getWarehouses: async (filter?: WarehouseFilter): Promise<Warehouse[]> => {
    const response = await axiosInstance.get("/warehouses", {
      params: filter,
    });
    return response.data;
  },

  createWarehouse: async (data: Partial<Warehouse>): Promise<Warehouse> => {
    const response = await axiosInstance.post("/warehouses", data);
    return response.data;
  },
};
```

### ขั้นตอนที่ 3: Export ใน index.ts

```typescript
// src/services/api/index.ts
export { warehouseApi } from "./warehouseService";
```

### ขั้นตอนที่ 4: Export Model ใน models/index.ts

```typescript
// src/models/index.ts
export * from "./warehouse/warehouse.model";
```

### ขั้นตอนที่ 5: ใช้งาน

```typescript
import { warehouseApi } from "@/services/api";
import type { WarehouseFilter } from "@/models";

const data = await warehouseApi.getWarehouses({ code: "WH01" });
```

---

## ✨ ข้อดีของวิธีนี้

### 1. **Code Organization**

- แยก Models และ Services ชัดเจน
- หาง่าย แก้ง่าย

### 2. **Type Safety**

- TypeScript autocomplete ทำงานดีขึ้น
- ลดโอกาส type error

### 3. **Maintainability**

- แก้ไขที่เดียว ใช้ได้ทุกที่
- เพิ่ม API ใหม่ง่าย

### 4. **Import Clean**

```typescript
// ✅ Clean imports
import { dashboardCarApi, bookingCarApi } from "@/services/api";
import type { DashboardCarFilter, BookingCar } from "@/models";

// ❌ Messy imports
import { dashboardCarApi } from "@/services/api/dashboardCarService";
import { DashboardCarFilter } from "@/services/api/dashboardCarService";
```

### 5. **Reusability**

- Models ใช้ร่วมกันได้ทั้ง Frontend/Backend
- API Services เป็น single source of truth

---

## 📊 สรุป Pattern

| ส่วน             | ที่เก็บ                                            | ประกอบด้วย                   | ตัวอย่าง                                           |
| ---------------- | -------------------------------------------------- | ---------------------------- | -------------------------------------------------- |
| **Models**       | `src/models/{feature}/`                            | Interfaces, Types, Constants | `car.model.ts`                                     |
| **API Services** | `src/services/api/`                                | API calls, Axios requests    | `dashboardCarService.ts`                           |
| **Export**       | `src/models/index.ts`, `src/services/api/index.ts` | Central exports              | `export * from './dashboard/car.model'`            |
| **Usage**        | `src/pages/{feature}/`                             | Import & use                 | `import { dashboardCarApi } from '@/services/api'` |

---

## 🎓 Best Practices

1. **Models** - ชื่อไฟล์ลงท้าย `.model.ts`
2. **Services** - ชื่อไฟล์ลงท้าย `Service.ts`
3. **API Object** - ใช้ชื่อแบบ `{feature}Api` (เช่น `dashboardCarApi`)
4. **Import Types** - ใช้ `import type` เสมอ
5. **Export** - Export ผ่าน `index.ts` เท่านั้น

---

## 📝 Migration Guide

### อัพเดตไฟล์เดิมที่ใช้ API

```typescript
// ❌ แบบเก่า
import {
  DashboardCarFilter,
  dashboardCarApi,
} from "@/services/api/dashboardCarService";

// ✅ แบบใหม่
import { dashboardCarApi } from "@/services/api";
import type { DashboardCarFilter } from "@/models/dashboard/car.model";
```

---

## 🚨 Common Issues

### Issue 1: Cannot find module '@/models'

**Fix:** ตรวจสอบ `tsconfig.json` ว่ามี path alias

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### Issue 2: Circular dependency

**Fix:** ใช้ `import type` แทน `import` สำหรับ types เสมอ

```typescript
// ✅ Correct
import type { DashboardCarFilter } from "@/models";

// ❌ Wrong
import { DashboardCarFilter } from "@/models";
```

---

Happy Coding! 🎉
