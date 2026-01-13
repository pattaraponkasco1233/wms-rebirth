# คู่มือการตรวจสอบ JWT Token Expiration

## ภาพรวม

ระบบได้เพิ่มการตรวจสอบ JWT Token ว่าหมดอายุหรือไม่ โดยมีการตรวจสอบอัตโนมัติทั้งเมื่อเข้าเว็บและระหว่างการใช้งาน

## คุณสมบัติหลัก

### 1. การตรวจสอบเมื่อเข้าเว็บ (Router Level)

- ตรวจสอบ Token ทุกครั้งที่เข้าเว็บหรือเปลี่ยน Route
- ถ้า Token หมดอายุจะ redirect ไปหน้า Login อัตโนมัติ
- ตำแหน่งโค้ด: `src/guard/router/Router.tsx`

### 2. การตรวจสอบในหน้าที่ต้อง Login (AuthGuard)

- ตรวจสอบ Token ทุก 60 วินาทีอัตโนมัติ
- ถ้า Token หมดอายุจะทำการ Logout และ redirect ไปหน้า Login
- ตำแหน่งโค้ด: `src/guard/AuthGuard.tsx`

### 3. ฟังก์ชันช่วยเหลือสำหรับ JWT

ไฟล์: `src/utils/jwtHelper.ts`

#### ฟังก์ชันที่มีให้ใช้:

```typescript
// ตรวจสอบว่า Token หมดอายุหรือไม่
isTokenExpired(token: string | null | undefined): boolean

// Decode JWT Token
decodeJWT(token: string): any | null

// ดึงเวลาที่ Token จะหมดอายุ (timestamp)
getTokenExpiration(token: string | null | undefined): number | null

// ดึงเวลาที่เหลือจนกว่า Token จะหมดอายุ (milliseconds)
getTokenTimeRemaining(token: string | null | undefined): number
```

## วิธีการทำงาน

### Flow การตรวจสอบ Token

```
1. ผู้ใช้เข้าเว็บ
   ↓
2. TokenChecker ใน Router.tsx ตรวจสอบ Token
   ↓
3. ถ้า Token หมดอายุ
   ├─→ ล้าง Token จาก localStorage
   └─→ Redirect ไปหน้า /login

4. ถ้า Token ยังใช้ได้
   ↓
5. แสดงหน้าที่ผู้ใช้ต้องการ
   ↓
6. AuthGuard ตรวจสอบ Token ทุก 60 วินาที
   ↓
7. ถ้า Token หมดอายุระหว่างใช้งาน
   ├─→ เรียก logout()
   └─→ Redirect ไปหน้า /login
```

## ตัวอย่างการใช้งาน

### ตรวจสอบ Token ในส่วนของคุณเอง

```typescript
import { isTokenExpired, getTokenTimeRemaining } from "../utils/jwtHelper";
import { getWmsStorage } from "../utils/setServerHelper";

// ตรวจสอบว่า Token หมดอายุหรือไม่
const { token } = getWmsStorage();
if (isTokenExpired(token)) {
  console.log("Token หมดอายุแล้ว");
  // ทำการ logout หรือ refresh token
}

// ดูว่าเหลือเวลาอีกเท่าไหร่
const timeRemaining = getTokenTimeRemaining(token);
console.log(`เหลือเวลาอีก ${timeRemaining / 1000} วินาที`);
```

### การเพิ่ม Token Refresh อัตโนมัติ (Optional)

หากต้องการให้ระบบ Refresh Token อัตโนมัติเมื่อใกล้หมดอายุ สามารถเพิ่มใน `AuthGuard.tsx`:

```typescript
useEffect(() => {
  const checkAndRefreshToken = async () => {
    const { token } = getWmsStorage();
    const timeRemaining = getTokenTimeRemaining(token);

    // ถ้าเหลือเวลาน้อยกว่า 5 นาที (300,000 ms)
    if (timeRemaining > 0 && timeRemaining < 300000) {
      try {
        // เรียก API Refresh Token
        const jwtService = new JwtService(axiosAuth);
        const response = await jwtService.refreshToken();

        if (response.data.access_token) {
          updateWmsStorage({ token: response.data.access_token });
        }
      } catch (error) {
        console.error("Failed to refresh token:", error);
        logout();
        navigate("/login", { replace: true });
      }
    }
  };

  const intervalId = setInterval(checkAndRefreshToken, 60000);
  return () => clearInterval(intervalId);
}, []);
```

## การตั้งค่า

### Buffer Time สำหรับการตรวจสอบ Token

ค่า Default: 30 วินาที (ตั้งไว้ใน `jwtHelper.ts`)

ความหมาย: ระบบจะถือว่า Token หมดอายุก่อนเวลาจริง 30 วินาที เพื่อให้มีเวลา Refresh Token หรือ Logout

หากต้องการเปลี่ยนค่า แก้ไขใน `src/utils/jwtHelper.ts`:

```typescript
// เดิม: 30 วินาที
return decoded.exp < currentTime + 30;

// เปลี่ยนเป็น 60 วินาที
return decoded.exp < currentTime + 60;
```

### ระยะเวลาการตรวจสอบอัตโนมัติ

ค่า Default: 60,000 ms (60 วินาที)

หากต้องการเปลี่ยน แก้ไขใน `src/guard/AuthGuard.tsx`:

```typescript
// เดิม: 60 วินาที
const intervalId = setInterval(checkTokenExpiration, 60000);

// เปลี่ยนเป็น 30 วินาที
const intervalId = setInterval(checkTokenExpiration, 30000);
```

## การทดสอบ

### ทดสอบด้วย Token ที่หมดอายุ

1. เปิด DevTools Console
2. รันคำสั่ง:

```javascript
// สร้าง Token ที่หมดอายุแล้ว
const expiredToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkwMjJ9.4Adcj0vVzm4aUfLv5zI56eH0xmwB8fQzDmr6cQz9grM";

// บันทึกลง localStorage
const wmsData = { token: expiredToken };
localStorage.setItem("wms", JSON.stringify(wmsData));

// Reload หน้า
location.reload();
```

3. ระบบควร redirect ไปหน้า Login อัตโนมัติ

## Troubleshooting

### Token ไม่ถูกตรวจสอบ

- ตรวจสอบว่า Route มีการใช้ `isProtected: true` หรือไม่
- ตรวจสอบว่า Token ถูกเก็บใน localStorage ภายใต้ key "wms" หรือไม่

### Redirect Loop

- ตรวจสอบว่าหน้า Login ไม่มีการใช้ `AuthGuard`
- ตรวจสอบว่า `TokenChecker` มีการ skip การตรวจสอบสำหรับ path `/login`

### Token ถูกลบโดยไม่มีเหตุผล

- ตรวจสอบ format ของ JWT Token ว่าถูกต้องหรือไม่
- ตรวจสอบว่า Token มี field `exp` (expiration) หรือไม่

## สรุป

ระบบตรวจสอบ JWT Token Expiration ทำงานในหลายระดับ:

1. **Router Level**: ตรวจสอบทุกครั้งที่เข้าเว็บหรือเปลี่ยน Route
2. **AuthGuard Level**: ตรวจสอบทุก 60 วินาทีในหน้าที่ต้อง Login
3. **Utility Functions**: มีฟังก์ชันช่วยเหลือให้ใช้ตรวจสอบในส่วนอื่นๆ

การทำงานนี้ช่วยให้:

- ✅ ผู้ใช้ไม่สามารถใช้งานต่อด้วย Token ที่หมดอายุ
- ✅ ระบบ Redirect ไปหน้า Login อัตโนมัติเมื่อ Token หมดอายุ
- ✅ ป้องกันการเกิด Unauthorized Error จาก API calls
- ✅ เพิ่มความปลอดภัยของระบบ
