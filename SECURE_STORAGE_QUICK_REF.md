# 🔐 Secure Storage - Quick Reference

> คู่มือฉบับย่อสำหรับการใช้งาน Secure Storage

## 📦 ไฟล์ที่เกี่ยวข้อง

```
src/utils/
├── secureStorage.ts      # Core encryption & namespace management
├── wmsStorage.ts         # WMS-specific storage helpers
└── storageInit.ts        # Auto migration & initialization
```

## 🚀 เริ่มต้นใช้งาน

### 1. บันทึกและอ่าน Token

```typescript
import { wmsStorage } from "@/utils/wmsStorage";

// บันทึก Token (พร้อม expiry 24 ชั่วโมง)
wmsStorage.setToken("my-jwt-token", Date.now() + 24 * 60 * 60 * 1000);

// อ่าน Token (มีการตรวจสอบ expiry อัตโนมัติ)
const token = wmsStorage.getToken(); // null ถ้าหมดอายุ
```

### 2. จัดการข้อมูล User

```typescript
// บันทึก
wmsStorage.setUser({
  id: "123",
  username: "john.doe",
  email: "john@example.com",
  role: "admin",
});

// อ่าน
const user = wmsStorage.getUser();
console.log(user?.username); // 'john.doe'
```

### 3. Server Configuration

```typescript
// บันทึก
wmsStorage.setServerConfig({
  serverHost: "203.151.6.30",
  serverPort: "8080",
  protocol: "https",
});

// อ่าน
const config = wmsStorage.getServerConfig();
console.log(config.serverHost); // '203.151.6.30'
```

### 4. Update ข้อมูลบางส่วน

```typescript
// อัพเดทเฉพาะบางฟิลด์
wmsStorage.updateWMSData({
  refreshToken: "new-refresh-token",
  server: "NKIE",
  customField: "value",
});
```

### 5. ตรวจสอบสถานะ

```typescript
// ตรวจสอบว่า login อยู่หรือไม่
if (wmsStorage.isAuthenticated()) {
  console.log("User is logged in");
}

// ตรวจสอบว่ามี token
if (wmsStorage.hasToken()) {
  console.log("Token exists and not expired");
}
```

### 6. Logout

```typescript
// ลบ Token เท่านั้น
wmsStorage.clearToken();

// หรือลบข้อมูล WMS ทั้งหมด
wmsStorage.clearWMSData();

// หรือลบทุกอย่าง
wmsStorage.clearAll();
```

## 🔧 Generic Storage (ข้อมูลอื่นๆ)

```typescript
import { secureStorage } from "@/utils/secureStorage";

// บันทึก
secureStorage.set("language", "th");
secureStorage.set("theme", { mode: "dark", accent: "blue" });

// อ่าน
const lang = secureStorage.get<string>("language");
const theme = secureStorage.get<{ mode: string }>("theme");

// ตรวจสอบ
if (secureStorage.has("language")) {
  console.log("Language is set");
}

// ลบ
secureStorage.remove("language");

// ดู keys ทั้งหมด
const keys = secureStorage.keys();
console.log("All keys:", keys);
```

## 🎯 ตัวอย่างการใช้งานจริง

### Login Component

```typescript
import { wmsStorage } from "@/utils/wmsStorage";

const handleLogin = async (username: string, password: string) => {
  const response = await loginAPI(username, password);

  if (response.success) {
    // บันทึก token และ user
    wmsStorage.setToken(response.token, response.expiresAt);
    wmsStorage.setUser(response.user);

    // Navigate to dashboard
    navigate("/dashboard");
  }
};
```

### Protected Route

```typescript
import { wmsStorage } from "@/utils/wmsStorage";

const ProtectedRoute = ({ children }) => {
  if (!wmsStorage.isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
```

### API Interceptor

```typescript
import { wmsStorage } from "@/utils/wmsStorage";

// Request Interceptor
axios.interceptors.request.use((config) => {
  const token = wmsStorage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor (401 Unauthorized)
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      wmsStorage.clearToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
```

## 🔍 Debug & Troubleshooting

### Debug Mode (Development Only)

```typescript
import { wmsStorage } from "@/utils/wmsStorage";

// แสดงข้อมูลทั้งหมด
wmsStorage.debug();
// Output:
// [WMSStorage] Debug Info:
// - Keys: ['wms', 'language', 'theme']
// - WMS Data: { token: '...', user: {...} }
// - Token exists: true
// - User: { username: 'john.doe' }
```

### Check Storage Health

```typescript
import { checkStorageHealth } from "@/utils/storageInit";

const isHealthy = checkStorageHealth();
if (!isHealthy) {
  console.error("Storage is not working properly!");
}
```

### Reset Everything

```typescript
import { resetStorage } from "@/utils/storageInit";

// ลบทุกอย่างและเริ่มใหม่
resetStorage();
```

## ⚠️ สิ่งที่ควรรู้

### ✅ DO

- ✅ ใช้ `wmsStorage` สำหรับข้อมูล WMS
- ✅ ตรวจสอบ `isAuthenticated()` ก่อนเข้า protected routes
- ✅ เรียก `clearToken()` เมื่อ logout
- ✅ ใช้ TypeScript types อย่างถูกต้อง
- ✅ เปลี่ยน `REACT_APP_STORAGE_SECRET` ใน production

### ❌ DON'T

- ❌ อย่าใช้ `localStorage` โดยตรง (ใช้ `wmsStorage` แทน)
- ❌ อย่าเก็บ password plain text
- ❌ อย่า commit `.env` เข้า Git
- ❌ อย่าลืม handle token expiry
- ❌ อย่าใช้ secret key เดียวกันใน production และ development

## 📊 Comparison Table

| Feature     | Old Way (localStorage) | New Way (secureStorage) |
| ----------- | ---------------------- | ----------------------- |
| Encryption  | ❌ None                | ✅ XOR + Base64         |
| Namespace   | ❌ None                | ✅ Auto prefix          |
| Type Safety | ❌ Manual cast         | ✅ TypeScript           |
| Auto Expiry | ❌ Manual              | ✅ Built-in             |
| Migration   | ❌ Manual              | ✅ Automatic            |
| Collision   | ❌ Possible            | ✅ Protected            |

## 🔗 Related Files

| File                           | Purpose                |
| ------------------------------ | ---------------------- |
| `src/utils/secureStorage.ts`   | Core encryption engine |
| `src/utils/wmsStorage.ts`      | WMS-specific helpers   |
| `src/utils/storageInit.ts`     | Auto migration         |
| `src/auth/jwt/jwtService.ts`   | JWT token management   |
| `src/utils/setServerHelper.ts` | Server config helpers  |

## 📚 Full Documentation

สำหรับข้อมูลเพิ่มเติม อ่านได้ที่:

- [SECURE_STORAGE_GUIDE.md](./SECURE_STORAGE_GUIDE.md) - คู่มือฉบับเต็ม
- [API_ARCHITECTURE_GUIDE.md](./API_ARCHITECTURE_GUIDE.md) - API Architecture

---

**Last Updated**: 2026-01-14  
**Quick Ref Version**: 1.0.0
