# 🔐 Environment-based Encryption - Quick Start

## เริ่มต้นใช้งานเร็ว ๆ

### 🎯 การรัน App ในแต่ละ Environment

#### 1. Development (ไม่เข้ารหัส - สะดวกในการ Debug)

```bash
npm run start:dev
```

✅ Encryption: **DISABLED**  
✅ อ่านได้ใน DevTools  
✅ เหมาะสำหรับ development

#### 2. UAT (เข้ารหัส - ทดสอบแบบ Production)

```bash
npm run start:uat
```

🔐 Encryption: **ENABLED**  
❌ อ่านไม่ได้โดยตรง  
✅ Production-like testing

#### 3. Production (เข้ารหัส - ปลอดภัยสูงสุด)

```bash
npm run start:prod
```

🔐 Encryption: **ENABLED**  
✅ ความปลอดภัยสูงสุด  
✅ พร้อม deploy

---

## 📊 เปรียบเทียบ

| Feature             | Development | UAT/Production   |
| ------------------- | ----------- | ---------------- |
| **Encryption**      | 🔓 ปิด      | 🔐 เปิด          |
| **localStorage**    | Plain JSON  | Base64 Encrypted |
| **อ่านใน DevTools** | ✅ อ่านได้  | ❌ อ่านไม่ได้    |
| **Debug**           | ✅ ง่าย     | ⚠️ ต้องใช้ tools |

---

## 🔍 ตรวจสอบสถานะ

### เช็คใน Console

เมื่อ app start จะแสดง:

```
[SecureStorage] Initialized with encryption: 🔓 DISABLED (env: development)
```

หรือ

```
[SecureStorage] Initialized with encryption: 🔐 ENABLED (env: uat)
```

### Debug Function

```typescript
import { wmsStorage } from "@/utils";

wmsStorage.debug();
// Output:
// - Environment: development
// - Encryption: 🔓 DISABLED
// - Keys: ['wms']
// - WMS Data: {...}
```

---

## 💡 ตัวอย่างใน localStorage

### Development Mode

```
Key: wms_rebirth_v1__wms
Value: {"token":"eyJhbGc...","user":{"id":"123"}}
       ↑ อ่านได้ชัดเจน
```

### UAT/Production Mode

```
Key: wms_rebirth_v1__wms
Value: "Q1hZWE5ZQk5aSFlOWVhCTlpIWU5ZWEJOWkhZTllYQk5aSFlOWVhCTg=="
       ↑ เข้ารหัสแล้ว อ่านไม่ได้
```

---

## 📚 Documentation

- [SECURE_STORAGE_GUIDE.md](./SECURE_STORAGE_GUIDE.md) - คู่มือฉบับเต็ม
- [ENCRYPTION_ENV_GUIDE.md](./ENCRYPTION_ENV_GUIDE.md) - Environment encryption
- [SECURE_STORAGE_QUICK_REF.md](./SECURE_STORAGE_QUICK_REF.md) - Quick reference

---

**Version**: 1.1.0  
**Updated**: 2026-01-14
