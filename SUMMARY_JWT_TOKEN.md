# สรุปการเพิ่มฟีเจอร์ตรวจสอบ JWT Token Expiration

## ✅ สิ่งที่ได้ทำ

### 1. สร้างไฟล์ใหม่

- **`src/utils/jwtHelper.ts`** - ฟังก์ชันช่วยเหลือสำหรับการจัดการ JWT Token
  - `isTokenExpired()` - ตรวจสอบว่า Token หมดอายุหรือไม่
  - `decodeJWT()` - Decode JWT Token
  - `getTokenExpiration()` - ดึงเวลาหมดอายุของ Token
  - `getTokenTimeRemaining()` - ดึงเวลาที่เหลือก่อน Token จะหมดอายุ

### 2. อัปเดตไฟล์เดิม

#### `src/guard/AuthGuard.tsx`

**เปลี่ยนแปลง:**

- เพิ่มการตรวจสอบ Token หมดอายุเมื่อ Component mount
- เพิ่ม Interval ตรวจสอบ Token ทุก 60 วินาที
- ถ้า Token หมดอายุจะเรียก `logout()` และ redirect ไปหน้า `/login`

```typescript
useEffect(() => {
  const checkTokenExpiration = () => {
    const { token } = getWmsStorage();

    if (!token || isTokenExpired(token)) {
      logout();
      navigate("/login", { replace: true });
      return false;
    }
    return true;
  };

  checkTokenExpiration();
  const intervalId = setInterval(checkTokenExpiration, 60000);

  return () => clearInterval(intervalId);
}, [navigate, logout]);
```

#### `src/guard/router/Router.tsx`

**เปลี่ยนแปลง:**

- เพิ่ม `TokenChecker` Component ที่ตรวจสอบ Token ทุกครั้งที่เข้าเว็บหรือเปลี่ยน Route
- ถ้า Token หมดอายุและไม่ได้อยู่หน้า Login จะ redirect ไปหน้า `/login`

```typescript
const TokenChecker: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { token } = getWmsStorage();

    if (location.pathname === "/login") {
      return;
    }

    if (token && isTokenExpired(token)) {
      updateWmsStorage({
        token: undefined,
        refreshToken: undefined,
      });
      navigate("/login", { replace: true });
    }
  }, [navigate, location.pathname]);

  return null;
};
```

### 3. สร้างเอกสารคู่มือ

- **`JWT_TOKEN_GUIDE.md`** - คู่มือการใช้งานและวิธีการทำงานของระบบตรวจสอบ Token

## 🎯 วิธีการทำงาน

### เมื่อผู้ใช้เข้าเว็บ:

1. **TokenChecker** ใน Router ตรวจสอบ Token ทันที
2. ถ้า Token หมดอายุ → redirect ไปหน้า `/login`
3. ถ้า Token ยังใช้ได้ → แสดงหน้าที่ผู้ใช้ต้องการ

### ระหว่างการใช้งาน:

1. **AuthGuard** ตรวจสอบ Token ทุก 60 วินาทีอัตโนมัติ
2. ถ้า Token หมดอายุ → ทำ logout และ redirect ไปหน้า `/login`
3. ถ้า Token ยังใช้ได้ → ใช้งานต่อได้ปกติ

## 📋 ผลลัพธ์

### ✅ สิ่งที่ได้

- ตรวจสอบ Token หมดอายุอัตโนมัติเมื่อเข้าเว็บ
- ตรวจสอบ Token หมดอายุอัตโนมัติทุก 60 วินาที
- ถ้า Token หมดอายุจะ redirect ไปหน้า Login อัตโนมัติ
- ถ้า Token ยังไม่หมดอายุจะอยู่หน้าเดิม
- มี Buffer time 30 วินาทีก่อน Token จะหมดอายุจริง

### 🔒 ความปลอดภัย

- ป้องกันการใช้งานด้วย Token ที่หมดอายุ
- ป้องกัน Unauthorized API calls
- ทำ cleanup Token ที่หมดอายุอัตโนมัติ

## 🧪 การทดสอบ

### วิธีทดสอบ:

1. Login เข้าระบบ
2. เปิด Browser DevTools Console
3. รันคำสั่ง:

```javascript
// ดู Token ปัจจุบัน
const wmsData = JSON.parse(localStorage.getItem("wms") || "{}");
console.log("Current token:", wmsData.token);

// สร้าง Token ที่หมดอายุ (exp = อดีต)
const expiredToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxNTE2MjM5MDIyfQ.4Adcj0vVzm4aUfLv5zI56eH0xmwB8fQzDmr6cQz9grM";

// ใส่ Token ที่หมดอายุ
localStorage.setItem("wms", JSON.stringify({ token: expiredToken }));

// Reload หน้า - ควรเด้งไปหน้า Login
location.reload();
```

### ผลที่คาดหวัง:

- ✅ หลังจาก reload จะถูก redirect ไปหน้า `/login` ทันที
- ✅ Token ที่หมดอายุจะถูกลบออกจาก localStorage

## 📝 หมายเหตุ

### การตั้งค่าที่สามารถปรับได้:

1. **ระยะเวลาตรวจสอบ** (ปัจจุบัน: 60 วินาที)

   - แก้ไขใน `src/guard/AuthGuard.tsx` บรรทัดที่ใช้ `setInterval(checkTokenExpiration, 60000)`

2. **Buffer time** (ปัจจุบัน: 30 วินาที)

   - แก้ไขใน `src/utils/jwtHelper.ts` ฟังก์ชัน `isTokenExpired()`
   - เปลี่ยน `currentTime + 30` เป็นค่าที่ต้องการ

3. **Auto Token Refresh** (ไม่ได้ implement)
   - หากต้องการให้ refresh token อัตโนมัติ สามารถเพิ่มได้ตามตัวอย่างในไฟล์ `JWT_TOKEN_GUIDE.md`

## 📦 ไฟล์ที่เกี่ยวข้อง

```
src/
├── utils/
│   └── jwtHelper.ts              (ใหม่)
├── guard/
│   ├── AuthGuard.tsx             (แก้ไข)
│   └── router/
│       └── Router.tsx            (แก้ไข)
└── shares/
    └── hooks/
        └── useAuth.ts            (ใช้งานอยู่แล้ว)

JWT_TOKEN_GUIDE.md               (ใหม่)
SUMMARY_JWT_TOKEN.md             (ไฟล์นี้)
```

## ✨ สรุป

ระบบตรวจสอบ JWT Token Expiration ทำงานครบถ้วนตามที่ต้องการ:

✅ **เมื่อเข้าเว็บ** → ตรวจสอบ Token ทันที  
✅ **ถ้า Token หมดอายุ** → เด้งไปหน้า Login  
✅ **ถ้า Token ยังไม่หมด** → อยู่หน้าเดิม  
✅ **ระหว่างใช้งาน** → ตรวจสอบอัตโนมัติทุก 60 วินาที  
✅ **ปลอดภัย** → ป้องกันการใช้งาน Token ที่หมดอายุ
