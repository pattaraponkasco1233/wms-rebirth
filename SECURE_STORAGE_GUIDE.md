# Secure Storage Guide

## 📋 สารบัญ

- [ภาพรวม](#ภาพรวม)
- [ฟีเจอร์หลัก](#ฟีเจอร์หลัก)
- [การติดตั้งและการตั้งค่า](#การติดตั้งและการตั้งค่า)
- [วิธีการใช้งาน](#วิธีการใช้งาน)
- [API Reference](#api-reference)
- [Security Considerations](#security-considerations)
- [Migration Guide](#migration-guide)
- [FAQ](#faq)

---

## ภาพรวม

Secure Storage เป็น utility สำหรับจัดการข้อมูลใน `localStorage` อย่างปลอดภัย โดยมีฟีเจอร์หลักดังนี้:

### ✨ ฟีเจอร์หลัก

1. **🔐 Encryption**: เข้ารหัสข้อมูลก่อนบันทึกลง localStorage เพื่อไม่ให้อ่านได้โดยตรง
2. **🏷️ Namespace**: ป้องกันการชนกันของตัวแปรเมื่อเปิดหลาย app ใน domain เดียวกัน
3. **📦 Type-Safe**: รองรับ TypeScript อย่างเต็มรูปแบบ
4. **🔄 Auto Migration**: ย้ายข้อมูลเก่าจาก localStorage แบบเดิมอัตโนมัติ

### 🎯 Use Cases

- เก็บ JWT Token อย่างปลอดภัย
- เก็บข้อมูล User Profile
- เก็บ Configuration ต่างๆ
- ป้องกันข้อมูลจาก web apps อื่นใน domain เดียวกัน

---

## การติดตั้งและการตั้งค่า

### 1. Environment Variables (Optional)

สร้างไฟล์ `.env` ใน root directory:

```env
# Secret Key สำหรับ Encryption (แนะนำให้เปลี่ยนเป็นค่าของคุณเอง)
REACT_APP_STORAGE_SECRET=your-very-secret-key-here-2026

# Environment
REACT_APP_ENV=development
```

**⚠️ สำคัญ**:

- ใน Production ควรใช้ Secret Key ที่แข็งแรงและไม่เปิดเผย
- ไม่ควร commit `.env` เข้า Git (ใส่ไว้ใน `.gitignore`)

### 2. Path Aliases (ถ้ามี)

ตรวจสอบว่า `tsconfig.json` มี path alias `@` แล้ว:

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"]
    }
  }
}
```

### 3. Auto Initialization

การ initialize จะเกิดขึ้นอัตโนมัติตอน app start ผ่าน `App.tsx`:

```tsx
// src/App.tsx
import { initializeStorage } from "./utils/storageInit";

useEffect(() => {
  initializeStorage(); // Auto migrate ข้อมูลเก่า
}, []);
```

---

## วิธีการใช้งาน

### 🔹 การใช้งานพื้นฐาน (WMS Storage)

```typescript
import { wmsStorage } from "@/utils/wmsStorage";

// 1. บันทึก Token
wmsStorage.setToken("my-jwt-token", Date.now() + 24 * 60 * 60 * 1000);

// 2. อ่าน Token
const token = wmsStorage.getToken();
console.log("Token:", token);

// 3. บันทึก User
wmsStorage.setUser({
  id: "123",
  username: "john.doe",
  email: "john@example.com",
  role: "admin",
});

// 4. อ่าน User
const user = wmsStorage.getUser();
console.log("User:", user);

// 5. บันทึก Server Config
wmsStorage.setServerConfig({
  serverHost: "203.151.6.30",
  serverPort: "8080",
  protocol: "https",
});

// 6. อ่านข้อมูล WMS ทั้งหมด
const wmsData = wmsStorage.getWMSData();
console.log("WMS Data:", wmsData);

// 7. อัพเดทข้อมูลบางส่วน
wmsStorage.updateWMSData({
  refreshToken: "new-refresh-token",
  customField: "custom-value",
});

// 8. ตรวจสอบสถานะ
const isLoggedIn = wmsStorage.isAuthenticated();
console.log("Is Authenticated:", isLoggedIn);

// 9. Logout (ลบ Token)
wmsStorage.clearToken();

// 10. ล้างข้อมูลทั้งหมด
wmsStorage.clearAll();
```

### 🔹 การใช้งาน Generic Storage

สำหรับเก็บข้อมูลประเภทอื่นๆ:

```typescript
import { secureStorage } from "@/utils/secureStorage";

// 1. เก็บ String
secureStorage.set("app_version", "1.0.0");

// 2. เก็บ Object
secureStorage.set("user_preferences", {
  theme: "dark",
  language: "th",
  notifications: true,
});

// 3. เก็บ Array
secureStorage.set("recent_searches", ["keyword1", "keyword2", "keyword3"]);

// 4. อ่านข้อมูล
const version = secureStorage.get<string>("app_version");
const preferences = secureStorage.get<{ theme: string; language: string }>(
  "user_preferences"
);

// 5. ตรวจสอบว่ามี key หรือไม่
if (secureStorage.has("user_preferences")) {
  console.log("User preferences exist");
}

// 6. ลบข้อมูล
secureStorage.remove("app_version");

// 7. ดูรายการ keys ทั้งหมด
const allKeys = secureStorage.keys();
console.log("All keys:", allKeys);

// 8. ล้างข้อมูลทั้งหมด
secureStorage.clear();
```

### 🔹 การใช้งานใน React Components

```tsx
import React, { useEffect, useState } from "react";
import { wmsStorage } from "@/utils/wmsStorage";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState(wmsStorage.getUser());

  useEffect(() => {
    // อ่านข้อมูล user ตอน component mount
    const userData = wmsStorage.getUser();
    setUser(userData);
  }, []);

  const handleLogout = () => {
    // ลบ token และ redirect
    wmsStorage.clearToken();
    window.location.href = "/login";
  };

  return (
    <div>
      <h1>Welcome, {user?.username}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
```

---

## API Reference

### WMS Storage (`wmsStorage`)

| Method                        | Description                  | Parameters                          | Return Type      |
| ----------------------------- | ---------------------------- | ----------------------------------- | ---------------- |
| `setToken(token, expiresAt?)` | บันทึก JWT Token             | `token: string, expiresAt?: number` | `void`           |
| `getToken()`                  | อ่าน Token (ตรวจสอบ expiry)  | -                                   | `string \| null` |
| `clearToken()`                | ลบ Token และ Refresh Token   | -                                   | `void`           |
| `setUser(user)`               | บันทึกข้อมูล User            | `user: object`                      | `void`           |
| `getUser()`                   | อ่านข้อมูล User              | -                                   | `object \| null` |
| `setServerConfig(config)`     | บันทึก Server Config         | `config: object`                    | `void`           |
| `getServerConfig()`           | อ่าน Server Config           | -                                   | `object`         |
| `getWMSData()`                | อ่านข้อมูล WMS ทั้งหมด       | -                                   | `WMSData`        |
| `updateWMSData(partial)`      | อัพเดทข้อมูลบางส่วน          | `partial: Partial<WMSData>`         | `void`           |
| `isAuthenticated()`           | ตรวจสอบว่า login อยู่หรือไม่ | -                                   | `boolean`        |
| `clearWMSData()`              | ลบข้อมูล WMS                 | -                                   | `void`           |
| `clearAll()`                  | ลบข้อมูลทั้งหมด              | -                                   | `void`           |

### Secure Storage (`secureStorage`)

| Method                        | Description         | Parameters                        | Return Type |
| ----------------------------- | ------------------- | --------------------------------- | ----------- |
| `set<T>(key, value)`          | บันทึกข้อมูล        | `key: string, value: T`           | `void`      |
| `get<T>(key)`                 | อ่านข้อมูล          | `key: string`                     | `T \| null` |
| `remove(key)`                 | ลบข้อมูล            | `key: string`                     | `void`      |
| `has(key)`                    | ตรวจสอบว่ามี key    | `key: string`                     | `boolean`   |
| `keys()`                      | รายการ keys ทั้งหมด | -                                 | `string[]`  |
| `clear()`                     | ลบข้อมูลทั้งหมด     | -                                 | `void`      |
| `migrate<T>(oldKey, newKey?)` | ย้ายข้อมูลเก่า      | `oldKey: string, newKey?: string` | `boolean`   |

---

## Security Considerations

### 🔒 Encryption

- ใช้ **XOR Cipher + Base64** encoding
- เหมาะสำหรับ **obfuscation** (ซ่อนข้อมูลไม่ให้อ่านง่าย)
- **ไม่ใช่ encryption ระดับ military-grade**

### 💡 แนะนำสำหรับ Production

1. **ใช้ crypto-js** สำหรับ encryption ที่แข็งแรงขึ้น:

```bash
npm install crypto-js
npm install --save-dev @types/crypto-js
```

2. **ใช้ AES encryption**:

```typescript
import CryptoJS from 'crypto-js';

encrypt(text: string): string {
  return CryptoJS.AES.encrypt(text, this.key).toString();
}

decrypt(encrypted: string): string {
  const bytes = CryptoJS.AES.decrypt(encrypted, this.key);
  return bytes.toString(CryptoJS.enc.Utf8);
}
```

3. **ใช้ Environment Variables** สำหรับ Secret Key
4. **ตั้งค่า HTTPS** บน production server
5. **ใช้ HttpOnly Cookies** สำหรับ Token ที่สำคัญมาก

### 🛡️ Namespace Protection

ระบบใช้ prefix แบบนี้:

```
wms_rebirth_v1__wms
wms_rebirth_v1__token
wms_rebirth_v1__user
```

ถ้ามี app อื่นใน domain เดียวกัน:

```
other_app_v1__wms       ← ไม่ชนกัน
wms_rebirth_v1__wms     ← ของเรา
```

---

## Migration Guide

### 🔄 Automatic Migration

เมื่อ user เปิด app ครั้งแรกหลังจาก update:

1. System จะตรวจสอบว่ามีข้อมูลเก่าใน localStorage หรือไม่
2. ย้ายข้อมูลทั้งหมดมาเป็น encrypted storage
3. ลบข้อมูลเก่า
4. เก็บ flag ว่า migrate แล้ว

### 🔧 Manual Migration

ถ้าต้องการ force migrate:

```typescript
import { wmsStorage } from "@/utils/wmsStorage";

// Migrate ข้อมูลเก่า
wmsStorage.migrateOldData();
```

### 🗑️ Reset Storage

ถ้าต้องการลบทุกอย่างและเริ่มใหม่:

```typescript
import { resetStorage } from "@/utils/storageInit";

// ลบทั้งหมด
resetStorage();
```

---

## FAQ

### ❓ ข้อมูลจะถูก encrypt อย่างไร?

- ใช้ **XOR cipher** กับ Base64 encoding
- ข้อมูลจะไม่สามารถอ่านได้โดยตรงใน DevTools
- เหมาะสำหรับป้องกันการอ่านแบบง่ายๆ

### ❓ ถ้าเปิด 2 web app ใน domain เดียวกันจะเกิดอะไร?

- แต่ละ app จะมี **namespace** ของตัวเอง
- ข้อมูลจะไม่ชนกัน เพราะมี prefix ต่างกัน
- เช่น: `wms_rebirth_v1__token` vs `other_app_v1__token`

### ❓ ถ้าลบ localStorage โดยตรงจะเกิดอะไร?

- ระบบจะสูญเสียข้อมูลทั้งหมด
- User จะถูก logout อัตโนมัติ
- ไม่มีผลกระทบต่อความปลอดภัย

### ❓ สามารถเปลี่ยน Secret Key ได้หรือไม่?

- ได้ แต่ต้องทำก่อนที่จะ deploy
- ถ้าเปลี่ยนหลัง deploy ข้อมูลเก่าจะ decrypt ไม่ได้
- แนะนำให้เปลี่ยนใน `.env` ก่อน build

### ❓ ควรเก็บ Sensitive Data อะไรใน localStorage?

**ควรเก็บ**:

- JWT Access Token (short-lived)
- User preferences
- UI state
- Cache data

**ไม่ควรเก็บ**:

- Password (plain text)
- Credit card numbers
- Personal sensitive data
- Long-lived tokens ที่สำคัญมาก

### ❓ Performance เป็นอย่างไร?

- Encryption/Decryption รวดเร็วมาก (< 1ms)
- ไม่มีผลกระทบต่อ UX
- สามารถใช้ได้กับข้อมูลขนาดใหญ่

---

## 📝 Change Log

### Version 1.0.0 (2026-01-14)

- ✅ Initial release
- ✅ XOR + Base64 encryption
- ✅ Namespace support
- ✅ Auto migration
- ✅ TypeScript support
- ✅ WMS-specific helpers

---

## 📞 Support

หากพบปัญหาหรือต้องการความช่วยเหลือ:

- ดูที่ [Error Fixes Guide](./ERROR_FIXES.md)
- ตรวจสอบ Console Log สำหรับ error messages
- ใช้ `wmsStorage.debug()` ใน development mode

---

## 🎓 Best Practices

1. **ใช้ WMS Storage สำหรับข้อมูล WMS**: ใช้ `wmsStorage` แทน `secureStorage` โดยตรง
2. **ตรวจสอบ Token expiry**: ใช้ `getToken()` ที่มีการตรวจสอบ expiry อัตโนมัติ
3. **Clear Token เมื่อ Logout**: เรียก `clearToken()` หรือ `clearWMSData()`
4. **ใช้ TypeScript**: ระบุ type ให้ถูกต้องเพื่อ type safety
5. **Debug อย่างถูกต้อง**: ใช้ `wmsStorage.debug()` แทนการ `console.log` ทุกอย่าง

---

**Created**: 2026-01-14  
**Last Updated**: 2026-01-14  
**Version**: 1.0.0
