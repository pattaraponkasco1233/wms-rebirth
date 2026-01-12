# 📁 Assets Images Folder

## โครงสร้าง

```
src/assets/images/
├── illustrations/   - รูป illustration, empty state, error pages
└── backgrounds/     - รูปพื้นหลัง (login, dashboard)
```

## การใช้งาน

### ต้อง Import ก่อนใช้

```tsx
// Import รูปภาพ
import loginBg from "../../assets/images/backgrounds/login-bg.jpg";
import emptyState from "../../assets/images/illustrations/empty-state.svg";

// ใช้งาน
const LoginPage = () => {
  return (
    <div style={{ backgroundImage: `url(${loginBg})` }}>
      <h1>Login</h1>
    </div>
  );
};

const EmptyList = () => {
  return (
    <div>
      <img src={emptyState} alt="No data" width={200} />
      <p>ไม่มีข้อมูล</p>
    </div>
  );
};
```

## 📝 ตัวอย่างไฟล์

### Illustrations

- `empty-state.svg` - แสดงเมื่อไม่มีข้อมูล
- `no-result.svg` - แสดงเมื่อไม่พบผลการค้นหา
- `error-404.svg` - หน้า 404
- `error-500.svg` - หน้า error server
- `maintenance.svg` - หน้า maintenance
- `success.svg` - แสดงเมื่อสำเร็จ

### Backgrounds

- `login-bg.jpg` - พื้นหลังหน้า login
- `dashboard-bg.jpg` - พื้นหลัง dashboard
- `pattern.svg` - pattern สำหรับตกแต่ง

## ⚡ ข้อดี vs `public/images/`

| Feature            | `src/assets/` | `public/images/` |
| ------------------ | ------------- | ---------------- |
| Webpack processing | ✅ Yes        | ❌ No            |
| Import required    | ✅ Yes        | ❌ No            |
| File hash/cache    | ✅ Yes        | ❌ No            |
| Tree shaking       | ✅ Yes        | ❌ No            |
| Optimization       | ✅ Auto       | ⚠️ Manual        |

## 🎯 เมื่อไหร่ใช้อะไร

### ใช้ `src/assets/` เมื่อ:

- ✅ รูปที่ใช้ใน component
- ✅ ต้องการ webpack optimization
- ✅ รูปเล็ก (< 10KB) อาจถูก inline เป็น base64
- ✅ ต้องการ cache busting

### ใช้ `public/images/` เมื่อ:

- ✅ รูปที่ต้องการ absolute path
- ✅ รูปที่ใช้ใน HTML หรือ manifest
- ✅ รูปที่โหลดแบบ dynamic (runtime)
- ✅ ไฟล์ขนาดใหญ่

## 📦 Webpack Processing

```typescript
// Small images (< 10KB) จะถูก inline เป็น base64
import smallIcon from "./icon.png";
// → data:image/png;base64,iVBORw0KGgoAAAA...

// Large images จะได้ hashed filename
import largeImage from "./photo.jpg";
// → /static/media/photo.a8b9c7d6.jpg
```

---

**Created:** 2026-01-12
