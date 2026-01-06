# Environment Configuration Guide

## 🌍 การตั้งค่า Environment

โปรเจคนี้รองรับ 3 environments:

- **Development** - สำหรับพัฒนาบนเครื่องตัวเอง
- **UAT** - สำหรับทดสอบก่อนขึ้น Production
- **Production** - สำหรับ Production จริง

## 🚀 วิธีใช้งาน

### 1. Development (Local)

```bash
npm run start:dev
# หรือ
npm start
```

**API URL:** `http://localhost:3000/api`

### 2. UAT (User Acceptance Testing)

```bash
npm run start:uat
```

**API URL:** `https://uat-api.your-domain.com/api`

### 3. Production

```bash
npm run start:prod
```

**API URL:** `https://api.your-domain.com/api`

---

## 📦 Build สำหรับแต่ละ Environment

### Build Development

```bash
npm run build:dev
```

### Build UAT

```bash
npm run build:uat
```

### Build Production

```bash
npm run build:prod
# หรือ
npm run build
```

---

## ⚙️ การตั้งค่า API URL

แก้ไขที่ไฟล์: `src/config/api.config.ts`

```typescript
export const API_URLS = {
  development: "http://localhost:3000/api", // <-- แก้ตรงนี้
  uat: "https://uat-api.your-domain.com/api", // <-- แก้ตรงนี้
  production: "https://api.your-domain.com/api", // <-- แก้ตรงนี้
};
```

---

## 📄 Environment Files

### .env.development

```env
REACT_APP_ENV=development
REACT_APP_NAME=WMS Rebirth (Dev)
```

### .env.uat

```env
REACT_APP_ENV=uat
REACT_APP_NAME=WMS Rebirth (UAT)
```

### .env.production

```env
REACT_APP_ENV=production
REACT_APP_NAME=WMS Rebirth
```

---

## 🔍 ตรวจสอบ Environment ปัจจุบัน

เมื่อรันแอป ให้เปิด Browser Console จะเห็นข้อความแบบนี้:

```
🌍 Current Environment: development
🔗 API Base URL: http://localhost:3000/api
```

---

## 💡 Tips

### 1. เปลี่ยน Environment แบบ Manual

สร้างไฟล์ `.env.local`:

```env
REACT_APP_ENV=uat
```

### 2. ใช้ Environment Variables เพิ่มเติม

```typescript
// ใน code
const appName = process.env.REACT_APP_NAME;
const appVersion = process.env.REACT_APP_VERSION;
```

### 3. ตรวจสอบ Environment ใน Code

```typescript
import { getCurrentEnv } from "@/config/api.config";

if (getCurrentEnv() === "development") {
  console.log("Development mode!");
}
```

---

## ⚠️ หมายเหตุสำคัญ

1. **ต้องขึ้นต้นด้วย `REACT_APP_`** - ตัวแปรทุกตัวต้องขึ้นต้นด้วย `REACT_APP_` เท่านั้น
2. **Restart Server** - หลังแก้ไข .env ต้อง restart server ทุกครั้ง
3. **Don't commit .env.local** - ไฟล์ `.env.local` ไม่ควร commit ขึ้น git

---

## 📋 Scripts Summary

| Script               | Environment | API URL                               |
| -------------------- | ----------- | ------------------------------------- |
| `npm start`          | development | `http://localhost:3000/api`           |
| `npm run start:dev`  | development | `http://localhost:3000/api`           |
| `npm run start:uat`  | uat         | `https://uat-api.your-domain.com/api` |
| `npm run start:prod` | production  | `https://api.your-domain.com/api`     |
| `npm run build`      | production  | `https://api.your-domain.com/api`     |
| `npm run build:dev`  | development | `http://localhost:3000/api`           |
| `npm run build:uat`  | uat         | `https://uat-api.your-domain.com/api` |
| `npm run build:prod` | production  | `https://api.your-domain.com/api`     |

---

## 🔧 Troubleshooting

### ปัญหา: API URL ไม่เปลี่ยน

**วิธีแก้:**

1. Stop dev server (Ctrl+C)
2. Clear cache: ลบโฟลเดอร์ `node_modules/.cache`
3. Run script ใหม่

### ปัญหา: Environment Variable ไม่ทำงาน

**วิธีแก้:**

1. ตรวจสอบชื่อตัวแปรขึ้นต้นด้วย `REACT_APP_`
2. Restart dev server
3. Hard refresh browser (Ctrl+Shift+R)

---

## 🎯 ตัวอย่างการใช้งาน

### Scenario 1: พัฒนาบนเครื่อง

```bash
npm run start:dev
# เปิด http://localhost:3000
# API จะยิงไป http://localhost:3000/api
```

### Scenario 2: ทดสอบบน UAT Server

```bash
npm run start:uat
# API จะยิงไป https://uat-api.your-domain.com/api
```

### Scenario 3: Build สำหรับ Production

```bash
npm run build:prod
# สร้าง build/ folder ที่พร้อม deploy
# API จะยิงไป https://api.your-domain.com/api
```
