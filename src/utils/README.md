# Utils - Utility Functions

## 📋 Overview

โฟลเดอร์นี้รวม utility functions ที่ใช้งานทั่วทั้ง application

## 📦 Files

### 🔐 Security & Storage

| File                 | Purpose                                | Key Functions                                                   |
| -------------------- | -------------------------------------- | --------------------------------------------------------------- |
| **secureStorage.ts** | Core encryption & namespace management | `set()`, `get()`, `remove()`, `clear()`                         |
| **wmsStorage.ts**    | WMS-specific storage helpers           | `setToken()`, `getToken()`, `setUser()`, `isAuthenticated()`    |
| **storageInit.ts**   | Auto migration & initialization        | `initializeStorage()`, `resetStorage()`, `checkStorageHealth()` |

### 🔑 Authentication & JWT

| File             | Purpose             | Key Functions                     |
| ---------------- | ------------------- | --------------------------------- |
| **jwtHelper.ts** | JWT token utilities | `decodeJWT()`, `isTokenExpired()` |

### 🛠️ General Utilities

| File                   | Purpose                      | Key Functions                                 |
| ---------------------- | ---------------------------- | --------------------------------------------- |
| **Utils.ts**           | General helper functions     | `navigateAppName()`, `formatDateToYYYYMMDD()` |
| **setServerHelper.ts** | Server configuration helpers | `updateWmsStorage()`, `getWmsStorage()`       |

### 📦 Exports

| File         | Purpose                            |
| ------------ | ---------------------------------- |
| **index.ts** | Central export point for all utils |

## 🚀 Quick Start

### Import ทุกอย่างจาก index

```typescript
import {
  wmsStorage, // WMS storage manager
  secureStorage, // Generic secure storage
  initializeStorage, // Migration function
  decodeJWT, // JWT decoder
  formatDateToYYYYMMDD, // Date formatter
} from "@/utils";
```

### หรือ Import แบบเฉพาะเจาะจง

```typescript
import { wmsStorage } from "@/utils/wmsStorage";
import { secureStorage } from "@/utils/secureStorage";
```

## 📚 Documentation

- **Full Guide**: [SECURE_STORAGE_GUIDE.md](../SECURE_STORAGE_GUIDE.md)
- **Quick Reference**: [SECURE_STORAGE_QUICK_REF.md](../SECURE_STORAGE_QUICK_REF.md)
- **Summary**: [SUMMARY_SECURE_STORAGE.md](../SUMMARY_SECURE_STORAGE.md)

## 🎯 Common Use Cases

### 1. บันทึกและอ่าน Token

```typescript
import { wmsStorage } from "@/utils";

// บันทึก
wmsStorage.setToken("jwt-token", Date.now() + 24 * 60 * 60 * 1000);

// อ่าน
const token = wmsStorage.getToken();
```

### 2. ตรวจสอบ Authentication

```typescript
import { wmsStorage } from "@/utils";

if (wmsStorage.isAuthenticated()) {
  // User is logged in
}
```

### 3. จัดการ User Data

```typescript
import { wmsStorage } from "@/utils";

// บันทึก
wmsStorage.setUser({ id: "123", username: "john" });

// อ่าน
const user = wmsStorage.getUser();
```

### 4. Decode JWT

```typescript
import { decodeJWT } from "@/utils";

const payload = decodeJWT(token);
console.log(payload.username);
```

### 5. Format Date

```typescript
import { formatDateToYYYYMMDD } from "@/utils";

const formatted = formatDateToYYYYMMDD(new Date());
console.log(formatted); // "20260114"
```

## ⚙️ Configuration

### Environment Variables

```env
# .env
REACT_APP_STORAGE_SECRET=your-secret-key-here
REACT_APP_ENV=development
```

## 🔒 Security Notes

- ข้อมูลใน storage จะถูก encrypt ด้วย XOR cipher + Base64
- แต่ละ app มี namespace ของตัวเอง (ป้องกันการชนกัน)
- Token จะถูกตรวจสอบ expiry อัตโนมัติ

## 🐛 Debugging

### Debug Storage

```typescript
import { wmsStorage } from "@/utils";

// แสดงข้อมูลทั้งหมด (development only)
wmsStorage.debug();
```

### Check Health

```typescript
import { checkStorageHealth } from "@/utils";

const isHealthy = checkStorageHealth();
console.log("Storage is healthy:", isHealthy);
```

## 📝 Adding New Utilities

1. สร้างไฟล์ใหม่ใน `src/utils/`
2. Export functions ที่ต้องการ
3. เพิ่ม export ใน `index.ts`
4. Update README นี้

Example:

```typescript
// src/utils/myNewUtil.ts
export const myFunction = () => {
  // implementation
};

// src/utils/index.ts
export { myFunction } from "./myNewUtil";
```

---

**Last Updated**: 2026-01-14
