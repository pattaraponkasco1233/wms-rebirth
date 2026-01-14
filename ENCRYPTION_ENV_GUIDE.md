# 🔐 Environment-based Encryption Guide

## 📋 Overview

ระบบ Secure Storage รองรับการเปิด/ปิด encryption ตาม environment:

- **Development** → 🔓 ไม่เข้ารหัส (สะดวกในการ debug)
- **UAT/Production** → 🔐 เข้ารหัส (ปลอดภัย)

---

## 🎯 การใช้งาน

### Development Mode

```bash
npm run start:dev
```

- ❌ ไม่เข้ารหัส
- ✅ อ่านได้ใน DevTools
- ✅ Debug ง่าย

### UAT Mode

```bash
npm run start:uat
```

- ✅ เข้ารหัส
- ❌ อ่านไม่ได้โดยตรง
- ✅ Production-like

### Production Mode

```bash
npm run start:prod
```

- ✅ เข้ารหัส
- ✅ ความปลอดภัยสูงสุด

---

## 🔍 ตรวจสอบสถานะ

### Auto Log (Console)

```
[SecureStorage] Initialized with encryption: 🔓 DISABLED (env: development)
```

### Debug Function

```typescript
import { wmsStorage } from "@/utils/wmsStorage";
wmsStorage.debug();

// Output:
// - Environment: development
// - Encryption: 🔓 DISABLED
```

### Direct Check

```typescript
import { secureStorage } from "@/utils/secureStorage";

console.log(secureStorage.isEncryptionEnabled()); // true/false
console.log(secureStorage.getEnvironment()); // 'development'
```

---

## 📊 เปรียบเทียบ

| Mode        | Encryption | localStorage Value | อ่านได้ใน DevTools |
| ----------- | ---------- | ------------------ | ------------------ |
| Development | ❌         | Plain JSON         | ✅                 |
| UAT         | ✅         | Base64             | ❌                 |
| Production  | ✅         | Base64             | ❌                 |

---

## ⚙️ Technical Details

```javascript
// src/utils/secureStorage.ts
const shouldEncrypt = (): boolean => {
  const env = process.env.REACT_APP_ENV || "development";
  return env !== "development";
};
```

---

**Version**: 1.1.0  
**Date**: 2026-01-14
