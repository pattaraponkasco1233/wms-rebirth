# Quick Reference - Version Management

## 🚀 การอัพเดต Version แบบด่วน

### วิธีที่ 1: ใช้ NPM Scripts (แนะนำ)

```bash
# แก้ไข Bug (1.0.0 → 1.0.1)
npm run version:patch

# เพิ่มฟีเจอร์ใหม่ (1.0.1 → 1.1.0)
npm run version:minor

# Breaking Changes (1.1.0 → 2.0.0)
npm run version:major
```

### วิธีที่ 2: แก้ไขด้วยมือ

**ไฟล์:** `src/config/version.config.ts`

```typescript
export const APP_VERSION = {
  major: 1, // <-- แก้ไขที่นี่
  minor: 0, // <-- แก้ไขที่นี่
  patch: 0, // <-- แก้ไขที่นี่
};
```

**ไฟล์:** `package.json`

```json
{
  "version": "1.0.0" // <-- แก้ไขให้ตรงกับ version.config.ts
}
```

---

## 📋 Version ต่างๆ ใน App

### 1. Simple Version

```typescript
import { getVersionString } from "@/config/version.config";
getVersionString(); // "1.0.0"
```

### 2. Version + Environment

```typescript
import { getVersionWithEnv } from "@/config/version.config";
getVersionWithEnv(); // "1.0.0-DEV" | "1.0.0-UAT" | "1.0.0"
```

### 3. Full Version Info

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

## 🎯 ใช้ VersionDisplay Component

### Basic Usage

```tsx
import VersionDisplay from "@/components/common/VersionDisplay";

<VersionDisplay />;
```

### With Options

```tsx
<VersionDisplay
  showEnvironment={true} // แสดง environment
  showBuildDate={false} // ไม่แสดง build date
  size="default" // small | default | large
  align="center" // left | center | right
  showTooltip={true} // แสดง tooltip พอ hover
/>
```

---

## 🔄 Workflow การอัพเดต Version

```bash
# 1. อัพเดต version
npm run version:patch  # หรือ minor/major

# 2. Commit changes
git add .
git commit -m "chore: bump version to x.y.z"

# 3. สร้าง tag
git tag vx.y.z

# 4. Push ทั้งโค้ดและ tag
git push origin main --tags

# 5. อัพเดต CHANGELOG.md (ถ้ายังไม่ได้ทำ)
# แก้ไข CHANGELOG.md แล้ว commit อีกครั้ง
```

---

## 📊 Version Display Locations

### 1. Login Page

- แสดงอัตโนมัติที่ด้านล่างของ Login Card
- Format: `WMS Rebirth v1.0.0-DEV`
- พร้อม Tooltip แสดงข้อมูลเต็ม

### 2. Browser Console (Dev Mode)

```
📦 App Version: 1.0.0-DEV
🌍 Environment: development
📅 Build Date: 2026-01-06T10:30:00.000Z
```

### 3. ใช้ใน Component อื่นๆ

```tsx
import VersionDisplay from '@/components/common/VersionDisplay';

// ใน Footer
<Footer>
  <VersionDisplay size="small" align="center" />
</Footer>

// ใน Sidebar
<Sider>
  <VersionDisplay showEnvironment={false} size="small" />
</Sider>
```

---

## 🎨 Customization Examples

### แสดงเฉพาะ Version

```tsx
<VersionDisplay
  showEnvironment={false}
  showBuildDate={false}
  showTooltip={false}
/>
// Output: WMS Rebirth v1.0.0
```

### แสดงแบบเต็ม

```tsx
<VersionDisplay
  showEnvironment={true}
  showBuildDate={true}
  size="large"
  showTooltip={true}
/>
// Output:
// WMS Rebirth v1.0.0-DEV
// DEVELOPMENT Environment
// Build: 01/06/2026
```

### แสดงแบบเล็ก

```tsx
<VersionDisplay size="small" showEnvironment={false} align="right" />
```

---

## ⚡ Commands Cheat Sheet

| Command                  | Description      | Result        |
| ------------------------ | ---------------- | ------------- |
| `npm run version:patch`  | แก้ไข bugs       | 1.0.0 → 1.0.1 |
| `npm run version:minor`  | เพิ่มฟีเจอร์ใหม่ | 1.0.1 → 1.1.0 |
| `npm run version:major`  | Breaking changes | 1.1.0 → 2.0.0 |
| `git tag v1.0.0`         | สร้าง git tag    | -             |
| `git push origin --tags` | Push tags        | -             |

---

## 📝 Commit Message Template

### Bug Fix (Patch)

```bash
git commit -m "fix: แก้ไข bug การ login (v1.0.1)"
git commit -m "fix(api): แก้ไข error handling (v1.0.2)"
```

### Feature (Minor)

```bash
git commit -m "feat: เพิ่มหน้า Dashboard Car (v1.1.0)"
git commit -m "feat(ui): เพิ่ม dark mode (v1.2.0)"
```

### Breaking Change (Major)

```bash
git commit -m "feat!: เปลี่ยนไปใช้ GraphQL (v2.0.0)"
git commit -m "refactor!: restructure API endpoints (v2.0.0)"
```

### Version Bump

```bash
git commit -m "chore: bump version to 1.0.1"
git commit -m "chore(release): version 1.1.0"
```

---

## 🔍 ตรวจสอบ Version

### ใน Code

```typescript
import VERSION_INFO from "@/config/version.config";

// ตรวจสอบ environment
if (VERSION_INFO.environment === "production") {
  console.log = () => {}; // Disable console.log in production
}

// ตรวจสอบ version
const [major, minor, patch] = VERSION_INFO.version.split(".");
if (Number(major) >= 2) {
  // ใช้ฟีเจอร์ version 2.x
}
```

### ใน Browser

1. เปิด Browser Console
2. พิมพ์: `localStorage.getItem('app_version')`
3. หรือดูที่หน้า Login ด้านล่าง

### ใน Git

```bash
git tag                    # ดู tags ทั้งหมด
git describe --tags        # ดู tag ล่าสุด
git log --oneline          # ดู commit history
```

---

## ⚠️ Best Practices

1. ✅ **อัพเดต Version ก่อน Deploy**
2. ✅ **ใช้ NPM Scripts** แทนการแก้ไขด้วยมือ
3. ✅ **สร้าง Git Tag ทุกครั้ง**
4. ✅ **อัพเดต CHANGELOG.md**
5. ✅ **Sync package.json และ version.config.ts**
6. ✅ **Test ทุก Environment ก่อน Release**

---

## 🆘 Troubleshooting

### Version ไม่แสดงในหน้า Login

```bash
# 1. Clear cache
rm -rf node_modules/.cache

# 2. Restart dev server
npm run start:dev
```

### Version ไม่ตรงกันระหว่างไฟล์

```bash
# Run update script
npm run version:patch

# หรือแก้ไขด้วยมือให้ตรงกัน
```

### Git Tag ผิด

```bash
# ลบ tag local
git tag -d v1.0.0

# ลบ tag remote
git push origin :refs/tags/v1.0.0

# สร้าง tag ใหม่
git tag v1.0.0
git push origin v1.0.0
```

---

## 📞 Related Files

- `/src/config/version.config.ts` - Version configuration
- `/src/components/common/VersionDisplay.tsx` - Display component
- `/package.json` - Package version
- `/scripts/update-version.js` - Update script
- `/CHANGELOG.md` - Change history
- `/VERSION_GUIDE.md` - Full documentation
