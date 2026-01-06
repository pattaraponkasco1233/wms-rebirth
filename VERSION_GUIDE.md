# Version Management Guide

## 📦 การจัดการ Version

โปรเจคนี้ใช้ Semantic Versioning (SemVer) รูปแบบ: **MAJOR.MINOR.PATCH**

```
v1.0.0
│ │ │
│ │ └─── PATCH: แก้ไข bugs, ปรับปรุงเล็กน้อย
│ └───── MINOR: เพิ่มฟีเจอร์ใหม่ (backward compatible)
└─────── MAJOR: การเปลี่ยนแปลงใหญ่ (breaking changes)
```

---

## 🔢 Version Numbering Rules

### MAJOR (x.0.0)

เปลี่ยนเมื่อ:

- มีการเปลี่ยนแปลง API ที่ไม่ backward compatible
- เปลี่ยนโครงสร้างระบบใหญ่
- อัพเดต dependencies หลักที่มี breaking changes

**ตัวอย่าง:**

- `1.0.0` → `2.0.0`: เปลี่ยนจาก REST API เป็น GraphQL
- `2.0.0` → `3.0.0`: Migrate จาก React 18 เป็น React 19

### MINOR (1.x.0)

เปลี่ยนเมื่อ:

- เพิ่มฟีเจอร์ใหม่ที่ไม่ทำให้เดิมเสีย
- ปรับปรุง UI/UX
- เพิ่ม API endpoints ใหม่

**ตัวอย่าง:**

- `1.0.0` → `1.1.0`: เพิ่มหน้า Dashboard Car
- `1.1.0` → `1.2.0`: เพิ่มระบบ Export Excel
- `1.2.0` → `1.3.0`: เพิ่มระบบ Notification

### PATCH (1.0.x)

เปลี่ยนเมื่อ:

- แก้ไข bugs
- ปรับปรุงประสิทธิภาพ
- แก้ไข typos, styling เล็กน้อย
- อัพเดต dependencies (minor updates)

**ตัวอย่าง:**

- `1.0.0` → `1.0.1`: แก้ไข bug การ login
- `1.0.1` → `1.0.2`: ปรับปรุงการแสดงผล loading
- `1.0.2` → `1.0.3`: แก้ไข responsive layout

---

## ⚙️ วิธีอัพเดต Version

### 1. แก้ไขไฟล์ `src/config/version.config.ts`

```typescript
export const APP_VERSION = {
  major: 1, // <-- แก้ไขที่นี่
  minor: 0, // <-- แก้ไขที่นี่
  patch: 0, // <-- แก้ไขที่นี่
};
```

### 2. แก้ไขไฟล์ `package.json`

```json
{
  "name": "wms-rebirth",
  "version": "1.0.0",    // <-- แก้ไขที่นี่ให้ตรงกับ version.config.ts
  ...
}
```

---

## 📋 Version Display Formats

### 1. Simple Version

```
1.0.0
```

### 2. Version with Environment

```
1.0.0-DEV     (Development)
1.0.0-UAT     (UAT)
1.0.0         (Production)
```

### 3. Full Version

```
v1.0.0 (development-2026-01-06)
```

---

## 🎯 Version Display Locations

### 1. Login Page

แสดงที่ด้านล่างของ Login Card:

```
WMS Rebirth v1.0.0-DEV
DEVELOPMENT Environment
```

### 2. Console Log (Development Only)

```
📦 App Version: 1.0.0-DEV
🌍 Environment: development
📅 Build Date: 2026-01-06T10:30:00.000Z
```

### 3. About Page (Optional)

สามารถแสดงข้อมูลเพิ่มเติม:

```typescript
import VERSION_INFO from "@/config/version.config";

console.log(VERSION_INFO);
// {
//   version: "1.0.0",
//   fullVersion: "v1.0.0 (development-2026-01-06)",
//   versionWithEnv: "1.0.0-DEV",
//   buildDate: "2026-01-06T10:30:00.000Z",
//   environment: "development"
// }
```

---

## 🚀 Version Workflow

### Scenario 1: แก้ไข Bug

```bash
# 1. แก้ไข bug
# 2. อัพเดต version
#    version.config.ts: 1.0.0 → 1.0.1
#    package.json: 1.0.0 → 1.0.1

# 3. Commit
git add .
git commit -m "fix: แก้ไข bug การ login (v1.0.1)"
git tag v1.0.1
git push origin main --tags
```

### Scenario 2: เพิ่มฟีเจอร์ใหม่

```bash
# 1. พัฒนาฟีเจอร์ใหม่
# 2. อัพเดต version
#    version.config.ts: 1.0.1 → 1.1.0
#    package.json: 1.0.1 → 1.1.0

# 3. Commit
git add .
git commit -m "feat: เพิ่มหน้า Dashboard Car (v1.1.0)"
git tag v1.1.0
git push origin main --tags
```

### Scenario 3: Breaking Changes

```bash
# 1. ทำการเปลี่ยนแปลงใหญ่
# 2. อัพเดต version
#    version.config.ts: 1.1.0 → 2.0.0
#    package.json: 1.1.0 → 2.0.0

# 3. Commit
git add .
git commit -m "feat!: เปลี่ยนไปใช้ GraphQL API (v2.0.0)"
git tag v2.0.0
git push origin main --tags
```

---

## 🔧 Helper Functions

### ใช้งานใน Component

```typescript
import {
    getVersionString,      // "1.0.0"
    getVersionWithEnv,     // "1.0.0-DEV"
    getFullVersion,        // "v1.0.0 (development-2026-01-06)"
    VERSION_INFO           // Object ข้อมูลทั้งหมด
} from '@/config/version.config';

// แสดง version แบบง่าย
<Text>Version {getVersionString()}</Text>

// แสดง version พร้อม environment
<Text>v{getVersionWithEnv()}</Text>

// แสดงข้อมูลเต็ม
<div>
    <p>Version: {VERSION_INFO.version}</p>
    <p>Environment: {VERSION_INFO.environment}</p>
    <p>Build Date: {VERSION_INFO.buildDate}</p>
</div>
```

---

## 📊 Version History Template

สร้างไฟล์ `CHANGELOG.md`:

```markdown
# Changelog

## [1.1.0] - 2026-01-06

### Added

- เพิ่มหน้า Dashboard Car
- เพิ่มระบบ Filter ข้อมูล
- เพิ่มฟังก์ชัน Export Excel

### Changed

- ปรับปรุง UI Login Page
- อัพเดต Dependencies

### Fixed

- แก้ไข bug การ logout
- แก้ไขปัญหา responsive mobile

## [1.0.1] - 2026-01-05

### Fixed

- แก้ไข bug การ login
- แก้ไขการแสดงผล loading state

## [1.0.0] - 2026-01-01

### Added

- เปิดตัวเวอร์ชันแรก
- ระบบ Login/Logout
- Dashboard หลัก
- การจัดการ Booking Car
```

---

## 🎨 Customization

### 1. เปลี่ยนรูปแบบการแสดงผล

**ไฟล์:** `src/config/version.config.ts`

```typescript
// แสดง version แบบกำหนดเอง
export const getCustomVersion = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${getVersionString()}.${year}${month}`;
};

// ผลลัพธ์: "1.0.0.202601"
```

### 2. เพิ่ม Build Number จาก CI/CD

```typescript
// ใน CI/CD pipeline, set environment variable
// REACT_APP_BUILD_NUMBER=1234

export const getBuildNumber = (): string => {
  return process.env.REACT_APP_BUILD_NUMBER || "0";
};

export const getVersionWithBuild = (): string => {
  return `${getVersionString()}.${getBuildNumber()}`;
};

// ผลลัพธ์: "1.0.0.1234"
```

---

## ✅ Checklist การอัพเดต Version

- [ ] แก้ไข `src/config/version.config.ts`
- [ ] แก้ไข `package.json`
- [ ] อัพเดต `CHANGELOG.md`
- [ ] Test ในทุก environment (dev, uat, prod)
- [ ] Commit พร้อม message ที่ชัดเจน
- [ ] สร้าง Git Tag
- [ ] Push tag ขึ้น repository
- [ ] แจ้งทีมเกี่ยวกับการเปลี่ยนแปลง

---

## 🔗 Git Tags

### ดู Tags ทั้งหมด

```bash
git tag
```

### สร้าง Tag ใหม่

```bash
git tag v1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0"  # annotated tag
```

### Push Tag

```bash
git push origin v1.0.0
git push origin --tags  # push ทุก tags
```

### ลบ Tag

```bash
git tag -d v1.0.0           # ลบ local
git push origin :v1.0.0     # ลบ remote
```

---

## 💡 Best Practices

1. **อัพเดต Version ทุกครั้งที่ Deploy**

   - Development: สามารถข้าม PATCH updates
   - UAT/Production: ต้องอัพเดตทุกครั้ง

2. **ใช้ Git Tags**

   - สร้าง tag สำหรับทุก version ที่ release
   - ใช้ annotated tags (`-a`) สำหรับข้อมูลเพิ่มเติม

3. **เขียน CHANGELOG**

   - บันทึกการเปลี่ยนแปลงทุกครั้ง
   - แยกเป็นหมวดหมู่: Added, Changed, Fixed, Removed

4. **แสดง Version ในทุก Environment**

   - ช่วยในการ Debug และ Track issues
   - ผู้ใช้เห็นเวอร์ชันที่ใช้งานอยู่

5. **Sync กับ package.json**
   - Version ใน version.config.ts ต้องตรงกับ package.json
   - ใช้ Script auto-sync ถ้าจำเป็น

---

## 🎯 Quick Reference

| Task                 | Command                                              |
| -------------------- | ---------------------------------------------------- |
| แก้ไข version        | Edit `src/config/version.config.ts`                  |
| ดู version ปัจจุบัน  | เปิดหน้า Login หรือดู Console                        |
| สร้าง Git tag        | `git tag v1.0.0`                                     |
| Push tag             | `git push origin --tags`                             |
| เช็ค version ใน code | `import VERSION_INFO from '@/config/version.config'` |

---

## 📞 Support

หากมีคำถามเกี่ยวกับการจัดการ Version:

1. ดูเอกสารนี้
2. ตรวจสอบ `src/config/version.config.ts`
3. ดู Console log ใน Development mode
4. ติดต่อทีม DevOps
