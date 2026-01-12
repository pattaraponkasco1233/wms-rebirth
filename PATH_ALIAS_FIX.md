# Path Alias Fix - Create React App

## ❌ ปัญหา

```
ERROR in ./src/pages/dashboard/car.tsx
Module not found: Error: Can't resolve '@/services/api'
```

## 🔍 สาเหตุ

Create React App (react-scripts) **ไม่รู้จัก path alias `@`** ที่เพิ่มใน `tsconfig.json`

- `tsconfig.json` → TypeScript รู้จัก ✅
- Webpack (react-scripts) → **ไม่รู้จัก** ❌

## ✅ วิธีแก้

### Option 1: ใช้ Relative Path (แนะนำ - ง่ายที่สุด)

**เปลี่ยนจาก:**

```typescript
import { dashboardCarApi } from "@/services/api";
import type { DashboardCarFilter } from "@/models/dashboard/car.model";
```

**เป็น:**

```typescript
import { dashboardCarApi } from "../../services/api";
import type { DashboardCarFilter } from "../../models/dashboard/car.model";
```

### Option 2: ใช้ CRACO (สำหรับ Advanced Users)

#### 1. ติดตั้ง CRACO

```bash
npm install @craco/craco --save-dev
```

#### 2. สร้าง `craco.config.js`

```javascript
const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
```

#### 3. แก้ไข `package.json`

```json
{
  "scripts": {
    "start:dev": "set REACT_APP_ENV=development&& craco start",
    "start:uat": "set REACT_APP_ENV=uat&& craco start",
    "start:prod": "set REACT_APP_ENV=production&& craco start",
    "build": "craco build",
    "test": "craco test"
  }
}
```

#### 4. เก็บ `tsconfig.json` ไว้

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### Option 3: ใช้ react-app-rewired

#### 1. ติดตั้ง

```bash
npm install react-app-rewired --save-dev
```

#### 2. สร้าง `config-overrides.js`

```javascript
const path = require("path");

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
    },
  };
  return config;
};
```

#### 3. แก้ไข `package.json`

```json
{
  "scripts": {
    "start:dev": "set REACT_APP_ENV=development&& react-app-rewired start",
    "build": "react-app-rewired build"
  }
}
```

---

## 📝 ไฟล์ที่แก้แล้ว (Option 1)

ใช้ **relative path** แทน `@` ทั้งหมด:

### 1. `src/pages/dashboard/car.tsx`

```typescript
// ✅ แก้แล้ว
import { dashboardCarApi } from "../../services/api";
import type {
  DashboardCarFilter,
  DashboardCarResponse,
} from "../../models/dashboard/car.model";
```

### 2. `src/services/api/dashboardCarService.ts`

```typescript
// ✅ แก้แล้ว
import type {
  DashboardCarFilter,
  // ...
} from "../../models/dashboard/car.model";
```

### 3. `src/services/api/bookingCarService.ts`

```typescript
// ✅ แก้แล้ว
import type {
  BookingCar,
  // ...
} from "../../models/booking-car/booking-car.model";
```

### 4. `src/services/api/authService.ts`

```typescript
// ✅ แก้แล้ว
import type {
  LoginRequest,
  // ...
} from "../../models/auth/auth.model";
```

### 5. `src/services/api/index.ts`

```typescript
// ✅ แก้แล้ว
export type { ... } from '../../models/dashboard/car.model';
export type { ... } from '../../models/booking-car/booking-car.model';
export type { ... } from '../../models/auth/auth.model';
```

---

## 🎯 Pattern การ Import

### จากหน้า Page → Services

```typescript
// src/pages/dashboard/car.tsx
import { dashboardCarApi } from "../../services/api";
import type { DashboardCarFilter } from "../../models/dashboard/car.model";
```

### จาก Services → Models

```typescript
// src/services/api/dashboardCarService.ts
import type { DashboardCarFilter } from "../../models/dashboard/car.model";
```

### จาก Services → Services

```typescript
// src/services/api/index.ts
export { dashboardCarApi } from "./dashboardCarService";
```

---

## 📊 Comparison

| วิธี                  | ข้อดี                              | ข้อเสีย                               | แนะนำ       |
| --------------------- | ---------------------------------- | ------------------------------------- | ----------- |
| **Relative Path**     | ไม่ต้องติดตั้งอะไร, ใช้งานได้ทันที | Path ยาว, เปลี่ยน folder ต้องแก้      | ✅ แนะนำ    |
| **CRACO**             | Path สั้น, Clean imports           | ต้องติดตั้ง package, Config เพิ่ม     | ⚠️ Advanced |
| **react-app-rewired** | Path สั้น                          | ต้องติดตั้ง package, Maintenance น้อย | ⚠️ Advanced |

---

## 🚀 ทดสอบ

```bash
# ลบ port 3000 (ถ้ามี process ค้าง)
netstat -ano | findstr :3000
taskkill /F /PID <PID>

# Run dev server
npm run start:dev
```

ถ้าไม่มี error `Module not found` แสดงว่าแก้ไขสำเร็จแล้ว! ✅

---

## 📚 สรุป

เลือก **Option 1: Relative Path** เพราะ:

- ✅ ไม่ต้องติดตั้งอะไรเพิ่ม
- ✅ ใช้งานได้ทันที
- ✅ ไม่มี config เพิ่มเติม
- ✅ รองรับ TypeScript และ Webpack

**Trade-off:** Import path จะยาวกว่า แต่แลกกับความง่ายในการ setup!

---

**Updated:** 2026-01-12  
**Status:** ✅ Fixed with Relative Paths
